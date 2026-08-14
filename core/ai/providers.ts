/**
 * Provider interfaces for future LLM-backed features. Every default export is a rule-based
 * implementation that runs entirely client-side today. Swapping in a real LLM later means
 * implementing these same interfaces against an API route — no caller code changes.
 */

export interface ResumeRewriteProvider {
  rewriteBullet(weak: string, roleContext?: string): Promise<string>;
}

export interface CoverLetterProvider {
  generate(input: { resumeSummary: string; jobTitle: string; company: string }): Promise<string>;
}

export interface InterviewCoachProvider {
  evaluateAnswer(input: {
    question: string;
    answer: string;
  }): Promise<{ feedback: string; score: number }>;
}

const ACTION_VERBS = [
  "Built",
  "Led",
  "Designed",
  "Launched",
  "Optimized",
  "Automated",
  "Reduced",
  "Increased",
  "Delivered",
  "Architected",
];

export const ruleBasedResumeRewriteProvider: ResumeRewriteProvider = {
  async rewriteBullet(weak) {
    const verb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)] ?? "Delivered";
    const trimmed = weak.replace(/^responsible for\s*/i, "").replace(/\.$/, "");
    return `${verb} ${trimmed}, improving outcomes with measurable impact.`;
  },
};

export const ruleBasedCoverLetterProvider: CoverLetterProvider = {
  async generate({ resumeSummary, jobTitle, company }) {
    return `Dear ${company} Hiring Team,\n\n${resumeSummary} I'm excited to apply for the ${jobTitle} role and bring that experience to your team.\n\nBest regards`;
  },
};

export const ruleBasedInterviewCoachProvider: InterviewCoachProvider = {
  async evaluateAnswer({ answer }) {
    const words = answer.trim().split(/\s+/).filter(Boolean).length;
    const score = Math.max(20, Math.min(100, Math.round((words / 80) * 100)));
    return {
      feedback:
        words < 20
          ? "Try to elaborate more — use the STAR method to add specific detail and outcomes."
          : "Solid length and structure. Make sure you quantify the result if possible.",
      score,
    };
  },
};
