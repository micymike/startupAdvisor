import { Annotation } from "@langchain/langgraph";

export const StartupAdvisorAnnotation = Annotation.Root({
  idea: Annotation<string>,
  location: Annotation<string>,
  budget: Annotation<string>,
  targetUsers: Annotation<string>,
  marketAnalysis: Annotation<string>,
  productStrategy: Annotation<string>,
  financialPlan: Annotation<string>,
  riskAnalysis: Annotation<string>,
  finalReport: Annotation<string>,
});

export type StartupAdvisorGraphState = typeof StartupAdvisorAnnotation.State;
export type StartupAdvisorGraphUpdate = typeof StartupAdvisorAnnotation.Update;
