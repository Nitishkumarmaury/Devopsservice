import { Boxes, Cloud, Database, GitBranch, HardDrive, MonitorCheck, Users } from "lucide-react";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

type ArchitectureDiagramProps = {
  blueprint: InfrastructureBlueprint;
};

const approvedNodes = [
  {
    label: "Users",
    detail: "Visitor and application traffic",
    Icon: Users,
  },
  {
    label: "CDN / Reverse Proxy",
    detail: "TLS, caching, routing, and edge protection",
    Icon: Cloud,
  },
  {
    label: "Application Services",
    detail: "Runtime, workers, containers, or managed services",
    Icon: Boxes,
  },
  {
    label: "Database and Cache",
    detail: "Primary datastore, cache, and migration path",
    Icon: Database,
  },
  {
    label: "CI/CD and Observability",
    detail: "Pipeline, release checks, metrics, logs, alerts",
    Icon: GitBranch,
  },
  {
    label: "Backups and Object Storage",
    detail: "Recovery points, retention, and restore testing",
    Icon: HardDrive,
  },
] as const;

export function ArchitectureDiagram({ blueprint }: Readonly<ArchitectureDiagramProps>) {
  const componentPreview = blueprint.recommendedArchitecture.components.slice(0, 4).join(" / ");
  const flowText = approvedNodes.map((node) => node.label).join(" to ");

  return (
    <div className="aurora-panel relative overflow-hidden rounded-2xl p-4 sm:p-5">
      <div className="absolute inset-0 soft-grid opacity-35" aria-hidden="true" />
      <p className="sr-only">Architecture flow: {flowText}</p>
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-700">Architecture Flow</p>
            <h4 className="mt-1 text-base font-semibold text-[var(--text-primary)]">{blueprint.recommendedArchitecture.title}</h4>
          </div>
          <MonitorCheck className="hidden h-5 w-5 text-rose-600 sm:block" aria-hidden="true" />
        </div>

        <div className="relative grid gap-3 lg:grid-cols-6">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            aria-hidden="true"
            viewBox="0 0 600 120"
            preserveAspectRatio="none"
          >
            <path
              d="M50 60 C130 18 170 18 250 60 S370 102 450 60 S530 18 590 60"
              className="advisor-diagram-beam"
            />
          </svg>

          {approvedNodes.map(({ label, detail, Icon }, index) => (
            <div
              key={label}
              className="advisor-node-glow relative rounded-2xl border border-rose-100 bg-white/72 p-3 shadow-[0_18px_55px_rgba(15,34,48,0.08)]"
              style={{ animationDelay: `${index * 160}ms` }}
            >
              <div className="flex items-start gap-3 lg:block">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-rose-100 bg-white/72 p-3">
          <p className="text-xs leading-5 text-[var(--text-secondary)]">
            Component signal: <span className="text-rose-700">{componentPreview}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
