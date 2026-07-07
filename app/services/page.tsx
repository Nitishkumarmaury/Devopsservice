import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { ServiceIcon } from "@/components/services/service-icon";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cloud and DevOps Services",
  description:
    "Production-focused DevOps, cloud infrastructure, CI/CD automation, application deployment, Linux server management, monitoring, and managed support services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Services"
        title="Cloud and DevOps services designed around production reliability."
        actions={<ButtonLink href="/contact?requestType=Book%20Consultation">Discuss a service</ButtonLink>}
      >
        From initial cloud setup to deployment automation, monitoring, troubleshooting, and ongoing support, each
        service is designed to make production infrastructure safer and easier to operate.
      </PageHero>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-6">
            {services.map((service, index) => (
              <article
                key={service.slug}
                className="grid gap-6 rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] md:grid-cols-[0.85fr_1.15fr] md:p-8"
              >
                <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-100 text-rose-700">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
                    {service.relatedPackage}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{service.description}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href={`/services/${service.slug}`}>
                      View service details
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </ButtonLink>
                    <ButtonLink
                      href={`/contact?requestType=Book%20Consultation&projectType=${encodeURIComponent(service.title)}`}
                      variant="secondary"
                    >
                      Discuss this service
                    </ButtonLink>
                  </div>
                </div>
                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--background)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Selected deliverables</p>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--text-secondary)] sm:grid-cols-2">
                    {service.details.concat(service.includes.slice(0, 2)).slice(0, 5).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--rose)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.technologies.map((tag) => (
                      <TechnologyTag key={tag}>{tag}</TechnologyTag>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </SiteFrame>
  );
}
