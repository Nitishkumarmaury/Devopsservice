export type AdvisorAnalyticsEvent =
  | "ai_advisor_opened"
  | "ai_advisor_started"
  | "ai_blueprint_generated"
  | "ai_blueprint_failed"
  | "ai_consultation_clicked";

type AnalyticsPayload = {
  event: AdvisorAnalyticsEvent;
  metadata?: Record<string, string | number | boolean>;
};

declare global {
  interface Window {
    dataLayer?: AnalyticsPayload[];
  }
}

export function trackAdvisorEvent(event: AdvisorAnalyticsEvent, metadata?: AnalyticsPayload["metadata"]) {
  if (typeof window === "undefined") return;

  const payload = { event, metadata };
  window.dispatchEvent(new CustomEvent("advisor-analytics", { detail: payload }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }
}
