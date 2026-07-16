import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { PageHero } from "@/components/ui/page-hero";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { TechnologyGrid } from "@/components/sections/technology-grid";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cloud and DevOps Services",
  description:
    "Evidence-led DevOps services for cloud infrastructure, CI/CD automation, application deployment, Linux server management, monitoring, and managed production support.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Services"
        title="Cloud and DevOps services designed around measurable production reliability."
        dark
        actions={
          <>
            <ButtonLink href="/contact?requestType=Book%20Consultation">
              Discuss a service
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#service-showcase" variant="secondary" className="border-white/14 bg-white/10 text-white shadow-[0_16px_44px_rgba(0,0,0,0.16)] hover:border-cyan-200/40 hover:bg-white/16 hover:text-white">
              Compare services
            </ButtonLink>
          </>
        }
        visual={
          <div className="relative h-64 overflow-hidden rounded-[28px] border border-white/14 bg-white/8 shadow-[0_34px_110px_rgba(0,0,0,0.24)] sm:aspect-[4/3] sm:h-auto sm:min-h-[320px]">
            <Image
              src="/images/devops/cloud-rack-reliability-card.jpg"
              alt="Cloud server rack representing reliable infrastructure operations"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/78 via-[#06111f]/12 to-transparent" />
          </div>
        }
      >
        From cloud setup to deployment automation, monitoring, troubleshooting, and support, each service is scoped
        around observable signals, controlled change, and handover evidence.
      </PageHero>

      <section id="service-showcase" className="relative overflow-hidden bg-[var(--background-soft)] py-16 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(14,165,183,0.08),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(139,108,255,0.07),transparent_28%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <ServiceShowcase services={services} />
        </div>
      </section>

      <TechnologyGrid />

      <ContactCta />
    </SiteFrame>
  );
}
