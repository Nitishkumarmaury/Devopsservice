import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createMemoryRateLimiter } from "@/lib/ai/rate-limit";
import { EmailProviderIpBlockedError, sendPasswordResetEmail } from "@/lib/auth/password-reset-email";
import { clearPasswordResetToken, createPasswordResetToken } from "@/lib/auth/users";
import { checkUpstashRateLimit } from "@/lib/rate-limit/upstash";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email().max(160),
});

const successMessage = "If an account exists for that email, a secure reset link has been sent.";
const placeholderSiteHosts = new Set(["example.com", "www.example.com"]);
const limiter = createMemoryRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  cooldownMs: 20 * 1000,
});
const rateLimitOptions = {
  namespace: "forgot-password",
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  cooldownMs: 20 * 1000,
};

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return `forgot-password:${forwarded || realIp || "anonymous"}`;
}

function getPasswordResetOrigin(request: Request) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    const url = new URL(configuredUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
    }

    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
      throw new Error("NEXT_PUBLIC_SITE_URL must use https in production.");
    }

    if (!placeholderSiteHosts.has(url.hostname)) {
      return url.origin;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    return new URL(request.url).origin;
  }

  throw new Error("NEXT_PUBLIC_SITE_URL must be configured before password reset emails can be sent.");
}

export async function POST(request: NextRequest) {
  let limit = await checkUpstashRateLimit(clientKey(request), rateLimitOptions);
  limit ??= limiter.check(clientKey(request));

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many password reset requests. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)),
        },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid password reset request." }, { status: 400 });
  }

  const parsed = forgotPasswordSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Please enter a valid account email." }, { status: 400 });
  }

  try {
    const reset = await createPasswordResetToken(parsed.data.email);

    if (reset.success) {
      const resetUrl = new URL("/reset-password", getPasswordResetOrigin(request));
      resetUrl.searchParams.set("token", reset.token);
      const resetUrlValue = resetUrl.toString();

      try {
        await sendPasswordResetEmail({
          to: reset.email,
          fullName: reset.fullName,
          resetUrl: resetUrlValue,
          expiresAt: reset.expiresAt,
        });
      } catch (error) {
        await clearPasswordResetToken(reset.username);
        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      message: successMessage,
    });
  } catch (error) {
    console.error(`Password reset request failed: ${error instanceof Error ? error.message : String(error)}`);
    if (error instanceof EmailProviderIpBlockedError) {
      const blockedIp = error.ipAddress ? ` ${error.ipAddress}` : "";
      return NextResponse.json(
        {
          success: false,
          message: `Brevo blocked this server IP${blockedIp} from sending password reset email. Authorize it in Brevo Security > Authorized IPs, then try again.`,
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Password reset email is not available right now. Please try again later." },
      { status: 503 },
    );
  }
}
