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

export function PageHero({ eyebrow, title, highlight, children, actions, visual, dark = false }: PageHeroProps) {
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
        dark ? "bg-[linear-gradient(135deg,#172033_0%,#412747_100%)] text-white" : "bg-[var(--background)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark
            ? "bg-[radial-gradient(circle_at_18%_12%,rgba(214,107,154,0.28),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(118,103,216,0.24),transparent_32%)]"
            : "bg-[radial-gradient(circle_at_15%_10%,rgba(214,107,154,0.14),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(118,103,216,0.12),transparent_30%),radial-gradient(circle_at_70%_80%,rgba(66,174,181,0.08),transparent_34%)]",
        )}
      />
      <Container className="relative z-10">
        <div className={cn("grid gap-10 py-16 sm:py-20", visual ? "lg:grid-cols-[1fr_0.8fr] lg:items-center" : "")}>
          <div className="max-w-4xl">
            <p
              className={cn(
                "font-mono text-xs font-semibold uppercase tracking-[0.22em]",
                dark ? "text-rose-100" : "text-[var(--rose-dark)]",
              )}
            >
              {eyebrow}
            </p>
            <h1
              className={cn(
                "mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl",
                dark ? "text-white" : "text-[var(--text-primary)]",
              )}
            >
              {titleContent}
            </h1>
            {children ? (
              <div className={cn("mt-6 max-w-3xl text-base leading-8 sm:text-lg", dark ? "text-rose-50/82" : "text-[var(--text-secondary)]")}>
                {children}
              </div>
            ) : null}
            {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
          </div>
          {visual ? <div className="relative">{visual}</div> : null}
        </div>
      </Container>
    </section>
  );
}
