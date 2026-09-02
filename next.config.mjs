import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
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
  poweredByHeader: false,
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
    /** SEO duplicate-URL elimination: 301 redirect old slugs → canonical /services/ paths */
    const seoRedirects = [
      { source: "/devops-consulting", destination: "/services/devops-consulting" },
      { source: "/devops-consulting-services", destination: "/services/devops-consulting" },
      { source: "/devops-for-startups", destination: "/services/devops-consulting" },
      { source: "/platform-engineering-services", destination: "/services/devops-consulting" },
      { source: "/ci-cd-consulting", destination: "/services/cicd-automation" },
      { source: "/cicd-automation-services", destination: "/services/cicd-automation" },
      { source: "/azure-devops-consulting", destination: "/services/cicd-automation" },
      { source: "/infrastructure-as-code-services", destination: "/services/cicd-automation" },
      { source: "/cloud-infrastructure-services", destination: "/services/cloud-infrastructure" },
      { source: "/cloud-computing-services", destination: "/services/cloud-infrastructure" },
      { source: "/cloud-consulting-services", destination: "/services/cloud-infrastructure" },
      { source: "/aws-consulting-services", destination: "/services/cloud-infrastructure" },
      { source: "/aws-ec2-deployment", destination: "/services/cloud-infrastructure" },
      { source: "/cloud-migration-services", destination: "/services/cloud-infrastructure" },
      { source: "/cloud-architecture-design", destination: "/services/cloud-infrastructure" },
      { source: "/multicloud-architecture-design", destination: "/services/cloud-infrastructure" },
      { source: "/cloud-cost-optimization", destination: "/services/cloud-infrastructure" },
      { source: "/ai-infrastructure-services", destination: "/services/cloud-infrastructure" },
      { source: "/disaster-recovery-cloud-backup", destination: "/services/cloud-infrastructure" },
      { source: "/google-cloud-consulting-services", destination: "/services/cloud-infrastructure" },
      { source: "/digitalocean-consulting", destination: "/services/cloud-infrastructure" },
      { source: "/oracle-cloud-consulting-services", destination: "/services/cloud-infrastructure" },
      { source: "/docker-kubernetes-consulting", destination: "/services/docker-containers" },
      { source: "/kubernetes-consulting", destination: "/services/docker-containers" },
      { source: "/monitoring-alerting", destination: "/services/monitoring-observability" },
      { source: "/observability-services", destination: "/services/monitoring-observability" },
      { source: "/sre-consulting-services", destination: "/services/monitoring-observability" },
      { source: "/managed-cloud-services", destination: "/services/managed-devops-support" },
      { source: "/devsecops-consulting", destination: "/services/linux-server-security" },
      { source: "/nextjs-nestjs-deployment", destination: "/services/application-deployment" },
    ].map((r) => ({ ...r, permanent: true }));

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
      ...seoRedirects,
    ];
  },
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
