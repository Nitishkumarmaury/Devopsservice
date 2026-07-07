export type InfrastructureBlueprint = {
  executiveSummary: string;
  recommendedArchitecture: {
    title: string;
    description: string;
    components: string[];
  };
  deploymentStrategy: {
    summary: string;
    steps: string[];
  };
  observabilityPlan: {
    summary: string;
    tools: string[];
    recommendedAlerts: string[];
  };
  securityPriorities: string[];
  backupAndRecovery: string[];
  scalingPlan: string[];
  costConsiderations: string[];
  implementationPhases: Array<{
    phase: string;
    title: string;
    actions: string[];
  }>;
  assumptions: string[];
  questionsForDiscoveryCall: string[];
};
