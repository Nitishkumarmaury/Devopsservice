import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { ContactSection } from "@/components/sections/contact";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact CloudOpsync",
  description:
    "Tell CloudOpsync about your infrastructure challenge, current stack, delivery goal, and production risk to request a practical consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact CloudOpsync", path: "/contact" },
        ]}
      />
      <PageHero eyebrow="Contact" title="Tell us about your infrastructure challenge." dark>
        Share your current stack, delivery goal, and what feels risky. The next step is a practical scope conversation,
        not a generic sales funnel.
      </PageHero>
      <ContactSection />
    </SiteFrame>
  );
}
