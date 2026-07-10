import type { AdvisorRequest } from "@/lib/ai/advisor-schema";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

type RequirementCoverageItem = InfrastructureBlueprint["requirementCoverage"][number];

function platformLabel(value: AdvisorRequest["preferredCloudPlatform"]) {
  return value === "No preference" || value === "Existing infrastructure" ? "the target cloud or current platform" : value;
}

function compactTraffic(values: AdvisorRequest) {
  return `${values.expectedMonthlyUsers} monthly users and ${values.expectedConcurrentUsers} concurrent users`;
}

export function buildInputAnalysis(values: AdvisorRequest): InfrastructureBlueprint["inputAnalysis"] {
  const platform = platformLabel(values.preferredCloudPlatform);

  return {
    workloadProfile: `${values.projectName} is a ${values.applicationType.toLowerCase()} using ${values.technologyStack} with ${values.database}, currently on ${values.currentHostingProvider}, planned for ${compactTraffic(values)} across ${values.environments.toLowerCase()}.`,
    architectureDrivers: [
      `Selected priorities: ${values.requirements.join(", ")}`,
      `Target platform direction: ${platform}`,
      `Environment model: ${values.environments}`,
      `Current runtime signal: ${values.currentServerConfiguration}`,
    ],
    riskSignals: [
      values.challenges,
      "Recommendations are preliminary until access, logs, deployment scripts, and database behavior are reviewed.",
    ],
  };
}

function requirementGuidance(requirement: AdvisorRequest["requirements"][number], values: AdvisorRequest): RequirementCoverageItem {
  const platform = platformLabel(values.preferredCloudPlatform);

  const guidance: Record<AdvisorRequest["requirements"][number], Omit<RequirementCoverageItem, "requirement">> = {
    "CI/CD automation": {
      recommendation: "Create a protected pipeline that builds, tests, deploys, validates health, and keeps environment secrets outside the repository.",
      implementationStep: "Start with staging deployment, add production approvals, then document rollback and release ownership.",
    },
    "Docker containerization": {
      recommendation: "Package the app and workers as versioned containers with environment-specific configuration and repeatable startup behavior.",
      implementationStep: "Create production Dockerfiles, add compose or managed container service configuration, then move runtime variables into protected secrets.",
    },
    Kubernetes: {
      recommendation: "Use Kubernetes only if the team needs multi-service orchestration, horizontal scaling, and operational maturity beyond simpler containers.",
      implementationStep: "Begin with namespaces, ingress, secrets, health probes, resource limits, and a staging cluster before production migration.",
    },
    "Zero-downtime deployment": {
      recommendation: "Use health checks, rolling or blue-green releases, and database migration rules that avoid breaking running versions.",
      implementationStep: "Add readiness endpoints, deploy one environment first, then release through staged traffic shifting with rollback checkpoints.",
    },
    "Load balancing": {
      recommendation: "Put a load balancer in front of stateless application instances, use health checks, and move sessions/uploads away from local disk.",
      implementationStep: `Configure ${platform} load balancing or Nginx upstreams, run two application instances, verify failover, then scale based on real traffic.`,
    },
    "Database migration": {
      recommendation: "Plan schema and data movement with backups, migration dry runs, compatibility windows, and a rollback decision point.",
      implementationStep: "Take a verified backup, test migration on staging data, schedule production cutover, and monitor query latency after release.",
    },
    "Monitoring and alerts": {
      recommendation: "Track uptime, latency, errors, saturation, deployment health, and database pressure before adding more platform complexity.",
      implementationStep: "Add metrics, log retention, dashboards, and alert routing with clear thresholds for application and infrastructure signals.",
    },
    "Automatic backups": {
      recommendation: "Automate database and configuration backups with retention, encryption, restore checks, and alerting for backup failures.",
      implementationStep: "Create daily backups first, run a restore rehearsal, then document recovery time and recovery point expectations.",
    },
    "SSL and domain configuration": {
      recommendation: "Centralize TLS termination, domain routing, redirects, certificate renewal, and security headers at the proxy or edge layer.",
      implementationStep: "Audit DNS, configure certificates, enforce HTTPS, validate renewals, and add expiry monitoring.",
    },
    "High availability": {
      recommendation: "Remove single points of failure gradually by separating app, database, cache, storage, and traffic routing responsibilities.",
      implementationStep: "Stabilize one production path, add redundant app instances, then move stateful services to managed or replicated infrastructure.",
    },
    "Infrastructure as Code": {
      recommendation: "Codify repeatable infrastructure for networking, compute, secrets references, monitoring, and environment separation.",
      implementationStep: "Start with non-destructive resources in staging, review plans before apply, and keep state protected.",
    },
    "Security hardening": {
      recommendation: "Apply least privilege access, patched base images or servers, firewall rules, secret hygiene, audit logging, and dependency review.",
      implementationStep: "Lock down SSH and admin access, rotate exposed secrets, patch the host, then document access and emergency procedures.",
    },
    "Cost optimization": {
      recommendation: "Match resources to observed load, use budget alerts, right-size compute and storage, and avoid premature platform complexity.",
      implementationStep: "Baseline current usage, add spend alerts, review idle resources, then tune compute/database size after monitoring is active.",
    },
    "Production troubleshooting": {
      recommendation: "Build an incident workflow around logs, metrics, traces where practical, deployment history, and a short operational runbook.",
      implementationStep: "Add service health views, collect logs with retention, define escalation steps, and rehearse one failure scenario.",
    },
  };

  return {
    requirement,
    ...guidance[requirement],
  };
}

export function buildRequirementCoverage(values: AdvisorRequest): RequirementCoverageItem[] {
  return values.requirements.map((requirement) => requirementGuidance(requirement, values));
}

export function mergeRequirementCoverage(
  candidate: Partial<InfrastructureBlueprint>,
  values: AdvisorRequest,
): RequirementCoverageItem[] {
  const existing = Array.isArray(candidate.requirementCoverage) ? candidate.requirementCoverage : [];
  const byRequirement = new Map(
    existing
      .filter((item) => item && typeof item === "object")
      .map((item) => {
        const coverage = item as Partial<RequirementCoverageItem>;
        return [String(coverage.requirement ?? "").toLowerCase(), coverage] as const;
      }),
  );

  return values.requirements.map((requirement) => {
    const fallback = requirementGuidance(requirement, values);
    const generated = byRequirement.get(requirement.toLowerCase());

    return {
      requirement,
      recommendation:
        typeof generated?.recommendation === "string" && generated.recommendation.trim()
          ? generated.recommendation.trim()
          : fallback.recommendation,
      implementationStep:
        typeof generated?.implementationStep === "string" && generated.implementationStep.trim()
          ? generated.implementationStep.trim()
          : fallback.implementationStep,
    };
  });
}

export function enrichBlueprintForRequest(
  blueprint: InfrastructureBlueprint,
  values: AdvisorRequest,
): InfrastructureBlueprint {
  return {
    ...blueprint,
    inputAnalysis: blueprint.inputAnalysis ?? buildInputAnalysis(values),
    requirementCoverage: mergeRequirementCoverage(blueprint, values),
  };
}
