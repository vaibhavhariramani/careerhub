import { DEFAULT_SECTION_ORDER, type ResumeData, type SkillGroup } from "@/core/types/resume";
import type { ScanResult } from "@/core/types/scan";
import { findSections, type SectionMatch } from "./text-analysis";
import { BULLET_PREFIX_RE, extractContactDetails, isWeakBullet, rewriteBullet } from "./text-analysis";

const DATE_RANGE_RE =
  /((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{4}|\d{4})\s*(?:-|–|—|to)\s*((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{4}|\d{4}|present|current)/i;

const SOFT_SKILL_WORDS = [
  "communication",
  "leadership",
  "teamwork",
  "problem solving",
  "adaptability",
  "time management",
  "collaboration",
  "creativity",
  "critical thinking",
  "work ethic",
  "mentoring",
  "public speaking",
];

interface TextBlock {
  header: string;
  bullets: string[];
}

function splitIntoBlocks(sectionText: string): TextBlock[] {
  const lines = sectionText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const blocks: TextBlock[] = [];
  let current: TextBlock | null = null;

  for (const line of lines) {
    if (BULLET_PREFIX_RE.test(line)) {
      if (!current) current = { header: "", bullets: [] };
      current.bullets.push(line.replace(BULLET_PREFIX_RE, "").trim());
    } else if (current && current.bullets.length > 0) {
      blocks.push(current);
      current = { header: line, bullets: [] };
    } else if (current) {
      current.header = current.header ? `${current.header} ${line}` : line;
    } else {
      current = { header: line, bullets: [] };
    }
  }
  if (current) blocks.push(current);
  return blocks.filter((b) => b.header || b.bullets.length);
}

function extractDateRange(header: string) {
  const match = header.match(DATE_RANGE_RE);
  if (!match) return { startDate: "", endDate: "", current: false, rest: header };
  const startDate = match[1] ?? "";
  const endDate = match[2] ?? "";
  return {
    startDate,
    endDate,
    current: /present|current/i.test(endDate),
    rest: header.replace(match[0], "").replace(/[|,\-–—]+$/, "").trim(),
  };
}

function splitRoleCompany(rest: string): { role: string; company: string } {
  const atMatch = rest.match(/^(.*?)\s+at\s+(.*)$/i);
  if (atMatch) return { role: (atMatch[1] ?? "").trim(), company: (atMatch[2] ?? "").trim() };

  for (const sep of ["|", " – ", " — ", " - ", ","]) {
    if (rest.includes(sep)) {
      const [a, b] = rest.split(sep).map((s) => s.trim());
      return { role: a ?? rest, company: b ?? "" };
    }
  }
  return { role: rest, company: "" };
}

function guessFullName(rawText: string): string {
  const firstLine = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!firstLine || firstLine.length > 60) return "";
  if (firstLine.includes("@")) return "";
  if (/^(summary|objective|profile|experience|education|skills|projects|contact)\b/i.test(firstLine)) return "";
  return firstLine;
}

function buildSummary(section: SectionMatch | undefined, skills: SkillGroup): string {
  if (section?.text.trim()) return section.text.trim();
  const topSkills = skills.technical.slice(0, 3).join(", ") || "your core skills";
  return `Motivated professional with hands-on experience in ${topSkills}. Focused on solving real problems and delivering measurable results.`;
}

function buildExperience(section: SectionMatch | undefined) {
  if (!section) return [];
  return splitIntoBlocks(section.text).map((block) => {
    const { startDate, endDate, current, rest } = extractDateRange(block.header);
    const { role, company } = splitRoleCompany(rest);
    const achievements = block.bullets.map((b) => (isWeakBullet(b) ? rewriteBullet(b) : b));
    return {
      id: crypto.randomUUID(),
      company,
      role,
      location: "",
      startDate,
      endDate,
      current,
      achievements: achievements.length ? achievements : [""],
    };
  });
}

function buildEducation(section: SectionMatch | undefined) {
  if (!section) return [];
  return splitIntoBlocks(section.text).map((block) => {
    const { startDate, endDate, rest } = extractDateRange(block.header);
    const degreeMatch = rest.match(
      /\b(bachelor|master|ph\.?d|m\.?sc\.?|b\.?sc\.?|b\.?eng\.?|m\.?eng\.?|b\.?tech\.?|m\.?tech\.?|mba|b\.?s\.?|m\.?s\.?|b\.?a\.?|phd|diploma|associate)[^,|]*/i,
    );
    let degree = "";
    let school = rest;
    if (degreeMatch) {
      degree = degreeMatch[0].trim();
      school = rest.replace(degreeMatch[0], "").replace(/^[,|\-–—\s]+/, "").trim();
    }
    return {
      id: crypto.randomUUID(),
      school: school || rest,
      degree,
      field: "",
      startDate,
      endDate,
      gpa: "",
    };
  });
}

function buildProjects(section: SectionMatch | undefined) {
  if (!section) return [];
  return splitIntoBlocks(section.text).map((block) => ({
    id: crypto.randomUUID(),
    name: block.header,
    techStack: "",
    description: block.bullets.map((b) => (isWeakBullet(b) ? rewriteBullet(b) : b)).join(" "),
    github: "",
    liveDemo: "",
  }));
}

function buildSkills(section: SectionMatch | undefined): SkillGroup {
  const skills: SkillGroup = { technical: [], soft: [], languages: [], tools: [] };
  if (!section) return skills;

  section.text
    .split(/[,•●▪◦\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((item) => {
      if (SOFT_SKILL_WORDS.some((w) => item.toLowerCase().includes(w))) {
        skills.soft.push(item);
      } else {
        skills.technical.push(item);
      }
    });

  return skills;
}

function buildCertifications(section: SectionMatch | undefined) {
  if (!section) return [];
  return section.text
    .split(/\r?\n/)
    .map((l) => l.replace(BULLET_PREFIX_RE, "").trim())
    .filter(Boolean)
    .map((name) => ({ id: crypto.randomUUID(), name, issuer: "", date: "" }));
}

/** One entry per line — for free-text items like achievements, where a line may itself contain commas. */
function buildLineList(section: SectionMatch | undefined) {
  if (!section) return [];
  return section.text
    .split(/\r?\n/)
    .map((s) => s.replace(BULLET_PREFIX_RE, "").trim())
    .filter(Boolean);
}

/** Comma-or-line separated — for short tag-like items such as interests. */
function buildCommaList(section: SectionMatch | undefined) {
  if (!section) return [];
  return section.text
    .split(/[,•●▪◦\n]/)
    .map((s) => s.replace(BULLET_PREFIX_RE, "").trim())
    .filter(Boolean);
}

/**
 * Best-effort: turns an ATS scan's raw resume text into a structured, editable ResumeData,
 * rewriting bullets already flagged as weak (passive "responsible for..." phrasing) along the
 * way. Parsing free-form resume text is inherently approximate — this is a starting point for
 * the Resume Builder wizard, not a guaranteed 1:1 transcription.
 */
export function buildEnhancedResumeData(result: ScanResult): ResumeData {
  const sections = findSections(result.rawText);
  const contact = extractContactDetails(result.rawText);
  const skills = buildSkills(sections.skills);

  return {
    contact: {
      fullName: guessFullName(result.rawText),
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      linkedin: contact.linkedin,
      github: contact.github,
      portfolio: contact.portfolio,
    },
    summary: buildSummary(sections.summary, skills),
    education: buildEducation(sections.education),
    experience: buildExperience(sections.experience),
    projects: buildProjects(sections.projects),
    skills,
    certifications: buildCertifications(sections.certifications),
    achievements: buildLineList(sections.achievements),
    interests: buildCommaList(sections.interests),
    templateId: "minimal",
    sectionOrder: DEFAULT_SECTION_ORDER,
  };
}
