"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutions } from "@/data/landing";
import { cn } from "@/lib/utils";

export function SolutionsSection() {
  const [active, setActive] = useState(0);
  const solution = solutions[active];

  return (
    <section id="solutions" className="border-y border-white/10 bg-[#090d14]/62 py-14 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading title="Infrastructure support for the stage you are in." eyebrow="Solutions">
          <p>
            The right DevOps path depends on whether you are launching, scaling, supporting clients, or recovering production stability.
          </p>
        </SectionHeading>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.65fr_1fr]">
          <div role="tablist" aria-label="Business stage" className="grid gap-3">
            {solutions.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-controls="solution-panel"
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-lg border px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300",
                  index === active ? "border-cyan-300/35 bg-cyan-300/[0.075] text-white" : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.055]",
                )}
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">0{index + 1}</span>
                <span className="mt-2 block text-base font-semibold">{item.name}</span>
              </button>
            ))}
          </div>

          <div className="min-h-[360px] rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-glow">
            <AnimatePresence mode="wait">
              <motion.div
                key={solution.name}
                id="solution-panel"
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">Selected Stage</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{solution.name}</h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{solution.summary}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {solution.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3 rounded-lg border border-white/10 bg-[#05070b]/62 p-4 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                      {bullet}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
