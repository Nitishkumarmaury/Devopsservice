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
        "group relative min-w-0 overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[var(--shadow-medium)] [overflow-wrap:anywhere] sm:p-7",
        featured && "lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 lg:p-8",
      )}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="min-w-0">
        <p className="font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-[var(--rose-dark)]">
          {study.category}
        </p>
        <h3 className={cn("mt-4 font-semibold leading-tight tracking-normal text-[var(--text-primary)]", featured ? "text-3xl sm:text-4xl" : "text-2xl")}>
          {study.problem}
        </h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.technologies.map((tag) => (
            <TechnologyTag key={tag}>{tag}</TechnologyTag>
          ))}
        </div>
      </div>

      <div className="mt-6 grid min-w-0 gap-4 text-sm leading-6 text-[var(--text-secondary)] lg:mt-0">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-4">
          <p className="font-semibold text-[var(--text-primary)]">Approach</p>
          <p className="mt-2">{study.approach}</p>
        </div>
        <div className="rounded-2xl border border-cyan-200/70 bg-cyan-50 p-4">
          <p className="font-semibold text-[var(--text-primary)]">Result</p>
          <p className="mt-2 text-[var(--text-secondary)]">{result}</p>
        </div>
        <ButtonLink href={`/case-studies/${study.slug}`} variant="ghost" className="w-fit px-0">
          Read case study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </article>
  );
}
