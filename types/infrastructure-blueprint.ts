export type InfrastructureBlueprint = {
  executiveSummary: string;
  inputAnalysis: {
    workloadProfile: string;
    architectureDrivers: string[];
    riskSignals: string[];
  };
  requirementCoverage: Array<{
    requirement: string;
    recommendation: string;
    implementationStep: string;
  }>;
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
    duration: string;
    objective: string;
    actions: string[];
    deliverables: string[];
    validation: string[];
  }>;
  assumptions: string[];
  questionsForDiscoveryCall: string[];
};
