import type { Metadata } from "next";
import { ArrowRight, Cloud } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { cloudPages } from "@/data/cloud-pages";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cloud Infrastructure Consulting | AWS, Azure, Google Cloud",
  description:
    "Cloud engineering consulting for AWS, Azure, and Google Cloud. Practical infrastructure, migration, cost optimization, and production reliability for startups and SaaS teams.",
  path: "/cloud",
});

export default function CloudIndexPage() {
  return (
    <SiteFrame>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Cloud", path: "/cloud" }]} />
      <PageHero
        eyebrow="Cloud"
        title="Cloud infrastructure you can actually operate."
        actions={
          <ButtonLink href="/services">
            Explore Cloud Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        Cloud engineering guidance across AWS, Azure, and Google Cloud with a practical focus on reliability,
        cost control, security, and operational handover.
      </PageHero>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <StaggerReveal className="grid gap-5 lg:grid-cols-3">
            {cloudPages.map((page) => (
              <article
                key={page.slug}
                className="flex h-full flex-col rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <Cloud className="h-7 w-7 text-[var(--rose-dark)]" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{page.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{page.intro}</p>
                <ButtonLink href={`/cloud/${page.slug}`} variant="ghost" className="mt-5 w-fit px-0 justify-start">
                  Learn more
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <ContactCta title="Unsure which cloud fits your workload? Start with a consultation." />
    </SiteFrame>
  );
}
