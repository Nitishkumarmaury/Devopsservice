"use client";

import { useRef } from "react";
import { FileCheck2 } from "lucide-react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

type ProcessStep = {
  title: string;
  deliverable: string;
  objective?: string;
  input?: string;
  work?: string;
  next?: string;
};

type ProcessTimelineProps = {
  steps: readonly ProcessStep[];
  eyebrow?: string;
  title?: string;
  description?: string;
  dark?: boolean;
  layout?: "compact" | "detailed";
};

export function ProcessTimeline({
  steps,
  eyebrow = "Process",
  title = "A smooth project flow from audit to support.",
  description = "Each stage keeps decisions, validation, and handover visible before changes reach production.",
  dark = false,
  layout = "compact",
}: Readonly<ProcessTimelineProps>) {
  const detailed = layout === "detailed";
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 38%"],
  });

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 lg:py-32",
        dark ? "bg-ink-navy text-white section-grid" : "bg-canvas-soft",
      )}
    >
      <Container className="relative">
        <SectionHeader eyebrow={eyebrow} title={title} dark={dark}>
          {description}
        </SectionHeader>

        <ol ref={timelineRef} className={cn("relative mt-12 grid gap-px", detailed ? "gap-5 lg:gap-6" : "border border-border lg:grid-cols-6")}>
          {/* Scroll-driven progress line for compact layout */}
          {!detailed && (
            <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-px overflow-hidden bg-border lg:block">
              <motion.div
                className="h-full w-full bg-secondary"
                style={{ scaleX: reduceMotion ? 1 : scrollYProgress, transformOrigin: "left" }}
              />
            </div>
          )}

          {steps.map((step, index) => (
            <ScrollReveal key={step.title} as="li" delay={index * 0.07} className="relative h-full min-w-0" from="left">
              <article
                className={cn(
                  "relative h-full min-w-0 border-l-2 p-5 [overflow-wrap:anywhere] sm:p-6",
                  detailed && "lg:grid lg:grid-cols-[0.38fr_1fr] lg:gap-6 lg:p-7",
                  dark
                    ? "border-secondary/40 bg-white/5"
                    : "border-secondary bg-canvas-surface",
                )}
              >
                <div className="min-w-0">
                  <span
                    className={cn(
                      "inline-block border px-2 py-1 font-mono text-xs font-bold",
                      dark ? "border-secondary/40 text-secondary" : "border-secondary text-secondary",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <FileCheck2
                    className={cn("absolute right-5 top-5 h-4 w-4", dark ? "text-white/20" : "text-ink-muted")}
                    aria-hidden="true"
                  />
                  <h3 className={cn("mt-4 font-mono text-base font-semibold leading-7", dark ? "text-white" : "text-ink")}>
                    {step.title}
                  </h3>
                  <p className={cn("mt-2 text-sm leading-6", dark ? "text-white/60" : "text-ink-secondary")}>
                    {step.deliverable}
                  </p>
                </div>

                {step.objective || step.input || step.work || step.next ? (
                  <div className={cn("mt-5 grid min-w-0 gap-3", detailed && "lg:mt-0 lg:grid-cols-2")}>
                    <TimelineDetail title="Objective" text={step.objective} dark={dark} />
                    <TimelineDetail title="Client input" text={step.input} dark={dark} />
                    <TimelineDetail title="Work performed" text={step.work} dark={dark} />
                    <TimelineDetail title="Next step" text={step.next} dark={dark} />
                  </div>
                ) : null}
              </article>
            </ScrollReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function TimelineDetail({ title, text, dark }: Readonly<{ title: string; text?: string; dark: boolean }>) {
  if (!text) return null;

  return (
    <ScrollReveal
      className={cn(
        "min-w-0 border p-4",
        dark ? "border-white/10 bg-white/5" : "border-border bg-canvas-soft",
      )}
    >
      <p className={cn("font-mono text-xs font-bold uppercase tracking-widest", dark ? "text-secondary" : "text-secondary")}>
        {title}
      </p>
      <p className={cn("mt-2 text-sm leading-6", dark ? "text-white/60" : "text-ink-secondary")}>{text}</p>
    </ScrollReveal>
  );
}
