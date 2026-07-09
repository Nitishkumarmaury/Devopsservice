import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/layout/site-frame";
import { siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description: "Terms for Torvique website information, consultation scope, delivery, support, and service agreements.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteFrame>
      <section className="mx-auto max-w-3xl px-5 py-32 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-rose-700 transition hover:text-rose-900">Back to home</Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">Terms</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-[var(--text-secondary)]">
          <p>
            These terms outline how {siteConfig.name} presents DevOps and cloud engineering services through this website.
          </p>
          <p>
            Project scope, deliverables, access, payment schedule, response windows, handover requirements, and support terms should be defined in a written proposal or agreement before implementation begins.
          </p>
          <p>
            No website content creates a guaranteed uptime commitment, emergency response promise, or fixed service-level agreement unless those details are explicitly defined in a client contract.
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
