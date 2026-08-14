"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { adminNav, primaryNav, secondaryNav } from "@/core/config/navigation";
import { Logo } from "@/shared/components/layout/logo";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/features/auth/store";
import { cn } from "@/shared/lib/cn";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = useAuthStore((s) => s.isAdmin);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in lg:hidden" />
        <DialogPrimitive.Content className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card px-4 py-5 animate-slide-up lg:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {[...primaryNav, ...secondaryNav, ...(isAdmin ? [adminNav] : [])].map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    active
                      ? "bg-accent-soft text-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
