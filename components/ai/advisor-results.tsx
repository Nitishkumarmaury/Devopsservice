"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Check,
  Copy,
  Download,
  Edit3,
  ListChecks,
  Radar,
  RotateCcw,
  Send,
} from "lucide-react";
import { ArchitectureDiagram } from "@/components/ai/architecture-diagram";
import { BlueprintRoadmap } from "@/components/ai/blueprint-roadmap";
import { BlueprintTabs } from "@/components/ai/blueprint-tabs";
import { Button, buttonClassName } from "@/components/ui/button";
import { formatAdvisorRequestForContact, type AdvisorRequest } from "@/lib/ai/advisor-schema";
import { trackAdvisorEvent } from "@/lib/ai/advisor-analytics";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

type AdvisorResultsProps = {
  blueprint: InfrastructureBlueprint;
  requestValues: AdvisorRequest;
  generatedAt?: string;
  onEdit: () => void;
  onStartOver: () => void;
};

function markdownList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function buildBlueprintMarkdown(blueprint: InfrastructureBlueprint, values: AdvisorRequest, generatedAt?: string) {
  return `# Cloud Architecture Advisor Blueprint

Generated${generatedAt ? `: ${new Date(generatedAt).toLocaleString()}` : ""}

## Executive Summary

${blueprint.executiveSummary}

## Input Analysis

Workload profile: ${blueprint.inputAnalysis.workloadProfile}

Architecture drivers:
${markdownList(blueprint.inputAnalysis.architectureDrivers)}

Risk signals:
${markdownList(blueprint.inputAnalysis.riskSignals)}

## Requirements Snapshot

${formatAdvisorRequestForContact(values)}

## Requirement Coverage
${blueprint.requirementCoverage
  .map(
    (item) =>
      `### ${item.requirement}\nRecommendation: ${item.recommendation}\nImplementation step: ${item.implementationStep}`,
  )
  .join("\n\n")}

## Recommended Architecture

### ${blueprint.recommendedArchitecture.title}

${blueprint.recommendedArchitecture.description}

${markdownList(blueprint.recommendedArchitecture.components)}

## Deployment Strategy

${blueprint.deploymentStrategy.summary}

${markdownList(blueprint.deploymentStrategy.steps)}

## Observability Plan

${blueprint.observabilityPlan.summary}

### Tools
${markdownList(blueprint.observabilityPlan.tools)}

### Alerts
${markdownList(blueprint.observabilityPlan.recommendedAlerts)}

## Security Priorities
${markdownList(blueprint.securityPriorities)}

## Backup And Recovery
${markdownList(blueprint.backupAndRecovery)}

## Scaling Plan
${markdownList(blueprint.scalingPlan)}

## Cost Considerations
${markdownList(blueprint.costConsiderations)}

## Implementation Phases
${blueprint.implementationPhases
  .map(
    (phase) =>
      `### ${phase.phase}: ${phase.title}\nDuration: ${phase.duration}\nObjective: ${phase.objective}\n\nActions:\n${markdownList(phase.actions)}\n\nDeliverables:\n${markdownList(phase.deliverables)}\n\nValidation:\n${markdownList(phase.validation)}`,
  )
  .join("\n\n")}

## Assumptions
${markdownList(blueprint.assumptions)}

## Discovery Call Questions
${markdownList(blueprint.questionsForDiscoveryCall)}

## Professional Review Notice

An automated preliminary blueprint is a useful starting point. A production architecture still requires validation against your application, traffic, security requirements, budget, and existing systems.
`;
}

function InputAnalysisPanel({ blueprint, requestValues }: { blueprint: InfrastructureBlueprint; requestValues: AdvisorRequest }) {
  const summaryItems = [
    ["Stack", requestValues.technologyStack],
    ["Database", requestValues.database],
    ["Traffic", `${requestValues.expectedMonthlyUsers} monthly / ${requestValues.expectedConcurrentUsers} concurrent`],
    ["Platform", requestValues.preferredCloudPlatform],
  ];

  return (
    <div className="min-w-0 rounded-2xl border border-rose-100 bg-white/72 p-4 [overflow-wrap:anywhere] sm:p-5">
      <div>
        <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-rose-700 sm:tracking-[0.18em]">Input Analysis</p>
        <h4 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">What the advisor understood</h4>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--text-secondary)]">{blueprint.inputAnalysis.workloadProfile}</p>
        <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryItems.map(([label, value]) => (
            <div key={label} className="min-w-0 rounded-xl border border-rose-100 bg-white/78 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{label}</p>
              <p className="mt-1 break-words text-sm font-semibold leading-6 text-[var(--text-primary)]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 rounded-xl border border-rose-100 bg-white/72 p-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-rose-700" aria-hidden="true" />
            <h5 className="text-sm font-semibold text-[var(--text-primary)]">Architecture drivers</h5>
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)] [overflow-wrap:anywhere]">
            {blueprint.inputAnalysis.architectureDrivers.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 rounded-xl border border-rose-100 bg-white/72 p-4">
          <div className="flex items-center gap-2">
            <Radar className="h-4 w-4 text-rose-700" aria-hidden="true" />
            <h5 className="text-sm font-semibold text-[var(--text-primary)]">Risk signals</h5>
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)] [overflow-wrap:anywhere]">
            {blueprint.inputAnalysis.riskSignals.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RequirementCoveragePanel({ coverage }: { coverage: InfrastructureBlueprint["requirementCoverage"] }) {
  return (
    <div className="min-w-0 rounded-2xl border border-rose-100 bg-white/72 p-4 [overflow-wrap:anywhere] sm:p-5">
      <div className="flex min-w-0 flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-rose-700 sm:tracking-[0.18em]">Requirement Coverage</p>
          <h4 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">Selected services mapped to implementation</h4>
        </div>
        <div className="hidden rounded-xl border border-rose-100 bg-white/78 px-3 py-2 text-sm font-semibold text-rose-800 sm:inline-flex">
          {coverage.length} priorities
        </div>
      </div>

      <div className="mt-5 grid gap-3 xl:grid-cols-2">
        {coverage.map((item) => (
          <article key={item.requirement} className="min-w-0 rounded-xl border border-rose-100 bg-white/76 p-4 shadow-[0_16px_42px_rgba(15,34,48,0.06)] [overflow-wrap:anywhere]">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-700">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h5 className="text-sm font-semibold text-[var(--text-primary)]">{item.requirement}</h5>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.recommendation}</p>
              </div>
            </div>
            <div className="mt-4 min-w-0 rounded-lg border border-rose-100 bg-rose-50/70 p-3">
              <div className="flex min-w-0 items-center gap-2 text-xs font-semibold uppercase leading-5 tracking-[0.1em] text-rose-800 sm:tracking-[0.12em]">
                <ListChecks className="h-4 w-4" aria-hidden="true" />
                Implementation step
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.implementationStep}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AdvisorResults({
  blueprint,
  requestValues,
  generatedAt,
  onEdit,
  onStartOver,
}: AdvisorResultsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const markdown = useMemo(
    () => buildBlueprintMarkdown(blueprint, requestValues, generatedAt),
    [blueprint, generatedAt, requestValues],
  );

  const copyBlueprint = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2200);
    }
  };

  const downloadBlueprint = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = requestValues.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    link.href = url;
    link.download = `${safeName || "cloud"}-architecture-blueprint.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const sendToContact = () => {
    const params = new URLSearchParams({
      requestType: "Production Audit",
      projectType: "Cloud Infrastructure",
      currentInfrastructure: formatAdvisorRequestForContact(requestValues, blueprint.executiveSummary).slice(0, 1200),
      projectDetails: [
        `Please review this preliminary infrastructure blueprint: ${blueprint.executiveSummary}`,
        requestValues.projectName ? `Project/application: ${requestValues.projectName}` : "",
        "I would like a professional validation and implementation plan.",
      ]
        .filter(Boolean)
        .join("\n\n")
        .slice(0, 2500),
    });
    trackAdvisorEvent("ai_consultation_clicked", { source: "send_blueprint" });
    window.location.href = `/contact?${params.toString()}`;
  };

  return (
    <div className="min-w-0 space-y-5 [overflow-wrap:anywhere]">
      <div className="aurora-panel min-w-0 rounded-2xl p-4 sm:p-5">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-rose-700 sm:tracking-[0.18em]">Executive Summary</p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">Preliminary cloud blueprint</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{blueprint.executiveSummary}</p>
        </div>
        <div className="mt-5 grid min-w-0 grid-cols-1 gap-2 border-t border-white/10 pt-4 sm:grid-cols-2">
          <Button type="button" variant="secondary" className="w-full" onClick={copyBlueprint}>
              {copyState === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy"}
          </Button>
          <Button type="button" variant="secondary" className="w-full" onClick={downloadBlueprint}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </Button>
        </div>
      </div>

      <InputAnalysisPanel blueprint={blueprint} requestValues={requestValues} />
      <RequirementCoveragePanel coverage={blueprint.requirementCoverage} />
      <ArchitectureDiagram blueprint={blueprint} />
      <BlueprintTabs blueprint={blueprint} />
      <BlueprintRoadmap phases={blueprint.implementationPhases} />

      <div className="min-w-0 rounded-2xl border border-rose-100 bg-white/72 p-4 [overflow-wrap:anywhere] sm:p-5">
        <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-rose-700 sm:tracking-[0.18em]">Assumptions</p>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
          {blueprint.assumptions.map((assumption) => (
            <li key={assumption}>- {assumption}</li>
          ))}
        </ul>
      </div>

      <div className="aurora-panel min-w-0 rounded-2xl p-4 shadow-glow sm:p-5">
        <p className="text-lg font-semibold text-[var(--text-primary)]">Review this architecture with an engineer.</p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          An automated preliminary blueprint is a useful starting point. A production architecture still requires validation
          against your application, traffic, security requirements, budget, and existing systems.
        </p>
        <div className="mt-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/contact?requestType=Production%20Audit&projectType=Cloud%20Infrastructure"
            className={buttonClassName("primary", "w-full sm:w-auto")}
            onClick={() => trackAdvisorEvent("ai_consultation_clicked", { source: "professional_review" })}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            Review This Architecture
          </Link>
          <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={sendToContact}>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send This Blueprint
          </Button>
          <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={onEdit}>
            <Edit3 className="h-4 w-4" aria-hidden="true" />
            Edit Requirements
          </Button>
          <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={onStartOver}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}
