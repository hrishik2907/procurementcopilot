import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3, Database, Table2, ExternalLink, FileSpreadsheet,
  MessageSquare, Github, Maximize2, CheckCircle2, Loader2, Sparkles,
  Upload, Play, X, ArrowRight, ShieldAlert, TrendingUp, Wallet,
  Users, PackageCheck, Gauge, Info, Download, Building2, FileText,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Footer } from "@/components/Footer";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";
import { OWNER } from "@/lib/constants";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Enterprise Analytics Workspace · Procurement Copilot" },
      { name: "description", content: "Simulated enterprise procurement analytics workspace with interactive KPIs, Power BI reports and Jarvis AI insights." },
    ],
  }),
  component: DashboardPage,
});

const GITHUB_URL = OWNER.github;

const STAGES = [
  "Reading Enterprise Dataset",
  "Validating Data Quality",
  "Running SQL Data Cleaning",
  "Executing PySpark ETL Pipeline",
  "Applying Power Query Transformations",
  "Building Power BI Semantic Model",
  "Calculating DAX Measures",
  "Generating Executive KPIs",
  "Preparing AI Insights",
];

const SCREENSHOTS: (LightboxImage & { title: string; description: string })[] = [
  { src: "/dashboard-executive.jpg", alt: "Executive Overview", title: "Executive Overview",
    description: "Total Spend, Vendor Analysis, Category Spend, Invoice Analysis and Monthly Procurement Trends." },
  { src: "/dashboard-analytics.jpg", alt: "Procurement Analytics", title: "Procurement Analytics",
    description: "Supplier Risk, Budget Utilization, Contract Performance, Vendor Intelligence and AI Recommendations." },
];

// Chart data
const CATEGORY = [
  { name: "IT & Software", value: 82.4 },
  { name: "Logistics", value: 61.2 },
  { name: "Raw Materials", value: 54.8 },
  { name: "Facilities", value: 42.1 },
  { name: "Consulting", value: 38.6 },
  { name: "Marketing", value: 29.4 },
  { name: "Travel", value: 22.1 },
  { name: "Utilities", value: 20.4 },
];
const MONTHLY = [
  { m: "Apr", spend: 22.1 }, { m: "May", spend: 24.6 }, { m: "Jun", spend: 27.3 },
  { m: "Jul", spend: 29.4 }, { m: "Aug", spend: 31.2 }, { m: "Sep", spend: 30.1 },
  { m: "Oct", spend: 33.8 }, { m: "Nov", spend: 35.4 }, { m: "Dec", spend: 37.9 },
  { m: "Jan", spend: 29.2 }, { m: "Feb", spend: 26.8 }, { m: "Mar", spend: 23.1 },
];
const RISK = [
  { name: "Low", value: 223, color: "#16a34a" },
  { name: "Medium", value: 63, color: "#eab308" },
  { name: "High", value: 14, color: "#dc2626" },
];
const DEPTS = [
  { name: "Operations", value: 78 },
  { name: "Engineering", value: 64 },
  { name: "Supply Chain", value: 58 },
  { name: "Finance", value: 41 },
  { name: "HR", value: 22 },
  { name: "Marketing", value: 19 },
];
const BUDGET = [
  { name: "Ops", budget: 82, actual: 78 },
  { name: "Eng", budget: 70, actual: 64 },
  { name: "SCM", budget: 60, actual: 58 },
  { name: "Fin", budget: 42, actual: 41 },
  { name: "HR", budget: 24, actual: 22 },
  { name: "Mkt", budget: 20, actual: 19 },
];
const VENDORS = [
  { name: "Infosys Ltd", spend: 28.4 },
  { name: "Tata Steel", spend: 24.1 },
  { name: "Mahindra Logistics", spend: 19.8 },
  { name: "Reliance Digital", spend: 17.2 },
  { name: "Wipro Infra", spend: 14.6 },
];
const CONTRACTS = [
  { label: "Active", value: 184, tone: "ok" as const },
  { label: "Expiring < 60d", value: 22, tone: "warn" as const },
  { label: "Under Review", value: 11, tone: "warn" as const },
  { label: "Expired", value: 6, tone: "risk" as const },
];
const ACTIVITY = [
  { t: "PO-2841 approved", who: "Ops · Mahindra Logistics", amt: "₹ 42.8 L", tag: "PO" },
  { t: "Invoice INV-9182 matched", who: "Finance · Infosys Ltd", amt: "₹ 1.24 Cr", tag: "Invoice" },
  { t: "Contract C-118 renewed", who: "SCM · Tata Steel", amt: "₹ 8.4 Cr", tag: "Contract" },
  { t: "Risk flagged on vendor V-77", who: "Risk · Sundry Traders", amt: "—", tag: "Risk" },
  { t: "Payment PMT-5522 released", who: "Finance · Wipro Infra", amt: "₹ 92.6 L", tag: "Payment" },
];

const CHART_COLORS = ["#0f172a", "#f4c430", "#334155", "#64748b", "#94a3b8"];

function DashboardPage() {
  const [phase, setPhase] = useState<"landing" | "processing" | "ready">("landing");
  const [stage, setStage] = useState(0);
  const [uploadNotice, setUploadNotice] = useState(false);
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const [previewImg, setPreviewImg] = useState<number | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const images: LightboxImage[] = SCREENSHOTS.map((s) => ({ src: s.src, alt: s.alt }));

  // processing animation
  useEffect(() => {
    if (phase !== "processing") return;
    setStage(0);
    const step = 6000 / STAGES.length;
    const id = setInterval(() => {
      setStage((s) => {
        if (s >= STAGES.length - 1) {
          clearInterval(id);
          setTimeout(() => {
            setPhase("ready");
            setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
          }, 600);
          return s + 1;
        }
        return s + 1;
      });
    }, step);
    return () => clearInterval(id);
  }, [phase]);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px] space-y-12 px-6 py-8">
        {/* HERO */}
        <header className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background via-surface to-accent/10 p-8 sm:p-12">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-foreground">
                  <Sparkles className="h-3 w-3" /> Demo Platform
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                  <BarChart3 className="h-3 w-3" /> Analytics Workspace
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Enterprise Analytics Workspace
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                Experience how Procurement Copilot transforms enterprise procurement data into executive
                dashboards and AI-powered business insights.
              </p>
              <div className="mt-5 rounded-2xl border border-border bg-card/60 p-4 text-sm text-muted-foreground backdrop-blur">
                <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-foreground/70">
                  Demo Environment
                </div>
                This portfolio simulates an enterprise procurement analytics platform. A sample procurement
                dataset has already been connected for demonstration purposes. The analytics generation
                shown below is a simulated workflow designed to demonstrate how enterprise analytics
                platforms process data.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:min-w-[360px]">
              <MetaTile icon={<Database className="h-4 w-4" />} label="Dataset" value="Connected" />
              <MetaTile icon={<Table2 className="h-4 w-4" />} label="Tables" value="12 linked" />
              <MetaTile icon={<Gauge className="h-4 w-4" />} label="Records" value="5,248" />
              <MetaTile icon={<BarChart3 className="h-4 w-4" />} label="Period" value="FY24–FY26" />
            </div>
          </div>
        </header>

        {/* DATASET CARD */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-foreground/5 p-2"><Building2 className="h-4 w-4" /></div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Enterprise Procurement Dataset</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                A sample enterprise procurement dataset is already connected to demonstrate the analytics workflow.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Dataset Connected
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[520px]">
              <StatMini label="Records" value="5,248" />
              <StatMini label="Tables" value="12" />
              <StatMini label="Suppliers" value="300" />
              <StatMini label="POs" value="1,209" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold text-muted-foreground">
            {["Invoices", "Contracts", "Payments", "Supplier Risk", "Budgets", "Purchase Orders", "Vendors", "GL Codes"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-surface px-3 py-1">{t}</span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setPhase("processing")}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-sm transition hover:opacity-90"
            >
              <Play className="h-4 w-4" /> Generate Analytics
            </button>
            <Link to="/datasets" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-muted">
              <FileSpreadsheet className="h-4 w-4" /> View Dataset
            </Link>
            <button
              onClick={() => setUploadNotice(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
            >
              <Upload className="h-4 w-4" /> Upload New Dataset (Demo)
            </button>
          </div>
        </section>

        {/* RESULTS */}
        <div ref={resultsRef} />
        {phase === "ready" && (
          <>
            {/* JARVIS SUMMARY */}
            <section className="animate-fade-in rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-card to-card p-6 shadow-soft sm:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-foreground p-3 text-background">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Jarvis AI · Executive Summary</div>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">Hello {OWNER.name.split(" ")[0]}.</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I've analysed the demonstration procurement dataset.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <JarvisStat label="Records analysed" value="5,248" />
                    <JarvisStat label="Business tables" value="12" />
                    <JarvisStat label="Procurement health" value="78 / 100" tone="ok" />
                    <JarvisStat label="Savings opportunity" value="₹ 18.4 Cr" tone="accent" />
                  </div>
                  <ul className="mt-5 space-y-2 text-sm">
                    <InsightRow icon={<TrendingUp className="h-4 w-4 text-emerald-600" />}>Procurement spend increased 12% YoY, driven by IT & Logistics categories.</InsightRow>
                    <InsightRow icon={<ShieldAlert className="h-4 w-4 text-red-600" />}>Three suppliers require immediate attention due to concentration and payment risk.</InsightRow>
                    <InsightRow icon={<Wallet className="h-4 w-4 text-foreground" />}>Estimated ₹ 18.4 Cr in savings via vendor consolidation and contract renegotiation.</InsightRow>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link to="/ai-analyst" className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition hover:opacity-90">
                      <MessageSquare className="h-3.5 w-3.5" /> Explain Insights
                    </Link>
                    <Link to="/reports" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold transition hover:bg-muted">
                      <FileText className="h-3.5 w-3.5" /> Generate Executive Report
                    </Link>
                    <Link to="/risk" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold transition hover:bg-muted">
                      <ShieldAlert className="h-3.5 w-3.5" /> Open Risk Center
                    </Link>
                  </div>
                  <p className="mt-4 text-[11px] italic text-muted-foreground">
                    Jarvis responses are based on the demonstration dataset included in this portfolio.
                  </p>
                </div>
              </div>
            </section>

            {/* KPI ROW */}
            <section className="animate-fade-in">
              <SectionHeading eyebrow="Interactive Analytics Dashboard" title="Executive KPIs" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                <KpiCard icon={<Wallet className="h-4 w-4" />} label="Total Spend" value={351.05} suffix=" Cr" prefix="₹ " />
                <KpiCard icon={<Users className="h-4 w-4" />} label="Suppliers" value={300} />
                <KpiCard icon={<PackageCheck className="h-4 w-4" />} label="Purchase Orders" value={1209} />
                <KpiCard icon={<ShieldAlert className="h-4 w-4" />} label="Procurement Risk" value={72} suffix=" / 100" tone="warn" />
                <KpiCard icon={<Gauge className="h-4 w-4" />} label="Budget Utilization" value={92} suffix="%" tone="ok" />
                <KpiCard icon={<TrendingUp className="h-4 w-4" />} label="Savings Opportunity" value={18.4} suffix=" Cr" prefix="₹ " tone="accent" />
              </div>
            </section>

            {/* CHARTS */}
            <section className="animate-fade-in grid gap-5 lg:grid-cols-2">
              <ChartCard title="Spend by Category" subtitle="₹ Cr">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={CATEGORY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={tooltipStyle} />
                    <Bar dataKey="value" fill="#f4c430" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Monthly Spend Trend" subtitle="FY24–FY26 · ₹ Cr">
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={MONTHLY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sp" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0f172a" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                    <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="spend" stroke="#0f172a" strokeWidth={2} fill="url(#sp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Supplier Risk Distribution" subtitle="300 suppliers scored">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={RISK} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                      {RISK.map((r) => <Cell key={r.name} fill={r.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 flex justify-center gap-4 text-xs">
                  {RISK.map((r) => (
                    <div key={r.name} className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                      <span className="font-medium">{r.name}</span>
                      <span className="text-muted-foreground">({r.value})</span>
                    </div>
                  ))}
                </div>
              </ChartCard>

              <ChartCard title="Department Spend" subtitle="₹ Cr">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={DEPTS} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="value" fill="#0f172a" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Budget vs Actual" subtitle="₹ Cr per department">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={BUDGET} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="budget" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="actual" fill="#f4c430" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Top Vendors" subtitle="Spend concentration (₹ Cr)">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={VENDORS} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={130} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="spend" fill="#f4c430" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Contract Status" subtitle="223 contracts tracked">
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {CONTRACTS.map((c) => (
                    <div key={c.label} className={`rounded-xl border p-4 ${
                      c.tone === "ok" ? "border-emerald-500/30 bg-emerald-500/5" :
                      c.tone === "warn" ? "border-amber-500/30 bg-amber-500/5" :
                      "border-red-500/30 bg-red-500/5"
                    }`}>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                      <div className="mt-1 text-2xl font-semibold tracking-tight">{c.value}</div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              <ChartCard title="Recent Procurement Activity" subtitle="Live feed (demo)">
                <ul className="divide-y divide-border">
                  {ACTIVITY.map((a, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 py-3 text-sm">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{a.tag}</span>
                        <div>
                          <div className="font-medium">{a.t}</div>
                          <div className="text-xs text-muted-foreground">{a.who}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold tabular-nums">{a.amt}</div>
                    </li>
                  ))}
                </ul>
              </ChartCard>
            </section>

            {/* POWER BI REPORTS */}
            <section className="animate-fade-in">
              <SectionHeading eyebrow="Advanced Power BI Reports" title="Personally designed & developed" />
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                The dashboards below were personally designed and developed by me to demonstrate enterprise
                procurement reporting and analytics. These reports are showcased using the demonstration
                dataset included in this portfolio.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {SCREENSHOTS.map((s, i) => (
                  <div key={s.src} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elevated">
                    <button type="button" onClick={() => setPreviewImg(i)} className="relative block aspect-[16/10] w-full overflow-hidden bg-muted/40 text-left">
                      <img src={s.src} alt={s.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                      <div className="absolute right-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">Preview</div>
                    </button>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div>
                        <h3 className="text-base font-semibold">{s.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button onClick={() => setPreviewImg(i)} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold transition hover:bg-muted">
                          <Maximize2 className="h-3.5 w-3.5" /> Preview
                        </button>
                        <button onClick={() => setLbIndex(i)} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background transition hover:opacity-90">
                          <ExternalLink className="h-3.5 w-3.5" /> Open Dashboard
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* BUSINESS QUESTIONS */}
            <section className="animate-fade-in">
              <SectionHeading eyebrow="Business Questions" title="Questions Procurement Copilot can answer" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Where is procurement spend increasing?",
                  "Which suppliers require immediate attention?",
                  "Which departments exceeded budget?",
                  "Where are the biggest savings opportunities?",
                  "Which contracts expire soon?",
                  "How healthy is procurement?",
                ].map((q) => (
                  <div key={q} className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-elevated">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-accent/20 p-2 text-foreground"><Sparkles className="h-4 w-4" /></div>
                      <div className="text-sm font-medium">{q}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ENGINEERING PIPELINE */}
            <section className="animate-fade-in">
              <SectionHeading eyebrow="Engineering Pipeline" title="How enterprise analytics flow through Procurement Copilot" />
              <div className="mt-6 rounded-3xl border border-border bg-gradient-to-br from-surface via-card to-accent/5 p-6 sm:p-8">
                <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
                  {[
                    "Enterprise Dataset", "SQL Cleaning", "PySpark ETL", "Power Query",
                    "Power BI Semantic Model", "DAX Measures", "React Enterprise Dashboard",
                    "Jarvis AI", "Business Decisions",
                  ].map((stage, i, arr) => (
                    <div key={stage} className="relative">
                      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-elevated">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Stage {i + 1}</div>
                        <div className="mt-1 text-sm font-semibold">{stage}</div>
                      </div>
                      {i < arr.length - 1 && (
                        <ArrowRight className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-muted-foreground/50 lg:block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* SOURCE CODE */}
        <section className="rounded-3xl border border-border bg-gradient-to-br from-card to-accent/5 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Explore the Project</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Interested in how Procurement Copilot was built?
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm transition hover:opacity-90">
                <Github className="h-4 w-4" /> View GitHub Repository
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-muted">
                <Download className="h-4 w-4" /> Download Power BI File
              </a>
              <Link to="/datasets" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-muted">
                <FileSpreadsheet className="h-4 w-4" /> View Dataset
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* MODALS */}
      {phase === "processing" && <ProcessingModal stage={stage} />}
      {uploadNotice && <UploadNoticeModal onClose={() => setUploadNotice(false)} />}
      {previewImg !== null && (
        <PreviewModal image={SCREENSHOTS[previewImg]} onClose={() => setPreviewImg(null)} onOpen={() => { setLbIndex(previewImg); setPreviewImg(null); }} />
      )}
      {lbIndex !== null && (
        <Lightbox images={images} index={lbIndex} onClose={() => setLbIndex(null)} onIndexChange={setLbIndex} />
      )}
    </AppShell>
  );
}

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

/* ---------- Components ---------- */

function MetaTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">{icon}{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 text-center">
      <div className="text-lg font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</div>
      <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
    </div>
  );
}

function useCountUp(target: number, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function KpiCard({
  icon, label, value, prefix = "", suffix = "", tone,
}: {
  icon: React.ReactNode; label: string; value: number; prefix?: string; suffix?: string;
  tone?: "ok" | "warn" | "accent";
}) {
  const v = useCountUp(value);
  const decimals = value % 1 !== 0 ? 2 : 0;
  const ring =
    tone === "ok" ? "ring-1 ring-emerald-500/30 bg-emerald-500/5" :
    tone === "warn" ? "ring-1 ring-amber-500/40 bg-amber-500/5" :
    tone === "accent" ? "ring-1 ring-accent/60 bg-accent/10" :
    "ring-1 ring-border";
  return (
    <div className={`rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated ${ring}`}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="rounded-md bg-foreground/5 p-1.5 text-foreground/70">{icon}</div>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
        {prefix}{v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:shadow-elevated">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        {subtitle && <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function JarvisStat({ label, value, tone }: { label: string; value: string; tone?: "ok" | "accent" }) {
  const cls =
    tone === "ok" ? "border-emerald-500/30 bg-emerald-500/5" :
    tone === "accent" ? "border-accent/50 bg-accent/10" :
    "border-border bg-surface";
  return (
    <div className={`rounded-xl border p-3 ${cls}`}>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function InsightRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-border bg-card/70 p-3">
      <span className="mt-0.5">{icon}</span>
      <span className="text-sm">{children}</span>
    </li>
  );
}

/* ---------- Modals ---------- */

function ProcessingModal({ stage }: { stage: number }) {
  const pct = Math.min(100, Math.round(((stage + 1) / STAGES.length) * 100));
  const done = stage >= STAGES.length;
  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl animate-scale-in rounded-3xl border border-border bg-card p-6 shadow-elevated sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-foreground p-2.5 text-background">
            {done ? <CheckCircle2 className="h-5 w-5" /> : <Loader2 className="h-5 w-5 animate-spin" />}
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Analytics Pipeline</div>
            <h3 className="text-lg font-semibold tracking-tight">
              {done ? "Analytics Generated Successfully" : "Generating Enterprise Analytics"}
            </h3>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-foreground to-accent transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-1 text-right text-[11px] font-semibold tabular-nums text-muted-foreground">{pct}%</div>
        </div>

        <ul className="mt-4 max-h-[42vh] space-y-1.5 overflow-y-auto pr-1">
          {STAGES.map((s, i) => {
            const state = i < stage ? "done" : i === stage ? "active" : "pending";
            return (
              <li key={s} className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition ${
                state === "done" ? "border-emerald-500/20 bg-emerald-500/5" :
                state === "active" ? "border-accent/40 bg-accent/10" :
                "border-border bg-surface/50"
              }`}>
                {state === "done" ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> :
                 state === "active" ? <Loader2 className="h-4 w-4 animate-spin text-foreground" /> :
                 <span className="h-4 w-4 rounded-full border border-border" />}
                <span className={state === "pending" ? "text-muted-foreground" : "font-medium"}>{s}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex items-start gap-2 rounded-xl border border-border bg-surface p-3 text-[12px] text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>This workflow is simulated for portfolio demonstration purposes and showcases the typical stages involved in an enterprise analytics pipeline.</span>
        </div>
      </div>
    </div>
  );
}

function UploadNoticeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md animate-scale-in rounded-2xl border border-border bg-card p-6 shadow-elevated">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-accent/20 p-2"><Upload className="h-4 w-4" /></div>
          <div>
            <h3 className="text-base font-semibold">Upload not available in demo</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Uploading custom datasets is currently disabled in this portfolio demonstration.
              The sample enterprise dataset is preloaded so recruiters can immediately experience the platform.
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewModal({ image, onClose, onOpen }: { image: LightboxImage & { title: string; description: string }; onClose: () => void; onOpen: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl animate-scale-in overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Power BI Report Preview</div>
            <h3 className="text-base font-semibold">{image.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onOpen} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90">
              <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
            </button>
            <button onClick={onClose} aria-label="Close" className="rounded-md p-1.5 hover:bg-muted"><X className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="max-h-[70vh] overflow-auto bg-black/5">
          <img src={image.src} alt={image.alt ?? image.title} className="w-full" />
        </div>
        <div className="border-t border-border px-5 py-3 text-sm text-muted-foreground">{image.description}</div>
      </div>
    </div>
  );
}
