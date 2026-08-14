import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ScanSearch,
  FileEdit,
  MessagesSquare,
  Library,
  Briefcase,
  Bookmark,
  UserRound,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const primaryNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Resume Scanner", href: "/resume-scanner", icon: ScanSearch },
  { label: "Resume Builder", href: "/resume-builder", icon: FileEdit },
  { label: "Interview Prep", href: "/interview-prep", icon: MessagesSquare },
  { label: "Question Bank", href: "/question-bank", icon: Library },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "Saved Jobs", href: "/saved-jobs", icon: Bookmark },
];

export const secondaryNav: NavItem[] = [
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Settings", href: "/settings", icon: Settings },
];
