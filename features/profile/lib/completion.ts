import type { Profile } from "@/core/types/profile";

const FIELDS: (keyof Profile)[] = ["fullName", "email", "phone", "location", "headline"];

export function profileCompletion(profile: Profile): number {
  const filled = FIELDS.filter((f) => profile[f]?.trim()).length;
  return Math.round((filled / FIELDS.length) * 100);
}
