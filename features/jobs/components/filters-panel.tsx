"use client";

import { Search } from "lucide-react";
import { Input, Label } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { JobFilters } from "@/core/types/job";

export function FiltersPanel({
  filters,
  onChange,
}: {
  filters: JobFilters;
  onChange: (patch: Partial<JobFilters>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label>Keyword</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Job title, company..."
            value={filters.keyword}
            onChange={(e) => onChange({ keyword: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label>Location</Label>
        <Input
          placeholder="City, country..."
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </div>

      <div>
        <Label>Work mode</Label>
        <Select value={filters.workMode} onValueChange={(v) => onChange({ workMode: v as JobFilters["workMode"] })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="onsite">Onsite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={filters.visaSponsorship}
            onChange={(e) => onChange({ visaSponsorship: e.target.checked })}
          />
          Visa sponsorship
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={filters.freshGraduate}
            onChange={(e) => onChange({ freshGraduate: e.target.checked })}
          />
          Fresh graduate friendly
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={filters.internship}
            onChange={(e) => onChange({ internship: e.target.checked })}
          />
          Internship
        </label>
      </div>
    </div>
  );
}
