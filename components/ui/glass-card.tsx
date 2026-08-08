import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children, ...props }: Readonly<HTMLAttributes<HTMLElement>>) {
  return (
    <article
      className={cn(
        "relative min-w-0 overflow-hidden rounded-[24px] border border-white/16 bg-white/[0.075] p-5 shadow-[0_28px_90px_rgba(3,12,26,0.28)] backdrop-blur-xl [overflow-wrap:anywhere] sm:p-7",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
      {children}
    </article>
  );
}
