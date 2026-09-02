export type CaseStudy = {
  slug: string;
  category: string;
  problem: string;
  approach: string;
  technologies: string[];
  outcome: string;
  constraints: readonly string[];
  investigation: readonly string[];
  validation: readonly string[];
  lessons: readonly string[];
  relatedServiceSlug: string;
  metrics?: readonly string[];
  testimonial?: {
    quote: string;
    name: string;
    position: string;
    company: string;
    linkedinUrl?: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-application-production-deployment",
    category: "Multi-Application Production Deployment",
    problem: "Several application services needed dependable deployment, proxying, SSL, and environment separation.",
    approach:
      "Deployed and managed multiple Next.js and NestJS services using PM2, Apache reverse proxy, SSL automation, and environment-specific CI/CD pipelines.",
    technologies: ["Next.js", "NestJS", "PM2", "Apache", "SSL", "CI/CD"],
    outcome: "Documented deployment path, SSL and proxy configuration, and safer release operations.",
    constraints: ["Existing server conventions had to be respected", "Deployment needed clear rollback notes", "Environment values required careful handling"],
    investigation: ["Reviewed runtime requirements", "Checked process management", "Mapped proxy and SSL routing"],
    validation: ["Application routes verified", "SSL and proxy behavior checked", "Deployment notes prepared"],
    lessons: ["Production deployment is strongest when process management, proxying, and handover are treated together."],
    relatedServiceSlug: "application-deployment",
  },
  {
    slug: "centralized-infrastructure-monitoring",
    category: "Centralized Infrastructure Monitoring",
    problem: "Production services were running without reliable visibility into uptime, server health, or application checks.",
    approach:
      "Built a Prometheus and Grafana monitoring environment using Node Exporter, Blackbox Exporter, and custom application health checks.",
    technologies: ["Prometheus", "Grafana", "Node Exporter", "Blackbox Exporter"],
    outcome: "Dashboards, health signals, and alerting paths that make production behavior easier to act on.",
    constraints: ["Monitoring needed to remain lightweight", "Signals had to be understandable for handover", "Alerts needed a practical response path"],
    investigation: ["Identified important service checks", "Reviewed server resource signals", "Mapped dashboard and alert priorities"],
    validation: ["Exporter targets verified", "Dashboards reviewed", "Health checks tested"],
    lessons: ["Monitoring should start with signals teams can actually understand and respond to."],
    relatedServiceSlug: "monitoring-observability",
  },
  {
    slug: "production-performance-investigation",
    category: "Production Performance Investigation",
    problem: "A live application needed diagnosis across proxy saturation, Node.js memory pressure, and slow endpoints.",
    approach:
      "Investigated Apache worker saturation, Node.js memory pressure, slow endpoints, server load, and application-level errors in a live production environment.",
    technologies: ["Apache", "Node.js", "PM2", "Linux", "Logs"],
    outcome: "Root-cause investigation notes, stabilization steps, and a clearer path for the next release window.",
    constraints: ["Live production behavior needed careful review", "Changes had to be reversible", "Findings needed to separate server and application factors"],
    investigation: ["Reviewed Apache and PM2 behavior", "Checked CPU, memory, and logs", "Mapped slow routes and error signals"],
    validation: ["Stabilization steps documented", "Server health reviewed", "Next release recommendations prepared"],
    lessons: ["Production performance work improves when infrastructure, process manager, and application logs are reviewed together."],
    relatedServiceSlug: "linux-server-security",
  },
  {
    slug: "automated-cicd-deployment",
    category: "Automated CI/CD Deployment",
    problem: "Manual releases were slow, inconsistent, and difficult to validate safely after deployment.",
    approach:
      "Created Bitbucket Pipelines for automated builds, secure artifact transfer, server-side deployment, process restart, and health validation.",
    technologies: ["Bitbucket Pipelines", "SSH", "PM2", "Health Checks"],
    outcome: "Repeatable release pipeline with validation checks, controlled restart steps, and handover notes.",
    constraints: ["Deployment secrets needed secure handling", "Server-side release steps needed predictable behavior", "Health checks needed to be simple and useful"],
    investigation: ["Mapped manual release steps", "Reviewed build and restart commands", "Identified deployment validation checks"],
    validation: ["Pipeline run reviewed", "Health check step confirmed", "Rollback notes prepared"],
    lessons: ["Automation works best when every step is documented, repeatable, and easy to validate after release."],
    relatedServiceSlug: "cicd-automation",
  },
];

export const caseStudyCategories = [
  "Production Deployment",
  "Infrastructure Monitoring",
  "Performance Investigation",
  "CI/CD Automation",
  "Server Migration",
  "Production Recovery",
] as const;

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
