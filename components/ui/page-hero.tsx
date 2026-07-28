import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  children?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  dark?: boolean;
};

export function PageHero({ eyebrow, title, highlight, children, actions, visual, dark = true }: Readonly<PageHeroProps>) {
  const titleContent = highlight && title.includes(highlight) ? (
    <>
      {title.split(highlight)[0]}
      <span className="text-[#4da3ff]">{highlight}</span>
      {title.split(highlight).slice(1).join(highlight)}
    </>
  ) : (
    title
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-[#d6ebff]/10 pt-28 sm:pt-32",
        dark ? "bg-[linear-gradient(135deg,#06111f_0%,#081a2e_58%,#0d2338_100%)] text-white" : "bg-[var(--background)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark
            ? "bg-[linear-gradient(rgba(77,163,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.035)_1px,transparent_1px),radial-gradient(circle_at_18%_10%,rgba(77,163,255,0.12),transparent_32%),radial-gradient(circle_at_84%_16%,rgba(125,211,252,0.08),transparent_30%)] bg-[size:56px_56px,56px_56px,auto,auto]"
            : "bg-[linear-gradient(rgba(77,163,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]",
        )}
      />
      <Container className="relative z-10">
        <div className={cn("grid min-w-0 gap-10 py-12 sm:py-20", visual ? "lg:grid-cols-[1fr_0.8fr] lg:items-center" : "")}>
          <ScrollReveal className="min-w-0 max-w-4xl [overflow-wrap:anywhere]">
            <p
              className={cn(
                "inline-flex rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold uppercase leading-5 tracking-normal",
                dark ? "border-[#4da3ff]/18 bg-[#4da3ff]/8 text-[#b9ddff]" : "border-[#4da3ff]/18 bg-[#4da3ff]/8 text-[var(--rose-dark)]",
              )}
            >
              {eyebrow}
            </p>
            <h1
              className={cn(
                "mt-5 max-w-5xl text-4xl font-semibold leading-[1.04] tracking-normal sm:text-6xl lg:text-7xl",
                dark ? "text-white" : "text-[var(--text-primary)]",
              )}
            >
              {titleContent}
            </h1>
            {children ? (
              <div className={cn("mt-6 max-w-3xl text-base leading-8 sm:text-lg", dark ? "text-[#c7d5e6]" : "text-[var(--text-secondary)]")}>
                {children}
              </div>
            ) : null}
            {actions ? <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
          </ScrollReveal>
          {visual ? <ScrollReveal className="relative min-w-0" delay={0.08}>{visual}</ScrollReveal> : null}
        </div>
      </Container>
    </section>
  );
}
