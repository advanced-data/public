import { cookies } from "next/headers";
import type { UserRole } from "./lms-types";

const ROLE_COOKIE = "lms-role";
const NAME_COOKIE = "lms-user-name";

export interface SessionUser {
  id: string;
  name: string;
  role: UserRole;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const id = cookieStore.get("lms-user-id")?.value;
  const role = cookieStore.get(ROLE_COOKIE)?.value as UserRole | undefined;
  const name = cookieStore.get(NAME_COOKIE)?.value;

  if (!id || !role || !name) {
    return null;
  }

  return { id, name, role };
}

export function isAdmin(user: SessionUser | null): boolean {
  return user?.role === "admin";
}

export function getLoginCookieNames() {
  return { ROLE_COOKIE, NAME_COOKIE };
}
