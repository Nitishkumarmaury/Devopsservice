import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createMemoryRateLimiter } from "@/lib/ai/rate-limit";
import { setSessionCookie } from "@/lib/auth/session";
import { verifyUserCredentials } from "@/lib/auth/users";
import { checkRateLimit } from "@/lib/rate-limit/shared";

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
  next: z.string().optional(),
});

const limiter = createMemoryRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  cooldownMs: 20 * 1000,
});
const rateLimitOptions = {
  namespace: "login",
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  cooldownMs: 20 * 1000,
};

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return `login:${forwarded || realIp || "anonymous"}`;
}

function safeNextPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function POST(request: NextRequest) {
  const limit = await checkRateLimit(clientKey(request), rateLimitOptions, limiter);

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid login request." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Please enter your username and password." }, { status: 400 });
  }

  try {
    const user = await verifyUserCredentials(parsed.data.username, parsed.data.password);

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid username or password." }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      redirectTo: safeNextPath(parsed.data.next),
    });

    setSessionCookie(response, user);
    return response;
  } catch (error) {
    console.error("Login failed", { message: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ success: false, message: "Login is not available right now." }, { status: 503 });
  }
}
