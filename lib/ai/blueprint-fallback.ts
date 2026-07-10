import type { AdvisorRequest } from "@/lib/ai/advisor-schema";
import { buildInputAnalysis, buildRequirementCoverage } from "@/lib/ai/blueprint-enrichment";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

function cloudLabel(value: AdvisorRequest["preferredCloudPlatform"]) {
  return value === "No preference" || value === "Existing infrastructure" ? "the selected cloud platform" : value;
}

export function createFallbackBlueprint(values: AdvisorRequest): InfrastructureBlueprint {
  const platform = cloudLabel(values.preferredCloudPlatform);
  const stack = values.technologyStack || "the application stack";
  const database = values.database || "the current database";
  const stackSummary = stack.toLowerCase().includes(database.toLowerCase()) ? stack : `${stack} with ${database}`;

  return {
    executiveSummary: `${values.projectName} needs a practical production foundation around ${stackSummary}, safer releases, monitoring, backups, and security. Start with a compact audit, stabilize the current deployment path, then move into automation and observability before larger scaling work.`,
    inputAnalysis: buildInputAnalysis(values),
    requirementCoverage: buildRequirementCoverage(values),
    recommendedArchitecture: {
      title: "Practical managed cloud foundation",
      description: `Use ${platform} with separate environments, a hardened Linux runtime or container host, managed database where practical, reverse proxy with SSL, automated deployment, central monitoring, and tested backups. Keep the first version simple enough for the team to operate confidently.`,
      components: [
        "Separate development, staging, and production environments",
        "Hardened application host or container runtime",
        "Managed database with backup and restore checks",
        "Reverse proxy, SSL, firewall rules, and controlled access",
        "Automated deployment pipeline with validation and rollback notes",
        "Monitoring dashboards, uptime checks, and alert routing",
      ],
    },
    deploymentStrategy: {
      summary: "Reduce release risk by replacing manual steps with a controlled pipeline, environment variables, health checks, and a documented rollback path.",
      steps: [
        "Audit the current deployment and identify risky manual steps",
        "Create staging and production configuration with protected secrets",
        "Build a CI/CD pipeline for test, package, deploy, and validate stages",
        "Add health checks and rollback instructions before production rollout",
      ],
    },
    observabilityPlan: {
      summary: "Make production behavior visible before scaling or major migration work.",
      tools: ["Prometheus or managed metrics", "Grafana or cloud dashboards", "Uptime and endpoint checks", "Application logs with retention"],
      recommendedAlerts: [
        "Application unavailable or unhealthy endpoint",
        "High CPU, memory, disk usage, or process restarts",
        "Database backup failure or unusual connection pressure",
        "SSL expiry, failed deployment, or elevated error rate",
      ],
    },
    securityPriorities: [
      "Restrict SSH and administrative access using least privilege",
      "Move secrets into protected server or pipeline configuration",
      "Keep firewall, SSL, reverse proxy, and dependency patching under routine review",
      "Document credential rotation and emergency access procedures",
    ],
    backupAndRecovery: [
      "Schedule database and application configuration backups",
      "Test restore steps before relying on the backup plan",
      "Define rollback notes for deployment and infrastructure changes",
    ],
    scalingPlan: [
      "Measure real traffic and bottlenecks before adding platform complexity",
      "Scale application processes or containers behind a proxy or load balancer",
      "Move stateful services to managed or dedicated infrastructure as load grows",
    ],
    costConsiderations: [
      "Start with the smallest reliable architecture that meets the traffic profile",
      "Use alerts for spend, storage growth, and oversized compute resources",
      "Review managed service costs against the team time saved",
    ],
    implementationPhases: [
      {
        phase: "Phase 1",
        title: "Audit and Stabilize",
        duration: "1-2 weeks",
        objective: "Validate the current runtime, risks, access model, release path, backup state, and environment gaps before changing production.",
        actions: ["Review current hosting, deployment, access, DNS, SSL, and backups", "Document risks and define the safest first production changes"],
        deliverables: ["Infrastructure audit notes", "Prioritized implementation backlog"],
        validation: ["Current deployment path is documented", "Rollback and backup gaps are known"],
      },
      {
        phase: "Phase 2",
        title: "Automate Delivery",
        duration: "1-2 weeks",
        objective: "Replace fragile manual release steps with repeatable staging and production deployment workflows.",
        actions: ["Build CI/CD with protected secrets and environment-specific deployment", "Add validation checks and rollback notes for each release"],
        deliverables: ["CI/CD pipeline", "Staging and production release checklist"],
        validation: ["Staging deployment succeeds from the pipeline", "Production rollback steps are tested"],
      },
      {
        phase: "Phase 3",
        title: "Monitor and Secure",
        duration: "1-2 weeks",
        objective: "Make production behavior visible and reduce operational risk before deeper scaling work.",
        actions: ["Add metrics, uptime checks, alerts, and log retention", "Harden access, proxy rules, SSL, firewall settings, and backup routines"],
        deliverables: ["Monitoring dashboard", "Alert and backup runbook"],
        validation: ["Critical alerts fire to the right channel", "A restore rehearsal is completed"],
      },
    ],
    assumptions: [
      "The submitted information is preliminary and should be validated in a discovery call",
      "No private credentials, application internals, or production logs were provided",
      "The team prefers a practical architecture over unnecessary platform complexity",
    ],
    questionsForDiscoveryCall: [
      "What release process is currently causing the highest production risk?",
      "What uptime, backup retention, and recovery expectations should be met?",
      "Which parts of the infrastructure can be changed immediately and which need a migration window?",
      "Who will operate the platform after implementation handover?",
    ],
  };
}
