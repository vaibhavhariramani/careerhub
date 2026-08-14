"use client";

import { useState } from "react";
import { Bookmark, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { DifficultyBadge } from "@/features/interview-prep/components/difficulty-badge";
import { useQuestionBankStore } from "@/features/question-bank/store";
import type { Question } from "@/core/types/question";

export function QuestionCard({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  const bookmarked = useQuestionBankStore((s) => s.bookmarks.includes(question.id));
  const toggleBookmark = useQuestionBankStore((s) => s.toggleBookmark);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <button onClick={() => setOpen((o) => !o)} className="flex-1 text-left">
            <p className="text-sm font-semibold">{question.question}</p>
          </button>
          <div className="flex shrink-0 items-center gap-1.5">
            <DifficultyBadge difficulty={question.difficulty} />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Bookmark"
              onClick={() => toggleBookmark(question.id)}
            >
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-accent text-accent")} />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Expand" onClick={() => setOpen((o) => !o)}>
              <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
            </Button>
          </div>
        </div>

        {open && (
          <div className="mt-3 border-t border-border pt-3">
            <p className="text-sm text-foreground">{question.answer}</p>
            {question.explanation && (
              <p className="mt-2 text-xs text-muted-foreground">{question.explanation}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
