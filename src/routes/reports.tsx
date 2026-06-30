import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart2, Download, Sparkles, Calendar } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Executive Reports · Procurement Copilot" }] }),
  component: ReportsPage,
});

const REPORTS = [
  { t: "Q4 Procurement Performance Review", d: "AI-generated executive summary covering spend, savings and supplier performance.", date: "Dec 12, 2026", tag: "Quarterly" },
  { t: "Maverick Spend Deep-Dive", d: "Root-cause analysis of off-contract purchasing across IT Services.", date: "Dec 4, 2026", tag: "Ad-hoc" },
  { t: "Supplier Risk Briefing — EMEA", d: "Top 10 suppliers, exposure assessment and mitigation actions.", date: "Nov 28, 2026", tag: "Monthly" },
  { t: "FY26 Savings Realization", d: "Tracked vs committed savings; variance commentary.", date: "Nov 15, 2026", tag: "Quarterly" },
];

function ReportsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Leadership"
        title="Executive Reports"
        description="Generate board-ready summaries powered by AI in seconds — not weeks."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground shadow-glow hover:brightness-95">
            <Sparkles className="h-4 w-4" /> Generate new report
          </button>
        }
      />
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 via-card to-card p-6 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-foreground/70"><Sparkles className="h-3.5 w-3.5" /> Featured · AI Generated</div>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">Q4 Procurement Performance Review</h2>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Total spend reached $42.6M YTD (+8.4% YoY), driven by IT Services and Logistics. Maverick spend trended up by 1.9% — concentrated in EMEA Engineering following a framework lapse with Vertex IT Services. Recommended actions are projected to recover $0.42M run-rate and reduce average PO cycle time by 2.1 days.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-sm font-semibold text-background"><Download className="h-4 w-4" />Download PDF</button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">Share with CFO</button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {REPORTS.map((r) => (
            <div key={r.t} className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface ring-1 ring-border"><FileBarChart2 className="h-4 w-4" /></div>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{r.tag}</span>
              </div>
              <div className="mt-3 text-base font-semibold">{r.t}</div>
              <div className="mt-1 flex-1 text-sm text-muted-foreground">{r.d}</div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {r.date}</span>
                <button className="inline-flex items-center gap-1 font-medium text-foreground"><Download className="h-3.5 w-3.5" /> PDF</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
