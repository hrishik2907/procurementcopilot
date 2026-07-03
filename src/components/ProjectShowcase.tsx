import { useState } from "react";
import {
  Database,
  Cpu,
  BarChart3,
  Calculator,
  LayoutDashboard,
  Brain,
  Lightbulb,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Filter,
  GitBranch,
  ShieldAlert,
  FileBarChart2,
  Sparkles,
  Github,
  ExternalLink,
  Download,
  Mail,
  X,
  Layers,
  Workflow,
  Zap,
} from "lucide-react";

const WALKTHROUGH = [
  {
    n: "01",
    title: "Executive Overview Dashboard",
    desc: "A high-level executive dashboard built in Power BI providing procurement KPIs including Total Spend, Invoice Value, Payments, Vendor Count, Purchase Orders, Monthly Trends, Top Vendors and Spend Categories.",
    tech: ["SQL", "PySpark", "Power BI", "DAX"],
    value: "Provides executives with an instant overview of procurement performance and spending trends.",
    image: "/dashboard-executive.jpg",
  },
  {
    n: "02",
    title: "Procurement Analytics Dashboard",
    desc: "An advanced analytics workspace featuring supplier risk analysis, contract tracking, budget utilization, vendor scorecards, department spending, and procurement insights with interactive filtering.",
    tech: ["SQL", "PySpark", "Power BI", "Power Query"],
    value: "Helps procurement managers identify supplier risks, monitor contracts and optimize procurement decisions.",
    image: "/dashboard-analytics.jpg",
  },
  {
    n: "03",
    title: "AI Procurement Copilot",
    desc: "A conversational AI interface designed to answer procurement questions, explain spending anomalies, identify vendor risks and recommend business actions.",
    tech: ["OpenAI API", "Prompt Engineering", "React", "TypeScript"],
    value: "Transforms traditional dashboards into an intelligent decision-support system.",
    image: "/screenshot-ai-copilot.jpg",
  },
  {
    n: "04",
    title: "Supply Chain Risk Monitor",
    desc: "A live risk management workspace highlighting supplier disruptions, logistics delays, operational risks and AI-generated mitigation recommendations.",
    tech: ["Power BI", "React", "AI Decision Support"],
    value: "Enables proactive risk identification before operational disruptions occur.",
    image: "/screenshot-risk-monitor.jpg",
  },
  {
    n: "05",
    title: "Executive Summary Generator",
    desc: "An AI-generated executive memorandum summarizing procurement performance, root-cause analysis, business impact and recommended actions for leadership teams.",
    tech: ["OpenAI", "Markdown Rendering", "React"],
    value: "Automates executive reporting and reduces manual reporting effort.",
    image: "/screenshot-executive-summary.jpg",
  },
];

const ARCH = [
  { icon: Database, label: "SQL Database" },
  { icon: Cpu, label: "PySpark Data Cleaning" },
  { icon: Layers, label: "Power BI Data Model" },
  { icon: Calculator, label: "DAX Measures" },
  { icon: LayoutDashboard, label: "Power BI Dashboard" },
  { icon: Brain, label: "AI Copilot" },
  { icon: Lightbulb, label: "Executive Decision Support" },
];

const FEATURES = [
  { icon: Database, label: "SQL Data Cleaning" },
  { icon: Cpu, label: "PySpark ETL Pipeline" },
  { icon: LayoutDashboard, label: "Power BI Dashboard" },
  { icon: Calculator, label: "DAX KPIs" },
  { icon: Filter, label: "Interactive Filters" },
  { icon: GitBranch, label: "Cross Filtering" },
  { icon: Sparkles, label: "AI Procurement Assistant" },
  { icon: ShieldAlert, label: "Risk Monitoring" },
  { icon: FileBarChart2, label: "Executive Reporting" },
  { icon: Lightbulb, label: "Business Decision Support" },
];

export function ProjectShowcase() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {/* PROJECT WALKTHROUGH */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Project Walkthrough
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              An end-to-end enterprise analytics platform
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Five integrated products spanning data engineering, dashboarding and AI-powered decision support.
            </p>
          </div>

          <div className="relative mt-14">
            {/* vertical timeline line */}
            <div className="absolute left-4 top-2 hidden h-full w-px bg-gradient-to-b from-accent via-border to-transparent lg:block" />

            <div className="space-y-12">
              {WALKTHROUGH.map((w, i) => (
                <div key={w.n} className="relative lg:pl-16">
                  {/* dot */}
                  <div className="absolute left-0 top-6 hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-soft lg:flex">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  </div>

                  <div className={`grid gap-8 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated lg:grid-cols-5 lg:p-8 ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                    {/* image */}
                    <div className="lg:col-span-3">
                      <button
                        onClick={() => setLightbox(w.image)}
                        className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface"
                      >
                        <img
                          src={w.image}
                          alt={w.title}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1 text-[11px] font-semibold shadow-soft opacity-0 transition group-hover:opacity-100">
                          <ExternalLink className="h-3 w-3" /> View full-size
                        </span>
                      </button>
                    </div>

                    {/* content */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">{w.n}</span>
                        Module
                      </div>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{w.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>

                      <div className="mt-5">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Technologies</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {w.tech.map((t) => (
                            <span key={t} className="rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl border border-border bg-surface p-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          <Zap className="h-3 w-3 text-accent" /> Business Value
                        </div>
                        <p className="mt-1 text-sm leading-relaxed">{w.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL ARCHITECTURE */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Technical Architecture
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              From raw data to executive decisions
            </h2>
          </div>

          <div className="mt-12 flex flex-wrap items-stretch justify-center gap-3 lg:flex-nowrap">
            {ARCH.map((a, i) => (
              <div key={a.label} className="flex flex-col items-center gap-3 lg:flex-row">
                <div className="group flex w-40 flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface ring-1 ring-border transition group-hover:bg-accent/20">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-semibold leading-tight">{a.label}</div>
                </div>
                {i < ARCH.length - 1 && (
                  <>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 animate-pulse text-accent lg:block" />
                    <ArrowDown className="h-4 w-4 shrink-0 animate-pulse text-accent lg:hidden" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Key Features</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Enterprise-grade capabilities</h2>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface ring-1 ring-border transition group-hover:bg-accent/20">
                  <f.icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold leading-tight">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Project Gallery</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Screens from the platform</h2>
            </div>
            <div className="hidden text-xs text-muted-foreground sm:block">Click any image for full-screen</div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WALKTHROUGH.map((w) => (
              <button
                key={w.image}
                onClick={() => setLightbox(w.image)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-foreground/90 to-transparent p-4 text-left transition group-hover:translate-y-0">
                  <div className="text-sm font-semibold text-background">{w.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT LINKS */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Project Links</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Explore the complete project</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Dive deeper into the code, documentation and live demo, or reach out to discuss the work.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-soft transition hover:opacity-90"
            >
              <Github className="h-4 w-4" /> View GitHub Repository
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-95"
            >
              <ExternalLink className="h-4 w-4" /> View Live Portfolio
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-surface"
            >
              <Download className="h-4 w-4" /> Download Documentation
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-surface"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Enterprise-grade architecture</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Production-ready UI</div>
            <div className="flex items-center gap-1.5"><Workflow className="h-3.5 w-3.5 text-accent" /> End-to-end data pipeline</div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-md animate-fade-in"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-elevated hover:bg-surface"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="Preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[95vw] rounded-2xl border border-border object-contain shadow-elevated animate-scale-in"
          />
        </div>
      )}
    </>
  );
}
