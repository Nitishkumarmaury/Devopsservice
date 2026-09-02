import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { getSeoArticleBySlug, seoArticles, type SeoArticle } from "@/data/seo-articles";
import { siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/route-metadata";

type SeoPageProps = {
  readonly params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getSeoArticleBySlug(slug);
  if (article) {
    return createPageMetadata({
      title: article.title,
      description: article.metaDescription,
      path: `/${article.slug}`,
      openGraphType: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [siteConfig.name],
      tags: article.primaryKeywords.slice(0, 8) as string[],
    });
  }

  return {};
}

export default async function ArticlePage({ params }: SeoPageProps) {
  const { slug } = await params;
  const article = getSeoArticleBySlug(slug);
  if (article) {
    return <ArticleContent article={article} />;
  }

  notFound();
}

function ArticleContent({ article }: Readonly<{ article: SeoArticle }>) {
  const articleFaq = buildArticleFaq(article);
  const howToSteps = buildArticleHowToSteps(article);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/${article.slug}`,
    about: article.primaryKeywords.map((keyword) => ({
      "@type": "Thing",
      name: keyword,
    })),
  };
  const articleByline = [
    `Published ${article.publishedAt}`,
    `Updated ${article.updatedAt}`,
    siteConfig.name,
  ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: articleFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to apply ${article.h1}`,
    description: article.metaDescription,
    step: howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
  };

  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: article.h1, path: `/${article.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <PageHero
        eyebrow={article.eyebrow}
        title={article.h1}
        actions={
          <>
            <ButtonLink href="/contact?requestType=Book%20Consultation">
              Discuss Your Stack
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              DevOps Services
            </ButtonLink>
          </>
        }
        visual={<ArticleVisual article={article} />}
      >
        {article.intro}
      </PageHero>

      <section className="border-b border-[var(--border)] bg-[var(--background-soft)] py-6">
        <Container>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
            {articleByline.map((item, index) => (
              <span key={item} className="flex items-center gap-3">
                {index > 0 ? <span className="h-1 w-1 rounded-full bg-[var(--rose-dark)]/50" /> : null}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <ScrollReveal as="aside" className="h-fit rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6 lg:sticky lg:top-24">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">Table of contents</p>
              <nav aria-label={`${article.h1} table of contents`} className="mt-5 grid gap-2 text-sm leading-6">
                {article.sections.map((section) => (
                  <a key={section.heading} href={`#${slugifyText(section.heading)}`} className="text-[var(--text-secondary)] transition hover:text-[var(--rose-dark)]">
                    {section.heading}
                  </a>
                ))}
              </nav>
              <div className="my-6 h-px bg-[var(--border)]" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">Key takeaways</p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                {article.takeaways.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <StaggerReveal className="grid gap-5">
              {article.sections.map((section) => (
                <section id={slugifyText(section.heading)} key={section.heading} className="scroll-mt-24 rounded-[26px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
                  <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{section.heading}</h2>
                  <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{section.body}</p>
                  {section.bullets ? (
                    <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--rose)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
                Implementation checklist
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
                Turn the article into a safer production change.
              </h2>
              <ol className="mt-6 grid gap-3 text-sm leading-7 text-[var(--text-secondary)]">
                {howToSteps.map((step, index) => (
                  <li key={step} className="rounded-[18px] border border-[var(--border)] bg-white p-4">
                    <span className="font-mono text-xs font-semibold text-[var(--rose-dark)]">
                      Step {index + 1}
                    </span>
                    <p className="mt-2">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
                People also ask
              </p>
              <div className="mt-6 grid gap-4">
                {articleFaq.map((item) => (
                  <article key={item.question} className="rounded-[22px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">{item.question}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Related services</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
              Continue from guide to implementation.
            </h2>
          </div>
          <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-3">
            {article.relatedLinks.map((link) => (
              <ButtonLink key={link.href} href={link.href} variant="secondary" className="justify-between">
                {link.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <ContactCta title="Turn the guide into a production-ready DevOps plan." />
    </SiteFrame>
  );
}

function buildArticleFaq(article: SeoArticle) {
  return [
    {
      question: `What is the main takeaway from ${article.h1}?`,
      answer: article.takeaways[0] ?? article.intro,
    },
    {
      question: `When should a team apply this ${article.eyebrow.toLowerCase()} guidance?`,
      answer:
        article.takeaways[article.takeaways.length - 1] ??
        "Teams should apply the guidance when production delivery, infrastructure reliability, monitoring, or operational ownership is unclear.",
    },
  ];
}

function buildArticleHowToSteps(article: SeoArticle) {
  return [
    `Clarify the production goal behind ${article.h1.toLowerCase()} and the business risk it should reduce.`,
    "Review the current stack, deployment process, infrastructure ownership, monitoring, security, and support gaps.",
    "Prioritize the smallest useful change that improves reliability, automation, visibility, or recovery.",
    "Validate the change with logs, health checks, rollback notes, and a handover your team can keep using.",
  ];
}

function slugifyText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ArticleVisual({ article }: Readonly<{ article: SeoArticle }>) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-medium)]">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-rose-100 text-rose-700">
        <BookOpen className="h-7 w-7" aria-hidden="true" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {article.readingTime}
        </span>
        <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--background-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
          Updated {article.updatedAt}
        </span>
      </div>
      <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
        Search focus
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.primaryKeywords.map((keyword) => (
          <TechnologyTag key={keyword}>{keyword}</TechnologyTag>
        ))}
      </div>
    </div>
  );
}
