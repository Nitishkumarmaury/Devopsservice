import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { getServiceBySlug } from "@/data/services";
import { createPageMetadata } from "@/lib/route-metadata";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return createPageMetadata({
    title: study.category,
    description: study.problem,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const relatedService = getServiceBySlug(study.relatedServiceSlug);

  const sections = [
    ["Problem", study.problem],
    ["Environment", `Anonymized production environment using ${study.technologies.join(", ")}. Client names, domains, and private infrastructure details are intentionally omitted.`],
    ["Constraints", study.constraints.join(" ")],
    ["Approach", study.approach],
    ["Implementation", study.investigation.join(" ")],
    ["Validation", study.validation.join(" ")],
    ["Outcome", study.outcome],
    ["Technology Stack", study.technologies.join(", ")],
  ] as const;

  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.category, path: `/case-studies/${study.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Case study"
        title={study.category}
        actions={
          relatedService ? (
            <ButtonLink href={`/services/${relatedService.slug}`}>
              Related service
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          ) : null
        }
      >
        {study.problem}
      </PageHero>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <ScrollReveal as="aside" className="h-fit rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6 lg:sticky lg:top-24">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">Technologies</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.technologies.map((tag) => (
                  <TechnologyTag key={tag}>{tag}</TechnologyTag>
                ))}
              </div>
              {relatedService ? (
                <ButtonLink href={`/services/${relatedService.slug}`} variant="secondary" className="mt-6">
                  {relatedService.shortTitle}
                </ButtonLink>
              ) : null}
              <div className="mt-6 rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/42 p-4">
                <p className="font-mono text-xs font-semibold uppercase text-[#b9ddff]">Evidence note</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  This case study is anonymized. No customer names, private domains, IP addresses, credentials, or
                  unsupported metrics are shown.
                </p>
              </div>
            </ScrollReveal>
            <StaggerReveal className="grid gap-5">
              {sections.map(([title, text]) => (
                <article key={title} className="rounded-[26px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
                  <FileCheck2 className="h-5 w-5 text-[var(--rose-dark)]" aria-hidden="true" />
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{title}</h2>
                  <p className="mt-3 text-base leading-8 text-[var(--text-secondary)]">{text}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>

      <ContactCta title="Need a similar production issue investigated?" />
    </SiteFrame>
  );
}
