"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { IndustryFilter } from "@/features/interview-prep/components/industry-filter";
import { IndustryGuide } from "@/features/interview-prep/components/industry-guide";
import { MockInterviewRunner } from "@/features/interview-prep/components/mock-interview-runner";
import { StarTrainer } from "@/features/interview-prep/components/star-trainer";
import { getIndustry } from "@/features/interview-prep/data/industries";
import { useInterviewPrepStore } from "@/features/interview-prep/store";

export default function InterviewPrepPage() {
  const selectedIndustry = useInterviewPrepStore((s) => s.selectedIndustry);
  const industry = getIndustry(selectedIndustry);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold tracking-tight">Interview Prep</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Industry guides, mock interviews, and the STAR method trainer.
      </p>

      <div className="mt-6">
        <IndustryFilter />
      </div>

      {industry && (
        <Tabs defaultValue="guide" className="mt-6">
          <TabsList>
            <TabsTrigger value="guide">Guide</TabsTrigger>
            <TabsTrigger value="mock">Mock Interview</TabsTrigger>
            <TabsTrigger value="star">STAR Trainer</TabsTrigger>
          </TabsList>
          <TabsContent value="guide">
            <IndustryGuide industry={industry} />
          </TabsContent>
          <TabsContent value="mock">
            <MockInterviewRunner />
          </TabsContent>
          <TabsContent value="star">
            <StarTrainer />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
