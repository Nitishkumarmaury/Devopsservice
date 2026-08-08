import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TechnologyTag({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full min-w-0 items-center rounded-lg border border-[var(--border)] bg-[#0d2338]/76 px-3 py-1.5 font-mono text-xs font-semibold leading-snug text-[var(--text-secondary)] shadow-[0_10px_24px_rgba(0,0,0,0.16)] [overflow-wrap:anywhere]",
        className,
      )}
    >
      {children}
    </span>
  );
}
