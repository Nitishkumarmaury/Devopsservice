import type { Service } from "@/data/services";

export type SeoLandingPage = {
  slug: string;
  shortTitle: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  icon: Service["icon"];
  serviceType: string;
  contactProjectType: string;
  primaryKeywords: readonly string[];
  tools: readonly string[];
  problems: readonly string[];
  deliverables: readonly string[];
  approach: readonly string[];
  useCases: readonly string[];
  relatedServiceHref: string;
  relatedCaseStudyHref: string;
  faq: ReadonlyArray<{ question: string; answer: string }>;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "devops-consulting",
    shortTitle: "DevOps Consulting",
    title: "DevOps Consulting Services for Startups and SaaS",
    metaDescription:
      "Get practical DevOps consulting for releases, automation, observability and cloud deployments. Ideal for founders, CTOs and engineering teams.",
    h1: "DevOps Consulting Services",
    eyebrow: "DevOps consulting",
    intro:
      "Practical DevOps consulting for startups, SaaS teams, and agencies that need faster releases, safer production changes, and a clearer infrastructure operating model.",
    icon: "performance",
    serviceType: "DevOps consulting services",
    contactProjectType: "DevOps Consulting and Production Support",
    primaryKeywords: ["DevOps consulting", "DevOps consultant", "freelance DevOps engineer", "DevOps for SaaS"],
    tools: ["AWS", "DigitalOcean", "Linux", "CI/CD", "Docker", "Monitoring"],
    problems: [
      "Manual releases make every production deploy feel risky.",
      "Infrastructure ownership is unclear across servers, DNS, access, backups, and monitoring.",
      "Production incidents are handled reactively without runbooks or release visibility.",
    ],
    deliverables: [
      "Production readiness review with priority risks and practical next steps.",
      "Deployment, rollback, monitoring, and access recommendations tailored to your stack.",
      "Hands-on implementation scope for CI/CD, cloud setup, observability, or support.",
    ],
    approach: [
      "Review the current application, hosting, deployment path, and known production pain points.",
      "Prioritize changes that reduce release risk and improve reliability without unnecessary platform rebuilds.",
      "Implement scoped improvements and leave clear handover notes for the team.",
    ],
    useCases: ["Startup production launch", "SaaS reliability cleanup", "Agency white-label DevOps support"],
    relatedServiceHref: "/services/devops-consulting",
    relatedCaseStudyHref: "/case-studies/automated-cicd-deployment",
    faq: [
      {
        question: "Can DevOps consulting start with an audit?",
        answer:
          "Yes. A production audit is often the safest first step because it clarifies infrastructure risks, access needs, deployment gaps, monitoring, and the most valuable implementation work.",
      },
      {
        question: "Do you work as a freelancer with remote teams?",
        answer:
          "Yes. The service is designed for remote startup, SaaS, SMB, and agency teams that need a hands-on DevOps consultant without hiring full-time infrastructure staff.",
      },
    ],
  },
  {
    slug: "ci-cd-consulting",
    shortTitle: "CI/CD Consulting",
    title: "CI/CD Consulting and Pipeline Setup",
    metaDescription:
      "Build cleaner release pipelines with GitHub Actions or GitLab CI/CD, zero-downtime deploys and release automation tailored to your stack.",
    h1: "CI/CD Consulting and Pipeline Setup",
    eyebrow: "Release automation",
    intro:
      "CI/CD consulting for teams that want repeatable deployments, safer release checks, secure environment handling, and a practical rollback path.",
    icon: "pipeline",
    serviceType: "CI/CD consulting and pipeline setup",
    contactProjectType: "CI/CD Pipeline Automation",
    primaryKeywords: ["CI/CD consulting", "CI/CD consultant", "CI/CD pipeline setup", "GitHub Actions consulting"],
    tools: ["GitHub Actions", "GitLab CI/CD", "Bitbucket Pipelines", "SSH", "PM2", "Health checks"],
    problems: [
      "Deployments depend on manual commands, tribal knowledge, or one developer's laptop.",
      "Secrets, build artifacts, and release branches are not handled consistently.",
      "Teams do not have reliable post-deploy checks or rollback notes.",
    ],
    deliverables: [
      "Build and deployment workflow for your repository and hosting environment.",
      "Secure handling for environment variables, server access, and release commands.",
      "Health validation, rollback notes, and a short release runbook.",
    ],
    approach: [
      "Map the existing release steps and identify what should be automated first.",
      "Build a pipeline that matches your stack, branch strategy, access model, and hosting setup.",
      "Validate deployment behavior and document what the team should check after each release.",
    ],
    useCases: ["GitHub Actions deployment to EC2", "GitLab CI/CD release flow", "Zero-downtime deployment planning"],
    relatedServiceHref: "/services/cicd-automation",
    relatedCaseStudyHref: "/case-studies/automated-cicd-deployment",
    faq: [
      {
        question: "Can you add CI/CD to an existing project?",
        answer:
          "Yes. Existing Next.js, NestJS, Node.js, and full-stack applications can usually be connected to a practical pipeline after repository, server, build, and secret requirements are reviewed.",
      },
      {
        question: "Does every CI/CD setup include zero downtime?",
        answer:
          "Not always. Zero-downtime deployment depends on the application architecture, process manager, database changes, and hosting model. The pipeline can still include safer validation and rollback steps.",
      },
    ],
  },
  {
    slug: "aws-ec2-deployment",
    shortTitle: "AWS EC2 Deployment",
    title: "AWS EC2 Deployment and DevOps Support",
    metaDescription:
      "Production-ready AWS EC2 setup, Node.js deployment, SSL, reverse proxy, monitoring and deployment automation for modern web apps.",
    h1: "AWS EC2 Deployment and DevOps Support",
    eyebrow: "AWS DevOps",
    intro:
      "AWS EC2 deployment support for web applications that need reliable Linux setup, reverse proxy configuration, SSL, monitoring, and release automation.",
    icon: "cloud",
    serviceType: "AWS EC2 deployment service",
    contactProjectType: "AWS and DigitalOcean Cloud Infrastructure",
    primaryKeywords: ["AWS DevOps consulting", "AWS EC2 deployment service", "AWS infrastructure setup", "EC2 deployment support"],
    tools: ["AWS EC2", "Ubuntu", "Nginx", "Apache", "SSL", "PM2"],
    problems: [
      "The application runs locally but production server setup is fragile or incomplete.",
      "DNS, SSL, reverse proxy, firewall, and process management are not clearly owned.",
      "Deployments to EC2 are manual and hard to repeat safely.",
    ],
    deliverables: [
      "Production-ready EC2 server setup with proxy, SSL, firewall, and process management.",
      "Deployment checklist for Node.js, Next.js, NestJS, or API workloads.",
      "Monitoring and backup recommendations after launch.",
    ],
    approach: [
      "Review the application runtime, traffic expectations, domain setup, and current AWS account constraints.",
      "Prepare EC2, Linux, proxy, SSL, process manager, and access controls around the real deployment need.",
      "Validate routes, health, restart behavior, and handover documentation before completion.",
    ],
    useCases: ["Next.js deployment on AWS EC2", "NestJS API deployment on EC2", "Nginx and SSL setup for production"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Can you deploy Node.js apps on AWS EC2?",
        answer:
          "Yes. EC2 deployments can include Linux setup, Nginx or Apache reverse proxy, SSL, PM2, environment variables, firewall basics, and a repeatable release workflow.",
      },
      {
        question: "Can you fix an existing EC2 deployment?",
        answer:
          "Yes. Existing EC2 servers can be reviewed for process restarts, proxy issues, SSL problems, high CPU, disk pressure, DNS, logs, and missing deployment documentation.",
      },
    ],
  },
  {
    slug: "docker-kubernetes-consulting",
    shortTitle: "Docker and Kubernetes",
    title: "Docker and Kubernetes Consulting Services",
    metaDescription:
      "Containerise applications, improve deployment consistency and move from Docker Compose to scalable Kubernetes operations.",
    h1: "Docker and Kubernetes Consulting",
    eyebrow: "Containers",
    intro:
      "Docker and Kubernetes consulting for teams that need consistent environments, safer container deployment, and a practical path from Compose to cloud-native operations.",
    icon: "kubernetes",
    serviceType: "Docker and Kubernetes consulting",
    contactProjectType: "Docker and Container Deployment",
    primaryKeywords: ["Docker consulting services", "Kubernetes consulting", "Kubernetes consultant", "Kubernetes deployment service"],
    tools: ["Docker", "Docker Compose", "Kubernetes", "Linux", "Volumes", "Health checks"],
    problems: [
      "Local, staging, and production environments behave differently.",
      "Docker files, volumes, networks, logs, and restart behavior are unclear.",
      "The team is considering Kubernetes but does not know whether it is needed yet.",
    ],
    deliverables: [
      "Dockerfile and Compose setup or review for production-oriented deployment.",
      "Container runtime notes covering env values, volumes, logs, networks, and health checks.",
      "Kubernetes readiness assessment or scoped migration plan when Kubernetes is justified.",
    ],
    approach: [
      "Review the application runtime, supporting services, persistence needs, and current deployment friction.",
      "Stabilize Docker or Compose first so the application has a repeatable operating model.",
      "Plan Kubernetes only when scaling, operational, or team requirements make it the right next step.",
    ],
    useCases: ["Dockerise Node.js app", "Docker Compose production setup", "Docker Compose to Kubernetes migration"],
    relatedServiceHref: "/services/docker-containers",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Do I need Kubernetes for a startup app?",
        answer:
          "Not always. Many startup applications are better served by a well-documented Docker Compose setup before Kubernetes is introduced. The recommendation depends on traffic, team capacity, and operational needs.",
      },
      {
        question: "Can you migrate Docker Compose to Kubernetes?",
        answer:
          "Yes, when the current Compose setup, services, storage, networking, and deployment process are understood. The migration should include validation and rollback planning.",
      },
    ],
  },
  {
    slug: "monitoring-alerting",
    shortTitle: "Monitoring and Alerting",
    title: "Monitoring and Alerting Setup for Production Apps",
    metaDescription:
      "Set up logs, uptime checks, alerts and production monitoring so issues are found quickly and downtime is reduced.",
    h1: "Monitoring and Alerting Setup",
    eyebrow: "Observability",
    intro:
      "Monitoring and alerting setup for production applications, servers, APIs, and infrastructure that need clearer uptime, resource, and incident visibility.",
    icon: "monitoring",
    serviceType: "Monitoring and alerting setup",
    contactProjectType: "Monitoring, Grafana and Alerting",
    primaryKeywords: ["Monitoring and alerting setup", "server monitoring setup", "Prometheus Grafana setup service", "uptime monitoring"],
    tools: ["Prometheus", "Grafana", "Node Exporter", "Blackbox Exporter", "Logs", "Email alerts"],
    problems: [
      "Production issues are discovered by users before the team sees them.",
      "CPU, memory, disk, uptime, and service health are not visible in one place.",
      "Alerts are either missing or too noisy to act on.",
    ],
    deliverables: [
      "Uptime checks, server metrics, and service health signals for priority systems.",
      "Grafana dashboards or equivalent visibility for infrastructure health.",
      "Alert routing and simple response notes for production incidents.",
    ],
    approach: [
      "Define which signals matter for the application, business risk, and support process.",
      "Set up lightweight monitoring targets, dashboards, and alert routes.",
      "Validate alerts and leave a runbook for interpreting the most important signals.",
    ],
    useCases: ["Uptime monitoring for startup", "Prometheus and Grafana setup", "Log and server health visibility"],
    relatedServiceHref: "/services/monitoring-observability",
    relatedCaseStudyHref: "/case-studies/centralized-infrastructure-monitoring",
    faq: [
      {
        question: "Can monitoring be added to an existing server?",
        answer:
          "Yes. Existing Linux, Node.js, Next.js, NestJS, and API deployments can usually be connected to uptime checks, server metrics, dashboards, and basic alert routing.",
      },
      {
        question: "Will monitoring prevent every outage?",
        answer:
          "No monitoring setup can prevent every outage, but it can reduce blind spots, improve response time, and make production behavior easier to understand.",
      },
    ],
  },
  {
    slug: "nextjs-nestjs-deployment",
    shortTitle: "Next.js and NestJS",
    title: "Next.js and NestJS Deployment Services",
    metaDescription:
      "Deploy Next.js and NestJS applications to production with Nginx, PM2, SSL, CI/CD and rollback-ready release flows.",
    h1: "Next.js and NestJS Deployment Services",
    eyebrow: "Framework deployment",
    intro:
      "Deployment services for Next.js, NestJS, and Node.js applications that need stable builds, process management, reverse proxy setup, SSL, CI/CD, and production handover.",
    icon: "migration",
    serviceType: "Next.js and NestJS deployment services",
    contactProjectType: "Next.js, NestJS and Node.js Deployment",
    primaryKeywords: ["Next.js deployment service", "NestJS deployment service", "Node.js app deployment", "PM2 deployment service"],
    tools: ["Next.js", "NestJS", "Node.js", "PM2", "Nginx", "Apache"],
    problems: [
      "The app builds locally but fails or restarts unpredictably on the server.",
      "Proxy, SSL, environment variables, and process manager setup are incomplete.",
      "The team needs a repeatable deployment path instead of manual server fixes.",
    ],
    deliverables: [
      "Production build and runtime setup for Next.js, NestJS, or Node.js services.",
      "Nginx, Apache, SSL, PM2, environment, and domain configuration.",
      "Deployment notes, restart commands, health checks, and rollback guidance.",
    ],
    approach: [
      "Review the repository, runtime, build output, environment variables, and domain requirements.",
      "Prepare the server, process manager, proxy, SSL, and deployment commands.",
      "Validate production routes, restart behavior, logs, and handover notes.",
    ],
    useCases: ["Next.js deployment on AWS EC2", "NestJS deployment on EC2", "Node.js app deployment on Ubuntu server"],
    relatedServiceHref: "/services/application-deployment",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Can you deploy both frontend and backend applications?",
        answer:
          "Yes. A typical engagement can include a Next.js frontend, NestJS API, Node.js worker, reverse proxy, SSL, PM2, and deployment workflow.",
      },
      {
        question: "Can you set up CI/CD for the deployed app?",
        answer:
          "Yes. CI/CD can be added after the production runtime and release steps are clear, using GitHub Actions, GitLab CI/CD, or Bitbucket Pipelines.",
      },
    ],
  },
  {
    slug: "devops-for-startups",
    shortTitle: "DevOps for Startups",
    title: "DevOps for Startups and SaaS Teams",
    metaDescription:
      "Lean DevOps support for startup teams that need faster releases, reliable production and cost-aware infrastructure decisions.",
    h1: "DevOps for Startups and SaaS",
    eyebrow: "Startup DevOps",
    intro:
      "Lean DevOps support for founders, CTOs, and SaaS teams that need production reliability, faster releases, monitoring, and cost-aware infrastructure without adding full-time headcount.",
    icon: "performance",
    serviceType: "DevOps for startups",
    contactProjectType: "DevOps Consulting and Production Support",
    primaryKeywords: ["DevOps for startups", "DevOps for SaaS", "startup DevOps consultant", "remote DevOps engineer"],
    tools: ["AWS", "DigitalOcean", "CI/CD", "Docker", "Monitoring", "Runbooks"],
    problems: [
      "The product is shipping quickly, but deployment and infrastructure work is slowing the team down.",
      "Cloud costs, monitoring gaps, access, and incident response are not yet organized.",
      "The startup needs expert DevOps help without committing to a full-time hire.",
    ],
    deliverables: [
      "Startup production audit covering deployment, infrastructure, monitoring, access, and cloud cost signals.",
      "Prioritized DevOps roadmap for the next release, launch, migration, or support period.",
      "Hands-on setup for CI/CD, EC2, Docker, monitoring, backups, or production support.",
    ],
    approach: [
      "Clarify the product stage, release urgency, production risk, and budget constraints.",
      "Choose the smallest reliable infrastructure path that supports the next business milestone.",
      "Implement, document, and hand over work so the team can keep shipping.",
    ],
    useCases: ["MVP to production", "SaaS launch readiness", "Agency or founder DevOps support"],
    relatedServiceHref: "/services/devops-consulting",
    relatedCaseStudyHref: "/case-studies/centralized-infrastructure-monitoring",
    faq: [
      {
        question: "Can a startup hire DevOps help only for a project?",
        answer:
          "Yes. Work can be scoped as a production audit, deployment implementation, CI/CD setup, monitoring project, migration, or monthly support arrangement.",
      },
      {
        question: "Can you help with AWS cost control?",
        answer:
          "Yes. Cost-aware infrastructure review can be included, focused on sizing, unused resources, backup decisions, monitoring, and practical scaling choices.",
      },
    ],
  },
  {
    slug: "devops-consulting-services",
    shortTitle: "Global DevOps Services",
    title: "Global DevOps Consulting Services",
    metaDescription:
      "Expert DevOps consulting and automation services worldwide, covering CI/CD, infrastructure as code, Kubernetes, cloud operations, and production reliability.",
    h1: "DevOps Consulting and Automation Services",
    eyebrow: "Global DevOps",
    intro:
      "Global DevOps consulting for organizations that need cleaner delivery systems, automation, infrastructure reliability, and production operating practices across distributed teams.",
    icon: "performance",
    serviceType: "DevOps consulting services",
    contactProjectType: "DevOps Consulting and Production Support",
    primaryKeywords: ["DevOps consulting services", "DevOps services", "DevOps automation services", "DevOps solutions"],
    tools: ["CI/CD", "Infrastructure as Code", "Kubernetes", "Linux", "Monitoring", "Cloud platforms"],
    problems: [
      "Release processes are slow, fragile, or dependent on manual operational knowledge.",
      "Infrastructure, deployment, monitoring, and incident response are managed as separate disconnected tasks.",
      "The team needs outside DevOps expertise without committing to a full-time platform department.",
    ],
    deliverables: [
      "DevOps operating model review covering deployment, environments, access, monitoring, and support flow.",
      "Automation roadmap for CI/CD, infrastructure as code, containers, observability, and production handover.",
      "Scoped implementation support for the highest-impact reliability and delivery improvements.",
    ],
    approach: [
      "Assess the current delivery lifecycle from code commit to production support.",
      "Prioritize automation and infrastructure improvements by risk, business impact, and delivery urgency.",
      "Implement practical DevOps changes with documentation, validation, and team handover.",
    ],
    useCases: ["Global delivery cleanup", "DevOps automation roadmap", "Production reliability improvement"],
    relatedServiceHref: "/services/devops-consulting",
    relatedCaseStudyHref: "/case-studies/automated-cicd-deployment",
    faq: [
      {
        question: "Is this different from a single CI/CD setup?",
        answer:
          "Yes. CI/CD can be one part of the work, but this page covers broader DevOps consulting across infrastructure, release management, monitoring, access, and operational handover.",
      },
      {
        question: "Can this support international teams?",
        answer:
          "Yes. The engagement can be structured for remote and international teams with async documentation, clear access boundaries, and practical handover notes.",
      },
    ],
  },
  {
    slug: "cloud-consulting-services",
    shortTitle: "Cloud Consulting",
    title: "Cloud Consulting and Migration Services",
    metaDescription:
      "Cloud strategy, architecture, migration, AWS, Azure, GCP and managed cloud services for businesses that need reliable global infrastructure.",
    h1: "Cloud Consulting and Migration Services",
    eyebrow: "Cloud consulting",
    intro:
      "Cloud consulting for teams planning cloud setup, migration, modernization, monitoring, cost control, and practical operations across AWS, Azure, GCP, or hybrid infrastructure.",
    icon: "cloud",
    serviceType: "Cloud consulting services",
    contactProjectType: "Cloud Infrastructure",
    primaryKeywords: ["Cloud consulting services", "cloud migration services", "managed cloud services", "cloud architecture consulting"],
    tools: ["AWS", "Azure", "Google Cloud", "Linux", "DNS", "Monitoring"],
    problems: [
      "Cloud resources have grown without a clear architecture, ownership model, or cost-control process.",
      "The team needs to migrate from a server, VPS, or legacy setup without breaking production.",
      "Monitoring, backup, access, and deployment workflows are missing from the cloud plan.",
    ],
    deliverables: [
      "Cloud readiness review covering workload, network, access, deployment, monitoring, and backup needs.",
      "Migration or modernization plan with staged validation and rollback considerations.",
      "Implementation support for cloud servers, domains, SSL, observability, and release automation.",
    ],
    approach: [
      "Map current infrastructure, applications, dependencies, data, and downtime constraints.",
      "Design the target cloud path around reliability, cost, operations, and team capacity.",
      "Execute the migration or setup with validation, monitoring, and handover documentation.",
    ],
    useCases: ["Cloud migration planning", "AWS or Azure infrastructure setup", "Managed cloud operations review"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Can you help choose between AWS, Azure, and Google Cloud?",
        answer:
          "Yes. The recommendation depends on workload, team familiarity, existing accounts, compliance expectations, budget, and operational complexity.",
      },
      {
        question: "Can cloud consulting include migration work?",
        answer:
          "Yes. Migration can be scoped after dependencies, DNS, data, downtime tolerance, rollback needs, and validation steps are understood.",
      },
    ],
  },
  {
    slug: "aws-consulting-services",
    shortTitle: "AWS Consulting",
    title: "AWS Consulting Services for Cloud Infrastructure",
    metaDescription:
      "AWS consulting for EC2 deployment, cloud architecture, migration, monitoring, server hardening, cost control and DevOps automation.",
    h1: "AWS Consulting Services",
    eyebrow: "AWS cloud",
    intro:
      "AWS consulting for teams that need practical EC2 deployment, infrastructure review, migration planning, monitoring, access cleanup, and cloud operations support.",
    icon: "cloud",
    serviceType: "AWS consulting services",
    contactProjectType: "AWS and DigitalOcean Cloud Infrastructure",
    primaryKeywords: ["AWS consulting services", "AWS cloud solutions", "AWS migration consultant", "AWS DevOps consulting"],
    tools: ["AWS EC2", "IAM", "Route 53", "CloudWatch", "Linux", "Nginx"],
    problems: [
      "AWS resources exist, but deployment, access, cost, and monitoring decisions are not documented.",
      "EC2 servers need stabilization, SSL, proxying, firewall basics, backups, or release automation.",
      "The team needs a safer path for AWS migration or production launch.",
    ],
    deliverables: [
      "AWS account and workload review focused on EC2, access, DNS, observability, and deployment flow.",
      "Production setup or cleanup for application servers, domains, SSL, process managers, and monitoring.",
      "AWS improvement backlog with priority, risk, cost, and operational notes.",
    ],
    approach: [
      "Review the AWS account structure, current EC2 setup, application needs, and access boundaries.",
      "Stabilize the highest-risk production items first: security basics, deployability, visibility, and recovery.",
      "Document the implementation and next cloud improvements so the team can operate confidently.",
    ],
    useCases: ["AWS production launch", "EC2 infrastructure cleanup", "AWS migration readiness"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Can AWS consulting start with a small EC2 project?",
        answer:
          "Yes. Many AWS engagements start with EC2 deployment, server cleanup, proxy and SSL setup, monitoring, or release automation before expanding into broader architecture work.",
      },
      {
        question: "Do you provide AWS cost optimization?",
        answer:
          "Cost review can be included, focused on sizing, unused resources, backup policy, monitoring signals, and practical scaling decisions.",
      },
    ],
  },
  {
    slug: "azure-devops-consulting",
    shortTitle: "Azure DevOps",
    title: "Azure DevOps Consulting Services",
    metaDescription:
      "Azure DevOps consulting for CI/CD pipelines, cloud deployment workflows, repository strategy, release automation and production delivery.",
    h1: "Azure DevOps Consulting",
    eyebrow: "Azure pipelines",
    intro:
      "Azure DevOps consulting for teams using Microsoft tooling who need cleaner pipelines, safer release workflows, cloud deployment support, and production validation.",
    icon: "pipeline",
    serviceType: "Azure DevOps consulting",
    contactProjectType: "Azure DevOps Consulting",
    primaryKeywords: ["Azure DevOps consulting", "Azure DevOps consultant", "Azure pipelines consulting", "cloud release automation"],
    tools: ["Azure DevOps", "Azure Pipelines", "Git", "CI/CD", "Docker", "Cloud deployment"],
    problems: [
      "Azure Pipelines exist but releases still need manual intervention or unclear approval steps.",
      "Build, test, package, deploy, and validation stages are not aligned with production risk.",
      "The team needs DevOps help while staying inside Microsoft or hybrid cloud tooling.",
    ],
    deliverables: [
      "Azure pipeline review or implementation for build, deployment, secrets, approvals, and validation.",
      "Release workflow documentation with environment rules, rollback notes, and support handover.",
      "Cloud deployment recommendations for Azure, AWS, or hybrid infrastructure where relevant.",
    ],
    approach: [
      "Map repositories, environments, branches, credentials, approvals, and current deployment behavior.",
      "Design Azure DevOps workflows around predictable release stages and secure operational boundaries.",
      "Validate pipeline runs and document how the team should deploy, monitor, and recover.",
    ],
    useCases: ["Azure Pipelines setup", "Hybrid cloud release flow", "CI/CD modernization"],
    relatedServiceHref: "/services/cicd-automation",
    relatedCaseStudyHref: "/case-studies/automated-cicd-deployment",
    faq: [
      {
        question: "Can you help if we use Azure DevOps but deploy outside Azure?",
        answer:
          "Yes. Azure DevOps can run release workflows for Azure, AWS, Linux servers, containers, and hybrid environments when access and deployment steps are scoped correctly.",
      },
      {
        question: "Can Azure DevOps consulting include security checks?",
        answer:
          "Yes. Basic secret handling, approval gates, environment controls, and deployment validation can be included. Formal compliance audits are separate.",
      },
    ],
  },
  {
    slug: "kubernetes-consulting",
    shortTitle: "Kubernetes Consulting",
    title: "Kubernetes Consulting Services",
    metaDescription:
      "Specialized Kubernetes and container orchestration consulting to deploy, scale, and manage containerized applications with cloud expertise.",
    h1: "Kubernetes and Container Orchestration Consulting",
    eyebrow: "Kubernetes consulting",
    intro:
      "Kubernetes consulting for teams that need container orchestration guidance, deployment design, cluster readiness, migration planning, and operational handover.",
    icon: "kubernetes",
    serviceType: "Kubernetes consulting",
    contactProjectType: "Kubernetes Consulting",
    primaryKeywords: ["Kubernetes consulting", "Kubernetes consultant", "container orchestration services", "Kubernetes deployment service"],
    tools: ["Kubernetes", "Docker", "Helm", "Ingress", "CI/CD", "Monitoring"],
    problems: [
      "The team wants Kubernetes but is unsure whether the application or operating model is ready.",
      "Containers run, but cluster deployment, ingress, secrets, logs, and scaling rules are not clear.",
      "Kubernetes complexity is slowing releases instead of improving reliability.",
    ],
    deliverables: [
      "Kubernetes readiness review covering app architecture, containers, networking, secrets, storage, and support needs.",
      "Deployment design or migration plan for cluster workloads, ingress, observability, and release flow.",
      "Operational notes for deployment commands, health checks, rollback, and ongoing maintenance.",
    ],
    approach: [
      "Start with Docker and current deployment behavior before introducing cluster complexity.",
      "Design Kubernetes only where it improves reliability, scaling, isolation, or team operations.",
      "Validate workloads, ingress, logs, and deployment handover before declaring the migration complete.",
    ],
    useCases: ["Kubernetes readiness audit", "Container orchestration setup", "Docker Compose to Kubernetes migration"],
    relatedServiceHref: "/services/docker-containers",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Should every SaaS app move to Kubernetes?",
        answer:
          "No. Kubernetes is useful when scaling, workload isolation, cluster operations, or deployment consistency justify the added complexity.",
      },
      {
        question: "Can you help with an existing Kubernetes cluster?",
        answer:
          "Yes. Existing clusters can be reviewed for deployment flow, ingress, resource settings, logs, monitoring, secrets, and handover documentation.",
      },
    ],
  },
  {
    slug: "cicd-automation-services",
    shortTitle: "CI/CD Automation",
    title: "CI/CD and DevOps Automation Services",
    metaDescription:
      "CI/CD pipeline consulting, DevOps automation, infrastructure as code, deployment validation and release workflows for global software teams.",
    h1: "CI/CD and Automation Services",
    eyebrow: "Automation services",
    intro:
      "CI/CD and DevOps automation services for teams that need reliable pipelines, infrastructure as code, consistent release checks, and repeatable production deployment.",
    icon: "pipeline",
    serviceType: "CI/CD and DevOps automation services",
    contactProjectType: "CI/CD Pipeline Automation",
    primaryKeywords: ["CI/CD pipeline consulting", "DevOps automation tools", "Infrastructure as Code services", "DevOps automation services"],
    tools: ["GitHub Actions", "GitLab CI/CD", "Azure Pipelines", "Terraform", "Ansible", "Health checks"],
    problems: [
      "Build, test, infrastructure, and deployment steps are handled manually or inconsistently.",
      "Environment drift makes releases unpredictable across staging and production.",
      "The team lacks a clear release workflow with validation and rollback notes.",
    ],
    deliverables: [
      "CI/CD workflow design or implementation for build, deploy, validation, and rollback support.",
      "Infrastructure automation recommendations for repeatable server or cloud setup.",
      "Release runbook describing branch flow, secrets, approvals, health checks, and support handover.",
    ],
    approach: [
      "Document the current path from code commit to production and identify repeated manual steps.",
      "Automate the steps that reduce release risk without overcomplicating the delivery system.",
      "Validate the pipeline under realistic conditions and leave a practical handover.",
    ],
    useCases: ["Pipeline modernization", "Infrastructure as code planning", "Release validation automation"],
    relatedServiceHref: "/services/cicd-automation",
    relatedCaseStudyHref: "/case-studies/automated-cicd-deployment",
    faq: [
      {
        question: "Can automation include infrastructure as code?",
        answer:
          "Yes. Infrastructure as code can be included when repeatable cloud or server provisioning is valuable for the team and fits the scope.",
      },
      {
        question: "Do you support multiple CI/CD platforms?",
        answer:
          "Yes. Common platforms include GitHub Actions, GitLab CI/CD, Bitbucket Pipelines, and Azure Pipelines, depending on the repository and hosting setup.",
      },
    ],
  },
  {
    slug: "managed-cloud-services",
    shortTitle: "Managed Cloud",
    title: "Managed Cloud Services and DevOps Support",
    metaDescription:
      "Managed cloud services for monitoring, maintenance, deployment support, backups, incident response windows and ongoing DevOps operations.",
    h1: "Managed Cloud Services",
    eyebrow: "Managed operations",
    intro:
      "Managed cloud services for teams that need ongoing infrastructure checks, release assistance, monitoring review, incident support, and practical DevOps maintenance.",
    icon: "monitoring",
    serviceType: "Managed cloud services",
    contactProjectType: "Managed DevOps and Emergency Support",
    primaryKeywords: ["Managed cloud services", "DevOps support services", "cloud operations support", "managed DevOps"],
    tools: ["Monitoring", "Backups", "Linux", "CI/CD", "DNS", "SSL"],
    problems: [
      "Production infrastructure is live but nobody owns routine health, patch, monitoring, and deployment support.",
      "Incidents and certificate, DNS, disk, CPU, or CI/CD failures interrupt product work.",
      "The business needs a support cadence without hiring a full cloud operations team.",
    ],
    deliverables: [
      "Monthly or scoped infrastructure health checks with practical findings and next steps.",
      "Release support, monitoring review, backup checks, and incident response windows.",
      "Operational reports and improvement backlog for cloud and DevOps reliability.",
    ],
    approach: [
      "Define supported systems, access process, support window, escalation expectations, and known risks.",
      "Review infrastructure health, monitoring, backups, updates, and release workflow on a practical cadence.",
      "Document incidents and improvements so recurring issues become visible and fixable.",
    ],
    useCases: ["Monthly cloud care", "Release-window support", "Incident response retainer"],
    relatedServiceHref: "/services/managed-devops-support",
    relatedCaseStudyHref: "/case-studies/centralized-infrastructure-monitoring",
    faq: [
      {
        question: "Is managed cloud support available for small teams?",
        answer:
          "Yes. Support can be scoped for startups, agencies, SMBs, and SaaS teams that need practical operations help without a large platform team.",
      },
      {
        question: "Does managed cloud service guarantee 24/7 support?",
        answer:
          "Only if a specific contract defines that coverage. Standard support is scoped around agreed response windows, systems, and responsibilities.",
      },
    ],
  },
  {
    slug: "multicloud-architecture-design",
    shortTitle: "Multicloud Design",
    title: "Multicloud Architecture Design Services",
    metaDescription:
      "Multicloud architecture design for AWS, Azure, Google Cloud and hybrid infrastructure with deployment, monitoring and operational planning.",
    h1: "Multicloud Architecture Design",
    eyebrow: "Cloud architecture",
    intro:
      "Multicloud architecture design for organizations that need to coordinate workloads, deployment, observability, access, and operations across more than one cloud or hosting environment.",
    icon: "cloud",
    serviceType: "Multicloud architecture design",
    contactProjectType: "Multicloud Architecture Design",
    primaryKeywords: ["Multicloud architecture design", "cloud architecture consulting", "hybrid cloud consulting", "global cloud infrastructure"],
    tools: ["AWS", "Azure", "Google Cloud", "DNS", "CI/CD", "Observability"],
    problems: [
      "Applications, data, and environments are split across providers without a clear operating model.",
      "Deployment, monitoring, access, backups, and incident ownership differ between clouds.",
      "The team needs multicloud decisions grounded in business risk rather than vendor enthusiasm.",
    ],
    deliverables: [
      "Architecture review for current and target cloud environments, dependencies, risks, and operations.",
      "Multicloud or hybrid design notes covering deployment, observability, access, DNS, failover, and support.",
      "Implementation roadmap with sequencing, migration risk, cost signals, and validation checkpoints.",
    ],
    approach: [
      "Clarify why multicloud is needed: resilience, compliance, vendor strategy, region coverage, or existing constraints.",
      "Design the operating model before choosing extra services or adding complexity.",
      "Translate architecture decisions into deployable, monitorable, supportable implementation steps.",
    ],
    useCases: ["Hybrid cloud review", "Global infrastructure planning", "Cloud provider migration strategy"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Is multicloud always better than one cloud provider?",
        answer:
          "No. Multicloud can add resilience or strategic flexibility, but it also adds operational complexity. The choice should be justified by real business and technical needs.",
      },
      {
        question: "Can multicloud design include migration planning?",
        answer:
          "Yes. Migration sequencing, DNS, data movement, deployment validation, monitoring, and rollback planning can be included.",
      },
    ],
  },
];

export const seoMoneyPages = seoLandingPages;

export function getSeoLandingPageBySlug(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
