import { createFileRoute } from "@tanstack/react-router";
import { FileText, ShoppingCart, PackageCheck, Receipt, Banknote, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { KPI } from "@/lib/constants";

export const Route = createFileRoute("/workspace")({
  head: () => ({ meta: [{ title: "Procurement Workspace · Procurement Copilot" }] }),
  component: WorkspacePage,
});

const STEPS = [
  { icon: Users, name: "Vendor Master", desc: "Onboarding, qualification and master-data governance.", count: `${KPI.suppliers} vendors` },
  { icon: FileText, name: "Purchase Requisition", desc: "Demand intake, approvals, budget checks.", count: "832 open" },
  { icon: ShoppingCart, name: "Purchase Order", desc: "PO creation, framework agreements, sourcing events.", count: `${KPI.purchaseOrders.toLocaleString("en-IN")} active` },
  { icon: PackageCheck, name: "Goods Receipt", desc: "Receipt confirmation, quality inspection.", count: `${KPI.onTimeDeliveryPct}% on time` },
  { icon: Receipt, name: "Invoice", desc: "3-way match, exception handling, posting.", count: `${KPI.invoiceMatchPct}% matched` },
  { icon: Banknote, name: "Payment", desc: "Payment runs, discount capture, cash forecasting.", count: `${KPI.monthlyRunRate}/month` },
];

function WorkspacePage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Process" title="Procurement Workspace" description="Understand the end-to-end Procure-to-Pay process. Each stage is connected to live data and AI explanations." />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="grid gap-3 lg:grid-cols-6">
            {STEPS.map((s, i) => (
              <div key={s.name} className="relative">
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-4 transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background ring-1 ring-border"><s.icon className="h-4 w-4" /></div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold">{s.name}</div>
                  <div className="mt-1 flex-1 text-xs text-muted-foreground">{s.desc}</div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent-foreground">{s.count}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Health title="Process health" pct={92} sub="Above target (90%)" />
          <Health title="On-time delivery" pct={97} sub="EMEA avg" tone="ok" />
          <Health title="Invoice match rate" pct={87} sub="3-way matching" tone="warn" />
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="text-sm font-semibold">Recent activity</div>
          <div className="mt-4 divide-y divide-border">
            {[
              ["PO-48201 issued", "Vertex IT Services · $42,500", "2 min ago"],
              ["GR-19844 posted", "Helix Logistics · 12 lines", "18 min ago"],
              ["Invoice INV-2298 blocked", "Price variance > 5%", "1 hr ago"],
              ["Framework renewed", "Acme Industrial · 24-month term", "Today"],
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

function Health({ title, pct, sub, tone = "ok" }: { title: string; pct: number; sub: string; tone?: "ok" | "warn" }) {
  const color = tone === "warn" ? "oklch(0.78 0.16 70)" : "oklch(0.65 0.16 155)";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
      <div className="mt-4 flex items-end gap-3">
        <div className="text-3xl font-semibold tracking-tight">{pct}%</div>
        <div className="mb-1 h-2 flex-1 overflow-hidden rounded-full bg-surface">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}
