"use client";

import type { AgentName, AgentStatus } from "./StartupForm";

const AGENTS: { name: AgentName; icon: string; description: string }[] = [
  { name: "Market", icon: "📊", description: "Audience & opportunity" },
  { name: "Product", icon: "🛠️", description: "MVP & roadmap" },
  { name: "Finance", icon: "💰", description: "Costs & revenue" },
  { name: "Risk", icon: "⚠️", description: "Risks & mitigations" },
  { name: "Coordinator", icon: "🧠", description: "Final report" },
];

export function AgentProgress({ statuses }: { statuses: Record<AgentName, AgentStatus> }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Agent pipeline
      </p>
      <div className="space-y-2">
        {AGENTS.map(({ name, icon, description }) => {
          const status = statuses[name];
          return (
            <div
              key={name}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300 ${
                status === "done"
                  ? "border-teal-200 bg-teal-50"
                  : status === "running"
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-100 bg-slate-50"
              }`}
            >
              <span className="text-base">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  status === "done" ? "text-teal-800" : status === "running" ? "text-blue-800" : "text-slate-500"
                }`}>
                  {name} Agent
                </p>
                <p className="text-xs text-slate-400 truncate">{description}</p>
              </div>
              <div className="shrink-0">
                {status === "done" && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white text-xs">✓</span>
                )}
                {status === "running" && (
                  <span className="flex h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                )}
                {status === "idle" && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-200 text-slate-300 text-xs">○</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
