"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, ArrowRight, ClipboardCheck, GitBranch, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useElementInView } from "@/lib/hooks/use-element-in-view";
import { cn } from "@/lib/utils";

const evidenceCards = [
  {
    title: "Measure the baseline",
    label: "Observe",
    icon: Activity,
    image: "/images/devops/infrastructure-analytics-review-card.jpg",
    alt: "Infrastructure analytics review on a tablet dashboard",
    text: "Capture deployment flow, failure modes, latency, resource pressure, health checks, and recovery steps before changing production.",
    proof: ["Current-state map", "Risk register", "Health signals"],
  },
  {
    title: "Control release risk",
    label: "Gate",
    icon: GitBranch,
    image: "/images/devops/cloud-rack-reliability-card.jpg",
    alt: "Cloud server rack representing controlled release infrastructure",
    text: "Use CI/CD gates, environment checks, secrets discipline, rollback paths, and deployment logs so every release leaves evidence.",
    proof: ["Release gates", "Rollback path", "Audit trail"],
  },
  {
    title: "Validate production behavior",
    label: "Verify",
    icon: ShieldCheck,
    image: "/images/devops/cloud-platform-render-card.jpg",
    alt: "Cloud platform render with resilient data storage",
    text: "Track error rate, latency, CPU, memory, disk, SSL, backup jobs, and uptime probes to verify that the system behaves as designed.",
    proof: ["Dashboards", "Alerts", "Backup checks"],
  },
  {
    title: "Document the evidence",
    label: "Handover",
    icon: ClipboardCheck,
    image: "/images/devops/scientific-cloud-server-hero.jpg",
    alt: "Cloud infrastructure server above a digital cloud layer",
    text: "Finish with runbooks, ownership notes, monitoring links, release instructions, and next measurements your team can keep using.",
    proof: ["Runbooks", "Ownership", "Next controls"],
  },
] as const;

const ROTATION_MS = 4500;
const MANUAL_PAUSE_MS = 8000;

export function EvidenceScrollStack() {
  const [active, setActive] = useState(0);
  const [rotationHeld, setRotationHeld] = useState(false);
  const reduceMotion = useReducedMotion();
  const resumeTimer = useRef<number | null>(null);
  const [sectionRef, sectionInView] = useElementInView<HTMLElement>();
  const card = evidenceCards[active];
  const Icon = card.icon;

  useEffect(() => {
    if (reduceMotion || rotationHeld || !sectionInView) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % evidenceCards.length);
    }, ROTATION_MS);

    return () => window.clearInterval(interval);
  }, [rotationHeld, reduceMotion, sectionInView]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const selectCard = (index: number) => {
    setActive(index);
    setRotationHeld(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setRotationHeld(false);
      resumeTimer.current = null;
    }, MANUAL_PAUSE_MS);
  };

  return (
    <section ref={sectionRef} id="evidence" className="border-b border-border bg-canvas py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <ScrollReveal from="left" className="min-w-0 [overflow-wrap:anywhere]">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
              Evidence-based delivery
            </p>
            <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Scientific DevOps: measure, change, validate, repeat.
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-secondary">
              Recommendations are tied to observable signals, controlled changes, and documented outcomes. Buyers can
              review each evidence stage and see how delivery decisions are validated.
            </p>
            <ButtonLink href="/process" variant="secondary" className="mt-7">
              See the validation process
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </ScrollReveal>

          <ScrollReveal
            from="right"
            className={cn(
              "relative min-w-0 border border-border bg-canvas-soft p-4 sm:p-5",
              (rotationHeld || !sectionInView) && "motion-held",
            )}
            style={{ "--auto-duration": `${ROTATION_MS}ms` } as CSSProperties}
            onMouseEnter={() => setRotationHeld(true)}
            onMouseLeave={() => setRotationHeld(false)}
          >
            <div className="relative mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="border border-border bg-canvas px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-ink">
                Evidence sequence
              </span>
            </div>

            <div className="relative grid gap-px border border-border bg-border lg:grid-cols-[1fr_0.45fr]">
              <div className="relative min-h-[500px] overflow-hidden bg-canvas p-4 sm:min-h-[440px] sm:p-5">
                <div className="absolute inset-x-5 top-5 hidden h-28 sm:block">
                  {evidenceCards.map((item, index) => {
                    const PreviewIcon = item.icon;
                    const offset = (index - active + evidenceCards.length) % evidenceCards.length;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => selectCard(index)}
                        className={cn(
                          "absolute left-0 right-0 flex items-center justify-between border px-4 py-3 text-left transition duration-300",
                          index === active
                            ? "z-20 border-border bg-canvas-soft text-ink"
                            : "border-border bg-canvas text-ink-muted hover:bg-canvas-soft",
                        )}
                        style={{
                          transform: `translateY(${offset * 20}px) scale(${index === active ? 1 : 1 - offset * 0.035})`,
                          opacity: index === active ? 1 : Math.max(0.18, 0.62 - offset * 0.12),
                          zIndex: evidenceCards.length - offset,
                        }}
                      >
                        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                          <PreviewIcon className="h-4 w-4" aria-hidden="true" />
                          {item.label}
                        </span>
                        {index === active && <span className="h-1 w-8 bg-secondary" />}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.article
                    key={card.title}
                    aria-live="polite"
                    initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -18 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-30 grid min-w-0 gap-5 pt-0 sm:pt-28 md:grid-cols-[0.82fr_1fr] md:items-center"
                  >
                    <div className="relative h-56 min-w-0 overflow-hidden border border-border bg-ink-navy md:h-72">
                      <Image src={card.image} alt={card.alt} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" />
                    </div>
                    <div className="min-w-0 [overflow-wrap:anywhere]">
                      <div className="inline-flex items-center gap-2 border border-border bg-canvas-surface px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {card.label}
                      </div>
                      <h3 className="mt-4 font-mono text-xl font-bold leading-tight tracking-tight text-ink sm:text-2xl">{card.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-ink-secondary">{card.text}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {card.proof.map((item) => (
                          <span key={item} className="border border-border bg-canvas px-2 py-1 font-mono text-xs text-ink-secondary">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              <div className="grid min-w-0 gap-px bg-border sm:grid-cols-4 lg:grid-cols-1">
                {evidenceCards.map((item, index) => {
                  const StepIcon = item.icon;
                  const selected = active === index;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => selectCard(index)}
                      className={cn(
                        "relative min-w-0 overflow-hidden p-4 text-left transition duration-200",
                        selected
                          ? "bg-canvas text-ink"
                          : "bg-canvas-soft text-ink-muted hover:bg-canvas hover:text-ink",
                      )}
                    >
                      <span className="flex h-8 w-8 items-center justify-center border border-border bg-canvas text-secondary">
                        <StepIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="mt-3 block font-mono text-xs font-bold uppercase tracking-widest">{item.label}</span>
                      {selected ? <span className="absolute inset-y-0 left-0 w-1 bg-secondary" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
