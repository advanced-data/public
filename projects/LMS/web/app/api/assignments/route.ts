import { NextResponse } from "next/server";
import { assignPath } from "@/lib/lms-service";
import { getSessionUser, isAdmin } from "@/lib/session";

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    pathId: string;
    learnerId: string;
  };

  const result = await assignPath({ ...body, assignedById: user.id });
  return NextResponse.json({ result }, { status: result.assigned ? 200 : 404 });
}
