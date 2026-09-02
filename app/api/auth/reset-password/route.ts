import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createMemoryRateLimiter } from "@/lib/ai/rate-limit";
import { resetPasswordWithToken } from "@/lib/auth/users";
import { checkRateLimit } from "@/lib/rate-limit/shared";

const resetPasswordSchema = z.object({
  token: z.string().trim().min(24).max(256),
  password: z.string().min(8).max(128),
});

const limiter = createMemoryRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  cooldownMs: 5 * 1000,
});
const rateLimitOptions = {
  namespace: "reset-password",
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  cooldownMs: 5 * 1000,
};

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return `reset-password:${forwarded || realIp || "anonymous"}`;
}

export async function POST(request: NextRequest) {
  const limit = await checkRateLimit(clientKey(request), rateLimitOptions, limiter);

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Please wait before trying again." },
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
    return NextResponse.json({ success: false, message: "Invalid password reset request." }, { status: 400 });
  }

  const parsed = resetPasswordSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please use a valid reset link and a password of at least 8 characters." },
      { status: 400 },
    );
  }

  try {
    const reset = await resetPasswordWithToken(parsed.data.token, parsed.data.password);

    if (!reset.success) {
      return NextResponse.json({ success: false, message: "This reset link is invalid or has expired." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Your password has been updated. You can now log in.",
      redirectTo: "/login?reset=success",
    });
  } catch (error) {
    console.error("Password reset failed", { message: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { success: false, message: "Password reset is not available right now. Please try again later." },
      { status: 503 },
    );
  }
}
