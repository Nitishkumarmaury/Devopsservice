import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  openGraphType?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const isArticle = openGraphType === "article";

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: openGraphType,
      ...(isArticle
        ? {
            publishedTime,
            modifiedTime,
            authors,
            tags,
          }
        : {}),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
