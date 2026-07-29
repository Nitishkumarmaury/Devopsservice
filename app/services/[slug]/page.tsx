import type { Metadata } from"next";
import { notFound } from"next/navigation";
import { ArrowRight, CheckCircle2, HelpCircle } from"lucide-react";
import { SiteFrame } from"@/components/layout/site-frame";
import { BreadcrumbJsonLd } from"@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from"@/components/ui/button";
import { Container } from"@/components/ui/container";
import { PageHero } from"@/components/ui/page-hero";
import { StaggerReveal } from"@/components/ui/stagger-reveal";
import { TechnologyTag } from"@/components/ui/technology-tag";
import { ServiceIcon } from"@/components/services/service-icon";
import { getCaseStudyBySlug } from"@/data/case-studies";
import { getServiceBySlug, services } from"@/data/services";
import { siteConfig } from"@/lib/constants";
import { createPageMetadata } from"@/lib/route-metadata";

type ServicePageProps = {
 params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
 return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
 const { slug } = await params;
 const service = getServiceBySlug(slug);
 if (!service) return {};

 return createPageMetadata({
 title: service.title,
 description: service.description,
 path: `/services/${service.slug}`,
 });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
 const { slug } = await params;
 const service = getServiceBySlug(slug);
 if (!service) notFound();

 const relatedCaseStudy = getCaseStudyBySlug(service.relatedCaseStudySlug);
 const contactHref = `/contact?requestType=Book%20Consultation&projectType=${encodeURIComponent(service.title)}&currentInfrastructure=${encodeURIComponent(
 `Interested in ${service.title}.`,
 )}`;
 const serviceJsonLd = {
"@context":"https://schema.org",
"@type":"Service",
 name: service.title,
 description: service.description,
 provider: {
"@type":"ProfessionalService",
 name: siteConfig.name,
 url: siteConfig.url,
 },
 areaServed:"International",
 serviceType: service.shortTitle,
 url: `${siteConfig.url}/services/${service.slug}`,
 };

 const faqJsonLd = {
"@context":"https://schema.org",
"@type":"FAQPage",
 mainEntity: service.faq.map((item) => ({
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
 { name:"Services", path:"/services"},
 { name: service.shortTitle, path: `/services/${service.slug}` },
 ]}
 />
 <script type="application/ld+json"dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
 <script type="application/ld+json"dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

 <PageHero
 eyebrow={service.category ==="development"?"Development Service":"DevOps Service"}
 title={service.title}
 actions={
 <>
 <ButtonLink href={contactHref}>
 Book a Consultation
 <ArrowRight className="h-4 w-4"aria-hidden="true"/>
 </ButtonLink>
 <ButtonLink href="/services"variant="secondary">
 View all services
 </ButtonLink>
 </>
 }
 visual={
 <div className="border border-border bg-canvas-surface p-6">
 <div className="grid h-16 w-16 place-items-center border border-border bg-canvas-soft text-brand">
 <ServiceIcon icon={service.icon} />
 </div>
 <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
 Technical stack
 </p>
 <div className="mt-4 flex flex-wrap gap-2">
 {service.technologies.map((tag) => (
 <TechnologyTag key={tag}>{tag}</TechnologyTag>
 ))}
 </div>
 </div>
 }
 >
 {service.description}
 </PageHero>

 <section className="border-b border-border bg-canvas py-16 sm:py-24">
 <Container>
 <StaggerReveal className="grid items-stretch gap-8 lg:grid-cols-[0.8fr_1.2fr]">
 <InfoPanel title="Client problems"items={service.problems} />
 <InfoPanel title="What this service includes"items={service.includes} featured />
 </StaggerReveal>
 <StaggerReveal className="mt-8 grid items-stretch gap-8 lg:grid-cols-3">
 <InfoPanel title="What is not included"items={service.notIncluded} />
 <InfoPanel title="Information required"items={service.clientInputs} />
 <InfoPanel title="After implementation"items={service.afterImplementation} />
 </StaggerReveal>
 </Container>
 </section>

 <section className="border-b border-border bg-canvas-soft py-16 sm:py-24">
 <Container>
 <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
 <div>
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand">Delivery approach</p>
 <h2 className="mt-4 font-mono text-4xl font-bold tracking-tight text-ink">
 Practical implementation with clear handover.
 </h2>
 <p className="mt-5 text-base leading-8 text-ink-secondary">
 The service is scoped around production safety, access clarity, validation, and documentation rather than
 unnecessary platform complexity.
 </p>
 </div>
 <StaggerReveal className="grid items-stretch gap-4">
 {service.approach.map((step, index) => (
 <div key={step} className="flex h-full flex-col border border-border bg-canvas-surface p-5">
 <span className="font-mono text-xs font-semibold text-brand">0{index + 1}</span>
 <p className="mt-2 font-mono text-sm font-semibold text-ink">{step}</p>
 </div>
 ))}
 </StaggerReveal>
 </div>
 </Container>
 </section>

 <section className="border-b border-border bg-canvas py-16 sm:py-24">
 <Container>
 <StaggerReveal className="grid items-stretch gap-8 lg:grid-cols-2">
 <div className="flex h-full flex-col border border-border bg-canvas-soft p-6">
 <h2 className="font-mono text-3xl font-bold tracking-tight text-ink">Common engagement examples</h2>
 <ul className="mt-6 grid gap-4">
 {service.examples.map((example) => (
 <li key={example} className="flex gap-3 text-sm leading-6 text-ink-secondary">
 <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand"aria-hidden="true"/>
 {example}
 </li>
 ))}
 </ul>
 </div>
 {relatedCaseStudy ? (
 <div className="flex h-full flex-col border border-border bg-canvas-surface p-6">
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
 Related case study
 </p>
 <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight text-ink">
 {relatedCaseStudy.category}
 </h2>
 <p className="mt-4 text-sm leading-6 text-ink-secondary">{relatedCaseStudy.problem}</p>
 <ButtonLink href={`/case-studies/${relatedCaseStudy.slug}`} variant="secondary"className="mt-auto">
 Read case study
 <ArrowRight className="h-4 w-4"aria-hidden="true"/>
 </ButtonLink>
 </div>
 ) : null}
 </StaggerReveal>
 </Container>
 </section>

 <section className="border-b border-border bg-canvas-soft py-16 sm:py-24">
 <Container>
 <div className="max-w-3xl">
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand">FAQ</p>
 <h2 className="mt-4 font-mono text-4xl font-bold tracking-tight text-ink">Common questions.</h2>
 </div>
 <StaggerReveal className="mt-8 grid items-stretch gap-4 lg:grid-cols-2">
 {service.faq.map((item) => (
 <article key={item.question} className="flex h-full flex-col border border-border bg-canvas-surface p-6">
 <HelpCircle className="h-5 w-5 text-brand"aria-hidden="true"/>
 <h3 className="mt-4 font-mono text-sm font-semibold text-ink">{item.question}</h3>
 <p className="mt-3 text-sm leading-6 text-ink-secondary">{item.answer}</p>
 </article>
 ))}
 </StaggerReveal>
 </Container>
 </section>

 </SiteFrame>
 );
}

function InfoPanel({ title, items, featured = false }: Readonly<{ title: string; items: readonly string[]; featured?: boolean }>) {
 return (
 <div className={featured ?"flex h-full flex-col border border-secondary bg-canvas-soft p-6":"flex h-full flex-col border border-border bg-canvas-surface p-6"}>
 <h2 className="font-mono text-2xl font-bold tracking-tight text-ink">{title}</h2>
 <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink-secondary">
 {items.map((item) => (
 <li key={item} className="flex gap-3">
 <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-secondary"/>
 {item}
 </li>
 ))}
 </ul>
 </div>
 );
}
