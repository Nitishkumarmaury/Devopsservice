import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { caseStudies } from "@/data/case-studies";
import { seoArticles } from "@/data/seo-articles";
import { seoMoneyPages } from "@/data/seo-pages";
import { services } from "@/data/services";

type SitemapRoute = {
  path: "" | `/${string}`;
  lastModified?: string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

const LAST_UPDATED = new Date().toISOString().split("T")[0];

const staticRoutes: SitemapRoute[] = [
  { path: "", lastModified: LAST_UPDATED, changeFrequency: "daily", priority: 1.0 },
  { path: "/services", lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.9 },
  { path: "/solutions", lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.8 },
  { path: "/process", lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
  { path: "/case-studies", lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", lastModified: LAST_UPDATED, changeFrequency: "daily", priority: 0.8 },
  { path: "/pricing", lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy", lastModified: LAST_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", lastModified: LAST_UPDATED, changeFrequency: "yearly", priority: 0.3 },
];

function toSitemapEntry({ path, lastModified, changeFrequency, priority }: SitemapRoute): MetadataRoute.Sitemap[number] {
  const entry: MetadataRoute.Sitemap[number] = {
    url: `${siteConfig.url}${path}`,
    changeFrequency: changeFrequency ?? "weekly",
    priority: priority ?? 0.7,
  };

  if (lastModified) {
    entry.lastModified = lastModified;
  }

  return entry;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const rawRoutes: SitemapRoute[] = [
    ...staticRoutes,
    ...seoMoneyPages.map((page) => ({
      path: `/${page.slug}` as const,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...seoArticles.map((article) => ({
      path: `/${article.slug}` as const,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      path: `/services/${service.slug}` as const,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((caseStudy) => ({
      path: `/case-studies/${caseStudy.slug}` as const,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const seenPaths = new Set<string>();
  const uniqueRoutes: SitemapRoute[] = [];

  for (const route of rawRoutes) {
    if (!seenPaths.has(route.path)) {
      seenPaths.add(route.path);
      uniqueRoutes.push(route);
    }
  }

  return uniqueRoutes.map(toSitemapEntry);
}

