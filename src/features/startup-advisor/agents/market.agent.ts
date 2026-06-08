import {
  buildMarketPrompt,
  marketSystemPrompt,
} from "../prompts/market.prompt";
import { generateAdvisorSection } from "../services/llm.service";
import type {
  StartupAdvisorGraphState,
  StartupAdvisorGraphUpdate,
} from "../graph/startup.state";

export async function marketAgent(
  state: StartupAdvisorGraphState,
): Promise<StartupAdvisorGraphUpdate> {
  const marketAnalysis = await generateAdvisorSection(
    marketSystemPrompt,
    buildMarketPrompt(state),
  );

  return { marketAnalysis };
}
