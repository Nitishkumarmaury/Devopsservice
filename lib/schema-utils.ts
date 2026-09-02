import { siteConfig } from "@/lib/constants";

type ServiceJsonLdInput = {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  itemList?: readonly string[];
};

export function buildServiceJsonLd(input: ServiceJsonLdInput) {
  const base = {
    "@context": "https://schema.org" as const,
    "@type": "Service" as const,
    name: input.name,
    description: input.description,
    provider: {
      "@type": "ProfessionalService" as const,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
    },
    areaServed: "International" as const,
    serviceType: input.serviceType,
    url: input.url,
  };

  if (!input.itemList?.length) return base;

  return {
    ...base,
    hasOfferCatalog: {
      "@type": "OfferCatalog" as const,
      name: input.name,
      itemListElement: input.itemList.map((item) => ({
        "@type": "Offer" as const,
        itemOffered: {
          "@type": "Service" as const,
          name: item,
        },
      })),
    },
  };
}
