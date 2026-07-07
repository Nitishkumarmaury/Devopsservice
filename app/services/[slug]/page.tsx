import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { ServiceIcon } from "@/components/services/service-icon";
import { getCaseStudyBySlug } from "@/data/case-studies";
import { getServiceBySlug, services } from "@/data/services";
import { siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/route-metadata";

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
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "International",
    serviceType: service.shortTitle,
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
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
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        eyebrow="Service category"
        title={service.title}
        actions={
          <>
            <ButtonLink href={contactHref}>
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              View all services
            </ButtonLink>
          </>
        }
        visual={
          <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-medium)]">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-rose-100 text-rose-700">
              <ServiceIcon icon={service.icon} />
            </div>
            <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
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

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <InfoPanel title="Client problems" items={service.problems} />
            <InfoPanel title="What this service includes" items={service.includes} featured />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <InfoPanel title="What is not included" items={service.notIncluded} />
            <InfoPanel title="Information required" items={service.clientInputs} />
            <InfoPanel title="After implementation" items={service.afterImplementation} />
          </div>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Delivery approach</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
                Practical implementation with clear handover.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
                The service is scoped around production safety, access clarity, validation, and documentation rather than
                unnecessary platform complexity.
              </p>
            </div>
            <div className="grid gap-4">
              {service.approach.map((step, index) => (
                <div key={step} className="rounded-[22px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-soft)]">
                  <span className="font-mono text-xs font-semibold text-[var(--rose-dark)]">0{index + 1}</span>
                  <p className="mt-2 font-semibold text-[var(--text-primary)]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">Common engagement examples</h2>
              <ul className="mt-6 grid gap-4">
                {service.examples.map((example) => (
                  <li key={example} className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success)]" aria-hidden="true" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            {relatedCaseStudy ? (
              <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
                  Related case study
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                  {relatedCaseStudy.category}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{relatedCaseStudy.problem}</p>
                <ButtonLink href={`/case-studies/${relatedCaseStudy.slug}`} variant="secondary" className="mt-6">
                  Read case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">Common questions.</h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {service.faq.map((item) => (
              <article key={item.question} className="rounded-[22px] border border-[var(--border)] bg-white p-6">
                <HelpCircle className="h-5 w-5 text-[var(--rose-dark)]" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-[var(--text-primary)]">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta title={`Discuss ${service.shortTitle.toLowerCase()} for your production system.`} />
    </SiteFrame>
  );
}

function InfoPanel({ title, items, featured = false }: { title: string; items: readonly string[]; featured?: boolean }) {
  return (
    <div className={featured ? "rounded-[28px] border border-rose-200 bg-rose-50 p-6" : "rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6"}>
      <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--rose)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
