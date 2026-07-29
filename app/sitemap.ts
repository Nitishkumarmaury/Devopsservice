import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { caseStudies } from "@/data/case-studies";
import { seoArticles } from "@/data/seo-articles";
import { seoMoneyPages } from "@/data/seo-pages";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/solutions",
    "/advisor",
    "/process",
    "/case-studies",
    "/blog",
    "/pricing",
    "/about",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    ...seoMoneyPages.map((page) => `/${page.slug}`),
    ...seoArticles.map((article) => `/${article.slug}`),
    ...services.map((service) => `/services/${service.slug}`),
    ...caseStudies.map((caseStudy) => `/case-studies/${caseStudy.slug}`),
  ];

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    })),
  ];
}
