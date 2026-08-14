import { Globe, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { ResumeData, ResumeSectionId } from "@/core/types/resume";
import { getTemplate } from "@/features/resume-builder/lib/templates-config";
import { SectionHeading } from "./section-heading";

function ContactRow({ data }: { data: ResumeData["contact"] }) {
  const items = [
    data.email && { icon: Mail, text: data.email },
    data.phone && { icon: Phone, text: data.phone },
    data.location && { icon: MapPin, text: data.location },
    data.linkedin && { icon: Linkedin, text: data.linkedin },
    data.github && { icon: Github, text: data.github },
    data.portfolio && { icon: Globe, text: data.portfolio },
  ].filter(Boolean) as { icon: typeof Mail; text: string }[];

  if (!items.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-neutral-600">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          <item.icon className="h-3 w-3" />
          {item.text}
        </span>
      ))}
    </div>
  );
}

export function ResumeDocument({ data }: { data: ResumeData }) {
  const template = getTemplate(data.templateId);
  const centered = template.align === "center";

  const sectionRenderers: Partial<Record<ResumeSectionId, () => React.ReactNode>> = {
    summary: () =>
      data.summary && (
        <section key="summary" className="mb-4">
          <SectionHeading title="Summary" template={template} />
          <p className="text-sm leading-relaxed text-neutral-800">{data.summary}</p>
        </section>
      ),
    experience: () =>
      data.experience.length > 0 && (
        <section key="experience" className="mb-4">
          <SectionHeading title="Experience" template={template} />
          <div className="flex flex-col gap-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="text-sm font-semibold text-neutral-900">
                    {exp.role || "Role"} · {exp.company || "Company"}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                {exp.location && <p className="text-xs text-neutral-500">{exp.location}</p>}
                <ul className="mt-1 list-disc pl-4 text-sm text-neutral-800">
                  {exp.achievements.filter(Boolean).map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ),
    projects: () =>
      data.projects.length > 0 && (
        <section key="projects" className="mb-4">
          <SectionHeading title="Projects" template={template} />
          <div className="flex flex-col gap-3">
            {data.projects.map((p) => (
              <div key={p.id}>
                <p className="text-sm font-semibold text-neutral-900">
                  {p.name || "Project"}
                  {p.techStack && <span className="font-normal text-neutral-500"> — {p.techStack}</span>}
                </p>
                <p className="text-sm text-neutral-800">{p.description}</p>
                <p className="text-xs text-neutral-500">
                  {[p.github, p.liveDemo].filter(Boolean).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
    education: () =>
      data.education.length > 0 && (
        <section key="education" className="mb-4">
          <SectionHeading title="Education" template={template} />
          <div className="flex flex-col gap-2">
            {data.education.map((e) => (
              <div key={e.id} className="flex flex-wrap items-baseline justify-between gap-x-2">
                <p className="text-sm font-semibold text-neutral-900">
                  {e.degree ? `${e.degree}${e.field ? `, ${e.field}` : ""}` : "Degree"} · {e.school || "School"}
                </p>
                <p className="text-xs text-neutral-500">
                  {e.startDate} — {e.endDate} {e.gpa ? `· GPA ${e.gpa}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
    skills: () => {
      const groups = [
        ["Technical", data.skills.technical],
        ["Tools", data.skills.tools],
        ["Languages", data.skills.languages],
        ["Soft Skills", data.skills.soft],
      ].filter(([, items]) => (items as string[]).length > 0);
      if (!groups.length) return null;
      return (
        <section key="skills" className="mb-4">
          <SectionHeading title="Skills" template={template} />
          <div className="flex flex-col gap-1">
            {groups.map(([label, items]) => (
              <p key={label as string} className="text-sm text-neutral-800">
                <span className="font-semibold text-neutral-900">{label}: </span>
                {(items as string[]).join(", ")}
              </p>
            ))}
          </div>
        </section>
      );
    },
    certifications: () =>
      data.certifications.length > 0 && (
        <section key="certifications" className="mb-4">
          <SectionHeading title="Certifications" template={template} />
          <ul className="list-disc pl-4 text-sm text-neutral-800">
            {data.certifications.map((c) => (
              <li key={c.id}>
                {[c.name, c.issuer].filter(Boolean).join(" — ")} {c.date && `(${c.date})`}
              </li>
            ))}
          </ul>
        </section>
      ),
    achievements: () =>
      data.achievements.filter(Boolean).length > 0 && (
        <section key="achievements" className="mb-4">
          <SectionHeading title="Achievements" template={template} />
          <ul className="list-disc pl-4 text-sm text-neutral-800">
            {data.achievements.filter(Boolean).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      ),
    interests: () =>
      data.interests.filter(Boolean).length > 0 && (
        <section key="interests" className="mb-4">
          <SectionHeading title="Interests" template={template} />
          <p className="text-sm text-neutral-800">{data.interests.filter(Boolean).join(", ")}</p>
        </section>
      ),
  };

  return (
    <div className={`${template.bodyFont} bg-white px-10 py-10 text-neutral-900`} style={{ minHeight: "11in" }}>
      <div className={centered ? "text-center" : "text-left"}>
        <h1 className={`${template.headingFont} text-2xl`} style={{ color: template.accent }}>
          {data.contact.fullName || "Your Name"}
        </h1>
        <div className="mt-2">
          <ContactRow data={data.contact} />
        </div>
      </div>
      <div className="mt-6">
        {data.sectionOrder.map((id) => sectionRenderers[id]?.())}
      </div>
    </div>
  );
}
