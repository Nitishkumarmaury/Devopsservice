import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { ContactSection } from "@/components/sections/contact";
import { PageHero } from "@/components/ui/page-hero";
import { requirePageSession } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/route-metadata";

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Contact DevOps Service Studio",
  description:
    "Book a consultation or send a scoped DevOps, cloud infrastructure, CI/CD, deployment, monitoring, or production support inquiry.",
  path: "/contact",
});

function pathWithSearch(path: string, params?: Record<string, string | string[] | undefined>) {
  const search = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => search.append(key, item));
    } else if (value) {
      search.set(key, value);
    }
  });

  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  await requirePageSession(pathWithSearch("/contact", params));

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
