"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const easeOut = (time: number) => 1 - Math.pow(1 - time, 3);

export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lenis: Lenis | null = null;

    const stop = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      lenis?.destroy();
      lenis = null;
    };

    const start = () => {
      if (media.matches || lenis) return;

      lenis = new Lenis({
        anchors: {
          duration: 0.55,
          easing: easeOut,
          offset: -120,
        },
        duration: 0.75,
        easing: easeOut,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = window.requestAnimationFrame(raf);
      };

      frame = window.requestAnimationFrame(raf);
    };

    const syncPreference = () => {
      if (media.matches) {
        stop();
        return;
      }

      start();
    };

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => {
      media.removeEventListener("change", syncPreference);
      stop();
    };
  }, []);

  return null;
}
