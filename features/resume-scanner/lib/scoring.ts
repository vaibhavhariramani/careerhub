import type { RoleId } from "@/core/config/roles";
import type {
  CategoryScore,
  MissingSection,
  ScanResult,
  ScoreCategoryId,
  Suggestion,
} from "@/core/types/scan";
import { KEYWORD_DICTIONARIES } from "./keyword-dictionaries";
import { extractKeywordsFromJobDescription } from "./job-description";
import {
  ACTION_VERBS,
  BULLET_PREFIX_RE,
  METRIC_REGEX,
  WEAK_PHRASES,
  countBulletLines,
  detectContact,
  findSections,
  rewriteBullet,
  splitSentences,
  wordCount,
} from "./text-analysis";

const CATEGORY_META: Record<ScoreCategoryId, { label: string; weight: number }> = {
  formatting: { label: "Formatting", weight: 0.08 },
  keywords: { label: "Keywords", weight: 0.15 },
  experience: { label: "Experience", weight: 0.15 },
  skills: { label: "Skills", weight: 0.1 },
  projects: { label: "Projects", weight: 0.08 },
  education: { label: "Education", weight: 0.07 },
  grammar: { label: "Grammar", weight: 0.05 },
  actionVerbs: { label: "Action Verbs", weight: 0.1 },
  achievements: { label: "Achievements", weight: 0.1 },
  readability: { label: "Readability", weight: 0.04 },
  length: { label: "Length", weight: 0.03 },
  contactInfo: { label: "Contact Information", weight: 0.05 },
};

function statusFor(score: number): CategoryScore["status"] {
  if (score >= 80) return "green";
  if (score >= 50) return "yellow";
  return "red";
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export function scoreResume(
  rawText: string,
  fileName: string,
  role: RoleId | null,
  jobDescription?: string,
): ScanResult {
  const text = rawText;
  const sections = findSections(text);
  const contact = detectContact(text);
  const totalWords = wordCount(text);

  const categories: CategoryScore[] = [];
  const suggestions: Suggestion[] = [];

  // --- Formatting ---
  {
    const coreSections = ["experience", "education", "skills"];
    const presentCore = coreSections.filter((s) => sections[s]).length;
    const bulletLikeLines = text
      .split(/\r?\n/)
      .filter((l) => BULLET_PREFIX_RE.test(l.trim())).length;
    const hasBullets = bulletLikeLines >= 3;
    let score = (presentCore / coreSections.length) * 70 + (hasBullets ? 30 : 10);
    score = clamp(score);
    const notes: string[] = [];
    if (presentCore < coreSections.length) notes.push("Add clear headings for Experience, Education, and Skills.");
    if (!hasBullets) notes.push("Use bullet points to list achievements, easier for ATS parsers and recruiters to scan.");
    if (!notes.length) notes.push("Clean section structure with bullet-based formatting detected.");
    categories.push({ id: "formatting", label: CATEGORY_META.formatting.label, score, weight: CATEGORY_META.formatting.weight, status: statusFor(score), notes });
  }

  // --- Keywords ---
  let matchedKeywords: string[] = [];
  let missingKeywords: string[] = [];
  {
    const jdKeywords = jobDescription?.trim() ? extractKeywordsFromJobDescription(jobDescription) : null;
    const dictionary =
      jdKeywords ?? (role ? KEYWORD_DICTIONARIES[role] : Object.values(KEYWORD_DICTIONARIES).flat());
    const uniqueDict = jdKeywords ? dictionary : role ? dictionary : Array.from(new Set(dictionary)).slice(0, 40);
    const lowerText = text.toLowerCase();
    matchedKeywords = uniqueDict.filter((kw) => lowerText.includes(kw.toLowerCase()));
    missingKeywords = uniqueDict.filter((kw) => !matchedKeywords.includes(kw));
    const score = uniqueDict.length ? clamp((matchedKeywords.length / uniqueDict.length) * 100) : 0;
    const notes = jdKeywords
      ? [`Matched ${matchedKeywords.length} of ${uniqueDict.length} keywords found in the job description.`]
      : role
        ? [`Matched ${matchedKeywords.length} of ${uniqueDict.length} keywords for this role.`]
        : ["Select a target role or paste a job description above for precise keyword scoring."];
    categories.push({ id: "keywords", label: CATEGORY_META.keywords.label, score, weight: CATEGORY_META.keywords.weight, status: statusFor(score), notes });
  }

  // --- Experience ---
  {
    const section = sections.experience;
    const bullets = section ? countBulletLines(section.text) : [];
    const actionVerbBullets = bullets.filter((b) =>
      ACTION_VERBS.some((v) => new RegExp(`\\b${v}\\b`, "i").test(b)),
    );
    let score = 0;
    const notes: string[] = [];
    if (!section) {
      notes.push("No Experience section detected.");
    } else {
      score = clamp(40 + Math.min(bullets.length, 6) * 8 + (actionVerbBullets.length / Math.max(1, bullets.length)) * 12);
      notes.push(`${bullets.length} experience bullet(s) detected.`);
    }
    categories.push({ id: "experience", label: CATEGORY_META.experience.label, score, weight: CATEGORY_META.experience.weight, status: statusFor(score), notes });
  }

  // --- Skills ---
  {
    const section = sections.skills;
    let score = 0;
    const notes: string[] = [];
    if (!section) {
      notes.push("No Skills section detected.");
    } else {
      const items = section.text.split(/[,\n•●▪◦]/).map((s) => s.trim()).filter(Boolean);
      score = clamp(30 + Math.min(items.length, 15) * 5);
      notes.push(`${items.length} skill item(s) detected.`);
    }
    categories.push({ id: "skills", label: CATEGORY_META.skills.label, score, weight: CATEGORY_META.skills.weight, status: statusFor(score), notes });
  }

  // --- Projects ---
  {
    const section = sections.projects;
    let score = 0;
    const notes: string[] = [];
    if (!section) {
      notes.push("No Projects section detected, strongly recommended for students and career switchers.");
    } else {
      const bullets = countBulletLines(section.text);
      score = clamp(40 + Math.min(bullets.length, 8) * 8);
      notes.push(`${bullets.length} project line(s) detected.`);
    }
    categories.push({ id: "projects", label: CATEGORY_META.projects.label, score, weight: CATEGORY_META.projects.weight, status: statusFor(score), notes });
  }

  // --- Education ---
  {
    const section = sections.education;
    let score = 0;
    const notes: string[] = [];
    if (!section) {
      notes.push("No Education section detected.");
    } else {
      const hasDegreeWord =
        /\b(bachelor|master|ph\.?d|m\.?sc\.?|b\.?sc\.?|b\.?eng\.?|m\.?eng\.?|b\.?tech\.?|m\.?tech\.?|mba|b\.?s\.?|m\.?s\.?|b\.?a\.?|phd|diploma|associate)\b/i.test(
          section.text,
        );
      score = clamp(hasDegreeWord ? 90 : 60);
      notes.push(hasDegreeWord ? "Degree information found." : "Consider clarifying your degree title.");
    }
    categories.push({ id: "education", label: CATEGORY_META.education.label, score, weight: CATEGORY_META.education.weight, status: statusFor(score), notes });
  }

  // --- Grammar (readability proxy) ---
  {
    const sentences = splitSentences(text);
    const avgLen = sentences.length ? sentences.reduce((sum, s) => sum + wordCount(s), 0) / sentences.length : 0;
    let score = 100;
    const notes: string[] = [];
    if (avgLen > 32) {
      score = 55;
      notes.push("Some sentences run long, break them into concise bullet points.");
    } else if (avgLen === 0) {
      score = 40;
      notes.push("Not enough sentence-level text to evaluate.");
    } else {
      notes.push("Sentence length looks reasonable for scanning.");
    }
    categories.push({ id: "grammar", label: CATEGORY_META.grammar.label, score: clamp(score), weight: CATEGORY_META.grammar.weight, status: statusFor(score), notes });
  }

  // --- Action Verbs ---
  {
    const allBullets = Object.values(sections)
      .filter(Boolean)
      .flatMap((s) => countBulletLines(s!.text));
    const withVerb = allBullets.filter((b) => {
      const firstWord = b.replace(BULLET_PREFIX_RE, "").split(/\s+/)[0]?.toLowerCase() ?? "";
      return ACTION_VERBS.includes(firstWord);
    });
    const ratio = allBullets.length ? withVerb.length / allBullets.length : 0;
    const score = clamp(ratio * 100);
    const notes = [
      allBullets.length
        ? `${withVerb.length} of ${allBullets.length} bullets start with a strong action verb.`
        : "Add bullet points describing your experience and projects.",
    ];
    categories.push({ id: "actionVerbs", label: CATEGORY_META.actionVerbs.label, score, weight: CATEGORY_META.actionVerbs.weight, status: statusFor(score), notes });
  }

  // --- Achievements (quantified impact) ---
  {
    const allBullets = Object.values(sections)
      .filter(Boolean)
      .flatMap((s) => countBulletLines(s!.text));
    const quantified = allBullets.filter((b) => METRIC_REGEX.test(b));
    const ratio = allBullets.length ? quantified.length / allBullets.length : 0;
    const score = clamp(ratio * 100);
    const notes = [
      quantified.length
        ? `${quantified.length} bullet(s) include measurable numbers or metrics.`
        : "Add numbers, percent improvement, users served, time saved, to quantify your impact.",
    ];
    categories.push({ id: "achievements", label: CATEGORY_META.achievements.label, score, weight: CATEGORY_META.achievements.weight, status: statusFor(score), notes });
  }

  // --- Readability ---
  {
    const words = text.split(/\s+/).filter(Boolean);
    const avgWordLen = words.length ? words.reduce((s, w) => s + w.length, 0) / words.length : 0;
    const score = clamp(100 - Math.max(0, avgWordLen - 5.5) * 20);
    categories.push({
      id: "readability",
      label: CATEGORY_META.readability.label,
      score,
      weight: CATEGORY_META.readability.weight,
      status: statusFor(score),
      notes: [score >= 80 ? "Concise, easy-to-scan word choice." : "Simplify long or jargon-heavy words where possible."],
    });
  }

  // --- Length ---
  {
    let score: number;
    let note: string;
    if (totalWords < 150) {
      score = 40;
      note = "Resume looks too short, add more detail on experience and projects.";
    } else if (totalWords <= 900) {
      score = 100;
      note = `${totalWords} words, a healthy length for one to two pages.`;
    } else if (totalWords <= 1200) {
      score = 70;
      note = "Getting long, consider trimming to the most relevant points.";
    } else {
      score = 45;
      note = "Resume is too long, aim for 1-2 pages (roughly 400-900 words).";
    }
    categories.push({ id: "length", label: CATEGORY_META.length.label, score, weight: CATEGORY_META.length.weight, status: statusFor(score), notes: [note] });
  }

  // --- Contact Info ---
  {
    const fields = [contact.email, contact.phone, contact.location, contact.linkedin || contact.github || contact.portfolio];
    const present = fields.filter(Boolean).length;
    const score = clamp((present / fields.length) * 100);
    const notes: string[] = [];
    if (!contact.email) notes.push("Missing email address.");
    if (!contact.phone) notes.push("Missing phone number.");
    if (!contact.location) notes.push("Missing location (city, state or country).");
    if (!contact.linkedin && !contact.github && !contact.portfolio) notes.push("Add a LinkedIn, GitHub, or portfolio link.");
    if (!notes.length) notes.push("All key contact details detected.");
    categories.push({ id: "contactInfo", label: CATEGORY_META.contactInfo.label, score, weight: CATEGORY_META.contactInfo.weight, status: statusFor(score), notes });
  }

  const overallScore = Math.round(
    categories.reduce((sum, c) => sum + c.score * c.weight, 0),
  );

  // --- Missing sections ---
  const missingSections: MissingSection[] = [];
  const sectionToLabel: [string, MissingSection][] = [
    ["summary", "Summary"],
    ["projects", "Projects"],
    ["certifications", "Certifications"],
    ["achievements", "Achievements"],
    ["skills", "Technical Skills"],
    ["languages", "Languages"],
    ["awards", "Awards"],
    ["volunteer", "Volunteer Work"],
    ["publications", "Publications"],
    ["leadership", "Leadership"],
  ];
  sectionToLabel.forEach(([key, label]) => {
    if (!sections[key]) missingSections.push(label);
  });

  // --- Suggestions ---
  suggestions.push({
    id: "example-weak-strong",
    category: "actionVerbs",
    weak: "Responsible for developing applications.",
    better: "Developed scalable Flutter applications used by over 50,000 users.",
    reason: "Lead with a strong action verb and quantify the impact.",
  });

  const experienceBullets = sections.experience ? countBulletLines(sections.experience.text) : [];
  experienceBullets
    .filter((b) => WEAK_PHRASES.some((p) => b.toLowerCase().includes(p)))
    .slice(0, 4)
    .forEach((weak, i) => {
      suggestions.push({
        id: `weak-${i}`,
        category: "actionVerbs",
        weak,
        better: rewriteBullet(weak),
        reason: "Avoid passive phrasing, start with an action verb and add a measurable outcome.",
      });
    });

  return {
    fileName,
    rawText: text,
    wordCount: totalWords,
    overallScore,
    categories,
    contact,
    missingSections,
    suggestions: suggestions.slice(0, 6),
    matchedKeywords,
    missingKeywords,
    role,
    scannedAt: new Date().toISOString(),
  };
}
