import { buildRiskPrompt, riskSystemPrompt } from "../prompts/risk.prompt";
import { generateAdvisorSection } from "../services/llm.service";
import type {
  StartupAdvisorGraphState,
  StartupAdvisorGraphUpdate,
} from "../graph/startup.state";

export async function riskAgent(
  state: StartupAdvisorGraphState,
): Promise<StartupAdvisorGraphUpdate> {
  const riskAnalysis = await generateAdvisorSection(
    riskSystemPrompt,
    buildRiskPrompt(state),
  );

  return { riskAnalysis };
}
