import Image from "next/image";
import { Download, FileCheck2, Mail, MapPin, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/constants";

export function AboutSection() {
  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <FadeIn>
            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-sm items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] shadow-glow">
              <div className="absolute inset-4 rounded-lg border border-dashed border-white/12" />
              <div className="text-center">
                <div className="mx-auto grid place-items-center">
                  <Image
                    src={siteConfig.logoFull}
                    alt="CloudOpsync"
                    width={siteConfig.logoWidth}
                    height={siteConfig.logoHeight}
                    className="h-28 w-auto object-contain sm:h-32"
                    unoptimized
                  />
                </div>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Founded by {siteConfig.founder}</p>
                <p className="mt-2 text-sm text-slate-400">{siteConfig.type}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <SectionHeading title="Service-based DevOps and cloud engineering." eyebrow="About CloudOpsync">
              <p>
                CloudOpsync helps startups, SaaS teams, SMBs, and agencies deploy, maintain, monitor, and troubleshoot modern web applications and production infrastructure.
              </p>
              <p>
                Founded by {siteConfig.founder}, the company brings hands-on DevOps experience across Linux server administration, cloud deployments, CI/CD automation, reverse proxy configuration, SSL, process management, infrastructure monitoring, performance investigation, and production incident resolution.
              </p>
              <p>
                The focus is straightforward: build infrastructure that is understandable, reliable, secure, and easier for development teams to operate.
              </p>
            </SectionHeading>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
                <ShieldCheck className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                Production readiness reviews
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
                <FileCheck2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                Handover-focused delivery
              </div>
              {siteConfig.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                  <Mail className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                  {email}
                </a>
              ))}
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                {siteConfig.location}
              </div>
            </div>

            <ButtonLink href={siteConfig.profileDocument} variant="secondary" className="mt-6">
              <Download className="h-4 w-4" aria-hidden="true" />
              Request capability document
            </ButtonLink>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
