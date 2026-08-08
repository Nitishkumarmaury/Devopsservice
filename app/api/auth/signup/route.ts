import { NextResponse } from "next/server";
import { z } from "zod";
import { setSessionCookie } from "@/lib/auth/session";
import { createUserAccount } from "@/lib/auth/users";

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

function safeNextPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function POST(request: Request) {
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
