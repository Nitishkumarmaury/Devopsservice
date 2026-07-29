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
          <ButtonLink href="/devops-consulting-services">
            Explore DevOps Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        Practical explanations for teams researching DevOps, cloud migration, DevSecOps, automation, CI/CD, and
        production reliability before starting implementation work.
      </PageHero>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <StaggerReveal className="grid gap-5 lg:grid-cols-2">
            {seoArticles.map((article) => (
              <article key={article.slug} className="rounded-[26px] border border-[var(--border)] bg-[var(--background-soft)] p-6 shadow-[var(--shadow-soft)]">
                <BookOpen className="h-5 w-5 text-[var(--rose-dark)]" aria-hidden="true" />
                <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
                  {article.eyebrow} • {article.readingTime}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{article.h1}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{article.metaDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {article.primaryKeywords.slice(0, 3).map((keyword) => (
                    <TechnologyTag key={keyword}>{keyword}</TechnologyTag>
                  ))}
                </div>
                <ButtonLink href={`/${article.slug}`} variant="ghost" className="mt-5 px-0">
                  Read guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <ContactCta title="Need help applying these guides to your production stack?" />
    </SiteFrame>
  );
}
