"use client";
import { useEffect, useState } from "react";

export default function TrackPointer() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true, // ← critical for scrolling
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <div>({pos.x}, {pos.y})</div>;
}
