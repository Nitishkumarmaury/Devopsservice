export type Testimonial = {
  quote: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  project: string;
  industry: string;
  serviceCategory?: "Cloud Infrastructure" | "Deployment Services" | "Cloud & Deployment";
  verified?: boolean;
  date?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "CloudOpsync set up our entire production environment from scratch — CI/CD, monitoring, SSL, and deployment automation. The handover documentation was thorough and our team could operate independently afterward. Response time during the engagement was excellent.",
    name: "Rahul Sharma",
    position: "CTO",
    company: "CraveDock",
    avatar: "RS",
    rating: 5,
    project: "Production Infrastructure Setup",
    industry: "Food Technology",
    serviceCategory: "Cloud & Deployment",
    verified: true,
  },
  {
    quote:
      "We needed someone who understood both the deployment side and the application architecture. Nitish delivered a clean Bitbucket Pipeline, configured Apache with SSL, and set up PM2 for all our services. The monitoring dashboard he built gives us real visibility into our platform health.",
    name: "David Okoro",
    position: "Technical Lead",
    company: "Badde Taxi",
    avatar: "DO",
    rating: 5,
    project: "CI/CD Pipeline & Monitoring",
    industry: "Transportation",
    serviceCategory: "Deployment Services",
    verified: true,
  },
  {
    quote:
      "Our application was going through performance issues in production. CloudOpsync investigated the root cause across our Node.js processes, Apache configuration, and server resources. The stabilization was done carefully with rollback notes, and the follow-up recommendations helped us prevent similar issues.",
    name: "Amit Verma",
    position: "Engineering Manager",
    company: "Jeeta KLB",
    avatar: "AV",
    rating: 5,
    project: "Production Performance Recovery",
    industry: "Digital Gaming",
    serviceCategory: "Deployment Services",
    verified: true,
  },
  {
    quote:
      "CloudOpsync helped us design and implement a monitoring stack using Prometheus and Grafana across multiple servers. The dashboards, alerting rules, and health checks they configured have significantly improved our incident response time. Professional work with clear documentation.",
    name: "Priya Mehta",
    position: "VP of Engineering",
    company: "Henceforth Solutions",
    avatar: "PM",
    rating: 5,
    project: "Infrastructure Monitoring Setup",
    industry: "IT Services",
    serviceCategory: "Cloud Infrastructure",
    verified: true,
  },
  {
    quote:
      "We engaged CloudOpsync for our Docker containerization and AWS deployment. The migration was planned carefully with staged validation, DNS cutover strategy, and post-migration monitoring. Zero-downtime during the switch. Highly recommended for teams that need reliable DevOps support.",
    name: "Samuel Adeyemi",
    position: "Founder",
    company: "Yanga Ride",
    avatar: "SA",
    rating: 5,
    project: "Cloud Migration & Containerization",
    industry: "Ride-Sharing",
    serviceCategory: "Cloud & Deployment",
    verified: true,
  },
  {
    quote:
      "What stood out about CloudOpsync was the practical, no-nonsense approach. No unnecessary complexity — just solid infrastructure work with proper validation and handover. Our startup needed a deployment foundation we could grow on, and that is exactly what was delivered.",
    name: "Vikram Patel",
    position: "Co-founder & CTO",
    company: "TechScale Solutions",
    avatar: "VP",
    rating: 5,
    project: "Startup Infrastructure Foundation",
    industry: "SaaS",
    serviceCategory: "Cloud Infrastructure",
    verified: true,
  },
];
