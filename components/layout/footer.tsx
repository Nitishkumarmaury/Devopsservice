import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Mail, MapPin, RadioTower } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { consultationHref, siteConfig } from "@/lib/constants";

const serviceLinks = [
  { label: "DevOps Consulting", href: "/services/devops-consulting" },
  { label: "Cloud Infrastructure", href: "/services/cloud-infrastructure" },
  { label: "CI/CD", href: "/services/cicd-automation" },
  { label: "Containers", href: "/services/docker-containers" },
  { label: "Monitoring", href: "/services/monitoring-observability" },
  { label: "Managed DevOps", href: "/services/managed-devops-support" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Guides", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Architecture Advisor", href: "/advisor" },
  { label: "Pricing", href: "/pricing" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const socialLinks = [
    siteConfig.social.linkedin ? { label: "LinkedIn", href: siteConfig.social.linkedin } : null,
    siteConfig.social.github ? { label: "GitHub", href: siteConfig.social.github } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[#d6ebff]/10 bg-[#06111f] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4da3ff]/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(77,163,255,0.1),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(125,211,252,0.07),transparent_28%)]" />
      <ScrollReveal className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.45fr_0.78fr_0.72fr_0.72fr_0.52fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex w-fit flex-col gap-3">
            <Image
              src={siteConfig.logoFull}
              alt="CloudOpsync"
              width={siteConfig.logoWidth}
              height={siteConfig.logoHeight}
              className="h-20 w-auto object-contain sm:h-24"
              style={{ filter: "brightness(0) invert(1)" }}
              unoptimized
            />
            <span className="text-sm text-white/64">{siteConfig.tagline}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/68">
            Cloud and DevOps engineering practice for production infrastructure, deployment automation, monitoring,
            and operational reliability.
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/68">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#4da3ff]" aria-hidden="true" />
              {siteConfig.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <RadioTower className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" />
              Remote DevOps engineering for international teams
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {siteConfig.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#d6ebff]/12 bg-[#0d2338]/72 px-3 py-2 text-xs font-medium text-white transition hover:border-[#4da3ff]/36"
                >
                  <Mail className="h-3.5 w-3.5 text-[#4da3ff]" aria-hidden="true" />
                  {email}
                </a>
              ))}
              <a
                href={siteConfig.whatsappContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-2 text-xs font-medium text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
              >
                WhatsApp: +91 9555179269
              </a>
              <a
                href={siteConfig.whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/30 bg-[#0d2338]/72 px-3 py-2 text-xs font-medium text-[#25D366] transition hover:border-[#25D366]"
              >
                Join WhatsApp Group
              </a>
            </div>
          </div>
          {socialLinks.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-[#d6ebff]/12 bg-[#0d2338]/72 px-3 py-1.5 text-xs font-semibold text-white/72 transition hover:border-[#4da3ff]/36 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <FooterColumn title="Services" links={serviceLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Resources" links={resourceLinks} />
        <FooterColumn title="Legal" links={legalLinks} />

        <div className="rounded-[18px] border border-[#d6ebff]/10 bg-[#0d2338]/72 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] lg:col-span-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#b9ddff]">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Consultation
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/64">
                Share the stack, delivery goal, and current risk. The next step is a scoped technical conversation.
              </p>
            </div>
            <Link
              href={consultationHref}
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-lg border border-[#4da3ff]/70 bg-[#4da3ff] px-4 py-2.5 text-sm font-semibold text-[#06111f] shadow-[0_16px_44px_rgba(77,163,255,0.16)] transition hover:-translate-y-0.5 hover:bg-[#b9ddff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4da3ff]"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border-t border-[#d6ebff]/10 pt-6 text-sm text-white/60 lg:col-span-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>{siteConfig.name} does not claim official cloud partnerships unless explicitly stated.</p>
            <p>© {year} {siteConfig.legalName}. All rights reserved.</p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <nav aria-label={`Footer ${title}`} className="mt-4 grid gap-3 text-sm text-white/66">
        {links.map((link) => (
          <Link
            key={`${title}-${link.href}`}
            href={link.href}
            className="transition hover:text-[#b9ddff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4da3ff]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
