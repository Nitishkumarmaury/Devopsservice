"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

type BlueprintTabsProps = {
  blueprint: InfrastructureBlueprint;
};

const tabs = ["Architecture", "Deployment", "Monitoring", "Security", "Scaling", "Implementation"] as const;
type BlueprintTab = (typeof tabs)[number];

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="min-w-0">
      <h4 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)] [overflow-wrap:anywhere]">
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
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-w-0 rounded-2xl border border-rose-100 bg-white/74 p-4 [overflow-wrap:anywhere] sm:p-5">
      <div
        role="tablist"
        aria-label="Blueprint recommendations"
        className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))]"
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
              "min-h-10 min-w-0 rounded-xl border px-3 py-2 text-sm font-semibold leading-tight transition [overflow-wrap:anywhere] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400",
              active === tab
                ? "border-rose-200 bg-rose-50 text-rose-800 shadow-[0_14px_34px_rgba(77,163,255,0.1)]"
                : "border-rose-100 bg-white/72 text-[var(--text-muted)] hover:bg-rose-50 hover:text-[var(--text-primary)]",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          id={`${id}-${active}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-${active}-tab`}
          tabIndex={0}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 min-w-0 rounded-2xl border border-rose-100 bg-white/72 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
        >
          {active === "Architecture" ? (
            <div className="space-y-5">
              <div className="min-w-0">
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
          <div className="grid min-w-0 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="text-sm leading-7 text-[var(--text-secondary)]">{blueprint.observabilityPlan.summary}</p>
            </div>
            <ListBlock title="Tools" items={blueprint.observabilityPlan.tools} />
            <ListBlock title="Recommended alerts" items={blueprint.observabilityPlan.recommendedAlerts} />
          </div>
        ) : null}

        {active === "Security" ? (
          <div className="grid min-w-0 gap-5 md:grid-cols-2">
            <ListBlock title="Security priorities" items={blueprint.securityPriorities} />
            <ListBlock title="Backup and recovery" items={blueprint.backupAndRecovery} />
          </div>
        ) : null}

        {active === "Scaling" ? (
          <div className="grid min-w-0 gap-5 md:grid-cols-2">
            <ListBlock title="Scaling plan" items={blueprint.scalingPlan} />
            <ListBlock title="Cost considerations" items={blueprint.costConsiderations} />
          </div>
        ) : null}

          {active === "Implementation" ? (
            <div className="space-y-4">
              {blueprint.implementationPhases.map((phase) => (
                <div key={`${phase.phase}-${phase.title}`} className="min-w-0 rounded-xl border border-rose-100 bg-white/76 p-4">
                  <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-rose-700 sm:tracking-[0.16em]">{phase.phase}</p>
                    <span className="w-fit max-w-full rounded-lg border border-rose-100 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800">
                      {phase.duration}
                    </span>
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{phase.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{phase.objective}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {phase.actions.map((action) => (
                      <li key={action}>- {action}</li>
                    ))}
                  </ul>
                  <div className="mt-4 grid min-w-0 gap-3 md:grid-cols-2">
                    <ListBlock title="Deliverables" items={phase.deliverables} />
                    <ListBlock title="Validation" items={phase.validation} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
