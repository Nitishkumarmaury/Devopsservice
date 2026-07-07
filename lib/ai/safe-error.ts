export const advisorMessages = {
  missingConfig:
    "The AI advisor is temporarily unavailable. Please use the project inquiry form to contact us directly.",
  rateLimit:
    "The advisor has received several requests. Please wait briefly before trying again or request a professional consultation.",
  invalidResponse:
    "We could not generate a reliable blueprint from that response. Please refine your requirements and try again.",
  networkFailure:
    "The request could not be completed. Your entered information remains available so you can retry.",
  timeout:
    "The advisor is taking longer than expected. Please retry, or send the same details through the consultation form for a manual review.",
  invalidInput: "Please review the highlighted fields before generating a blueprint.",
  disabled:
    "The AI advisor is temporarily unavailable. Please use the project inquiry form to contact us directly.",
} as const;

export type AdvisorErrorCode =
  | "disabled"
  | "invalid_input"
  | "invalid_response"
  | "missing_config"
  | "network_failure"
  | "rate_limit"
  | "request_too_large"
  | "timeout";

export function getProviderStatus(error: unknown) {
  if (!error || typeof error !== "object") return undefined;
  const candidate = error as { status?: unknown; statusCode?: unknown; code?: unknown };
  const status = candidate.status ?? candidate.statusCode ?? candidate.code;
  return typeof status === "number" ? status : undefined;
}

export function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}
