"use client";

import { ContactShadows, RoundedBox, RoundedBoxGeometry, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const W = 3.2;
const H = 1.5;
const D = 2.2;
const T = 0.13;
const BASE = 0.12;
/** Where the contact shadow sits; the box always rests on it. */
const FLOOR = -0.95;

const ITEMS = [
  "/media/photos/lobster-tails-raw.jpg",
  "/media/photos/filet-mignon.jpg",
  "/media/photos/salmon-case.jpg",
  "/media/photos/jumbo-shrimp.jpg",
  "/media/photos/tuna-steak.jpg",
];

const ease = (t: number) => 1 - (1 - t) ** 3;
/** Overshoots then settles, so the lid "pops". */
const easeBack = (t: number) => {
  const c = 1.9;
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
};
const range = (p: number, a: number, b: number) => Math.min(Math.max((p - a) / (b - a), 0), 1);

/** Deterministic PRNG so scatter is stable across renders. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Read a next/font family name from its CSS variable for canvas text. */
const fontVar = (name: string, fallback: string) =>
  typeof window === "undefined"
    ? fallback
    : getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  draw(c.getContext("2d")!);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Expanded-polystyrene beads: used as colour and bump so walls read as styrofoam. */
function useFoamTexture() {
  return useMemo(() => {
    const rand = rng(7);
    const tex = canvasTexture(512, 512, (ctx) => {
      ctx.fillStyle = "#f3f5f2";
      ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 2600; i++) {
        const x = rand() * 512;
        const y = rand() * 512;
        const r = 4 + rand() * 6;
        const g = 228 + Math.floor(rand() * 24);
        ctx.fillStyle = `rgb(${g},${g + 2},${g})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(10,20,51,0.05)";
        ctx.stroke();
      }
    });
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.NoColorSpace;
    return tex;
  }, []);
}

/** Lid art: the navy oval sticker the client puts on every box, plus the customer name. */
function useLidTexture(name: string) {
  return useMemo(
    () =>
      canvasTexture(1024, 704, (ctx) => {
        const display = fontVar("--font-anton", "Impact");
        const script = fontVar("--font-yellowtail", "cursive");
        ctx.save();
        ctx.translate(512, 320);
        ctx.rotate(-0.06);
        ctx.shadowColor = "rgba(10,20,51,0.25)";
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 6;
        ctx.fillStyle = "#1a2c5c";
        ctx.beginPath();
        ctx.ellipse(0, 0, 300, 175, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.lineWidth = 12;
        ctx.strokeStyle = "#c9f23a";
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.font = `110px ${display}`;
        ctx.fillText("SEAFOOD", 0, 10);
        ctx.fillStyle = "#c9f23a";
        ctx.font = `120px ${script}`;
        ctx.fillText("Guys", 60, 120);
        ctx.restore();
        // Handwritten customer name, like the real boxes.
        ctx.fillStyle = "#0a1433";
        ctx.font = `68px ${script}`;
        ctx.textAlign = "right";
        ctx.save();
        ctx.translate(960, 650);
        ctx.rotate(-0.08);
        ctx.fillText(name, 0, 0);
        ctx.restore();
      }),
    [name]
  );
}

function useFrontTexture() {
  return useMemo(
    () =>
      canvasTexture(1024, 480, (ctx) => {
        const display = fontVar("--font-anton", "Impact");
        ctx.textAlign = "center";
        ctx.fillStyle = "#1a2c5c";
        ctx.font = `128px ${display}`;
        ctx.fillText("PERISHABLE", 512, 210);
        ctx.font = `52px ${display}`;
        ctx.fillStyle = "#2fa4d9";
        ctx.fillText("RUSH · KEEP FROZEN · THIS SIDE UP", 512, 300);
        // Arrows either side, like shipping stencils.
        ctx.fillStyle = "#1a2c5c";
        for (const x of [90, 934]) {
          ctx.beginPath();
          ctx.moveTo(x, 120);
          ctx.lineTo(x - 34, 175);
          ctx.lineTo(x - 12, 175);
          ctx.lineTo(x - 12, 250);
          ctx.lineTo(x + 12, 250);
          ctx.lineTo(x + 12, 175);
          ctx.lineTo(x + 34, 175);
          ctx.closePath();
          ctx.fill();
        }
        ctx.fillStyle = "#c9f23a";
        ctx.fillRect(0, 395, 1024, 58);
        ctx.fillStyle = "#0a1433";
        ctx.font = `34px ${display}`;
        ctx.fillText("SEAFOOD GUYS MIAMI  ✦  DOCK-FRESH  ✦  DOOR-DELIVERED", 512, 437);
      }),
    []
  );
}

/** Shipping label on the side panel. */
function useLabelTexture(name: string) {
  return useMemo(
    () =>
      canvasTexture(512, 400, (ctx) => {
        const display = fontVar("--font-anton", "Impact");
        const script = fontVar("--font-yellowtail", "cursive");
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(10,20,51,0.2)";
        ctx.shadowBlur = 12;
        ctx.fillRect(20, 20, 472, 360);
        ctx.shadowColor = "transparent";
        ctx.fillStyle = "#0a1433";
        ctx.fillRect(20, 20, 472, 70);
        ctx.fillStyle = "#c9f23a";
        ctx.font = `44px ${display}`;
        ctx.fillText("FREE DELIVERY", 44, 72);
        ctx.fillStyle = "#2fa4d9";
        ctx.font = `26px ${display}`;
        ctx.fillText("SHIP TO", 44, 136);
        ctx.fillStyle = "#0a1433";
        ctx.font = `60px ${script}`;
        ctx.fillText(name, 44, 196);
        ctx.font = `26px ${display}`;
        ctx.fillText("MIAMI-DADE · BROWARD", 44, 244);
        // Barcode.
        const rand = rng(3);
        let x = 44;
        while (x < 468) {
          const w = 2 + Math.floor(rand() * 5);
          ctx.fillRect(x, 270, w, 80);
          x += w + 2 + Math.floor(rand() * 4);
        }
      }),
    [name]
  );
}

function PhotoCard({ url, index, progress }: { url: string; index: number; progress: MotionValue<number> }) {
  const tex = useTexture(url, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });
  const ref = useRef<THREE.Group>(null);
  const n = ITEMS.length;
  const spread = (index - (n - 1) / 2) / ((n - 1) / 2); // -1 … 1

  // Cover-crop the photo into a square card.
  const img = tex.image as HTMLImageElement | undefined;
  useMemo(() => {
    if (!img) {
      return;
    }
    const aspect = img.width / img.height;
    tex.repeat.set(aspect > 1 ? 1 / aspect : 1, aspect > 1 ? 1 : aspect);
    tex.offset.set((1 - tex.repeat.x) / 2, (1 - tex.repeat.y) / 2);
  }, [img, tex]);

  useFrame((state) => {
    const g = ref.current;
    if (!g) {
      return;
    }
    const raw = range(progress.get(), 0.32 + index * 0.04, 0.72 + index * 0.03);
    // Two phases so cards never pass through the walls: rise straight up out of the
    // opening (rim is at y = 0.6 in this group), then fan out once clear of it.
    const rise = ease(range(raw, 0, 0.45));
    const fan = ease(range(raw, 0.4, 1));
    const t = state.clock.elapsedTime;
    const above = 1.08;
    const final = 1.72 - Math.abs(spread) * 0.08;
    g.position.set(
      spread * (0.85 + fan * 1.25),
      0.1 + rise * (above - 0.1) + fan * (final - above) + Math.sin(t * 1.4 + index) * 0.06 * fan,
      -0.1 + fan * 0.6
    );
    g.rotation.set(-0.15 * fan, -spread * 0.35 * fan, -spread * 0.18 * fan + Math.sin(t + index) * 0.03 * fan);
    g.scale.setScalar(0.35 + 0.25 * rise + 0.4 * fan);
    g.visible = raw > 0.001;
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[1.25, 1.25, 0.04]} radius={0.06}>
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.12, 1.12]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

function IceCubes({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 16;
  const seeds = useMemo(() => {
    const rand = rng(11);
    return Array.from({ length: count }, () => ({
      x: (rand() - 0.5) * (W - 0.7),
      z: (rand() - 0.5) * (D - 0.7),
      r: rand() * Math.PI,
      s: 0.15 + rand() * 0.11,
      out: new THREE.Vector3((rand() - 0.5) * 6, 1 + rand() * 2.5, (rand() - 0.2) * 3),
    }));
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const raw = range(progress.get(), 0.25, 0.6);
    // Pop straight up clear of the rim first, then scatter.
    const up = ease(range(raw, 0, 0.4));
    const out = ease(range(raw, 0.3, 1));
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      dummy.position.set(
        s.x + s.out.x * out * 0.25,
        H - 0.4 + up * 0.9 + s.out.y * out * 0.2 + Math.sin(t * 0.6 + i) * 0.02,
        // Drift toward the back as they rise so the photo cards (z ≥ ~-0.3) always
        // sit in front of the ice.
        THREE.MathUtils.lerp(s.z, -0.6 - (i % 5) * 0.05, ease(raw))
      );
      dummy.rotation.set(s.r + t * 0.08 * up, s.r * 2 + t * 0.05 * up, s.r);
      dummy.scale.setScalar(s.s * (1 - out * 0.3));
      dummy.updateMatrix();
      ref.current?.setMatrixAt(i, dummy.matrix);
    });
    if (ref.current) {
      ref.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh args={[undefined, undefined, count]} ref={ref}>
      <RoundedBoxGeometry args={[1, 1, 1]} radius={0.18} smoothness={2} />
      <meshPhysicalMaterial
        clearcoat={1}
        color="#d6f0ff"
        emissive="#9fdcff"
        emissiveIntensity={0.25}
        opacity={0.8}
        roughness={0.05}
        transparent
      />
    </instancedMesh>
  );
}

/* ----------------- Cold mist spilling out when the lid opens ----------------- */

const mistVertex = /* glsl */ `
  attribute vec4 aSeed;
  uniform float uTime;
  uniform float uOpen;
  uniform float uScale;
  varying float vAlpha;

  void main() {
    float life = fract(uTime * (0.12 + aSeed.z * 0.1) + aSeed.w);
    vec3 start = vec3(aSeed.x * ${(W / 2 - 0.3).toFixed(2)}, ${(H - 0.15).toFixed(2)}, aSeed.y * ${(D / 2 - 0.3).toFixed(2)});
    // Rise out of the box, fan outward, then sink over the rim like cold air.
    float rise = sin(life * 3.14159) * 0.55 - life * life * 0.5;
    vec3 p = start + vec3(start.x * life * 0.7, rise, start.z * life * 0.7 + life * 0.5);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (0.7 + life * 1.6) * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
    vAlpha = sin(life * 3.14159) * uOpen;
  }
`;

const mistFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float soft = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(0.8, 0.92, 1.0, soft * soft * vAlpha * 0.55);
  }
`;

function ColdMist({ open }: { open: React.RefObject<number> }) {
  const count = 70;
  const { size, viewport } = useThree();
  const seeds = useMemo(() => {
    const rand = rng(23);
    const a = new Float32Array(count * 4);
    for (let i = 0; i < count * 4; i++) {
      a[i] = i % 4 < 2 ? rand() * 2 - 1 : rand();
    }
    return a;
  }, []);
  const positions = useMemo(() => new Float32Array(count * 3), []);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uOpen: { value: 0 }, uScale: { value: 1 } }), []);

  useFrame((_, dt) => {
    const u = mat.current?.uniforms;
    if (!u) {
      return;
    }
    u.uTime.value += dt;
    u.uOpen.value = open.current;
    u.uScale.value = size.height * viewport.dpr * 0.9;
  });

  return (
    <points frustumCulled={false} renderOrder={2}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[seeds, 4]} attach="attributes-aSeed" />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        fragmentShader={mistFragment}
        ref={mat}
        transparent
        uniforms={uniforms}
        vertexShader={mistVertex}
      />
    </points>
  );
}

/* ---------------------------------- Cooler ---------------------------------- */

function Cooler({
  progress,
  name,
  pointer,
}: {
  progress: MotionValue<number>;
  name: string;
  pointer: React.RefObject<THREE.Vector2>;
}) {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);
  const open = useRef(0);
  const tilt = useRef(new THREE.Vector2());

  const foam = useFoamTexture();
  const lidTex = useLidTexture(name);
  const frontTex = useFrontTexture();
  const labelTex = useLabelTexture(name);

  const shell = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        map: foam,
        bumpMap: foam,
        bumpScale: 1.4,
        roughness: 0.9,
      }),
    [foam]
  );
  const liner = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const p = progress.get();
    const t = state.clock.elapsedTime;
    tilt.current.lerp(pointer.current, 0.06);

    const lidT = range(p, 0.2, 0.45);
    open.current = lidT;
    if (liner.current) {
      liner.current.emissiveIntensity = lidT * 0.55;
    }
    if (glow.current) {
      glow.current.intensity = lidT * 7;
    }

    if (root.current) {
      // Spin in from the side, then settle facing the viewer, slightly from above.
      const intro = ease(range(p, 0, 0.3));
      // Then square up to face the viewer as the lid opens and the cards fan out.
      const face = ease(range(p, 0.3, 0.55));
      root.current.rotation.y =
        THREE.MathUtils.lerp(THREE.MathUtils.lerp(-2.2, -0.45, intro), -0.08, face) +
        Math.sin(t * 0.4) * 0.03 +
        tilt.current.x * 0.15;
      const rx = THREE.MathUtils.lerp(0.1, 0.32, intro) - tilt.current.y * 0.08;
      root.current.rotation.x = rx;
      // Tilting forward dips the front-bottom edge; lift by that much so it never sinks
      // through the floor, then hover a touch above it.
      root.current.position.y = FLOOR + (D / 2) * Math.sin(Math.abs(rx)) + 0.03 + (Math.sin(t * 0.8) + 1) * 0.03;
    }
    if (lid.current) {
      // Pop open on the back hinge.
      lid.current.rotation.x = -easeBack(lidT) * 1.95;
    }
  });

  const wallH = H - BASE;
  const wallY = BASE + wallH / 2;
  const r = 0.035;

  return (
    <group ref={root}>
      {/* Base slab under all four walls, so no faces overlap. */}
      <RoundedBox args={[W, BASE, D]} material={shell} position={[0, BASE / 2, 0]} radius={r} smoothness={3} />
      {/* Front & back run full width; sides sit between them. */}
      <RoundedBox args={[W, wallH, T]} material={shell} position={[0, wallY, D / 2 - T / 2]} radius={r} smoothness={3} />
      <RoundedBox args={[W, wallH, T]} material={shell} position={[0, wallY, -D / 2 + T / 2]} radius={r} smoothness={3} />
      <RoundedBox args={[T, wallH, D - T * 2]} material={shell} position={[W / 2 - T / 2, wallY, 0]} radius={r} smoothness={3} />
      <RoundedBox args={[T, wallH, D - T * 2]} material={shell} position={[-W / 2 + T / 2, wallY, 0]} radius={r} smoothness={3} />

      {/* Glowing icy liner + light inside, brightens as the lid opens. */}
      <mesh position={[0, BASE + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - T * 2, D - T * 2]} />
        <meshStandardMaterial color="#cfe3ee" emissive="#6fd0ff" emissiveIntensity={0} ref={liner} roughness={1} />
      </mesh>
      <pointLight color="#8fdcff" decay={2} distance={4} intensity={0} position={[0, H * 0.7, 0]} ref={glow} />

      {/* Printed decals, transparent so the foam shows through. */}
      <mesh position={[0, H / 2, D / 2 + 0.004]}>
        <planeGeometry args={[W - 0.12, (W - 0.12) * (480 / 1024)]} />
        <meshStandardMaterial map={frontTex} polygonOffset polygonOffsetFactor={-2} roughness={0.8} transparent />
      </mesh>
      <mesh position={[W / 2 + 0.004, H / 2 + 0.05, 0.1]} rotation={[0, Math.PI / 2, -0.04]}>
        <planeGeometry args={[1.2, 0.94]} />
        <meshStandardMaterial map={labelTex} polygonOffset polygonOffsetFactor={-2} roughness={0.6} transparent />
      </mesh>

      {/* Lid, pivoting on the back edge, with a plug that seats inside the walls. */}
      <group position={[0, H, -D / 2]} ref={lid}>
        <RoundedBox args={[W + 0.08, 0.16, D + 0.08]} material={shell} position={[0, 0.08, D / 2]} radius={0.05} smoothness={4} />
        <RoundedBox args={[W - T * 2 - 0.03, 0.08, D - T * 2 - 0.03]} material={shell} position={[0, -0.03, D / 2]} radius={0.02} />
        <mesh position={[0, 0.162, D / 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W - 0.1, (W - 0.1) * (704 / 1024)]} />
          <meshStandardMaterial map={lidTex} polygonOffset polygonOffsetFactor={-2} roughness={0.6} transparent />
        </mesh>
      </group>

      <IceCubes progress={progress} />
      <ColdMist open={open} />
      {/* Photos load lazily; the box shouldn't wait on them. */}
      <Suspense fallback={null}>
        <group position={[0, H - 0.6, 0]}>
          {ITEMS.map((url, i) => (
            <PhotoCard index={i} key={url} progress={progress} url={url} />
          ))}
        </group>
      </Suspense>
    </group>
  );
}

/**
 * Keep the original framing, but back the camera off when the canvas is too narrow
 * for the open lid and fanned cards, so nothing gets cropped.
 */
function FitCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const halfWidth = 3.2;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(18));
    const needed = halfWidth / (tanHalf * (size.width / size.height));
    // Canvas fills the full sticky viewport, so start further back than the old 9.5.
    const dist = THREE.MathUtils.clamp(needed, 12.5, 18);
    camera.position.set(0, 2.4 * (dist / 9.5), dist);
    camera.lookAt(0, 0.5, 0);
  }, [camera, size]);
  return null;
}

export default function CoolerScene({
  progress,
  className,
  name = "Your Name",
}: {
  progress: MotionValue<number>;
  className?: string;
  name?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef(new THREE.Vector2());
  const [visible, setVisible] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    if (wrap.current) {
      io.observe(wrap.current);
    }
    const onMove = (e: PointerEvent) => {
      const rect = wrap.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.current.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1));
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={className} ref={wrap}>
      {fontsReady && (
        <Canvas
          camera={{ fov: 36, position: [0, 2.4, 9.5] }}
          onCreated={({ camera }) => camera.lookAt(0, 0.5, 0)}
          dpr={[1, 1.75]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <hemisphereLight color="#ffffff" groundColor="#b9cfe0" intensity={1.1} />
          <directionalLight castShadow intensity={2.4} position={[4, 8, 6]} />
          {/* Lime rim from behind-left, mahi-blue fill from the front. */}
          <directionalLight color="#c9f23a" intensity={1.1} position={[-6, 3, -4]} />
          <pointLight color="#2fa4d9" intensity={6} position={[3, 2, 4]} />
          <FitCamera />
          <Cooler name={name} pointer={pointer} progress={progress} />
          <ContactShadows blur={2.4} color="#0a1433" far={4} opacity={0.5} position={[0, FLOOR, 0]} scale={12} />
        </Canvas>
      )}
    </div>
  );
}
