export const faqs = [
  {
    question: "What types of cloud and DevOps projects do you handle?",
    answer:
      "We handle cloud infrastructure, CI/CD, Docker and Kubernetes deployment, monitoring, migration, production troubleshooting, security hardening, and ongoing DevOps support.",
  },
  {
    question: "Can you work with our existing AWS or DigitalOcean infrastructure?",
    answer:
      "Yes. We can audit existing servers, networking, deployment workflows, monitoring, access patterns, and cost signals before recommending practical changes.",
  },
  {
    question: "Can you create a CI/CD pipeline for an existing application?",
    answer:
      "Yes. We can build deployment workflows for existing applications using GitHub Actions, Bitbucket Pipelines, secure environment handling, validation steps, and rollback notes.",
  },
  {
    question: "Do you support Next.js, NestJS, Node.js, MongoDB, and MySQL applications?",
    answer:
      "Yes. These stacks are supported across deployment, process management, reverse proxy setup, SSL, database connectivity, monitoring, and production troubleshooting.",
  },
  {
    question: "Can you investigate a live production performance issue?",
    answer:
      "Yes. We can review logs, resource pressure, reverse proxy behavior, application errors, database signals, deployment history, and monitoring gaps to define the safest recovery path.",
  },
  {
    question: "Can you migrate our application without significant downtime?",
    answer:
      "We plan migrations around staged validation, DNS strategy, data checks, rollback procedures, and post-cutover monitoring. Exact downtime depends on the current architecture and data model.",
  },
  {
    question: "Do you provide monitoring and alerts?",
    answer:
      "Yes. Monitoring can include uptime checks, Prometheus metrics, Grafana dashboards, Node Exporter, Blackbox Exporter, and basic alerting workflows.",
  },
  {
    question: "Can you support our internal development team?",
    answer:
      "Yes. We can support internal teams with architecture reviews, deployment workflows, environment documentation, troubleshooting, and handover sessions.",
  },
  {
    question: "How do you handle credentials and production access?",
    answer:
      "Access is scoped to the work, shared through agreed secure channels, and removed or rotated after the engagement when appropriate. We avoid storing secrets in client-side code or documents.",
  },
  {
    question: "Do you offer ongoing infrastructure support?",
    answer:
      "Yes. Ongoing support can cover release assistance, health checks, patch planning, monitoring review, incident response windows, and infrastructure improvements.",
  },
] as const;
