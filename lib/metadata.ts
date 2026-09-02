import type { Metadata } from "next";
import { services } from "@/data/services";
import { globalMarkets } from "@/data/seo-strategy";
import { siteConfig } from "./constants";

const knowsAbout = [
  "Cloud consulting and migration",
  "DevOps and platform engineering",
  "Kubernetes and cloud native",
  "Infrastructure automation",
  "Observability and SRE",
  "Cloud security and compliance readiness",
  "FinOps and resilience",
  "AI infrastructure and MLOps",
  "CI/CD automation",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Grafana",
  "Prometheus",
  "DevSecOps",
];
const areaServed = globalMarkets.map((market) => ({
  "@type": "Place",
  name: market,
}));
const contactPoint = [
  {
    "@type": "ContactPoint",
    email: siteConfig.supportEmail,
    contactType: "customer support",
    areaServed: "International",
    availableLanguage: ["English"],
  },
  {
    "@type": "ContactPoint",
    email: siteConfig.infoEmail,
    contactType: "sales",
    areaServed: "International",
    availableLanguage: ["English"],
  },
];
const faviconIcons = [
  { url: "/icons/favicon.svg", type: "image/svg+xml" },
  { url: "/favicon.ico", sizes: "any" },
  { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
];

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | DevOps and Cloud Engineering Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: siteConfig.url,
      "x-default": siteConfig.url,
    },
  },
  openGraph: {
    title: `${siteConfig.name} | DevOps and Cloud Engineering Services`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} DevOps and cloud engineering`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | DevOps and Cloud Engineering Services`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: faviconIcons,
    shortcut: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

const socialProfiles: string[] = [
  siteConfig.social.linkedin,
  siteConfig.social.github,
  siteConfig.social.instagram,
].filter(Boolean);

export const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    email: siteConfig.email,
    contactPoint,
    areaServed,
    knowsAbout,
    sameAs: socialProfiles,
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed,
    serviceType: services.map((service) => service.title),
    knowsAbout,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cloud and DevOps Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${siteConfig.url}/services/${service.slug}`,
        },
      })),
    },
    priceRange: "$$",
  },
];
