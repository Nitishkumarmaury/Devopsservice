export const problemItems = [
  "Manual and risky deployments",
  "Production downtime during releases",
  "Unmonitored servers",
  "Unexpected cloud bills",
  "Slow applications",
  "Expired SSL certificates",
  "Poor backup strategies",
  "Infrastructure that cannot scale",
  "No visibility into system failures",
  "Development and production environment differences",
] as const;

export const resolutionLogs = [
  "Deployment strategy updated",
  "Health checks configured",
  "SSL certificate active",
  "PM2 processes synchronized",
  "Prometheus target healthy",
  "Backup verification completed",
] as const;

export const workflowStages = [
  {
    label: "Plan",
    text: "Clarify goals, risks, constraints, and success criteria.",
  },
  {
    label: "Architect",
    text: "Design the infrastructure, access, release path, and monitoring plan.",
  },
  {
    label: "Automate",
    text: "Create repeatable build, release, validation, and rollback workflows.",
  },
  {
    label: "Secure",
    text: "Harden access, proxying, SSL, firewall rules, and backup coverage.",
  },
  {
    label: "Deploy",
    text: "Ship with controlled rollout steps and clear validation checks.",
  },
  {
    label: "Observe",
    text: "Track uptime, resource usage, response behavior, and failure signals.",
  },
  {
    label: "Optimize",
    text: "Tune performance, capacity, cloud spend, and operating routines.",
  },
] as const;

export const solutions = [
  {
    name: "Startups",
    summary: "Fast foundations for teams that need to launch without carrying fragile deployment habits into production.",
    bullets: [
      "Fast but reliable infrastructure setup",
      "Affordable cloud architecture",
      "Automated deployment",
      "Basic production monitoring",
      "Scalable foundations",
    ],
  },
  {
    name: "Growing SaaS",
    summary: "Production systems for SaaS teams that need safer releases, clearer visibility, and room to scale.",
    bullets: [
      "Staging and production environments",
      "Zero-downtime deployment planning",
      "Observability and alerting",
      "Security and cost optimization",
      "Scaling strategy",
    ],
  },
  {
    name: "Software Agencies",
    summary: "Repeatable infrastructure delivery for agencies managing multiple client applications and environments.",
    bullets: [
      "Repeatable deployment systems",
      "Multiple client environments",
      "White-label infrastructure support",
      "Standardized monitoring",
      "Deployment troubleshooting",
    ],
  },
  {
    name: "Production Recovery",
    summary: "Calm incident investigation and stabilization when a live system needs a practical recovery path.",
    bullets: [
      "Incident investigation",
      "Server stabilization",
      "Deployment repair",
      "Database and application troubleshooting",
      "Post-incident recommendations",
    ],
  },
] as const;

export const whyUs = [
  {
    title: "Production-First Thinking",
    text: "Every decision considers uptime, rollback, security, monitoring, maintainability, and future scale.",
  },
  {
    title: "Clear Communication",
    text: "You receive understandable updates, implementation details, risks, and practical recommendations without unnecessary technical complexity.",
  },
  {
    title: "Automation Over Repetition",
    text: "Repeatable tasks are automated to reduce deployment risk, human error, and engineering time.",
  },
  {
    title: "Monitoring by Default",
    text: "Infrastructure is not considered complete until its health, availability, and performance can be measured.",
  },
  {
    title: "Practical Architecture",
    text: "Solutions are selected according to your actual requirements, team, traffic, and budget, not unnecessary enterprise complexity.",
  },
] as const;

export const engagementProcess = [
  {
    title: "Discover",
    deliverable: "Current-state context, goals, constraints, risks, and a practical first recommendation.",
  },
  {
    title: "Audit",
    deliverable: "Assessment of servers, cloud services, deployment paths, monitoring, security, backups, and operational gaps.",
  },
  {
    title: "Design",
    deliverable: "Infrastructure architecture, implementation plan, security and deployment recommendations, and support options.",
  },
  {
    title: "Implementation",
    deliverable: "Configured environments, automated pipelines, reverse proxy, SSL, process management, and cloud resources.",
  },
  {
    title: "Validate",
    deliverable: "Health checks, deployment validation, environment documentation, rollback notes, and handover guidance.",
  },
  {
    title: "Handover & Support",
    deliverable: "Dashboards, alert routes, maintenance rhythm, and optional support for release or incident windows.",
  },
] as const;
