import { NextResponse } from "next/server";
import { z } from "zod";
import { resetPasswordWithToken } from "@/lib/auth/users";

const resetPasswordSchema = z.object({
  token: z.string().trim().min(24).max(256),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
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
