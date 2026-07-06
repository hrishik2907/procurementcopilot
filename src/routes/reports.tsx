import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart2, Download, Sparkles, Calendar } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { KPI } from "@/lib/constants";
import { toast } from "sonner";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Executive Reports · Procurement Copilot" }] }),
  component: ReportsPage,
});

const REPORTS = [
  {
    t: "Q4 Procurement Performance Review",
    d: `Total procurement spend of ${KPI.totalSpend} YTD across ${KPI.suppliers} suppliers and ${KPI.categories} categories. Budget utilization at ${KPI.budgetUtilPct}% with ${KPI.savingsRealised} in realised savings.`,
    date: "Dec 12, 2026",
    tag: "Quarterly",
  },
  {
    t: "Vendor Performance Scorecard",
    d: `Top 20 suppliers by spend volume, delivery reliability and invoice accuracy. On-time delivery holding at ${KPI.onTimeDeliveryPct}%; ${KPI.highRiskSuppliers} suppliers flagged for review.`,
    date: "Dec 4, 2026",
    tag: "Monthly",
  },
  {
    t: "Category Spend Deep-Dive",
    d: `Breakdown across IT Services, Raw Materials, Logistics, Consulting and MRO. IT Services leads at ~28% of ${KPI.totalSpend}; MRO exceeded budget by 6.4%.`,
    date: "Nov 28, 2026",
    tag: "Ad-hoc",
  },
  {
    t: "Budget Utilization Report",
    d: `Committed spend of ${KPI.budgetUtilization} against approved budget of ${KPI.approvedBudget} (${KPI.budgetUtilPct}%). Engineering and Operations remain within limits; Marketing at 108%.`,
    date: "Nov 15, 2026",
    tag: "Monthly",
  },
  {
    t: "Invoice Performance Summary",
    d: `${KPI.invoices.toLocaleString("en-IN")} invoices processed worth ${KPI.invoiceValue}. 3-way match rate at ${KPI.invoiceMatchPct}%; average PO cycle time reduced by 2.1 days.`,
    date: "Nov 8, 2026",
    tag: "Monthly",
  },
  {
    t: "Contract Compliance & Renewal Watch",
    d: `Active contract value at ${KPI.contractValue}. 12 framework agreements expiring in the next 90 days; renewal recommendations issued for the top 5 by exposure.`,
    date: "Oct 30, 2026",
    tag: "Quarterly",
  },
];

function ReportsPage() {
  const downloadPdf = (title: string) => toast(`${title} — PDF export queued`);
  return (
    <AppShell>
      <PageHeader
        eyebrow="Leadership"
        title="Executive Reports"
        description="Board-ready summaries generated from the procurement dataset — every number ties back to the dashboard."
        actions={
          <button
            onClick={() => toast("Jarvis is drafting a fresh executive summary…")}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-95"
          >
            <Sparkles className="h-4 w-4" /> Generate new report
          </button>
        }
      />
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Executive Summary Bar */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Executive Summary</div>
              <div className="mt-1 text-lg font-semibold tracking-tight">Procurement Health Score</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-semibold tracking-tight">82<span className="text-base text-muted-foreground">/100</span></div>
              <div className="text-[11px] font-medium text-success">On track</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryTile label="Overall Spend" value={KPI.totalSpend} />
            <SummaryTile label="Savings Identified" value={KPI.savingsRealised} tone="ok" />
            <SummaryTile label="Risk Exposure" value={`${KPI.highRiskSuppliers} suppliers`} tone="warn" />
            <SummaryTile label="Budget Utilization" value={`${KPI.budgetUtilPct}%`} />
          </div>
        </div>

        <div className="rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 via-card to-card p-6 shadow-soft transition hover:shadow-elevated">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-foreground/70">
            <Sparkles className="h-3.5 w-3.5" /> Featured · AI Generated
          </div>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">Q4 Procurement Performance Review</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Total procurement spend reached <span className="font-semibold text-foreground">{KPI.totalSpend}</span>{" "}
            across {KPI.suppliers} suppliers, with committed spend of{" "}
            <span className="font-semibold text-foreground">{KPI.budgetUtilization}</span> against an approved
            budget of <span className="font-semibold text-foreground">{KPI.approvedBudget}</span>
            {" "}({KPI.budgetUtilPct}% utilization). Contract value under active management stands at{" "}
            <span className="font-semibold text-foreground">{KPI.contractValue}</span>. On-time delivery is holding
            at {KPI.onTimeDeliveryPct}% and 3-way invoice matching at {KPI.invoiceMatchPct}%.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Jarvis recommendations:</span> renew the top 3 framework
            agreements expiring this quarter (projected saving ~₹ 2.48 Cr/year), consolidate logistics vendors
            from 5 to 2 in APAC, and lower auto-approval thresholds for IT Services to ₹ 8 Lakh to curb maverick
            spend.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => downloadPdf("Q4 Procurement Performance Review")}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-sm font-semibold text-background transition hover:opacity-90"
            >
              <Download className="h-4 w-4" />Download PDF
            </button>
            <button
              onClick={() => toast("Share link copied — sent to CFO")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm transition hover:bg-surface"
            >
              Share with CFO
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {REPORTS.map((r) => (
            <div
              key={r.t}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface ring-1 ring-border">
                  <FileBarChart2 className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {r.tag}
                </span>
              </div>
              <div className="mt-3 text-base font-semibold">{r.t}</div>
              <div className="mt-1 flex-1 text-sm text-muted-foreground">{r.d}</div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {r.date}
                </span>
                <button
                  onClick={() => downloadPdf(r.t)}
                  className="inline-flex items-center gap-1 font-medium text-foreground transition hover:text-accent-foreground"
                >
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
