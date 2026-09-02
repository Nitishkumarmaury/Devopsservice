import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { FaqSection, BuildFaqJsonLd } from "@/components/ui/faq-section";
import { PageHero } from "@/components/ui/page-hero";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { solutionPages } from "@/data/solutions";
import { createPageMetadata } from "@/lib/route-metadata";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = solutionPages.find((p) => p.slug === slug);
  if (!page) return {};
  return createPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/solutions/${page.slug}`,
  });
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const page = solutionPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const contactHref = `/contact?requestType=Book%20Consultation&projectType=${encodeURIComponent(page.title)}`;

  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: page.name, path: `/solutions/${page.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BuildFaqJsonLd(page.faq)) }} />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        actions={
          <ButtonLink href={contactHref}>
            Book a Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        {page.intro}
      </PageHero>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Common challenges</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
              What {page.name.toLowerCase()} teams usually run into.
            </h2>
          </div>
          <StaggerReveal className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
            {page.challenges.map((item) => (
              <article key={item.title} className="flex h-full flex-col rounded-[26px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.body}</p>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Recommended approach</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
              A practical path forward.
            </h2>
          </div>
          <StaggerReveal className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
            {page.approach.map((step, index) => (
              <div key={step.title} className="flex h-full flex-col rounded-[22px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-soft)]">
                <span className="font-mono text-xs font-semibold text-[var(--rose-dark)]">0{index + 1}</span>
                <h3 className="mt-2 font-semibold text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{step.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Recommended services</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
              Services that fit {page.name.toLowerCase()}.
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {page.recommendedServices.map((link) => (
              <ButtonLink key={link.href} href={link.href} variant="secondary">
                {link.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection title={`${page.name} questions.`} items={page.faq} />

      <ContactCta title={`See how CloudOpsync supports ${page.name.toLowerCase()}.`} />
    </SiteFrame>
  );
}
