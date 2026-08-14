import type { IndustryContent } from "@/core/types/question";

export const INDUSTRIES: IndustryContent[] = [
  {
    id: "software-engineering",
    label: "Software Engineering",
    guide:
      "Software engineering interviews typically combine technical screens (data structures, algorithms, system design) with behavioral rounds. Be ready to talk through your code out loud, discuss trade-offs, and connect past projects to measurable impact.",
    faqs: [
      { question: "How should I prepare for a coding interview?", answer: "Practice on a whiteboard or plain editor (no autocomplete), narrate your thought process, and cover the core data structures: arrays, hash maps, trees, and graphs." },
      { question: "What's the difference between a technical screen and onsite?", answer: "A technical screen is usually one 30-60 minute call testing baseline coding ability. Onsite/virtual-onsite loops add system design, behavioral, and deeper technical rounds." },
      { question: "Should I mention bugs I find in my own code?", answer: "Yes — proactively catching and fixing your own bugs signals strong engineering judgment to interviewers." },
    ],
    behavioral: [
      { id: "se-b1", question: "Tell me about a time you disagreed with a technical decision.", sampleAnswer: "I disagreed with a caching strategy that risked stale data. I raised the concern with data showing the risk, proposed a TTL-based alternative, and we agreed on a compromise that shipped on time.", difficulty: "medium" },
      { id: "se-b2", question: "Describe a project that failed. What did you learn?", sampleAnswer: "A migration missed its deadline because we underestimated data cleanup. I learned to timebox a spike before committing to estimates, and now always budget contingency for data-heavy migrations.", difficulty: "medium" },
      { id: "se-b3", question: "How do you handle tight deadlines?", sampleAnswer: "I scope ruthlessly, communicate trade-offs early to stakeholders, and separate must-haves from nice-to-haves rather than silently cutting corners on quality.", difficulty: "easy" },
    ],
    technical: [
      { id: "se-t1", question: "Explain the difference between a stack and a queue.", sampleAnswer: "A stack is LIFO (last in, first out) — used for undo history or call stacks. A queue is FIFO (first in, first out) — used for task scheduling or BFS traversal.", difficulty: "easy" },
      { id: "se-t2", question: "What is time complexity and why does it matter?", sampleAnswer: "Time complexity describes how an algorithm's runtime scales with input size. It matters because it predicts performance at scale — an O(n^2) solution can become unusable at large n even if it's fine for small inputs.", difficulty: "easy" },
      { id: "se-t3", question: "How would you design a URL shortener?", sampleAnswer: "Hash or base62-encode an auto-incrementing ID to generate short codes, store the mapping in a key-value store with an index on the short code, add caching for hot reads, and handle collisions with retries.", difficulty: "hard" },
    ],
    hr: [
      { id: "se-h1", question: "Why do you want to work here?", sampleAnswer: "I connect the company's mission and engineering challenges to my own experience and interests, citing a specific product or technical blog post that resonated with me.", difficulty: "easy" },
      { id: "se-h2", question: "Where do you see yourself in five years?", sampleAnswer: "Growing from individual contributor toward technical leadership — mentoring, owning larger systems, and deepening expertise in areas the role touches.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Scaling a slow API", prompt: "An endpoint that used to respond in 200ms now takes 4s under load. Walk through how you'd diagnose and fix it.", approach: "Start with metrics/logs to isolate the bottleneck (DB, network, CPU), check for N+1 queries or missing indexes, add caching where appropriate, and load-test the fix before shipping." },
    ],
    salaryNegotiation: [
      "Research market rate using leveling guides and sites like levels.fyi before the call.",
      "Let the recruiter share a number first when possible.",
      "Negotiate the whole package — base, equity, sign-on, and start date — not just base salary.",
      "Get competing offers in writing if you have them; leverage is real but stay respectful.",
    ],
    commonMistakes: [
      "Jumping straight to code without clarifying requirements.",
      "Going silent while thinking instead of narrating your approach.",
      "Ignoring edge cases and error handling.",
      "Being unable to explain trade-offs of your own past decisions.",
    ],
  },
  {
    id: "finance",
    label: "Finance",
    guide:
      "Finance interviews test technical fluency (accounting, valuation, modeling) alongside market awareness and judgment. Expect to be asked to walk through the three financial statements and defend your reasoning under pressure.",
    faqs: [
      { question: "Do I need to memorize formulas?", answer: "You should know core formulas (NPV, IRR, WACC) cold, but interviewers care more about your intuition for why they matter than rote recall." },
      { question: "How technical will the interview be?", answer: "It varies by role — investment banking and equity research skew highly technical; corporate finance and FP&A weigh business judgment more heavily." },
    ],
    behavioral: [
      { id: "fin-b1", question: "Tell me about a time you found an error in a financial model.", sampleAnswer: "I noticed a circular reference inflating projected revenue. I flagged it immediately, rebuilt the assumption with a sanity check, and added a validation step to prevent recurrence.", difficulty: "medium" },
      { id: "fin-b2", question: "Describe working under a tight reporting deadline.", sampleAnswer: "During month-end close I prioritized reconciling the largest variances first, communicated status proactively, and delivered accurate numbers on time by parallelizing tasks with a teammate.", difficulty: "medium" },
    ],
    technical: [
      { id: "fin-t1", question: "Walk me through the three financial statements.", sampleAnswer: "The income statement shows profitability over a period, the balance sheet shows assets/liabilities/equity at a point in time, and the cash flow statement reconciles net income to actual cash movement across operating, investing, and financing activities.", difficulty: "medium" },
      { id: "fin-t2", question: "How does depreciation affect the three statements?", sampleAnswer: "It's a non-cash expense on the income statement that reduces net income; it's added back on the cash flow statement; and it reduces PP&E on the balance sheet.", difficulty: "medium" },
      { id: "fin-t3", question: "What is WACC and why is it used?", sampleAnswer: "Weighted Average Cost of Capital blends the cost of equity and after-tax cost of debt, weighted by their share of capital structure. It's used as the discount rate in DCF valuation to reflect a company's overall risk.", difficulty: "hard" },
    ],
    hr: [
      { id: "fin-h1", question: "Why finance?", sampleAnswer: "I connect a specific experience — analyzing a company's filings, an internship, or a course — to genuine interest in how capital allocation decisions get made.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Should the company build or buy?", prompt: "A company can build a capability internally for $2M over 18 months or acquire a competitor for $8M now. How do you decide?", approach: "Compare NPV of both paths, factor in time-to-market and execution risk, and weigh strategic fit and integration cost for the acquisition." },
    ],
    salaryNegotiation: [
      "Understand bonus structure and how it's historically been paid out, not just the target percentage.",
      "Clarify vesting schedules for any equity or deferred comp.",
      "Benchmark against role, city, and firm tier — finance comp varies widely by these factors.",
    ],
    commonMistakes: [
      "Not being able to explain how statements link together.",
      "Memorizing answers instead of showing reasoning.",
      "Being unaware of recent market or industry news relevant to the firm.",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    guide:
      "Marketing interviews look for a mix of creative thinking and data literacy. Be ready to discuss campaigns you've run or analyzed, how you measured success, and how you'd approach a new channel or audience.",
    faqs: [
      { question: "Should I bring a portfolio?", answer: "Yes — even for non-creative roles, a one-pager summarizing campaigns, metrics, and your specific contribution goes a long way." },
      { question: "How data-driven do I need to be?", answer: "Increasingly so. Be ready to talk CAC, LTV, conversion rate, and how you used data to make a decision, not just report on it." },
    ],
    behavioral: [
      { id: "mkt-b1", question: "Tell me about a campaign that underperformed.", sampleAnswer: "A paid social campaign had strong CTR but poor conversion. I dug into the landing page funnel, found a mismatch between ad promise and page content, fixed the messaging, and conversion improved 22%.", difficulty: "medium" },
      { id: "mkt-b2", question: "How do you prioritize between brand and performance marketing?", sampleAnswer: "I frame it around business stage and goals — early-stage or budget-constrained teams lean performance for measurable ROI, while brand investment compounds over time and matters more at scale.", difficulty: "medium" },
    ],
    technical: [
      { id: "mkt-t1", question: "What's the difference between CAC and LTV?", sampleAnswer: "CAC (Customer Acquisition Cost) is what you spend to acquire a customer; LTV (Lifetime Value) is the revenue you expect from them over their relationship with you. A healthy business keeps LTV meaningfully above CAC.", difficulty: "easy" },
      { id: "mkt-t2", question: "How would you set up an A/B test for a landing page?", sampleAnswer: "Define a single primary metric, randomize traffic evenly, ensure sample size is large enough for statistical significance, run for a full business cycle, and avoid peeking early to prevent false positives.", difficulty: "medium" },
    ],
    hr: [
      { id: "mkt-h1", question: "What marketing trend excites you right now?", sampleAnswer: "I pick a specific, current trend (e.g., short-form video, first-party data strategies post-cookie) and explain why it matters for the kind of company I'm interviewing with.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Launching in a new market", prompt: "You're asked to plan a go-to-market for a product entering a new country. What's your approach?", approach: "Research local competitors and channels, validate messaging with a small pilot, choose 1-2 channels to start rather than spreading thin, and define success metrics before launch." },
    ],
    salaryNegotiation: [
      "Ask how marketing performance bonuses are calculated and against what targets.",
      "Clarify budget ownership and team size — scope affects both comp and growth.",
    ],
    commonMistakes: [
      "Talking only about creative ideas without tying them to metrics.",
      "Not knowing the company's current marketing channels or recent campaigns.",
      "Vague answers about 'driving engagement' without specifics.",
    ],
  },
  {
    id: "hr",
    label: "Human Resources",
    guide:
      "HR interviews assess people judgment, discretion, and process knowledge — from recruiting and onboarding to conflict resolution and compliance. Concrete examples of handling sensitive situations well are highly valued.",
    faqs: [
      { question: "How do I show discretion without being vague?", answer: "Anonymize details (roles/companies instead of names) while still being specific about the situation, your actions, and the outcome." },
    ],
    behavioral: [
      { id: "hr-b1", question: "Tell me about a time you handled a workplace conflict.", sampleAnswer: "Two team members disagreed publicly in a meeting. I met with each privately first to understand root causes, then facilitated a joint conversation focused on shared goals, which resolved the tension within a week.", difficulty: "medium" },
      { id: "hr-b2", question: "Describe a difficult termination or performance conversation you supported.", sampleAnswer: "I coached a manager through a PIP conversation, ensuring documentation was clear and fair, and made sure the employee understood expectations and support available — the process was firm but respectful.", difficulty: "hard" },
    ],
    technical: [
      { id: "hr-t1", question: "How do you ensure a fair, unbiased hiring process?", sampleAnswer: "Structured interviews with consistent questions and a scorecard, diverse interview panels, and calibration discussions that focus on evidence rather than gut feel.", difficulty: "medium" },
    ],
    hr: [
      { id: "hr-h1", question: "Why HR?", sampleAnswer: "I connect a genuine interest in people and organizational effectiveness to a specific experience, like resolving a team issue or building a process that improved retention.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Declining engagement scores", prompt: "Engagement survey scores dropped 15 points in one department. What do you do?", approach: "Review qualitative comments and manager feedback, run small focus groups, identify root causes (workload, leadership, unclear goals), and propose targeted, measurable actions." },
    ],
    salaryNegotiation: [
      "As an HR candidate, model good negotiation etiquette — know your own numbers as well as you'd coach a candidate.",
    ],
    commonMistakes: [
      "Sharing identifiable details about real people or companies.",
      "Being unable to describe a structured process, only anecdotes.",
    ],
  },
  {
    id: "business-analyst",
    label: "Business Analyst",
    guide:
      "Business analyst interviews test your ability to gather requirements, structure ambiguous problems, and communicate insights to both technical and non-technical stakeholders.",
    faqs: [
      { question: "Do I need SQL for BA roles?", answer: "Increasingly yes — basic to intermediate SQL is expected at most companies for a BA to self-serve data rather than always relying on a data team." },
    ],
    behavioral: [
      { id: "ba-b1", question: "Tell me about a time requirements changed mid-project.", sampleAnswer: "Stakeholders realized a key report needed a new dimension halfway through build. I reassessed scope impact, communicated the trade-off on timeline, and got sign-off before proceeding rather than silently absorbing the change.", difficulty: "medium" },
      { id: "ba-b2", question: "How do you handle conflicting stakeholder priorities?", sampleAnswer: "I bring stakeholders together to align on the underlying business goal, use data to make trade-offs objective, and escalate for a decision when consensus isn't possible.", difficulty: "medium" },
    ],
    technical: [
      { id: "ba-t1", question: "What's the difference between a business requirement and a functional requirement?", sampleAnswer: "A business requirement describes the 'why' — the business need or goal. A functional requirement describes the 'what' — specific system behavior needed to meet that goal.", difficulty: "easy" },
      { id: "ba-t2", question: "How would you prioritize a backlog with limited engineering capacity?", sampleAnswer: "Use a framework like RICE or a value-vs-effort matrix, involve stakeholders in scoring, and revisit priorities regularly as new information comes in.", difficulty: "medium" },
    ],
    hr: [
      { id: "ba-h1", question: "What makes a good business analyst?", sampleAnswer: "Curiosity to ask 'why', comfort with ambiguity, and the ability to translate between business and technical language clearly.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Declining conversion funnel", prompt: "A checkout funnel's conversion rate dropped 10% after a redesign. How do you investigate?", approach: "Segment the funnel by step to isolate where drop-off increased, compare cohorts before/after launch, check for technical issues (load time, broken elements), and validate with qualitative user feedback." },
    ],
    salaryNegotiation: [
      "Clarify whether the role leans more analytical/technical or more stakeholder-facing — comp bands often differ.",
    ],
    commonMistakes: [
      "Jumping to solutions before fully understanding the business problem.",
      "Using jargon that loses non-technical stakeholders.",
    ],
  },
  {
    id: "civil",
    label: "Civil Engineering",
    guide:
      "Civil engineering interviews combine technical fundamentals (structural, geotechnical, materials) with project management and code-compliance knowledge. Site experience and safety awareness matter a lot.",
    faqs: [
      { question: "Do I need my PE license for entry-level roles?", answer: "Usually not — most entry-level roles expect you're working toward it (EIT/FE passed), with PE required for signing off on stamped drawings later in your career." },
    ],
    behavioral: [
      { id: "civ-b1", question: "Tell me about a time you found a design error before construction.", sampleAnswer: "During a plan review I noticed a drainage calculation that didn't account for a nearby slope change. I flagged it, reran the analysis, and the design was corrected before it reached the field.", difficulty: "medium" },
    ],
    technical: [
      { id: "civ-t1", question: "What factors affect soil bearing capacity?", sampleAnswer: "Soil type and density, moisture content, foundation depth and width, and groundwater level all affect bearing capacity.", difficulty: "medium" },
      { id: "civ-t2", question: "What's the difference between dead load and live load?", sampleAnswer: "Dead load is the permanent weight of the structure itself; live load is variable, temporary load from occupants, furniture, vehicles, or environmental factors like snow.", difficulty: "easy" },
    ],
    hr: [
      { id: "civ-h1", question: "Why civil engineering?", sampleAnswer: "I connect a specific interest — infrastructure's visible, lasting impact on communities — to a project or experience that drew me into the field.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Budget overrun mid-project", prompt: "A project is 20% over budget at 60% completion. What do you do?", approach: "Audit cost drivers, separate scope creep from estimation error, present options (value engineering, phased delivery, budget increase) to stakeholders with trade-offs clearly laid out." },
    ],
    salaryNegotiation: [
      "PE licensure, specialty certifications, and years toward licensure materially affect offers — highlight progress toward these.",
    ],
    commonMistakes: [
      "Not mentioning safety considerations when discussing site work.",
      "Ignoring code/regulatory context in design answers.",
    ],
  },
  {
    id: "mechanical",
    label: "Mechanical Engineering",
    guide:
      "Mechanical engineering interviews test fundamentals (thermodynamics, materials, mechanics) alongside your design and manufacturing process experience. Bring specific examples of parts or systems you've designed and tested.",
    faqs: [
      { question: "Should I bring a design portfolio?", answer: "Yes — CAD renders, FEA results, or prototype photos with a short write-up of your role and design decisions make a strong impression." },
    ],
    behavioral: [
      { id: "mech-b1", question: "Tell me about a prototype that failed testing.", sampleAnswer: "A bracket failed under fatigue testing sooner than predicted. I ran root-cause analysis, found a stress concentration at a sharp corner, redesigned with a fillet, and validated the fix with updated FEA and retesting.", difficulty: "medium" },
    ],
    technical: [
      { id: "mech-t1", question: "What is the difference between stress and strain?", sampleAnswer: "Stress is force per unit area within a material; strain is the resulting deformation relative to original dimensions. Their relationship (up to the elastic limit) defines the material's stiffness, or Young's modulus.", difficulty: "easy" },
      { id: "mech-t2", question: "How would you reduce vibration in a rotating assembly?", sampleAnswer: "Balance the rotating components, check for resonance near operating speed, add damping, and verify bearing and mounting tolerances.", difficulty: "medium" },
    ],
    hr: [
      { id: "mech-h1", question: "Why mechanical engineering?", sampleAnswer: "I tie a hands-on interest — building or fixing physical things — to formal training and a specific project that solidified my direction.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Reduce manufacturing cost", prompt: "A part costs 30% more to manufacture than the target. How do you approach cost reduction?", approach: "Break down cost by material, process, and labor; evaluate design-for-manufacturability changes, alternative materials, or process changes; validate that changes don't compromise required tolerances or performance." },
    ],
    salaryNegotiation: [
      "Specialized skills (FEA, CFD, specific CAD tools, GD&T expertise) are worth quantifying and highlighting in negotiation.",
    ],
    commonMistakes: [
      "Describing designs without mentioning trade-offs or constraints considered.",
      "Not connecting theory (thermodynamics, statics) to a practical example.",
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    guide:
      "Healthcare interviews (clinical and non-clinical) emphasize patient safety, empathy, teamwork under pressure, and adherence to protocol. Concrete examples of handling high-stress or sensitive situations are key.",
    faqs: [
      { question: "How much clinical detail should I share about patients?", answer: "Keep patient details anonymized and high-level — focus on your actions, judgment, and the outcome rather than identifying specifics." },
    ],
    behavioral: [
      { id: "hc-b1", question: "Tell me about a time you caught a potential error before it affected a patient.", sampleAnswer: "I noticed a medication dosage that seemed inconsistent with the patient's chart. I paused, verified with the prescribing physician, and the dosage was corrected before administration.", difficulty: "medium" },
      { id: "hc-b2", question: "How do you handle a high-stress, fast-moving shift?", sampleAnswer: "I triage by urgency, communicate clearly and calmly with the team, and take brief moments to reset focus between critical tasks rather than letting stress compound.", difficulty: "medium" },
    ],
    technical: [
      { id: "hc-t1", question: "What's your process for verifying patient identity before treatment?", sampleAnswer: "Two-identifier verification (e.g., name and date of birth) checked against the chart or wristband, every time, regardless of familiarity with the patient.", difficulty: "easy" },
    ],
    hr: [
      { id: "hc-h1", question: "Why did you choose healthcare?", sampleAnswer: "I connect a personal or early professional experience with patient care to why the responsibility and impact of the work motivates me.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Handling a distressed family member", prompt: "A patient's family member is upset and raising their voice at the nurses' station. How do you respond?", approach: "Move the conversation to a private space, listen actively without being defensive, acknowledge their concern, and involve a supervisor or social worker if needed while keeping the care environment calm." },
    ],
    salaryNegotiation: [
      "Shift differentials, certifications (ACLS, BLS, specialty certs), and union contracts often affect pay more than base negotiation — understand these first.",
    ],
    commonMistakes: [
      "Sharing identifiable patient information.",
      "Downplaying the emotional/stress component of the work.",
    ],
  },
  {
    id: "sales",
    label: "Sales",
    guide:
      "Sales interviews often include a role-play or mock pitch. Interviewers look for structured discovery, objection handling, and a track record of hitting or exceeding quota, backed by specific numbers.",
    faqs: [
      { question: "Will I have to do a mock sales pitch?", answer: "Very likely for closing roles — prepare a structured pitch for a product you know well, including discovery questions and objection handling." },
    ],
    behavioral: [
      { id: "sales-b1", question: "Tell me about your biggest deal and how you closed it.", sampleAnswer: "I identified a champion early, mapped the buying committee, addressed the economic buyer's ROI concerns with a custom analysis, and closed a six-figure deal that had stalled for two quarters before I took it over.", difficulty: "medium" },
      { id: "sales-b2", question: "Tell me about a deal you lost. What did you learn?", sampleAnswer: "I lost a deal to a competitor because I hadn't identified a second decision-maker who preferred them. I now map the full buying committee early in every deal.", difficulty: "medium" },
    ],
    technical: [
      { id: "sales-t1", question: "Walk me through your sales process from prospecting to close.", sampleAnswer: "Prospecting and qualification (BANT/MEDDIC), discovery to understand pain points, tailored demo/pitch, handling objections, negotiation, and close — with clear next steps at every stage.", difficulty: "medium" },
    ],
    hr: [
      { id: "sales-h1", question: "What motivates you in sales?", sampleAnswer: "I connect intrinsic motivation — solving a customer's real problem, competition, or hitting measurable goals — to specific examples from past roles.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Handling a stalled deal", prompt: "A deal has gone quiet for three weeks after a great demo. What do you do?", approach: "Re-engage with a value-focused (not just check-in) message, confirm you're speaking with all stakeholders, uncover any new objections or internal blockers, and propose a concrete next step." },
    ],
    salaryNegotiation: [
      "Understand OTE (on-target earnings) split between base and commission, quota size, and ramp period before comparing offers.",
    ],
    commonMistakes: [
      "Pitching features instead of tying to customer pain points.",
      "Not asking discovery questions before jumping into a pitch.",
      "No specific numbers (quota attainment, deal size) to back up claims.",
    ],
  },
  {
    id: "customer-service",
    label: "Customer Service",
    guide:
      "Customer service interviews focus on empathy, patience, and problem-solving under pressure — especially de-escalating frustrated customers while still following policy.",
    faqs: [
      { question: "Will there be a role-play?", answer: "Often yes — be ready to handle a mock frustrated-customer scenario, staying calm and solution-focused." },
    ],
    behavioral: [
      { id: "cs-b1", question: "Tell me about a time you dealt with an angry customer.", sampleAnswer: "A customer was upset about a delayed refund. I listened fully without interrupting, acknowledged the frustration, explained what I could do immediately, and followed up personally once the refund processed — they later left positive feedback.", difficulty: "easy" },
      { id: "cs-b2", question: "Describe a time you couldn't solve a customer's problem.", sampleAnswer: "A request was outside policy. I explained clearly why, offered the closest alternative I could authorize, and escalated to a supervisor who could make an exception given the circumstances.", difficulty: "medium" },
    ],
    technical: [
      { id: "cs-t1", question: "How do you prioritize multiple customer requests at once?", sampleAnswer: "I triage by urgency and impact (e.g., service outage before a general question), set clear expectations on response time, and use templates/macros for common issues to move faster without sounding robotic.", difficulty: "easy" },
    ],
    hr: [
      { id: "cs-h1", question: "Why customer service?", sampleAnswer: "I connect genuine satisfaction from helping people solve problems to a specific past experience that showed me the impact of good service.", difficulty: "easy" },
    ],
    caseStudies: [
      { title: "Handling a social media complaint", prompt: "A customer posts a public complaint that's gaining attention. How do you respond?", approach: "Respond promptly and publicly to acknowledge the issue, move detailed resolution to a private channel, and follow up publicly once resolved to show accountability." },
    ],
    salaryNegotiation: [
      "Shift timing, language skills, and specialization (technical support vs. general) often affect pay more than tenure alone.",
    ],
    commonMistakes: [
      "Getting defensive in a role-play instead of staying solution-focused.",
      "Not acknowledging the customer's emotion before jumping to a solution.",
    ],
  },
];

export function getIndustry(id: string) {
  return INDUSTRIES.find((i) => i.id === id);
}
