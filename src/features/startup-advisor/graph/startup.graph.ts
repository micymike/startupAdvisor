import { END, START, StateGraph } from "@langchain/langgraph";

import { coordinatorAgent } from "../agents/coordinator.agent";
import { financeAgent } from "../agents/finance.agent";
import { marketAgent } from "../agents/market.agent";
import { productAgent } from "../agents/product.agent";
import { riskAgent } from "../agents/risk.agent";
import { StartupAdvisorAnnotation } from "./startup.state";

export const startupAdvisorGraph = new StateGraph(StartupAdvisorAnnotation)
  .addNode("marketAgent", marketAgent)
  .addNode("productAgent", productAgent)
  .addNode("financeAgent", financeAgent)
  .addNode("riskAgent", riskAgent)
  .addNode("coordinatorAgent", coordinatorAgent)
  .addEdge(START, "marketAgent")
  .addEdge(START, "productAgent")
  .addEdge(START, "financeAgent")
  .addEdge(START, "riskAgent")
  .addEdge("marketAgent", "coordinatorAgent")
  .addEdge("productAgent", "coordinatorAgent")
  .addEdge("financeAgent", "coordinatorAgent")
  .addEdge("riskAgent", "coordinatorAgent")
  .addEdge("coordinatorAgent", END)
  .compile();
