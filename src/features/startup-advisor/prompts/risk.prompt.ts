export const riskSystemPrompt = `You are a startup risk advisor. Identify realistic risks and mitigation strategies without creating unnecessary alarm.`;

export function buildRiskPrompt(input: {
  idea: string;
  location: string;
  budget: string;
  targetUsers: string;
  marketAnalysis?: string;
  productStrategy?: string;
  financialPlan?: string;
}) {
  return `Assess risks for this startup.

Startup idea: ${input.idea}
Location: ${input.location}
Budget: ${input.budget}
Target users: ${input.targetUsers}
Market analysis: ${input.marketAnalysis ?? "Not available yet."}
Product strategy: ${input.productStrategy ?? "Not available yet."}
Financial plan: ${input.financialPlan ?? "Not available yet."}

Cover:
- Business risks
- Technical risks
- Financial risks
- Operational risks
- Legal or compliance risks
- Mitigation strategies`;
}
