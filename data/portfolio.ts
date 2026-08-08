export type PortfolioProject = {
  slug: string;
  name: string;
  tagline: string;
  liveUrl: string;
  industry: string;
  description: string;
  overview: string;
  technologies: string[];
  features: string[];
  clientIndustry: string;
  screenshot: string;
  gradient: string;
  accentColor: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "cravedock",
    name: "CraveDock",
    tagline: "Online Food Ordering & Delivery Platform",
    liveUrl: "https://cravedock.in",
    industry: "Food Delivery DevOps",
    description:
      "Cloud deployment and DevOps support for a production food ordering platform, including server setup, SSL, process management, and controlled releases.",
    overview:
      "CloudOpsync prepared and supported the production environment for CraveDock, a food ordering and delivery platform. Our work focused on making the application stable on cloud infrastructure with domain routing, SSL, reverse proxy setup, PM2 process management, environment configuration, and repeatable deployment steps.",
    technologies: ["AWS EC2", "Next.js", "Node.js", "MongoDB", "Nginx", "PM2", "SSL", "CI/CD"],
    features: [
      "Configured cloud server, runtime environment, and production process management",
      "Set up Nginx reverse proxy, domain routing, and SSL for secure access",
      "Prepared deployment workflow so releases can be repeated with less manual risk",
      "Stabilized Node.js application processes with PM2 restart and startup behavior",
      "Reviewed logs, resource usage, and service health after deployment",
      "Delivered handover notes for maintenance, restarts, and future improvements",
    ],
    clientIndustry: "Cloud Deployment & Production Support",
    screenshot: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-orange-500/20 via-red-500/10 to-yellow-500/20",
    accentColor: "#ff6b35",
  },
  {
    slug: "badde-taxi",
    name: "Badde Taxi Bookings",
    tagline: "Taxi Booking & Fleet Management System",
    liveUrl: "https://bookings.baddetaxi.com",
    industry: "Transportation DevOps",
    description:
      "Production deployment support for a taxi booking platform, covering server configuration, proxy routing, SSL, PM2, and release operations.",
    overview:
      "CloudOpsync helped run Badde Taxi on a dependable production setup for its booking and fleet operations platform. The engagement focused on cloud server readiness, application deployment, web-server routing, SSL configuration, process supervision, and practical release support.",
    technologies: ["React", "NestJS", "MongoDB", "DigitalOcean", "Apache", "PM2", "SSL", "Bitbucket Pipelines"],
    features: [
      "Prepared DigitalOcean production server for frontend and API services",
      "Configured Apache reverse proxy rules and SSL certificate access",
      "Managed application processes with PM2 for controlled restarts",
      "Built Bitbucket deployment flow for repeatable release steps",
      "Separated environment configuration for safer production operation",
      "Validated live routes, logs, and service health after deployment",
    ],
    clientIndustry: "Cloud Deployment & CI/CD Automation",
    screenshot: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-yellow-500/20 via-amber-500/10 to-orange-500/20",
    accentColor: "#f59e0b",
  },
  {
    slug: "jeeta-klb",
    name: "Jeeta KLB",
    tagline: "Digital Gaming & Rewards Platform",
    liveUrl: "https://jeetaklb.com/",
    industry: "Gaming Platform DevOps",
    description:
      "Cloud deployment and production operations support for a digital gaming platform with secure runtime, SSL, process management, and release automation.",
    overview:
      "CloudOpsync supported Jeeta KLB with production infrastructure and deployment practices for a live gaming and rewards platform. The work centered on server configuration, secure web access, app process stability, CI/CD release flow, and operational checks after deployment.",
    technologies: ["Next.js", "Node.js", "MongoDB", "AWS EC2", "Nginx", "PM2", "GitHub Actions", "SSL"],
    features: [
      "Configured AWS EC2 production environment for the application stack",
      "Set up Nginx reverse proxy and SSL for secure public traffic",
      "Managed Node.js and Next.js services with PM2 process supervision",
      "Added GitHub Actions deployment steps for cleaner release operations",
      "Checked production logs and runtime behavior after deployment",
      "Documented restart, deployment, and maintenance steps for handover",
    ],
    clientIndustry: "AWS Deployment & Release Automation",
    screenshot: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    accentColor: "#10b981",
  },
  {
    slug: "yanga-ride",
    name: "Yanga Ride",
    tagline: "Ride-Sharing & Transportation Platform",
    liveUrl: "https://yangaride.com/",
    industry: "Ride-Sharing DevOps",
    description:
      "Cloud infrastructure, container deployment, CI/CD, and monitoring support for a ride-sharing platform running production services.",
    overview:
      "CloudOpsync supported Yanga Ride with production infrastructure practices for a ride-sharing platform. The work covered cloud deployment, container readiness, reverse proxy configuration, release automation, and monitoring signals so the team had clearer control of live operations.",
    technologies: ["React", "NestJS", "MongoDB", "AWS", "Docker", "Nginx", "CI/CD", "Prometheus"],
    features: [
      "Prepared cloud infrastructure for frontend, backend, and database connectivity",
      "Improved deployment consistency with Docker-aware release practices",
      "Configured Nginx routing and SSL access for production services",
      "Added CI/CD workflow support for controlled application releases",
      "Introduced Prometheus-based health and resource visibility",
      "Created operational notes for deployment, validation, and support",
    ],
    clientIndustry: "Cloud Infrastructure & Monitoring",
    screenshot: "/yanga-ride.png",
    gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
    accentColor: "#3b82f6",
  },
  {
    slug: "henceforth-monitoring",
    name: "Henceforth Monitoring",
    tagline: "Infrastructure Monitoring & Observability Dashboard",
    liveUrl: "https://monitoring.henceforthsolutions.com/",
    industry: "DevOps & Infrastructure",
    description:
      "Centralized monitoring and observability setup with Prometheus metrics, Grafana dashboards, uptime checks, server health signals, and alerting paths.",
    overview:
      "CloudOpsync built a centralized monitoring environment to make production systems easier to observe and support. The setup brings server metrics, uptime checks, service availability, dashboard views, and alert paths into one operational view for faster diagnosis and cleaner handover.",
    technologies: ["Prometheus", "Grafana", "Node Exporter", "Blackbox Exporter", "Linux", "Docker", "Nginx", "SSL"],
    features: [
      "Installed Prometheus exporters for server resource visibility",
      "Configured Blackbox checks for uptime and application endpoint health",
      "Created Grafana dashboards with practical infrastructure signals",
      "Prepared alerting paths for service availability and resource issues",
      "Reviewed historical trends to support performance investigation",
      "Documented dashboard usage, targets, and maintenance steps",
    ],
    clientIndustry: "Software Development & IT Services",
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    accentColor: "#8b5cf6",
  },
];

export function getPortfolioProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
