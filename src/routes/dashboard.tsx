import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { ArrowDown, ArrowUp, Download, Filter, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Procurement Copilot" }] }),
  component: DashboardPage,
});

const spendTrend = [
  { m: "Jan", spend: 2.4, plan: 2.6 }, { m: "Feb", spend: 2.7, plan: 2.6 },
  { m: "Mar", spend: 2.9, plan: 2.7 }, { m: "Apr", spend: 3.2, plan: 2.8 },
  { m: "May", spend: 3.0, plan: 2.9 }, { m: "Jun", spend: 3.5, plan: 3.0 },
  { m: "Jul", spend: 3.8, plan: 3.1 }, { m: "Aug", spend: 3.6, plan: 3.2 },
  { m: "Sep", spend: 4.1, plan: 3.3 }, { m: "Oct", spend: 4.4, plan: 3.4 },
  { m: "Nov", spend: 4.2, plan: 3.5 }, { m: "Dec", spend: 4.6, plan: 3.6 },
];
const byCategory = [
  { name: "IT Services", value: 38 }, { name: "Logistics", value: 22 },
  { name: "Raw Materials", value: 18 }, { name: "Facilities", value: 12 }, { name: "Other", value: 10 },
];
const cycleTime = [
  { m: "Q1", pr: 4.1, po: 2.2, gr: 1.4, inv: 5.5 },
  { m: "Q2", pr: 3.8, po: 2.0, gr: 1.3, inv: 5.0 },
  { m: "Q3", pr: 4.5, po: 2.4, gr: 1.6, inv: 6.1 },
  { m: "Q4", pr: 4.2, po: 2.1, gr: 1.5, inv: 5.4 },
];
const COLORS = ["oklch(0.86 0.17 92)", "oklch(0.55 0.15 250)", "oklch(0.65 0.16 155)", "oklch(0.7 0.16 30)", "oklch(0.6 0.18 300)"];

const kpis = [
  { label: "Total Spend (YTD)", value: "$42.6M", delta: 8.4, up: true },
  { label: "Active Suppliers", value: "1,284", delta: 2.1, up: true },
  { label: "Avg PO Cycle Time", value: "6.8 days", delta: -4.2, up: false },
  { label: "Maverick Spend", value: "12.3%", delta: 1.9, up: true, bad: true },
];

function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Performance"
        title="Procurement Dashboard"
        description="Real-time view of spend, cycle time and supplier performance across the organization."
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-surface">
              <Filter className="h-4 w-4" /> FY 2026 · EMEA
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-surface">
              <Download className="h-4 w-4" /> Export
            </button>
            <Link to="/ai-analyst" className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground shadow-glow hover:brightness-95">
              <Sparkles className="h-4 w-4" /> Ask AI Analyst
            </Link>
          </>
        }
      />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-2xl font-semibold tracking-tight">{k.value}</div>
                <div className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                  (k.bad ? !k.up : k.up) ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                }`}>
                  {k.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(k.delta)}%
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-foreground/70" style={{ width: `${40 + Math.random() * 50}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Monthly Spend vs Plan</div>
                <div className="text-xs text-muted-foreground">USD millions</div>
              </div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-foreground" /> Actual</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: "oklch(0.86 0.17 92)" }} /> Plan</span>
              </div>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <AreaChart data={spendTrend}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.22 0.01 260)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="oklch(0.22 0.01 260)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.93 0.005 260)" />
                  <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="oklch(0.5 0.01 260)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0.01 260)" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.93 0.005 260)", fontSize: 12 }} />
                  <Area type="monotone" dataKey="spend" stroke="oklch(0.22 0.01 260)" strokeWidth={2} fill="url(#g1)" />
                  <Line type="monotone" dataKey="plan" stroke="oklch(0.86 0.17 92)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="text-sm font-semibold">Spend by Category</div>
            <div className="text-xs text-muted-foreground">YTD share</div>
            <div className="mt-2 h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={byCategory} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.93 0.005 260)", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5">
              {byCategory.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />{c.name}</span>
                  <span className="text-muted-foreground">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
            <div className="text-sm font-semibold">P2P Cycle Time (days)</div>
            <div className="text-xs text-muted-foreground">PR → PO → GR → Invoice</div>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <BarChart data={cycleTime}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.93 0.005 260)" />
                  <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="oklch(0.5 0.01 260)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0.01 260)" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.93 0.005 260)", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="pr" stackId="a" fill="oklch(0.86 0.17 92)" radius={[0,0,0,0]} />
                  <Bar dataKey="po" stackId="a" fill="oklch(0.55 0.15 250)" />
                  <Bar dataKey="gr" stackId="a" fill="oklch(0.65 0.16 155)" />
                  <Bar dataKey="inv" stackId="a" fill="oklch(0.22 0.01 260)" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Top Suppliers</div>
              <Link to="/ai-analyst" className="text-xs text-muted-foreground hover:text-foreground">View all →</Link>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { n: "Acme Industrial", s: 8.2, r: "Low" },
                { n: "Helix Logistics", s: 6.4, r: "Medium" },
                { n: "Northwind Materials", s: 5.1, r: "Low" },
                { n: "Vertex IT Services", s: 4.7, r: "High" },
                { n: "Orion Facilities", s: 3.9, r: "Low" },
              ].map((s) => (
                <div key={s.n} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{s.n}</div>
                    <div className="text-xs text-muted-foreground">${s.s}M YTD</div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    s.r === "High" ? "bg-destructive/10 text-destructive" :
                    s.r === "Medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                  }`}>{s.r} risk</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI insight banner */}
        <Link to="/ai-analyst" className="group block rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 via-background to-background p-5 shadow-soft transition hover:shadow-elevated">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Sparkles className="h-5 w-5" /></div>
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/70">AI Insight</div>
              <div className="mt-1 text-sm font-semibold">Maverick spend in IT Services rose 1.9% this month — likely caused by 14 off-contract POs from Vertex IT Services.</div>
              <div className="mt-1 text-xs text-muted-foreground">Ask the AI Analyst to investigate root causes and recommend remediation.</div>
            </div>
            <span className="text-xs font-medium opacity-0 transition group-hover:opacity-100">Open →</span>
          </div>
        </Link>
      </div>
    </AppShell>
  );
}
