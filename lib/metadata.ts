import type { Metadata } from "next";
import { siteConfig } from "./constants";

const sameAs = Object.values(siteConfig.social).filter((url) => url.startsWith("https://"));
const faviconIcons = [
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

export const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    email: siteConfig.email,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "sales",
      areaServed: "International",
      availableLanguage: ["English"],
    },
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
    image: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: "International",
    serviceType: [
      "DevOps consulting services",
      "Cloud consulting services",
      "AWS consulting services",
      "Azure DevOps consulting",
      "Cloud infrastructure architecture",
      "CI/CD pipeline development",
      "Docker and Kubernetes deployment",
      "Kubernetes consulting",
      "Managed cloud services",
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
];
