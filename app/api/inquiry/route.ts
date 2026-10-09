import { site } from "@/content/site";

type Payload = {
  kind: "order" | "contact";
  name: string;
  phone: string;
  email?: string;
  topic?: string;
  address?: string;
  date?: string;
  message?: string;
  summary?: string;
  total?: number;
};

const clean = (value: unknown, max = 2000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Receives order requests and contact messages.
 *
 * Sends an email through Resend when RESEND_API_KEY is set (to
 * INQUIRY_TO_EMAIL, falling back to the site email). Without a key it logs the
 * submission so the form still works end-to-end in development.
 */
export async function POST(request: Request) {
  let body: Partial<Payload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const data: Payload = {
    kind: body.kind === "order" ? "order" : "contact",
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    topic: clean(body.topic, 80),
    address: clean(body.address, 300),
    date: clean(body.date, 40),
    message: clean(body.message),
    summary: clean(body.summary, 4000),
    total: typeof body.total === "number" ? body.total : undefined,
  };

  if (!data.name || data.phone.replace(/\D/g, "").length < 10) {
    return Response.json(
      { ok: false, error: "Please add your name and a valid phone number." },
      { status: 422 }
    );
  }
  if (data.kind === "order" && !data.summary) {
    return Response.json({ ok: false, error: "Your order is empty." }, { status: 422 });
  }

  const subject =
    data.kind === "order"
      ? `New order request — ${data.name}${data.total ? ` ($${data.total})` : ""}`
      : `Website message — ${data.name}`;

  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Topic", data.topic],
    ["Address", data.address],
    ["Preferred date", data.date],
    ["Order", data.summary],
    ["Estimated total", data.total ? `$${data.total}` : ""],
    ["Message", data.message],
  ].filter(([, v]) => v);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[inquiry] ${subject}\n${text}`);
    return Response.json({ ok: true, delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL ?? "Seafood Guys <onboarding@resend.dev>",
      to: [process.env.INQUIRY_TO_EMAIL ?? site.email],
      reply_to: data.email || undefined,
      subject,
      text,
      html: `<table cellpadding="6">${rows
        .map(
          ([k, v]) =>
            `<tr><td><b>${k}</b></td><td style="white-space:pre-line">${escapeHtml(v ?? "")}</td></tr>`
        )
        .join("")}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("[inquiry] Resend failed", res.status, await res.text());
    return Response.json(
      { ok: false, error: "We couldn't send that just now — please call or text us." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, delivered: true });
}
