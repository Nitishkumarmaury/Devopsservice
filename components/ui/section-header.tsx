import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  children,
  align = "left",
  dark = false,
  className,
}: Readonly<SectionHeaderProps>) {
  return (
    <ScrollReveal className={cn("min-w-0 max-w-3xl [overflow-wrap:anywhere]", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "inline-flex rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold uppercase leading-5 tracking-normal shadow-[0_14px_34px_rgba(77,163,255,0.08)]",
            dark
              ? "border-[#4da3ff]/18 bg-[#4da3ff]/8 text-[#b9ddff]"
              : "border-[#4da3ff]/18 bg-[#4da3ff]/8 text-[var(--rose-dark)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-4xl font-semibold leading-[1.04] tracking-normal sm:text-5xl",
          dark ? "text-white" : "text-[var(--text-primary)]",
        )}
      >
        {title}
      </h2>
      {children ? (
        <div className={cn("mt-5 text-base leading-8 sm:text-lg", dark ? "text-[#c7d5e6]" : "text-[var(--text-secondary)]")}>
          {children}
        </div>
      ) : null}
    </ScrollReveal>
  );
}
