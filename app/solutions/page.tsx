import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { solutionGroups, solutionPages } from "@/data/solutions";
import { createPageMetadata } from "@/lib/route-metadata";

const solutionSlugByGroup = Object.fromEntries(
  solutionPages.map((p) => [p.name.toLowerCase(), p.slug]),
);

export const metadata: Metadata = createPageMetadata({
  title: "DevOps and Cloud Solutions",
  description:
    "Solution paths for startups, SaaS companies, software agencies, existing production systems, incident recovery, and teams without internal DevOps support.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]}
      />
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

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <StaggerReveal className="grid gap-5 lg:grid-cols-2">
            {solutionGroups.map((solution) => (
              <article key={solution.name} className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
                <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{solution.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{solution.summary}</p>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Needs</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {solution.needs.map((need) => (
                        <li key={need} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Recommended services</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {solution.services.map((service) => (
                        <TechnologyTag key={service}>{service}</TechnologyTag>
                      ))}
                    </div>
                  </div>
                </div>
                {solutionSlugByGroup[solution.name.toLowerCase()] ? (
                  <ButtonLink href={`/solutions/${solutionSlugByGroup[solution.name.toLowerCase()]}`} variant="ghost" className="mt-5 w-fit px-0 justify-start">
                    Learn more
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                ) : null}
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <ContactCta title="Find the service mix that fits your current stage." />
    </SiteFrame>
  );
}
