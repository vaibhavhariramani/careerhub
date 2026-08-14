import "server-only";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// No explicit credentials: the deployed Cloud Function runs as the project's default
// compute service account and picks up Application Default Credentials automatically.
// For local admin-route testing, run `gcloud auth application-default login` first.
const app = getApps().length ? getApps()[0]! : initializeApp();

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
