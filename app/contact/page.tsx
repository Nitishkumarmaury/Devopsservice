import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { ContactSection } from "@/components/sections/contact";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Hire a Freelance DevOps Consultant",
  description:
    "Tell me your stack, deployment issue or project scope and get a clear next step for DevOps consulting, AWS support or CI/CD implementation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Hire a Freelance DevOps Consultant", path: "/contact" },
        ]}
      />
      <PageHero eyebrow="Contact" title="Hire a Freelance DevOps Consultant">
        Tell me your stack, deployment issue, production risk, or project scope and get a clear next step for DevOps
        consulting, AWS support, CI/CD implementation, monitoring, or deployment work.
      </PageHero>
      <ContactSection />
    </SiteFrame>
  );
}
