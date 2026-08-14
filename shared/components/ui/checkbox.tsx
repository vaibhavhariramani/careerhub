import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export const Checkbox = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "type">
>(({ className, ...props }, ref) => (
  <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[0.375rem] border border-border bg-background transition-colors checked:border-accent checked:bg-accent",
        className,
      )}
      {...props}
    />
    <Check className="pointer-events-none absolute h-3.5 w-3.5 text-accent-foreground opacity-0 peer-checked:opacity-100" />
  </span>
));
Checkbox.displayName = "Checkbox";
