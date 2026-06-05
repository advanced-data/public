import { NextResponse } from "next/server";
import { createPath, listPaths } from "@/lib/lms-service";
import { getSessionUser, isAdmin } from "@/lib/session";

export async function GET() {
  return NextResponse.json({ paths: await listPaths() });
}

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    title: string;
    description: string;
    passingThreshold?: number;
  };

  const path = await createPath(body);
  return NextResponse.json({ path }, { status: 201 });
}
