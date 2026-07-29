"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
}

/**
 * Animates text from grey (--color-ink-muted) to brand secondary colour
 * letter-by-letter as the element scrolls into view.
 *
 * Uses IntersectionObserver to track entry, then staggers each char via
 * CSS transition-delay so the effect is GPU-accelerated (color transition).
 *
 * Falls back to showing full secondary colour immediately when JS is disabled
 * or prefers-reduced-motion is set.
 */
export function ScrollTextReveal({
  children,
  className,
  as: Tag = "span",
}: Readonly<ScrollTextRevealProps>) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chars = children.split("");

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      aria-label={children}
      className={cn(className)}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block transition-[color] duration-300 ease-out"
          style={
            {
              color: revealed ? "var(--color-secondary)" : "var(--color-ink-muted)",
              transitionDelay: revealed ? `${i * 18}ms` : "0ms",
            } as CSSProperties
          }
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </Tag>
  );
}
