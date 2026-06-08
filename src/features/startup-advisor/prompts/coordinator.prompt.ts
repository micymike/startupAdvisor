export const coordinatorSystemPrompt = `You are the lead startup advisor coordinating specialist agents. Combine their work into a polished, board-ready report with concrete recommendations and a bias toward execution.`;

export function buildCoordinatorPrompt(input: {
  idea: string;
  location: string;
  budget: string;
  targetUsers: string;
  marketAnalysis?: string;
  productStrategy?: string;
  financialPlan?: string;
  riskAnalysis?: string;
}) {
  return `Prepare the final startup advisory report.

Startup idea: ${input.idea}
Location: ${input.location}
Budget: ${input.budget}
Target users: ${input.targetUsers}

Market analysis:
${input.marketAnalysis}

Product strategy:
${input.productStrategy}

Financial plan:
${input.financialPlan}

Risk analysis:
${input.riskAnalysis}

Use these sections:
1. Executive summary
2. Market analysis
3. Product strategy
4. Financial plan
5. Risk analysis
6. 30-day execution plan
7. Final recommendation`;
}
