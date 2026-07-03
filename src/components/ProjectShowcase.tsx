import { useEffect, useState } from "react";
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
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Workflow,
  Zap,
  Code2,
  Server,
  FileSpreadsheet,
  Wand2,
  Users,
  ShoppingCart,
  Receipt,
  ScrollText,
  Truck,
  Wallet,
  Building2,
  Briefcase,
  Rocket,
  BookOpen,
  Table2,
  Boxes,
  Maximize2,
} from "lucide-react";

type Card = {
  n: string;
  title: string;
  desc: string;
  tech: string[];
  value: string;
  image: string | null;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
};

const WALKTHROUGH: Card[] = [
  {
    n: "01",
    title: "Executive Overview Dashboard",
    desc: "Executive Power BI dashboard providing KPIs including procurement spend, invoices, vendors, purchase orders, monthly trends and category analysis.",
    tech: ["SQL", "PySpark", "Power BI", "DAX"],
    value: "Provides executives with a real-time overview of procurement performance.",
    image: "/dashboard-executive.jpg",
    accent: "from-accent/30 to-transparent",
    icon: LayoutDashboard,
  },
  {
    n: "02",
    title: "AI Procurement Analyst",
    desc: "Enterprise AI assistant capable of answering procurement questions, identifying anomalies and recommending business actions.",
    tech: ["React", "OpenAI", "Prompt Engineering"],
    value: "Transforms dashboards into an intelligent decision-support platform.",
    image: null,
    accent: "from-primary/25 to-transparent",
    icon: Brain,
  },
  {
    n: "03",
    title: "Procurement Workspace",
    desc: "End-to-end Procure-to-Pay workflow showing Vendor Master, Purchase Requisition, Purchase Order, Goods Receipt, Invoice and Payment processes.",
    tech: ["React", "Business Process Design"],
    value: "Helps users understand the complete procurement lifecycle.",
    image: null,
    accent: "from-success/25 to-transparent",
    icon: Workflow,
  },
  {
    n: "04",
    title: "Risk Center",
    desc: "AI-driven supplier and logistics risk monitoring with recommendations and mitigation actions.",
    tech: ["Power BI", "AI", "Analytics"],
    value: "Allows proactive procurement risk management.",
    image: null,
    accent: "from-destructive/25 to-transparent",
    icon: ShieldAlert,
  },
  {
    n: "05",
    title: "Executive Reports",
    desc: "AI-generated executive summaries and procurement memorandums designed for leadership reporting.",
    tech: ["OpenAI", "Markdown", "PDF Generation"],
    value: "Automates executive reporting.",
    image: null,
    accent: "from-warning/25 to-transparent",
    icon: FileBarChart2,
  },
  {
    n: "06",
    title: "Dataset Center",
    desc: "Enterprise procurement dataset containing vendors, invoices, purchase orders, contracts and procurement transactions.",
    tech: ["SQL", "PySpark", "Power BI"],
    value: "Provides the foundation powering the complete analytics platform.",
    image: "/dashboard-analytics.jpg",
    accent: "from-accent/30 to-transparent",
    icon: Database,
  },
];

const PIPELINE = [
  { icon: Database, label: "Enterprise Dataset" },
  { icon: Server, label: "SQL Cleaning" },
  { icon: Cpu, label: "PySpark ETL" },
  { icon: Wand2, label: "Power Query" },
  { icon: Layers, label: "Power BI Data Model" },
  { icon: Calculator, label: "DAX Measures" },
  { icon: LayoutDashboard, label: "Interactive Dashboards" },
  { icon: Brain, label: "AI Procurement Copilot" },
  { icon: Lightbulb, label: "Executive Decision Support" },
];

const PREVIEWS = [
  { src: "/dashboard-executive.jpg", title: "Executive Overview Dashboard", caption: "Procurement Performance at a Glance" },
  { src: "/dashboard-analytics.jpg", title: "Procurement Analytics Dashboard", caption: "Supplier risk, contracts and budget utilization" },
];

const TECH_STACK = [
  "SQL", "PySpark", "Python", "Power BI", "DAX", "Power Query",
  "React", "TypeScript", "Tailwind CSS", "OpenAI", "GitHub",
];

const FEATURES = [
  "SQL Data Cleaning", "PySpark ETL Pipeline", "Power BI Dashboard",
  "Interactive Visualizations", "DAX KPI Development", "Cross Filtering",
  "Supplier Analytics", "Spend Analysis", "Executive Reporting", "AI Decision Support",
];

const IMPACT = [
  { v: "5,248", l: "Records Processed", icon: Table2 },
  { v: "12", l: "Connected Tables", icon: Boxes },
  { v: "300", l: "Vendors Analysed", icon: Users },
  { v: "6", l: "Enterprise Modules", icon: Building2 },
  { v: "2", l: "Power BI Dashboards", icon: LayoutDashboard },
  { v: "AI", l: "Decision Support", icon: Brain },
  { v: "Live", l: "Risk Monitoring", icon: ShieldAlert },
  { v: "Auto", l: "Executive Reporting", icon: FileBarChart2 },
];

const WHY = [
  { icon: LayoutDashboard, t: "Enterprise Dashboard Development" },
  { icon: Server, t: "SQL Data Engineering" },
  { icon: Cpu, t: "PySpark ETL" },
  { icon: BarChart3, t: "Power BI Reporting" },
  { icon: Briefcase, t: "Executive Analytics" },
  { icon: Sparkles, t: "AI-enabled Business Intelligence" },
  { icon: Lightbulb, t: "Business Decision Support" },
];

const GITHUB_URL = "#"; // TODO: replace with real repo URL

export function ProjectShowcase() {
  const [lightbox, setLightbox] = useState<{ list: { src: string; title?: string }[]; idx: number } | null>(null);

  const open = (src: string) => setLightbox({ list: [{ src }], idx: 0 });
  const openPreviews = (idx: number) => setLightbox({ list: PREVIEWS, idx });

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((s) => s && { ...s, idx: (s.idx + 1) % s.list.length });
      if (e.key === "ArrowLeft") setLightbox((s) => s && { ...s, idx: (s.idx - 1 + s.list.length) % s.list.length });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      {/* SECTION 1 — PROJECT WALKTHROUGH */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Project Walkthrough
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Enterprise Project Walkthrough
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Six integrated modules spanning data engineering, dashboarding and AI-powered decision support.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WALKTHROUGH.map((w) => (
              <article
                key={w.n}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-elevated"
              >
                {/* image */}
                <button
                  type="button"
                  onClick={() => w.image && open(w.image)}
                  className="relative block aspect-[16/10] w-full overflow-hidden bg-surface"
                  aria-label={`Open ${w.title}`}
                >
                  {w.image ? (
                    <img
                      src={w.image}
                      alt={w.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${w.accent}`}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,transparent_0,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
                      <div className="relative flex flex-col items-center gap-3 text-muted-foreground">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/80 backdrop-blur">
                          <w.icon className="h-6 w-6 text-foreground" />
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Screenshot Placeholder</span>
                      </div>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold shadow-soft">
                    {w.n}
                  </span>
                </button>

                {/* body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold tracking-tight">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>

                  <div className="mt-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Technologies</div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {w.tech.map((t) => (
                        <span key={t} className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-border bg-surface p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      <Zap className="h-3 w-3 text-accent" /> Business Value
                    </div>
                    <p className="mt-1 text-xs leading-relaxed">{w.value}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => w.image && open(w.image)}
                    disabled={!w.image}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Maximize2 className="h-3.5 w-3.5" /> View Full Image
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — ARCHITECTURE */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Project Architecture
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              End-to-End Analytics Pipeline
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              From raw enterprise data to executive decisions — every stage engineered for scale.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-stretch justify-center gap-3 lg:flex-nowrap">
            {PIPELINE.map((a, i) => (
              <div key={a.label} className="flex flex-col items-center gap-3 lg:flex-row">
                <div className="group flex w-36 flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface ring-1 ring-border transition group-hover:bg-accent/20">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="text-[11px] font-semibold leading-tight">{a.label}</div>
                </div>
                {i < PIPELINE.length - 1 && (
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

      {/* SECTION 4 — INTERACTIVE DASHBOARD PREVIEW */}
      <section id="gallery" className="scroll-mt-24 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Dashboard Gallery</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Interactive Dashboard Preview</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              This project contains enterprise Power BI dashboards developed using SQL, PySpark, Power Query and DAX.
              Because the original dashboard is hosted on a secured Microsoft organizational tenant, it cannot be publicly embedded.
              The screenshots below demonstrate the complete solution.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {PREVIEWS.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => openPreviews(i)}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 text-left opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="text-sm font-semibold text-background">{p.title}</div>
                  <div className="text-xs text-background/80">{p.caption}</div>
                </div>
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1 text-[11px] font-semibold shadow-soft">
                  <Maximize2 className="h-3 w-3" /> Fullscreen
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — SOURCE CODE */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elevated sm:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--gradient-hero)" }} />
            <div className="relative grid gap-8 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Source Code</div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Explore the Source Code</h2>
                <p className="mt-3 text-sm text-muted-foreground">This repository contains:</p>
                <ul className="mt-3 grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
                  {[
                    "SQL Scripts", "PySpark ETL", "Power BI (.pbix)",
                    "DAX Measures", "Power Query Transformations", "Documentation",
                    "Sample Dataset", "Project Architecture",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center lg:col-span-2 lg:justify-end">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-sm font-semibold text-background shadow-soft transition hover:opacity-90"
                >
                  <Github className="h-5 w-5" />
                  View Complete Project on GitHub
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TECH STACK */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Technology Stack</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Built with modern enterprise tools</h2>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {TECH_STACK.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold shadow-soft transition hover:-translate-y-0.5 hover:bg-surface hover:shadow-elevated"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FEATURES */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Project Features</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Enterprise-grade capabilities</h2>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES.map((f) => (
              <div
                key={f}
                className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10 ring-1 ring-success/30">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <div className="text-sm font-semibold leading-tight">{f}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — BUSINESS IMPACT */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Business Impact</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Measurable enterprise outcomes</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((k) => (
              <div
                key={k.l}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface ring-1 ring-border">
                  <k.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-3xl font-semibold tracking-tight">{k.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — ABOUT */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">About</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">About This Project</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
            This project demonstrates a complete enterprise procurement analytics platform built using SQL, PySpark,
            Power BI, DAX and AI-powered decision support. The solution showcases modern Business Intelligence
            practices including data preparation, ETL development, dashboard design, supplier analytics, procurement
            reporting and executive decision support.
          </p>
        </div>
      </section>

      {/* SECTION 10 — WHY THIS PROJECT MATTERS */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Why This Project Matters</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Skills demonstrated end-to-end</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div
                key={w.t}
                className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface ring-1 ring-border transition group-hover:bg-accent/20">
                  <w.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold leading-snug">{w.t}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Enterprise-grade architecture</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Production-ready UI</div>
            <div className="flex items-center gap-1.5"><Workflow className="h-3.5 w-3.5 text-accent" /> End-to-end data pipeline</div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX with next/prev */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/85 p-4 backdrop-blur-md animate-fade-in"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-elevated hover:bg-surface"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {lightbox.list.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((s) => s && { ...s, idx: (s.idx - 1 + s.list.length) % s.list.length }); }}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-elevated hover:bg-surface"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((s) => s && { ...s, idx: (s.idx + 1) % s.list.length }); }}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-elevated hover:bg-surface"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/95 px-3 py-1 text-[11px] font-semibold shadow-soft">
                {lightbox.idx + 1} / {lightbox.list.length}
              </div>
            </>
          )}

          <img
            src={lightbox.list[lightbox.idx].src}
            alt={lightbox.list[lightbox.idx].title ?? "Preview"}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[95vw] rounded-2xl border border-border object-contain shadow-elevated animate-scale-in"
          />
        </div>
      )}
    </>
  );
}
