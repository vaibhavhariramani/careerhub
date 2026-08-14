import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/shared/lib/firebase-admin";
import { requireAdmin } from "@/shared/lib/require-admin";

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email sending isn't configured yet — set the RESEND_API_KEY secret and redeploy." },
      { status: 501 },
    );
  }

  const body = await request.json().catch(() => null);
  const candidateIds: string[] = body?.candidateIds;
  const subject: string = body?.subject;
  const html: string = body?.html;

  if (!Array.isArray(candidateIds) || candidateIds.length === 0 || !subject?.trim() || !html?.trim()) {
    return NextResponse.json({ error: "candidateIds, subject, and html are required." }, { status: 400 });
  }

  const docs = await adminDb.getAll(...candidateIds.map((id) => adminDb.collection("candidates").doc(id)));
  const recipients = docs
    .filter((d) => d.exists && d.data()?.marketingOptIn !== false && d.data()?.email)
    .map((d) => d.data()!.email as string);

  if (recipients.length === 0) {
    return NextResponse.json(
      { error: "None of the selected candidates have an opted-in email address." },
      { status: 400 },
    );
  }

  const from = process.env.RESEND_FROM_EMAIL || "CareerHub <onboarding@resend.dev>";
  const results = await Promise.allSettled(
    recipients.map((to) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, subject, html }),
      }).then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      }),
    ),
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  return NextResponse.json({ sent, failed: results.length - sent, total: recipients.length });
}
