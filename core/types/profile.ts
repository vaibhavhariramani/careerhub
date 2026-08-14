export interface Profile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  photoDataUrl?: string;
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  unlockedAt: string | null;
}

export interface ActivityEntry {
  id: string;
  type: "scan" | "resume" | "interview" | "job" | "question";
  message: string;
  at: string;
}
