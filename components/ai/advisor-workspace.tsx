"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Cpu, ShieldCheck } from "lucide-react";
import { AdvisorError } from "@/components/ai/advisor-error";
import { AdvisorForm } from "@/components/ai/advisor-form";
import { AdvisorProgress } from "@/components/ai/advisor-progress";
import { AdvisorResults } from "@/components/ai/advisor-results";
import { Button } from "@/components/ui/button";
import { advisorMessages } from "@/lib/ai/safe-error";
import { trackAdvisorEvent } from "@/lib/ai/advisor-analytics";
import type { AdvisorRequest } from "@/lib/ai/advisor-schema";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

type ViewState = "form" | "loading" | "result" | "error";
const CLIENT_TIMEOUT_MS = 38000;

type AdvisorApiResponse =
  | {
      success: true;
      blueprint: InfrastructureBlueprint;
      generatedAt: string;
    }
  | {
      success: false;
      code?: string;
      message?: string;
      errors?: Record<string, string[] | undefined>;
    };

type AdvisorFailure = {
  title: string;
  message: string;
  code?: string;
};

function failureFromResponse(data: AdvisorApiResponse, status: number): AdvisorFailure {
  if (status === 429 || (!data.success && data.code === "rate_limit")) {
    return { title: "Rate limit active", message: advisorMessages.rateLimit, code: "rate_limit" };
  }

  if (!data.success && data.code === "missing_config") {
    return { title: "Advisor unavailable", message: advisorMessages.missingConfig, code: "missing_config" };
  }

  if (!data.success && data.code === "invalid_response") {
    return { title: "Reliable blueprint not generated", message: advisorMessages.invalidResponse, code: "invalid_response" };
  }

  return {
    title: "Request incomplete",
    message: data.success ? advisorMessages.networkFailure : data.message ?? advisorMessages.networkFailure,
    code: data.success ? "network_failure" : data.code,
  };
}

export function AdvisorWorkspace() {
  const [view, setView] = useState<ViewState>("form");
  const [requestValues, setRequestValues] = useState<AdvisorRequest | undefined>();
  const [blueprint, setBlueprint] = useState<InfrastructureBlueprint | undefined>();
  const [generatedAt, setGeneratedAt] = useState<string | undefined>();
  const [failure, setFailure] = useState<AdvisorFailure | undefined>();
  const openedTracked = useRef(false);

  useEffect(() => {
    if (openedTracked.current) return;
    openedTracked.current = true;
    trackAdvisorEvent("ai_advisor_opened");
  }, []);

  const submit = async (values: AdvisorRequest) => {
    setRequestValues(values);
    setFailure(undefined);

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setFailure({ title: "You appear to be offline", message: advisorMessages.networkFailure, code: "offline" });
      setView("error");
      trackAdvisorEvent("ai_blueprint_failed", { code: "offline" });
      return;
    }

    setView("loading");
    trackAdvisorEvent("ai_advisor_started", {
      applicationType: values.applicationType,
      preferredCloud: values.preferredCloudPlatform,
    });

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
      let response: Response;

      try {
        response = await fetch("/api/ai/cloud-advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeout);
      }

      const data = (await response.json()) as AdvisorApiResponse;

      if (!response.ok || !data.success) {
        const nextFailure = failureFromResponse(data, response.status);
        setFailure(nextFailure);
        setView("error");
        trackAdvisorEvent("ai_blueprint_failed", { code: nextFailure.code ?? "unknown" });
        return;
      }

      setBlueprint(data.blueprint);
      setGeneratedAt(data.generatedAt);
      setView("result");
      trackAdvisorEvent("ai_blueprint_generated", { applicationType: values.applicationType });
    } catch (error) {
      const aborted = error instanceof DOMException && error.name === "AbortError";
      setFailure({
        title: aborted ? "Advisor response delayed" : "Network failure",
        message: aborted ? advisorMessages.timeout : advisorMessages.networkFailure,
        code: aborted ? "timeout" : "network_failure",
      });
      setView("error");
      trackAdvisorEvent("ai_blueprint_failed", { code: aborted ? "timeout" : "network_failure" });
    }
  };

  const retry = () => {
    if (requestValues) {
      void submit(requestValues);
      return;
    }
    setView("form");
  };

  return (
    <div
      id="cloud-advisor-workspace"
      className="relative min-w-0 scroll-mt-28 overflow-hidden rounded-[22px] border border-[#d6ebff]/12 bg-[linear-gradient(135deg,#06111f_0%,#0d2338_100%)] p-3 text-white shadow-[0_34px_120px_rgba(0,0,0,0.34),0_0_80px_rgba(77,163,255,0.08)] [overflow-wrap:anywhere] sm:p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(77,163,255,0.14),transparent_34%),radial-gradient(circle_at_90%_16%,rgba(125,211,252,0.08),transparent_32%),radial-gradient(circle_at_68%_100%,rgba(255,138,122,0.08),transparent_34%)]" aria-hidden="true" />
      <div className="absolute inset-0 soft-grid opacity-20" aria-hidden="true" />
      <div className="relative">
        <div className="mb-6 flex min-w-0 flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase leading-6 tracking-normal text-[#b9ddff]">Secure Planning Workspace</p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-normal text-white sm:text-3xl">Cloud Architecture Advisor</h3>
          </div>
          <div className="flex min-w-0 flex-wrap gap-2 text-xs">
            <span className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-lg border border-[#4da3ff]/20 bg-[#4da3ff]/10 px-3 py-2 leading-snug text-[#b9ddff]">
              <Activity className="h-3.5 w-3.5" aria-hidden="true" />
              Actionable brief
            </span>
            <span className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-lg border border-[#7dd3fc]/20 bg-[#7dd3fc]/10 px-3 py-2 leading-snug text-[#7dd3fc]">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Private by design
            </span>
            <span className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-lg border border-[#ff8a7a]/20 bg-[#ff8a7a]/10 px-3 py-2 leading-snug text-[#ffb8ae]">
              <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
              Implementation-ready
            </span>
          </div>
        </div>

        <div aria-live="polite" className="sr-only">
          {view === "loading" ? "Generating cloud architecture blueprint." : null}
          {view === "result" ? "Cloud architecture blueprint generated." : null}
          {view === "error" ? failure?.message : null}
        </div>

        {view === "form" ? <AdvisorForm initialValues={requestValues} isSubmitting={false} onSubmit={submit} /> : null}
        {view === "loading" ? <AdvisorProgress /> : null}
        {view === "error" ? (
          <div className="space-y-4">
            <AdvisorError
              title={failure?.title}
              message={failure?.message ?? advisorMessages.networkFailure}
              onRetry={requestValues ? retry : undefined}
            />
            {requestValues ? (
              <Button type="button" variant="secondary" onClick={() => setView("form")}>
                Edit Requirements
              </Button>
            ) : null}
          </div>
        ) : null}
        {view === "result" && blueprint && requestValues ? (
          <AdvisorResults
            blueprint={blueprint}
            requestValues={requestValues}
            generatedAt={generatedAt}
            onEdit={() => setView("form")}
            onStartOver={() => {
              setBlueprint(undefined);
              setGeneratedAt(undefined);
              setRequestValues(undefined);
              setView("form");
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
