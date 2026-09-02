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
] as const;

export type SolutionPage = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  challenges: ReadonlyArray<{ title: string; body: string }>;
  approach: ReadonlyArray<{ title: string; body: string }>;
  recommendedServices: ReadonlyArray<{ label: string; href: string }>;
  faq: ReadonlyArray<{ question: string; answer: string }>;
};

export const solutionPages: SolutionPage[] = [
  {
    slug: "for-startups",
    name: "Startups",
    title: "DevOps for Startups",
    metaDescription: "Practical DevOps for startups: fast cloud setup, simple CI/CD, basic monitoring, and a clear path from MVP to production without premature complexity.",
    eyebrow: "Solution for Startups",
    intro: "Most startups do not need a sprawling Kubernetes cluster or a full DevOps organization on day one. They need a lean, reliable foundation that supports rapid iteration while keeping the path from MVP to production simple enough for a small team to operate without burning out.",
    challenges: [
      {
        title: "Lean budgets versus reliable infrastructure",
        body: "Startups rarely have the capacity for dedicated platform engineers, yet they still need workloads to stay online while they are pitching, onboarding early customers, or demoing to investors. The real challenge is deciding where to invest time and money so that infrastructure cost scales with usage rather than demanding a large fixed budget upfront. Managed services and well-chosen defaults often deliver more reliability per dollar than hand-rolled setups, provided someone understands what those defaults actually do and where their limits are.",
      },
      {
        title: "Simple CI/CD that does not become a blocker",
        body: "Early teams usually deploy by hand or with a single script, which works until a bad push takes the site down and no one can roll back quickly. Introducing a basic pipeline that builds, tests, and deploys in a straightforward way removes the most common failure points, but over-engineering the pipeline is just as dangerous as having none. The right level of automation is one that a founding engineer can extend in an afternoon and that does not add gatekeeping friction to every pull request.",
      },
      {
        title: "Avoiding premature Kubernetes",
        body: "Kubernetes is frequently adopted in the earliest stage of a company because it is what engineers have read about, yet it brings operational overhead that a two-person engineering team is rarely ready to carry. Managing control planes, node upgrades, networking policies, and observability tooling around clusters consumes time that could otherwise go to the product. A startup should only reach for Kubernetes once workloads, scaling requirements, and staffing justify it, and even then only with clear ownership and tooling already in place.",
      },
      {
        title: "Monitoring that is actually watched",
        body: "It is common for a team to install monitoring and then never look at it until an alert fires at 3 a.m. The challenge is not the tooling itself but the habits around it: knowing which metrics matter for the business, setting thresholds that reflect real problems, and building a routine that surfaces issues before customers do. Without that discipline, dashboards become decoration and alerts become noise that everyone learns to ignore.",
      },
      {
        title: "Ambiguous ownership of infrastructure",
        body: "In a small team, the question of who owns the server, the database, or the deployment pipeline is often unspoken until something fails. Responsibilities drift between founders, contractors, and whoever was awake during an incident, producing inconsistent outcomes and no lasting knowledge. Clear, documented ownership for each environment and service prevents critical infrastructure from being maintained by nobody in particular and makes the system survivable when the original builder leaves.",
      },
    ],
    approach: [
      {
        title: "Start with a predictable cloud layout",
        body: "Begin by establishing a single, well-organized cloud account with separate environments for development, staging, and production rather than letting everyone run their own ad-hoc instances. Use cloud-native building blocks, tagging, and access controls from the start so that costs and ownership are legible. This foundation gives the team a shared mental model of where things run and makes later automation and security work dramatically easier instead of being retrofitted onto a tangle of stray servers.",
      },
      {
        title: "Build a minimal CI/CD pipeline",
        body: "Set up a basic pipeline that runs on every code change: lint, run the test suite, build an artifact, and deploy to staging, with a clear manual promotion step to production. Keep the pipeline declarative and stored in the repository so it is versioned and reviewable like any other code. This delivers the largest reliability gain per hour of effort because repeatable deployments eliminate the human error that produces most small-team outages.",
      },
      {
        title: "Add baseline monitoring and logging",
        body: "Install lightweight monitoring for CPU, memory, disk, response time, and error rate, plus centralized logging so that past incidents are actually diagnosable. Configure a small set of high-signal alerts rather than trying to alert on everything, and establish a routine to review them. The goal is a baseline that tells you your application is healthy and why, without a platform so complex that nobody wants to maintain it.",
      },
      {
        title: "Establish clear ownership and documentation",
        body: "Document who owns each environment and service, how to deploy, how to restore a database, and how to rotate credentials, then keep that documentation up to date. Even a short runbook is far better than tribal knowledge when the original engineer goes on vacation or leaves. Clear ownership also defines accountability so that infrastructure decisions are made deliberately instead of reactively during an incident.",
      },
      {
        title: "Define the MVP-to-production path",
        body: "Write down the specific steps and criteria that move a feature or a service from a developer machine to a production environment: code review, tests, staging verification, migration handling, and rollback. Making this path explicit removes ambiguity about what ready actually means and gives every team member a repeatable playbook. It also forces early decisions about backups, secret management, and environment parity that are painful to add later.",
      },
    ],
    recommendedServices: [
      { label: "DevOps Consulting", href: "/services/devops-consulting" },
      { label: "Cloud Infrastructure", href: "/services/cloud-infrastructure" },
      { label: "CI/CD Automation", href: "/services/cicd-automation" },
      { label: "Monitoring and Observability", href: "/services/monitoring-observability" },
    ],
    faq: [
      {
        question: "Do startups really need Kubernetes from the start?",
        answer: "Almost never. Kubernetes adds control-plane management, node scheduling, networking, and observability overhead that a small team is rarely equipped to own. For most startups, a simpler deployment model with a single cloud provider, containers, and a managed database delivers more reliability with far less effort. Revisit Kubernetes only when you have sustained workloads, scaling requirements, and dedicated capacity to operate it.",
      },
      {
        question: "How much should a startup spend on infrastructure before revenue?",
        answer: "Keep recurring infrastructure costs modest and closely tied to actual usage by using managed services, right-sized instances, and clear tagging. The important investment early on is not raw spend but tooling and habits that prevent expensive outages and avoid rework. It is usually wiser to invest modestly in good deployment and monitoring practices early than to spend heavily on hardware that sits idle.",
      },
      {
        question: "Should we build our own CI/CD or buy a service?",
        answer: "Use a hosted CI/CD service that integrates with your code host and container registry. Building and maintaining your own build infrastructure is a distraction for a small team. What matters more than the tool is that the pipeline is repeatable, versioned in your repository, and includes a clear path to staging and production.",
      },
      {
        question: "When is the right time to add more infrastructure tooling?",
        answer: "Add tooling when the current process is a proven, measurable bottleneck, not preemptively. Wait until your deployment process, monitoring coverage, or scaling constraints are causing real problems before introducing platforms like Kubernetes, service meshes, or complex configuration systems. Add each piece deliberately when the team has the capacity to operate it.",
      },
      {
        question: "How do we keep a small team from being on call around the clock?",
        answer: "Reduce the need for late-night responses by fixing the highest-frequency failure points first: repeatable deployments, honest monitoring with high-signal alerts, good logging, and documented rollback procedures. Automate the common recovery paths and schedule regular health checks. A well-built foundation means most issues are caught during normal hours rather than by an on-call pager.",
      },
    ],
  },
  {
    slug: "for-saas",
    name: "Growing SaaS Companies",
    title: "DevOps for Growing SaaS Companies",
    metaDescription: "DevOps for growing SaaS: staging and production parity, safer releases and rollbacks, observability, scaling prep, incident response, and cost control as usage grows.",
    eyebrow: "Solution for Growing SaaS Companies",
    intro: "As SaaS usage, features, and support demands grow, the small-team habits that got you here start to break. Success in a growing SaaS requires making releases safer, infrastructure more visible, and costs predictable, without slowing down the engineering velocity that made the product work.",
    challenges: [
      {
        title: "Staging and production drift",
        body: "A common failure point is a staging environment that looks nothing like production, so bugs and configuration differences surface only after a release reaches real users. Differences in instance sizes, environment variables, database schemas, dependency versions, and data distributions make staging tests unreliable. The challenge is closing that gap so that what works in staging is a meaningful predictor of what will work in production, which requires disciplined parity in configuration, data, and infrastructure definition.",
      },
      {
        title: "Safer releases and rollbacks",
        body: "As the user base grows, the cost of a bad release rises sharply, yet most teams still rely on the hope that code is correct rather than on a mechanism to recover when it is not. Without a reliable rollback path, a failed deploy turns into an extended firefight. The challenge is designing releases so they are reversible, observable, and split into smaller, lower-risk increments, with every release capable of being reverted cleanly in minutes rather than reconstructed by hand.",
      },
      {
        title: "Observability at scale",
        body: "At a few users, logs and luck are enough; at thousands or millions, you need to know why a request was slow, why error rates spiked, and where the bottleneck lives. The challenge is moving beyond basic uptime checks to meaningful metrics, structured logs, and distributed tracing that connect symptoms to causes. Without this visibility, teams spend hours guessing during incidents and cannot answer the business question of how the platform is actually performing.",
      },
      {
        title: "Preparing for scaling",
        body: "The worst time to solve a scaling problem is when traffic has already doubled. Databases, connection pools, caching layers, and load balancers all have limits that behave differently under real load, and those limits are rarely discovered by intuition. The challenge is load testing, capacity planning, and designing architectures that scale horizontally where it matters, before the growth curve forces the issue at the worst possible moment.",
      },
      {
        title: "Uptime and incident response",
        body: "Growing customers depend on your service, so uptime becomes a contract rather than a courtesy. The challenge is not just having monitoring but having a practiced, documented incident response process with clear roles, communication channels, and status transparency. Teams without a defined response process make worse decisions under pressure, lose time, and damage customer trust when an outage is handled poorly even if the recovery is quick.",
      },
      {
        title: "Cost control as usage grows",
        body: "Cloud spend rises quietly and unpredictably as usage grows, and runaway costs often appear as a surprise at month end. Idle instances, over-provisioned databases, uncompressed data, and inefficient queries all compound as volume increases. The challenge is making cost a first-class engineering concern, with tagging, budgets, usage visibility, and regular review so that growth in traffic does not translate into disproportionate growth in the bill.",
      },
    ],
    approach: [
      {
        title: "Close the line between staging and production",
        body: "Treat staging as a first-class environment by deriving it from the same infrastructure definition as production and keeping configuration differences explicit and minimal. Use representative data instead of a tiny sample, and investigate any behavior that differs between environments rather than explaining it away. With higher parity, staging tests and pre-release checks become genuinely trustworthy signals that reduce the number of surprises in production.",
      },
      {
        title: "Adopt safer, reversible release patterns",
        body: "Combine a reliable rollback path with lower-risk deployment techniques such as feature flags, progressive rollouts, and deploy strategies that allow a subset of traffic before full exposure. Make each release small and independently diagnosable so that a regression is contained and attributable to a single change. The result is a team that ships frequently with confidence because every release is designed to be undone cleanly and observed during its rollout.",
      },
      {
        title: "Build real observability, not just dashboards",
        body: "Invest in structured logging, metrics, and tracing that let you follow a single request through the system, and pair them with a prioritized alerting policy that fires on user impact rather than raw noise. Establish service level objectives that encode what reliability means to the business, and review them regularly. Observability becomes a product you maintain continuously, and it pays off directly in faster incident resolution and better architectural decisions.",
      },
      {
        title: "Prepare for scale with load testing and capacity planning",
        body: "Run regular load tests that approximate realistic user behavior to find the limits of your database, connection pool, caching, and application tiers before production traffic discovers them for you. Build in horizontal scaling for stateless services and design a deliberate path for database growth, such as read replicas or partitioning, mapped to trigger conditions. Capacity planning keeps scaling a planned exercise instead of a reactive scramble, and it protects the customer experience during peaks.",
      },
      {
        title: "Formalize incident response",
        body: "Document a simple incident response workflow covering detection, roles, communication, investigation, mitigation, and post-incident review, then practice it so the process is second nature. Ensure every incident leaves behind a writeup that identifies root causes and concrete follow-ups rather than blame. A practiced response shortens mean time to recovery, keeps stakeholders informed calmly, and continuously hardens the system against repeat failures.",
      },
      {
        title: "Bring cost under management",
        body: "Apply consistent tagging and structure to cloud resources, set budgets and alerts on spend thresholds, and review cost reports on a regular cadence tied to engineering work. Make efficient usage part of code review and architecture conversations so that growth in traffic is handled by scaling out rather than paying for idle capacity. Managing cost as a continuous practice keeps infrastructure bills predictable and frees budget for product and reliability investments.",
      },
    ],
    recommendedServices: [
      { label: "Cloud Infrastructure", href: "/services/cloud-infrastructure" },
      { label: "CI/CD Automation", href: "/services/cicd-automation" },
      { label: "Monitoring and Observability", href: "/services/monitoring-observability" },
      { label: "Managed DevOps Support", href: "/services/managed-devops-support" },
      { label: "Application Deployment", href: "/services/application-deployment" },
    ],
    faq: [
      {
        question: "What is the difference between monitoring and observability?",
        answer: "Monitoring tells you when something is wrong by checking known signals against thresholds. Observability goes further by giving you the data needed to ask unanticipated questions about why something is wrong, typically through high-cardinality metrics, structured logs, and distributed traces. A growing SaaS needs both, but observability becomes essential when request paths span multiple services and root causes are no longer obvious.",
      },
      {
        question: "How do we make releases safer without slowing down shipping?",
        answer: "Smaller, reversible changes are the key. Use feature flags to separate deployment from exposure, progressive rollouts to limit blast radius, and reliable rollback so a bad release is reverted in minutes. When each change is small and independently diagnosable, you can ship more often with confidence, which usually increases velocity rather than reducing it.",
      },
      {
        question: "When should we bring on managed DevOps support instead of hiring?",
        answer: "When your infrastructure demands grow faster than your ability to hire specialists, or when you want reliability coverage without the overhead of a full-time role. Managed support fills gaps in monitoring, releases, incident response, and cost review on a predictable cadence. It is often the right step between no dedicated DevOps capacity and a fully hired platform team.",
      },
      {
        question: "Why does our cloud bill keep growing even when we do nothing new?",
        answer: "Cloud spend often grows with usage because of over-provisioned resources, idle instances, inefficient storage, and query patterns that cost more as data grows. Tagging and budgets reveal where the money is going, and load testing plus capacity planning prevent over-allocation. Regular cost review treats spend as a managed variable rather than an unavoidable consequence of growth.",
      },
      {
        question: "What should incident response look like for a small team?",
        answer: "It should be simple and documented: a clear way to detect and acknowledge the issue, a designated lead and communicator, a structured investigation, a written record of actions, and a post-incident review. Even a two-person team benefits from deciding in advance who communicates with customers and who works on recovery, because it removes ambiguity during high-pressure moments.",
      },
    ],
  },
  {
    slug: "for-agencies",
    name: "Software Agencies",
    title: "DevOps for Software Agencies",
    metaDescription: "DevOps for software agencies: repeatable deployments and monitoring across many client apps, environment separation, troubleshooting, handover, and white-label support.",
    eyebrow: "Solution for Software Agencies",
    intro: "Agencies run dozens of client applications, each with its own quirks, credentials, and expectations. The challenge is not deploying a single product well but making deployment, monitoring, and maintenance repeatable and reliable across many different projects, without assembling an in-house DevOps team for every client.",
    challenges: [
      {
        title: "Managing many client applications at once",
        body: "An agency often carries a portfolio of applications that vary in age, framework, cloud provider, and quality of existing infrastructure. Each one has different credentials, deployment methods, and failure modes, so institutional knowledge about one project rarely transfers to another. The challenge is establishing a set of repeatable patterns that work across the portfolio so that moving between projects does not mean relearning everything from scratch and each client gets a consistent, maintainable foundation.",
      },
      {
        title: "Repeatable, predictable deployments",
        body: "When every client deployment is a bespoke manual process, releases become risky and soak up billable time. A bad deployment to one client can trigger a chain reaction of firefighting that distracts from other work. The challenge is standardizing how applications are built, tested, and deployed so that the mechanics are the same every time, with per-project specifics isolated in clearly defined configuration while the underlying pipeline logic stays shared and reusable.",
      },
      {
        title: "Environment separation across clients",
        body: "Client environments are frequently mixed: a production database sitting beside a development instance on the same host, shared cloud accounts, or credentials reused across projects. These shortcuts create real security and reliability risks and make it hard to test safely. The challenge is establishing clean separation of development, staging, and production for every client, with proper isolation of credentials and permissions so that changes to one project cannot break or expose another.",
      },
      {
        title: "Production troubleshooting under pressure",
        body: "When a client application goes down, the agency is on the hook regardless of whether the failure is the client's fault, a hosting issue, or a bad release. With limited logs and no monitoring, troubleshooting becomes a reactive scavenger hunt at the worst possible time. The challenge is having the observability, logging, and runbooks in place ahead of incidents so that diagnosing a client problem is a structured process rather than a stressful reconstruction of unknown history.",
      },
      {
        title: "Documentation and client handover",
        body: "Agencies constantly onboard and offboard projects, and poor documentation makes each handover a source of errors and wasted time. When a contract ends or an engineer moves on, the knowledge of how to deploy, where things run, and how to recover often leaves with them. The challenge is maintaining accurate, current documentation of infrastructure, deployment steps, credentials, and runbooks so that any team member can operate a client system and a clean handover is actually possible.",
      },
      {
        title: "Avoiding full-time DevOps hires",
        body: "For most agencies, the volume of infrastructure work does not justify a dedicated, full-time DevOps employee for every project, yet the reliability demands are real. Recruiting and retaining platform specialists across many clients is expensive and rarely the agency's core business. The challenge is meeting client reliability expectations through a combination of reusable automation, well-chosen managed services, and on-demand expertise, rather than expanding headcount faster than billable work can absorb.",
      },
    ],
    approach: [
      {
        title: "Build reusable deployment and pipeline templates",
        body: "Create a set of well-tested pipeline and infrastructure templates that capture the common structure of the projects you service, then instantiate them per client with project-specific configuration only. This keeps the mechanics identical across the portfolio while isolating what actually differs, such as domains, environment variables, and resource sizes. Reuse makes new projects faster to stand up and means the entire team is familiar with the process regardless of which client they are touching.",
      },
      {
        title: "Isolate client environments and credentials",
        body: "Give every client its own separation between development, staging, and production, with scoped credentials and permissions that prevent cross-project access. Use distinct cloud projects or account structures per client where practical, and manage secrets separately rather than sharing them between systems. This isolation protects clients from each other, limits the blast radius of any single failure, and is a clear professional standard that builds client confidence.",
      },
      {
        title: "Standardize monitoring and logging across projects",
        body: "Instrument every client application with the same basic monitoring and centralized logging so that troubleshooting is consistent no matter whose project is on fire. Store logs in a central location with per-project access control, and define a common set of alerts and runbooks that apply everywhere. Standardization means the agency develops real expertise rather than re-inventing diagnostics for each system, and it dramatically shortens the time to root cause during incidents.",
      },
      {
        title: "Document infrastructure and handover materials from day one",
        body: "Treat documentation as a deliverable produced alongside the code: deployment steps, architecture, credentials, backup and recovery procedures, and contact points, kept current as the project evolves. Establish a standard handover checklist so that onboarding, offboarding, and periodic audits are consistent. Good documentation protects billable continuity, makes transitions smooth, and turns an agency's delivery process itself into a differentiator rather than a liability.",
      },
      {
        title: "Consider white-label managed support",
        body: "Instead of hiring internally, an agency can offer managed infrastructure support under its own branding by partnering with a team that handles monitoring, releases, security, and troubleshooting in the background. This expands the agency's service breadth without permanent headcount, letting it take on maintenance and support contracts profitably. White-label support lets the agency focus on delivery and client relationships while infrastructure reliability is handled by specialists on a predictable basis.",
      },
      {
        title: "Review and harden the stack across the portfolio",
        body: "Set aside regular time to audit the shared templates and the client portfolio for security issues, outdated dependencies, and reliability gaps, then fix them centrally so every project benefits. Apply Linux server security best practices and consistent patching across all environments rather than leaving clients at varying levels of risk. A portfolio-wide review keeps quality consistent and prevents the weakest client deployment from becoming the failure that damages the agency's reputation.",
      },
    ],
    recommendedServices: [
      { label: "Application Deployment", href: "/services/application-deployment" },
      { label: "CI/CD Automation", href: "/services/cicd-automation" },
      { label: "Linux Server Security", href: "/services/linux-server-security" },
      { label: "Managed DevOps Support", href: "/services/managed-devops-support" },
      { label: "Monitoring and Observability", href: "/services/monitoring-observability" },
      { label: "Docker Containers", href: "/services/docker-containers" },
    ],
    faq: [
      {
        question: "How do we deploy consistently across very different client projects?",
        answer: "Use shared templates that capture the common structure of your typical projects and isolate what genuinely differs between clients in configuration rather than in pipeline logic. Containers help by packaging the application and its dependencies so the deployment mechanism stays consistent even when the underlying stack differs. The goal is identical mechanics everywhere with per-project specifics handled declaratively.",
      },
      {
        question: "Should we hire a DevOps engineer or partner with a managed team?",
        answer: "For most agencies, infrastructure demand fluctuates across projects and rarely justifies a full-time internal specialist for every client. A managed DevOps partner provides expertise, monitoring, and incident response on demand without permanent headcount, and can operate under the agency's branding. This lets you meet client reliability expectations and even sell maintenance contracts while keeping fixed costs low.",
      },
      {
        question: "How do we keep client environments secure from each other?",
        answer: "Give each client separate environments for development, staging, and production, and scope credentials and permissions so that no client project can access another's data or resources. Prefer separate cloud projects or accounts per client and manage secrets per environment. This isolation limits the impact of any compromise or failure and is a professional standard clients increasingly expect.",
      },
      {
        question: "What documentation should we maintain for each client project?",
        answer: "Keep current documentation of the architecture, deployment process, infrastructure layout, credentials and how they are managed, backup and recovery procedures, monitoring setup, and escalation contacts. Standardize this into a handover checklist used for onboarding, offboarding, and periodic audits. Accurate documentation makes the system operable by any team member and makes clean handovers genuinely possible.",
      },
      {
        question: "Can we offer our clients monitoring and support without building it internally?",
        answer: "Yes. A white-label managed support arrangement lets you resell infrastructure monitoring, release management, security, and troubleshooting under your own branding while a specialist team does the work behind the scenes. This turns ongoing support into a profitable, repeatable service line without the overhead, hiring, and on-call burden of building the capability entirely in-house.",
      },
    ],
  },
];
