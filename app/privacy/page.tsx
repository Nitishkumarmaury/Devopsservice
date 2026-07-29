import type { Metadata } from"next";
import Link from"next/link";
import { SiteFrame } from"@/components/layout/site-frame";
import { FadeIn } from"@/components/ui/fade-in";
import { siteConfig } from"@/lib/constants";
import { createPageMetadata } from"@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
 title:"Privacy Policy",
 description:"Privacy policy for CloudOpsync website inquiries and project consultation data.",
 path:"/privacy",
});

export default function PrivacyPage() {
 return (
 <SiteFrame>
 <section className="mx-auto max-w-3xl px-5 py-32 sm:px-6 lg:px-8">
 <FadeIn>
 <Link href="/"className="text-sm font-semibold text-rose-700 transition hover:text-rose-900">Back to home</Link>
 <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
 <div className="mt-6 space-y-5 text-base leading-8 text-ink-secondary">
 <p>
 This privacy policy explains how {siteConfig.name} handles inquiry information submitted through the website.
 </p>
 <p>
 Inquiry data may include name, work email, company, project details, infrastructure context, budget range, and timeline. This information is used to respond to the inquiry and prepare practical recommendations.
 </p>
 <p>
 Production credentials, secrets, API keys, and private infrastructure details should only be shared through agreed secure channels after an engagement scope is confirmed.
 </p>
 <p>
 For privacy questions or data-removal requests, contact {siteConfig.email}.
 </p>
 </div>
 </FadeIn>
 </section>
 </SiteFrame>
 );
}
