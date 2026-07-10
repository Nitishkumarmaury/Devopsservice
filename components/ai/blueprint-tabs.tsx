"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

type BlueprintTabsProps = {
  blueprint: InfrastructureBlueprint;
};

const tabs = ["Architecture", "Deployment", "Monitoring", "Security", "Scaling", "Implementation"] as const;
type BlueprintTab = (typeof tabs)[number];

function ListBlock({ title, items }: Readonly<{ title: string; items: string[] }>) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

export function BlueprintTabs({ blueprint }: Readonly<BlueprintTabsProps>) {
  const [active, setActive] = useState<BlueprintTab>("Architecture");
  const id = useId();

  return (
    <div className="rounded-2xl border border-rose-100 bg-white/74 p-4 sm:p-5">
      <div
        role="tablist"
        aria-label="Blueprint recommendations"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`${id}-${tab}-tab`}
            type="button"
            role="tab"
            aria-selected={active === tab}
            aria-controls={`${id}-${tab}-panel`}
            onClick={() => setActive(tab)}
            className={cn(
              "min-h-10 rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400",
              active === tab
                ? "border-rose-200 bg-rose-50 text-rose-800 shadow-[0_14px_34px_rgba(14,165,183,0.1)]"
                : "border-rose-100 bg-white/72 text-[var(--text-muted)] hover:bg-rose-50 hover:text-[var(--text-primary)]",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        id={`${id}-${active}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${active}-tab`}
        tabIndex={0}
        className="mt-5 rounded-2xl border border-rose-100 bg-white/72 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
      >
        {active === "Architecture" ? (
          <div className="space-y-5">
            <div>
              <h4 className="text-base font-semibold text-[var(--text-primary)]">{blueprint.recommendedArchitecture.title}</h4>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{blueprint.recommendedArchitecture.description}</p>
            </div>
            <ListBlock title="Recommended components" items={blueprint.recommendedArchitecture.components} />
          </div>
        ) : null}

        {active === "Deployment" ? (
          <div className="space-y-5">
            <p className="text-sm leading-7 text-[var(--text-secondary)]">{blueprint.deploymentStrategy.summary}</p>
            <ListBlock title="Deployment steps" items={blueprint.deploymentStrategy.steps} />
          </div>
        ) : null}

        {active === "Monitoring" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="text-sm leading-7 text-[var(--text-secondary)]">{blueprint.observabilityPlan.summary}</p>
            </div>
            <ListBlock title="Tools" items={blueprint.observabilityPlan.tools} />
            <ListBlock title="Recommended alerts" items={blueprint.observabilityPlan.recommendedAlerts} />
          </div>
        ) : null}

        {active === "Security" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <ListBlock title="Security priorities" items={blueprint.securityPriorities} />
            <ListBlock title="Backup and recovery" items={blueprint.backupAndRecovery} />
          </div>
        ) : null}

        {active === "Scaling" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <ListBlock title="Scaling plan" items={blueprint.scalingPlan} />
            <ListBlock title="Cost considerations" items={blueprint.costConsiderations} />
          </div>
        ) : null}

        {active === "Implementation" ? (
          <div className="space-y-4">
            {blueprint.implementationPhases.map((phase) => (
              <div key={`${phase.phase}-${phase.title}`} className="rounded-xl border border-rose-100 bg-white/76 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-rose-700">{phase.phase}</p>
                <h4 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{phase.title}</h4>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {phase.actions.map((action) => (
                    <li key={action}>- {action}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
