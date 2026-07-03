import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3, Database, Table2, Calendar, ExternalLink, Sparkles,
  CheckCircle2, LayoutDashboard, Cpu, TrendingUp, Layers, Filter,
  MousePointerClick, Brain, FileSpreadsheet, PieChart, ShieldAlert,
  Wallet, FileText, Users, MessageSquare, ArrowDown, Code, GitBranch,
  BookOpen, Download, Eye, Play, Rocket, Github, FolderOpen, HelpCircle,
  ChevronRight, Briefcase, Server, FileBarChart2, ArrowRight,
  Zap, Target, ShieldCheck, Lock, Fingerprint, Globe,
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

const POWER_BI_OPEN_URL = "#";

function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px] px-6 py-8 space-y-10">
        {/* SECTION 1 — Header */}
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
              This enterprise analytics solution was built using <span className="font-medium text-foreground">SQL, PySpark, Power BI</span> and <span className="font-medium text-foreground">DAX</span> to provide procurement executives with actionable insights into supplier performance, procurement spending, contracts, budgets and business risks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-[420px]">
            <MetaTile icon={<Calendar className="h-4 w-4" />} label="Last Refresh" value="Today, 09:42" />
            <MetaTile icon={<Database className="h-4 w-4" />} label="Dataset Size" value="5,248+ rows" />
            <MetaTile icon={<Table2 className="h-4 w-4" />} label="Tables" value="12 connected" />
            <div className="rounded-xl border border-accent/40 bg-accent/15 p-3 flex items-center justify-center">
              <span className="text-sm font-semibold tracking-wide text-foreground">FY2024 – FY2026</span>
            </div>
          </div>
        </header>

        {/* SECTION 2 — Dashboard Preview Cards */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DashboardPreviewCard
            title="Executive Overview"
            description="Executive dashboard providing procurement KPIs including Total Spend, Vendor Analysis, Category Spend, Invoice Analysis and Monthly Procurement Trends."
            imageSrc="/dashboard-executive.jpg"
            buttonText="Launch Dashboard Preview"
            buttonIcon={<Play className="h-4 w-4" />}
          />
          <DashboardPreviewCard
            title="Procurement Analytics"
            description="Advanced procurement analytics including Supplier Risk, Budget Utilization, Contract Performance, Vendor Intelligence and Procurement Recommendations."
            imageSrc="/dashboard-analytics.jpg"
            buttonText="View Analytics Page"
            buttonIcon={<Eye className="h-4 w-4" />}
          />
        </section>

        {/* SECTION 3 — Project Architecture */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Project Architecture</h2>
            <p className="mt-1 text-sm text-muted-foreground">End-to-end data pipeline from raw ingestion to executive insight.</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
              {ARCHITECTURE.map((step, i) => (
                <div key={step.label} className="flex w-full items-center gap-4 lg:w-auto lg:flex-col lg:gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground ring-1 ring-accent/30">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 lg:text-center">
                    <div className="text-sm font-semibold">{step.label}</div>
                    <div className="text-xs text-muted-foreground">{step.sub}</div>
                  </div>
                  {i < ARCHITECTURE.length - 1 && (
                    <div className="hidden items-center lg:flex">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  {i < ARCHITECTURE.length - 1 && (
                    <div className="flex items-center lg:hidden">
                      <ArrowDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — Technology Stack */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Technology Stack</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enterprise-grade tools powering the analytics platform.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground ring-1 ring-accent/20">
                    <tech.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{tech.name}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tech.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 — Project Deliverables */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Project Deliverables</h2>
            <p className="mt-1 text-sm text-muted-foreground">Comprehensive artifacts delivered for this procurement analytics solution.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((d) => (
              <div
                key={d.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-foreground ring-1 ring-border">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-sm font-semibold">{d.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6 — Business Questions Solved */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Business Questions Solved</h2>
            <p className="mt-1 text-sm text-muted-foreground">Key decisions supported by the analytics platform.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUESTIONS.map((q) => (
              <div
                key={q.text}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
                  <HelpCircle className="h-4.5 w-4.5" />
                </div>
                <p className="text-sm font-medium leading-snug text-foreground/90">{q.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7 — Call To Action */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground ring-1 ring-accent/30">
              <Rocket className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Explore the Complete Project</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Dive into the interactive dashboard, review the source code, download the dataset or read the full project documentation.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={POWER_BI_OPEN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-95"
              >
                <Rocket className="h-4 w-4" />
                Launch Interactive Dashboard
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface"
              >
                <Github className="h-4 w-4" />
                Explore GitHub Repository
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface"
              >
                <Download className="h-4 w-4" />
                Download Dataset
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface"
              >
                <BookOpen className="h-4 w-4" />
                View Project Documentation
              </a>
            </div>
          </div>
        </section>

        {/* Original bottom actions preserved */}
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

function DashboardPreviewCard({
  title,
  description,
  imageSrc,
  buttonText,
  buttonIcon,
}: {
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:shadow-elevated">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-muted/40 via-background to-accent/5">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{description}</p>
        <button className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-accent/10 hover:text-accent-foreground">
          {buttonIcon}
          {buttonText}
        </button>
      </div>
    </div>
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

const ARCHITECTURE = [
  { icon: FileText, label: "CSV Dataset", sub: "Raw procurement data" },
  { icon: Code, label: "SQL Data Cleaning", sub: "Validation & normalization" },
  { icon: Zap, label: "PySpark Transformation", sub: "Distributed ETL pipeline" },
  { icon: Database, label: "Power BI Data Model", sub: "Star schema & relationships" },
  { icon: Cpu, label: "DAX Measures", sub: "KPIs & calculated columns" },
  { icon: LayoutDashboard, label: "Executive Dashboard", sub: "Visual analytics layer" },
  { icon: Brain, label: "Business Insights", sub: "Actionable intelligence" },
];

const TECH_STACK = [
  { icon: Server, name: "SQL Server", desc: "Relational database engine for data storage, cleansing and structured query operations across 12 normalized procurement tables." },
  { icon: Zap, name: "PySpark", desc: "Distributed data processing framework used for large-scale ETL transformations and feature engineering on the procurement dataset." },
  { icon: BarChart3, name: "Power BI", desc: "Enterprise business intelligence platform for interactive dashboards, cross-filtering and executive reporting." },
  { icon: GitBranch, name: "Power Query", desc: "Data transformation and mashup engine used to shape, clean and integrate multi-source procurement data." },
  { icon: Cpu, name: "DAX", desc: "Data Analysis Expressions powering all KPI calculations, time intelligence and advanced business logic measures." },
  { icon: Github, name: "GitHub", desc: "Source control and project management repository containing SQL scripts, notebooks and full documentation." },
];

const DELIVERABLES = [
  { icon: BarChart3, title: "Power BI Dashboard", desc: "Interactive Executive Overview and Procurement Analytics pages with cross-filtering and drill-through." },
  { icon: Database, title: "Dataset", desc: "5,248+ row curated procurement dataset covering invoices, POs, contracts, vendors, risk and budgets." },
  { icon: Code, title: "SQL Scripts", desc: "Data cleansing, validation and transformation queries used to prepare the source data for analytics." },
  { icon: Zap, title: "PySpark Notebook", desc: "Distributed ETL notebook for large-scale data processing and feature engineering." },
  { icon: BookOpen, title: "Business Documentation", desc: "Requirements, design decisions and user guide for procurement stakeholders and executive consumers." },
  { icon: Layers, title: "Data Model", desc: "Star schema documentation with entity relationships, primary keys and measure definitions." },
];

const QUESTIONS = [
  { text: "Which vendors contribute the highest procurement spend?" },
  { text: "Which suppliers have the highest risk?" },
  { text: "Which departments exceed allocated budgets?" },
  { text: "Which contracts require renewal?" },
  { text: "Which procurement categories generate the highest spend?" },
  { text: "Which vendors should management review?" },
];
