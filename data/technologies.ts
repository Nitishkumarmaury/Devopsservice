export const technologyStrip = [
  { name: "AWS", color: "#ffb454" },
  { name: "DigitalOcean", color: "#4da3ff" },
  { name: "Google Cloud", color: "#60d394" },
  { name: "Azure", color: "#6fb7ff" },
  { name: "Docker", color: "#43d9c5" },
  { name: "Kubernetes", color: "#7aa2ff" },
  { name: "Terraform", color: "#b18cff" },
  { name: "Git", color: "#f05032" },
  { name: "GitHub", color: "#f4f7fb" },
  { name: "GitHub Actions", color: "#4da3ff" },
  { name: "Bitbucket", color: "#4da3ff" },
  { name: "Linux", color: "#e6cc77" },
  { name: "Next.js", color: "#f4f7fb" },
  { name: "React", color: "#42aeb5" },
  { name: "Node.js", color: "#70e08f" },
  { name: "NestJS", color: "#ff7a9a" },
  { name: "MongoDB", color: "#54d98c" },
  { name: "MySQL", color: "#6fb7ff" },
  { name: "Redis", color: "#ff6b6b" },
  { name: "Prometheus", color: "#ff8a4c" },
  { name: "Grafana", color: "#ffb454" },
  { name: "Apache", color: "#ff6b8a" },
  { name: "Nginx", color: "#54d98c" },
  { name: "Caddy", color: "#43d9c5" },
  { name: "PM2", color: "#70e08f" },
] as const;

export const capabilityGroups = [
  {
    title: "Cloud Platforms",
    items: ["AWS", "DigitalOcean", "Azure", "Google Cloud"],
  },
  {
    title: "Infrastructure",
    items: ["Linux", "Docker", "Kubernetes", "Terraform", "Apache", "Nginx", "Caddy", "PM2"],
  },
  {
    title: "CI/CD",
    items: ["Bitbucket Pipelines", "GitHub Actions", "Automated Testing", "Artifact Deployment", "Rollback Strategies"],
  },
  {
    title: "Monitoring",
    items: ["Prometheus", "Grafana", "Node Exporter", "Blackbox Exporter", "Netdata", "Application Health Checks"],
  },
  {
    title: "Application Deployment",
    items: ["Next.js", "React", "NestJS", "Node.js", "MongoDB", "MySQL", "Redis"],
  },
] as const;
