import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
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

export function PageHero({ eyebrow, title, highlight, children, actions, visual, dark = false }: Readonly<PageHeroProps>) {
  const titleContent = highlight && title.includes(highlight) ? (
    <>
      {title.split(highlight)[0]}
      <GradientText>{highlight}</GradientText>
      {title.split(highlight).slice(1).join(highlight)}
    </>
  ) : (
    title
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 sm:pt-32",
        dark ? "bg-[linear-gradient(135deg,#0f1f2f_0%,#123846_100%)] text-white" : "bg-[var(--background)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark
            ? "bg-[radial-gradient(circle_at_18%_12%,rgba(61,184,197,0.18),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(213,166,69,0.13),transparent_32%)]"
            : "bg-[radial-gradient(circle_at_16%_10%,rgba(14,165,183,0.09),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(49,92,148,0.07),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.74),rgba(242,247,250,0.5))]",
        )}
      />
      <Container className="relative z-10">
        <div className={cn("grid min-w-0 gap-10 py-12 sm:py-20", visual ? "lg:grid-cols-[1fr_0.8fr] lg:items-center" : "")}>
          <div className="min-w-0 max-w-4xl [overflow-wrap:anywhere]">
            <p
              className={cn(
                "font-mono text-xs font-semibold uppercase leading-6 tracking-normal",
                dark ? "text-cyan-100" : "text-[var(--rose-dark)]",
              )}
            >
              {eyebrow}
            </p>
            <h1
              className={cn(
                "mt-5 text-4xl font-semibold leading-[1.04] tracking-normal sm:text-6xl lg:text-7xl",
                dark ? "text-white" : "text-[var(--text-primary)]",
              )}
            >
              {titleContent}
            </h1>
            {children ? (
              <div className={cn("mt-6 max-w-3xl text-base leading-8 sm:text-lg", dark ? "text-white/76" : "text-[var(--text-secondary)]")}>
                {children}
              </div>
            ) : null}
            {actions ? <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
          </div>
          {visual ? <div className="relative min-w-0">{visual}</div> : null}
        </div>
      </Container>
    </section>
  );
}
