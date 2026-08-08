"use client";

import type { MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Easing = "linear" | "ease-in" | "ease-out" | "ease-in-out";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

type ClickSparkProps = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: Easing;
  extraScale?: number;
  className?: string;
  children?: ReactNode;
};

export function ClickSpark({
  sparkColor = "#0ea5b7",
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 420,
  easing = "ease-out",
  extraScale = 1,
  className,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef<number | null>(null);
  const resizeFrameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const viewport = window.visualViewport;
    const width = viewport?.width ?? window.innerWidth;
    const height = viewport?.height ?? window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  function drawFrame(timestamp: number) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      animationRef.current = null;
      return;
    }

    // Pause drawing when the page is hidden to save CPU
    if (typeof document !== "undefined" && document.hidden) {
      animationRef.current = null;
      return;
    }

    const viewport = window.visualViewport;
    const width = viewport?.width ?? window.innerWidth;
    const height = viewport?.height ?? window.innerHeight;

    context.clearRect(0, 0, width, height);

    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = timestamp - spark.startTime;

      if (elapsed >= duration) return false;

      const progress = elapsed / duration;
      const eased = easeFunc(progress);
      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      context.globalAlpha = Math.max(0, 1 - eased);
      context.strokeStyle = sparkColor;
      context.lineWidth = 2;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();

      return true;
    });

    context.globalAlpha = 1;

    if (sparksRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(drawFrame);
    } else {
      animationRef.current = null;
    }
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: coarse)");
    const updatePreference = () => {
      reducedMotionRef.current = media.matches;
      coarsePointerRef.current = pointer.matches;
    };

    updatePreference();
    media.addEventListener("change", updatePreference);
    pointer.addEventListener("change", updatePreference);

    return () => {
      media.removeEventListener("change", updatePreference);
      pointer.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const scheduleResize = () => {
      if (resizeFrameRef.current) return;
      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeFrameRef.current = null;
        resizeCanvas();
      });
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        // ensure canvas sizing and resume any pending animation
        resizeCanvas();
        if (sparksRef.current.length > 0 && !animationRef.current) {
          animationRef.current = requestAnimationFrame(drawFrame);
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", scheduleResize);
    window.visualViewport?.addEventListener("resize", scheduleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", scheduleResize);
      window.visualViewport?.removeEventListener("resize", scheduleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      if (resizeFrameRef.current) {
        cancelAnimationFrame(resizeFrameRef.current);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current || coarsePointerRef.current) return;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, index) => ({
      x: event.clientX,
      y: event.clientY,
      angle: (2 * Math.PI * index) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);

    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(drawFrame);
    }
  };

  return (
    <div className={cn("click-spark-root", className)} onClick={handleClick}>
      <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />
      {children}
    </div>
  );
}

export default ClickSpark;
