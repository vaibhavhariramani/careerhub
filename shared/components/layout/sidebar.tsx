"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, secondaryNav } from "@/core/config/navigation";
import { Logo } from "@/shared/components/layout/logo";
import { cn } from "@/shared/lib/cn";

function NavLink({ href, label, icon: Icon }: (typeof primaryNav)[number]) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-accent-soft text-accent"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className={cn("h-4 w-4", active ? "text-accent" : "opacity-70")} />
      {label}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card/40 px-4 py-5 lg:flex">
      <Logo href="/dashboard" className="px-2" />
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {primaryNav.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
        <div className="my-3 h-px bg-border" />
        {secondaryNav.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}
