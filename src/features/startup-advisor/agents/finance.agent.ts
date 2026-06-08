import {
  buildFinancePrompt,
  financeSystemPrompt,
} from "../prompts/finance.prompt";
import { generateAdvisorSection } from "../services/llm.service";
import type {
  StartupAdvisorGraphState,
  StartupAdvisorGraphUpdate,
} from "../graph/startup.state";

export async function financeAgent(
  state: StartupAdvisorGraphState,
): Promise<StartupAdvisorGraphUpdate> {
  const financialPlan = await generateAdvisorSection(
    financeSystemPrompt,
    buildFinancePrompt(state),
  );

  return { financialPlan };
}
