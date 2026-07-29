import Link from "next/link";
import { ArrowRight, CalendarCheck, Mail, MapPin, RadioTower } from "lucide-react";
import { seoArticles } from "@/data/seo-articles";
import { seoMoneyPages } from "@/data/seo-pages";
import { ButtonLink } from "@/components/ui/button";
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
    <footer className="relative z-10 border-t border-border bg-canvas">
      {/* Consultation banner */}
      <div className="border-b border-border bg-canvas-soft">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-secondary">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Enterprise consultation
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-secondary">
              Bring your deployment, monitoring, Linux, or cloud infrastructure challenge and get a practical next step.
            </p>
          </div>
          <ButtonLink href={consultationHref} variant="primary" className="shrink-0">
            Book a Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.8fr_0.7fr_1fr_0.9fr] lg:px-8">
        {/* Brand column */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3 transition hover:opacity-80">
            <span className="font-mono text-base font-bold tracking-widest text-ink">
              {siteConfig.name.toUpperCase()}
            </span>
          </Link>
          <p className="mt-2 font-mono text-xs text-ink-muted">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-secondary">
            Production deployment and managed DevOps support for Node.js, Next.js and NestJS applications on AWS and DigitalOcean.
          </p>
          <div className="mt-5 flex flex-col gap-3 font-mono text-xs text-ink-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {siteConfig.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <RadioTower className="h-3.5 w-3.5" aria-hidden="true" />
              Available for remote infrastructure projects
            </span>
          </div>
          {socialLinks.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="border border-border px-3 py-1.5 font-mono text-xs text-ink-secondary transition hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn
          title="Services"
          links={seoMoneyPages.map((page) => ({ label: page.shortTitle, href: `/${page.slug}` }))}
        />
        <FooterColumn title="Resources" links={resourceLinks} />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-ink-secondary transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <p className="font-mono text-xs text-ink-muted">
            {siteConfig.name.toUpperCase()} — © {year} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink">{title}</p>
      <nav aria-label={`Footer ${title}`} className="mt-4 grid gap-2.5">
        {links.map((link) => (
          <Link
            key={`${title}-${link.href}`}
            href={link.href}
            className="font-mono text-sm text-ink-secondary transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
