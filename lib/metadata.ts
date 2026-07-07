import type { Metadata } from "next";
import { siteConfig } from "./constants";

const sameAs = Object.values(siteConfig.social).filter((url) => url.startsWith("https://"));

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | DevOps, Cloud Infrastructure and CI/CD Engineering`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} | DevOps, Cloud Infrastructure and CI/CD Engineering`,
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
    title: `${siteConfig.name} | DevOps and Cloud Engineering`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }],
  },
};

export const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    sameAs,
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: "International",
    serviceType: [
      "Cloud infrastructure architecture",
      "CI/CD pipeline development",
      "Docker and Kubernetes deployment",
      "Infrastructure monitoring",
      "Production troubleshooting",
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    priceRange: "$$",
    sameAs,
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.founder,
    jobTitle: "DevOps and Cloud Engineer",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    url: siteConfig.url,
    sameAs,
  },
];
