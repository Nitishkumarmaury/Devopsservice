import { ArrowRight, CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { consultationHref } from "@/lib/constants";

const pipelineNodes = [
  { label: "Code", caption: "Source repository", step: "01" },
  { label: "CI/CD", caption: "Build & gate checks", step: "02" },
  { label: "Docker", caption: "Image & container", step: "03" },
  { label: "Cloud", caption: "Production deploy", step: "04" },
  { label: "Monitor", caption: "Signals & alerts", step: "05" },
] as const;

const heroSignals = [
  "SLO-driven reliability",
  "Controlled releases",
  "Observable systems",
] as const;

export function LandingHero() {
  return (
    <section
      id="hero"
      className="relative border-b border-border bg-canvas pt-24 sm:pt-28"
    >
      <Container>
        <div className="grid min-w-0 gap-12 pb-16 pt-8 lg:min-h-[640px] lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:pb-24">
          {/* Left: copy */}
          <div className="min-w-0 [overflow-wrap:anywhere]">
            <p className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-brand">
              Evidence-led cloud reliability
            </p>

            <h1 className="mt-6 font-mono text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              DevOps Consulting for{" "}
              <ScrollTextReveal as="span" className="block mt-1">
                Measurable Production Reliability
              </ScrollTextReveal>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-ink-secondary">
              Cloud engineering for teams that want production changes backed by observable signals: CI/CD gates,
              AWS deployment checks, Docker and Kubernetes readiness, monitoring baselines, and rollback paths.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={consultationHref} variant="primary" className="gap-2">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>

            {/* Trust signals */}
            <div className="mt-7 flex flex-wrap gap-2">
              {heroSignals.map((item) => (
                <span
                  key={item}
                  className="border border-border bg-canvas-surface px-3 py-1.5 font-mono text-xs font-semibold text-ink-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: terminal-style pipeline visual */}
          <HeroPipelineVisual />
        </div>
      </Container>

      {/* Mobile sticky CTA bar — hidden once user reaches contact section */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-canvas p-3 sm:hidden" aria-hidden="true">
        <ButtonLink href={consultationHref} variant="primary" className="w-full justify-center">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Book a Consultation
        </ButtonLink>
      </div>
    </section>
  );
}

function HeroPipelineVisual() {
  return (
    <div className="min-w-0 border border-border bg-canvas-surface">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 border border-border" />
        <span className="h-2.5 w-2.5 border border-border" />
        <span className="h-2.5 w-2.5 border border-border" />
        <span className="ml-2 font-mono text-xs text-ink-muted">cloudopsync — pipeline</span>
      </div>

      {/* Prompt line */}
      <div className="border-b border-border px-4 py-3">
        <p className="font-mono text-xs text-ink-muted">
          <span className="text-secondary">$</span> cloudopsync --run-pipeline --env=production
        </p>
      </div>

      {/* Pipeline steps */}
      {pipelineNodes.map(({ label, caption, step }) => (
        <div
          key={label}
          className="flex items-start gap-4 border-b border-border px-4 py-3 last:border-0"
        >
          <span className="mt-0.5 font-mono text-xs font-bold text-ink-muted">{step}</span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-sm font-semibold text-ink">{label}</p>
            <p className="mt-0.5 font-mono text-xs text-ink-muted">{caption}</p>
          </div>
          <span className="mt-0.5 font-mono text-xs font-bold text-brand">✓ ok</span>
        </div>
      ))}

      {/* Status line */}
      <div className="border-t border-border bg-canvas-soft px-4 py-3">
        <p className="font-mono text-xs text-brand">
          ✓ pipeline complete — all checks passed
        </p>
      </div>
    </div>
  );
}
