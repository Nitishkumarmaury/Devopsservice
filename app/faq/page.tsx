import type { Metadata } from "next";
import { ArrowRight, HelpCircle } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { faqs } from "@/data/faqs";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DevOps FAQ for Deployment, AWS, CI/CD and Monitoring",
  description:
    "Answers to common questions about deployment, cloud setup, CI/CD pipelines, monitoring, pricing and working with a freelance DevOps consultant.",
  path: "/faq",
});

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
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
          { name: "DevOps FAQ", path: "/faq" },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        eyebrow="FAQ"
        title="DevOps FAQ"
        actions={
          <ButtonLink href="/contact?requestType=Book%20Consultation">
            Ask About Your Stack
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        Answers to common questions about deployment, AWS EC2, CI/CD pipelines, monitoring, pricing, access, timelines,
        and working with a freelance DevOps consultant.
      </PageHero>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-[22px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
                <HelpCircle className="h-5 w-5 text-[var(--rose-dark)]" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  {item.question}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta title="Still have a production question?" />
    </SiteFrame>
  );
}
