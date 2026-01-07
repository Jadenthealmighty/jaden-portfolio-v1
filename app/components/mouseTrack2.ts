import { useEffect, useState } from "react";

export type PointerPosition = {
  x: number;
  y: number;
};

export function usePointerPosition(): PointerPosition {
  const [pos, setPos] = useState<PointerPosition>({ x: 90, y: 90 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return pos;
}
