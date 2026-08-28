export const SECTION_HEADINGS: Record<string, string[]> = {
  summary: ["summary", "professional summary", "objective", "profile", "about me", "career summary"],
  experience: [
    "experience",
    "work experience",
    "professional experience",
    "employment history",
    "work history",
    "career history",
    "relevant experience",
  ],
  education: ["education", "academic background", "academic qualifications", "educational background"],
  projects: ["projects", "personal projects", "key projects", "academic projects"],
  skills: [
    "skills",
    "technical skills",
    "core competencies",
    "core skills",
    "key skills",
    "areas of expertise",
    "skills & competencies",
    "skills and competencies",
  ],
  certifications: ["certifications", "certificates", "licenses", "certifications & achievements", "licenses & certifications"],
  achievements: ["achievements", "accomplishments", "key achievements"],
  awards: ["awards", "honors", "awards & honors"],
  languages: ["languages"],
  volunteer: ["volunteer work", "volunteering", "community service"],
  publications: ["publications"],
  leadership: ["leadership", "leadership experience"],
  interests: ["interests", "hobbies"],
};

export interface SectionMatch {
  key: string;
  headingLine: string;
  startIndex: number;
  endIndex: number;
  text: string;
}

const isLikelyHeading = (line: string) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 45) return false;
  const wordCount = trimmed.split(/\s+/).length;
  return wordCount <= 5;
};

export function findSections(rawText: string): Record<string, SectionMatch | undefined> {
  const lines = rawText.split(/\r?\n/);
  const found: Record<string, SectionMatch | undefined> = {};

  const headingLineIndexes: { key: string; lineIndex: number; heading: string }[] = [];

  lines.forEach((line, idx) => {
    if (!isLikelyHeading(line)) return;
    const clean = line.trim().toLowerCase().replace(/[:.]+$/, "");
    for (const [key, aliases] of Object.entries(SECTION_HEADINGS)) {
      if (aliases.some((alias) => clean === alias || clean.startsWith(alias))) {
        headingLineIndexes.push({ key, lineIndex: idx, heading: line.trim() });
        break;
      }
    }
  });

  headingLineIndexes.forEach((entry, i) => {
    const nextStart = headingLineIndexes[i + 1]?.lineIndex ?? lines.length;
    const sectionLines = lines.slice(entry.lineIndex + 1, nextStart);
    found[entry.key] = {
      key: entry.key,
      headingLine: entry.heading,
      startIndex: entry.lineIndex,
      endIndex: nextStart,
      text: sectionLines.join("\n").trim(),
    };
  });

  return found;
}

export const BULLET_PREFIX_RE = /^([•●▪◦\-*]|\d+[.)])\s+/;

export function countBulletLines(sectionText: string): string[] {
  return sectionText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => BULLET_PREFIX_RE.test(l) || (l.length > 0 && l.length < 220));
}

export const ACTION_VERBS = [
  "built",
  "led",
  "designed",
  "launched",
  "optimized",
  "automated",
  "reduced",
  "increased",
  "delivered",
  "architected",
  "developed",
  "implemented",
  "created",
  "managed",
  "improved",
  "streamlined",
  "spearheaded",
  "drove",
  "engineered",
  "deployed",
  "analyzed",
  "coordinated",
  "mentored",
  "negotiated",
  "launched",
  "scaled",
  "migrated",
  "resolved",
  "achieved",
  "generated",
  "authored",
  "collaborated",
  "configured",
  "contributed",
  "consolidated",
  "debugged",
  "devised",
  "directed",
  "documented",
  "enabled",
  "enhanced",
  "established",
  "evaluated",
  "executed",
  "expanded",
  "facilitated",
  "founded",
  "guided",
  "headed",
  "hired",
  "identified",
  "influenced",
  "initiated",
  "installed",
  "instituted",
  "integrated",
  "introduced",
  "leveraged",
  "liaised",
  "maintained",
  "modernized",
  "monitored",
  "onboarded",
  "orchestrated",
  "organized",
  "overhauled",
  "owned",
  "partnered",
  "piloted",
  "pioneered",
  "planned",
  "presented",
  "prioritized",
  "produced",
  "programmed",
  "prototyped",
  "provided",
  "rebuilt",
  "recommended",
  "redesigned",
  "refactored",
  "refined",
  "remediated",
  "reorganized",
  "reported",
  "researched",
  "restructured",
  "revamped",
  "reviewed",
  "revised",
  "secured",
  "shipped",
  "simplified",
  "sourced",
  "standardized",
  "steered",
  "strengthened",
  "structured",
  "supervised",
  "supported",
  "surpassed",
  "tested",
  "trained",
  "transformed",
  "translated",
  "tracked",
  "unified",
  "upgraded",
  "utilized",
  "validated",
  "wrote",
];

export const WEAK_PHRASES = [
  "responsible for",
  "worked on",
  "helped with",
  "involved in",
  "assisted with",
  "duties included",
  "tasked with",
];

export const METRIC_REGEX = /(\$?\d+([.,]\d+)?\s?(%|k|m|million|billion|x|percent)?)/i;

export function detectContact(rawText: string) {
  const email = /[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/.test(rawText);
  const phone = /(\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/.test(rawText);
  const linkedin = /linkedin\.com\/[a-z0-9\-\/]+/i.test(rawText);
  const github = /github\.com\/[a-z0-9\-\/]+/i.test(rawText);
  const portfolio =
    /https?:\/\/(?!.*(linkedin|github))[a-z0-9.\-]+\.[a-z]{2,}/i.test(rawText);
  const location = /\b[A-Z][a-zA-Z]+,\s?[A-Z]{2}\b/.test(rawText) || /\b[A-Z][a-zA-Z]+,\s?[A-Z][a-zA-Z]+\b/.test(rawText);

  return { email, phone, linkedin, github, portfolio, location };
}

export function rewriteBullet(weak: string): string {
  const verb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)] ?? "Delivered";
  const capitalized = verb.charAt(0).toUpperCase() + verb.slice(1);
  const rest = weak
    .replace(BULLET_PREFIX_RE, "")
    .replace(new RegExp(`^(${WEAK_PHRASES.join("|")})\\s*`, "i"), "")
    .replace(/\.$/, "");
  return `${capitalized} ${rest}, delivering measurable results.`;
}

export function isWeakBullet(line: string): boolean {
  const clean = line.replace(BULLET_PREFIX_RE, "").toLowerCase();
  return WEAK_PHRASES.some((p) => clean.includes(p));
}

export interface ExtractedContact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
}

export function extractContactDetails(rawText: string): ExtractedContact {
  const emailMatch = rawText.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = rawText.match(/(\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/);
  const linkedinMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[a-z0-9\-/]+/i);
  const githubMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-z0-9\-/]+/i);
  const portfolioMatch = rawText.match(/https?:\/\/(?!.*(linkedin|github))[a-z0-9.\-]+\.[a-z]{2,}[a-z0-9\-/]*/i);
  const locationMatch =
    rawText.match(/\b[A-Z][a-zA-Z]+,\s?[A-Z]{2}\b/) ??
    rawText.match(/\b[A-Z][a-zA-Z]+,\s?[A-Z][a-zA-Z]+\b/);

  return {
    email: emailMatch?.[0] ?? "",
    phone: phoneMatch?.[0]?.trim() ?? "",
    linkedin: linkedinMatch?.[0] ?? "",
    github: githubMatch?.[0] ?? "",
    portfolio: portfolioMatch?.[0] ?? "",
    location: locationMatch?.[0] ?? "",
  };
}

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3);
}
