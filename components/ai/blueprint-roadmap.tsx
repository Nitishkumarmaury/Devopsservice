import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

type BlueprintRoadmapProps = {
  phases: InfrastructureBlueprint["implementationPhases"];
};

export function BlueprintRoadmap({ phases }: BlueprintRoadmapProps) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white/72 p-4 sm:p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-700">Implementation Roadmap</p>
      <div className="mt-5 space-y-5">
        {phases.map((phase, index) => (
          <div key={`${phase.phase}-${phase.title}`} className="relative pl-8">
            {index < phases.length - 1 ? (
              <span className="absolute left-[11px] top-7 h-[calc(100%+0.65rem)] w-px bg-rose-200" aria-hidden="true" />
            ) : null}
            <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-rose-200 bg-rose-50 font-mono text-[10px] text-rose-700">
              {index + 1}
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{phase.phase}</p>
            <h4 className="mt-1 text-base font-semibold text-[var(--text-primary)]">{phase.title}</h4>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              {phase.actions.map((action) => (
                <li key={action}>- {action}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
