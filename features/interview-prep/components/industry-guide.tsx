import { AlertCircle, DollarSign, HelpCircle, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { IndustryContent } from "@/core/types/question";

export function IndustryGuide({ industry }: { industry: IndustryContent }) {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>{industry.label} Interview Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{industry.guide}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-accent" /> Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {industry.faqs.map((f, i) => (
            <div key={i}>
              <p className="text-sm font-semibold">{f.question}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-accent" /> Case Studies
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {industry.caseStudies.map((c, i) => (
            <div key={i}>
              <p className="text-sm font-semibold">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.prompt}</p>
              <p className="mt-1 text-sm text-foreground"><span className="font-medium">Approach: </span>{c.approach}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-accent" /> Salary Negotiation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
              {industry.salaryNegotiation.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-danger" /> Common Mistakes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
              {industry.commonMistakes.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
