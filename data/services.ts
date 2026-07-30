export type Service = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  category: "devops" | "development";
  icon: "cloud" | "pipeline" | "container" | "kubernetes" | "monitoring" | "security" | "performance" | "migration" | "code" | "desktop" | "layers";
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
    category: "devops",
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
    category: "devops",
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
    category: "devops",
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
    category: "devops",
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
    category: "devops",
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
    category: "devops",
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
    category: "devops",
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
    category: "devops",
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
  {
    slug: "web-development",
    shortTitle: "Web Development",
    title: "Web Development (Next.js & React)",
    description:
      "Fast, SEO-optimised web applications built with Next.js and React — from landing pages to full product UIs.",
    category: "development",
    icon: "code",
    visual: "Design, build, optimise, deploy, iterate",
    details: ["Next.js App Router and React SPA builds", "Performance-first UI with Core Web Vitals focus", "SEO-optimised pages with structured data"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Supabase"],
    relatedPackage: "Web Development Project",
    problems: ["Outdated or slow web presence", "No developer to build the frontend", "Need a production-ready site fast"],
    includes: ["UI design implementation", "Responsive layout and accessibility", "Performance optimisation and deployment"],
    notIncluded: ["Unscoped CMS migrations", "Full backend API development without agreement", "Guaranteed SEO ranking results"],
    approach: ["Clarify scope, pages, and content", "Build component system and pages", "Deploy and validate performance"],
    examples: ["Marketing site with blog and CMS", "SaaS landing page and pricing page", "Portfolio or product showcase"],
    clientInputs: ["Design files or brand guide", "Content and copy", "Domain and hosting access", "Feature list and priorities"],
    afterImplementation: ["Production deployment", "CMS setup notes", "Performance report and next iteration options"],
    faq: [
      {
        question: "Can you build a CMS-backed site?",
        answer: "Yes. Next.js integrates well with headless CMS options like Sanity, Contentful, and others depending on the content requirements.",
      },
      {
        question: "Will the site be fast and SEO-friendly?",
        answer: "Yes. Core Web Vitals, semantic HTML, structured data, and metadata are built into the standard delivery.",
      },
    ],
    relatedCaseStudySlug: "automated-cicd-deployment",
  },
  {
    slug: "application-development",
    shortTitle: "App Development",
    title: "Full-Stack Application Development",
    description:
      "End-to-end product development for web apps — frontend UI, backend API, database, auth, and deployment.",
    category: "development",
    icon: "layers",
    visual: "UI, API, database, auth, deploy",
    details: ["React frontend with Next.js or Vite", "NestJS or Node.js REST and GraphQL APIs", "PostgreSQL, MongoDB, and Supabase integrations"],
    technologies: ["React", "NestJS", "Node.js", "PostgreSQL", "Supabase", "Docker"],
    relatedPackage: "Full-Stack Development",
    problems: ["No team to build the product end-to-end", "Backend and frontend not aligned", "Need a scalable architecture from the start"],
    includes: ["Frontend UI and routing", "Backend API and database schema", "Authentication, environment setup, and deployment"],
    notIncluded: ["Unbounded feature scope", "Mobile native app builds", "Ongoing product management"],
    approach: ["Define scope, data model, and user flows", "Build API and frontend in parallel", "Integrate, test, and deploy"],
    examples: ["SaaS MVP with dashboard and billing", "Internal tool with role-based access", "API platform with admin UI"],
    clientInputs: ["Product requirements or PRD", "Wireframes or design files", "API contracts or existing backend", "Deployment environment details"],
    afterImplementation: ["Deployed application", "API documentation", "Handover notes and maintenance guide"],
    faq: [
      {
        question: "Can you take a project from idea to launch?",
        answer: "Yes. With a clear scope, we can take a well-defined MVP from design to deployed product.",
      },
      {
        question: "What databases do you work with?",
        answer: "PostgreSQL, MySQL, MongoDB, and Supabase are all supported depending on the project needs.",
      },
    ],
    relatedCaseStudySlug: "automated-cicd-deployment",
  },
  {
    slug: "desktop-application",
    shortTitle: "Desktop Apps",
    title: "Desktop Application Development",
    description:
      "Cross-platform desktop applications using Electron or Tauri — built with web technologies for Windows, macOS, and Linux.",
    category: "development",
    icon: "desktop",
    visual: "Design, build, package, distribute",
    details: ["Electron and Tauri cross-platform builds", "System tray, notifications, and OS integrations", "Auto-update and installer packaging"],
    technologies: ["Electron", "Tauri", "React", "TypeScript", "Rust", "SQLite"],
    relatedPackage: "Desktop Application Project",
    problems: ["Need a desktop tool for internal or client use", "Web app doesn't meet OS-level requirements", "No experience packaging and distributing apps"],
    includes: ["Cross-platform desktop app build", "OS integration (tray, notifications, filesystem)", "Installer and packaging for distribution"],
    notIncluded: ["Native iOS or Android apps", "App Store submission without agreed scope", "Unscoped feature additions post-delivery"],
    approach: ["Define OS targets, features, and distribution method", "Build application UI and native integrations", "Package, test, and prepare for distribution"],
    examples: ["Internal business tool for Windows and macOS", "Developer utility with system tray access", "Data entry app with offline SQLite storage"],
    clientInputs: ["Feature requirements", "Target OS and user base", "Design files or wireframes", "Distribution method (direct, store, internal)"],
    afterImplementation: ["Packaged installer files", "Update mechanism setup", "Handover and maintenance notes"],
    faq: [
      {
        question: "Is Electron or Tauri better for my use case?",
        answer: "Electron is mature and widely compatible. Tauri is lighter and faster with a smaller bundle size. The choice depends on your team's stack and performance requirements.",
      },
      {
        question: "Can the app work offline?",
        answer: "Yes. Both Electron and Tauri support local storage, SQLite, and offline-first data patterns.",
      },
    ],
    relatedCaseStudySlug: "production-performance-investigation",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
