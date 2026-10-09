"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ---------- Backdrop: depth gradient, caustics and light shafts ---------- */

const backdropFrag = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;

  // Cheap caustic web: max of a few warped sine fields.
  float caustic(vec2 p, float t) {
    float c = 0.0;
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      p += vec2(sin(p.y * 1.7 + t * 0.6 + fi), cos(p.x * 1.3 - t * 0.5 + fi * 1.7)) * 0.35;
      c += abs(sin(p.x * 2.1 + t) * cos(p.y * 2.3 - t * 0.8));
    }
    return pow(1.0 - c / 3.0, 6.0);
  }

  void main() {
    vec2 uv = vUv;
    vec3 surface = vec3(0.16, 0.33, 0.62);
    vec3 mid = vec3(0.06, 0.15, 0.36);
    vec3 deep = vec3(0.025, 0.05, 0.14);
    vec3 col = mix(deep, mid, smoothstep(0.0, 0.6, uv.y));
    col = mix(col, surface, smoothstep(0.65, 1.05, uv.y));

    // Caustics stronger near the top.
    float c = caustic(uv * vec2(6.0, 4.0), uTime * 0.6);
    col += vec3(0.79, 0.95, 0.23) * c * 0.18 * smoothstep(0.25, 1.0, uv.y);

    // Vignette.
    col *= 1.0 - 0.35 * length(uv - vec2(0.5, 0.55));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Backdrop({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) {
  const { viewport } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() } }),
    []
  );

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uPointer.value.lerp(pointer.current, 0.05);
  });

  // Twice the camera distance of the origin, so twice the viewport, plus slack for the parallax rig.
  const z = -6;
  const scale = 2 * 1.2;
  return (
    <mesh position={[0, 0, z]} scale={[viewport.width * scale, viewport.height * scale, 1]}>
      <planeGeometry />
      <shaderMaterial
        depthWrite={false}
        fragmentShader={backdropFrag}
        ref={mat}
        uniforms={uniforms}
        vertexShader="varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }"
      />
    </mesh>
  );
}

/* ------------------------------- Bubbles -------------------------------- */

function Bubbles({ count = 220 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      speeds[i] = 0.2 + Math.random() * 0.6;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, dt) => {
    const attr = points.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!attr) {
      return;
    }
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + speeds[i] * dt;
      if (y > 4.5) {
        y = -4.5;
      }
      attr.setY(i, y);
      attr.setX(i, attr.getX(i) + Math.sin(t * 2 + i) * 0.002);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        fragmentShader={`
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float ring = smoothstep(0.5, 0.42, d) * smoothstep(0.22, 0.42, d);
            float hi = smoothstep(0.14, 0.0, length(c - vec2(-0.14, -0.14)));
            float a = ring * 0.55 + hi * 0.8;
            if (a < 0.01) discard;
            gl_FragColor = vec4(vec3(0.85, 0.95, 1.0), a * 0.6);
          }
        `}
        transparent
        vertexShader={`
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (14.0 + fract(position.x * 13.7) * 22.0) / -mv.z;
            gl_Position = projectionMatrix * mv;
          }
        `}
      />
    </points>
  );
}

/* ------------------------------ Camera rig ------------------------------ */

function Rig({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) {
  useFrame(({ camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 0.5, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.current.y * 0.3, 0.03);
    camera.lookAt(0, 0, -1);
  });
  return null;
}

export default function OceanScene({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef(new THREE.Vector2());
  const [visible, setVisible] = useState(true);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    setIsSmall(window.innerWidth < 768);
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove);
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrap.current) {
      io.observe(wrap.current);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div className={className} ref={wrap}>
      <Canvas
        camera={{ fov: 45, position: [0, 0, 6] }}
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.Fog("#0a1a40", 5, 12);
        }}
      >
        <Backdrop pointer={pointer} />
        <Bubbles count={isSmall ? 110 : 220} />
        <Rig pointer={pointer} />
      </Canvas>
    </div>
  );
}
