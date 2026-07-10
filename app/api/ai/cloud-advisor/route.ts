import { NextResponse, type NextRequest } from "next/server";
import {
  advisorRequestSchema,
  infrastructureBlueprintSchema,
  type AdvisorRequest,
} from "@/lib/ai/advisor-schema";
import { createFallbackBlueprint } from "@/lib/ai/blueprint-fallback";
import { buildInputAnalysis, enrichBlueprintForRequest, mergeRequirementCoverage } from "@/lib/ai/blueprint-enrichment";
import { buildAdvisorPrompt } from "@/lib/ai/advisor-prompt";
import { createAdvisorInteraction, hasAdvisorProviderConfig } from "@/lib/ai/provider";
import { createMemoryRateLimiter } from "@/lib/ai/rate-limit";
import { advisorMessages, getProviderStatus, isAbortError } from "@/lib/ai/safe-error";
import { getSessionUserFromRequest } from "@/lib/auth/session";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BODY_LIMIT_BYTES = 14000;
const REQUEST_TIMEOUT_MS = 35000;

const limiter = createMemoryRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
  cooldownMs: 12 * 1000,
});

type AdvisorApiResponse =
  | {
      success: true;
      blueprint: InfrastructureBlueprint;
      generatedAt: string;
    }
  | {
      success: false;
      code: string;
      message: string;
      errors?: Record<string, string[] | undefined>;
    };

function json(response: AdvisorApiResponse, init?: ResponseInit) {
  return NextResponse.json(response, init);
}

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwarded || realIp || "anonymous";
}

async function readLimitedJson(request: NextRequest) {
  const length = Number(request.headers.get("content-length") ?? "0");

  if (Number.isFinite(length) && length > BODY_LIMIT_BYTES) {
    return { ok: false as const, status: 413, body: null };
  }

  const raw = await request.text();

  if (Buffer.byteLength(raw, "utf8") > BODY_LIMIT_BYTES) {
    return { ok: false as const, status: 413, body: null };
  }

  try {
    return { ok: true as const, body: JSON.parse(raw) as unknown };
  } catch {
    return { ok: false as const, status: 400, body: null };
  }
}

function extractJsonObject(rawOutput: string) {
  const trimmed = rawOutput.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const firstBrace = withoutFence.indexOf("{");
  const lastBrace = withoutFence.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Model output did not contain a JSON object.");
  }

  return JSON.parse(withoutFence.slice(firstBrace, lastBrace + 1)) as unknown;
}

function trimText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return value;
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}.`;
}

function normalizeList(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return value;
  return value.slice(0, maxItems).map((item) => trimText(item, maxLength));
}

function textOrFallback(value: unknown, maxLength: number, fallback: string) {
  const trimmed = trimText(value, maxLength);
  return typeof trimmed === "string" && trimmed.trim() ? trimmed : fallback;
}

function listOrFallback(value: unknown, maxItems: number, maxLength: number, fallback: string[], minItems = 1) {
  const normalized = normalizeList(value, maxItems, maxLength);
  return Array.isArray(normalized) && normalized.length >= minItems ? normalized : fallback;
}

function normalizePhaseCandidate(phase: unknown, index: number) {
  const item = (phase ?? {}) as Record<string, unknown>;
  const title = typeof item.title === "string" && item.title.trim() ? item.title.trim() : `Implementation phase ${index + 1}`;
  const actions = Array.isArray(item.actions) ? item.actions : [];
  const deliverableFallback = actions.length
    ? actions.slice(0, 2).map((action) => `${String(action)} completed`)
    : ["Implementation deliverables documented"];

  return {
    ...item,
    phase: textOrFallback(item.phase, 30, `Phase ${index + 1}`),
    title: textOrFallback(title, 100, `Implementation phase ${index + 1}`),
    duration: textOrFallback(item.duration, 80, index === 0 ? "1-2 weeks" : "2-3 weeks"),
    objective: textOrFallback(
      item.objective,
      360,
      `Complete ${title.toLowerCase()} with documented ownership, release checks, and production validation.`,
    ),
    actions: listOrFallback(actions, 4, 180, [
      "Complete the planned implementation tasks",
      "Document ownership, rollback notes, and production impact",
    ], 2),
    deliverables: listOrFallback(
      item.deliverables,
      4,
      180,
      deliverableFallback,
    ),
    validation: listOrFallback(item.validation, 4, 180, [
      "Implementation reviewed against the submitted requirements",
      "Production impact and rollback path are documented",
    ]),
  };
}

function normalizeBlueprintCandidate(candidate: unknown, values: AdvisorRequest) {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return candidate;

  const source = candidate as Record<string, unknown>;
  const inputAnalysis = (source.inputAnalysis ?? {}) as Record<string, unknown>;
  const architecture = (source.recommendedArchitecture ?? {}) as Record<string, unknown>;
  const deployment = (source.deploymentStrategy ?? {}) as Record<string, unknown>;
  const observability = (source.observabilityPlan ?? {}) as Record<string, unknown>;
  const fallbackAnalysis = buildInputAnalysis(values);

  const normalized = {
    ...source,
    executiveSummary: trimText(source.executiveSummary, 900),
    inputAnalysis: {
      ...inputAnalysis,
      workloadProfile: textOrFallback(inputAnalysis.workloadProfile, 600, fallbackAnalysis.workloadProfile),
      architectureDrivers: listOrFallback(
        inputAnalysis.architectureDrivers,
        6,
        240,
        fallbackAnalysis.architectureDrivers,
        2,
      ),
      riskSignals: listOrFallback(inputAnalysis.riskSignals, 6, 300, fallbackAnalysis.riskSignals),
    },
    requirementCoverage: mergeRequirementCoverage(source as Partial<InfrastructureBlueprint>, values),
    recommendedArchitecture: {
      ...architecture,
      title: trimText(architecture.title, 120),
      description: trimText(architecture.description, 900),
      components: normalizeList(architecture.components, 6, 180),
    },
    deploymentStrategy: {
      ...deployment,
      summary: trimText(deployment.summary, 700),
      steps: normalizeList(deployment.steps, 6, 180),
    },
    observabilityPlan: {
      ...observability,
      summary: trimText(observability.summary, 700),
      tools: normalizeList(observability.tools, 6, 160),
      recommendedAlerts: normalizeList(observability.recommendedAlerts, 6, 180),
    },
    securityPriorities: normalizeList(source.securityPriorities, 6, 180),
    backupAndRecovery: normalizeList(source.backupAndRecovery, 5, 180),
    scalingPlan: normalizeList(source.scalingPlan, 5, 180),
    costConsiderations: normalizeList(source.costConsiderations, 5, 180),
    implementationPhases: Array.isArray(source.implementationPhases)
      ? source.implementationPhases.slice(0, 5).map((phase, index) => normalizePhaseCandidate(phase, index))
      : source.implementationPhases,
    assumptions: normalizeList(source.assumptions, 6, 180),
    questionsForDiscoveryCall: normalizeList(source.questionsForDiscoveryCall, 6, 180),
  };

  return normalized;
}

function parseBlueprint(rawOutput: string, values: AdvisorRequest) {
  const jsonObject = extractJsonObject(rawOutput);
  const parsed = infrastructureBlueprintSchema.safeParse(jsonObject);
  if (parsed.success) return parsed;
  return infrastructureBlueprintSchema.safeParse(normalizeBlueprintCandidate(jsonObject, values));
}

async function generateAndValidateBlueprint(values: AdvisorRequest, signal: AbortSignal) {
  const firstOutput = await createAdvisorInteraction(buildAdvisorPrompt(values), signal);
  const firstParse = parseBlueprint(firstOutput, values);

  if (firstParse.success) {
    return enrichBlueprintForRequest(firstParse.data, values);
  }

  return createFallbackBlueprint(values);
}

export async function POST(request: NextRequest) {
  if (!getSessionUserFromRequest(request)) {
    return json(
      {
        success: false,
        code: "unauthorized",
        message: "Please log in before using the Cloud Architecture Advisor.",
      },
      { status: 401 },
    );
  }

  if (process.env.AI_ADVISOR_ENABLED === "false") {
    return json({ success: false, code: "disabled", message: advisorMessages.disabled }, { status: 404 });
  }

  const requestBody = await readLimitedJson(request);

  if (!requestBody.ok) {
    const code = requestBody.status === 413 ? "request_too_large" : "invalid_input";
    return json(
      {
        success: false,
        code,
        message:
          requestBody.status === 413
            ? "The request is too large. Please shorten your requirements and try again."
            : advisorMessages.invalidInput,
      },
      { status: requestBody.status },
    );
  }

  const parsed = advisorRequestSchema.safeParse(requestBody.body);

  if (!parsed.success) {
    return json(
      {
        success: false,
        code: "invalid_input",
        message: advisorMessages.invalidInput,
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const rateLimit = limiter.check(clientKey(request));

  if (!rateLimit.allowed) {
    return json(
      { success: false, code: "rate_limit", message: advisorMessages.rateLimit },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(Math.ceil(rateLimit.retryAfterMs / 1000), 1)),
        },
      },
    );
  }

  if (!hasAdvisorProviderConfig()) {
    return json(
      { success: false, code: "missing_config", message: advisorMessages.missingConfig },
      { status: 503 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const blueprint = await generateAndValidateBlueprint(parsed.data, controller.signal);

    return json({
      success: true,
      blueprint,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const status = getProviderStatus(error);

    if (status === 429) {
      return json(
        { success: false, code: "rate_limit", message: advisorMessages.rateLimit },
        { status: 429, headers: { "Retry-After": "30" } },
      );
    }

    if (isAbortError(error)) {
      return json({
        success: true,
        blueprint: createFallbackBlueprint(parsed.data),
        generatedAt: new Date().toISOString(),
      });
    }

    return json({
      success: true,
      blueprint: createFallbackBlueprint(parsed.data),
      generatedAt: new Date().toISOString(),
    });
  } finally {
    clearTimeout(timeout);
  }
}
