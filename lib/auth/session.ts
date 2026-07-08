import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const AUTH_COOKIE_NAME = "devops_session";

export type SessionUser = {
  username: string;
};

type SessionPayload = SessionUser & {
  exp: number;
};

function getSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;

  if (!secret) {
    throw new Error("AUTH_SESSION_SECRET is not configured.");
  }

  return secret;
}

function getMaxAgeSeconds() {
  const parsed = Number.parseInt(process.env.AUTH_SESSION_MAX_AGE_SECONDS || "86400", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 86400;
}

function base64url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function signPayload(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createSessionToken(user: SessionUser) {
  const payload: SessionPayload = {
    username: user.username,
    exp: Math.floor(Date.now() / 1000) + getMaxAgeSeconds(),
  };
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expected = signPayload(encodedPayload);
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== actualBuffer.length || !timingSafeEqual(expectedBuffer, actualBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.username || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return { username: payload.username };
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(AUTH_COOKIE_NAME)?.value);
}

export function getSessionUserFromRequest(request: NextRequest) {
  return verifySessionToken(request.cookies.get(AUTH_COOKIE_NAME)?.value);
}

export async function requirePageSession(nextPath: string) {
  const user = await getSessionUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return user;
}

export function unauthorizedJson() {
  return NextResponse.json(
    {
      success: false,
      message: "Please log in before using this service.",
      code: "unauthorized",
    },
    { status: 401 },
  );
}

export function setSessionCookie(response: NextResponse, user: SessionUser) {
  response.cookies.set(AUTH_COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getMaxAgeSeconds(),
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
