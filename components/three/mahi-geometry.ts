import * as THREE from "three";

/**
 * Procedural mahi-mahi built from primitives so the hero needs no model files.
 *
 * Local space: the fish points down -X (head at x = -1, tail root at x = 1),
 * Y is up, Z is the thin lateral axis. The swim wiggle happens in the vertex
 * shader, which is shared by body and fins so they bend together.
 */

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

export function createMahiBody() {
  const geo = new THREE.SphereGeometry(1, 72, 36);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const x = v.x; // -1 head … 1 tail
    // Mahi have a tall blunt forehead and taper hard into the tail stalk.
    const height =
      (0.52 - 0.34 * smooth(-0.2, 1, x)) * (0.55 + 0.45 * smooth(-1.02, -0.6, x));
    const width = 0.2 - 0.13 * smooth(0, 1, x);
    // Shift the mass upward at the head (that iconic squared brow).
    const lift = 0.12 * (1 - smooth(-0.9, 0.2, x));
    v.set(x * 1.6, v.y * height + lift * (v.y > 0 ? 1 : 0.2), v.z * width);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export function createMahiFins() {
  // Long dorsal fin running from the brow to the tail stalk.
  const dorsal = new THREE.Shape();
  dorsal.moveTo(-1.25, 0.5);
  dorsal.bezierCurveTo(-0.9, 0.95, 0.2, 0.75, 1.15, 0.24);
  dorsal.lineTo(1.1, 0.12);
  dorsal.bezierCurveTo(0.3, 0.4, -0.6, 0.48, -1.25, 0.42);

  // Anal fin along the belly.
  const anal = new THREE.Shape();
  anal.moveTo(-0.1, -0.3);
  anal.bezierCurveTo(0.3, -0.55, 0.8, -0.35, 1.15, -0.16);
  anal.lineTo(1.1, -0.08);
  anal.bezierCurveTo(0.7, -0.2, 0.3, -0.25, -0.1, -0.22);

  // Deeply forked tail.
  const tail = new THREE.Shape();
  tail.moveTo(1.45, 0);
  tail.lineTo(2.25, 0.82);
  tail.quadraticCurveTo(2.05, 0.3, 1.95, 0);
  tail.quadraticCurveTo(2.05, -0.3, 2.25, -0.82);
  tail.lineTo(1.45, 0);

  // Pectoral fin, angled back from behind the gill.
  const pectoral = new THREE.Shape();
  pectoral.moveTo(-0.85, -0.08);
  pectoral.quadraticCurveTo(-0.45, -0.18, -0.25, -0.32);
  pectoral.quadraticCurveTo(-0.55, -0.22, -0.85, -0.16);

  const opts = { depth: 0.012, bevelEnabled: false, curveSegments: 24 };
  const geos = [dorsal, anal, tail, pectoral].map((s) => {
    const g = new THREE.ExtrudeGeometry(s, opts);
    g.translate(0, 0, -0.006);
    return g;
  });
  // Push pectoral out of the body so it reads from the side.
  geos[3].translate(0, 0, 0.17);
  return geos;
}

export const mahiVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSwim;
  varying vec3 vNormal;
  varying vec3 vLocal;
  varying vec3 vView;

  void main() {
    vec3 p = position;
    // Wave travels head -> tail and grows toward the tail.
    float k = smoothstep(-1.4, 2.3, p.x);
    float wave = sin(p.x * 2.4 - uTime * uSwim) * 0.22 * k * k;
    p.z += wave;
    vLocal = position;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = -mv.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

export const mahiFragment = /* glsl */ `
  uniform float uFin;
  varying vec3 vNormal;
  varying vec3 vLocal;
  varying vec3 vView;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    vec3 l = normalize(vec3(-0.3, 1.0, 0.6));

    // Mahi colouring: cobalt back -> emerald flank -> lime/gold belly.
    float h = clamp(vLocal.y * 1.6 + 0.5, 0.0, 1.0);
    vec3 belly = vec3(0.95, 0.93, 0.25);
    vec3 flank = vec3(0.32, 0.78, 0.33);
    vec3 back = vec3(0.07, 0.3, 0.7);
    vec3 col = mix(belly, flank, smoothstep(0.15, 0.55, h));
    col = mix(col, back, smoothstep(0.62, 0.95, h));

    // Electric blue speckles on the flank.
    vec2 g = vLocal.xy * vec2(9.0, 11.0);
    vec2 cell = floor(g);
    vec2 f = fract(g) - 0.5;
    float r = hash(cell);
    float spot = step(r, 0.42) * (1.0 - smoothstep(0.1, 0.2, length(f + (vec2(hash(cell + 3.1), hash(cell + 7.7)) - 0.5) * 0.5)));
    col = mix(col, vec3(0.15, 0.45, 1.0), spot * smoothstep(0.2, 0.5, h) * (1.0 - uFin));

    // Fins: tail and belly fins go gold, dorsal goes deep blue.
    if (uFin > 0.5) {
      col = vLocal.y > 0.3 ? vec3(0.08, 0.22, 0.6) : vec3(0.98, 0.86, 0.2);
      if (vLocal.x > 1.4) col = vec3(0.95, 0.9, 0.22);
    }

    // Eye.
    float eye = 1.0 - smoothstep(0.045, 0.06, length(vLocal.xy - vec2(-1.3, 0.12)));
    col = mix(col, vec3(0.02), eye);

    float diff = max(dot(n, l), 0.0) * 0.65 + 0.45;
    float rim = pow(1.0 - max(dot(n, v), 0.0), 2.5);
    vec3 outCol = col * diff + rim * vec3(0.79, 0.95, 0.23) * 0.55;
    // Underwater haze.
    outCol = mix(outCol, vec3(0.06, 0.16, 0.36), 0.12);
    gl_FragColor = vec4(outCol, 1.0);
  }
`;
