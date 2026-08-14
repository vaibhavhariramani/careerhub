import type { TemplateConfig } from "@/features/resume-builder/lib/templates-config";

export function SectionHeading({ title, template }: { title: string; template: TemplateConfig }) {
  const base = `${template.headingFont} text-sm tracking-wide mb-2`;

  if (template.headingStyle === "uppercase-bar") {
    return (
      <h2 className={`${base} flex items-center gap-2 uppercase`} style={{ color: template.accent }}>
        <span className="inline-block h-3 w-1 rounded-sm" style={{ background: template.accent }} />
        {title}
      </h2>
    );
  }

  if (template.headingStyle === "pill") {
    return (
      <h2 className={`${base} inline-block rounded-full px-3 py-1 text-white`} style={{ background: template.accent }}>
        {title}
      </h2>
    );
  }

  if (template.headingStyle === "underline") {
    return (
      <h2
        className={`${base} border-b pb-1 uppercase`}
        style={{ borderColor: template.accent, color: template.accent }}
      >
        {title}
      </h2>
    );
  }

  return (
    <h2 className={base} style={{ color: template.accent }}>
      {title}
    </h2>
  );
}
