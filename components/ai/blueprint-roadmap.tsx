"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck, Clock3, Milestone, PlayCircle, ShieldCheck } from "lucide-react";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";
import { cn } from "@/lib/utils";

type BlueprintRoadmapProps = {
  phases: InfrastructureBlueprint["implementationPhases"];
};

function PhaseList({ title, items, Icon }: { title: string; items: string[]; Icon: typeof CheckCircle2 }) {
  return (
    <div className="rounded-xl border border-rose-100 bg-white/72 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-rose-700" aria-hidden="true" />
        <h5 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h5>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlueprintRoadmap({ phases }: Readonly<BlueprintRoadmapProps>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = phases[activeIndex] ?? phases[0];
  const progress = useMemo(() => ((activeIndex + 1) / Math.max(phases.length, 1)) * 100, [activeIndex, phases.length]);

  if (!activePhase) return null;

  return (
    <div className="aurora-panel overflow-hidden rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-700">Implementation Roadmap</p>
          <h4 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{activePhase.title}</h4>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">{activePhase.objective}</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-rose-100 bg-white/72 px-3 py-2 text-sm font-semibold text-rose-800">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          {activePhase.duration}
        </div>
      </div>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-rose-100" aria-hidden="true">
          <div className="h-full rounded-full aurora-gradient transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div
          className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2"
          role="tablist"
          aria-label="Implementation phases"
        >
          {phases.map((phase, index) => {
            const selected = activeIndex === index;

            return (
              <button
                key={`${phase.phase}-${phase.title}`}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "min-h-24 min-w-0 rounded-xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400",
                  selected
                    ? "border-rose-200 bg-rose-50 text-rose-900 shadow-[0_16px_40px_rgba(14,165,183,0.12)]"
                    : "border-rose-100 bg-white/72 text-[var(--text-secondary)] hover:bg-rose-50 hover:text-[var(--text-primary)]",
                )}
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                  {selected ? <PlayCircle className="h-4 w-4" aria-hidden="true" /> : <Milestone className="h-4 w-4" aria-hidden="true" />}
                  {phase.phase}
                </span>
                <span className="mt-2 block break-words text-sm font-semibold leading-5">{phase.title}</span>
                <span className="mt-1 block text-xs text-[var(--text-muted)]">{phase.duration}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <PhaseList title="Actions" items={activePhase.actions} Icon={Milestone} />
        <PhaseList title="Deliverables" items={activePhase.deliverables} Icon={ClipboardCheck} />
        <PhaseList title="Validation" items={activePhase.validation} Icon={ShieldCheck} />
      </div>
    </div>
  );
}
