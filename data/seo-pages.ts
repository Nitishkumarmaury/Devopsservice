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
  {
    slug: "cloud-computing-services",
    shortTitle: "Cloud Computing",
    title: "Cloud Computing Services and Managed Cloud Support",
    metaDescription:
      "Cloud computing services for architecture, migration, DevOps, security, monitoring, cost control and managed operations.",
    h1: "Cloud Computing Services",
    eyebrow: "Enterprise cloud",
    intro:
      "Cloud computing services for organizations that need practical architecture, migration, deployment automation, monitoring, security readiness, cost control, and managed cloud operations across modern platforms.",
    icon: "cloud",
    serviceType: "Cloud computing services",
    contactProjectType: "Cloud Infrastructure",
    primaryKeywords: ["Cloud computing services", "cloud services", "cloud solutions", "managed cloud services"],
    tools: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform", "OpenTelemetry"],
    problems: [
      "Cloud decisions are spread across hosting, deployment, security, cost, and monitoring without one operating model.",
      "The organization needs to modernize infrastructure while keeping production stable.",
      "Teams need cloud guidance that connects architecture decisions to daily delivery and support.",
    ],
    deliverables: [
      "Cloud service roadmap covering architecture, migration, DevOps, observability, security, and cost priorities.",
      "Implementation support for cloud environments, networking, deployment flow, and production validation.",
      "Managed cloud recommendations for support cadence, monitoring, backups, and incident response.",
    ],
    approach: [
      "Review current workloads, providers, teams, compliance expectations, and operational pain points.",
      "Design the smallest reliable cloud path that improves scalability, security, cost visibility, and delivery speed.",
      "Implement in stages with validation checks, documentation, and clear handover.",
    ],
    useCases: ["Cloud modernization", "Managed cloud operations", "Global cloud infrastructure planning"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "What do cloud computing services include?",
        answer:
          "They can include cloud architecture, migration, DevOps automation, server management, Kubernetes guidance, monitoring, security readiness, cost review, backup planning, and managed support.",
      },
      {
        question: "Can cloud services start with an audit?",
        answer:
          "Yes. A cloud audit is often the best first step because it clarifies workload risk, cost signals, access boundaries, deployment gaps, and monitoring needs.",
      },
    ],
  },
  {
    slug: "cloud-infrastructure-services",
    shortTitle: "Cloud Infrastructure",
    title: "Cloud Infrastructure Services for Production Teams",
    metaDescription:
      "Cloud infrastructure services for servers, networking, DNS, SSL, monitoring, backups, CI/CD and production operations.",
    h1: "Cloud Infrastructure Services",
    eyebrow: "Infrastructure engineering",
    intro:
      "Cloud infrastructure services for teams that need reliable servers, networking, DNS, SSL, deployment automation, backups, monitoring, access controls, and production operations.",
    icon: "cloud",
    serviceType: "Cloud infrastructure services",
    contactProjectType: "AWS and DigitalOcean Cloud Infrastructure",
    primaryKeywords: ["Cloud infrastructure services", "cloud infrastructure", "cloud hosting", "cloud operations"],
    tools: ["AWS EC2", "DigitalOcean", "Nginx", "Apache", "DNS", "SSL"],
    problems: [
      "Servers, domains, SSL, firewalls, backups, and deployments are configured inconsistently.",
      "Infrastructure changes happen without clear validation or ownership.",
      "Production reliability depends on undocumented commands and manual checks.",
    ],
    deliverables: [
      "Cloud server and networking setup or cleanup with secure access, DNS, SSL, and process management.",
      "Deployment and validation notes for application routes, logs, health checks, and restart behavior.",
      "Monitoring, backup, firewall, and support recommendations for ongoing operations.",
    ],
    approach: [
      "Map the current cloud resources, domains, runtime needs, and risk areas.",
      "Stabilize the infrastructure layer before adding advanced cloud services.",
      "Validate access, uptime, deployment, and recovery steps with practical handover notes.",
    ],
    useCases: ["Production server setup", "Cloud infrastructure cleanup", "Domain and SSL migration"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Which cloud providers do you support?",
        answer:
          "Common engagements include AWS, DigitalOcean, Azure, Google Cloud, Oracle Cloud, Linode, Vultr, and Linux-based hosting where production operations need improvement.",
      },
      {
        question: "Can cloud infrastructure work include CI/CD?",
        answer:
          "Yes. Infrastructure setup often includes deployment workflow review, secret handling, build commands, release validation, and rollback notes.",
      },
    ],
  },
  {
    slug: "cloud-migration-services",
    shortTitle: "Cloud Migration",
    title: "Cloud Migration Services for SaaS and Enterprises",
    metaDescription:
      "Cloud migration services for SaaS and web apps with discovery, architecture, data planning, DNS, CI/CD, rollback and monitoring.",
    h1: "Cloud Migration Services",
    eyebrow: "Migration planning",
    intro:
      "Cloud migration services for SaaS products, web applications, APIs, and production workloads that need dependency discovery, architecture planning, data safety, DNS cutover, deployment validation, and post-migration monitoring.",
    icon: "migration",
    serviceType: "Cloud migration services",
    contactProjectType: "Cloud Consulting and Migration",
    primaryKeywords: ["Cloud migration services", "cloud migration", "cloud migration experts", "cloud modernization"],
    tools: ["AWS", "Azure", "Google Cloud", "MongoDB", "PostgreSQL", "DNS"],
    problems: [
      "The current hosting setup is fragile, underdocumented, or hard to scale.",
      "Application dependencies, data, DNS, SSL, and background jobs are not fully mapped.",
      "The team needs migration without unnecessary downtime or guesswork.",
    ],
    deliverables: [
      "Migration readiness assessment covering dependencies, data, DNS, downtime tolerance, and rollback.",
      "Target architecture and migration sequence for cloud infrastructure, deployment, monitoring, and support.",
      "Cutover validation checklist with post-migration health, logs, backup, and alert checks.",
    ],
    approach: [
      "Discover workloads, dependencies, access, storage, databases, network paths, and operational constraints.",
      "Plan staged migration with backups, DNS TTL strategy, health checks, and rollback points.",
      "Execute the migration with monitoring and document the new operating model.",
    ],
    useCases: ["VPS to cloud migration", "Database migration planning", "SaaS infrastructure modernization"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "How do you reduce risk during cloud migration?",
        answer:
          "Risk is reduced through dependency discovery, backups, DNS planning, staged validation, monitoring, rollback notes, and a clear post-cutover support window.",
      },
      {
        question: "Can you migrate from one cloud provider to another?",
        answer:
          "Yes. Provider-to-provider migration can be scoped after reviewing workloads, data transfer, networking, DNS, identity, deployment, and downtime constraints.",
      },
    ],
  },
  {
    slug: "cloud-architecture-design",
    shortTitle: "Cloud Architecture",
    title: "Cloud Architecture Design Services",
    metaDescription:
      "Cloud architecture design for scalable, secure and observable AWS, Azure, Google Cloud, hybrid and multicloud systems.",
    h1: "Cloud Architecture Design Services",
    eyebrow: "Architecture design",
    intro:
      "Cloud architecture design for teams that need scalable, secure, observable, cost-aware infrastructure across public cloud, hybrid cloud, multicloud, Kubernetes, serverless, and managed services.",
    icon: "cloud",
    serviceType: "Cloud architecture design",
    contactProjectType: "Cloud Architecture Design",
    primaryKeywords: ["Cloud architecture", "cloud architecture design", "cloud solutions", "cloud transformation"],
    tools: ["VPC", "Load Balancer", "API Gateway", "Kubernetes", "Serverless", "Observability"],
    problems: [
      "Architecture decisions are made reactively as traffic, incidents, and cloud costs grow.",
      "Security, networking, deployment, and observability are not designed as one system.",
      "The team needs a target architecture that can actually be implemented and operated.",
    ],
    deliverables: [
      "Cloud architecture review and target-state design with workload, network, security, and deployment notes.",
      "Implementation roadmap covering migration sequence, monitoring, cost signals, and resilience priorities.",
      "Architecture handover that explains tradeoffs, dependencies, and future improvement paths.",
    ],
    approach: [
      "Clarify application goals, traffic patterns, data needs, compliance expectations, and team capacity.",
      "Design architecture around reliability, security, cost, operability, and future change.",
      "Translate architecture into deployable phases with validation and handover.",
    ],
    useCases: ["SaaS cloud architecture", "Hybrid cloud design", "High availability planning"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Does cloud architecture design include implementation?",
        answer:
          "It can. Some engagements deliver architecture only, while others continue into cloud setup, CI/CD, monitoring, migration, or managed support.",
      },
      {
        question: "Can architecture include compliance readiness?",
        answer:
          "Yes. The design can account for access control, logging, backups, encryption, change tracking, and documentation needed for readiness conversations.",
      },
    ],
  },
  {
    slug: "platform-engineering-services",
    shortTitle: "Platform Engineering",
    title: "Platform Engineering Services",
    metaDescription:
      "Platform engineering services for internal developer platforms, CI/CD, GitOps, Kubernetes, IaC, observability and automation.",
    h1: "Platform Engineering Services",
    eyebrow: "Platform engineering",
    intro:
      "Platform engineering services for teams that want reusable delivery workflows, self-service infrastructure patterns, stronger developer experience, and safer production operations.",
    icon: "kubernetes",
    serviceType: "Platform engineering services",
    contactProjectType: "Platform Engineering",
    primaryKeywords: ["Platform engineering", "platform automation", "enterprise DevOps", "DevOps solutions"],
    tools: ["Kubernetes", "GitOps", "ArgoCD", "FluxCD", "Terraform", "CI/CD"],
    problems: [
      "Developers need faster delivery, but infrastructure work is inconsistent and hard to reuse.",
      "CI/CD, environments, secrets, observability, and deployment patterns differ across teams.",
      "Platform work is being attempted without a clear product mindset or operating model.",
    ],
    deliverables: [
      "Platform engineering assessment covering delivery workflows, environments, automation, and team needs.",
      "Reusable implementation patterns for CI/CD, infrastructure provisioning, observability, and release validation.",
      "Platform roadmap with ownership, adoption, documentation, and support recommendations.",
    ],
    approach: [
      "Identify the highest-friction developer and operations workflows.",
      "Standardize repeatable platform capabilities without hiding critical production responsibility.",
      "Document usage patterns, guardrails, and support paths for adoption.",
    ],
    useCases: ["Internal developer platform planning", "GitOps adoption", "Reusable CI/CD templates"],
    relatedServiceHref: "/services/devops-consulting",
    relatedCaseStudyHref: "/case-studies/automated-cicd-deployment",
    faq: [
      {
        question: "Is platform engineering only for large enterprises?",
        answer:
          "No. Smaller teams can use platform engineering principles by standardizing deployment, infrastructure, environment, and observability patterns before building a full platform.",
      },
      {
        question: "Can platform engineering include Kubernetes?",
        answer:
          "Yes, when Kubernetes is justified. Platform work can also start with CI/CD, templates, infrastructure as code, monitoring, and documentation.",
      },
    ],
  },
  {
    slug: "infrastructure-as-code-services",
    shortTitle: "IaC and Terraform",
    title: "Infrastructure as Code and Terraform Consulting",
    metaDescription:
      "Infrastructure as code services with Terraform, OpenTofu and Ansible for repeatable cloud provisioning and automation.",
    h1: "Infrastructure as Code and Terraform Consulting",
    eyebrow: "Infrastructure automation",
    intro:
      "Infrastructure as code services for teams that need repeatable cloud provisioning, safer reviews, cleaner environment setup, and automation using Terraform, OpenTofu, Ansible, and CI/CD workflows.",
    icon: "pipeline",
    serviceType: "Infrastructure as code services",
    contactProjectType: "Infrastructure as Code Services",
    primaryKeywords: ["Infrastructure as Code", "Terraform consulting", "Terraform experts", "OpenTofu"],
    tools: ["Terraform", "OpenTofu", "Ansible", "GitHub Actions", "State management", "Policy checks"],
    problems: [
      "Cloud resources are created manually and drift from documented architecture.",
      "Environment setup is slow, inconsistent, or risky to reproduce.",
      "Infrastructure changes lack review, state management, and rollback thinking.",
    ],
    deliverables: [
      "Infrastructure as code assessment and implementation plan for cloud resources and environments.",
      "Terraform, OpenTofu, or Ansible modules and workflows aligned with team skill and risk level.",
      "Documentation for state, variables, secrets, review process, and future maintenance.",
    ],
    approach: [
      "Choose the right automation scope based on current infrastructure maturity.",
      "Codify high-value resources first, with state handling and review guardrails.",
      "Validate provisioning and document the operating model before expanding coverage.",
    ],
    useCases: ["Terraform module setup", "OpenTofu migration planning", "Ansible server automation"],
    relatedServiceHref: "/services/cicd-automation",
    relatedCaseStudyHref: "/case-studies/automated-cicd-deployment",
    faq: [
      {
        question: "Can you work with Terraform and OpenTofu?",
        answer:
          "Yes. The engagement can include Terraform or OpenTofu planning, module structure, state review, variables, CI/CD integration, and migration considerations.",
      },
      {
        question: "Is Ansible still useful with Terraform?",
        answer:
          "Yes. Terraform is usually stronger for provisioning cloud resources, while Ansible can help with configuration management and server automation.",
      },
    ],
  },
  {
    slug: "devsecops-consulting",
    shortTitle: "DevSecOps",
    title: "DevSecOps Consulting and Cloud Security Services",
    metaDescription:
      "DevSecOps consulting for cloud security, CI/CD controls, IAM, secrets, server hardening and compliance readiness.",
    h1: "DevSecOps Consulting and Cloud Security Services",
    eyebrow: "Security in delivery",
    intro:
      "DevSecOps consulting for teams that need security built into cloud operations, CI/CD workflows, access control, secrets management, server hardening, monitoring, and compliance readiness.",
    icon: "security",
    serviceType: "DevSecOps consulting",
    contactProjectType: "DevSecOps Consulting",
    primaryKeywords: ["DevSecOps consulting", "cloud security services", "cloud compliance", "zero trust"],
    tools: ["IAM", "Secrets management", "Cloud firewall", "Linux hardening", "CI/CD checks", "Vault"],
    problems: [
      "Security is reviewed late, after infrastructure and deployment decisions are already in production.",
      "Access, secrets, firewall rules, logs, and approvals are not consistently managed.",
      "The team needs compliance readiness without confusing it with a formal audit.",
    ],
    deliverables: [
      "DevSecOps review covering CI/CD, access, secrets, server hardening, logs, and cloud exposure.",
      "Prioritized security improvements for delivery workflows and production operations.",
      "Readiness notes for SOC 2, ISO 27001, HIPAA, GDPR, or PCI conversations where applicable.",
    ],
    approach: [
      "Review current delivery and infrastructure controls before adding new tools.",
      "Close practical risk gaps around access, secrets, patching, network exposure, and logging.",
      "Document what was improved, what remains, and which formal compliance work is separate.",
    ],
    useCases: ["Cloud security review", "CI/CD security controls", "Compliance readiness cleanup"],
    relatedServiceHref: "/services/linux-server-security",
    relatedCaseStudyHref: "/case-studies/production-performance-investigation",
    faq: [
      {
        question: "Is DevSecOps the same as a compliance audit?",
        answer:
          "No. DevSecOps improves security practices in delivery and operations. Formal SOC 2, ISO 27001, HIPAA, GDPR, or PCI audits require qualified audit processes.",
      },
      {
        question: "Can security work start with CI/CD?",
        answer:
          "Yes. CI/CD is often a useful starting point for secret handling, approval rules, dependency checks, image checks, and deployment validation.",
      },
    ],
  },
  {
    slug: "sre-consulting-services",
    shortTitle: "SRE",
    title: "SRE Consulting and Incident Response Services",
    metaDescription:
      "SRE consulting for reliability, observability, SLOs, incident response, runbooks, disaster recovery and production support.",
    h1: "SRE Consulting and Incident Response Services",
    eyebrow: "Reliability engineering",
    intro:
      "SRE consulting for teams that need clearer reliability targets, observability, incident response, runbooks, disaster recovery thinking, and production support practices.",
    icon: "monitoring",
    serviceType: "Site reliability engineering consulting",
    contactProjectType: "Production Troubleshooting",
    primaryKeywords: ["Site Reliability Engineering", "SRE consulting", "incident response", "cloud reliability"],
    tools: ["SLOs", "Prometheus", "Grafana", "Logs", "Runbooks", "Disaster recovery"],
    problems: [
      "Production incidents repeat because symptoms are fixed without operational learning.",
      "The team lacks clear uptime signals, ownership, runbooks, or response paths.",
      "Reliability work is not prioritized against business impact and delivery pressure.",
    ],
    deliverables: [
      "Reliability review covering monitoring, alerts, incident response, runbooks, and recovery gaps.",
      "SLO and service health recommendations for the most important user-facing systems.",
      "Incident response notes and improvement backlog for support and engineering teams.",
    ],
    approach: [
      "Identify critical services, failure modes, current signals, and response responsibilities.",
      "Improve observability and runbooks before introducing complex SRE ceremonies.",
      "Turn incidents into prioritized reliability and recovery improvements.",
    ],
    useCases: ["Incident response setup", "SLO planning", "Production reliability review"],
    relatedServiceHref: "/services/monitoring-observability",
    relatedCaseStudyHref: "/case-studies/centralized-infrastructure-monitoring",
    faq: [
      {
        question: "Do small teams need SRE practices?",
        answer:
          "Yes, but scaled appropriately. Small teams often benefit most from clear health checks, alert routing, runbooks, backup validation, and release safety.",
      },
      {
        question: "Can SRE consulting include emergency troubleshooting?",
        answer:
          "Yes, when scope, access, risk, and response expectations are clear. Emergency work should still include notes and follow-up recommendations.",
      },
    ],
  },
  {
    slug: "cloud-cost-optimization",
    shortTitle: "Cloud Cost",
    title: "Cloud Cost Optimization and FinOps Services",
    metaDescription:
      "Cloud cost optimization and FinOps services for AWS, Azure and Google Cloud sizing, waste reduction and budget visibility.",
    h1: "Cloud Cost Optimization and FinOps Services",
    eyebrow: "FinOps",
    intro:
      "Cloud cost optimization and FinOps services for teams that need better visibility into AWS, Azure, Google Cloud, logs, storage, backups, sizing, scaling, and operational waste.",
    icon: "performance",
    serviceType: "Cloud cost optimization services",
    contactProjectType: "Cloud Infrastructure",
    primaryKeywords: ["FinOps", "cloud cost optimization", "AWS cost optimization", "Azure cost optimization"],
    tools: ["AWS Cost Explorer", "Budgets", "Resource sizing", "Autoscaling", "Storage lifecycle", "Monitoring"],
    problems: [
      "Cloud spend is rising without clear connection to traffic, reliability, or product needs.",
      "Unused resources, oversized servers, logs, backups, and storage policies are not regularly reviewed.",
      "Cost reduction efforts risk breaking performance because production signals are weak.",
    ],
    deliverables: [
      "Cloud cost review covering compute, storage, backups, logs, monitoring, traffic, and unused resources.",
      "Optimization backlog ranked by savings potential, reliability risk, and implementation effort.",
      "Budget visibility and monitoring recommendations for ongoing cost governance.",
    ],
    approach: [
      "Review spend patterns together with architecture, traffic, uptime, and support needs.",
      "Separate safe cleanup from changes that require performance testing or business approval.",
      "Implement measured optimizations with monitoring and rollback awareness.",
    ],
    useCases: ["AWS cost review", "Startup cloud budget cleanup", "FinOps operating model"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/production-performance-investigation",
    faq: [
      {
        question: "Can cost optimization reduce reliability?",
        answer:
          "It can if done carelessly. Good FinOps work uses monitoring, traffic context, backup needs, and business risk to avoid false savings.",
      },
      {
        question: "Do you support AWS, Azure, and Google Cloud cost reviews?",
        answer:
          "Yes. Cost reviews can be scoped for AWS, Azure, Google Cloud, DigitalOcean, or hybrid hosting depending on available billing and infrastructure access.",
      },
    ],
  },
  {
    slug: "ai-infrastructure-services",
    shortTitle: "AI Infrastructure",
    title: "AI Infrastructure and MLOps Consulting",
    metaDescription:
      "AI infrastructure consulting for LLM deployment, GPU planning, MLOps, model serving, observability and cloud operations.",
    h1: "AI Infrastructure and MLOps Consulting",
    eyebrow: "AI infrastructure",
    intro:
      "AI infrastructure consulting for teams planning LLM deployment, GPU workloads, model serving, MLOps pipelines, observability, cost control, and secure cloud operations.",
    icon: "kubernetes",
    serviceType: "AI infrastructure consulting",
    contactProjectType: "Cloud Architecture Design",
    primaryKeywords: ["AI infrastructure", "LLM infrastructure", "GPU cloud", "MLOps"],
    tools: ["GPU instances", "Kubernetes", "Model serving", "Vector storage", "Monitoring", "CI/CD"],
    problems: [
      "AI prototypes need a production path for deployment, monitoring, security, and cost control.",
      "GPU, model serving, data access, and scaling decisions are being made without operations planning.",
      "The team needs a practical bridge from experiment to reliable cloud service.",
    ],
    deliverables: [
      "AI infrastructure readiness review covering workload shape, GPU needs, deployment, security, and observability.",
      "MLOps and model-serving architecture notes with scaling, rollback, and monitoring considerations.",
      "Cloud operations plan for cost signals, access, incident response, and handover.",
    ],
    approach: [
      "Clarify model workload, latency needs, data sensitivity, traffic, and budget constraints.",
      "Design deployment and operations around reliability, security, observability, and cost visibility.",
      "Validate the production path before scaling expensive AI infrastructure.",
    ],
    useCases: ["LLM deployment planning", "GPU cloud architecture", "MLOps production readiness"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/centralized-infrastructure-monitoring",
    faq: [
      {
        question: "Can AI infrastructure start without Kubernetes?",
        answer:
          "Yes. Some AI workloads can start with simpler cloud deployment patterns before Kubernetes is justified by scale, isolation, or operations needs.",
      },
      {
        question: "What should be monitored for LLM infrastructure?",
        answer:
          "Useful signals include latency, error rate, queue depth, resource usage, GPU utilization, cost, logs, model endpoint health, and dependency failures.",
      },
    ],
  },
  {
    slug: "observability-services",
    shortTitle: "Observability",
    title: "Observability Services with Prometheus and Grafana",
    metaDescription:
      "Observability services for monitoring, logging, tracing, Prometheus, Grafana, OpenTelemetry, alerts and incident visibility.",
    h1: "Observability Services",
    eyebrow: "Monitoring and telemetry",
    intro:
      "Observability services for teams that need monitoring, logging, tracing, uptime checks, dashboards, alerting, OpenTelemetry readiness, and clearer production incident visibility.",
    icon: "monitoring",
    serviceType: "Observability services",
    contactProjectType: "Monitoring, Grafana and Alerting",
    primaryKeywords: ["Observability", "cloud monitoring", "Prometheus", "Grafana"],
    tools: ["Prometheus", "Grafana", "OpenTelemetry", "ELK Stack", "Node Exporter", "Blackbox Exporter"],
    problems: [
      "Incidents are hard to diagnose because metrics, logs, uptime checks, and application health are disconnected.",
      "Alerts are noisy, missing, or not tied to practical response notes.",
      "The team cannot easily explain what changed before production behavior degraded.",
    ],
    deliverables: [
      "Monitoring and observability plan covering metrics, logs, traces, uptime checks, dashboards, and alerts.",
      "Prometheus, Grafana, OpenTelemetry, or log pipeline implementation support where appropriate.",
      "Runbook notes for interpreting signals and responding to common production failures.",
    ],
    approach: [
      "Define the service health signals that matter to users and support teams.",
      "Install lightweight telemetry first, then improve dashboards and alerts based on real operating needs.",
      "Validate signal quality and remove noise so monitoring stays useful.",
    ],
    useCases: ["Prometheus Grafana setup", "OpenTelemetry readiness", "Logging and alert cleanup"],
    relatedServiceHref: "/services/monitoring-observability",
    relatedCaseStudyHref: "/case-studies/centralized-infrastructure-monitoring",
    faq: [
      {
        question: "What is the difference between monitoring and observability?",
        answer:
          "Monitoring tracks known signals such as uptime and resource usage. Observability helps teams investigate unknown failures using connected metrics, logs, traces, and context.",
      },
      {
        question: "Can observability be added gradually?",
        answer:
          "Yes. Many teams start with uptime checks, server metrics, dashboards, and alert routing before adding traces or deeper application instrumentation.",
      },
    ],
  },
  {
    slug: "disaster-recovery-cloud-backup",
    shortTitle: "Disaster Recovery",
    title: "Disaster Recovery and Cloud Backup Services",
    metaDescription:
      "Disaster recovery and cloud backup services for continuity planning, restore checks, failover notes and production resilience.",
    h1: "Disaster Recovery and Cloud Backup Services",
    eyebrow: "Business continuity",
    intro:
      "Disaster recovery and cloud backup services for teams that need safer backup strategy, restore validation, failover planning, recovery notes, and business continuity awareness.",
    icon: "security",
    serviceType: "Disaster recovery and cloud backup services",
    contactProjectType: "Cloud Infrastructure",
    primaryKeywords: ["Disaster recovery", "business continuity", "cloud backup", "backup solutions"],
    tools: ["Backups", "Object storage", "Database dumps", "Restore checks", "DNS", "Runbooks"],
    problems: [
      "Backups exist but nobody has recently tested restore behavior.",
      "Failure scenarios, recovery ownership, DNS decisions, and data-loss tolerance are unclear.",
      "The business needs practical continuity planning before an incident happens.",
    ],
    deliverables: [
      "Backup and recovery review covering data, files, databases, configuration, retention, and restore process.",
      "Disaster recovery notes for likely failure modes, response sequence, and validation checks.",
      "Recommendations for backup automation, monitoring, storage, and support responsibilities.",
    ],
    approach: [
      "Identify critical systems, data sources, recovery expectations, and acceptable downtime.",
      "Review backup coverage and test restore steps where scope and access allow.",
      "Document recovery runbooks and improvement priorities for continuity planning.",
    ],
    useCases: ["Backup strategy review", "Restore validation", "Cloud recovery planning"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/production-performance-investigation",
    faq: [
      {
        question: "Is having backups enough for disaster recovery?",
        answer:
          "No. Disaster recovery also needs restore validation, ownership, runbooks, monitoring, DNS planning, and realistic expectations for downtime and data loss.",
      },
      {
        question: "Can you review existing backups?",
        answer:
          "Yes. Existing backup jobs, retention, storage, database dumps, restore commands, and monitoring can be reviewed and improved.",
      },
    ],
  },
  {
    slug: "google-cloud-consulting-services",
    shortTitle: "Google Cloud",
    title: "Google Cloud Consulting Services",
    metaDescription:
      "Google Cloud consulting for cloud architecture, migration, CI/CD, Kubernetes, monitoring, security and cost optimization.",
    h1: "Google Cloud Consulting Services",
    eyebrow: "Google Cloud",
    intro:
      "Google Cloud consulting for teams planning cloud architecture, migration, Kubernetes, CI/CD, monitoring, security readiness, and practical cloud operations.",
    icon: "cloud",
    serviceType: "Google Cloud consulting services",
    contactProjectType: "Google Cloud Consulting",
    primaryKeywords: ["Google Cloud consulting", "GCP consulting", "Google Cloud cost optimization", "cloud consulting company"],
    tools: ["Google Cloud", "GKE", "Cloud Run", "Cloud Functions", "Cloud SQL", "Cloud Monitoring"],
    problems: [
      "Google Cloud services are being adopted without a clear deployment and operations model.",
      "The team needs help choosing between GKE, Cloud Run, Compute Engine, and managed services.",
      "Monitoring, IAM, cost, and release workflows need practical review.",
    ],
    deliverables: [
      "Google Cloud architecture and workload review with deployment, IAM, monitoring, and cost notes.",
      "Migration or implementation plan for Compute Engine, GKE, Cloud Run, or managed services.",
      "Operational handover covering release flow, logs, alerts, backups, and support.",
    ],
    approach: [
      "Review current workload and Google Cloud constraints before selecting services.",
      "Design around reliability, security, cost, and team operating capability.",
      "Validate deployment and monitoring before handover.",
    ],
    useCases: ["GCP migration planning", "GKE readiness", "Cloud Run deployment review"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Can you compare Google Cloud with AWS or Azure?",
        answer:
          "Yes. Provider choice can be reviewed against workload needs, existing accounts, team familiarity, compliance expectations, cost signals, and managed service fit.",
      },
      {
        question: "Can Google Cloud consulting include Kubernetes?",
        answer:
          "Yes. GKE and Kubernetes planning can be included when orchestration is justified by the workload and team operations model.",
      },
    ],
  },
  {
    slug: "digitalocean-consulting",
    shortTitle: "DigitalOcean",
    title: "DigitalOcean Consulting and Deployment Services",
    metaDescription:
      "DigitalOcean consulting for Droplets, app deployment, databases, DNS, SSL, monitoring, backups and DevOps automation.",
    h1: "DigitalOcean Consulting and Deployment Services",
    eyebrow: "DigitalOcean",
    intro:
      "DigitalOcean consulting for startups and SMBs that need practical Droplet setup, app deployment, managed database planning, DNS, SSL, monitoring, backups, and CI/CD automation.",
    icon: "cloud",
    serviceType: "DigitalOcean consulting services",
    contactProjectType: "AWS and DigitalOcean Cloud Infrastructure",
    primaryKeywords: ["DigitalOcean consulting", "DigitalOcean deployment", "Linode consulting", "Vultr consulting"],
    tools: ["DigitalOcean", "Droplets", "Ubuntu", "Nginx", "PM2", "Backups"],
    problems: [
      "A VPS is running production, but deployment, SSL, monitoring, and backups are not cleanly managed.",
      "The team needs a cost-aware cloud setup without unnecessary enterprise complexity.",
      "Server maintenance and release steps rely on one person or undocumented commands.",
    ],
    deliverables: [
      "DigitalOcean server setup or review covering runtime, DNS, SSL, firewall, process manager, and backups.",
      "Deployment workflow and validation checklist for web apps, APIs, and background services.",
      "Monitoring and maintenance recommendations for ongoing operations.",
    ],
    approach: [
      "Review the current Droplet, app stack, database needs, access, and production risk.",
      "Stabilize the Linux server, proxy, SSL, deployment, and monitoring basics.",
      "Document operating commands, checks, and future scaling paths.",
    ],
    useCases: ["DigitalOcean production setup", "Droplet migration", "Startup VPS hardening"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Is DigitalOcean suitable for production apps?",
        answer:
          "Yes, for many startups and SMB workloads when server setup, security basics, backups, monitoring, and deployment operations are handled properly.",
      },
      {
        question: "Can you also work with Linode or Vultr?",
        answer:
          "Yes. Similar Linux server, DNS, SSL, monitoring, backup, and deployment principles apply to Linode, Vultr, and other VPS providers.",
      },
    ],
  },
  {
    slug: "oracle-cloud-consulting-services",
    shortTitle: "Oracle Cloud",
    title: "Oracle Cloud and OCI Consulting Services",
    metaDescription:
      "Oracle Cloud consulting for OCI infrastructure, migration planning, Linux servers, networking, monitoring and DevOps operations.",
    h1: "Oracle Cloud and OCI Consulting Services",
    eyebrow: "Oracle Cloud",
    intro:
      "Oracle Cloud and OCI consulting for teams that need infrastructure planning, migration review, Linux server operations, networking, monitoring, deployment automation, and practical cloud support.",
    icon: "cloud",
    serviceType: "Oracle Cloud consulting services",
    contactProjectType: "Cloud Infrastructure",
    primaryKeywords: ["Oracle Cloud consulting", "OCI consulting", "cloud consulting", "cloud infrastructure"],
    tools: ["Oracle Cloud", "OCI Compute", "Linux", "Networking", "Load Balancer", "Monitoring"],
    problems: [
      "OCI resources need clearer architecture, access, networking, deployment, and monitoring decisions.",
      "A workload is moving to Oracle Cloud and needs migration risk planning.",
      "The team wants cloud operations support without adding unnecessary complexity.",
    ],
    deliverables: [
      "OCI infrastructure review covering compute, network, access, deployment, observability, and backup needs.",
      "Migration or setup plan with validation, rollback, and support considerations.",
      "Operational notes for Linux servers, web routing, monitoring, and release workflow.",
    ],
    approach: [
      "Review workload needs and OCI account constraints before designing infrastructure changes.",
      "Prioritize stable compute, networking, access, monitoring, and deployment operations.",
      "Validate production behavior and document handover details.",
    ],
    useCases: ["OCI migration review", "Oracle Cloud server setup", "Hybrid cloud operations"],
    relatedServiceHref: "/services/cloud-infrastructure",
    relatedCaseStudyHref: "/case-studies/multi-application-production-deployment",
    faq: [
      {
        question: "Can OCI consulting include Linux server management?",
        answer:
          "Yes. OCI engagements can include Linux server setup, proxying, SSL, monitoring, deployment automation, backups, and operational handover.",
      },
      {
        question: "Can Oracle Cloud be part of a hybrid architecture?",
        answer:
          "Yes. Hybrid design can be reviewed around workloads, networking, DNS, data movement, identity, monitoring, and support responsibilities.",
      },
    ],
  },
];

export const seoMoneyPages = seoLandingPages;

export function getSeoLandingPageBySlug(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
