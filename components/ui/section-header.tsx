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
            "font-mono text-xs font-bold uppercase tracking-widest",
            dark ? "text-secondary" : "text-secondary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-4 font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {children ? (
        <div className={cn("mt-5 text-base leading-8", dark ? "text-white/70" : "text-ink-secondary")}>
          {children}
        </div>
      ) : null}
    </ScrollReveal>
  );
}
