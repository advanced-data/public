import { NextResponse } from "next/server";
import { getPathById } from "@/lib/lms-service";

export async function GET(
  _request: Request,
  { params }: { params: { pathId: string } },
) {
  return NextResponse.json({ path: await getPathById(params.pathId) });
}
