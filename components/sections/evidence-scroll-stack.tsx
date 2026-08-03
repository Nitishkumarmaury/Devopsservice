"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, ArrowRight, ClipboardCheck, GitBranch, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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

const ROTATION_MS = 3900;
const MANUAL_PAUSE_MS = 6200;

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
    <section ref={sectionRef} id="evidence" className="relative overflow-hidden border-y border-[#d6ebff]/10 bg-[var(--background)] py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(77,163,255,0.08),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(125,211,252,0.06),transparent_28%)]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <div className="min-w-0 [overflow-wrap:anywhere]">
            <p className="font-mono text-xs font-semibold uppercase leading-6 tracking-normal text-[var(--rose-dark)]">
              Evidence sequence
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--text-primary)] sm:text-5xl">
              Observe, gate, verify, handover.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
              Production changes should be based on observable evidence rather than assumptions. Each stage keeps
              baselines, checks, rollback paths, and handover notes visible.
            </p>
            <ButtonLink href="/process" variant="secondary" className="mt-7">
              See the validation process
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div
            className={cn(
              "relative min-w-0 overflow-hidden rounded-[22px] border border-[#d6ebff]/12 bg-[linear-gradient(135deg,#081a2e_0%,#0d2338_100%)] p-4 shadow-[0_34px_110px_rgba(0,0,0,0.3)] sm:p-6",
              (rotationHeld || !sectionInView) && "motion-held",
            )}
            style={{ "--auto-duration": `${ROTATION_MS}ms` } as CSSProperties}
            onMouseEnter={() => setRotationHeld(true)}
            onMouseLeave={() => setRotationHeld(false)}
          >
            <div className="pointer-events-none absolute inset-0 soft-grid opacity-24" />

            <div className="relative mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/62 px-3 py-1.5 font-mono text-xs font-semibold text-[var(--text-secondary)]">
                Evidence sequence
              </span>
            </div>

            <div className="relative grid gap-5 lg:grid-cols-[1fr_0.45fr]">
              <div className="relative min-h-[500px] overflow-hidden rounded-[18px] border border-[#d6ebff]/10 bg-[#06111f]/62 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-h-[440px] sm:p-5">
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
                          "absolute left-0 right-0 flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition duration-300",
                          index === active
                            ? "z-20 border-[#4da3ff]/24 bg-[#0d2338] text-[var(--text-primary)] shadow-[0_18px_48px_rgba(77,163,255,0.12)]"
                            : "border-[var(--border)] bg-[#0d2338]/72 text-[var(--text-muted)]",
                        )}
                        style={{
                          transform: `translateY(${offset * 20}px) scale(${index === active ? 1 : 1 - offset * 0.035})`,
                          opacity: index === active ? 1 : Math.max(0.18, 0.62 - offset * 0.12),
                          zIndex: evidenceCards.length - offset,
                        }}
                      >
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase leading-5 tracking-normal">
                          <PreviewIcon className="h-4 w-4 text-[#4da3ff]" aria-hidden="true" />
                          {item.label}
                        </span>
                        <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-[#4da3ff] via-[#7dd3fc] to-[#ff8a7a]" />
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.article
                    key={card.title}
                    aria-live="polite"
                    initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -18, scale: 0.98 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-30 grid min-w-0 gap-5 pt-0 sm:pt-28 md:grid-cols-[0.82fr_1fr] md:items-center"
                  >
                    <div className="relative h-56 min-w-0 overflow-hidden rounded-[24px] bg-[var(--navy)] shadow-[0_24px_70px_rgba(15,34,48,0.16)] md:h-72">
                      <Image src={card.image} alt={card.alt} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/72 via-transparent to-transparent" />
                    </div>
                    <div className="min-w-0 [overflow-wrap:anywhere]">
                      <div className="inline-flex items-center gap-2 rounded-lg border border-[#4da3ff]/20 bg-[#4da3ff]/10 px-3 py-2 font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-[#b9ddff]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {card.label}
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold tracking-normal text-[var(--text-primary)] sm:text-3xl">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">{card.text}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {card.proof.map((item) => (
                          <span key={item} className="rounded-lg border border-[var(--border)] bg-[#0d2338]/78 px-3 py-1.5 font-mono text-xs font-semibold text-[var(--text-secondary)]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              <div className="grid min-w-0 gap-2 sm:grid-cols-4 lg:grid-cols-1">
                {evidenceCards.map((item, index) => {
                  const StepIcon = item.icon;
                  const selected = active === index;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => selectCard(index)}
                      className={cn(
                        "relative min-w-0 overflow-hidden rounded-2xl border p-4 text-left transition duration-200",
                        selected
                          ? "border-[#4da3ff]/24 bg-[#0d2338] text-[var(--text-primary)] shadow-[0_16px_42px_rgba(77,163,255,0.12)]"
                          : "border-[#d6ebff]/10 bg-[#0d2338]/52 text-[var(--text-muted)] hover:bg-[#12304b]",
                      )}
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#4da3ff]/18 bg-[#4da3ff]/10 text-[var(--rose-dark)]">
                        <StepIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="mt-3 block text-sm font-semibold leading-6">{item.label}</span>
                      {selected ? <span className="auto-progress absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#4da3ff] via-[#7dd3fc] to-[#ff8a7a]" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
