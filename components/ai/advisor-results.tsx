"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Copy, Download, Edit3, RotateCcw, Send } from "lucide-react";
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

## Requirements Snapshot

${formatAdvisorRequestForContact(values)}

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
  .map((phase) => `### ${phase.phase}: ${phase.title}\n${markdownList(phase.actions)}`)
  .join("\n\n")}

## Assumptions
${markdownList(blueprint.assumptions)}

## Discovery Call Questions
${markdownList(blueprint.questionsForDiscoveryCall)}

## Professional Review Notice

An automated preliminary blueprint is a useful starting point. A production architecture still requires validation against your application, traffic, security requirements, budget, and existing systems.
`;
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
    <div className="space-y-5">
      <div className="aurora-panel rounded-2xl p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-700">Executive Summary</p>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">Preliminary cloud blueprint</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{blueprint.executiveSummary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={copyBlueprint}>
              {copyState === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy"}
            </Button>
            <Button type="button" variant="secondary" onClick={downloadBlueprint}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download
            </Button>
          </div>
        </div>
      </div>

      <ArchitectureDiagram blueprint={blueprint} />
      <BlueprintTabs blueprint={blueprint} />
      <BlueprintRoadmap phases={blueprint.implementationPhases} />

      <div className="rounded-2xl border border-rose-100 bg-white/72 p-4 sm:p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-700">Assumptions</p>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
          {blueprint.assumptions.map((assumption) => (
            <li key={assumption}>- {assumption}</li>
          ))}
        </ul>
      </div>

      <div className="aurora-panel rounded-2xl p-5 shadow-glow">
        <p className="text-lg font-semibold text-[var(--text-primary)]">Need this blueprint validated and implemented?</p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          An automated preliminary blueprint is a useful starting point. A production architecture still requires validation
          against your application, traffic, security requirements, budget, and existing systems.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/contact?requestType=Production%20Audit&projectType=Cloud%20Infrastructure"
            className={buttonClassName("primary")}
            onClick={() => trackAdvisorEvent("ai_consultation_clicked", { source: "professional_review" })}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            Request a Professional Review
          </Link>
          <Button type="button" variant="secondary" onClick={sendToContact}>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send This Blueprint
          </Button>
          <Button type="button" variant="ghost" onClick={onEdit}>
            <Edit3 className="h-4 w-4" aria-hidden="true" />
            Edit Requirements
          </Button>
          <Button type="button" variant="ghost" onClick={onStartOver}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}
