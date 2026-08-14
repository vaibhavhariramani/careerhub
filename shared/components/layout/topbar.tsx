"use client";

import Link from "next/link";
import { LogIn, LogOut, Settings, UserRound } from "lucide-react";
import { signOut } from "firebase/auth";
import { MobileNav } from "@/shared/components/layout/mobile-nav";
import { ThemeToggle } from "@/shared/components/layout/theme-toggle";
import { Avatar } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useProfileStore } from "@/features/profile/store";
import { useAuthStore } from "@/features/auth/store";
import { auth } from "@/shared/lib/firebase-client";

export function Topbar() {
  const profileName = useProfileStore((s) => s.profile.fullName);
  const user = useAuthStore((s) => s.user);
  const name = user?.displayName || profileName || "Guest";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-2">
        <MobileNav />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar name={name} size={36} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <UserRound className="h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user ? (
              <DropdownMenuItem onSelect={() => void signOut(auth)}>
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login">
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
