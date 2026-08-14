import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/shared/lib/firebase-client";

/** Creates or refreshes the caller's own candidate record — Firestore rules only allow self-writes. */
export async function upsertCandidate(user: User, opts: { source?: string; marketingOptIn?: boolean } = {}) {
  const ref = doc(db, "candidates", user.uid);
  const existing = await getDoc(ref);

  await setDoc(
    ref,
    {
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      photoURL: user.photoURL ?? "",
      providerIds: user.providerData.map((p) => p.providerId),
      lastLoginAt: serverTimestamp(),
      ...(existing.exists()
        ? {}
        : {
            createdAt: serverTimestamp(),
            marketingOptIn: opts.marketingOptIn ?? true,
            source: opts.source ?? "signup",
          }),
    },
    { merge: true },
  );
}
