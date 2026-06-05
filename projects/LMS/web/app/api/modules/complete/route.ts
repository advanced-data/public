import { NextResponse } from "next/server";
import { completeModule } from "@/lib/lms-service";
import { getSessionUser } from "@/lib/session";

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    pathId: string;
    moduleId: string;
  };

  return NextResponse.json({
    result: await completeModule({ ...body, userId: user.id }),
  });
}
