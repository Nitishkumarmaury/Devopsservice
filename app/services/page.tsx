import type { Metadata } from "next";
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
        visual={<ServicesHeroVisual />}
      >
        From cloud setup to deployment automation, monitoring, troubleshooting, and support, each service is scoped
        around observable signals, controlled change, and handover evidence.
      </PageHero>

      <section id="service-showcase" className="relative overflow-hidden bg-[var(--background-soft)] py-16 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(77,163,255,0.08),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(184,165,255,0.07),transparent_28%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <ServiceShowcase services={services} />
        </div>
      </section>

      <TechnologyGrid />

      <ContactCta />
    </SiteFrame>
  );
}

function ServicesHeroVisual() {
  const nodes = [
    "Audit",
    "Cloud",
    "CI/CD",
    "Containers",
    "Monitoring",
    "Support",
  ] as const;

  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[22px] border border-[#d6ebff]/12 bg-[#0d2338]/82 p-5 shadow-[0_34px_110px_rgba(0,0,0,0.28)]">
      <div className="absolute inset-0 soft-grid opacity-30" />
      <div className="relative grid h-full min-h-[300px] place-items-center">
        <div className="absolute h-56 w-56 rounded-full border border-[#4da3ff]/18" />
        <div className="absolute h-32 w-80 rounded-[50%] border border-[#7dd3fc]/12 rotate-[-24deg]" />
        <div className="absolute h-32 w-80 rounded-[50%] border border-[#d6ebff]/10 rotate-[26deg]" />
        <div className="relative z-10 grid h-24 w-24 place-items-center rounded-full border border-[#4da3ff]/24 bg-[#4da3ff]/12 text-center font-mono text-xs font-semibold uppercase leading-5 text-[#b9ddff] shadow-[0_0_46px_rgba(77,163,255,0.12)]">
          Service
          <br />
          Control
        </div>
        <div className="absolute inset-0">
          {nodes.map((node, index) => {
            const positions = [
              "left-[12%] top-[18%]",
              "right-[14%] top-[18%]",
              "left-[7%] top-[50%]",
              "right-[8%] top-[50%]",
              "left-[22%] bottom-[10%]",
              "right-[22%] bottom-[10%]",
            ];
            return (
              <div
                key={node}
                className={`absolute ${positions[index]} rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/72 px-3 py-2 font-mono text-xs font-semibold text-[var(--text-secondary)]`}
              >
                {String(index + 1).padStart(2, "0")} / {node}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
