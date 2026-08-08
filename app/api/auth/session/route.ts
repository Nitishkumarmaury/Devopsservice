import { NextResponse, type NextRequest } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const user = getSessionUserFromRequest(request);

  return NextResponse.json({
    authenticated: Boolean(user),
    user,
  });
}
