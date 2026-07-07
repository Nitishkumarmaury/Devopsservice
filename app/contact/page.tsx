import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { ContactSection } from "@/components/sections/contact";
import { PageHero } from "@/components/ui/page-hero";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact DevOps Service Studio",
  description:
    "Book a consultation or send a scoped DevOps, cloud infrastructure, CI/CD, deployment, monitoring, or production support inquiry.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteFrame>
      <PageHero eyebrow="Contact" title="Share the production problem you want solved.">
        Use the form to describe your stack, risks, timeline, and required outcome. Suitable project types include
        production deployment, CI/CD automation, monitoring, server setup, troubleshooting, and managed DevOps support.
      </PageHero>
      <ContactSection />
    </SiteFrame>
  );
}
