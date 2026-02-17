'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1.5} />;
}

export default function BusViewer({ busType }) {
  const modelPath = {
    Standard: '/models/standard-bus.glb',
    Luxury: '/models/luxury-bus.glb',
    VIP: '/models/vip-bus.glb'
  }[busType];

  return (
    <div className="h-[400px] w-full rounded-2xl bg-slate-950">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="city" />
        <Model path={modelPath} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
