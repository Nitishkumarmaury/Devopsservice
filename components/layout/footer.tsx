import Link from "next/link";
import { Mail, MapPin, RadioTower } from "lucide-react";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/constants";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
];

const resourceLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Cloud Architecture Advisor", href: "/advisor" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[#26324a] bg-[var(--navy)] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/80 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(214,107,154,0.2),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(118,103,216,0.18),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.5fr_0.7fr_1fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="aurora-gradient grid h-12 w-12 place-items-center rounded-2xl border border-white/20 text-sm font-black text-white shadow-[0_14px_34px_rgba(214,107,154,0.18)]">
              DS
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">{siteConfig.name}</span>
              <span className="mt-1 block text-sm text-white/64">{siteConfig.tagline}</span>
            </span>
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
        </div>

        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn
          title="Services"
          links={services
            .filter((service) =>
              [
                "cloud-infrastructure",
                "cicd-automation",
                "application-deployment",
                "docker-containers",
                "linux-server-security",
                "monitoring-observability",
                "managed-devops-support",
              ].includes(service.slug),
            )
            .map((service) => ({ label: service.shortTitle, href: `/services/${service.slug}` }))}
        />
        <FooterColumn title="Resources" links={resourceLinks} />

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
      </div>
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
