"use client";

import CubeBackground from "app/components/CubeBackground";
import { useState } from "react";

export default function ProjectsPage() {
  const [focalLength, setFocalLength] = useState(50);

  return (

    <>
    <CubeBackground focalLength={focalLength}/>
        <main className="relative z-10 px-12 py-20 max-w-4xl">
        {/* Slider */}
        <div className="mb-10">
            <label className="block text-sm text-gray-400 mb-2">
            Lens Focal Length
            </label>
            <input
            type="range"
            min={0.001}
            max={5}
            step={0.01}
            value={focalLength}
            onChange={(e) => setFocalLength(Number(e.target.value))}
            className="w-64"
            />
        </div>

        <h1 className="text-5xl font-bold mb-6">Projects</h1>

        <p className="text-gray-300 mb-10">
            A selection of computational physics, simulation, and software projects.
        </p>
        </main>
    </>
  );
}
