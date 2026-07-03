import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3, Database, Table2, Calendar, ExternalLink, Sparkles,
  CheckCircle2, LayoutDashboard, Cpu, TrendingUp, Layers, Filter,
  MousePointerClick, Brain, FileSpreadsheet, PieChart, ShieldAlert,
  Wallet, FileText, Users, MessageSquare,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Analytics Hub · Procurement Copilot" },
      { name: "description", content: "Enterprise Power BI procurement analytics dashboard built with SQL, PySpark and DAX." },
    ],
  }),
  component: DashboardPage,
});

// Replace with your embedded Power BI report URL when ready
const POWER_BI_EMBED_URL: string | null = null;
const POWER_BI_OPEN_URL = "#";

function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px] px-6 py-8 space-y-8">
        {/* HEADER */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-accent/10 px-3 py-1 text-xs font-medium text-foreground/80">
              <BarChart3 className="h-3.5 w-3.5 text-accent-foreground" />
              Analytics Hub
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Enterprise Procurement Analytics Dashboard
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Interactive Power BI dashboard built using <span className="font-medium text-foreground">SQL, PySpark, Power BI</span> and a real procurement dataset containing Contracts, Purchase Orders, Supplier Risk, Budget, Payments and Vendor data.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-2 lg:w-[420px]">
            <MetaTile icon={<Calendar className="h-4 w-4" />} label="Last Refresh" value="Today, 09:42" />
            <MetaTile icon={<Database className="h-4 w-4" />} label="Dataset Size" value="5,248+ rows" />
            <MetaTile icon={<Table2 className="h-4 w-4" />} label="Tables" value="12 connected" />
            <div className="rounded-xl border border-accent/40 bg-accent/15 p-3 flex items-center justify-center">
              <span className="text-sm font-semibold tracking-wide text-foreground">FY2024 – FY2026</span>
            </div>
          </div>
        </header>

        {/* MAIN EMBEDDED DASHBOARD */}
        <section className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-foreground">Live Report</span>
              <span className="ml-2 text-xs text-muted-foreground">Power BI · Procurement Workspace</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Cross-filtering enabled
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-muted/40 via-background to-accent/5">
            {POWER_BI_EMBED_URL ? (
              <iframe
                title="Power BI Procurement Dashboard"
                src={POWER_BI_EMBED_URL}
                className="absolute inset-0 h-full w-full"
                frameBorder={0}
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 -m-8 rounded-full bg-accent/20 blur-2xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-md">
                    <BarChart3 className="h-10 w-10 text-accent-foreground" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">Interactive Power BI Dashboard</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  The embedded procurement report will render here. Insert your Power BI publish-to-web URL to activate the live analytics view.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {[
                    "Executive Overview",
                    "Procurement Analytics",
                    "Interactive Filters",
                    "Drill Down",
                    "AI Ready",
                  ].map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* INFO PANEL */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Dashboard Pages"
            items={["Executive Overview", "Procurement Analytics"]}
          />
          <InfoCard
            icon={<Database className="h-5 w-5" />}
            title="Dataset"
            items={["12 Connected Tables", "5,248+ Records", "FY2024 – FY2026"]}
          />
          <InfoCard
            icon={<Cpu className="h-5 w-5" />}
            title="Technologies"
            items={["SQL", "PySpark", "Power BI", "DAX", "Power Query"]}
          />
          <InfoCard
            icon={<TrendingUp className="h-5 w-5" />}
            title="Business Insights"
            items={["Procurement Spend", "Supplier Risk", "Budget Analysis", "Contract Analysis", "Vendor Performance"]}
          />
        </section>

        {/* BOTTOM CARDS */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <BigCard
            icon={<Sparkles className="h-5 w-5 text-accent-foreground" />}
            title="Project Highlights"
            subtitle="What powers this analytics build"
            rows={[
              { icon: <Layers className="h-4 w-4" />, text: "Built using SQL + PySpark + Power BI" },
              { icon: <MousePointerClick className="h-4 w-4" />, text: "Interactive drill-through" },
              { icon: <Filter className="h-4 w-4" />, text: "Cross filtering across all visuals" },
              { icon: <TrendingUp className="h-4 w-4" />, text: "KPI monitoring" },
              { icon: <PieChart className="h-4 w-4" />, text: "Procurement analytics" },
              { icon: <FileText className="h-4 w-4" />, text: "Executive reporting" },
            ]}
          />
          <BigCard
            icon={<Brain className="h-5 w-5 text-accent-foreground" />}
            title="Business Questions Answered"
            subtitle="Decisions this dashboard supports"
            rows={[
              { icon: <Users className="h-4 w-4" />, text: "Which vendors contribute the highest spend?" },
              { icon: <ShieldAlert className="h-4 w-4" />, text: "Which suppliers have the highest risk?" },
              { icon: <Wallet className="h-4 w-4" />, text: "Which departments exceeded budget?" },
              { icon: <FileText className="h-4 w-4" />, text: "Which contracts are expiring?" },
              { icon: <PieChart className="h-4 w-4" />, text: "Which categories drive most spending?" },
              { icon: <Users className="h-4 w-4" />, text: "Which vendors require management review?" },
            ]}
          />
        </section>

        {/* ACTIONS */}
        <section className="rounded-2xl border border-border bg-gradient-to-br from-card to-accent/5 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Continue your analysis</h3>
              <p className="text-sm text-muted-foreground">Jump into the live report, inspect the underlying dataset, or ask the Copilot about any insight.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={POWER_BI_OPEN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm transition hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" />
                Open Power BI Dashboard
              </a>
              <Link
                to="/datasets"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted"
              >
                <FileSpreadsheet className="h-4 w-4" />
                View Dataset
              </Link>
              <Link
                to="/ai-analyst"
                className="inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/20 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-accent/30"
              >
                <MessageSquare className="h-4 w-4" />
                Ask AI About Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function MetaTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

function InfoCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground/70" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BigCard({
  icon, title, subtitle, rows,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  rows: { icon: React.ReactNode; text: string }[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <ul className="mt-5 divide-y divide-border/70">
        {rows.map((r, i) => (
          <li key={i} className="flex items-center gap-3 py-2.5 text-sm text-foreground/85">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
              {r.icon}
            </span>
            {r.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
