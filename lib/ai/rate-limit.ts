export type RateLimitResult =
  | {
      allowed: true;
      remaining: number;
    }
  | {
      allowed: false;
      retryAfterMs: number;
    };

export type RateLimiter = {
  check: (key: string) => RateLimitResult;
};

type MemoryRateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
  cooldownMs: number;
};

type Bucket = {
  timestamps: number[];
  lastRequestAt: number;
};

export function createMemoryRateLimiter({
  windowMs,
  maxRequests,
  cooldownMs,
}: MemoryRateLimiterOptions): RateLimiter {
  const buckets = new Map<string, Bucket>();

  return {
    check(key) {
      const now = Date.now();
      const bucket = buckets.get(key) ?? { timestamps: [], lastRequestAt: 0 };
      const timestamps = bucket.timestamps.filter((timestamp) => now - timestamp < windowMs);
      const cooldownRemaining = cooldownMs - (now - bucket.lastRequestAt);

      if (cooldownRemaining > 0) {
        buckets.set(key, { timestamps, lastRequestAt: bucket.lastRequestAt });
        return { allowed: false, retryAfterMs: cooldownRemaining };
      }

      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0] ?? now;
        buckets.set(key, { timestamps, lastRequestAt: bucket.lastRequestAt });
        return { allowed: false, retryAfterMs: Math.max(windowMs - (now - oldest), cooldownMs) };
      }

      timestamps.push(now);
      buckets.set(key, { timestamps, lastRequestAt: now });

      if (buckets.size > 1000) {
        for (const [bucketKey, value] of buckets) {
          if (value.timestamps.every((timestamp) => now - timestamp >= windowMs)) {
            buckets.delete(bucketKey);
          }
        }
      }

      return { allowed: true, remaining: Math.max(maxRequests - timestamps.length, 0) };
    },
  };
}
