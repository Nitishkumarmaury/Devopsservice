export const showMetricsSection = false;

type Metric = {
  label: string;
  value: string;
  numericValue: number | null;
};

export const metrics: readonly Metric[] = [
  { label: "Production Deployments", value: "50+", numericValue: 50 },
  { label: "Cloud Servers Managed", value: "30+", numericValue: 30 },
  { label: "CI/CD Pipelines Built", value: "25+", numericValue: 25 },
  { label: "Client Satisfaction", value: "100%", numericValue: 100 },
  { label: "Industries Served", value: "8+", numericValue: 8 },
  { label: "Uptime Monitoring Points", value: "200+", numericValue: 200 },
];
