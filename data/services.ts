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
  sections: ReadonlyArray<{
    heading: string;
    body: string;
    bullets?: readonly string[];
  }>;
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
    relatedPackage: "DevOps Care",
    problems: ["Unclear production risks", "Manual deployments", "No practical handover or support model"],
    includes: ["Production readiness review", "Deployment and rollback planning", "Infrastructure support recommendations"],
    notIncluded: ["Fake uptime guarantees", "Broad security certifications", "Unscoped platform rewrites"],
    approach: ["Clarify goals and constraints", "Review access, release flow, and monitoring", "Deliver practical next steps"],
    examples: ["Production launch plan", "Release-risk review", "Ongoing DevOps support setup"],
    clientInputs: ["Application overview", "Hosting access summary", "Current deployment process", "Known incidents or risks"],
    afterImplementation: ["Handover notes", "Validation checklist", "Support and improvement options"],
    sections: [
      {
        heading: "When DevOps consulting fits best",
        body: "DevOps consulting is most valuable when a team is shipping product but hitting friction between development and production. Common triggers include a first production launch with no established release process, repeated outages caused by undocumented manual steps, or a growing codebase where multiple developers need to deploy safely. It also fits when a team has inherited infrastructure from a contractor or previous provider and nobody fully understands how it works. The engagement works best when leadership wants practical, prioritised guidance rather than a theoretical transformation roadmap. If the immediate need is to reduce deployment risk, improve visibility into production health, or establish basic operational discipline, a focused consulting engagement produces results faster than hiring or building an internal platform team from scratch.",
      },
      {
        heading: "What a typical engagement looks like",
        body: "A standard consulting engagement starts with a structured discovery phase. We review your repository, deployment scripts, server access model, monitoring setup, and any existing documentation. The goal is to map the real current state, not the assumed one. From there, we produce a prioritised list of risks and improvements, typically covering deployment flow, rollback capability, access controls, backup coverage, and alerting. Depending on scope, we then move into hands-on implementation of the highest-priority items. This might mean writing a CI/CD pipeline, setting up basic monitoring, hardening SSH access, or documenting a runbook. The engagement closes with a handover that includes what was changed, why, and what remains on the improvement backlog.",
        bullets: [
          "Discovery and current-state review",
          "Risk and gap analysis with prioritised findings",
          "Scoped implementation of critical improvements",
          "Handover documentation and next-step recommendations",
        ],
      },
      {
        heading: "Common pitfalls and how they are avoided",
        body: "The most frequent pitfall in DevOps consulting is scope creep driven by trying to fix everything at once. Production environments have many layers, and attempting to overhaul deployment, monitoring, security, and infrastructure simultaneously usually results in incomplete changes and no clear rollback path. We avoid this by scoping to the highest-risk areas first and treating everything else as a backlog item. Another common mistake is implementing tooling without documentation or knowledge transfer, which creates a new single point of failure. Every change in a consulting engagement should be paired with a runbook or handover note so the team can operate and extend what was built. Finally, skipping the access review phase leads to deployments that work for the consultant but not for the team.",
      },
      {
        heading: "Security and access considerations",
        body: "Before any hands-on work begins, we review who has access to production systems and how that access is granted. This includes SSH keys, cloud console permissions, CI/CD secrets, and database credentials. A common finding is shared keys across multiple people, or long-lived credentials with no rotation plan. While broad penetration testing is out of scope, the consulting engagement includes practical hardening recommendations such as disabling root SSH, enforcing key-based authentication, limiting sudo access, and storing secrets in environment variables rather than in repositories. If CI/CD pipelines are in scope, we also review how deployment credentials are managed and whether secrets could leak through logs, error output, or version history.",
      },
      {
        heading: "Operational handover and runbooks",
        body: "A consulting engagement without handover is a consulting dependency. Every implementation should produce documentation that the team can actually use. At minimum, this means a runbook covering how to deploy, how to roll back, how to check service health, and who to contact when something goes wrong. We also document the infrastructure decisions that were made and why, so future team members understand the reasoning behind configuration choices. Handover notes should live in the same repository as the application code or in a location the team already uses, not in a separate tool that nobody checks. The objective is to leave the team able to operate, troubleshoot, and extend what was built without requiring external support for routine tasks.",
      },
      {
        heading: "Monitoring, validation, and rollback planning",
        body: "Every deployment change should include a way to verify it worked and a way to reverse it if it did not. During a consulting engagement, we ensure that critical services have health-check endpoints, that the deployment process includes a post-deploy verification step, and that the team knows how to roll back quickly. This means pre-defining what success looks like after a deploy, such as specific HTTP status codes, log patterns, or database connectivity checks. Rollback planning covers not just the application but also the proxy configuration, environment variables, and any database migrations. Without explicit rollback steps, teams end up improvising during incidents, which increases downtime and risk.",
      },
      {
        heading: "Collaboration with your in-house team",
        body: "DevOps consulting works best when it is collaborative rather than extractive. We pair with the developers or operations staff who will maintain the systems after the engagement ends. This means walking through changes, explaining trade-offs, and making sure the team can reproduce what was done. In teams with limited operations experience, this might involve a short training session on how to read server logs, restart a service with PM2, or investigate disk pressure. In teams with more experience, it might mean reviewing the proposed architecture together and adjusting it based on constraints we did not see during discovery. The goal is shared ownership, not a handoff that nobody fully understands.",
      },
      {
        heading: "What good looks like after the engagement",
        body: "A successful consulting engagement produces measurable improvements in operational confidence. The team should be able to deploy a release without manual server access. Production health should be visible through dashboards or health checks rather than customer complaints. Access should be scoped to individual accounts rather than shared keys. Rollback steps should be documented and tested, not theoretical. The team should have a prioritised backlog of further improvements, ranked by production risk rather than convenience. Importantly, these outcomes should be sustainable without ongoing consultant involvement. If the engagement requires continued external support to maintain basic operations, the handover was not complete.",
      },
    ],
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
    relatedPackage: "Application deployment",
    problems: ["Fragile server setup", "Unclear access and DNS ownership", "Missing backup and firewall basics"],
    includes: ["Cloud server preparation", "DNS, proxy, SSL, and firewall setup", "Resource sizing and handover notes"],
    notIncluded: ["Enterprise cloud transformation", "Unverified cost-saving promises", "Advanced Kubernetes platform claims"],
    approach: ["Review application needs", "Provision or stabilize cloud resources", "Validate access, SSL, health, and backups"],
    examples: ["DigitalOcean production setup", "AWS EC2 application server", "Server migration and domain cutover"],
    clientInputs: ["Cloud account access", "Domain/DNS access", "Application runtime details", "Traffic and storage expectations"],
    afterImplementation: ["Server access notes", "Deployment checklist", "Monitoring and support recommendations"],
    sections: [
      {
        heading: "When cloud infrastructure work fits best",
        body: "Cloud infrastructure work fits best when an application needs a reliable, properly configured server but the current setup is either nonexistent, undocumented, or held together with manual steps. Typical scenarios include moving from a local development machine to a production VPS, migrating between providers such as DigitalOcean to AWS or vice versa, or stabilising an environment after a contractor hands it off. It also applies when DNS is misconfigured, SSL certificates keep expiring, or the firewall rules are either too permissive or too restrictive. If the team spends more time fighting the infrastructure than shipping product, the foundation needs attention before further feature work.",
      },
      {
        heading: "What a typical infrastructure engagement looks like",
        body: "The engagement begins with a review of the application requirements, expected traffic, storage needs, and any existing cloud resources. We then provision or stabilise the compute instance, configure DNS records, set up a reverse proxy with SSL termination, and apply firewall rules that allow only what is necessary. Resource sizing is based on the actual application profile rather than guesswork, which means checking what the application needs for CPU, memory, disk I/O, and network throughput. After provisioning, we validate everything: DNS resolution, SSL certificate validity, proxy routing, health-check endpoints, and backup execution. The engagement closes with access credentials, a deployment checklist, and notes on how to resize, back up, and monitor the server.",
        bullets: [
          "Application requirements review and resource sizing",
          "Compute provisioning, DNS, proxy, and SSL setup",
          "Firewall hardening and backup configuration",
          "Validation of DNS, SSL, health checks, and backups",
        ],
      },
      {
        heading: "Common pitfalls and how they are avoided",
        body: "The most frequent infrastructure pitfall is provisioning a server without considering resource sizing, which leads to either wasted spend on an oversized instance or performance problems on an undersized one. We avoid this by reviewing the application runtime requirements before selecting an instance type. Another common issue is DNS misconfiguration, particularly when domain ownership is unclear or multiple DNS providers are involved. We verify DNS authority early to avoid deployment delays. Firewall misconfiguration is also common, either leaving default rules that block everything or opening ports that should remain closed. We apply a principle of least privilege and document every rule. Finally, skipping backup verification means the team discovers backups are broken only when they need them.",
      },
      {
        heading: "Security and access considerations",
        body: "Cloud security starts with access control. We review who has console access to the cloud provider, who holds SSH keys, and whether API tokens are scoped appropriately. A common finding is a single root SSH key shared across the team, or a cloud console account with full administrative access used by everyone. Recommendations include creating individual SSH keys, disabling password-based authentication, restricting cloud console access to specific IP ranges, and enabling two-factor authentication on the provider account. At the infrastructure level, we configure UFW or the cloud provider firewall to allow only the ports the application actually needs. Unnecessary services, open database ports, and unused administrative interfaces are identified and closed.",
      },
      {
        heading: "Operational handover and runbooks",
        body: "Infrastructure handover means the team can operate, scale, and troubleshoot the server without external help. This includes documenting how to log in, how to restart services, how to check disk usage, how to expand a volume, and how to update SSL certificates. We also provide a DNS management reference that lists every record, its purpose, and where it is managed. Backup documentation covers what is backed up, where it is stored, how to restore from a backup, and how to verify that backups are working. All handover materials are stored in a location the team already uses, such as the application repository or an internal wiki, rather than in a separate tool that gets forgotten.",
      },
      {
        heading: "Monitoring, validation, and rollback planning",
        body: "After infrastructure provisioning, we validate that every component works as expected. This includes testing DNS resolution from multiple locations, verifying that SSL certificates are valid and will not expire unexpectedly, confirming that the reverse proxy routes traffic correctly to the application, and running a health-check request against the production URL. For rollback, we document the steps to revert DNS changes, remove a faulty firewall rule, or restore a server snapshot. If the engagement involves a migration from an existing server, we keep the old server running in parallel until the new environment is validated, with a documented cutover plan that includes a specific rollback trigger if the new environment fails acceptance checks.",
      },
      {
        heading: "Collaboration with your in-house team",
        body: "Infrastructure work requires cooperation with the team that will own the server day-to-day. We review the existing access model, understand deployment workflows, and identify who is responsible for monitoring, backups, and incident response. If the team has limited Linux experience, we walk through basic server management tasks and provide reference commands. If the team already has operations capability, we focus on the infrastructure gaps and ensure our configuration choices align with their existing practices. We also discuss resource-cost trade-offs, so the team can make informed decisions about instance sizing and provider selection. The objective is infrastructure the team understands and can manage independently.",
      },
      {
        heading: "What good looks like after infrastructure setup",
        body: "After a successful infrastructure engagement, the server should resolve DNS correctly from any location, serve the application over a valid SSL connection, and block all unnecessary network access. Backups should be running on a defined schedule with documented restoration steps. The team should know how to log in, check service health, restart the application, and expand resources when needed. Disk usage, memory, and CPU should be monitored with alerts configured for thresholds that matter to the application. Cloud console access should be scoped per individual with appropriate permissions. If the team can deploy, monitor, and troubleshoot the server without external help for routine issues, the infrastructure is in good shape.",
      },
    ],
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
    shortTitle: "CI/CD pipeline",
    title: "CI/CD Pipeline Automation",
    description:
      "Build and release workflows that reduce manual deployment risk and make repeatable releases easier.",
    icon: "pipeline",
    visual: "Build, test, package, deploy, validate",
    details: ["GitHub Actions, GitLab CI, Bitbucket", "Secure SSH deployment pipelines", "Health checks and rollback notes"],
    technologies: ["GitHub Actions", "Bitbucket Pipelines", "SSH", "PM2", "Health Checks"],
    relatedPackage: "CI/CD pipeline",
    problems: ["Manual release steps", "Unclear rollback path", "Inconsistent server deployments"],
    includes: ["Build and deploy workflows", "Secret and environment handling", "Deployment validation and rollback notes"],
    notIncluded: ["Complex enterprise release trains", "Unscoped test-suite rewrites", "Deployment without access review"],
    approach: ["Map the current release process", "Automate build and deployment steps", "Validate health checks and handover"],
    examples: ["Bitbucket pipeline", "GitHub Actions deployment", "Secure SSH release flow"],
    clientInputs: ["Repository access", "Deployment commands", "Environment variables", "Server access and branch strategy"],
    afterImplementation: ["Pipeline documentation", "Rollback notes", "Release checklist"],
    sections: [
      {
        heading: "When CI/CD automation fits best",
        body: "CI/CD automation fits best when the team currently deploys by running commands manually over SSH, copying files to a server, or repeating a sequence of steps that only one person remembers. It is also valuable when multiple developers need to push releases but there is no standardised process, leading to inconsistent deployments where the production state depends on who deployed last. The service is most effective when the build and deployment steps are already understood but are not yet automated. If the team needs to deploy more frequently with less risk, or if new team members cannot release without shadowing someone who knows the manual process, automation removes that dependency.",
      },
      {
        heading: "What a typical pipeline engagement looks like",
        body: "The engagement starts by mapping the current release process end to end. We document every step from code commit to production traffic, including build commands, environment variable injection, file transfers, service restarts, and any manual verification. From this map, we design a pipeline that automates each step with appropriate error handling and logging. Secrets are handled through the CI platform's secret management rather than hardcoded in scripts or environment files. After the pipeline is implemented, we test it with a real deployment, verify the production health-check response, and confirm rollback steps work. The engagement closes with pipeline documentation, a release checklist, and notes on what to do when the pipeline fails.",
        bullets: [
          "Current release process mapping and documentation",
          "Pipeline design with build, deploy, and validation stages",
          "Secret management and environment variable configuration",
          "End-to-end testing with rollback verification",
        ],
      },
      {
        heading: "Common pitfalls and how they are avoided",
        body: "The most common CI/CD pitfall is building a pipeline that works only for the person who set it up. This happens when deployment scripts assume local paths, environment variables are not documented, or the pipeline depends on a tool installed on one machine but not in the CI environment. We avoid this by running the pipeline in a clean environment and verifying that every dependency is declared. Another frequent issue is secrets leaking through logs. We review pipeline output configuration and ensure sensitive values are masked. Pipelines that do not handle failure gracefully are also common, where a partial deployment leaves the server in an unknown state. Every deployment step should have a clear success or failure outcome with corresponding next actions.",
      },
      {
        heading: "Security and access considerations",
        body: "Pipeline security starts with how deployment credentials are stored and used. SSH keys for server access should be stored as CI platform secrets, not committed to the repository. Database credentials, API keys, and environment variables should be injected through the pipeline secret manager at runtime. We review the permissions granted to the deployment key and ensure it can only perform the actions required for deployment, not arbitrary server access. If the pipeline uses a cloud provider for deployment, we apply the principle of least privilege to API tokens. Additionally, we verify that build logs do not print secrets, that error messages do not expose credential values, and that the pipeline runs on infrastructure that isolates builds from each other.",
      },
      {
        heading: "Operational handover and runbooks",
        body: "A CI/CD pipeline is only useful if the team can maintain and troubleshoot it. The handover includes documentation of every pipeline stage, what each step does, and where to look when a stage fails. We document how to add new environment variables, how to modify deployment targets, and how to skip or retry a failed pipeline run. Common failure modes and their resolution steps are included, such as SSH timeout during deployment, build cache issues, or dependency installation failures. The team should be able to modify the pipeline for new features, services, or deployment targets without external help. Pipeline configuration lives in the repository alongside the application code, so changes follow the same review process as application changes.",
      },
      {
        heading: "Monitoring, validation, and rollback",
        body: "Every pipeline deployment should include a validation stage that checks the application health after the deploy completes. This can be as simple as an HTTP request to a health-check endpoint that returns a specific status code, or it can include checking application logs for startup errors. The pipeline should also support rollback, either by reverting to a previous deployment artifact or by re-running a prior pipeline run. We document how to trigger a rollback manually when the automated validation passes but the team identifies a problem after deployment. For rollback to work, the pipeline must preserve previous deployment artifacts and maintain a record of what was deployed to each environment and when.",
      },
      {
        heading: "Collaboration with your in-house team",
        body: "Pipeline work requires understanding the team's branching strategy, release cadence, and quality gates. We review whether the team uses feature branches, trunk-based development, or a release-branch model, and we design the pipeline trigger accordingly. If the team has QA or review steps before production, the pipeline should include appropriate approval gates or environment stages. We also discuss how the pipeline interacts with the team's local development workflow, ensuring that developers can run builds locally that match what the CI environment produces. The handover includes walking through the pipeline configuration with the team so they can extend and modify it as the application evolves.",
      },
      {
        heading: "What good looks like after pipeline automation",
        body: "A well-implemented CI/CD pipeline means any developer can trigger a production deployment by merging to the release branch or pushing a tag, without needing SSH access or knowledge of server-specific commands. The pipeline builds the application, installs dependencies, deploys the artifacts, restarts services, and validates the health check in a single automated sequence. Failed deployments produce clear error messages and do not leave the server in a broken state. Secrets are never in the repository. Rollback is a documented, tested operation that the team can execute confidently. The pipeline configuration is version-controlled and reviewed through the same pull request process as application code.",
      },
    ],
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
    relatedPackage: "Application deployment",
    problems: ["Builds fail on server", "App restarts are unreliable", "Proxy, SSL, and env setup are unclear"],
    includes: ["Production build setup", "PM2 process management", "Reverse proxy, SSL, and environment configuration"],
    notIncluded: ["Full application rewrite", "Database redesign", "Unverified traffic-capacity guarantees"],
    approach: ["Review runtime requirements", "Prepare server and process manager", "Validate route, SSL, and restart behavior"],
    examples: ["Next.js standalone deployment", "NestJS API deployment", "Node.js app behind Nginx or Apache"],
    clientInputs: ["Repository or build artifact", "Environment variables", "Domain access", "Runtime and database details"],
    afterImplementation: ["Runbook", "Restart notes", "Release and monitoring recommendations"],
    sections: [
      {
        heading: "When application deployment fits best",
        body: "Application deployment is the right service when the code is ready but production hosting is not. This applies to teams that have a working application locally but no clear path to deploying it, teams whose current deployment process involves manual file transfers over SSH, or teams whose application keeps crashing because the process manager, reverse proxy, or environment variables are misconfigured. It is also relevant when a developer has been running the application with a development server in production and needs to move to a production-grade setup with PM2, Nginx, SSL, and proper process recovery. If the application works locally but fails or behaves differently in production, the deployment configuration needs attention.",
      },
      {
        heading: "What a typical deployment engagement looks like",
        body: "The engagement begins with a review of the application runtime requirements: which Node.js version, which framework, what build steps, and what environment variables are needed. We then prepare the server by installing the required runtime, configuring the build process, and setting up PM2 with appropriate memory limits, restart policies, and log management. The reverse proxy is configured with SSL termination, routing rules for static assets and API routes, and proper headers for security and caching. After deployment, we verify every route, check SSL certificate validity, test application restart behaviour, and validate that environment variables are loaded correctly. The engagement closes with a runbook covering deployment commands, restart procedures, and log locations.",
        bullets: [
          "Runtime review and server environment preparation",
          "PM2 configuration with restart and log management",
          "Reverse proxy setup with SSL and routing rules",
          "Post-deploy validation of routes, SSL, and restarts",
        ],
      },
      {
        heading: "Common pitfalls and how they are avoided",
        body: "The most frequent deployment pitfall is running a development build in production. Next.js development mode, for example, does not optimise output, compiles on the fly, and uses significantly more memory than a production build. We ensure the production build step runs on the server or is included in the CI pipeline so the deployed artifact is optimised. Another common issue is PM2 running out of memory because the max-memory-restart flag is not configured, causing silent crashes. We set memory limits based on the application profile. Reverse proxy misconfiguration is also frequent, where requests for static assets are routed through the Node.js process instead of being served directly, degrading performance. We configure proxy rules to serve static files from the build output directory.",
      },
      {
        heading: "Security and access considerations",
        body: "Application deployment requires careful handling of secrets and access. Environment variables containing database credentials, API keys, and service tokens should be stored in a .env file outside the web root or injected through a process manager configuration, not committed to the repository. We review the server's SSH access model and ensure the deployment user has only the permissions necessary to restart services and manage files, not full administrative access. The reverse proxy should add security headers including X-Content-Type-Options, X-Frame-Options, and Strict-Transport-Security. We also verify that the application does not expose stack traces, debug information, or internal paths in error responses served to clients.",
      },
      {
        heading: "Operational handover and runbooks",
        body: "Deployment handover means the team can deploy, restart, and troubleshoot the application independently. The runbook covers how to pull the latest code, run the build step, restart PM2, and verify the deployment. It includes the locations of PM2 logs, the Nginx or Apache configuration files, and the environment variable file. Common troubleshooting scenarios are documented, such as what to do when the application runs out of memory, when SSL renewal fails, or when a deployment produces a blank page. The runbook also includes the command to check PM2 status, view application logs, and restart the process. All documentation is stored alongside the application code or in a location the team already uses.",
      },
      {
        heading: "Monitoring, validation, and rollback planning",
        body: "After deployment, we validate the application by testing every route type: static pages, API endpoints, dynamic routes with parameters, and asset serving. We check that the SSL certificate is valid and that HTTP requests are redirected to HTTPS. Application restart behaviour is tested by simulating a process crash and verifying that PM2 restarts the process automatically. For rollback, we document how to revert to the previous build by restoring the build artifact and restarting PM2. If database migrations were part of the deployment, rollback steps include how to reverse or skip the migration. The team should have a clear understanding of what to check after every deployment and how to revert if something goes wrong.",
      },
      {
        heading: "Collaboration with your in-house team",
        body: "Application deployment requires understanding the team's development workflow and release process. We review how the team builds the application locally, what environment variables differ between development and production, and how the team currently manages secrets. If the team uses a CI/CD pipeline, we integrate the deployment steps into that pipeline. If deployment is triggered manually, we ensure the team understands every step and can execute it without external help. We also discuss how the deployment handles feature flags, maintenance mode, and environment-specific configuration, so the team can manage releases for different environments. The objective is a deployment process the team owns and can modify as the application evolves.",
      },
      {
        heading: "What good looks like after deployment",
        body: "After a successful deployment, the application should start automatically after a server reboot, restart automatically if the process crashes, and serve all routes over a valid SSL connection. The build output should be optimised for production, not running in development mode. Environment variables should be loaded from a secure location, not hardcoded in the application or exposed in version control. The team should be able to deploy a new version by running a documented set of commands that takes under a minute. PM2 logs should be accessible and rotated to prevent disk exhaustion. If the team can deploy, verify, and roll back without external support, the deployment is production-ready.",
      },
    ],
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
    relatedPackage: "Application deployment",
    problems: ["Inconsistent local and server environments", "Containers without clear volumes or logs", "Unclear deployment handover"],
    includes: ["Dockerfile and Compose review", "Containerized app setup", "Volume, env, network, and log guidance"],
    notIncluded: ["Advanced Kubernetes platform builds", "Unscoped microservice migration", "Managed database administration"],
    approach: ["Review app runtime", "Build container workflow", "Validate restart, storage, logs, and deployment"],
    examples: ["Node.js Dockerfile", "Docker Compose app stack", "Containerized API with reverse proxy"],
    clientInputs: ["Application runtime", "Required services", "Environment variables", "Storage and backup needs"],
    afterImplementation: ["Compose notes", "Operational commands", "Monitoring recommendations"],
    sections: [
      {
        heading: "When containerisation fits best",
        body: "Containerisation fits best when the application behaves differently on different machines or servers, or when the deployment process involves installing dependencies directly on the host operating system. Common triggers include a developer saying it works on my machine, a server migration that requires reinstalling every dependency manually, or a stack where multiple services need isolated environments. Docker Compose is particularly useful when the application depends on supporting services like MongoDB, Redis, or PostgreSQL and the team wants a single command to start the entire stack. It is also valuable when the team wants to standardise the development environment so every developer runs the same setup without manual configuration.",
      },
      {
        heading: "What a typical container engagement looks like",
        body: "The engagement starts by reviewing the application runtime: what language, what dependencies, what supporting services, and what file system access is needed. We write or refine a Dockerfile that produces a production-appropriate image, using multi-stage builds where applicable to keep the final image small. Docker Compose is configured to orchestrate the application container alongside any database, cache, or proxy services, with named volumes for persistent data and a defined network for inter-service communication. After the compose file is ready, we test the full stack, verify that volumes persist data across container restarts, check log output is accessible, and validate health checks. The engagement closes with documentation on how to build, run, update, and troubleshoot the containerised stack.",
        bullets: [
          "Runtime review and Dockerfile authoring or refinement",
          "Docker Compose orchestration with volumes and networking",
          "Full-stack testing including persistence and health checks",
          "Documentation for build, run, update, and troubleshooting",
        ],
      },
      {
        heading: "Common pitfalls and how they are avoided",
        body: "The most common Docker pitfall is running as root inside the container, which creates security issues and file permission problems on bind mounts. We add a non-root user to the Dockerfile and configure the application to run with appropriate permissions. Another frequent issue is large images caused by including development dependencies, build tools, or unnecessary system packages in the final image. Multi-stage builds separate the build stage from the runtime stage, reducing image size significantly. Containers that do not persist data properly are also common, where database or upload data disappears after a container restart because volumes were not configured. We define named volumes for every directory that must persist and document backup procedures for those volumes.",
      },
      {
        heading: "Security and access considerations",
        body: "Container security begins with the Dockerfile. We avoid running the container as root, do not hardcode secrets in the image, and do not store credentials in environment variables visible through docker inspect. Secrets are passed through Docker Compose environment files or mounted as files from the host, depending on the deployment model. We review the Docker host's security, ensuring the Docker socket is not exposed to the application or the network, and that the user who can run Docker commands is appropriately restricted. Network configuration is reviewed to ensure containers only expose the ports necessary for their function, and that database containers are not accessible from the public network.",
      },
      {
        heading: "Operational handover and runbooks",
        body: "Container handover means the team can build images, start and stop the stack, view logs, and troubleshoot containers without external help. The runbook covers the docker-compose commands for starting, stopping, rebuilding, and viewing logs. It documents how to check container health, how to enter a running container for debugging, and how to inspect volumes to verify data persistence. Common failure scenarios and their resolution steps are included, such as a container that exits immediately due to a configuration error, a volume permission issue, or a port conflict. The team should understand how to update a container image and redeploy without downtime when the application supports it.",
      },
      {
        heading: "Monitoring, validation, and rollback",
        body: "After the container stack is running, we validate every component. The application container should respond to health checks, database containers should accept connections, and the network should allow inter-service communication while blocking external access to internal services. We verify that restarting a container preserves its data through named volumes and that the docker-compose restart policy brings containers back after a host reboot. Rollback is handled by keeping the previous image tag available and documenting how to pin the compose file to a specific image version. If a new deployment introduces a regression, the team can revert the image tag and restart the stack to return to the previous state.",
      },
      {
        heading: "Collaboration with your in-house team",
        body: "Container work requires understanding the team's development environment, deployment infrastructure, and existing practices. We review how the team currently runs the application locally and whether Docker is already part of their workflow. If the team is new to containers, we walk through the core concepts and ensure they can build, run, and troubleshoot independently. If the team already uses Docker, we focus on production readiness, image optimisation, and compose orchestration improvements. We also discuss how containers interact with the team's CI/CD pipeline, ensuring images are built and pushed through an automated process rather than built manually on the production server.",
      },
      {
        heading: "What good looks like after containerisation",
        body: "A well-containerised application starts with a single docker-compose up command and produces a fully running stack with the application, database, and any supporting services. The Dockerfile produces a minimal image with only runtime dependencies. Volumes persist data across container restarts. Health checks detect and report container failures. Logs are accessible through docker-compose logs without requiring SSH into the container. The team can rebuild and redeploy the stack by running documented commands. The previous image version is tagged and available for rollback. If a new developer can run the full stack locally after reading the documentation, the containerisation has achieved its goal of environment consistency.",
      },
    ],
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
    relatedPackage: "Production issue fix",
    problems: ["Unmanaged Linux servers", "Weak access controls", "CPU, memory, disk, or log issues"],
    includes: ["User and SSH review", "Firewall and package update checks", "Web-server and system log troubleshooting"],
    notIncluded: ["Penetration testing", "VAPT reports", "SOC 2 compliance work"],
    approach: ["Audit access and services", "Apply scoped hardening", "Document risks and next maintenance steps"],
    examples: ["SSH hardening", "SSL and web-server repair", "Disk pressure investigation"],
    clientInputs: ["Server access", "Known incident details", "Web-server config", "Current access requirements"],
    afterImplementation: ["Hardening summary", "Maintenance notes", "Monitoring and backup recommendations"],
    sections: [
      {
        heading: "When server hardening and troubleshooting fit best",
        body: "Linux server security work fits best when the server was set up quickly to ship a feature and was never revisited for operational hygiene. Common triggers include an incident where the cause was unclear because logs were not being collected, a request to add a new team member and realising there is no defined access model, or discovering that the server has not had package updates in months. It also applies when the team notices performance degradation from high CPU, memory usage, or disk pressure and needs a structured investigation. If the server runs with root SSH enabled, no firewall rules, or outdated packages, it needs hardening before it is exposed to production traffic.",
      },
      {
        heading: "What a typical hardening engagement looks like",
        body: "The engagement begins with an audit of the server's current state. We review active SSH configurations, user accounts, sudo permissions, running services, open ports, installed packages, and system logs. We identify which services are unnecessary and should be disabled, which users have more access than they need, and which ports are exposed without justification. Hardening steps are then applied in order of risk: disabling root SSH, enforcing key-based authentication, configuring UFW to allow only required ports, and scheduling unattended security updates. For troubleshooting engagements, we investigate the specific symptom, whether it is high memory usage, disk exhaustion, or a web-server error, and apply a targeted fix with documentation. The engagement closes with a hardening summary and maintenance recommendations.",
        bullets: [
          "Server audit covering access, services, ports, and packages",
          "Hardening applied in order of production risk",
          "Targeted troubleshooting for specific symptoms",
          "Summary with maintenance schedule and monitoring notes",
        ],
      },
      {
        heading: "Common pitfalls and how they are avoided",
        body: "The most frequent server security pitfall is disabling password SSH without first verifying that key-based authentication is configured and working. This locks people out of the server. We test key-based login in a separate session before disabling passwords. Another common issue is applying firewall rules that block the deployment pipeline or monitoring agent, causing silent failures. We review every active service and CI/CD integration before modifying UFW rules. Package updates applied without reviewing changelogs can also break running services, particularly kernel updates or library version bumps. We review the update scope and test in a staging environment when possible. Finally, log rotation is often unconfigured, leading to disk exhaustion from unbounded log files.",
      },
      {
        heading: "Security and access considerations",
        body: "Server security starts with access. We audit every user account on the system, review their sudo permissions, and remove accounts that are no longer needed. SSH is hardened by disabling root login, enforcing key-based authentication, and optionally restricting which users can connect. We review the SSH port and consider changing it if the server receives excessive automated login attempts. Firewall rules are configured to allow only the ports the application and its supporting services require, with a default deny policy. We also review cron jobs, startup scripts, and running services to identify anything unexpected. For web servers, we check SSL configuration, security headers, and directory listing settings to prevent information exposure.",
      },
      {
        heading: "Operational handover and runbooks",
        body: "Server hardening without documentation creates a situation where nobody understands the current security posture. The handover includes a summary of every change made: which users were modified, which SSH settings were changed, which firewall rules were applied, and which packages were updated. We provide a maintenance schedule that covers when to apply security updates, how to check disk usage, how to review login attempts, and how to verify that backups are working. Troubleshooting steps for common scenarios are included, such as what to do when a service fails to start after an update, when disk usage exceeds a threshold, or when a new team member needs access. All documentation is stored in a location the team can access.",
      },
      {
        heading: "Monitoring, validation, and rollback",
        body: "After hardening, we validate that the application still functions correctly by testing every public endpoint, verifying SSL certificate validity, and confirming that monitoring agents can reach their collection endpoints. We check that the deployment pipeline can still push code by running a test deployment. Login attempts are monitored to verify that the new SSH configuration rejects invalid credentials as expected. For rollback, we document the previous SSH configuration, firewall rules, and package versions so changes can be reversed if they cause issues. UFW changes are applied with a defined rollback window during which the old rules are preserved in case of unexpected access problems.",
      },
      {
        heading: "Collaboration with your in-house team",
        body: "Server security work requires understanding the team's access needs, deployment process, and operational practices. We review who needs server access, what level of access they require, and how access should be revoked when someone leaves the team. If the team uses a CI/CD pipeline, we verify that hardening changes do not break the deployment process. If the team has limited Linux experience, we explain every change in practical terms and provide reference commands for common tasks. We also discuss which maintenance tasks the team can handle internally and which ones warrant periodic review. The goal is a server the team understands well enough to maintain and troubleshoot independently.",
      },
      {
        heading: "What good looks like after hardening",
        body: "A well-hardened Linux server has no root SSH access, uses key-based authentication for all users, runs a firewall that allows only necessary ports, and applies security updates on a regular schedule. Unnecessary services are disabled, and user accounts reflect the current team with appropriate permission levels. Disk usage is monitored and logs are rotated to prevent exhaustion. The team knows how to add a new user, check login attempts, review disk usage, and apply security updates. SSL certificates renew automatically. The deployment pipeline works without issues caused by hardening changes. If the server passes a basic security review without requiring urgent fixes, the hardening has achieved its purpose.",
      },
    ],
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
    relatedPackage: "Monitoring setup",
    problems: ["No reliable uptime visibility", "No server-health signals", "Incidents discovered too late"],
    includes: ["Metrics collection", "Grafana dashboards", "Uptime checks and alert routing"],
    notIncluded: ["Full observability platform procurement", "SRE team replacement", "Fake incident response guarantees"],
    approach: ["Define important signals", "Install exporters and dashboards", "Validate alert paths and runbook notes"],
    examples: ["Server resource dashboard", "Application health checks", "Blackbox uptime monitoring"],
    clientInputs: ["Server access", "Critical URLs", "Notification channel", "Expected health criteria"],
    afterImplementation: ["Dashboard links", "Alert notes", "Maintenance and tuning recommendations"],
    sections: [
      {
        heading: "When monitoring and observability fit best",
        body: "Monitoring is most valuable when the team learns about production problems from customers rather than from dashboards or alerts. Common triggers include outages that were only discovered after users reported them, performance degradation that was not caught until revenue was affected, or a server running out of disk space with no prior warning. It also applies when the team has basic access to server metrics through commands like top or df but needs historical trends and alerting to understand patterns over time. If the team cannot answer basic questions about production health, such as current CPU usage, response times, or uptime percentage, monitoring fills that gap.",
      },
      {
        heading: "What a typical monitoring engagement looks like",
        body: "The engagement starts by identifying the signals that matter to the application. For a web application, this typically includes HTTP response times, error rates, server CPU and memory usage, disk usage, and uptime. We install Node Exporter on the server to collect system metrics and Blackbox Exporter to probe HTTP endpoints from the server's perspective. Prometheus is configured to scrape both exporters on a defined interval, and Grafana is set up with dashboards that visualise the collected data. Alerting rules are configured in Prometheus Alertmanager with notification routing to email or another channel. After setup, we validate that alerts fire correctly by simulating threshold breaches and verify that the notification reaches the intended recipient.",
        bullets: [
          "Signal identification based on application requirements",
          "Node Exporter and Blackbox Exporter installation",
          "Prometheus scrape configuration and Grafana dashboard setup",
          "Alert rule configuration with notification validation",
        ],
      },
      {
        heading: "Common pitfalls and how they are avoided",
        body: "The most common monitoring pitfall is alert fatigue, where too many alerts fire for conditions that are not actionable. We avoid this by defining alerts only for conditions that require human intervention and setting thresholds that reflect actual production impact rather than theoretical minimums. Another frequent issue is monitoring the server but not the application, where CPU and memory look normal but the application is returning errors. We ensure Blackbox Exporter probes the application's HTTP endpoints and that alert rules cover both server health and application health. Dashboards that are too complex or too simple are also common. We build dashboards that answer the most important questions first and allow drill-down for investigation.",
      },
      {
        heading: "Security and access considerations",
        body: "Monitoring systems need access to metrics endpoints and should be configured with that access in mind. Prometheus and Grafana should not be exposed to the public internet without authentication. We configure Prometheus to listen on localhost or a private network interface and access it through SSH tunneling or a reverse proxy with authentication. Grafana is configured with user accounts and role-based access, not left open with anonymous access. Alertmanager notification channels are reviewed to ensure sensitive information is not exposed in alert messages. Exporter endpoints are scoped to expose only the metrics necessary for monitoring, not arbitrary system information. The monitoring stack itself is reviewed for resource impact to ensure it does not degrade the application it is monitoring.",
      },
      {
        heading: "Operational handover and runbooks",
        body: "Monitoring handover means the team can add new dashboards, adjust alert thresholds, and troubleshoot the monitoring stack independently. The runbook covers how to access Grafana, how to add a new Prometheus scrape target, how to modify alert rules, and how to test that alerts fire and route correctly. We document the dashboard layout, explaining what each panel shows and what normal values look like so the team can distinguish normal variation from actual problems. Common monitoring issues and their resolution steps are included, such as Prometheus failing to scrape a target, Grafana showing no data, or alerts not reaching the notification channel. The team should be able to maintain the monitoring stack without external help.",
      },
      {
        heading: "Monitoring validation and alert testing",
        body: "After the monitoring stack is deployed, we validate every component by testing the full alert path. We simulate a high CPU condition and verify that Prometheus fires the alert, Alertmanager routes it, and the notification reaches the intended channel with the correct information. We check that Blackbox Exporter probes are reporting correctly and that the Grafana dashboards display meaningful data within the expected scrape interval. We verify that historical data is being retained appropriately and that the monitoring stack's own resource usage is acceptable. We also test that the team can access Grafana, query Prometheus, and understand the alert names and their meanings.",
      },
      {
        heading: "Collaboration with your in-house team",
        body: "Monitoring work benefits from understanding the team's operational practices and the signals they already pay attention to. We review what the team currently checks when something goes wrong and incorporate those signals into the dashboards. If the team has preferred notification channels or escalation procedures, we integrate those into the alerting configuration. We also discuss which metrics the team wants to track over time, such as deployment frequency, response time trends, or resource usage growth. If the team has limited experience with Prometheus or Grafana, we provide a practical walkthrough of the query language and dashboard configuration so they can extend the monitoring as the application evolves.",
      },
      {
        heading: "What good looks like after monitoring setup",
        body: "After a successful monitoring engagement, the team should be able to answer basic production health questions from a Grafana dashboard without SSH-ing into the server. Uptime should be measured and visible, not assumed. CPU, memory, disk, and network metrics should have historical trends that make it possible to identify patterns and predict capacity needs. Alerts should fire for conditions that require action and reach the right person through a verified notification channel. The team should understand what normal looks like for each metric and be able to recognise when something deviates. If an incident occurs, the monitoring stack should provide enough information to diagnose the problem without requiring log spelunking.",
      },
    ],
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
    relatedPackage: "DevOps Care",
    problems: ["No internal DevOps support", "Recurring incidents", "Release windows need technical backup"],
    includes: ["Routine infrastructure checks", "Release assistance", "Incident triage and support notes"],
    notIncluded: ["24/7 guaranteed support without a contract", "Unlimited unscoped engineering work", "Application feature development"],
    approach: ["Define support scope and response window", "Review current infrastructure", "Create a practical maintenance rhythm"],
    examples: ["Monthly care package", "Emergency production support", "Release-window assistance"],
    clientInputs: ["Infrastructure overview", "Access process", "Known maintenance tasks", "Preferred communication channel"],
    afterImplementation: ["Support cadence", "Health summary", "Improvement backlog"],
    sections: [
      {
        heading: "When managed DevOps support fits best",
        body: "Managed DevOps support fits best when a team has a production application but no dedicated operations person, and incidents or maintenance tasks fall on developers who would rather focus on product work. Common triggers include recurring outages with no clear owner for investigation, SSL certificates that expire because nobody tracked renewal, or a deployment process that only one person understands and that person is unavailable. It also applies when the team has basic monitoring but no structured maintenance rhythm, leading to accumulated technical debt in the infrastructure. If the team wants a reliable technical partner who knows the production environment and can respond quickly when things break, managed support fills that role.",
      },
      {
        heading: "What a typical support engagement looks like",
        body: "The engagement begins with an infrastructure review to understand the production environment, deployment process, monitoring setup, and known issues. We establish a support scope that defines what is covered, response time expectations, and the preferred communication channel for urgent issues. Routine maintenance visits are scheduled at a defined cadence, typically monthly, and include checks on disk usage, SSL certificate expiry, backup status, package updates, and monitoring health. When incidents occur, we triage the issue, apply a fix if the scope allows, and document the root cause and resolution. Every interaction produces a brief note so the team has a record of what was checked, fixed, or recommended.",
        bullets: [
          "Infrastructure review and support scope definition",
          "Scheduled maintenance visits with health checks",
          "Incident triage and resolution with documentation",
          "Ongoing notes and improvement recommendations",
        ],
      },
      {
        heading: "Common pitfalls and how they are avoided",
        body: "The most frequent pitfall in managed support is undefined scope, which leads to either unbounded requests or unclear response expectations. We avoid this by documenting exactly what is covered, what is out of scope, and the response window for different urgency levels. Another common issue is reactive-only support, where maintenance is limited to fixing what breaks and preventive checks are skipped. Our maintenance cadence includes proactive checks on disk, SSL, backups, and updates so issues are caught before they cause outages. Support relationships that lack documentation also fail over time, because the support provider does not have context about past decisions. Every interaction is documented with enough detail to provide continuity.",
      },
      {
        heading: "Security and access considerations",
        body: "Managed support requires access to production systems, which means the access model needs careful management. We review who has access, how that access is granted, and whether it should be revoked when the support engagement changes. SSH keys, cloud console credentials, and CI/CD secrets used during support are documented and rotated according to an agreed schedule. We ensure that support access follows the same least-privilege principles as internal access: enough to diagnose and fix issues, not enough to make unauthorised changes. During urgent incidents, we work within the agreed scope and escalate questions about changes outside that scope rather than making assumptions.",
      },
      {
        heading: "Operational handover and runbooks",
        body: "Support handover means the team understands what was done during every maintenance visit and incident response. We maintain a support log that records every check performed, every issue found, every fix applied, and every recommendation made. When the team needs to handle something themselves, we provide clear instructions. For example, how to restart a service, how to check disk usage, or how to verify that a backup completed. This documentation grows over time as the support engagement accumulates context about the production environment. If the engagement ends, the team retains a complete record of the infrastructure's maintenance history and the current state of known issues and improvements.",
      },
      {
        heading: "Monitoring, validation, and rollback",
        body: "Managed support includes verifying that the monitoring stack is healthy during every maintenance visit. We check that Prometheus is scraping targets, Grafana dashboards are displaying data, and alerts are routing correctly. After any incident response, we validate the fix by confirming the application is responding normally and that the conditions that caused the incident have been resolved. We also verify that any changes made during the incident do not affect the deployment pipeline, backup schedule, or other automated processes. Rollback plans for common fixes are documented as part of the support notes, so the team can reverse a change if it causes unexpected side effects.",
      },
      {
        heading: "Collaboration with your in-house team",
        body: "Managed support works best when it complements the team's existing capabilities rather than replacing them. We review the team's current operations practices, identify the areas where they need the most help, and prioritise support accordingly. If the team has developers who are comfortable with basic server tasks, we focus support on the more complex issues and proactive maintenance. If the team has limited operations experience, we provide more detailed documentation and walk through common tasks. We also integrate with the team's communication practices, using their preferred channel for updates and ensuring that every support interaction includes enough context for the team to understand what was done and why.",
      },
      {
        heading: "What good looks like in ongoing support",
        body: "A well-managed support engagement produces a measurable reduction in unexpected incidents. SSL certificates renew without intervention. Disk usage alerts trigger before they become critical. Backup restoration is tested and documented. The team has a reliable response channel for urgent issues and a clear understanding of what is covered. Maintenance visits produce actionable findings rather than generic reports. The support log provides continuity across incidents, so recurring issues are identified and addressed at the root cause rather than treated as isolated events. Over time, the engagement should shift from reactive incident response to preventive maintenance as the infrastructure matures.",
      },
    ],
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
