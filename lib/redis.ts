import { Redis } from "@upstash/redis";

let redis: Redis | undefined;

export function hasRedisConfig() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  redis ??= new Redis({
    url,
    token,
  });

  return redis;
}
