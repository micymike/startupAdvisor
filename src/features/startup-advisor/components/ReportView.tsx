"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { StartupAdvisorReport } from "../types/startup.types";

type ReportViewProps = {
  report: Partial<StartupAdvisorReport>;
  isLoading?: boolean;
};

const SECTIONS: Array<{
  key: keyof StartupAdvisorReport;
  label: string;
  icon: string;
  badge: string;
  badgeColor: string;
}> = [
  { key: "finalReport", label: "Full Report", icon: "🧠", badge: "Coordinator", badgeColor: "bg-teal-100 text-teal-700" },
  { key: "marketAnalysis", label: "Market", icon: "📊", badge: "Market Agent", badgeColor: "bg-violet-100 text-violet-700" },
  { key: "productStrategy", label: "Product", icon: "🛠️", badge: "Product Agent", badgeColor: "bg-blue-100 text-blue-700" },
  { key: "financialPlan", label: "Finance", icon: "💰", badge: "Finance Agent", badgeColor: "bg-amber-100 text-amber-700" },
  { key: "riskAnalysis", label: "Risk", icon: "⚠️", badge: "Risk Agent", badgeColor: "bg-rose-100 text-rose-700" },
];

function MarkdownContent({ value }: { value: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 className="mt-5 text-xl font-bold text-slate-950 first:mt-0">{children}</h1>,
        h2: ({ children }) => <h2 className="mt-4 text-base font-semibold text-slate-900 first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-3 text-sm font-semibold text-slate-800">{children}</h3>,
        p: ({ children }) => <p className="mt-2 text-sm leading-7 text-slate-700 first:mt-0">{children}</p>,
        ul: ({ children }) => <ul className="mt-2 space-y-1 pl-5">{children}</ul>,
        ol: ({ children }) => <ol className="mt-2 list-decimal space-y-1 pl-5">{children}</ol>,
        li: ({ children }) => <li className="text-sm leading-6 text-slate-700 list-disc">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
        hr: () => <hr className="my-4 border-slate-200" />,
        code: ({ children }) => (
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-800">{children}</code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mt-3 border-l-4 border-teal-400 pl-4 text-sm italic text-slate-600">{children}</blockquote>
        ),
      }}
    >
      {value}
    </ReactMarkdown>
  );
}

function StreamingPlaceholder({ label }: { label: string }) {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-2/3 rounded bg-slate-200" />
      <div className="h-3 w-full rounded bg-slate-100" />
      <div className="h-3 w-5/6 rounded bg-slate-100" />
      <div className="h-3 w-4/5 rounded bg-slate-100" />
      <p className="pt-2 text-xs text-slate-400">{label} agent is running…</p>
    </div>
  );
}

export function ReportView({ report, isLoading }: ReportViewProps) {
  const [activeTab, setActiveTab] = useState<keyof StartupAdvisorReport>("finalReport");

  const available = SECTIONS.filter((s) => report[s.key] || isLoading);
  const activeSection = SECTIONS.find((s) => s.key === activeTab) ?? SECTIONS[0];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm print:shadow-none print:border-none">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-950">Advisory Report</span>
          {isLoading && (
            <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
              Live
            </span>
          )}
          {!isLoading && report.finalReport && (
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-600">
              Complete
            </span>
          )}
        </div>
        {report.finalReport && !isLoading && (
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
          >
            <span>🖨️</span> Export PDF
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 px-4 pt-3 print:hidden">
        {available.map((section) => {
          const hasContent = !!report[section.key];
          const isActive = activeTab === section.key;
          return (
            <button
              key={section.key}
              onClick={() => { if (hasContent) setActiveTab(section.key); }}
              disabled={!hasContent}
              className={`flex shrink-0 items-center gap-1.5 rounded-t-lg border border-b-0 px-3 py-2 text-xs font-medium transition ${
                isActive
                  ? "border-slate-200 bg-white text-slate-950 -mb-px pb-[calc(0.5rem+1px)]"
                  : hasContent
                    ? "border-transparent text-slate-500 hover:text-slate-700"
                    : "border-transparent text-slate-300 cursor-not-allowed"
              }`}
            >
              <span>{section.icon}</span>
              {section.label}
              {!hasContent && isLoading && (
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              )}
              {hasContent && (
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Badge */}
        <div className="mb-4 flex items-center gap-2 print:hidden">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${activeSection.badgeColor}`}>
            {activeSection.badge}
          </span>
        </div>

        {report[activeTab] ? (
          <MarkdownContent value={report[activeTab]!} />
        ) : isLoading ? (
          <StreamingPlaceholder label={activeSection.label} />
        ) : null}
      </div>

      {/* Print view — show all sections */}
      <div className="hidden print:block p-8 space-y-10">
        {SECTIONS.filter((s) => report[s.key]).map((section) => (
          <div key={section.key}>
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">
              {section.icon} {section.label}
            </h2>
            <MarkdownContent value={report[section.key]!} />
          </div>
        ))}
      </div>
    </div>
  );
}
