import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlowCard({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <article
      className={cn(
        "aurora-panel group relative overflow-hidden rounded-[22px] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_26px_70px_rgba(0,0,0,0.28),0_0_34px_rgba(53,214,237,0.08)] sm:p-6",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-300/[0.055] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      {children}
    </article>
  );
}
