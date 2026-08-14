export type QuestionCategory =
  | "technical"
  | "behavioral"
  | "hr"
  | "scenario"
  | "leadership"
  | "system-design"
  | "coding"
  | "finance"
  | "marketing";

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  relatedIds?: string[];
  tags: string[];
}

export type IndustryId =
  | "software-engineering"
  | "finance"
  | "marketing"
  | "hr"
  | "business-analyst"
  | "civil"
  | "mechanical"
  | "healthcare"
  | "sales"
  | "customer-service";

export interface MockInterviewQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
  difficulty: Difficulty;
}

export interface IndustryContent {
  id: IndustryId;
  label: string;
  guide: string;
  faqs: { question: string; answer: string }[];
  behavioral: MockInterviewQuestion[];
  technical: MockInterviewQuestion[];
  hr: MockInterviewQuestion[];
  caseStudies: { title: string; prompt: string; approach: string }[];
  salaryNegotiation: string[];
  commonMistakes: string[];
}
