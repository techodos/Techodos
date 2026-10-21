import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Abstract hero scene: a soft particle field, a few floating shapes and two glass-like
 * "UI panels". Deliberately calm — slow drift plus a gentle pointer parallax.
 */

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    // Deterministic pseudo-random so the field looks the same on every visit.
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      const r = 3 + rand() * 6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) - 3;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#b7c1ff" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Floating({ children, speed = 1, offset = 0, amp = 0.15 }: { children: React.ReactNode; speed?: number; offset?: number; amp?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (!ref.current) return;
    ref.current.position.y = Math.sin(t) * amp;
    ref.current.rotation.x = Math.sin(t * 0.6) * 0.15;
    ref.current.rotation.y += 0.003 * speed;
  });
  return <group ref={ref}>{children}</group>;
}

function Panel({ w = 1.3, h = 0.82 }: { w?: number; h?: number }) {
  const geo = useMemo(() => new THREE.BoxGeometry(w, h, 0.03), [w, h]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  return (
    <group>
      <mesh geometry={geo}>
        <meshStandardMaterial color="#141a2b" metalness={0.6} roughness={0.25} transparent opacity={0.72} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#8b9cff" transparent opacity={0.45} />
      </lineSegments>
      {/* "content" bars on the panel */}
      {[0.22, 0.05, -0.12].map((y, i) => (
        <mesh key={y} position={[-w / 2 + 0.18 + (i === 0 ? 0.2 : 0.35) , y, 0.02]}>
          <planeGeometry args={[i === 0 ? 0.4 : 0.7, 0.05]} />
          <meshBasicMaterial color={i === 0 ? "#c9cfff" : "#8b9cff"} transparent opacity={i === 0 ? 0.8 : 0.35} />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const wide = viewport.width > 7;
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.18, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -pointer.y * 0.1, 0.04);
  });
  return (
    <group ref={ref} position={[wide ? viewport.width * 0.22 : 0, wide ? 0.1 : -viewport.height * 0.22, 0]} scale={wide ? 1 : 0.6}>
      {children}
    </group>
  );
}

function Shapes() {
  const { viewport } = useThree();
  // On narrow screens the copy sits over the scene: keep only the faint sphere behind it.
  if (viewport.width <= 7) {
    return (
      <mesh position={[0, -0.6, -4]}>
        <icosahedronGeometry args={[3.2, 2]} />
        <meshBasicMaterial color="#8b9cff" wireframe transparent opacity={0.05} />
      </mesh>
    );
  }
  return (
    <Rig>
      <group position={[-0.9, 1.75, -1.2]}>
        <Floating speed={0.7} amp={0.12}>
          <mesh>
            <icosahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial color="#8b9cff" metalness={0.35} roughness={0.3} flatShading />
          </mesh>
        </Floating>
      </group>
      <group position={[2.4, -1.25, -0.6]}>
        <Floating speed={0.9} offset={2} amp={0.14}>
          <mesh rotation={[0.9, 0.3, 0]}>
            <torusGeometry args={[0.38, 0.13, 24, 64]} />
            <meshStandardMaterial color="#c9cfff" metalness={0.25} roughness={0.28} />
          </mesh>
        </Floating>
      </group>
      <group position={[2.6, 1.6, -2.4]}>
        <Floating speed={0.6} offset={4} amp={0.1}>
          <mesh>
            <octahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial color="#c3cbff" metalness={0.4} roughness={0.35} flatShading />
          </mesh>
        </Floating>
      </group>
      <group position={[0.1, -2.0, -2.4]} rotation={[0.1, 0.5, -0.08]}>
        <Floating speed={0.5} offset={1} amp={0.08}>
          <Panel />
        </Floating>
      </group>
      <group position={[1.6, 2.2, -3.4]} rotation={[0.15, -0.4, 0.05]}>
        <Floating speed={0.45} offset={3} amp={0.08}>
          <Panel w={1.1} h={0.68} />
        </Floating>
      </group>
      <mesh position={[0.6, 0, -4]}>
        <icosahedronGeometry args={[3.2, 2]} />
        <meshBasicMaterial color="#8b9cff" wireframe transparent opacity={0.045} />
      </mesh>
    </Rig>
  );
}

export default function HeroScene({ active, reduced, compact }: { active: boolean; reduced: boolean; compact: boolean }) {
  return (
    <Canvas
      dpr={[1, compact ? 1.25 : 1.6]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: !compact, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : active ? "always" : "never"}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      aria-hidden="true"
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} />
      <pointLight position={[-4, -2, 2]} intensity={14} color="#6f82ff" />
      <pointLight position={[4, -1, 2]} intensity={8} color="#c9cfff" />
      <Particles count={compact ? 260 : 700} />
      <Shapes />
    </Canvas>
  );
}
