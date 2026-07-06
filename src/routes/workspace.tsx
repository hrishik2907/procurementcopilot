import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText, ShoppingCart, PackageCheck, Receipt, Banknote, Users,
  ArrowRight, CheckCircle2, ChevronDown, Sparkles, ShieldAlert, Target, Gauge,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { KPI } from "@/lib/constants";

export const Route = createFileRoute("/workspace")({
  head: () => ({ meta: [{ title: "Procurement Workspace · Procurement Copilot" }] }),
  component: WorkspacePage,
});

type Step = {
  icon: any; name: string; desc: string; count: string;
  objective: string; kpis: string[]; risks: string[]; ai: string;
};

const STEPS: Step[] = [
  {
    icon: Users, name: "Vendor Master", desc: "Onboarding, qualification and master-data governance.", count: `${KPI.suppliers} vendors`,
    objective: "Maintain a clean, deduplicated and compliant vendor master across all business units.",
    kpis: ["Active vendors", "Approved vs. blocked ratio", "Duplicate rate"],
    risks: ["Duplicate vendor records", "Sanctioned or non-compliant suppliers", "Missing tax / bank details"],
    ai: "Jarvis flagged 6 suspected duplicates and 2 vendors missing GST verification.",
  },
  {
    icon: FileText, name: "Purchase Requisition", desc: "Demand intake, approvals, budget checks.", count: "832 open",
    objective: "Route business demand through the correct approvers with budget visibility before commitment.",
    kpis: ["PR cycle time", "First-pass approval rate", "Budget breach rate"],
    risks: ["Budget breaches", "Unapproved off-catalog demand", "Delayed approvals"],
    ai: "Jarvis observes 14% of PRs waiting > 3 days on the Engineering approver queue.",
  },
  {
    icon: ShoppingCart, name: "Purchase Order", desc: "PO creation, framework agreements, sourcing events.", count: `${KPI.purchaseOrders.toLocaleString("en-IN")} active`,
    objective: "Convert approved demand into contract-backed POs and avoid maverick spend.",
    kpis: ["PO cycle time", "Contract coverage %", "Maverick spend %"],
    risks: ["Off-contract POs", "Split POs to bypass thresholds", "Missing catalog items"],
    ai: "Jarvis detected 14 off-contract POs against Infosys after framework expiry.",
  },
  {
    icon: PackageCheck, name: "Goods Receipt", desc: "Receipt confirmation, quality inspection.", count: `${KPI.onTimeDeliveryPct}% on time`,
    objective: "Confirm delivery quantity and quality against the PO before invoice payment.",
    kpis: ["On-time delivery", "Quality rejection rate", "GR lead time"],
    risks: ["Under / over deliveries", "Delayed GR posting", "Damaged shipments"],
    ai: "Jarvis notes Mahindra Logistics slipped to 88% on-time delivery over the last 60 days.",
  },
  {
    icon: Receipt, name: "Invoice", desc: "3-way match, exception handling, posting.", count: `${KPI.invoiceMatchPct}% matched`,
    objective: "Ensure every invoice matches PO + GR before posting to prevent overpayment.",
    kpis: ["3-way match %", "Exception rate", "Days-to-post"],
    risks: ["Price variances", "Duplicate invoices", "Blocked invoices"],
    ai: "Jarvis blocked 9 UltraTech invoices totalling ₹ 4.2 Cr for price variance > 5%.",
  },
  {
    icon: Banknote, name: "Payment", desc: "Payment runs, discount capture, cash forecasting.", count: `${KPI.monthlyRunRate}/month`,
    objective: "Pay on time, capture early-payment discounts and forecast cash outflow.",
    kpis: ["On-time payment %", "Discount capture rate", "DPO"],
    risks: ["Missed discounts", "Late payments to critical suppliers", "Duplicate payments"],
    ai: "Jarvis projects ₹ 32 Lakh recoverable via early-payment discounts this quarter.",
  },
];

function WorkspacePage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <AppShell>
      <PageHeader eyebrow="Process" title="Procurement Workspace" description="Understand the end-to-end Procure-to-Pay process. Each stage is connected to live data and AI explanations." />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="grid gap-3 lg:grid-cols-6">
            {STEPS.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="relative text-left"
              >
                <div className={`group flex h-full flex-col rounded-2xl border p-4 transition ${open === i ? "border-accent bg-card shadow-elevated" : "border-border bg-surface hover:-translate-y-0.5 hover:bg-card hover:shadow-soft"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background ring-1 ring-border"><s.icon className="h-4 w-4" /></div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold">{s.name}</div>
                  <div className="mt-1 flex-1 text-xs text-muted-foreground">{s.desc}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent-foreground">{s.count}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground lg:block" />
                )}
              </button>
            ))}
          </div>

          {open !== null && (
            <div className="mt-6 grid gap-4 rounded-2xl border border-border bg-surface p-5 animate-in fade-in slide-in-from-top-2 duration-300 lg:grid-cols-4">
              <Panel icon={Target} title="Business Objective">{STEPS[open].objective}</Panel>
              <Panel icon={Gauge} title="Key KPIs">
                <ul className="mt-1 space-y-1">
                  {STEPS[open].kpis.map((k) => (
                    <li key={k} className="flex items-start gap-1.5"><CheckCircle2 className="mt-0.5 h-3 w-3 text-success" />{k}</li>
                  ))}
                </ul>
              </Panel>
              <Panel icon={ShieldAlert} title="Common Risks">
                <ul className="mt-1 space-y-1">
                  {STEPS[open].risks.map((r) => (
                    <li key={r} className="flex items-start gap-1.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-destructive" />{r}</li>
                  ))}
                </ul>
              </Panel>
              <Panel icon={Sparkles} title="Jarvis Insight" accent>{STEPS[open].ai}</Panel>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Health title="Process health" pct={92} sub="Above target (90%)" />
          <Health title="On-time delivery" pct={Math.round(KPI.onTimeDeliveryPct)} sub="Dataset average" tone="ok" />
          <Health title="Invoice match rate" pct={Math.round(KPI.invoiceMatchPct)} sub="3-way matching" tone="warn" />
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="text-sm font-semibold">Recent activity</div>
          <div className="mt-4 divide-y divide-border">
            {[
              ["PO-48201 issued", "Infosys · ₹ 42.5 Lakh", "2 min ago"],
              ["GR-19844 posted", "Mahindra Logistics · 12 lines", "18 min ago"],
              ["Invoice INV-2298 blocked", "Price variance > 5%", "1 hr ago"],
              ["Framework renewed", "Tata Steel · 24-month term", "Today"],
            ].map(([a, b, c]) => (
              <div key={a} className="flex items-center justify-between gap-4 py-3 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <div><div className="font-medium">{a}</div><div className="text-xs text-muted-foreground">{b}</div></div>
                </div>
                <div className="text-xs text-muted-foreground">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Panel({ icon: Icon, title, children, accent }: { icon: any; title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 text-xs ${accent ? "border-accent/40 bg-accent/10" : "border-border bg-card"}`}>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {title}
      </div>
      <div className="mt-2 text-foreground">{children}</div>
    </div>
  );
}

function Health({ title, pct, sub, tone = "ok" }: { title: string; pct: number; sub: string; tone?: "ok" | "warn" }) {
  const color = tone === "warn" ? "oklch(0.78 0.16 70)" : "oklch(0.65 0.16 155)";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
      <div className="mt-4 flex items-end gap-3">
        <div className="text-3xl font-semibold tracking-tight">{pct}%</div>
        <div className="mb-1 h-2 flex-1 overflow-hidden rounded-full bg-surface">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}
