import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TechnologyTag({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border)] bg-white/72 px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] shadow-[0_10px_24px_rgba(65,39,71,0.06)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
