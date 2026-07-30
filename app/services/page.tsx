import type { Metadata } from"next";
import Image from"next/image";
import { ArrowRight } from"lucide-react";
import { SiteFrame } from"@/components/layout/site-frame";
import { PageHero } from"@/components/ui/page-hero";
import { ServiceShowcase } from"@/components/sections/service-showcase";
import { ButtonLink } from"@/components/ui/button";
import { Container } from"@/components/ui/container";
import { ScrollReveal } from"@/components/ui/scroll-reveal";
import { services } from"@/data/services";
import { createPageMetadata } from"@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
 title:"DevOps and Development Services",
 description:
"DevOps, cloud infrastructure, CI/CD automation, web development, full-stack application development, and desktop application services — scoped around observable signals and clear handover.",
 path:"/services",
});

const devopsServices = services.filter((s) => s.category ==="devops");
const devServices = services.filter((s) => s.category ==="development");

export default function ServicesPage() {
 return (
 <SiteFrame>
 <PageHero
 eyebrow="Services"
 title="DevOps and Development — two pillars, one team."
 dark
 actions={
 <ButtonLink href="/contact?requestType=Book%20Consultation">
 Discuss a service
 <ArrowRight className="h-4 w-4"aria-hidden="true"/>
 </ButtonLink>
 }
 visual={
 <div className="relative h-64 overflow-hidden border border-white/14 bg-white/8 shadow-[0_34px_110px_rgba(0,0,0,0.24)] sm:aspect-[4/3] sm:h-auto sm:min-h-[320px]">
 <Image
 src="/images/devops/cloud-rack-reliability-card.jpg"
 alt="Cloud server rack representing reliable infrastructure operations"
 fill
 sizes="(min-width: 1024px) 38vw, 100vw"
 className="object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/78 via-[#06111f]/12 to-transparent"/>
 </div>
 }
 >
 From cloud setup to deployment automation, monitoring, web development, and desktop applications — each service
 is scoped around observable signals, controlled change, and handover evidence.
 </PageHero>

 {/* DevOps & Infrastructure */}
 <section id="devops-services"className="border-b border-border bg-canvas py-16 sm:py-24 lg:py-32">
 <Container>
 <ScrollReveal from="down"className="mb-10 max-w-2xl">
 <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand">DevOps &amp; Infrastructure</p>
 <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-ink sm:text-4xl">
 Cloud, CI/CD, containers, monitoring, and managed support.
 </h2>
 <p className="mt-4 text-base leading-8 text-ink-secondary">
 The highest-impact DevOps work for production teams — reliability review, controlled releases,
 deployment readiness, and ongoing support.
 </p>
 </ScrollReveal>
 <ServiceShowcase services={devopsServices} category="devops"/>
 </Container>
 </section>

 {/* Development Services */}
 <section id="development-services"className="border-b border-border bg-canvas-soft py-16 sm:py-24 lg:py-32">
 <Container>
 <ScrollReveal from="down"className="mb-10 max-w-2xl">
 <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">Development Services</p>
 <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-ink sm:text-4xl">
 Web apps, full-stack products, and desktop tools.
 </h2>
 <p className="mt-4 text-base leading-8 text-ink-secondary">
 End-to-end development from frontend to backend to distribution — built and deployed by the same team
 that handles your infrastructure.
 </p>
 </ScrollReveal>
 <ServiceShowcase services={devServices} category="development"/>
 </Container>
 </section>
 </SiteFrame>
 );
}
