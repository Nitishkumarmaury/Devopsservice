import { NextResponse } from "next/server";
import { z } from "zod";
import { setSessionCookie } from "@/lib/auth/session";
import { verifyUserCredentials } from "@/lib/auth/users";

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
  next: z.string().optional(),
});

function safeNextPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function POST(request: Request) {
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
