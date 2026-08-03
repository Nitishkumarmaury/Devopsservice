import type { Metadata } from "next";
import { ArrowRight, BookOpen, CheckCircle2, Search, Target, TrendingUp, Users2 } from "lucide-react";
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

const authorityPlan = [
  {
    title: "Technical foundation",
    description:
      "Keep every public page fast, crawlable, canonicalized, and structured with JSON-LD before adding volume.",
    points: ["Core Web Vitals", "Canonical URLs", "Open Graph", "Robots and sitemap", "Accessible mobile layout"],
  },
  {
    title: "Topical authority",
    description:
      "Build deep clusters around cloud consulting, Kubernetes, Terraform, CI/CD, monitoring, security, FinOps, and AI infrastructure.",
    points: ["Service pages", "Cluster pages", "Internal linking", "Comparison content", "Troubleshooting guides"],
  },
  {
    title: "Long-tail demand",
    description:
      "Target problem-led phrases that convert better than broad head terms and publish content that answers them directly.",
    points: ["Specific use cases", "Buyer-intent pages", "Implementation guides", "Pricing pages", "Troubleshooting queries"],
  },
  {
    title: "Trust and signals",
    description:
      "Show who is behind the work with authoring, credentials, testimonials, case studies, contact details, and clear policies.",
    points: ["Team and author bios", "Case studies", "Certifications", "Address and phone", "Security, privacy, terms"],
  },
] as const;

const publishingPlan = [
  { label: "Service pages", value: "20-30" },
  { label: "In-depth blog posts", value: "100+" },
  { label: "Case studies", value: "20" },
  { label: "Tutorials", value: "30" },
  { label: "Comparison articles", value: "10" },
  { label: "Troubleshooting articles", value: "20" },
] as const;

const faqItems = [
  {
    question: "What should CloudOpsync publish first?",
    answer:
      "Start with core service pages, 3 to 5 foundational articles, one or two case studies, and the contact and trust pages that support conversion.",
  },
  {
    question: "Should the site chase broad keywords first?",
    answer:
      "No. Long-tail, problem-led searches usually convert better and are easier to win early, so the content strategy should start there.",
  },
  {
    question: "Why does topical authority matter?",
    answer:
      "A site that covers a subject in depth tends to earn more trust than one with only a handful of disconnected pages.",
  },
  {
    question: "What structured data matters most on a consulting site?",
    answer:
      "Organization, Service, FAQ, Breadcrumb, and Review structured data are the highest-value starting points when they match the page content.",
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
          <ButtonLink href="/devops-consulting-services">
            Explore DevOps Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        Practical explanations for teams researching DevOps, cloud migration, DevSecOps, automation, CI/CD, and
        production reliability before starting implementation work.
      </PageHero>

      <section className="border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(77,163,255,0.04),rgba(77,163,255,0.01))] py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">SEO strategy</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
                Build the site like a trusted engineering reference, not a thin services brochure.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
                The page structure below turns the strategy into a practical publishing system: first the technical
                foundation, then topic clusters, then long-tail articles that answer real buyer questions.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {resourceCategories.map((category) => (
                  <TechnologyTag key={category}>{category}</TechnologyTag>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {publishingPlan.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-[var(--border)] bg-[var(--background-soft)] p-5 shadow-[var(--shadow-soft)]">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">Publishing target</p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {authorityPlan.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-[26px] border border-[var(--border)] bg-[var(--background-soft)] p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#4da3ff]/20 bg-[#4da3ff]/8 text-[#4da3ff]">
                  {item.title === "Technical foundation" ? (
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  ) : item.title === "Topical authority" ? (
                    <Target className="h-5 w-5" aria-hidden="true" />
                  ) : item.title === "Long-tail demand" ? (
                    <Search className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Users2 className="h-5 w-5" aria-hidden="true" />
                  )}
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4da3ff]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
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
                High-intent content mapped to the buyer journey
              </h2>
            </div>
            <p className="hidden max-w-md text-sm leading-7 text-[var(--text-secondary)] lg:block">
              Each guide should solve one problem, link to related implementation pages, and support the larger cloud and DevOps cluster.
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
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">Long-tail targets</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">Capture demand before the broad terms are realistic.</h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                Problem-led queries usually convert better than generic head terms. The cluster should answer specific searches directly and route visitors into the right service page.
              </p>
              <div className="mt-6 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                {[
                  "Kubernetes deployment company in USA",
                  "Terraform consulting services",
                  "AWS migration experts",
                  "CI/CD setup for startups",
                  "Prometheus monitoring service",
                  "Azure cost optimization consultant",
                ].map((keyword) => (
                  <div key={keyword} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white/60 px-4 py-3">
                    <TrendingUp className="h-4 w-4 shrink-0 text-[#4da3ff]" aria-hidden="true" />
                    <span>{keyword}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(77,163,255,0.06),rgba(255,255,255,0.6))] p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">Short answers for search engines and AI assistants</h2>
              <div className="mt-6 grid gap-4">
                {faqItems.map((item) => (
                  <div key={item.question} className="rounded-[22px] border border-[var(--border)] bg-white/80 p-5">
                    <p className="text-base font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{item.question}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>
                  </div>
                ))}
              </div>
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
