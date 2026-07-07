export const showMetricsSection = false;

type Metric = {
  label: string;
  value: string;
  numericValue: number | null;
};

export const metrics: readonly Metric[] = [];
