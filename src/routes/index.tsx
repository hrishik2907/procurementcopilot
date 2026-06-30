import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  LayoutDashboard,
  ArrowRight,
  ShieldAlert,
  FileBarChart2,
  Workflow,
  Database,
  Brain,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  Building2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { WelcomeModal } from "@/components/WelcomeModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Procurement Copilot — Turn Procurement Data into Decisions" },
      { name: "description", content: "AI-powered decision support platform that combines procurement analytics with explainable AI to help managers act faster." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: LayoutDashboard, title: "Dashboard", desc: "Visualize procurement performance across spend, suppliers and cycle time.", to: "/dashboard" },
  { icon: Sparkles, title: "AI Procurement Analyst", desc: "Understand why business events happened — in natural language.", to: "/ai-analyst" },
  { icon: ShieldAlert, title: "Risk Center", desc: "Identify supplier, compliance and concentration risks proactively.", to: "/risk" },
  { icon: FileBarChart2, title: "Executive Reports", desc: "Generate AI-powered summaries for the leadership team.", to: "/reports" },
  { icon: Workflow, title: "Procurement Workspace", desc: "Walk through the full Procure-to-Pay process end to end.", to: "/workspace" },
  { icon: Database, title: "Dataset Center", desc: "Upload and manage procurement datasets across business units.", to: "/datasets" },
];

function Home() {
  return (
    <AppShell>
      <WelcomeModal />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3 w-3 text-accent" />
              AI-Powered Procurement Decision Support Platform
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Procurement <span className="relative inline-block">
                <span className="relative z-10">Copilot</span>
                <span className="absolute inset-x-0 bottom-2 -z-0 h-3 bg-accent/50" />
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Transform procurement data into meaningful business insights by combining
              dashboards with AI-powered decision support.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-soft transition hover:opacity-90"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-surface"
              >
                <LayoutDashboard className="h-4 w-4" />
                Open Dashboard
              </Link>
              <Link
                to="/ai-analyst"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-95"
              >
                <Sparkles className="h-4 w-4" />
                Meet AI Analyst
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> SOC 2 ready</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> GDPR compliant</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> SAP · Oracle · Coupa connectors</div>
            </div>
          </div>

          {/* Illustration */}
          <div className="lg:col-span-5">
            <FlowIllustration />
          </div>
        </div>
      </section>

      {/* Core principle band */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: BarChart3, k: "Dashboard", v: "Shows WHAT happened." },
            { icon: Brain, k: "Artificial Intelligence", v: "Explains WHY it happened." },
            { icon: Lightbulb, k: "Artificial Intelligence", v: "Suggests WHAT to improve." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <c.icon className="h-3.5 w-3.5 text-accent" /> Step {i + 1}
              </div>
              <div className="mt-2 text-sm font-semibold">{c.k}</div>
              <div className="text-sm text-muted-foreground">{c.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Platform</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Everything procurement teams need</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-foreground ring-1 ring-border">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold">{f.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/80">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trusted */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <div className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Built for global procurement & finance teams</div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-semibold uppercase tracking-[0.2em]">
            <span>Acme</span><span>Helix</span><span>Northwind</span><span>Vertex</span><span>Orion</span>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function FlowIllustration() {
  const steps = [
    { icon: Database, label: "Procurement Dataset", sub: "5,248 rows · 6 tables" },
    { icon: LayoutDashboard, label: "Dashboard", sub: "KPI · Trends · Spend cube" },
    { icon: Brain, label: "AI Analysis", sub: "Root cause · Recommendations" },
    { icon: Lightbulb, label: "Business Decisions", sub: "Faster, defensible actions" },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-2xl" />
      <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-elevated backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">procurement-copilot.app</div>
        </div>
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 transition hover:shadow-soft">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface ring-1 ring-border">
                <s.icon className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
              {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              {i === steps.length - 1 && (
                <span className="rounded-full bg-accent/30 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">Outcome</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
