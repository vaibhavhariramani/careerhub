"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { WIZARD_STEPS, useResumeBuilderStore } from "@/features/resume-builder/store";
import { StepperNav } from "./stepper-nav";
import { StepPersonal } from "./step-personal";
import { StepSummary } from "./step-summary";
import { StepEducation } from "./step-education";
import { StepExperience } from "./step-experience";
import { StepProjects } from "./step-projects";
import { StepSkills } from "./step-skills";
import { StepCertifications } from "./step-certifications";
import { StepAchievements } from "./step-achievements";
import { StepInterests } from "./step-interests";

const STEP_COMPONENTS: Record<(typeof WIZARD_STEPS)[number], React.ComponentType> = {
  personal: StepPersonal,
  summary: StepSummary,
  education: StepEducation,
  experience: StepExperience,
  projects: StepProjects,
  skills: StepSkills,
  certifications: StepCertifications,
  achievements: StepAchievements,
  interests: StepInterests,
};

const STEP_TITLES: Record<(typeof WIZARD_STEPS)[number], string> = {
  personal: "Personal Information",
  summary: "Career Summary",
  education: "Education",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  certifications: "Certifications",
  achievements: "Achievements",
  interests: "Interests",
};

export function WizardShell() {
  const step = useResumeBuilderStore((s) => s.step);
  const nextStep = useResumeBuilderStore((s) => s.nextStep);
  const prevStep = useResumeBuilderStore((s) => s.prevStep);
  const stepKey = WIZARD_STEPS[step]!;
  const StepComponent = STEP_COMPONENTS[stepKey];

  return (
    <Card>
      <CardHeader className="gap-3">
        <StepperNav />
        <CardTitle>{STEP_TITLES[stepKey]}</CardTitle>
      </CardHeader>
      <CardContent>
        <StepComponent />
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <Button variant="ghost" onClick={prevStep} disabled={step === 0}>
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <span className="text-xs text-muted-foreground">
            Step {step + 1} of {WIZARD_STEPS.length}
          </span>
          <Button variant="outline" onClick={nextStep} disabled={step === WIZARD_STEPS.length - 1}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
