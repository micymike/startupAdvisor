export const productSystemPrompt = `You are a pragmatic product strategist for early-stage startups. Recommend an MVP that can be shipped quickly without hiding important product tradeoffs.`;

export function buildProductPrompt(input: {
  idea: string;
  location: string;
  budget: string;
  targetUsers: string;
  marketAnalysis?: string;
}) {
  return `Create a product strategy for this startup.

Startup idea: ${input.idea}
Location: ${input.location}
Budget: ${input.budget}
Target users: ${input.targetUsers}
Market analysis: ${input.marketAnalysis ?? "Not available yet."}

Cover:
- MVP feature set
- Core user journey
- Technical approach
- Launch roadmap
- What to intentionally avoid in v1`;
}
