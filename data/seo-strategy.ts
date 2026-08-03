export const globalMarkets = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "New Zealand",
  "Singapore",
  "India",
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Europe",
  "Worldwide",
] as const;

export const enterpriseTopicClusters = [
  {
    title: "Cloud consulting and migration",
    entities: ["Cloud strategy", "cloud architecture", "AWS", "Azure", "Google Cloud", "hybrid cloud", "multicloud"],
  },
  {
    title: "DevOps and platform engineering",
    entities: ["CI/CD", "GitOps", "platform automation", "release engineering", "developer experience", "managed DevOps"],
  },
  {
    title: "Kubernetes and cloud native",
    entities: ["Kubernetes", "Docker", "Helm", "container orchestration", "microservices", "service mesh"],
  },
  {
    title: "Infrastructure automation",
    entities: ["Terraform", "OpenTofu", "Ansible", "infrastructure as code", "policy as code", "configuration management"],
  },
  {
    title: "Observability and SRE",
    entities: ["Prometheus", "Grafana", "OpenTelemetry", "logging", "alerting", "incident response", "SLOs"],
  },
  {
    title: "Cloud security and compliance readiness",
    entities: ["DevSecOps", "IAM", "secrets management", "cloud firewall", "zero trust", "SOC 2 readiness", "ISO 27001 readiness"],
  },
  {
    title: "FinOps and resilience",
    entities: ["cloud cost optimization", "backup strategy", "disaster recovery", "high availability", "autoscaling"],
  },
  {
    title: "AI infrastructure and MLOps",
    entities: ["LLM deployment", "GPU infrastructure", "MLOps", "AI cloud", "model serving", "AIOps"],
  },
] as const;

export const buyerDecisionCriteria = [
  {
    criterion: "Reliability",
    whatGoodLooksLike: "Production changes include health checks, rollback notes, monitoring, and a clear owner.",
  },
  {
    criterion: "Security",
    whatGoodLooksLike: "Access, secrets, network exposure, patching, and deployment permissions are reviewed before rollout.",
  },
  {
    criterion: "Cost control",
    whatGoodLooksLike: "Cloud sizing, idle resources, backups, logs, and scaling decisions are connected to business needs.",
  },
  {
    criterion: "Operability",
    whatGoodLooksLike: "The team receives runbooks, dashboards, release notes, and handover details they can keep using.",
  },
] as const;

export const authorityReferences = [
  {
    label: "Google Search Central",
    href: "https://developers.google.com/search/docs",
    description: "Technical SEO and structured data guidance used to keep public pages crawlable and useful.",
  },
  {
    label: "Cloud Native Computing Foundation",
    href: "https://www.cncf.io/",
    description: "Cloud native ecosystem reference for Kubernetes, observability, service mesh, and platform tooling.",
  },
  {
    label: "OpenTelemetry",
    href: "https://opentelemetry.io/",
    description: "Vendor-neutral observability reference for traces, metrics, and logs across modern systems.",
  },
  {
    label: "Terraform",
    href: "https://developer.hashicorp.com/terraform",
    description: "Infrastructure as code reference for repeatable cloud resource provisioning and review.",
  },
  {
    label: "Kubernetes",
    href: "https://kubernetes.io/",
    description: "Container orchestration reference for workloads, services, ingress, scaling, and operations.",
  },
] as const;
