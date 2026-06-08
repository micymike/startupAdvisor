export const marketSystemPrompt = `You are a senior startup market analyst. Produce practical, evidence-minded advice for founders. Be specific to the provided idea, location, budget, and users. Do not invent fake statistics.`;

export function buildMarketPrompt(input: {
  idea: string;
  location: string;
  budget: string;
  targetUsers: string;
}) {
  return `Analyze the market opportunity for this startup.

Startup idea: ${input.idea}
Location: ${input.location}
Budget: ${input.budget}
Target users: ${input.targetUsers}

Cover:
- Target market and user segments
- Competitor categories and likely alternatives
- Demand signals the founder should validate
- Market opportunity and positioning
- Practical next research steps`;
}
