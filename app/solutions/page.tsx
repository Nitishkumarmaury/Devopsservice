import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { solutionGroups } from "@/data/solutions";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DevOps and Cloud Solutions",
  description:
    "Solution paths for startups, SaaS companies, software agencies, existing production systems, incident recovery, and teams without internal DevOps support.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Solutions"
        title="Infrastructure support for the stage your product is in."
        actions={
          <ButtonLink href="/services">
            Match services to your need
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        The right DevOps path depends on whether you are launching, scaling, supporting clients, or recovering
        production stability.
      </PageHero>

      <section className="border-b border-border bg-canvas-soft py-16 sm:py-24">
        <Container>
          <StaggerReveal className="grid items-stretch gap-5 lg:grid-cols-2">
            {solutionGroups.map((solution) => (
              <article key={solution.name} className="flex flex-col border border-border bg-canvas-surface p-6 h-full">
                <h2 className="font-mono text-2xl font-bold tracking-tight text-ink">{solution.name}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-secondary">{solution.summary}</p>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink">Needs</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink-secondary">
                      {solution.needs.map((need) => (
                        <li key={need} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink">Recommended services</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {solution.services.map((service) => (
                        <TechnologyTag key={service}>{service}</TechnologyTag>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>
    </SiteFrame>
  );
}
