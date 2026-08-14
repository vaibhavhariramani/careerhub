"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile as updateAuthProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input, Label } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Logo } from "@/shared/components/layout/logo";
import { auth, googleProvider } from "@/shared/lib/firebase-client";
import { upsertCandidate } from "@/features/auth/lib/upsert-candidate";

function friendlyAuthError(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password.";
      case "auth/email-already-in-use":
        return "An account already exists with this email — try signing in instead.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "That doesn't look like a valid email address.";
      case "auth/popup-closed-by-user":
        return "Sign-in was cancelled.";
      default:
        return "Something went wrong. Please try again.";
    }
  }
  return "Something went wrong. Please try again.";
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const goNext = () => router.push(next);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      await upsertCandidate(cred.user, { source: "login" });
      goNext();
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      if (name.trim()) await updateAuthProfile(cred.user, { displayName: name.trim() });
      await upsertCandidate(cred.user, { source: "resume-builder-signup", marketingOptIn });
      goNext();
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setBusy(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await upsertCandidate(cred.user, { source: "resume-builder-signup" });
      goNext();
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    setNotice(null);
    if (!signInEmail.trim()) {
      setError("Enter your email above first, then click \"Forgot password\".");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, signInEmail.trim());
      setNotice("Password reset email sent — check your inbox.");
    } catch (err) {
      setError(friendlyAuthError(err));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sign in to continue</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Save your progress and pick up where you left off.
            </p>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={busy}
              onClick={handleGoogle}
            >
              Continue with Google
            </Button>

            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              or
              <div className="h-px flex-1 bg-border" />
            </div>

            {error && (
              <div className="mb-3 rounded-md border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">
                {error}
              </div>
            )}
            {notice && (
              <div className="mb-3 rounded-md border border-success/30 bg-success-soft px-3 py-2 text-sm text-success">
                {notice}
              </div>
            )}

            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form className="flex flex-col gap-3" onSubmit={handleSignIn}>
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      required
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="self-end text-xs text-muted-foreground hover:text-accent"
                  >
                    Forgot password?
                  </button>
                  <Button type="submit" className="w-full" disabled={busy}>
                    Sign in
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
                  <div>
                    <Label htmlFor="signup-name">Full name</Label>
                    <Input id="signup-name" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      required
                      minLength={6}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                    />
                  </div>
                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Checkbox
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                    />
                    Send me occasional emails about job opportunities and product updates.
                  </label>
                  <Button type="submit" className="w-full" disabled={busy}>
                    Create account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
