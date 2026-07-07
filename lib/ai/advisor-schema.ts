import { z } from "zod";
import type { InfrastructureBlueprint } from "@/types/infrastructure-blueprint";

export const applicationTypeOptions = [
  "SaaS Platform",
  "Marketplace",
  "Mobile Application Backend",
  "E-commerce Platform",
  "Internal Business System",
  "API Platform",
  "Existing Production Application",
  "Other",
] as const;

export const cloudPlatformOptions = [
  "AWS",
  "DigitalOcean",
  "Google Cloud",
  "Azure",
  "No preference",
  "Existing infrastructure",
] as const;

export const environmentOptions = [
  "Development only",
  "Development and production",
  "Development, staging, and production",
  "Multiple client environments",
] as const;

export const requirementOptions = [
  "CI/CD automation",
  "Docker containerization",
  "Kubernetes",
  "Zero-downtime deployment",
  "Load balancing",
  "Database migration",
  "Monitoring and alerts",
  "Automatic backups",
  "SSL and domain configuration",
  "High availability",
  "Infrastructure as Code",
  "Security hardening",
  "Cost optimization",
  "Production troubleshooting",
] as const;

export const challengePromptOptions = [
  "Our deployment is currently manual.",
  "The server becomes slow during peak usage.",
  "We have no centralized monitoring.",
  "We need separate staging and production environments.",
  "Our cloud costs are increasing.",
  "We need to migrate without significant downtime.",
] as const;

const trimmedText = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

export const advisorRequestSchema = z.object({
  projectName: trimmedText(2, 80, "Project name"),
  applicationType: z.enum(applicationTypeOptions),
  technologyStack: trimmedText(2, 240, "Technology stack"),
  database: trimmedText(2, 120, "Database"),
  currentHostingProvider: trimmedText(2, 120, "Current hosting provider"),
  expectedMonthlyUsers: trimmedText(1, 80, "Expected monthly users"),
  expectedConcurrentUsers: trimmedText(1, 80, "Expected concurrent users"),
  currentServerConfiguration: trimmedText(3, 320, "Current server configuration"),
  preferredCloudPlatform: z.enum(cloudPlatformOptions),
  environments: z.enum(environmentOptions),
  requirements: z
    .array(z.enum(requirementOptions))
    .min(1, "Select at least one requirement.")
    .max(requirementOptions.length, "Too many requirements selected."),
  challenges: trimmedText(15, 1200, "Infrastructure challenge"),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "Please confirm the privacy and safety notice.",
  }),
  website: z.string().max(0, "Spam protection triggered.").optional().or(z.literal("")),
});

export type AdvisorRequest = z.infer<typeof advisorRequestSchema>;

const boundedString = (min: number, max: number) => z.string().trim().min(min).max(max);
const stringList = (minItems = 1, maxItems = 8, maxLength = 180) =>
  z.array(boundedString(2, maxLength)).min(minItems).max(maxItems);

export const infrastructureBlueprintSchema: z.ZodType<InfrastructureBlueprint> = z.object({
  executiveSummary: boundedString(30, 1100),
  recommendedArchitecture: z.object({
    title: boundedString(4, 140),
    description: boundedString(30, 1100),
    components: stringList(3, 10, 220),
  }),
  deploymentStrategy: z.object({
    summary: boundedString(30, 900),
    steps: stringList(3, 9, 220),
  }),
  observabilityPlan: z.object({
    summary: boundedString(30, 900),
    tools: stringList(2, 8, 220),
    recommendedAlerts: stringList(2, 8, 220),
  }),
  securityPriorities: stringList(3, 10, 240),
  backupAndRecovery: stringList(2, 8, 240),
  scalingPlan: stringList(2, 8, 240),
  costConsiderations: stringList(2, 8, 240),
  implementationPhases: z
    .array(
      z.object({
        phase: boundedString(2, 40),
        title: boundedString(4, 120),
        actions: stringList(2, 6, 220),
      }),
    )
    .min(2)
    .max(5),
  assumptions: stringList(2, 8, 240),
  questionsForDiscoveryCall: stringList(2, 8, 240),
});

export function formatAdvisorRequestForContact(values: AdvisorRequest, summary?: string) {
  return [
    summary ? `Blueprint summary: ${summary}` : "",
    `Project: ${values.projectName}`,
    `Application type: ${values.applicationType}`,
    `Stack: ${values.technologyStack}`,
    `Database: ${values.database}`,
    `Hosting: ${values.currentHostingProvider}`,
    `Traffic: ${values.expectedMonthlyUsers} monthly users, ${values.expectedConcurrentUsers} concurrent users`,
    `Server configuration: ${values.currentServerConfiguration}`,
    `Preferred cloud: ${values.preferredCloudPlatform}`,
    `Environments: ${values.environments}`,
    `Requirements: ${values.requirements.join(", ")}`,
    `Challenges: ${values.challenges}`,
  ]
    .filter(Boolean)
    .join("\n");
}
