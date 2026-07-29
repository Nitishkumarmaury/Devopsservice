import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { TechnologyTag } from "@/components/ui/technology-tag";
import type { caseStudies } from "@/data/case-studies";
import { cn } from "@/lib/utils";

type CaseStudy = (typeof caseStudies)[number];

export function CaseStudyCard({ study, featured = false }: Readonly<{ study: CaseStudy; featured?: boolean }>) {
  const result = study.outcome || "Verified project result to be added.";

  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col border border-border bg-canvas-surface p-5 transition hover:bg-canvas [overflow-wrap:anywhere] sm:p-7",
        featured && "lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 lg:p-8",
      )}
    >
      <div className="min-w-0">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
          {study.category}
        </p>
        <h3 className={cn("mt-4 font-mono font-bold leading-tight tracking-tight text-ink", featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl")}>
          {study.problem}
        </h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.technologies.map((tag) => (
            <TechnologyTag key={tag}>{tag}</TechnologyTag>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col min-w-0 flex-1 gap-px border border-border bg-border lg:mt-0">
        <div className="bg-canvas-soft p-4 flex-1">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink">Approach</p>
          <p className="mt-2 text-sm leading-6 text-ink-secondary">{study.approach}</p>
        </div>
        <div className="bg-canvas p-4 flex-1">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">Result</p>
          <p className="mt-2 text-sm leading-6 text-ink-secondary">{result}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <ButtonLink href={`/case-studies/${study.slug}`} variant="ghost" className="w-fit px-0">
          Read case study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </article>
  );
}
