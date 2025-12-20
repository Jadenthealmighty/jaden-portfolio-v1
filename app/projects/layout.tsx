"use client";

import { useState } from "react";
import CubeBackground from "app/components/CubeBackground";

type ProjectsLayoutProps = {
  children: (props: {
    focalLength: number;
    setFocalLength: React.Dispatch<React.SetStateAction<number>>;
  }) => React.ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  const [focalLength, setFocalLength] = useState(2.5);

  return (
    <section className="relative min-h-screen text-white">
      <CubeBackground focalLength={focalLength} />

      {/* UI layer */}
      <div className="relative z-10">
        {children({
          focalLength,
          setFocalLength,
        })}
      </div>
    </section>
  );
}
