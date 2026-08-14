import type { Question } from "@/core/types/question";

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    question: "What is a REST API?",
    answer:
      "REST (Representational State Transfer) is an architectural style for designing networked applications, using stateless HTTP requests to perform CRUD operations on resources identified by URLs.",
    explanation:
      "Key REST principles: statelessness, a uniform interface (standard HTTP verbs: GET, POST, PUT, DELETE), resource-based URLs, and representations (usually JSON) of resource state.",
    category: "technical",
    difficulty: "easy",
    tags: ["api", "web", "backend"],
  },
  {
    id: "q2",
    question: "What is the difference between SQL and NoSQL databases?",
    answer:
      "SQL databases are relational, use structured schemas and tables, and enforce ACID transactions. NoSQL databases are non-relational, often schema-flexible, and optimized for horizontal scale and specific data models (document, key-value, graph, wide-column).",
    category: "technical",
    difficulty: "easy",
    tags: ["database", "sql", "nosql"],
  },
  {
    id: "q3",
    question: "Explain the concept of Big O notation.",
    answer:
      "Big O notation describes how an algorithm's runtime or space requirement grows relative to input size, focusing on the worst-case upper bound and ignoring constant factors.",
    explanation: "Common complexities from fastest to slowest: O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n).",
    category: "technical",
    difficulty: "medium",
    tags: ["algorithms", "complexity"],
  },
  {
    id: "q4",
    question: "What is the CAP theorem?",
    answer:
      "In a distributed system, you can only guarantee two of three properties at once: Consistency, Availability, and Partition tolerance. Since network partitions are unavoidable in practice, systems generally trade off consistency vs. availability.",
    category: "system-design",
    difficulty: "hard",
    tags: ["distributed-systems", "databases"],
  },
  {
    id: "q5",
    question: "How would you design a rate limiter?",
    answer:
      "Common approaches include token bucket, leaky bucket, fixed window counter, and sliding window log/counter algorithms. Token bucket is popular for allowing bursts while enforcing an average rate, typically implemented with Redis for distributed systems.",
    category: "system-design",
    difficulty: "hard",
    tags: ["system-design", "scalability"],
    relatedIds: ["q4"],
  },
  {
    id: "q6",
    question: "Reverse a linked list. What's your approach?",
    answer:
      "Iteratively walk the list keeping track of previous, current, and next nodes, reversing the 'next' pointer at each step. This runs in O(n) time and O(1) space. A recursive approach is also possible but uses O(n) stack space.",
    category: "coding",
    difficulty: "medium",
    tags: ["data-structures", "linked-list"],
  },
  {
    id: "q7",
    question: "Find the first non-repeating character in a string.",
    answer:
      "Use a hash map to count character frequencies in one pass, then iterate the string again to find the first character with a count of 1. This runs in O(n) time.",
    category: "coding",
    difficulty: "easy",
    tags: ["strings", "hash-map"],
  },
  {
    id: "q8",
    question: "Tell me about a time you had to work with a difficult teammate.",
    answer:
      "A strong answer names the friction (without blame), what you did to understand their perspective, the specific action you took to resolve it, and the outcome — ideally showing you kept things professional and results-focused.",
    category: "behavioral",
    difficulty: "medium",
    tags: ["teamwork", "conflict"],
  },
  {
    id: "q9",
    question: "Describe a time you failed. What did you learn?",
    answer:
      "Interviewers want a genuine failure (not a humble-brag), what caused it, what you did differently afterward, and evidence that you applied the lesson later.",
    category: "behavioral",
    difficulty: "medium",
    tags: ["self-awareness", "growth"],
  },
  {
    id: "q10",
    question: "Why do you want to leave your current job?",
    answer:
      "Frame this around what you're moving toward (growth, scope, mission fit) rather than what you're running from. Avoid criticizing your current employer.",
    category: "hr",
    difficulty: "easy",
    tags: ["motivation"],
  },
  {
    id: "q11",
    question: "What are your salary expectations?",
    answer:
      "Give a researched range based on market data for the role, level, and location, and note you're flexible for the right overall package/opportunity.",
    category: "hr",
    difficulty: "medium",
    tags: ["negotiation"],
  },
  {
    id: "q12",
    question: "How would you handle a project with an unrealistic deadline?",
    answer:
      "Clarify true priorities with the stakeholder, propose a reduced scope or phased delivery, flag risks early rather than silently overcommitting, and communicate trade-offs clearly.",
    category: "scenario",
    difficulty: "medium",
    tags: ["prioritization", "communication"],
  },
  {
    id: "q13",
    question: "A key team member quits mid-project. What do you do?",
    answer:
      "Assess what knowledge/work is at risk, redistribute critical tasks, communicate impact transparently to stakeholders, and look for quick documentation or handoff to de-risk the gap.",
    category: "scenario",
    difficulty: "medium",
    tags: ["risk-management"],
  },
  {
    id: "q14",
    question: "How do you motivate an underperforming team member?",
    answer:
      "Understand the root cause first (skill gap, unclear expectations, personal issue, disengagement), set clear, measurable expectations, provide support/resources, and follow up on a defined timeline.",
    category: "leadership",
    difficulty: "medium",
    tags: ["management", "coaching"],
  },
  {
    id: "q15",
    question: "How do you decide what to delegate vs. do yourself?",
    answer:
      "Delegate based on team member growth opportunities and your own highest-leverage work; keep tasks requiring your unique context, authority, or that are time-critical and high-risk.",
    category: "leadership",
    difficulty: "medium",
    tags: ["delegation"],
  },
  {
    id: "q16",
    question: "What is the difference between NPV and IRR?",
    answer:
      "NPV (Net Present Value) is the dollar value created by an investment after discounting future cash flows. IRR (Internal Rate of Return) is the discount rate at which NPV equals zero. NPV is generally preferred for comparing mutually exclusive projects.",
    category: "finance",
    difficulty: "medium",
    tags: ["valuation", "corporate-finance"],
  },
  {
    id: "q17",
    question: "Walk me through a DCF valuation.",
    answer:
      "Project unlevered free cash flows for a forecast period, discount them to present value using WACC, calculate a terminal value (perpetuity growth or exit multiple), discount that too, and sum both for enterprise value.",
    category: "finance",
    difficulty: "hard",
    tags: ["valuation", "dcf"],
    relatedIds: ["q16"],
  },
  {
    id: "q18",
    question: "What's the difference between working capital and cash flow?",
    answer:
      "Working capital (current assets minus current liabilities) measures short-term liquidity at a point in time. Cash flow measures actual cash movement over a period.",
    category: "finance",
    difficulty: "medium",
    tags: ["accounting"],
  },
  {
    id: "q19",
    question: "How would you measure the success of a marketing campaign?",
    answer:
      "Tie it to a primary business metric (conversions, revenue, signups) with a clear baseline and target, plus supporting metrics (CTR, CAC, engagement) to diagnose why it did or didn't work.",
    category: "marketing",
    difficulty: "easy",
    tags: ["metrics"],
  },
  {
    id: "q20",
    question: "What's the difference between SEO and SEM?",
    answer:
      "SEO (Search Engine Optimization) improves organic (unpaid) search rankings through content, technical site health, and backlinks. SEM (Search Engine Marketing) covers paid search ads, typically pay-per-click.",
    category: "marketing",
    difficulty: "easy",
    tags: ["seo", "sem"],
  },
  {
    id: "q21",
    question: "How do you approach positioning a new product?",
    answer:
      "Identify the target segment's core pain point, map competitive alternatives, and craft a clear value proposition that differentiates on the dimension customers care most about — then test messaging before broad rollout.",
    category: "marketing",
    difficulty: "medium",
    tags: ["positioning", "strategy"],
  },
  {
    id: "q22",
    question: "What is polymorphism in object-oriented programming?",
    answer:
      "Polymorphism allows objects of different classes to be treated through a common interface, with each class providing its own implementation of shared methods — enabling flexible, extensible code.",
    category: "technical",
    difficulty: "easy",
    tags: ["oop"],
  },
  {
    id: "q23",
    question: "What is the difference between authentication and authorization?",
    answer:
      "Authentication verifies who a user is (login). Authorization determines what an authenticated user is allowed to do (permissions/roles).",
    category: "technical",
    difficulty: "easy",
    tags: ["security"],
  },
  {
    id: "q24",
    question: "What is a hash map and how does it achieve O(1) lookup?",
    answer:
      "A hash map stores key-value pairs using a hash function to compute an index (bucket) for each key. On average, lookup, insert, and delete are O(1), though collisions can degrade this to O(n) in the worst case without good hashing/resizing.",
    category: "coding",
    difficulty: "medium",
    tags: ["data-structures"],
  },
  {
    id: "q25",
    question: "Design a URL shortening service like bit.ly.",
    answer:
      "Generate a short, unique key (base62 encoding of an auto-incrementing ID, or a hash with collision handling), store the key-to-URL mapping in a fast key-value store, add caching for popular redirects, and consider analytics and expiration.",
    category: "system-design",
    difficulty: "hard",
    tags: ["system-design"],
    relatedIds: ["q5"],
  },
  {
    id: "q26",
    question: "How would you design Instagram's news feed?",
    answer:
      "Use a hybrid fan-out approach: push new posts to active followers' feeds (fan-out on write) for most users, but fan-out on read for celebrities with huge follower counts to avoid write amplification. Cache feeds and paginate.",
    category: "system-design",
    difficulty: "hard",
    tags: ["system-design", "scalability"],
  },
  {
    id: "q27",
    question: "Tell me about a time you led a team through change.",
    answer:
      "Describe the change, how you communicated the 'why' clearly and repeatedly, how you addressed resistance or concerns, and a measurable outcome showing the change stuck.",
    category: "leadership",
    difficulty: "medium",
    tags: ["change-management"],
  },
  {
    id: "q28",
    question: "How do you give constructive feedback to a peer?",
    answer:
      "Be specific and timely, focus on behavior/impact rather than character, use a framework like SBI (Situation-Behavior-Impact), and invite dialogue rather than delivering a verdict.",
    category: "leadership",
    difficulty: "easy",
    tags: ["feedback"],
  },
  {
    id: "q29",
    question: "You disagree with your manager's decision. What do you do?",
    answer:
      "Voice the disagreement privately and respectfully with data/reasoning, seek to understand their context, and once a decision is made, commit fully to executing it (disagree and commit) unless it's a matter of ethics or safety.",
    category: "scenario",
    difficulty: "medium",
    tags: ["communication"],
  },
  {
    id: "q30",
    question: "How do you approach learning a new technology under a deadline?",
    answer:
      "Scope the minimum needed to unblock the task, use official docs and a small proof-of-concept before committing to an approach, and timebox exploration to avoid rabbit holes.",
    category: "scenario",
    difficulty: "easy",
    tags: ["learning"],
  },
  {
    id: "q31",
    question: "What is EBITDA and why is it used?",
    answer:
      "Earnings Before Interest, Taxes, Depreciation, and Amortization approximates operating cash profitability, stripping out financing and accounting decisions — useful for comparing companies with different capital structures.",
    category: "finance",
    difficulty: "medium",
    tags: ["metrics"],
  },
  {
    id: "q32",
    question: "What is a leveraged buyout (LBO)?",
    answer:
      "An acquisition financed largely with debt, using the target company's own cash flows to pay down that debt over time, with the goal of an equity return through operational improvement and eventual exit.",
    category: "finance",
    difficulty: "hard",
    tags: ["private-equity"],
  },
  {
    id: "q33",
    question: "How do you calculate customer lifetime value (LTV)?",
    answer:
      "A simple formula: average purchase value × purchase frequency × average customer lifespan. More advanced models incorporate churn rate and margin, not just revenue.",
    category: "marketing",
    difficulty: "medium",
    tags: ["metrics", "ltv"],
  },
  {
    id: "q34",
    question: "What's the difference between a stack overflow and a memory leak?",
    answer:
      "A stack overflow happens when the call stack exceeds its limit (often from unbounded recursion). A memory leak happens when allocated memory is never released even though it's no longer needed, gradually exhausting available memory.",
    category: "technical",
    difficulty: "medium",
    tags: ["memory", "debugging"],
  },
  {
    id: "q35",
    question: "Given an array, find two numbers that add up to a target sum.",
    answer:
      "Use a hash set: iterate the array once, for each number check if (target - number) is already in the set; if so, you found the pair. This runs in O(n) time and O(n) space, versus O(n^2) for the brute-force nested loop.",
    category: "coding",
    difficulty: "easy",
    tags: ["arrays", "hash-map"],
  },
  {
    id: "q36",
    question: "What questions should you ask at the end of an interview?",
    answer:
      "Ask about team structure, what success looks like in the first 90 days, current challenges the team is facing, and growth/learning opportunities — avoid asking things easily found on the website.",
    category: "hr",
    difficulty: "easy",
    tags: ["interview-tips"],
  },
];
