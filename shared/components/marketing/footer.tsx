import { Logo } from "@/shared/components/layout/logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-10 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CareerHub. Built for job seekers, everywhere.
        </p>
      </div>
    </footer>
  );
}
