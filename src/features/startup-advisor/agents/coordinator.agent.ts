import {
  buildCoordinatorPrompt,
  coordinatorSystemPrompt,
} from "../prompts/coordinator.prompt";
import { generateAdvisorSection } from "../services/llm.service";
import type {
  StartupAdvisorGraphState,
  StartupAdvisorGraphUpdate,
} from "../graph/startup.state";

export async function coordinatorAgent(
  state: StartupAdvisorGraphState,
): Promise<StartupAdvisorGraphUpdate> {
  const finalReport = await generateAdvisorSection(
    coordinatorSystemPrompt,
    buildCoordinatorPrompt(state),
    1500,
  );

  return { finalReport };
}
