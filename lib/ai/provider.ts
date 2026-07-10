import "server-only";

import { GoogleGenAI } from "@google/genai";
import { ADVISOR_SYSTEM_INSTRUCTION } from "@/lib/ai/advisor-prompt";

const DEFAULT_ADVISOR_MODEL = "gemini-2.5-flash";
const REQUEST_TIMEOUT_MS = 32000;

export function getAdvisorModel() {
  return process.env.ADVISOR_MODEL || process.env.AI_PROVIDER_MODEL || process.env.GEMINI_MODEL || DEFAULT_ADVISOR_MODEL;
}

export function getAdvisorProjectReference() {
  return process.env.AI_PROVIDER_PROJECT_REFERENCE || process.env.GOOGLE_CLOUD_PROJECT_NUMBER || "327005939382";
}

export function hasAdvisorProviderConfig() {
  return Boolean(process.env.AI_PROVIDER_API_KEY || process.env.GEMINI_API_KEY);
}

export async function createAdvisorInteraction(input: string, signal: AbortSignal) {
  const apiKey = process.env.AI_PROVIDER_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("AI advisor provider key is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const interaction = await ai.interactions.create(
    {
      model: getAdvisorModel(),
      input,
      system_instruction: ADVISOR_SYSTEM_INSTRUCTION,
      store: false,
      response_format: { type: "text", mime_type: "application/json" },
      generation_config: {
        temperature: 0.18,
        thinking_level: "minimal",
        max_output_tokens: 4200,
      },
    },
    {
      timeout: REQUEST_TIMEOUT_MS,
      maxRetries: 0,
      fetchOptions: { signal },
    },
  );

  return interaction.output_text?.trim() ?? "";
}
