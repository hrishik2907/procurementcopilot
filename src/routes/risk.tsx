import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, AlertTriangle, ShieldCheck, Globe2, Building2, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { KPI } from "@/lib/constants";

export const Route = createFileRoute("/risk")({
  head: () => ({ meta: [{ title: "Risk Center · Procurement Copilot" }] }),
  component: RiskPage,
});

const RISKS = [
  { name: "Infosys", cat: "Supplier concentration", level: "High", score: 84, why: "Single-source for 38% of IT Services spend; framework renewal due this quarter.", region: "India" },
  { name: "Mahindra Logistics", cat: "Delivery reliability", level: "High", score: 78, why: "12 late shipments in the last 60 days; on-time delivery dropped to 88%.", region: "India" },
  { name: "Adani Ports", cat: "Geopolitical", level: "Medium", score: 62, why: "Routes exposed to congestion at Mundra; recent disruption events flagged.", region: "India" },
  { name: "Bharti Airtel", cat: "Contract expiry", level: "Medium", score: 58, why: "Framework agreement expires in 47 days; renewal negotiations pending.", region: "India" },
  { name: "Tata Steel", cat: "Budget overspend", level: "Medium", score: 55, why: "Raw materials category tracking 6.4% above approved budget YTD.", region: "India" },
  { name: "UltraTech Cement", cat: "Invoice bottleneck", level: "Low", score: 34, why: "9 invoices pending 3-way match beyond 15 days; ₹ 4.2 Cr blocked.", region: "India" },
  { name: "Siemens India", cat: "Vendor dependency", level: "Low", score: 32, why: "Diversified across 4 plants; stable delivery and financial health.", region: "India" },
  { name: "Cipla", cat: "Financial", level: "Low", score: 28, why: "Strong credit rating; long-term contract in good standing.", region: "India" },
];

const LEVEL = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-success/10 text-success border-success/20",
} as const;

function RiskPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Risk intelligence" title="Risk Center" description="Identify supplier, compliance and concentration risks before they hit the business." />
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { i: ShieldAlert, k: "High risk", v: 1, tone: "bad" },
            { i: AlertTriangle, k: "Medium risk", v: 7, tone: "warn" },
            { i: ShieldCheck, k: "Low risk", v: 1276, tone: "ok" },
            { i: Globe2, k: "Regions monitored", v: 12, tone: "neutral" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><s.i className="h-4 w-4" /> {s.k}</div>
              <div className="mt-2 text-2xl font-semibold">{s.v.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="text-sm font-semibold">Supplier risk register</div>
            <button className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground"><Sparkles className="h-3.5 w-3.5" /> AI explain</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Supplier</th>
                  <th className="px-5 py-3 text-left font-medium">Category</th>
                  <th className="px-5 py-3 text-left font-medium">Region</th>
                  <th className="px-5 py-3 text-left font-medium">Score</th>
                  <th className="px-5 py-3 text-left font-medium">Level</th>
                  <th className="px-5 py-3 text-left font-medium">AI explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {RISKS.map((r) => (
                  <tr key={r.name} className="transition hover:bg-surface/60">
                    <td className="px-5 py-3 font-medium"><div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-muted-foreground" />{r.name}</div></td>
                    <td className="px-5 py-3 text-muted-foreground">{r.cat}</td>
                    <td className="px-5 py-3 text-muted-foreground">{r.region}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface">
                          <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: r.score > 70 ? "oklch(0.6 0.22 27)" : r.score > 50 ? "oklch(0.78 0.16 70)" : "oklch(0.65 0.16 155)" }} />
                        </div>
                        <span className="text-xs font-medium">{r.score}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3"><span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${LEVEL[r.level as keyof typeof LEVEL]}`}>{r.level}</span></td>
                    <td className="max-w-md px-5 py-3 text-xs text-muted-foreground">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
