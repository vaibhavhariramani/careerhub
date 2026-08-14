import { cn } from "@/shared/lib/cn";

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 10,
  className,
  label,
}: {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  const color =
    value >= 80 ? "stroke-success" : value >= 50 ? "stroke-warning" : "stroke-danger";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("fill-none transition-[stroke-dashoffset] duration-700 ease-out", color)}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{Math.round(value)}</span>
        {label ? <span className="text-xs text-muted-foreground">{label}</span> : null}
      </div>
    </div>
  );
}
