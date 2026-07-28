import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { caseStudies } from "@/data/case-studies";
import { seoArticles } from "@/data/seo-articles";
import { seoMoneyPages } from "@/data/seo-pages";
import { services } from "@/data/services";

type SitemapRoute = {
  path: "" | `/${string}`;
  lastModified?: string;
};

const staticRoutes: SitemapRoute[] = [
  { path: "" },
  { path: "/services" },
  { path: "/solutions" },
  { path: "/advisor" },
  { path: "/process" },
  { path: "/case-studies" },
  { path: "/blog" },
  { path: "/pricing" },
  { path: "/about" },
  { path: "/faq" },
  { path: "/contact" },
  { path: "/privacy" },
  { path: "/terms" },
];

function toSitemapEntry({ path, lastModified }: SitemapRoute): MetadataRoute.Sitemap[number] {
  const entry: MetadataRoute.Sitemap[number] = {
    url: `${siteConfig.url}${path}`,
  };

  if (lastModified) {
    entry.lastModified = lastModified;
  }

  return entry;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: SitemapRoute[] = [
    ...staticRoutes,
    ...seoMoneyPages.map((page) => ({ path: `/${page.slug}` as const })),
    ...seoArticles.map((article) => ({ path: `/${article.slug}` as const, lastModified: article.updatedAt })),
    ...services.map((service) => ({ path: `/services/${service.slug}` as const })),
    ...caseStudies.map((caseStudy) => ({ path: `/case-studies/${caseStudy.slug}` as const })),
  ];

  return routes.map(toSitemapEntry);
}
