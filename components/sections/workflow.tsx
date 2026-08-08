"use client";

import { useRef, useState } from "react";
import { CheckCircle2, CloudCog, Gauge, GitBranch, LockKeyhole, Rocket, SearchCheck } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionGlow } from "@/components/ui/section-glow";
import { workflowStages } from "@/data/landing";
import { cn } from "@/lib/utils";

const stageIcons = [CheckCircle2, CloudCog, GitBranch, LockKeyhole, Rocket, SearchCheck, Gauge] as const;

export function WorkflowSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextActive = Math.min(workflowStages.length - 1, Math.max(0, Math.floor(latest * workflowStages.length)));
    setActive((current) => (current === nextActive ? current : nextActive));
  });

  return (
    <section ref={ref} id="process" className="aurora-section bg-white section-rhythm">
      <SectionGlow className="opacity-70" />
      <Container className="relative z-10">
        <SectionHeading title="From code to production, without the chaos." eyebrow="Workflow">
          <p>
            Each stage is designed to keep business owners, engineering teams, and production systems aligned before changes reach live infrastructure.
          </p>
        </SectionHeading>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-rose-100 md:block" />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-7 hidden h-px origin-left bg-gradient-to-r from-[#f04493] via-[#8057ff] to-[#12a9c7] md:block"
            style={{ scaleX: scrollYProgress, width: "100%" }}
          />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {workflowStages.map((stage, index) => {
              const selected = index === active || index === active - 1;
              const Icon = stageIcons[index] ?? CheckCircle2;
              return (
                <li key={stage.label} className="relative">
                  <div
                    className={cn(
                      "relative z-10 flex h-full min-h-[190px] flex-col rounded-2xl border p-4 transition duration-300",
                      selected
                        ? "border-rose-300/60 bg-[linear-gradient(145deg,rgba(244,249,251,0.95),rgba(245,240,255,0.82))] shadow-[0_18px_48px_rgba(77,163,255,0.12)]"
                        : "border-rose-100 bg-white/72",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={cn("font-mono text-xs font-semibold", selected ? "text-rose-700" : "text-[var(--text-muted)]")}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("grid h-9 w-9 place-items-center rounded-xl border", selected ? "border-rose-200 bg-rose-50 text-rose-700" : "border-rose-100 bg-white text-[var(--text-muted)]")}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-[var(--text-primary)]">{stage.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{stage.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
