import { NextResponse } from "next/server";
import { getProgress } from "@/lib/lms-service";

export async function GET(
  _request: Request,
  { params }: { params: { pathId: string } },
) {
  return NextResponse.json({ progress: await getProgress(params.pathId) });
}
