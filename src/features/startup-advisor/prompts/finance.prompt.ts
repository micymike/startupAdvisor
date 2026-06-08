export const financeSystemPrompt = `You are a startup finance advisor. Give clear assumptions, ranges, and practical financial planning guidance. Avoid pretending estimates are precise.`;

export function buildFinancePrompt(input: {
  idea: string;
  location: string;
  budget: string;
  targetUsers: string;
  marketAnalysis?: string;
  productStrategy?: string;
}) {
  return `Create a financial plan for this startup.

Startup idea: ${input.idea}
Location: ${input.location}
Budget: ${input.budget}
Target users: ${input.targetUsers}
Market analysis: ${input.marketAnalysis ?? "Not available yet."}
Product strategy: ${input.productStrategy ?? "Not available yet."}

Cover:
- Estimated startup costs
- Revenue streams
- Pricing model
- Break-even considerations
- Budget allocation priorities`;
}
