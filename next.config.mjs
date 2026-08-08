import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https: ws: wss:",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.trycloudflare.com"],
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200" },
        ],
      },
      {
        source: "/((?!sitemap\\.xml|robots\\.txt).*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.cloudopsync.com" }],
        destination: "https://cloudopsync.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "devopsservice.vercel.app" }],
        destination: "https://cloudopsync.com/:path*",
        permanent: true,
      },
    ];
  },
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
