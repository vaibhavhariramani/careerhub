"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { DifficultyBadge } from "./difficulty-badge";
import { getIndustry } from "@/features/interview-prep/data/industries";
import { useInterviewPrepStore } from "@/features/interview-prep/store";
import { useProfileStore } from "@/features/profile/store";
import { ruleBasedInterviewCoachProvider } from "@/core/ai/providers";

type Category = "behavioral" | "technical" | "hr";

export function MockInterviewRunner() {
  const selectedIndustry = useInterviewPrepStore((s) => s.selectedIndustry);
  const markCompleted = useInterviewPrepStore((s) => s.markCompleted);
  const { logActivity, unlockAchievement } = useProfileStore();
  const industry = getIndustry(selectedIndustry);

  const [category, setCategory] = useState<Category>("behavioral");
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState<{ feedback: string; score: number } | null>(null);

  const questions = industry?.[category] ?? [];
  const current = questions[index % Math.max(questions.length, 1)];

  const next = () => {
    setIndex((i) => i + 1);
    setAnswer("");
    setRevealed(false);
    setFeedback(null);
  };

  const check = async () => {
    if (!current) return;
    const result = await ruleBasedInterviewCoachProvider.evaluateAnswer({ question: current.question, answer });
    setFeedback(result);
    setRevealed(true);
    markCompleted(current.id);
    logActivity({ type: "interview", message: `Practiced a ${category} question in ${industry?.label}` });
    unlockAchievement("mock-interview");
  };

  const industryOptions = useMemo(
    () => [
      { value: "behavioral" as const, label: "Behavioral" },
      { value: "technical" as const, label: "Technical" },
      { value: "hr" as const, label: "HR" },
    ],
    [],
  );

  if (!industry || !current) return null;

  return (
    <Card>
      <CardHeader className="gap-3">
        <CardTitle>Mock Interview — {industry.label}</CardTitle>
        <Tabs value={category} onValueChange={(v) => { setCategory(v as Category); setIndex(0); setAnswer(""); setRevealed(false); setFeedback(null); }}>
          <TabsList>
            {industryOptions.map((o) => (
              <TabsTrigger key={o.value} value={o.value}>
                {o.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-medium">{current.question}</p>
          <DifficultyBadge difficulty={current.difficulty} />
        </div>

        <Textarea
          rows={5}
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={check} disabled={!answer.trim()}>
            <Sparkles className="h-4 w-4" /> Get feedback & reveal sample
          </Button>
          <Button variant="ghost" onClick={() => setRevealed(true)}>
            <Eye className="h-4 w-4" /> Reveal sample answer
          </Button>
          <Button variant="outline" onClick={next}>
            Next question <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {feedback && (
          <div className="rounded-md border border-accent/30 bg-accent-soft p-4 text-sm">
            <p className="font-semibold text-accent">Feedback (score: {feedback.score}/100)</p>
            <p className="mt-1 text-foreground">{feedback.feedback}</p>
          </div>
        )}

        {revealed && (
          <div className="rounded-md border border-border bg-muted/40 p-4 text-sm">
            <p className="mb-1 font-semibold">Sample answer</p>
            <p className="text-muted-foreground">{current.sampleAnswer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
