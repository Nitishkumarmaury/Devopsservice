import { randomUUID } from "crypto";
import type { RateLimitResult } from "@/lib/ai/rate-limit";
import { getRedisClient } from "@/lib/redis";

type UpstashRateLimitOptions = {
  namespace: string;
  windowMs: number;
  maxRequests: number;
  cooldownMs: number;
};

const RATE_LIMIT_SCRIPT = `
local countKey = KEYS[1]
local cooldownKey = KEYS[2]
local now = tonumber(ARGV[1])
local windowMs = tonumber(ARGV[2])
local maxRequests = tonumber(ARGV[3])
local cooldownMs = tonumber(ARGV[4])
local member = ARGV[5]

local cooldownUntil = tonumber(redis.call("GET", cooldownKey) or "0")
if cooldownUntil > now then
  return {0, cooldownUntil - now, -1}
end

redis.call("ZREMRANGEBYSCORE", countKey, 0, now - windowMs)

local count = redis.call("ZCARD", countKey)
if count >= maxRequests then
  local oldest = redis.call("ZRANGE", countKey, 0, 0, "WITHSCORES")
  local retryAfterMs = windowMs

  if oldest[2] then
    retryAfterMs = windowMs - (now - tonumber(oldest[2]))
  end

  if retryAfterMs < cooldownMs then
    retryAfterMs = cooldownMs
  end

  return {0, retryAfterMs, 0}
end

redis.call("ZADD", countKey, now, member)
redis.call("PEXPIRE", countKey, windowMs)

if cooldownMs > 0 then
  redis.call("SET", cooldownKey, now + cooldownMs, "PX", cooldownMs)
end

return {1, 0, maxRequests - count - 1}
`;

function normalizeScriptResult(value: unknown) {
  if (!Array.isArray(value) || value.length < 3) {
    throw new Error("Unexpected Redis rate limit response.");
  }

  const [allowed, retryAfterMs, remaining] = value.map((item) => Number(item));

  if (!Number.isFinite(allowed) || !Number.isFinite(retryAfterMs) || !Number.isFinite(remaining)) {
    throw new Error("Invalid Redis rate limit response.");
  }

  return { allowed, retryAfterMs, remaining };
}

export async function checkUpstashRateLimit(
  key: string,
  { namespace, windowMs, maxRequests, cooldownMs }: UpstashRateLimitOptions,
): Promise<RateLimitResult | null> {
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  const safeKey = key.replaceAll(/[^a-zA-Z0-9:._-]/g, "_");
  const countKey = `rate-limit:${namespace}:${safeKey}`;
  const cooldownKey = `${countKey}:cooldown`;
  const result = await redis.eval<(string | number)[], unknown[]>(RATE_LIMIT_SCRIPT, [countKey, cooldownKey], [
    Date.now(),
    windowMs,
    maxRequests,
    cooldownMs,
    randomUUID(),
  ]);

  const normalized = normalizeScriptResult(result);

  if (normalized.allowed === 1) {
    return {
      allowed: true,
      remaining: Math.max(normalized.remaining, 0),
    };
  }

  return {
    allowed: false,
    retryAfterMs: Math.max(normalized.retryAfterMs, 1000),
  };
}
