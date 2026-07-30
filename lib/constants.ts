export const siteConfig = {
  name: "CloudOpsync",
  legalName: "CloudOpsync",
  founder: "Nitish Maurya",
  type: "DevOps and Development Services",
  tagline: "DevOps & Development Services",
  logo: "/brand/CloudOpsync-removebg-preview.png",
  logoWordmark: "/brand/CloudOpsync-removebg-preview.png",
  logoFull: "/brand/CloudOpsync-removebg-preview.png",
  logoWidth: 612,
  logoHeight: 408,
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com",
  email: "nitish.henceforth@gmail.com",
  location: "Remote - India / International",
  description:
    "Service-based company offering DevOps, CI/CD, cloud infrastructure, web development, full-stack application development, and desktop application development for startups, SaaS teams, SMBs, and agencies.",
  social: {
    linkedin: "",
    github: "",
  },
  profileDocument: "/contact",
} as const;

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Process", href: "/process" },
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
  "Web Development (Next.js / React)",
  "Full-Stack Web Application Development",
  "Desktop Application Development",
  "Cloud Infrastructure",
  "Cloud Consulting and Migration",
  "AWS Consulting Services",
  "Azure DevOps Consulting",
  "Kubernetes Consulting",
  "Infrastructure as Code Services",
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
