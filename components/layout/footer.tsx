import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Mail, MapPin, RadioTower } from "lucide-react";
import { seoArticles } from "@/data/seo-articles";
import { seoMoneyPages } from "@/data/seo-pages";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { consultationHref, siteConfig } from "@/lib/constants";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
];

const resourceLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Guides", href: "/blog" },
  { label: "DevOps FAQ", href: "/faq" },
  ...seoArticles.slice(0, 3).map((article) => ({ label: article.h1, href: `/${article.slug}` })),
  { label: "Cloud Architecture Advisor", href: "/advisor" },
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
    <footer className="relative z-10 overflow-hidden border-t border-[#26324a] bg-[var(--navy)] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(61,184,197,0.16),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(213,166,69,0.12),transparent_28%)]" />
      <ScrollReveal className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.5fr_0.7fr_1fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex w-fit flex-col gap-3">
            <Image
              src={siteConfig.logoFull}
              alt="CloudOpsync"
              width={siteConfig.logoWidth}
              height={siteConfig.logoHeight}
              className="h-24 w-auto object-contain sm:h-28"
              unoptimized
            />
            <span className="text-sm text-white/64">{siteConfig.tagline}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/68">
            Production deployment and managed DevOps support for Node.js, Next.js and NestJS applications on AWS and DigitalOcean.
          </p>
          <p className="mt-4 text-sm font-semibold text-rose-100">Designed and engineered for reliability.</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/68">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-rose-200" aria-hidden="true" />
              {siteConfig.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <RadioTower className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              Available for remote infrastructure projects
            </span>
          </div>
          {socialLinks.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/72 transition hover:border-cyan-200/50 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn
          title="Services"
          links={seoMoneyPages.map((page) => ({ label: page.shortTitle, href: `/${page.slug}` }))}
        />
        <FooterColumn title="Resources" links={resourceLinks} />

        <div className="rounded-[24px] border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] lg:col-span-4">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Enterprise consultation
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/64">
                Bring your deployment, monitoring, Linux, or cloud infrastructure challenge and get a practical next step.
              </p>
            </div>
            <Link
              href={consultationHref}
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2.5 text-sm font-semibold text-[var(--navy)] shadow-[0_16px_44px_rgba(53,214,237,0.16)] transition hover:-translate-y-0.5 hover:bg-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-sm text-white/60 lg:col-span-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 font-medium text-white transition hover:border-rose-200/60 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-200"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
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
            className="transition hover:text-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
