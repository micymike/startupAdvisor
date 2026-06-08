# Startup Advisor AI

Startup Advisor AI is a production-ready Next.js 15 TypeScript app that turns a founder brief into a structured startup advisory report. It uses LangGraph.js to orchestrate specialist agents and LangChain JS to call an Azure OpenAI or Azure AI Foundry chat deployment.

## Architecture

The app uses a feature-based structure under `src/features/startup-advisor`:

- `components`: client UI for the form, loading state, and report display
- `agents`: one LangGraph node per specialist agent
- `graph`: shared state annotations and workflow assembly
- `prompts`: role-specific prompt builders
- `services`: AzureChatOpenAI configuration
- `schemas`: Zod request validation
- `types`: shared TypeScript contracts

The API route lives at `src/app/api/advisor/route.ts` and validates requests before invoking the graph.

## Multi-Agent Workflow

LangGraph runs a deterministic sequence:

`START -> marketAgent -> productAgent -> financeAgent -> riskAgent -> coordinatorAgent -> END`

Each node reads the shared startup advisor state and returns a partial update:

- Market Agent: target market, users, competitors, demand, opportunity
- Product Agent: MVP, user journey, technical approach, launch roadmap
- Finance Agent: costs, revenue streams, pricing, break-even considerations
- Risk Agent: business, technical, financial, operational, and legal risks
- Coordinator Agent: final report with executive summary, specialist sections, 30-day plan, and recommendation

LangGraph is used because this problem is naturally stateful and multi-step. Each agent can build on prior outputs while keeping the orchestration explicit, testable, and easy to extend.

## Azure Setup

Create an Azure OpenAI or Azure AI Foundry chat model deployment, then add the deployment details to `.env.local`.

Required variables:

```bash
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_API_INSTANCE_NAME=
AZURE_OPENAI_API_DEPLOYMENT_NAME=
AZURE_OPENAI_API_VERSION=
```

`AZURE_OPENAI_API_INSTANCE_NAME` is the Azure resource name, not the full endpoint URL.

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4122`, complete the startup brief, and submit it to run the advisor graph.

## API

`POST /api/advisor`

```json
{
  "idea": "A B2B platform that helps clinics reduce missed appointments",
  "location": "Nairobi, Kenya",
  "budget": "$15,000",
  "targetUsers": "Independent clinic owners and front-desk teams"
}
```

Successful responses include each specialist section plus the final coordinated report.
