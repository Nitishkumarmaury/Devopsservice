import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createMemoryRateLimiter } from "@/lib/ai/rate-limit";
import { setSessionCookie } from "@/lib/auth/session";
import { createUserAccount } from "@/lib/auth/users";
import { checkRateLimit } from "@/lib/rate-limit/shared";

const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  username: z
    .string()
    .trim()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z0-9._-]+$/),
  password: z.string().min(8).max(128),
  next: z.string().optional(),
});

const limiter = createMemoryRateLimiter({
  windowMs: 60 * 60 * 1000,
  maxRequests: 5,
  cooldownMs: 30 * 1000,
});
const rateLimitOptions = {
  namespace: "signup",
  windowMs: 60 * 60 * 1000,
  maxRequests: 5,
  cooldownMs: 30 * 1000,
};

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return `signup:${forwarded || realIp || "anonymous"}`;
}

function safeNextPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function POST(request: NextRequest) {
  const limit = await checkRateLimit(clientKey(request), rateLimitOptions, limiter);

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many signup attempts. Please try again later." },
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
    return NextResponse.json({ success: false, message: "Invalid signup request." }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the signup details.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const created = await createUserAccount(parsed.data);

    if (!created.success) {
      const message =
        created.reason === "email"
          ? "An account already exists with this email."
          : "This username is already taken.";

      return NextResponse.json({ success: false, message }, { status: 409 });
    }

    const response = NextResponse.json({
      success: true,
      redirectTo: safeNextPath(parsed.data.next),
    });

    setSessionCookie(response, created.user);
    return response;
  } catch (error) {
    console.error("Signup failed", { message: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ success: false, message: "Signup is not available right now." }, { status: 503 });
  }
}
