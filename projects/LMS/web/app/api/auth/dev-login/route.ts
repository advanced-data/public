import { NextResponse } from "next/server";

export function GET(request: Request) {
  const url = new URL(request.url);
  const role = url.searchParams.get("role") ?? "learner";
  const isAdmin = role === "admin";
  const response = NextResponse.redirect(new URL("/", request.url));
  const userId = isAdmin ? "11111111-1111-4111-8111-111111111111" : "22222222-2222-4222-8222-222222222222";

  response.cookies.set("lms-user-id", userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  response.cookies.set("lms-role", isAdmin ? "admin" : "learner", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  response.cookies.set("lms-user-name", isAdmin ? "LMS Admin" : "Jordan Learner", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
