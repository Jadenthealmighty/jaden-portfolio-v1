import { useEffect, useState } from "react";

export type PointerPosition = {
  x: number;
  y: number;
};

export function usePointerPosition(): PointerPosition {
  const [pos, setPos] = useState<PointerPosition>({ x: 0, y: 0 });

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
