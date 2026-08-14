// Firebase's web config identifies the project to Google's servers — it is not a secret.
// Security is enforced by Firestore/Auth rules and server-side admin checks, not by hiding
// these values. Env vars let you point a fork at a different Firebase project if needed.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyD-SHR-f5eFG54-5Z0ylVO8J7A8ARktr6Y",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "careerhub-app-36084.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "careerhub-app-36084",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "careerhub-app-36084.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "146458317565",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:146458317565:web:b31730f6683b2ce809e494",
} as const;
