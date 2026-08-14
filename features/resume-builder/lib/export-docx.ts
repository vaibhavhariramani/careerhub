import type { ResumeData, ResumeSectionId } from "@/core/types/resume";

export async function exportResumeToDocx(data: ResumeData) {
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
  } = await import("docx");

  const heading = (text: string) =>
    new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } });

  const bullet = (text: string) =>
    new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 60 } });

  const paragraph = (text: string) => new Paragraph({ text, spacing: { after: 100 } });

  const children: InstanceType<typeof Paragraph>[] = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: data.contact.fullName || "Your Name", bold: true, size: 32 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: [data.contact.email, data.contact.phone, data.contact.location]
            .filter(Boolean)
            .join("  |  "),
          size: 20,
        }),
      ],
      spacing: { after: 200 },
    }),
  );

  const sectionBuilders: Partial<Record<ResumeSectionId, () => void>> = {
    summary: () => {
      if (!data.summary) return;
      children.push(heading("Summary"), paragraph(data.summary));
    },
    experience: () => {
      if (!data.experience.length) return;
      children.push(heading("Experience"));
      data.experience.forEach((exp) => {
        children.push(
          paragraph(
            `${exp.role || "Role"} — ${exp.company || "Company"} (${exp.startDate} - ${exp.current ? "Present" : exp.endDate})`,
          ),
        );
        exp.achievements.filter(Boolean).forEach((a) => children.push(bullet(a)));
      });
    },
    projects: () => {
      if (!data.projects.length) return;
      children.push(heading("Projects"));
      data.projects.forEach((p) => {
        children.push(paragraph(`${p.name || "Project"} — ${p.techStack}`));
        if (p.description) children.push(bullet(p.description));
      });
    },
    education: () => {
      if (!data.education.length) return;
      children.push(heading("Education"));
      data.education.forEach((e) => {
        children.push(paragraph(`${e.degree} ${e.field ? `, ${e.field}` : ""} — ${e.school} (${e.startDate} - ${e.endDate})`));
      });
    },
    skills: () => {
      const groups: [string, string[]][] = [
        ["Technical", data.skills.technical],
        ["Tools", data.skills.tools],
        ["Languages", data.skills.languages],
        ["Soft Skills", data.skills.soft],
      ];
      const nonEmpty = groups.filter(([, items]) => items.length);
      if (!nonEmpty.length) return;
      children.push(heading("Skills"));
      nonEmpty.forEach(([label, items]) => children.push(paragraph(`${label}: ${items.join(", ")}`)));
    },
    certifications: () => {
      if (!data.certifications.length) return;
      children.push(heading("Certifications"));
      data.certifications.forEach((c) => {
        const label = [c.name, c.issuer].filter(Boolean).join(" — ");
        children.push(bullet(c.date ? `${label} (${c.date})` : label));
      });
    },
    achievements: () => {
      const items = data.achievements.filter(Boolean);
      if (!items.length) return;
      children.push(heading("Achievements"));
      items.forEach((a) => children.push(bullet(a)));
    },
    interests: () => {
      const items = data.interests.filter(Boolean);
      if (!items.length) return;
      children.push(heading("Interests"), paragraph(items.join(", ")));
    },
  };

  data.sectionOrder.forEach((id) => sectionBuilders[id]?.());

  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.contact.fullName || "resume"}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
