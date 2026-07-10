import type { AdvisorRequest } from "@/lib/ai/advisor-schema";

export const ADVISOR_SYSTEM_INSTRUCTION = `You are the AI Cloud Architecture Advisor for a professional DevOps and cloud engineering consultancy.

Generate practical, concise preliminary infrastructure recommendations based only on the information supplied by the visitor.

Focus on reliability, maintainability, security, deployment safety, observability, backups, scalability, and cost awareness.

Prefer the simplest architecture that satisfies the stated requirements. Do not recommend Kubernetes when Docker, PM2, or managed services would be more practical.

Do not invent traffic, budgets, compliance requirements, uptime requirements, existing infrastructure, business results, or technical constraints.

Clearly identify all assumptions.

Do not claim that the blueprint is production-certified, security-certified, or guaranteed.

Do not request or process passwords, private keys, API keys, database credentials, access tokens, personal data, or other secrets.

Do not provide destructive shell commands.

Return only valid JSON matching the required schema.`;

const blueprintShape = {
  executiveSummary: "string",
  inputAnalysis: {
    workloadProfile: "string",
    architectureDrivers: ["string"],
    riskSignals: ["string"],
  },
  requirementCoverage: [
    {
      requirement: "string",
      recommendation: "string",
      implementationStep: "string",
    },
  ],
  recommendedArchitecture: {
    title: "string",
    description: "string",
    components: ["string"],
  },
  deploymentStrategy: {
    summary: "string",
    steps: ["string"],
  },
  observabilityPlan: {
    summary: "string",
    tools: ["string"],
    recommendedAlerts: ["string"],
  },
  securityPriorities: ["string"],
  backupAndRecovery: ["string"],
  scalingPlan: ["string"],
  costConsiderations: ["string"],
  implementationPhases: [
    {
      phase: "string",
      title: "string",
      duration: "string",
      objective: "string",
      actions: ["string"],
      deliverables: ["string"],
      validation: ["string"],
    },
  ],
  assumptions: ["string"],
  questionsForDiscoveryCall: ["string"],
};

export function buildAdvisorPrompt(values: AdvisorRequest) {
  const technicalInputs = {
    projectName: values.projectName,
    applicationType: values.applicationType,
    technologyStack: values.technologyStack,
    database: values.database,
    currentHostingProvider: values.currentHostingProvider,
    expectedMonthlyUsers: values.expectedMonthlyUsers,
    expectedConcurrentUsers: values.expectedConcurrentUsers,
    currentServerConfiguration: values.currentServerConfiguration,
    preferredCloudPlatform: values.preferredCloudPlatform,
    environments: values.environments,
    requirements: values.requirements,
    challenges: values.challenges,
  };

  return `Generate a preliminary cloud infrastructure blueprint for the visitor's application.

Technical inputs:
${JSON.stringify(technicalInputs, null, 2)}

Required JSON shape:
${JSON.stringify(blueprintShape, null, 2)}

Output constraints:
- Return a single JSON object only.
- Analyze the exact selected requirements. The requirementCoverage array must include one item for every selected requirement, using the same requirement text.
- If the user selects load balancing, high availability, Kubernetes, backups, monitoring, security, cost, or any other service, include a concrete recommendation and implementation step for that selected service.
- Make the architecture and roadmap respond to traffic, current hosting, server configuration, environments, cloud preference, stack, database, requirements, and challenges.
- Keep the response concise, professional, and implementation-oriented.
- Prefer short phrases over paragraphs inside arrays.
- Keep summaries under 70 words.
- Include 3 to 6 architecture components.
- Include 3 to 5 implementation phases with duration, objective, actions, deliverables, and validation checks.
- Include assumptions and questions for a professional discovery call.
- Mention when a professional infrastructure audit is still required.
- Do not include Markdown fences, prose outside JSON, or executable commands.`;
}

export function buildAdvisorRepairPrompt(previousOutput: string) {
  return `The previous response was not valid JSON matching the required schema. Repair it into a single valid JSON object only.

Required JSON shape:
${JSON.stringify(blueprintShape, null, 2)}

Previous response to repair:
${previousOutput.slice(0, 10000)}

Return only the repaired JSON object.`;
}
