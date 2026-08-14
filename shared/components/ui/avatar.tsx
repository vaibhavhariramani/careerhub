import { cn } from "@/shared/lib/cn";

export function Avatar({
  name,
  src,
  className,
  size = 40,
}: {
  name: string;
  src?: string;
  className?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size }}
        className={cn("rounded-full object-cover", className)}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "flex items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent",
        className,
      )}
    >
      {initials || "?"}
    </div>
  );
}
