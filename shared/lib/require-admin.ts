import "server-only";
import { NextRequest } from "next/server";
import { adminAuth } from "@/shared/lib/firebase-admin";

/** Verifies the request's bearer ID token belongs to a signed-in user with the admin custom claim. */
export async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.admin === true ? decoded : null;
  } catch {
    return null;
  }
}
