"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type MarqueeItem = {
  name: string;
  color?: string;
};

type MarqueeProps = {
  items: readonly MarqueeItem[];
  className?: string;
};

export function Marquee({ items, className }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div className={cn("group overflow-hidden", className)}>
      <div className="marquee-track flex w-max items-center gap-3 group-hover:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <span
            key={`${item.name}-${index}`}
            className={cn(
              "tech-pill rounded-full border border-rose-100 bg-white/72 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)] shadow-[0_12px_34px_rgba(190,24,93,0.08)] transition hover:border-[var(--tech-color)] hover:bg-rose-50 hover:text-[var(--tech-color)]",
              index >= items.length && "hidden sm:inline-flex",
            )}
            style={{ "--tech-color": item.color ?? "#43d9c5" } as CSSProperties}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
