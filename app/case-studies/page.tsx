import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { caseStudies, caseStudyCategories } from "@/data/case-studies";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DevOps Case Studies",
  description:
    "Practical DevOps and cloud engineering case-study patterns covering production deployment, monitoring, performance investigation, CI/CD automation, migration, and recovery.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <SiteFrame>
      <PageHero eyebrow="Case studies" title="Production engineering patterns without inflated claims.">
        These examples describe engagement categories, constraints, engineering approach, validation, and client value
        without fabricated identities, revenue numbers, percentages, or quotes.
      </PageHero>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap gap-2">
            {caseStudyCategories.map((category) => (
              <TechnologyTag key={category}>{category}</TechnologyTag>
            ))}
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <article
                key={study.slug}
                className={index === 0 ? "rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6 shadow-[var(--shadow-soft)] lg:col-span-2 lg:p-8" : "rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6 shadow-[var(--shadow-soft)]"}
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
                  {study.category}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{study.problem}</h2>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{study.approach}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.technologies.map((tag) => (
                    <TechnologyTag key={tag}>{tag}</TechnologyTag>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-rose-100 bg-white p-4">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Client value</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{study.outcome}</p>
                </div>
                <ButtonLink href={`/case-studies/${study.slug}`} variant="ghost" className="mt-5 px-0">
                  Read case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta title="Discuss a similar production challenge." />
    </SiteFrame>
  );
}
