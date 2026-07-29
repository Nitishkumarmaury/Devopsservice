import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { caseStudies } from "@/data/case-studies";
import { seoArticles } from "@/data/seo-articles";
import { seoMoneyPages } from "@/data/seo-pages";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const highPriorityRoutes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/solutions`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/process`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/about`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/advisor`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/case-studies`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/blog`, priority: 0.6, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/faq`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
  ].map((r) => ({ ...r, lastModified: now }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const caseStudyRoutes = caseStudies.map((caseStudy) => ({
    url: `${baseUrl}/case-studies/${caseStudy.slug}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const seoPageRoutes = seoMoneyPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const articleRoutes = seoArticles.map((article) => ({
    url: `${baseUrl}/${article.slug}`,
    lastModified: now,
    priority: 0.5,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...highPriorityRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
    ...seoPageRoutes,
    ...articleRoutes,
  ];
}
