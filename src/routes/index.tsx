import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, LayoutDashboard, ArrowRight, Github, CheckCircle2,
  Eye, ShieldAlert, FileBarChart2, Workflow, Database, Cpu,
  Braces, BarChart3, Brain, FileSpreadsheet, Boxes, ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { WelcomeModal } from "@/components/WelcomeModal";
import { Footer } from "@/components/Footer";
import { OWNER, KPI } from "@/lib/constants";

const GITHUB_URL = OWNER.github;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Procurement Copilot — Enterprise Procurement Analytics" },
      {
        name: "description",
        content:
          "Enterprise procurement analytics platform built with SQL, PySpark, Power BI and AI — turn procurement data into decisions.",
      },
    ],
  }),
  component: Home,
});

const TECH = ["SQL", "PySpark", "Power BI", "Power Query", "DAX", "React", "TypeScript", "AI"];

const PROBLEMS = [
  { i: Eye, t: "Procurement Spend Visibility", d: "Monitor enterprise procurement spend across vendors, departments and categories in a single semantic model." },
  { i: ShieldAlert, t: "Supplier Risk Intelligence", d: "Identify high-risk suppliers before operational disruption using concentration, delivery and contract signals." },
  { i: FileBarChart2, t: "Executive Decision Support", d: "Generate board-ready insights and executive reports powered by Jarvis AI grounded in your dataset." },
  { i: Workflow, t: "End-to-End Analytics Pipeline", d: "Transform raw procurement data into executive decisions using SQL, PySpark, Power BI and AI." },
];

const STACK = [
  { k: "SQL", role: "Data Cleaning" },
  { k: "PySpark", role: "ETL Pipeline" },
  { k: "Power Query", role: "Shaping" },
  { k: "Power BI", role: "Visualization" },
  { k: "DAX", role: "Business Logic" },
  { k: "React", role: "Frontend" },
  { k: "TypeScript", role: "Type Safety" },
  { k: "AI", role: "Decision Support" },
];

const ARCH = [
  { i: Database, t: "Raw Procurement Dataset", d: "Vendors, POs, invoices, contracts" },
  { i: Braces, t: "SQL Cleaning", d: "Normalization & joins" },
  { i: Cpu, t: "PySpark ETL", d: "Distributed transformation" },
  { i: FileSpreadsheet, t: "Power Query", d: "Column shaping & typing" },
  { i: Boxes, t: "Power BI Semantic Model", d: "Star schema, relationships" },
  { i: BarChart3, t: "DAX Measures", d: "Time-intel, savings, risk" },
  { i: LayoutDashboard, t: "React Frontend", d: "This portfolio app" },
  { i: Brain, t: "Jarvis AI", d: "Natural-language analyst" },
];

const WALK = [
  { n: "1", t: "Import Procurement Dataset", to: "/datasets", d: "Explore 5,248 transactions across 12 connected tables." },
  { n: "2", t: "SQL Data Cleaning", to: "/datasets", d: "Cleaned, normalized and joined into an analytics-ready schema." },
  { n: "3", t: "PySpark ETL Pipeline", to: "/workspace", d: "Distributed transformations across the P2P process." },
  { n: "4", t: "Power BI Dashboard", to: "/dashboard", d: "Executive dashboards with DAX time-intelligence measures." },
  { n: "5", t: "AI Insights with Jarvis", to: "/ai-analyst", d: "Ask business questions in plain English — grounded in the dataset." },
  { n: "6", t: "Executive Reports", to: "/reports", d: "Board-ready summaries with savings, risk and utilization." },
] as const;

function Home() {
  return (
    <AppShell>
      <WelcomeModal />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-accent" />
            Enterprise Procurement Analytics Platform
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Procurement{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Copilot</span>
              <span className="absolute inset-x-0 bottom-2 -z-0 h-3 bg-accent/50" />
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            An enterprise-grade analytics workspace that turns raw procurement data into board-ready
            decisions — combining Power BI dashboards, SQL &amp; PySpark pipelines, and Jarvis, an AI
            analyst that explains what happened and what to do next.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/dashboard" className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-95">
              <LayoutDashboard className="h-4 w-4" />
              View Interactive Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-surface">
              <Github className="h-4 w-4" /> View Source Code
            </a>
            <Link to="/ai-analyst" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-soft transition hover:opacity-90">
              <Sparkles className="h-4 w-4" /> Meet Jarvis
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {TECH.map((t) => (
              <span key={t} className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground backdrop-blur">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Built on real procurement schema</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> {KPI.records.toLocaleString("en-IN")} records · {KPI.tables} tables</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> AI-powered decision support</div>
          </div>
        </div>
      </section>

      {/* Business Problems Solved */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Business Problems Solved" title="Built to answer real enterprise procurement questions" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p) => (
            <div key={p.t} className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground ring-1 ring-accent/30">
                <p.i className="h-5 w-5" />
              </div>
              <div className="mt-4 text-sm font-semibold tracking-tight">{p.t}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Technology Stack" title="A full modern analytics stack, end to end" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {STACK.map((s) => (
            <div key={s.k} className="rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
              <div className="text-sm font-semibold tracking-tight">{s.k}</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{s.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Project Architecture" title="Raw dataset → Enterprise decisions" />
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ARCH.map((a, i) => (
              <div key={a.t} className="relative">
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-4 transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background ring-1 ring-border">
                      <a.i className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Stage {i + 1}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold">{a.t}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{a.d}</div>
                </div>
                {i < ARCH.length - 1 && (
                  <ChevronRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Project Walkthrough */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Live Project Walkthrough" title="Follow the complete analytics lifecycle" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WALK.map((w) => (
            <Link
              key={w.n}
              to={w.to}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-sm font-semibold text-background">
                {w.n}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {w.t}
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{w.d}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Project Highlights */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:shadow-elevated">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Project highlights</div>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">What this portfolio demonstrates</h2>
            </div>
            <div className="hidden text-right text-xs text-muted-foreground sm:block">
              {KPI.records.toLocaleString("en-IN")} records · {KPI.tables} tables · {KPI.fyRange}
            </div>
          </div>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {[
              "Cleaned procurement data using SQL",
              "Built ETL pipelines with PySpark",
              "Designed a Power BI data model",
              "Developed advanced DAX KPIs",
              "Created executive procurement dashboards",
              "Built the Jarvis AI procurement analyst",
              "Developed this React portfolio application",
              "Published complete source code on GitHub",
            ].map((h) => (
              <li key={h} className="flex items-start gap-2 rounded-xl border border-border bg-surface p-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </AppShell>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}
