import type { WorkMode } from "@/core/types/job";

export function detectWorkMode(text: string, explicitRemote?: boolean): WorkMode {
  const t = text.toLowerCase();
  if (explicitRemote) return "remote";
  if (t.includes("remote")) return "remote";
  if (t.includes("hybrid")) return "hybrid";
  return "onsite";
}

export function detectVisaSponsorship(text: string): boolean {
  const t = text.toLowerCase();
  return /visa sponsor|sponsorship available|will sponsor|h-?1b/i.test(t);
}

export function detectFreshGraduate(text: string): boolean {
  const t = text.toLowerCase();
  return /entry.level|new grad|graduate program|junior|no experience required|0-1 year/i.test(t);
}

export function detectInternship(text: string): boolean {
  const t = text.toLowerCase();
  return /intern(ship)?\b/i.test(t);
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
