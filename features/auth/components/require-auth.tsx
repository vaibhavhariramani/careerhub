"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/features/auth/store";

export function RequireAuth({
  children,
  title = "Sign in to continue",
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const pathname = usePathname();

  if (loading) return null;

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
            <Button asChild className="w-full">
              <Link href={`/login?next=${encodeURIComponent(pathname)}`}>
                <LogIn className="h-4 w-4" /> Sign in to continue
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
