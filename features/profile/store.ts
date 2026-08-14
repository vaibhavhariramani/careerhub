import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { idbStorage } from "@/shared/lib/idb-storage";
import type { Achievement, ActivityEntry, Profile } from "@/core/types/profile";

const emptyProfile: Profile = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  headline: "",
};

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "first-scan", label: "First Scan", description: "Ran your first ATS resume scan.", unlockedAt: null },
  { id: "resume-built", label: "Resume Builder", description: "Built a resume from scratch.", unlockedAt: null },
  { id: "mock-interview", label: "Interview Ready", description: "Completed a mock interview.", unlockedAt: null },
  { id: "first-save", label: "Job Hunter", description: "Saved your first job.", unlockedAt: null },
  { id: "profile-complete", label: "All Set", description: "Completed your profile.", unlockedAt: null },
];

interface ProfileState {
  profile: Profile;
  achievements: Achievement[];
  activity: ActivityEntry[];
  updateProfile: (patch: Partial<Profile>) => void;
  unlockAchievement: (id: string) => void;
  logActivity: (entry: Omit<ActivityEntry, "id" | "at">) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      achievements: DEFAULT_ACHIEVEMENTS,
      activity: [],
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),
      unlockAchievement: (id) =>
        set((s) => ({
          achievements: s.achievements.map((a) =>
            a.id === id && !a.unlockedAt ? { ...a, unlockedAt: new Date().toISOString() } : a,
          ),
        })),
      logActivity: (entry) =>
        set((s) => ({
          activity: [
            { ...entry, id: crypto.randomUUID(), at: new Date().toISOString() },
            ...s.activity,
          ].slice(0, 30),
        })),
    }),
    { name: "careerhub-profile", storage: createJSONStorage(() => idbStorage) },
  ),
);
