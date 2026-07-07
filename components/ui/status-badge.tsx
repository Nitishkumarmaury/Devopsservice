import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function StatusBadge({ children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.075] px-3 py-1.5 text-xs font-semibold text-cyan-100 shadow-[0_0_24px_rgba(53,214,237,0.08)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
