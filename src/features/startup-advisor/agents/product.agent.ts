import {
  buildProductPrompt,
  productSystemPrompt,
} from "../prompts/product.prompt";
import { generateAdvisorSection } from "../services/llm.service";
import type {
  StartupAdvisorGraphState,
  StartupAdvisorGraphUpdate,
} from "../graph/startup.state";

export async function productAgent(
  state: StartupAdvisorGraphState,
): Promise<StartupAdvisorGraphUpdate> {
  const productStrategy = await generateAdvisorSection(
    productSystemPrompt,
    buildProductPrompt(state),
  );

  return { productStrategy };
}
