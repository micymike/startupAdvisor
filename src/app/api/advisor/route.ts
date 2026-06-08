import { ZodError } from "zod";

import { startupAdvisorInputSchema } from "@/features/startup-advisor/schemas/startup.schema";
import type { StartupAdvisorInput } from "@/features/startup-advisor/types/startup.types";
import { generateAdvisorSection } from "@/features/startup-advisor/services/llm.service";
import {
  buildMarketPrompt,
  marketSystemPrompt,
} from "@/features/startup-advisor/prompts/market.prompt";
import {
  buildProductPrompt,
  productSystemPrompt,
} from "@/features/startup-advisor/prompts/product.prompt";
import {
  buildFinancePrompt,
  financeSystemPrompt,
} from "@/features/startup-advisor/prompts/finance.prompt";
import {
  buildRiskPrompt,
  riskSystemPrompt,
} from "@/features/startup-advisor/prompts/risk.prompt";
import {
  buildCoordinatorPrompt,
  coordinatorSystemPrompt,
} from "@/features/startup-advisor/prompts/coordinator.prompt";

export const runtime = "nodejs";
export const maxDuration = 300;

type StreamEvent =
  | { type: "agent_start"; agent: string }
  | { type: "agent_done"; agent: string; key: string; content: string }
  | { type: "error"; message: string }
  | { type: "done" };

function emit(controller: ReadableStreamDefaultController, event: StreamEvent) {
  controller.enqueue(
    new TextEncoder().encode(JSON.stringify(event) + "\n"),
  );
}

export async function POST(request: Request) {
  let input: StartupAdvisorInput;

  try {
    const body = await request.json();
    input = startupAdvisorInputSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { success: false, error: "Please check the form fields and try again.", issues: error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    return Response.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Run 4 specialist agents in parallel, emitting start/done events
        const agents = [
          {
            name: "Market",
            key: "marketAnalysis",
            system: marketSystemPrompt,
            prompt: buildMarketPrompt(input),
          },
          {
            name: "Product",
            key: "productStrategy",
            system: productSystemPrompt,
            prompt: buildProductPrompt(input),
          },
          {
            name: "Finance",
            key: "financialPlan",
            system: financeSystemPrompt,
            prompt: buildFinancePrompt(input),
          },
          {
            name: "Risk",
            key: "riskAnalysis",
            system: riskSystemPrompt,
            prompt: buildRiskPrompt(input),
          },
        ];

        agents.forEach((a) => emit(controller, { type: "agent_start", agent: a.name }));

        const results = await Promise.all(
          agents.map(async (a) => {
            const content = await generateAdvisorSection(a.system, a.prompt);
            emit(controller, { type: "agent_done", agent: a.name, key: a.key, content });
            return { key: a.key, content };
          }),
        );

        const state = {
          ...input,
          ...Object.fromEntries(results.map((r) => [r.key, r.content])),
        };

        emit(controller, { type: "agent_start", agent: "Coordinator" });
        const finalReport = await generateAdvisorSection(
          coordinatorSystemPrompt,
          buildCoordinatorPrompt(state),
          1500,
        );
        emit(controller, { type: "agent_done", agent: "Coordinator", key: "finalReport", content: finalReport });
        emit(controller, { type: "done" });
      } catch (err) {
        emit(controller, {
          type: "error",
          message: err instanceof Error ? err.message : "The advisor agents could not complete the report.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" },
  });
}
