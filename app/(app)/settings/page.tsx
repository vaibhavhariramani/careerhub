"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { clear } from "idb-keyval";
import { Moon, Sun, Trash2, Laptop } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
] as const;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how CareerHub looks on this device.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-md border p-4 text-sm font-medium transition-colors",
                mounted && theme === t.value
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-muted-foreground hover:bg-muted/50",
              )}
            >
              <t.icon className="h-5 w-5" />
              {t.label}
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Your Data</CardTitle>
          <CardDescription>
            Everything you enter — resumes, saved jobs, practice progress — is stored only in this
            browser (IndexedDB). Nothing is uploaded to a server.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm("This will permanently delete all your local CareerHub data. Continue?")) {
                clear().then(() => window.location.reload());
              }
            }}
          >
            <Trash2 className="h-4 w-4" /> Clear all local data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
