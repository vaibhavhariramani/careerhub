import { Badge } from "@/shared/components/ui/badge";
import type { Difficulty } from "@/core/types/question";

const VARIANT = {
  easy: "success",
  medium: "warning",
  hard: "danger",
} as const;

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Badge variant={VARIANT[difficulty]}>{difficulty}</Badge>;
}
