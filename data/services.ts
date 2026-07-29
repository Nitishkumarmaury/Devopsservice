export type Service = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  icon: "cloud" | "pipeline" | "container" | "kubernetes" | "monitoring" | "security" | "performance" | "migration";
  visual: string;
  details: string[];
  technologies: string[];
  relatedPackage: string;
  problems: string[];
  includes: string[];
  notIncluded: string[];
  approach: string[];
  examples: string[];
  clientInputs: string[];
  afterImplementation: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedCaseStudySlug: string;
};

export const services: Service[] = [
  {
    slug: "devops-consulting",
    shortTitle: "DevOps Consulting",
    title: "DevOps Consulting and Production Support",
    description:
      "Practical architecture, deployment planning, incident prevention, and hands-on production support for growing teams.",
    icon: "performance",
    visual: "Audit, plan, implement, validate, handover",
    details: ["Production readiness reviews", "Release and rollback planning", "Startup and agency support"],
    technologies: ["Linux", "PM2", "Nginx", "Apache", "CI/CD", "Monitoring"],
    relatedPackage: "Monthly DevOps Care",
    problems: ["Unclear production risks", "Manual deployments", "No practical handover or support model"],
    includes: ["Production readiness review", "Deployment and rollback planning", "Infrastructure support recommendations"],
    notIncluded: ["Fake uptime guarantees", "Broad security certifications", "Unscoped platform rewrites"],
    approach: ["Clarify goals and constraints", "Review access, release flow, and monitoring", "Deliver practical next steps"],
    examples: ["Production launch plan", "Release-risk review", "Ongoing DevOps support setup"],
    clientInputs: ["Application overview", "Hosting access summary", "Current deployment process", "Known incidents or risks"],
    afterImplementation: ["Handover notes", "Validation checklist", "Support and improvement options"],
    faq: [
      {
        question: "Is this suitable before a full rebuild?",
        answer: "Yes. The review focuses on practical production risk, deployment flow, and support priorities before larger changes.",
      },
      {
        question: "Can this include hands-on implementation?",
        answer: "Yes. The consultation can move into scoped implementation once access, risks, and deliverables are clear.",
      },
    ],
    relatedCaseStudySlug: "automated-cicd-deployment",
  },
  {
    slug: "cloud-infrastructure",
    shortTitle: "Cloud Infrastructure",
    title: "AWS and DigitalOcean Cloud Infrastructure",
    description:
      "Reliable cloud server setup with networking, domains, firewalls, backups, resource sizing, and clean access.",
    icon: "cloud",
    visual: "Compute, DNS, proxy, SSL, backups",
    details: ["AWS EC2 and DigitalOcean droplets", "Server migration and resizing", "Cloud firewall and DNS setup"],
    technologies: ["AWS", "DigitalOcean", "Linux", "DNS", "UFW", "SSL"],
    relatedPackage: "Production Deployment",
    problems: ["Fragile server setup", "Unclear access and DNS ownership", "Missing backup and firewall basics"],
    includes: ["Cloud server preparation", "DNS, proxy, SSL, and firewall setup", "Resource sizing and handover notes"],
    notIncluded: ["Enterprise cloud transformation", "Unverified cost-saving promises", "Advanced Kubernetes platform claims"],
    approach: ["Review application needs", "Provision or stabilize cloud resources", "Validate access, SSL, health, and backups"],
    examples: ["DigitalOcean production setup", "AWS EC2 application server", "Server migration and domain cutover"],
    clientInputs: ["Cloud account access", "Domain/DNS access", "Application runtime details", "Traffic and storage expectations"],
    afterImplementation: ["Server access notes", "Deployment checklist", "Monitoring and support recommendations"],
    faq: [
      {
        question: "Do you work with both AWS and DigitalOcean?",
        answer: "Yes. The service focuses on practical EC2, droplet, Linux, DNS, SSL, proxy, firewall, and backup needs.",
      },
      {
        question: "Can you migrate an existing server?",
        answer: "Yes, when the current stack, access, data, and downtime constraints can be reviewed before the migration window.",
      },
    ],
    relatedCaseStudySlug: "multi-application-production-deployment",
  },
  {
    slug: "cicd-automation",
    shortTitle: "CI/CD Automation",
    title: "CI/CD Pipeline Automation",
    description:
      "Build and release workflows that reduce manual deployment risk and make repeatable releases easier.",
    icon: "pipeline",
    visual: "Build, test, package, deploy, validate",
    details: ["GitHub Actions, GitLab CI, Bitbucket", "Secure SSH deployment pipelines", "Health checks and rollback notes"],
    technologies: ["GitHub Actions", "Bitbucket Pipelines", "SSH", "PM2", "Health Checks"],
    relatedPackage: "CI/CD Automation",
    problems: ["Manual release steps", "Unclear rollback path", "Inconsistent server deployments"],
    includes: ["Build and deploy workflows", "Secret and environment handling", "Deployment validation and rollback notes"],
    notIncluded: ["Complex enterprise release trains", "Unscoped test-suite rewrites", "Deployment without access review"],
    approach: ["Map the current release process", "Automate build and deployment steps", "Validate health checks and handover"],
    examples: ["Bitbucket pipeline", "GitHub Actions deployment", "Secure SSH release flow"],
    clientInputs: ["Repository access", "Deployment commands", "Environment variables", "Server access and branch strategy"],
    afterImplementation: ["Pipeline documentation", "Rollback notes", "Release checklist"],
    faq: [
      {
        question: "Can the pipeline deploy to a VPS?",
        answer: "Yes. Secure SSH-based deployments to Linux servers are a common fit for this service.",
      },
      {
        question: "Will this replace all manual QA?",
        answer: "No. It automates repeatable release steps and validation hooks, but product QA remains a separate responsibility.",
      },
    ],
    relatedCaseStudySlug: "automated-cicd-deployment",
  },
  {
    slug: "application-deployment",
    shortTitle: "Application Deployment",
    title: "Next.js, NestJS and Node.js Deployment",
    description:
      "Production deployment for modern JavaScript apps with PM2, Nginx or Apache, SSL, and environment setup.",
    icon: "migration",
    visual: "App build, PM2, proxy, SSL, release",
    details: ["Next.js and NestJS production builds", "PM2 startup and recovery", "Zero-downtime deployment planning"],
    technologies: ["Next.js", "NestJS", "Node.js", "PM2", "Nginx", "Apache"],
    relatedPackage: "Production Deployment",
    problems: ["Builds fail on server", "App restarts are unreliable", "Proxy, SSL, and env setup are unclear"],
    includes: ["Production build setup", "PM2 process management", "Reverse proxy, SSL, and environment configuration"],
    notIncluded: ["Full application rewrite", "Database redesign", "Unverified traffic-capacity guarantees"],
    approach: ["Review runtime requirements", "Prepare server and process manager", "Validate route, SSL, and restart behavior"],
    examples: ["Next.js standalone deployment", "NestJS API deployment", "Node.js app behind Nginx or Apache"],
    clientInputs: ["Repository or build artifact", "Environment variables", "Domain access", "Runtime and database details"],
    afterImplementation: ["Runbook", "Restart notes", "Release and monitoring recommendations"],
    faq: [
      {
        question: "Can you deploy both frontend and backend apps?",
        answer: "Yes. This service covers practical deployment for Next.js, NestJS, Node.js APIs, and related process management.",
      },
      {
        question: "Can you use Apache instead of Nginx?",
        answer: "Yes. Apache, Nginx, and Caddy can be considered depending on the existing server and constraints.",
      },
    ],
    relatedCaseStudySlug: "multi-application-production-deployment",
  },
  {
    slug: "docker-containers",
    shortTitle: "Docker Containers",
    title: "Docker and Container Deployment",
    description:
      "Containerize applications, prepare Docker Compose setups, and assess Kubernetes readiness with measured scope.",
    icon: "container",
    visual: "Dockerfile, compose, volumes, logs",
    details: ["Node.js and full-stack containers", "MongoDB and MySQL container setup", "Docker-to-Kubernetes assessment"],
    technologies: ["Docker", "Docker Compose", "Linux", "Volumes", "Logs", "Health Checks"],
    relatedPackage: "Production Deployment",
    problems: ["Inconsistent local and server environments", "Containers without clear volumes or logs", "Unclear deployment handover"],
    includes: ["Dockerfile and Compose review", "Containerized app setup", "Volume, env, network, and log guidance"],
    notIncluded: ["Advanced Kubernetes platform builds", "Unscoped microservice migration", "Managed database administration"],
    approach: ["Review app runtime", "Build container workflow", "Validate restart, storage, logs, and deployment"],
    examples: ["Node.js Dockerfile", "Docker Compose app stack", "Containerized API with reverse proxy"],
    clientInputs: ["Application runtime", "Required services", "Environment variables", "Storage and backup needs"],
    afterImplementation: ["Compose notes", "Operational commands", "Monitoring recommendations"],
    faq: [
      {
        question: "Is Kubernetes required?",
        answer: "No. Many applications are better served by a well-scoped Docker Compose setup before Kubernetes is considered.",
      },
      {
        question: "Can this include databases?",
        answer: "Basic container setup for MongoDB or MySQL can be scoped, but advanced database administration is separate.",
      },
    ],
    relatedCaseStudySlug: "multi-application-production-deployment",
  },
  {
    slug: "linux-server-security",
    shortTitle: "Linux Server Security",
    title: "Linux Server Management and Security",
    description:
      "Ubuntu administration, SSH hardening, permissions, package updates, firewalls, logs, and production health checks.",
    icon: "security",
    visual: "SSH, UFW, users, logs, patches",
    details: ["Linux server hardening", "CPU, RAM and disk troubleshooting", "Apache, Nginx and Caddy support"],
    technologies: ["Ubuntu", "SSH", "UFW", "Apache", "Nginx", "Logs"],
    relatedPackage: "Quick Infrastructure Fix",
    problems: ["Unmanaged Linux servers", "Weak access controls", "CPU, memory, disk, or log issues"],
    includes: ["User and SSH review", "Firewall and package update checks", "Web-server and system log troubleshooting"],
    notIncluded: ["Penetration testing", "VAPT reports", "SOC 2 compliance work"],
    approach: ["Audit access and services", "Apply scoped hardening", "Document risks and next maintenance steps"],
    examples: ["SSH hardening", "SSL and web-server repair", "Disk pressure investigation"],
    clientInputs: ["Server access", "Known incident details", "Web-server config", "Current access requirements"],
    afterImplementation: ["Hardening summary", "Maintenance notes", "Monitoring and backup recommendations"],
    faq: [
      {
        question: "Is this a formal security audit?",
        answer: "No. It is practical Linux and web-server hardening, troubleshooting, and operational hygiene, not formal VAPT.",
      },
      {
        question: "Can you fix urgent server issues?",
        answer: "Yes, urgent troubleshooting can be scoped when access, impact, and rollback risks are clear.",
      },
    ],
    relatedCaseStudySlug: "production-performance-investigation",
  },
  {
    slug: "monitoring-observability",
    shortTitle: "Monitoring",
    title: "Monitoring, Grafana and Alerting",
    description:
      "Dashboards, health checks, uptime probes, resource metrics, and alert routes that make production visible.",
    icon: "monitoring",
    visual: "Prometheus, Grafana, exporters, alerts",
    details: ["Node and Blackbox Exporter", "PM2 and web-server monitoring", "Email alert integration"],
    technologies: ["Prometheus", "Grafana", "Node Exporter", "Blackbox Exporter", "Health Checks"],
    relatedPackage: "Monitoring Setup",
    problems: ["No reliable uptime visibility", "No server-health signals", "Incidents discovered too late"],
    includes: ["Metrics collection", "Grafana dashboards", "Uptime checks and alert routing"],
    notIncluded: ["Full observability platform procurement", "SRE team replacement", "Fake incident response guarantees"],
    approach: ["Define important signals", "Install exporters and dashboards", "Validate alert paths and runbook notes"],
    examples: ["Server resource dashboard", "Application health checks", "Blackbox uptime monitoring"],
    clientInputs: ["Server access", "Critical URLs", "Notification channel", "Expected health criteria"],
    afterImplementation: ["Dashboard links", "Alert notes", "Maintenance and tuning recommendations"],
    faq: [
      {
        question: "Can alerts go to email?",
        answer: "Yes. Email alert integration can be scoped along with dashboard and health-check setup.",
      },
      {
        question: "Will this monitor application bugs?",
        answer: "It can reveal health, uptime, and resource signals. Application-level bug tracking may need separate tooling.",
      },
    ],
    relatedCaseStudySlug: "centralized-infrastructure-monitoring",
  },
  {
    slug: "managed-devops-support",
    shortTitle: "Managed Support",
    title: "Managed DevOps and Emergency Support",
    description:
      "Monthly maintenance, urgent troubleshooting, backup checks, deployment assistance, and infrastructure reports.",
    icon: "kubernetes",
    visual: "Monitor, patch, support, report",
    details: ["Website and API outage triage", "SSL, DNS and CI/CD failure resolution", "Monthly DevOps care package"],
    technologies: ["Linux", "CI/CD", "Monitoring", "PM2", "DNS", "SSL"],
    relatedPackage: "Monthly DevOps Care",
    problems: ["No internal DevOps support", "Recurring incidents", "Release windows need technical backup"],
    includes: ["Routine infrastructure checks", "Release assistance", "Incident triage and support notes"],
    notIncluded: ["24/7 guaranteed support without a contract", "Unlimited unscoped engineering work", "Application feature development"],
    approach: ["Define support scope and response window", "Review current infrastructure", "Create a practical maintenance rhythm"],
    examples: ["Monthly care package", "Emergency production support", "Release-window assistance"],
    clientInputs: ["Infrastructure overview", "Access process", "Known maintenance tasks", "Preferred communication channel"],
    afterImplementation: ["Support cadence", "Health summary", "Improvement backlog"],
    faq: [
      {
        question: "Can this support an agency with multiple client apps?",
        answer: "Yes, as long as the supported applications, access boundaries, and response expectations are clearly scoped.",
      },
      {
        question: "Is emergency support always available?",
        answer: "Emergency windows depend on availability and agreed scope. Urgent work uses a defined response window and handover.",
      },
    ],
    relatedCaseStudySlug: "production-performance-investigation",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
