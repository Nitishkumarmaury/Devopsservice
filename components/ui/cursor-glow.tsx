"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.2;

    const updateGlow = () => {
      frame = 0;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(520px circle at ${x}px ${y}px, rgba(77, 163, 255, 0.07), rgba(125, 211, 252, 0.035) 22%, transparent 45%)`;
      }
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
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{
        background:
          "radial-gradient(520px circle at 50% 20%, rgba(77, 163, 255, 0.07), rgba(125, 211, 252, 0.035) 22%, transparent 45%)",
        willChange: "background",
      }}
    />
  );
}
