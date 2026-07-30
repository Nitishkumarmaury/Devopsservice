import type { Metadata } from"next";
import Link from"next/link";
import { SiteFrame } from"@/components/layout/site-frame";
import { FadeIn } from"@/components/ui/fade-in";
import { createPageMetadata } from"@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
 title:"Thank You",
 description:"Thank you page for CloudOpsync project inquiries.",
 path:"/thank-you",
 noIndex: true,
});

export default function ThankYouPage() {
 return (
 <SiteFrame>
 <section className="mx-auto flex min-h-[80vh] max-w-3xl items-center px-5 py-32 text-center sm:px-6 lg:px-8">
 <FadeIn className="glass w-full p-10">
 <p className="text-sm font-medium uppercase tracking-[0.22em] text-rose-700">Thank you</p>
 <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">We received your inquiry.</h1>
 <p className="mt-4 text-lg leading-8 text-ink-secondary">
 The message will be reviewed and followed up with a practical next step.
 </p>
 <Link href="/"className="aurora-gradient mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_46px_rgba(14,165,183,0.25)]">
 Back to home
 </Link>
 </FadeIn>
 </section>
 </SiteFrame>
 );
}
