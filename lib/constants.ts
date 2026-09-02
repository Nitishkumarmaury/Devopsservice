export const siteConfig = {
  name: "CloudOpsync",
  legalName: "CloudOpsync",
  founder: "Nitish Maurya",
  type: "DevOps and Cloud Engineering Services",
  tagline: "DevOps and Cloud Engineering",
  logo: "/brand/CloudOpsync-removebg-preview.png",
  logoWordmark: "/brand/CloudOpsync-removebg-preview.png",
  logoFull: "/brand/CloudOpsync-removebg-preview.png",
  logoWidth: 612,
  logoHeight: 408,
  // Normalize site URL: prefer NEXT_PUBLIC_SITE_URL but avoid showing Vercel preview host in sitemaps.
  // If NEXT_PUBLIC_SITE_URL points to a preview domain (devopsservice.vercel.app), fall back to the canonical domain.
  url: (() => {
    let envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    if (!envUrl || envUrl.includes("devopsservice.vercel.app")) return "https://cloudopsync.com";
    if (envUrl.startsWith("http://")) {
      envUrl = envUrl.replace(/^http:\/\//, "https://");
    }
    return envUrl;
  })(),
  email: "support@cloudopsync.com",
  supportEmail: "support@cloudopsync.com",
  infoEmail: "info@cloudopsync.com",
  emails: ["support@cloudopsync.com", "info@cloudopsync.com"],
  phone: "+91 9555179269",
  whatsappNumber: "919555179269",
  whatsappContactUrl: "https://wa.me/919555179269?text=Hi%20CloudOpsync%2C%20I%27m%20interested%20in%20your%20DevOps%20and%20cloud%20engineering%20services.",
  whatsappGroupUrl: "https://chat.whatsapp.com/Erjd9KP6m3B6PYV4XkgZOx?s=cl&p=i&ilr=2&amv=2",
  location: "Remote - India / International",
  description:
    "Cloud consulting, DevOps, CI/CD, Kubernetes, monitoring, and managed cloud support for startups, SaaS teams, SMBs, and agencies.",
  social: {
    linkedin: "",
    github: "",
    instagram: "https://www.instagram.com/cloudopsync",
  },
  profileDocument: "/contact",
} as const;

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Process", href: "/process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/blog" },
  { label: "Advisor", href: "/advisor" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const consultationHref =
  "/contact?requestType=Book%20Consultation&projectType=DevOps%20Consulting%20and%20Production%20Support&projectTimeline=This%20week&estimatedBudget=Not%20decided";

export const projectTypes = [
  "DevOps Consulting and Production Support",
  "AWS and DigitalOcean Cloud Infrastructure",
  "CI/CD Pipeline Automation",
  "Next.js, NestJS and Node.js Deployment",
  "Docker and Container Deployment",
  "Linux Server Management and Security",
  "Monitoring, Grafana and Alerting",
  "Managed DevOps and Emergency Support",
  "Cloud Infrastructure",
  "Cloud Consulting and Migration",
  "AWS Consulting Services",
  "Azure DevOps Consulting",
  "Kubernetes Consulting",
  "Infrastructure as Code Services",
  "Multicloud Architecture Design",
  "CI/CD Pipeline",
  "Docker and Kubernetes",
  "Monitoring and Observability",
  "Server Migration",
  "Performance Optimization",
  "Production Troubleshooting",
  "Ongoing DevOps Support",
  "Other",
] as const;

export const requestTypes = [
  "Project Inquiry",
  "Book Consultation",
  "Production Audit",
  "Emergency Support",
  "Pricing Request",
] as const;

export const budgetOptions = [
  "Under $1,000",
  "$1,000-$3,000",
  "$3,000-$7,500",
  "$7,500-$15,000",
  "$15,000+",
  "Not decided",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "This week",
  "This month",
  "1-3 months",
  "Planning phase",
  "Not decided",
] as const;
