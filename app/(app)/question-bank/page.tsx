"use client";

import { useMemo, useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { SearchBar } from "@/features/question-bank/components/search-bar";
import { CategoryFilter } from "@/features/question-bank/components/category-filter";
import { QuestionCard } from "@/features/question-bank/components/question-card";
import { QUESTIONS } from "@/features/question-bank/data/questions";
import { useQuestionBankStore } from "@/features/question-bank/store";
import type { QuestionCategory } from "@/core/types/question";
import { cn } from "@/shared/lib/cn";

export default function QuestionBankPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<QuestionCategory | "all">("all");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const bookmarks = useQuestionBankStore((s) => s.bookmarks);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return QUESTIONS.filter((question) => {
      if (category !== "all" && question.category !== category) return false;
      if (bookmarkedOnly && !bookmarks.includes(question.id)) return false;
      if (!q) return true;
      return (
        question.question.toLowerCase().includes(q) ||
        question.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [search, category, bookmarkedOnly, bookmarks]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Question Bank</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {QUESTIONS.length} questions across technical, behavioral, and more.
          </p>
        </div>
        <Button
          variant={bookmarkedOnly ? "primary" : "outline"}
          onClick={() => setBookmarkedOnly((b) => !b)}
        >
          <Bookmark className={cn("h-4 w-4", bookmarkedOnly && "fill-current")} />
          Bookmarked ({bookmarks.length})
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">No questions match your filters.</p>
        )}
        {filtered.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
}
