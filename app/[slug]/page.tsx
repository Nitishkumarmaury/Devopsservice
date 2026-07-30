import type { Metadata } from"next";
import { notFound } from"next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Clock, HelpCircle, Target } from"lucide-react";
import { SiteFrame } from"@/components/layout/site-frame";
import { ServiceIcon } from"@/components/services/service-icon";
import { BreadcrumbJsonLd } from"@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from"@/components/ui/button";
import { Container } from"@/components/ui/container";
import { PageHero } from"@/components/ui/page-hero";
import { ScrollReveal } from"@/components/ui/scroll-reveal";
import { StaggerReveal } from"@/components/ui/stagger-reveal";
import { TechnologyTag } from"@/components/ui/technology-tag";
import { getSeoArticleBySlug, seoArticles, type SeoArticle } from"@/data/seo-articles";
import { seoMoneyPages, getSeoLandingPageBySlug, type SeoLandingPage } from"@/data/seo-pages";
import { siteConfig } from"@/lib/constants";
import { createPageMetadata } from"@/lib/route-metadata";

type SeoPageProps = {
 params: Promise<{ slug: string }>;
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
 const serviceJsonLd = {
"@context":"https://schema.org",
"@type":"Service",
 name: page.h1,
 description: page.metaDescription,
 serviceType: page.serviceType,
 areaServed:"International",
 provider: {
"@type":"ProfessionalService",
 name: siteConfig.name,
 url: siteConfig.url,
 email: siteConfig.email,
 },
 url: `${siteConfig.url}/${page.slug}`,
 };
 const faqJsonLd = {
"@context":"https://schema.org",
"@type":"FAQPage",
 mainEntity: page.faq.map((item) => ({
"@type":"Question",
 name: item.question,
 acceptedAnswer: {
"@type":"Answer",
 text: item.answer,
 },
 })),
 };

 return (
 <SiteFrame>
 <BreadcrumbJsonLd
 items={[
 { name:"Home", path:"/"},
 { name: page.shortTitle, path: `/${page.slug}` },
 ]}
 />
 <script type="application/ld+json"dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
 <script type="application/ld+json"dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

 <PageHero
 eyebrow={page.eyebrow}
 title={page.h1}
 actions={
 <>
 <ButtonLink href={contactHref}>
 Book a Consultation
 <ArrowRight className="h-4 w-4"aria-hidden="true"/>
 </ButtonLink>
 <ButtonLink href="/faq"variant="secondary">
 Read FAQ
 </ButtonLink>
 </>
 }
 visual={<LandingPageVisual page={page} />}
 >
 {page.intro}
 </PageHero>

 <section className="bg-white py-16 sm:py-24">
 <Container>
 <StaggerReveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
 <InfoPanel title="Common problems this fixes"items={page.problems} />
 <InfoPanel title="What you get"items={page.deliverables} featured />
 </StaggerReveal>
 </Container>
 </section>

 <section className="bg-canvas-soft py-16 sm:py-24">
 <Container>
 <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
 <div>
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand">Delivery path</p>
 <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-ink">
 Clear scope, practical implementation, documented handover.
 </h2>
 <p className="mt-5 text-base leading-8 text-ink-secondary">
 Each engagement is shaped around the current stack, access model, delivery urgency, and production risk
 instead of forcing a generic platform rebuild.
 </p>
 </div>
 <StaggerReveal className="grid items-stretch gap-4">
 {page.approach.map((step, index) => (
 <article key={step} className="flex h-full flex-col border border-border bg-canvas-surface p-5">
 <span className="font-mono text-xs font-semibold text-brand">0{index + 1}</span>
 <p className="mt-2 text-base font-semibold leading-7 text-ink">{step}</p>
 </article>
 ))}
 </StaggerReveal>
 </div>
 </Container>
 </section>

 <section className="bg-white py-16 sm:py-24">
 <Container>
 <StaggerReveal className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
 <div className="border border-border bg-canvas-soft p-6 lg:p-8">
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
 Best-fit projects
 </p>
 <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink">
 Built for buyers who need production work completed cleanly.
 </h2>
 <div className="mt-6 grid gap-4 sm:grid-cols-3">
 {page.useCases.map((item) => (
 <div key={item} className="border border-border bg-white p-4">
 <Target className="h-5 w-5 text-brand"aria-hidden="true"/>
 <p className="mt-3 text-sm font-semibold leading-6 text-ink">{item}</p>
 </div>
 ))}
 </div>
 </div>

 <aside className="h-fit border border-border bg-white p-6 lg:p-8">
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">Next links</p>
 <div className="mt-5 grid gap-3">
 <ButtonLink href={contactHref}>
 Get a Quick Scope
 <ArrowRight className="h-4 w-4"aria-hidden="true"/>
 </ButtonLink>
 <ButtonLink href={page.relatedCaseStudyHref} variant="secondary">
 View Related Case Study
 </ButtonLink>
 <ButtonLink href={page.relatedServiceHref} variant="ghost"className="justify-start px-0">
 Technical service details
 <ArrowRight className="h-4 w-4"aria-hidden="true"/>
 </ButtonLink>
 </div>
 </aside>
 </StaggerReveal>
 </Container>
 </section>

 <section className="bg-canvas-soft py-16 sm:py-24">
 <Container>
 <div className="max-w-3xl">
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand">FAQ</p>
 <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-ink">
 Questions before starting.
 </h2>
 </div>
 <StaggerReveal className="mt-8 grid items-stretch gap-4 lg:grid-cols-2">
 {page.faq.map((item) => (
 <article key={item.question} className="flex h-full flex-col border border-border bg-canvas-surface p-6">
 <HelpCircle className="h-5 w-5 text-brand"aria-hidden="true"/>
 <h3 className="mt-4 font-semibold text-ink">{item.question}</h3>
 <p className="mt-3 text-sm leading-6 text-ink-secondary">{item.answer}</p>
 </article>
 ))}
 </StaggerReveal>
 </Container>
 </section>

 </SiteFrame>
 );
}

function ArticlePage({ article }: Readonly<{ article: SeoArticle }>) {
 const articleJsonLd = {
"@context":"https://schema.org",
"@type":"Article",
 headline: article.title,
 description: article.metaDescription,
 datePublished: article.publishedAt,
 dateModified: article.updatedAt,
 author: {
"@type":"Organization",
 name: siteConfig.name,
 },
 publisher: {
"@type":"Organization",
 name: siteConfig.name,
 logo: {
"@type":"ImageObject",
 url: `${siteConfig.url}${siteConfig.logo}`,
 },
 },
 mainEntityOfPage: `${siteConfig.url}/${article.slug}`,
 };

 return (
 <SiteFrame>
 <BreadcrumbJsonLd
 items={[
 { name:"Home", path:"/"},
 { name: article.h1, path: `/${article.slug}` },
 ]}
 />
 <script type="application/ld+json"dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

 <PageHero
 eyebrow={article.eyebrow}
 title={article.h1}
 actions={
 <>
 <ButtonLink href="/contact?requestType=Book%20Consultation">
 Discuss Your Stack
 <ArrowRight className="h-4 w-4"aria-hidden="true"/>
 </ButtonLink>
 <ButtonLink href="/devops-consulting-services"variant="secondary">
 DevOps Services
 </ButtonLink>
 </>
 }
 visual={<ArticleVisual article={article} />}
 >
 {article.intro}
 </PageHero>

 <section className="bg-white py-16 sm:py-24">
 <Container>
 <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
 <ScrollReveal as="aside"className="h-fit border border-border bg-canvas-soft p-6 lg:sticky lg:top-24">
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">Key takeaways</p>
 <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink-secondary">
 {article.takeaways.map((item) => (
 <li key={item} className="flex gap-3">
 <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand"aria-hidden="true"/>
 {item}
 </li>
 ))}
 </ul>
 </ScrollReveal>

 <StaggerReveal className="grid gap-5">
 {article.sections.map((section) => (
 <section key={section.heading} className="border border-border bg-canvas-soft p-6">
 <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink">{section.heading}</h2>
 <p className="mt-4 text-base leading-8 text-ink-secondary">{section.body}</p>
 {section.bullets ? (
 <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink-secondary">
 {section.bullets.map((item) => (
 <li key={item} className="flex gap-3">
 <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"/>
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

 <section className="bg-canvas-soft py-16 sm:py-24">
 <Container>
 <div className="max-w-3xl">
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand">Related services</p>
 <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-ink">
 Continue from guide to implementation.
 </h2>
 </div>
 <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-3">
 {article.relatedLinks.map((link) => (
 <ButtonLink key={link.href} href={link.href} variant="secondary"className="justify-between">
 {link.label}
 <ArrowRight className="h-4 w-4"aria-hidden="true"/>
 </ButtonLink>
 ))}
 </StaggerReveal>
 </Container>
 </section>

 </SiteFrame>
 );
}

function buildContactHref(page: SeoLandingPage) {
 const params = new URLSearchParams({
 requestType:"Book Consultation",
 projectType: page.contactProjectType,
 projectTimeline:"This week",
 estimatedBudget:"Not decided",
 projectDetails: `I would like to discuss ${page.h1} for our production stack.`,
 });

 return `/contact?${params.toString()}`;
}

function LandingPageVisual({ page }: Readonly<{ page: SeoLandingPage }>) {
 return (
 <div className="border border-border bg-white p-6">
 <div className="grid h-16 w-16 place-items-center bg-rose-100 text-rose-700">
 <ServiceIcon icon={page.icon} />
 </div>
 <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
 Primary keywords
 </p>
 <div className="mt-4 flex flex-wrap gap-2">
 {page.primaryKeywords.map((keyword) => (
 <TechnologyTag key={keyword}>{keyword}</TechnologyTag>
 ))}
 </div>
 <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
 Core stack
 </p>
 <div className="mt-4 flex flex-wrap gap-2">
 {page.tools.map((tool) => (
 <TechnologyTag key={tool} className="bg-canvas-soft">
 {tool}
 </TechnologyTag>
 ))}
 </div>
 </div>
 );
}

function ArticleVisual({ article }: Readonly<{ article: SeoArticle }>) {
 return (
 <div className="border border-border bg-white p-6">
 <div className="grid h-16 w-16 place-items-center bg-rose-100 text-rose-700">
 <BookOpen className="h-7 w-7"aria-hidden="true"/>
 </div>
 <div className="mt-6 flex flex-wrap gap-2">
 <span className="inline-flex items-center gap-2 rounded-full border border-border bg-canvas-soft px-3 py-1.5 text-xs font-semibold text-ink-secondary">
 <Clock className="h-3.5 w-3.5"aria-hidden="true"/>
 {article.readingTime}
 </span>
 <span className="inline-flex items-center rounded-full border border-border bg-canvas-soft px-3 py-1.5 text-xs font-semibold text-ink-secondary">
 Updated {article.updatedAt}
 </span>
 </div>
 <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
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
 <div className={featured ?"border border-brand bg-brand-50 p-6":"border border-border bg-canvas-soft p-6"}>
 <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink">{title}</h2>
 <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink-secondary">
 {items.map((item) => (
 <li key={item} className="flex gap-3">
 <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand"aria-hidden="true"/>
 {item}
 </li>
 ))}
 </ul>
 </div>
 );
}
