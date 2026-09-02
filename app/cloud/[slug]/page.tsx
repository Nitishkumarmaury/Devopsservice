import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { FaqSection, BulletCardGrid, BuildFaqJsonLd } from "@/components/ui/faq-section";
import { PageHero } from "@/components/ui/page-hero";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { cloudPages } from "@/data/cloud-pages";
import { siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/route-metadata";
import { buildServiceJsonLd } from "@/lib/schema-utils";

type CloudPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cloudPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: CloudPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = cloudPages.find((p) => p.slug === slug);
  if (!page) return {};
  return createPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/cloud/${page.slug}`,
  });
}

export default async function CloudProviderPage({ params }: CloudPageProps) {
  const { slug } = await params;
  const page = cloudPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const contactHref = `/contact?requestType=Book%20Consultation&projectType=${encodeURIComponent(page.title)}`;
  const serviceJsonLd = buildServiceJsonLd({
    name: page.title,
    description: page.metaDescription,
    serviceType: `${page.name} consulting`,
    url: `${siteConfig.url}/cloud/${page.slug}`,
  });

  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Cloud", path: "/cloud" },
          { name: page.name, path: `/cloud/${page.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BuildFaqJsonLd(page.faq)) }} />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        actions={
          <>
            <ButtonLink href={contactHref}>
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/cloud" variant="secondary">
              All cloud providers
            </ButtonLink>
          </>
        }
        visual={
          <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-medium)]">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
              {page.name} stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {page.technologies.map((tag) => (
                <TechnologyTag key={tag}>{tag}</TechnologyTag>
              ))}
            </div>
          </div>
        }
      >
        {page.intro}
      </PageHero>

      <BulletCardGrid
        eyebrow="Overview"
        title={`Practical ${page.name} engineering, without platform sprawl.`}
        items={page.sections}
      />

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Engagements</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
              Common {page.name} engagements.
            </h2>
          </div>
          <StaggerReveal className="mt-10 grid gap-4 lg:grid-cols-2">
            {page.engagements.map((engagement) => (
              <div key={engagement} className="flex min-h-0 gap-3 rounded-[22px] border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--text-secondary)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--rose)]" aria-hidden="true" />
                <span className="min-w-0">{engagement}</span>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Related services</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
              Services that support your {page.name} stack.
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {page.relatedServices.map((link) => (
              <ButtonLink key={link.href} href={link.href} variant="secondary">
                {link.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection title={`${page.name} questions.`} items={page.faq} />

      <ContactCta title={`Discuss your ${page.name} infrastructure with CloudOpsync.`} />
    </SiteFrame>
  );
}
