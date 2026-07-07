import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { caseStudies } from "@/data/case-studies";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/solutions",
    "/advisor",
    "/process",
    "/case-studies",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/thank-you",
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
