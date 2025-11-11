"use server";

import { cookies } from "next/headers";
import { db } from "@/lib/drizzle/db";
import { user_profiles } from "@/lib/drizzle/schemas";
import { eq } from "drizzle-orm";

const SESSION_COOKIE_NAME = "user_session";

export async function setUserSession(userId: string) {
  const cookieStore = await cookies();

  // Set session cookie with security options
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }

  return sessionCookie.value;
}

export async function getCurrentUser() {
  const userId = await getUserSession();

  if (!userId) {
    return null;
  }

  const user = await db
    .select({
      id: user_profiles.id,
      full_name: user_profiles.full_name,
      email: user_profiles.email,
    })
    .from(user_profiles)
    .where(eq(user_profiles.id, parseInt(userId)))
    .then((res) => res[0]);

  return user || null;
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
