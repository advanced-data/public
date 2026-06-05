import { NextResponse } from "next/server";
import { getAssignedPathForUser } from "@/lib/lms-service";
import { getSessionUser } from "@/lib/session";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ path: await getAssignedPathForUser(user.id) });
}
