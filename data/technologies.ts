export const technologyStrip = [
  { name: "AWS", color: "#ffcf72" },
  { name: "DigitalOcean", color: "#7dd3fc" },
  { name: "Google Cloud", color: "#4da3ff" },
  { name: "Azure", color: "#7dd3fc" },
  { name: "Docker", color: "#7dd3fc" },
  { name: "Kubernetes", color: "#b8a5ff" },
  { name: "Terraform", color: "#b8a5ff" },
  { name: "Git", color: "#ff8a7a" },
  { name: "GitHub", color: "#f4f7fb" },
  { name: "GitHub Actions", color: "#7dd3fc" },
  { name: "Bitbucket", color: "#7dd3fc" },
  { name: "Linux", color: "#ffcf72" },
  { name: "Next.js", color: "#f4f7fb" },
  { name: "React", color: "#7dd3fc" },
  { name: "Node.js", color: "#4da3ff" },
  { name: "NestJS", color: "#ff8a7a" },
  { name: "MongoDB", color: "#4da3ff" },
  { name: "MySQL", color: "#7dd3fc" },
  { name: "Redis", color: "#ff8a7a" },
  { name: "Prometheus", color: "#ff8a7a" },
  { name: "Grafana", color: "#ffcf72" },
  { name: "Apache", color: "#ff8a7a" },
  { name: "Nginx", color: "#4da3ff" },
  { name: "Caddy", color: "#7dd3fc" },
  { name: "PM2", color: "#4da3ff" },
] as const;

export const capabilityGroups = [
  {
    title: "Cloud Platforms",
    items: ["AWS", "DigitalOcean", "Azure", "Google Cloud"],
  },
  {
    title: "Infrastructure & Servers",
    items: ["Linux", "Docker", "Kubernetes", "Terraform", "Apache", "Nginx", "Caddy", "PM2"],
  },
  {
    title: "CI/CD & Automation",
    items: ["Bitbucket Pipelines", "GitHub Actions", "Automated Testing", "Artifact Deployment", "Rollback Strategies"],
  },
  {
    title: "Monitoring & Observability",
    items: ["Prometheus", "Grafana", "Node Exporter", "Blackbox Exporter", "Netdata", "Application Health Checks"],
  },
  {
    title: "Application Deployment",
    items: ["Next.js", "React", "NestJS", "Node.js", "MongoDB", "MySQL", "Redis"],
  },
  {
    title: "Security & Operations",
    items: ["SSL/TLS Setup", "UFW & Security Groups", "Reverse Proxying", "DNS & Domain Setup", "Database Backups", "Disaster Recovery"],
  },
] as const;
