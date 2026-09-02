import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { seoArticles } from "@/data/seo-articles";
import { createPageMetadata } from "@/lib/route-metadata";

const resourceCategories = [
  "DevOps",
  "AWS",
  "CI/CD",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Monitoring",
  "Production Reliability",
  "Cloud Security",
] as const;

const faqItems = [
  {
    question: "What topics do these guides cover?",
    answer:
      "The guides cover DevOps fundamentals, CI/CD pipelines, cloud migration, container deployment, monitoring, infrastructure automation, and production reliability.",
  },
  {
    question: "Are these guides suitable for beginners?",
    answer:
      "Yes. Each guide starts with context and practical definitions before moving into implementation details and best practices.",
  },
  {
    question: "How often are the guides updated?",
    answer:
      "Each guide includes a published and updated date. Content is reviewed to reflect current best practices, tool versions, and production-ready recommendations.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const metadata: Metadata = createPageMetadata({
  title: "DevOps and Cloud Engineering Guides",
  description:
    "Educational DevOps and cloud guides covering DevOps basics, cloud migration best practices, DevSecOps, automation tools, CI/CD and production reliability.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "DevOps and Cloud Guides", path: "/blog" },
        ]}
      />
      <PageHero
        eyebrow="Guides"
        title="DevOps and Cloud Engineering Guides"
        actions={
          <ButtonLink href="/services">
            Explore Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        Practical explanations for teams researching DevOps, cloud migration, DevSecOps, automation, CI/CD, and
        production reliability before starting implementation work.
      </PageHero>

      <section className="border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(77,163,255,0.04),rgba(77,163,255,0.01))] py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap gap-2">
            {resourceCategories.map((category) => (
              <TechnologyTag key={category}>{category}</TechnologyTag>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-white py-16 sm:py-24">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">Guides</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
                Practical guides for production teams
              </h2>
            </div>
            <p className="hidden max-w-md text-sm leading-7 text-[var(--text-secondary)] lg:block">
              Each guide covers one topic in depth and links to related implementation services.
            </p>
          </div>
          <StaggerReveal className="grid gap-5 lg:grid-cols-2" itemClassName="h-full">
            {seoArticles.map((article) => (
              <article
                key={article.slug}
                className="flex h-full flex-col rounded-[26px] border border-[var(--border)] bg-[var(--background-soft)] p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <BookOpen className="h-5 w-5 shrink-0 text-[var(--rose-dark)]" aria-hidden="true" />
                  <p className="text-right font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
                    {article.eyebrow} • {article.readingTime}
                  </p>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{article.h1}</h3>
                <p className="mt-3 font-mono text-xs leading-5 text-[var(--text-muted)]">
                  CloudOpsync • Published {article.publishedAt} • Updated {article.updatedAt}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{article.metaDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {article.primaryKeywords.slice(0, 3).map((keyword) => (
                    <TechnologyTag key={keyword}>{keyword}</TechnologyTag>
                  ))}
                </div>
                <ButtonLink href={`/${article.slug}`} variant="ghost" className="mt-5 w-fit px-0 justify-start">
                  Read guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <div className="mt-auto pt-5">
                  <div className="border-t border-[var(--border)] pt-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">Related implementation</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {article.relatedLinks.slice(0, 2).map((link) => (
                        <ButtonLink key={link.href} href={link.href} variant="ghost" className="min-h-0 px-0 py-1 text-xs">
                          {link.label}
                        </ButtonLink>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(77,163,255,0.06),rgba(255,255,255,0.6))] p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">Frequently asked questions</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-[22px] border border-[var(--border)] bg-white/80 p-5">
                  <p className="text-base font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{item.question}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ContactCta title="Need help applying these guides to your production stack?" />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </SiteFrame>
  );
}
