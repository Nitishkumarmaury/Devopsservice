export const solutionGroups = [
  {
    name: "Startups",
    summary: "Launch with a practical production foundation before deployment habits become fragile.",
    needs: ["Fast cloud setup", "Affordable release workflow", "Basic monitoring", "Clear handover"],
    services: ["Cloud Infrastructure", "Application Deployment", "CI/CD Automation", "Monitoring"],
  },
  {
    name: "Growing SaaS companies",
    summary: "Make releases safer and infrastructure more visible as usage, features, and support demands increase.",
    needs: ["Staging and production environments", "Safer releases", "Monitoring", "Scaling preparation"],
    services: ["Cloud Infrastructure", "CI/CD Automation", "Monitoring and Observability", "Managed DevOps Support"],
  },
  {
    name: "Software agencies",
    summary: "Create repeatable deployment and monitoring patterns across client applications without hiring a full DevOps team.",
    needs: ["Multiple client environments", "Repeatable deployments", "Production troubleshooting", "Documentation"],
    services: ["Application Deployment", "CI/CD Automation", "Linux Server Security", "Managed DevOps Support"],
  },
  {
    name: "Existing production systems",
    summary: "Stabilize applications already in production with clearer release, observability, and maintenance routines.",
    needs: ["Infrastructure visibility", "Safer changes", "Server health checks", "Operational notes"],
    services: ["DevOps Consulting", "Monitoring and Observability", "Linux Server Security", "Managed DevOps Support"],
  },
  {
    name: "Production incident recovery",
    summary: "Investigate urgent failures calmly and leave behind notes that reduce repeat incidents.",
    needs: ["Incident triage", "Log review", "Rollback or stabilization", "Follow-up recommendations"],
    services: ["Emergency Support", "Linux Server Security", "Application Deployment", "Monitoring"],
  },
  {
    name: "Teams without internal DevOps support",
    summary: "Get practical infrastructure help for releases, monitoring, server maintenance, and production questions.",
    needs: ["Reliable support window", "Deployment assistance", "Monthly health checks", "Clear communication"],
    services: ["Managed DevOps Support", "DevOps Consulting", "CI/CD Automation", "Monitoring"],
  },
  {
    name: "Teams building a web product",
    summary: "Get the frontend, backend, and infrastructure built together — from first line of code to production deployment.",
    needs: ["Web or app UI", "Backend API and database", "CI/CD and cloud deployment", "Scalable architecture"],
    services: ["Web Development", "App Development", "CI/CD Automation", "Cloud Infrastructure"],
  },
  {
    name: "Businesses needing a desktop tool",
    summary: "Replace manual workflows with a cross-platform desktop application built with modern web technologies.",
    needs: ["Windows and macOS support", "Offline-capable storage", "OS-level integrations", "Packaged distribution"],
    services: ["Desktop Apps", "App Development", "Application Deployment"],
  },
] as const;
