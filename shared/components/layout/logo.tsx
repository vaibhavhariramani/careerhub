import Link from "next/link";
import { cn } from "@/shared/lib/cn";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 font-semibold", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="14" width="4" height="6" rx="1" fill="currentColor" />
          <rect x="10" y="9" width="4" height="11" rx="1" fill="currentColor" />
          <rect x="16" y="4" width="4" height="16" rx="1" fill="currentColor" />
        </svg>
      </span>
      <span className="text-lg tracking-tight">CareerHub</span>
    </Link>
  );
}
