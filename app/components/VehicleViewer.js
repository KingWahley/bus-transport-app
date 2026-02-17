"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Bounds,
} from "@react-three/drei";

const modelPaths = {
  Standard: "/models/standard-bus.glb",
  Luxury: "/models/luxury-bus.glb",
  VIP: "/models/vip-bus.glb",
};

function BusModel({ busType }) {
  const path = modelPaths[busType] || modelPaths.Standard;
  const { scene } = useGLTF(path);
  const model = useMemo(() => scene.clone(), [scene]);

  return <primitive object={model} />;
}

export default function VehicleViewer({ busType = "Standard" }) {
  const controlsRef = useRef();

  const handleZoomIn = () => {
    if (!controlsRef.current) return;
    controlsRef.current.dollyIn(1.2);
    controlsRef.current.update();
  };

  const handleZoomOut = () => {
    if (!controlsRef.current) return;
    controlsRef.current.dollyOut(1.2);
    controlsRef.current.update();
  };

  const handleReset = () => {
    if (!controlsRef.current) return;
    controlsRef.current.reset();
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Vehicle preview
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Drag to rotate the {busType} bus.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleZoomIn}
            className="rounded-lg border border-white/20 px-3 py-1 text-xs text-white hover:border-white/50"
          >
            Zoom In
          </button>

          <button
            onClick={handleZoomOut}
            className="rounded-lg border border-white/20 px-3 py-1 text-xs text-white hover:border-white/50"
          >
            Zoom Out
          </button>

          <button
            onClick={handleReset}
            className="rounded-lg border border-white/20 px-3 py-1 text-xs text-white hover:border-white/50"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-6 h-80 w-full rounded-2xl overflow-hidden">
       <Canvas camera={{ position: [0, 2, 20], fov: 45 }}>
  <ambientLight intensity={0.8} />
  <directionalLight position={[5, 5, 5]} intensity={1} />

  <Suspense fallback={null}>
    <Bounds fit clip observe margin={1.2}>
      <BusModel
        busType={busType}
        scale={[0.5, 0.5, 0.5]}  // make it smaller
        position={[0, 0, 0]}
      />
    </Bounds>
    <Environment preset="city" />
  </Suspense>

  <OrbitControls
    ref={controlsRef}
    enablePan={false}
    minDistance={3}
    maxDistance={150}      // increase max distance for zoom-out
    autoRotate={true}
    autoRotateSpeed={1.2}
  />
</Canvas>

      </div>
    </div>
  );
}

/* Preload models for performance */
useGLTF.preload("/models/standard-bus.glb");
useGLTF.preload("/models/luxury-bus.glb");
useGLTF.preload("/models/vip-bus.glb");
