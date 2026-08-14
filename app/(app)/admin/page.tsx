"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input, Label, Textarea } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { useAuthStore } from "@/features/auth/store";
import type { CandidateRecord } from "@/core/types/candidate";

export default function AdminPage() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const loading = useAuthStore((s) => s.loading);

  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin || !user) return;
    (async () => {
      setFetching(true);
      setFetchError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/admin/candidates", { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error((await res.json()).error ?? "Failed to load candidates.");
        const data = await res.json();
        setCandidates(data.candidates);
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : "Failed to load candidates.");
      } finally {
        setFetching(false);
      }
    })();
  }, [isAdmin, user]);

  const toggle = (uid: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => (prev.size === candidates.length ? new Set() : new Set(candidates.map((c) => c.uid))));
  };

  const handleSend = async () => {
    if (!user) return;
    setSending(true);
    setSendResult(null);
    setSendError(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ candidateIds: Array.from(selected), subject, html }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send.");
      setSendResult(`Sent ${data.sent} of ${data.total} emails${data.failed ? ` (${data.failed} failed)` : ""}.`);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Failed to send.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return null;

  if (!user || !isAdmin) {
    return (
      <div className="mx-auto max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle>Access denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This page is restricted to CareerHub administrators.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {candidates.length} registered candidate{candidates.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            {fetching && <p className="text-sm text-muted-foreground">Loading…</p>}
            {fetchError && <p className="text-sm text-danger">{fetchError}</p>}
            {!fetching && !fetchError && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="w-8 py-2">
                        <Checkbox
                          checked={candidates.length > 0 && selected.size === candidates.length}
                          onChange={toggleAll}
                        />
                      </th>
                      <th className="py-2">Name</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Source</th>
                      <th className="py-2">Opt-in</th>
                      <th className="py-2">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((c) => (
                      <tr key={c.uid} className="border-b border-border/50">
                        <td className="py-2">
                          <Checkbox checked={selected.has(c.uid)} onChange={() => toggle(c.uid)} />
                        </td>
                        <td className="py-2">{c.displayName || "—"}</td>
                        <td className="py-2">{c.email}</td>
                        <td className="py-2 text-muted-foreground">{c.source}</td>
                        <td className="py-2">
                          <Badge variant={c.marketingOptIn ? "success" : "outline"}>
                            {c.marketingOptIn ? "Yes" : "No"}
                          </Badge>
                        </td>
                        <td className="py-2 text-muted-foreground">
                          {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                        </td>
                      </tr>
                    ))}
                    {candidates.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-muted-foreground">
                          No candidates yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send promotional email</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground">{selected.size} recipient(s) selected.</p>
            <div>
              <Label htmlFor="admin-subject">Subject</Label>
              <Input id="admin-subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="admin-body">Body (HTML)</Label>
              <Textarea
                id="admin-body"
                className="min-h-40"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="<p>Hi there — we've got a new role that matches your profile...</p>"
              />
            </div>
            {sendError && <p className="text-sm text-danger">{sendError}</p>}
            {sendResult && <p className="text-sm text-success">{sendResult}</p>}
            <Button
              disabled={sending || selected.size === 0 || !subject.trim() || !html.trim()}
              onClick={handleSend}
            >
              {sending ? "Sending…" : "Send email"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
