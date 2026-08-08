import { z } from "zod";
import { budgetOptions, projectTypes, requestTypes, timelineOptions } from "./constants";

export const contactSchema = z.object({
  requestType: z.enum(requestTypes),
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Please keep the name under 120 characters."),
  workEmail: z.string().trim().email("Please enter a valid work email."),
  company: z
    .string()
    .trim()
    .max(140, "Please keep the company name under 140 characters.")
    .optional()
    .or(z.literal("")),
  projectWebsite: z
    .string()
    .trim()
    .max(220, "Please keep the website under 220 characters.")
    .optional()
    .or(z.literal("")),
  projectType: z.enum(projectTypes),
  cloudProvider: z
    .string()
    .trim()
    .max(120, "Please keep the cloud provider under 120 characters.")
    .optional()
    .or(z.literal("")),
  currentInfrastructure: z
    .string()
    .trim()
    .min(8, "Share a short summary of your current infrastructure.")
    .max(1200, "Please keep this under 1200 characters."),
  estimatedBudget: z.enum(budgetOptions),
  projectTimeline: z.enum(timelineOptions),
  projectDetails: z
    .string()
    .trim()
    .min(20, "Please include a few details about the outcome you need.")
    .max(2500, "Please keep this under 2500 characters."),
  website: z.string().max(0, "Spam protection triggered.").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
