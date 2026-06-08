import { StartupForm } from "@/features/startup-advisor/components/StartupForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                  Startup Advisor AI
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Powered by Phi-4 · Azure AI
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Multi-agent startup planning
                <span className="block text-teal-600">for sharper founder decisions.</span>
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Turn a raw idea into a structured advisory report across market, product, finance, risk, and execution — powered by a live LangGraph multi-agent workflow.
              </p>

              {/* Tech stack badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["LangGraph.js", "Azure OpenAI", "Phi-4", "Next.js 15", "Streaming API"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:shrink-0">
              {[
                { value: "5", label: "Specialist agents" },
                { value: "∥", label: "Parallel execution" },
                { value: "Live", label: "Streaming results" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                  <p className="text-2xl font-bold text-slate-950">{value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow indicator */}
      <section className="border-b border-slate-200 bg-white/60">
        <div className="mx-auto max-w-7xl px-5 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto text-xs text-slate-500">
            <span className="shrink-0 font-medium text-slate-700">Workflow:</span>
            {["Market", "Product", "Finance", "Risk"].map((agent, i) => (
              <span key={agent} className="flex shrink-0 items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-600">{agent}</span>
                {i < 3 && <span className="text-slate-300">⟷</span>}
              </span>
            ))}
            <span className="text-slate-300 shrink-0">→</span>
            <span className="shrink-0 rounded-md bg-teal-100 px-2 py-0.5 font-medium text-teal-700">Coordinator</span>
            <span className="text-slate-300 shrink-0">→</span>
            <span className="shrink-0 font-medium text-slate-700">Report</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <StartupForm />
      </section>
    </main>
  );
}
