"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.2;

    const updateGlow = () => {
      frame = 0;
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);
    };

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      if (!frame) {
        frame = window.requestAnimationFrame(updateGlow);
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{
        background:
          "radial-gradient(520px circle at var(--cursor-x, 50%) var(--cursor-y, 20%), rgba(77, 163, 255, 0.09), transparent 45%)",
      }}
    />
  );
}
