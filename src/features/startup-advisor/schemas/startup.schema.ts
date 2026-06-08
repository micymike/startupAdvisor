import { z } from "zod";

export const startupAdvisorInputSchema = z.object({
  idea: z
    .string()
    .trim()
    .min(10, "Describe the startup idea in at least 10 characters.")
    .max(2000, "Keep the startup idea under 2,000 characters."),
  location: z
    .string()
    .trim()
    .min(2, "Enter a target launch location.")
    .max(120, "Keep the location under 120 characters."),
  budget: z
    .string()
    .trim()
    .min(1, "Enter the available budget.")
    .max(120, "Keep the budget under 120 characters."),
  targetUsers: z
    .string()
    .trim()
    .min(3, "Describe the target users.")
    .max(1000, "Keep target users under 1,000 characters."),
});

export type StartupAdvisorInputSchema = z.infer<
  typeof startupAdvisorInputSchema
>;
