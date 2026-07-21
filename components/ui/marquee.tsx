"use client";

import type { CSSProperties } from "react";
import { BrandIcon3D } from "@/components/ui/brand-icon-3d";
import { cn } from "@/lib/utils";

type MarqueeItem = {
  name: string;
  color?: string;
};

type MarqueeProps = {
  items: readonly MarqueeItem[];
  className?: string;
};

export function Marquee({ items, className }: Readonly<MarqueeProps>) {
  const loop = [...items, ...items];

  return (
    <div className={cn("group overflow-hidden", className)}>
      <div className="marquee-track flex w-max items-center gap-3 group-hover:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <BrandIcon3D
            key={`${item.name}-${index}`}
            name={item.name}
            compact
            className={cn(
              "tech-pill shrink-0 border-rose-100/90 text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:border-[var(--tech-color)] hover:text-[var(--tech-color)]",
            )}
            style={{ "--tech-color": item.color ?? "#43d9c5" } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
