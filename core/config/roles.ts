export const ROLES = [
  { id: "flutter-developer", label: "Flutter Developer" },
  { id: "react-developer", label: "React Developer" },
  { id: "backend-engineer", label: "Backend Engineer" },
  { id: "devops-engineer", label: "DevOps Engineer" },
  { id: "cloud-engineer", label: "Cloud Engineer" },
  { id: "business-analyst", label: "Business Analyst" },
  { id: "data-analyst", label: "Data Analyst" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "finance", label: "Finance" },
  { id: "accountant", label: "Accountant" },
  { id: "mechanical-engineer", label: "Mechanical Engineer" },
  { id: "civil-engineer", label: "Civil Engineer" },
  { id: "nurse", label: "Nurse" },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];
