"use client";

import { FormEvent, useState } from "react";
import { ReportView } from "./ReportView";
import { AgentProgress } from "./AgentProgress";
import type { StartupAdvisorInput, StartupAdvisorReport } from "../types/startup.types";

const initialForm: StartupAdvisorInput = { idea: "", location: "", budget: "", targetUsers: "" };

const fields: Array<{
  id: keyof StartupAdvisorInput;
  label: string;
  placeholder: string;
  multiline?: boolean;
  maxLength: number;
}> = [
  { id: "idea", label: "Startup idea", placeholder: "A B2B platform that helps clinics reduce missed appointments", multiline: true, maxLength: 2000 },
  { id: "location", label: "Launch location", placeholder: "Nairobi, Kenya", maxLength: 120 },
  { id: "budget", label: "Available budget", placeholder: "$15,000", maxLength: 120 },
  { id: "targetUsers", label: "Target users", placeholder: "Independent clinic owners and front-desk teams", multiline: true, maxLength: 1000 },
];

export type AgentStatus = "idle" | "running" | "done";
export type AgentName = "Market" | "Product" | "Finance" | "Risk" | "Coordinator";

const AGENT_NAMES: AgentName[] = ["Market", "Product", "Finance", "Risk", "Coordinator"];

export function StartupForm() {
  const [form, setForm] = useState<StartupAdvisorInput>(initialForm);
  const [report, setReport] = useState<Partial<StartupAdvisorReport> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState<Record<AgentName, AgentStatus>>(
    Object.fromEntries(AGENT_NAMES.map((n) => [n, "idle"])) as Record<AgentName, AgentStatus>,
  );

  function resetAgents() {
    setAgentStatus(Object.fromEntries(AGENT_NAMES.map((n) => [n, "idle"])) as Record<AgentName, AgentStatus>);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setReport(null);
    resetAgents();

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok || !response.body) {
        const payload = await response.json();
        setError(payload.error ?? "Something went wrong.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const collected: Partial<StartupAdvisorReport> = {};
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);

            if (event.type === "agent_start") {
              setAgentStatus((prev) => ({ ...prev, [event.agent]: "running" }));
            } else if (event.type === "agent_done") {
              setAgentStatus((prev) => ({ ...prev, [event.agent]: "done" }));
              collected[event.key as keyof StartupAdvisorReport] = event.content;
              setReport({ ...collected });
            } else if (event.type === "error") {
              setError(event.message);
            }
          } catch {
            // malformed line, skip
          }
        }
      }
    } catch {
      setError("We could not reach the advisor service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const isComplete = !isLoading && report?.finalReport;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(320px,400px)_1fr]">
      {/* Form panel */}
      <div className="space-y-4">
        <form
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-950">Startup brief</h2>
            <p className="mt-1 text-sm text-slate-500">
              Give the agents enough context to produce a grounded advisory plan.
            </p>
          </div>

          <div className="space-y-4">
            {fields.map((field) => (
              <label className="block" htmlFor={field.id} key={field.id}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{field.label}</span>
                  <span
                    className={`text-xs tabular-nums ${
                      form[field.id].length > field.maxLength * 0.9
                        ? "text-rose-500"
                        : "text-slate-400"
                    }`}
                  >
                    {form[field.id].length}/{field.maxLength}
                  </span>
                </div>
                {field.multiline ? (
                  <textarea
                    className="mt-2 min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                    id={field.id}
                    maxLength={field.maxLength}
                    onChange={(e) => setForm((c) => ({ ...c, [field.id]: e.target.value }))}
                    placeholder={field.placeholder}
                    required
                    value={form[field.id]}
                  />
                ) : (
                  <input
                    className="mt-2 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                    id={field.id}
                    maxLength={field.maxLength}
                    onChange={(e) => setForm((c) => ({ ...c, [field.id]: e.target.value }))}
                    placeholder={field.placeholder}
                    required
                    value={form[field.id]}
                  />
                )}
              </label>
            ))}
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          )}

          <button
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Running agents…
              </>
            ) : (
              "Generate advisory report"
            )}
          </button>
        </form>

        {/* Agent progress — always visible once loading starts */}
        {(isLoading || isComplete) && <AgentProgress statuses={agentStatus} />}
      </div>

      {/* Report panel */}
      <div className="min-h-[520px]">
        {isLoading && !report?.marketAnalysis ? (
          <div className="flex min-h-[520px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div>
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
              <p className="mt-4 text-sm font-medium text-slate-600">Agents are thinking…</p>
              <p className="mt-1 text-xs text-slate-400">Results will appear as each agent completes</p>
            </div>
          </div>
        ) : report ? (
          <ReportView report={report} isLoading={isLoading} />
        ) : (
          <div className="flex min-h-[520px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="max-w-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl">
                🚀
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-700">
                Multi-agent workspace
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Your specialist report appears here
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Market, product, finance, risk, and coordinator agents will analyze your brief through a live LangGraph workflow.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
