import { NextResponse } from "next/server";
import { createModule } from "@/lib/lms-service";
import { getSessionUser, isAdmin } from "@/lib/session";

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    pathId: string;
    title: string;
    position: number;
    kind: "lesson" | "quiz";
  };

  const result = await createModule(body);
  return NextResponse.json({ result }, { status: result.created ? 201 : 404 });
}
