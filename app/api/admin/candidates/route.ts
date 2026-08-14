import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/shared/lib/firebase-admin";
import { requireAdmin } from "@/shared/lib/require-admin";
import type { CandidateRecord } from "@/core/types/candidate";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const snapshot = await adminDb.collection("candidates").orderBy("createdAt", "desc").get();
  const candidates: CandidateRecord[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      uid: doc.id,
      email: data.email ?? "",
      displayName: data.displayName ?? "",
      photoURL: data.photoURL ?? "",
      providerIds: data.providerIds ?? [],
      marketingOptIn: data.marketingOptIn !== false,
      source: data.source ?? "",
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      lastLoginAt: data.lastLoginAt?.toDate?.().toISOString() ?? "",
    };
  });

  return NextResponse.json({ candidates });
}
