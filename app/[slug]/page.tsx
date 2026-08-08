import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Clock, HelpCircle, Target } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ServiceIcon } from "@/components/services/service-icon";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { getSeoArticleBySlug, seoArticles, type SeoArticle } from "@/data/seo-articles";
import { seoMoneyPages, getSeoLandingPageBySlug, type SeoLandingPage } from "@/data/seo-pages";
import { authorityReferences, buyerDecisionCriteria, enterpriseTopicClusters, globalMarkets } from "@/data/seo-strategy";
import { siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/route-metadata";

type SeoPageProps = {
  readonly params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...seoMoneyPages.map((page) => ({ slug: page.slug })), ...seoArticles.map((article) => ({ slug: article.slug }))];
}

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoLandingPageBySlug(slug);
  if (page) {
    return createPageMetadata({
      title: page.title,
      description: page.metaDescription,
      path: `/${page.slug}`,
    });
  }

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

export default async function SeoLandingPage({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = getSeoLandingPageBySlug(slug);
  if (page) {
    return <ServiceLandingPage page={page} />;
  }

  const article = getSeoArticleBySlug(slug);
  if (article) {
    return <ArticlePage article={article} />;
  }

  notFound();
}

function ServiceLandingPage({ page }: Readonly<{ page: SeoLandingPage }>) {
  const contactHref = buildContactHref(page);
  const pageTopicEntities = buildPageTopicEntities(page);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.metaDescription,
    serviceType: page.serviceType,
    areaServed: "International",
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    url: `${siteConfig.url}/${page.slug}`,
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.metaDescription,
    url: `${siteConfig.url}/${page.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: pageTopicEntities.map((entity) => ({
      "@type": "Thing",
      name: entity,
    })),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/opengraph-image`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable-summary]"],
    },
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${page.h1} deliverables`,
    itemListElement: page.deliverables.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item,
    })),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.shortTitle, path: `/${page.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.h1}
        actions={
          <>
            <ButtonLink href={contactHref}>
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/faq" variant="secondary">
              Read FAQ
            </ButtonLink>
          </>
        }
        visual={<LandingPageVisual page={page} />}
      >
        <span data-speakable-summary>{page.intro}</span>
      </PageHero>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <StaggerReveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <InfoPanel title="Common problems this fixes" items={page.problems} />
            <InfoPanel title="What you get" items={page.deliverables} featured />
          </StaggerReveal>
        </Container>
      </section>

      <EnterpriseSeoSection page={page} pageTopicEntities={pageTopicEntities} />

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Delivery path</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
                Clear scope, practical implementation, documented handover.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
                Each engagement is shaped around the current stack, access model, delivery urgency, and production risk
                instead of forcing a generic platform rebuild.
              </p>
            </div>
            <StaggerReveal className="grid gap-4">
              {page.approach.map((step, index) => (
                <article key={step} className="rounded-[22px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-soft)]">
                  <span className="font-mono text-xs font-semibold text-[var(--rose-dark)]">0{index + 1}</span>
                  <p className="mt-2 text-base font-semibold leading-7 text-[var(--text-primary)]">{step}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <StaggerReveal className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6 lg:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
                Best-fit projects
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                Built for buyers who need production work completed cleanly.
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {page.useCases.map((item) => (
                  <div key={item} className="rounded-2xl border border-[var(--border)] bg-white p-4">
                    <Target className="h-5 w-5 text-[var(--rose-dark)]" aria-hidden="true" />
                    <p className="mt-3 text-sm font-semibold leading-6 text-[var(--text-primary)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] lg:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">Next links</p>
              <div className="mt-5 grid gap-3">
                <ButtonLink href={contactHref}>
                  Get a Quick Scope
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={page.relatedCaseStudyHref} variant="secondary">
                  View Related Case Study
                </ButtonLink>
                <ButtonLink href={page.relatedServiceHref} variant="ghost" className="justify-start px-0">
                  Technical service details
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </aside>
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
              Questions before starting.
            </h2>
          </div>
          <StaggerReveal className="mt-8 grid gap-4 lg:grid-cols-2">
            {page.faq.map((item) => (
              <article key={item.question} className="rounded-[22px] border border-[var(--border)] bg-white p-6">
                <HelpCircle className="h-5 w-5 text-[var(--rose-dark)]" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-[var(--text-primary)]">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.answer}</p>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <ContactCta title={`Discuss ${page.shortTitle.toLowerCase()} for your production system.`} />
    </SiteFrame>
  );
}

function ArticlePage({ article }: Readonly<{ article: SeoArticle }>) {
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
            <ButtonLink href="/devops-consulting-services" variant="secondary">
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

function buildContactHref(page: SeoLandingPage) {
  const params = new URLSearchParams({
    requestType: "Book Consultation",
    projectType: page.contactProjectType,
    projectTimeline: "This week",
    estimatedBudget: "Not decided",
    projectDetails: `I would like to discuss ${page.h1} for our production stack.`,
  });

  return `/contact?${params.toString()}`;
}

function buildPageTopicEntities(page: SeoLandingPage) {
  return Array.from(new Set([page.serviceType, ...page.primaryKeywords, ...page.tools, ...page.useCases])).slice(0, 16);
}

function getRelevantClusters(page: SeoLandingPage) {
  const haystack = [page.h1, page.intro, page.serviceType, ...page.primaryKeywords, ...page.tools].join(" ").toLowerCase();
  const clusters = enterpriseTopicClusters.filter((cluster) =>
    cluster.entities.some((entity) => haystack.includes(entity.toLowerCase())) || haystack.includes(cluster.title.toLowerCase()),
  );

  return clusters.length ? clusters.slice(0, 4) : enterpriseTopicClusters.slice(0, 4);
}

function EnterpriseSeoSection({
  page,
  pageTopicEntities,
}: Readonly<{ page: SeoLandingPage; pageTopicEntities: readonly string[] }>) {
  const clusters = getRelevantClusters(page);
  const buyerQuestions = [
    `How should ${page.shortTitle.toLowerCase()} improve production reliability?`,
    "Which parts should be automated first?",
    "How do we balance security, delivery speed, and cloud cost?",
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
              Enterprise coverage
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
              Technical scope, buyer questions, and global delivery fit.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
              This page is written for decision makers comparing cloud, DevOps, security, reliability, automation, and
              managed operations options before choosing a practical implementation path.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">Semantic entities covered</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {pageTopicEntities.map((entity) => (
                  <TechnologyTag key={entity}>{entity}</TechnologyTag>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {clusters.map((cluster) => (
                <article key={cluster.title} className="rounded-[22px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-soft)]">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">{cluster.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {cluster.entities.slice(0, 5).join(", ")}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Buyer questions answered</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--text-secondary)]">
              {buyerQuestions.map((question) => (
                <li key={question} className="flex gap-3">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--rose-dark)]" aria-hidden="true" />
                  {question}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Markets supported</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {globalMarkets.map((market) => (
                <TechnologyTag key={market}>{market}</TechnologyTag>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Reference standards</h3>
            <div className="mt-5 grid gap-3">
              {authorityReferences.slice(0, 4).map((reference) => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--rose)]"
                >
                  {reference.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[24px] border border-[var(--border)] bg-white shadow-[var(--shadow-soft)]">
          <div className="grid border-b border-[var(--border)] bg-[var(--background-soft)] px-5 py-4 text-sm font-semibold text-[var(--text-primary)] md:grid-cols-[0.36fr_0.64fr]">
            <span>Decision area</span>
            <span>What good looks like</span>
          </div>
          {buyerDecisionCriteria.map((row) => (
            <div key={row.criterion} className="grid gap-2 border-b border-[var(--border)] px-5 py-4 text-sm last:border-b-0 md:grid-cols-[0.36fr_0.64fr]">
              <p className="font-semibold text-[var(--text-primary)]">{row.criterion}</p>
              <p className="leading-6 text-[var(--text-secondary)]">{row.whatGoodLooksLike}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
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
    {
      question: "Can CloudOpsync help implement the recommendation?",
      answer:
        "Yes. CloudOpsync can turn the guidance into a scoped implementation plan covering access, deployment, monitoring, validation, rollback notes, and handover.",
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

function LandingPageVisual({ page }: Readonly<{ page: SeoLandingPage }>) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-medium)]">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-rose-100 text-rose-700">
        <ServiceIcon icon={page.icon} />
      </div>
      <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
        Primary keywords
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {page.primaryKeywords.map((keyword) => (
          <TechnologyTag key={keyword}>{keyword}</TechnologyTag>
        ))}
      </div>
      <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
        Core stack
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {page.tools.map((tool) => (
          <TechnologyTag key={tool} className="bg-[var(--violet-soft)]">
            {tool}
          </TechnologyTag>
        ))}
      </div>
    </div>
  );
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

function InfoPanel({ title, items, featured = false }: Readonly<{ title: string; items: readonly string[]; featured?: boolean }>) {
  return (
    <div className={featured ? "rounded-[28px] border border-rose-200 bg-rose-50 p-6" : "rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6"}>
      <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success)]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
