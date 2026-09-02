import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ContactCta } from "@/components/ui/contact-cta";
import { PageHero } from "@/components/ui/page-hero";
import { CaseStudyShowcase } from "@/components/sections/case-study-showcase";
import { caseStudies, caseStudyCategories } from "@/data/case-studies";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DevOps Case Studies",
  description:
    "Practical DevOps and cloud engineering case-study patterns covering production deployment, monitoring, performance investigation, CI/CD automation, migration, and recovery.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ]}
      />
      <PageHero eyebrow="Case studies" title="Production engineering patterns without inflated claims." dark>
        These examples describe engagement categories, constraints, engineering approach, validation, and client value
        without fabricated identities, revenue numbers, percentages, or quotes.
      </PageHero>

      <CaseStudyShowcase studies={caseStudies} categories={caseStudyCategories} />

      <ContactCta title="Discuss a similar production challenge." />
    </SiteFrame>
  );
}
