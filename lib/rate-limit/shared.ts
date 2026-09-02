import type { RateLimitResult, RateLimiter } from "@/lib/ai/rate-limit";
import { checkUpstashRateLimit } from "@/lib/rate-limit/upstash";

type SharedRateLimitOptions = {
  namespace: string;
  windowMs: number;
  maxRequests: number;
  cooldownMs: number;
};

export async function checkRateLimit(
  key: string,
  options: SharedRateLimitOptions,
  fallback: RateLimiter,
): Promise<RateLimitResult> {
  try {
    const limit = await checkUpstashRateLimit(key, options);
    return limit ?? fallback.check(key);
  } catch (error) {
    console.warn("Upstash rate limit unavailable, using memory fallback:", error);
    return fallback.check(key);
  }
}
