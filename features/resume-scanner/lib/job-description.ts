const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "then", "so", "of", "to", "in", "on", "for",
  "with", "at", "by", "from", "as", "is", "are", "was", "were", "be", "been", "being",
  "this", "that", "these", "those", "it", "its", "into", "about", "than", "over", "under",
  "you", "your", "yours", "we", "our", "us", "they", "their", "them", "he", "she", "his", "her",
  "not", "no", "yes", "all", "any", "each", "other", "some", "such", "own", "more", "most",
  "can", "will", "would", "should", "could", "may", "might", "must", "do", "does", "did",
  "have", "has", "had", "having", "get", "got", "who", "what", "when", "where", "why", "how",
  "up", "down", "out", "off", "again", "further", "once", "here", "there", "very", "also",
]);

// Generic job-posting filler that matches almost any resume regardless of relevance —
// keeping these out of the extracted set focuses matches on actual skills/requirements.
const GENERIC_JD_WORDS = new Set([
  "experience", "role", "roles", "team", "teams", "company", "position", "job", "jobs",
  "work", "working", "years", "year", "strong", "ability", "abilities", "skill", "skills",
  "knowledge", "including", "etc", "looking", "candidate", "candidates", "opportunity",
  "opportunities", "environment", "responsibilities", "responsible", "requirements",
  "required", "requires", "qualifications", "qualification", "preferred", "plus", "must",
  "join", "join us", "excellent", "good", "great", "new", "high", "level", "levels",
  "across", "within", "including", "related", "field", "fields", "day", "days", "time",
  "including", "background", "apply", "application", "applicants", "employer", "employment",
]);

function isMeaningfulToken(token: string) {
  return token.length >= 3 && !STOPWORDS.has(token) && !GENERIC_JD_WORDS.has(token) && !/^\d+$/.test(token);
}

/**
 * Best-effort keyword extraction from a free-text job description: ranks unigrams and
 * bigrams by frequency after stripping stopwords and generic posting boilerplate, so the
 * remaining terms skew toward the actual skills/tools/requirements named in the posting.
 */
export function extractKeywordsFromJobDescription(jobDescription: string, max = 40): string[] {
  const words = jobDescription
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const freq = new Map<string, number>();

  words.forEach((word, i) => {
    if (isMeaningfulToken(word)) {
      freq.set(word, (freq.get(word) ?? 0) + 1);
    }
    const next = words[i + 1];
    if (next && isMeaningfulToken(word) && isMeaningfulToken(next)) {
      const bigram = `${word} ${next}`;
      freq.set(bigram, (freq.get(bigram) ?? 0) + 1);
    }
  });

  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([term]) => term);
}
