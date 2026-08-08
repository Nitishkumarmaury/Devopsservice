import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, children, align = "left", className }: Readonly<SectionHeadingProps>) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl min-w-0 [overflow-wrap:anywhere]", className)}>
      {eyebrow ? (
        <p className="inline-flex rounded-lg border border-[#4da3ff]/18 bg-[#4da3ff]/8 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-normal text-[#b9ddff] shadow-[0_12px_32px_rgba(77,163,255,0.08)]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-normal text-[var(--text-primary)] sm:text-5xl">{title}</h2>
      {children ? <div className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">{children}</div> : null}
    </div>
  );
}
