import type { Metadata } from"next";
import { SiteFrame } from"@/components/layout/site-frame";
import { CloudAdvisorSection } from"@/components/sections/cloud-advisor";
import { PageHero } from"@/components/ui/page-hero";
import { requirePageSession } from"@/lib/auth/session";
import { createPageMetadata } from"@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
 title:"Cloud Architecture Advisor",
 description:
"AI-assisted infrastructure planning workspace for preliminary deployment, monitoring, security, scaling, and DevOps recommendations.",
 path:"/advisor",
});

export default async function AdvisorPage() {
 await requirePageSession("/advisor");
 const isAiAdvisorEnabled = process.env.AI_ADVISOR_ENABLED !=="false";

 return (
 <SiteFrame>
 <PageHero eyebrow="AI-assisted infrastructure planning"title="Plan cloud architecture before the consultation."dark>
 Use the Cloud Architecture Advisor to prepare a preliminary blueprint for deployment, automation, monitoring,
 security, and scaling. Do not submit credentials, customer data, or private infrastructure addresses.
 </PageHero>
 {isAiAdvisorEnabled ? (
 <CloudAdvisorSection />
 ) : (
 <section className="bg-white py-16 sm:py-24">
 <div className="mx-auto max-w-3xl px-5 text-center text-ink-secondary">
 The advisor is currently disabled. The contact form and consultation booking remain available.
 </div>
 </section>
 )}
 </SiteFrame>
 );
}
