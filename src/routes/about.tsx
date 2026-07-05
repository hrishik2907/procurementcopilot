import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Brain, Lightbulb, Shield, Workflow, BarChart3, Database, Github, Linkedin, Mail } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { OWNER, MAILTO, KPI } from "@/lib/constants";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About · Procurement Copilot" }] }),
  component: AboutPage,
});

const STACK = [
  { k: "SQL", d: "Cleaning, joining and modelling raw procurement tables into an analytics-ready schema." },
  { k: "PySpark", d: "Distributed ETL for spend, invoices, contracts and vendor master data." },
  { k: "Power Query", d: "Column shaping, type casting and merges inside the Power BI ingestion layer." },
  { k: "Power BI", d: "Executive dashboards, drill-through pages, bookmarks and role-level security." },
  { k: "DAX", d: "Time-intelligence, savings, budget utilization and supplier-risk measures." },
  { k: "React", d: "This portfolio application, built with TanStack Router and Tailwind." },
  { k: "AI", d: "Jarvis — the natural-language procurement analyst layered on top of the model." },
];

function AboutPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="About"
        title="Procurement Copilot"
        description="An end-to-end enterprise analytics portfolio project by Hrishik Marfatia."
      />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:shadow-elevated">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Project overview
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            The complete analytics lifecycle — from raw procurement data to executive decisions
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Procurement Copilot is a portfolio project that demonstrates the full data-to-decision journey for
            enterprise procurement. Raw transactional data is cleaned in <span className="font-medium text-foreground">SQL</span>,
            transformed at scale using <span className="font-medium text-foreground">PySpark</span>, refined through
            <span className="font-medium text-foreground"> Power Query</span>, modelled in
            <span className="font-medium text-foreground"> Power BI</span> with executive-grade
            <span className="font-medium text-foreground"> DAX</span> measures, and finally exposed through this
            <span className="font-medium text-foreground"> React</span> application with an
            <span className="font-medium text-foreground"> AI</span> analyst named Jarvis.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat k={KPI.records.toLocaleString("en-IN")} v="Records" />
            <Stat k={String(KPI.tables)} v="Connected tables" />
            <Stat k={KPI.totalSpend} v="Total procurement spend" />
            <Stat k={String(KPI.suppliers)} v="Suppliers analysed" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { i: BarChart3, t: "Dashboard", d: "Executive Power BI report showing WHAT happened." },
            { i: Brain, t: "Jarvis AI", d: "Natural-language analyst that explains WHY it happened." },
            { i: Lightbulb, t: "Recommendations", d: "Data-grounded suggestions for WHAT to improve next." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface ring-1 ring-border">
                <c.i className="h-4 w-4" />
              </div>
              <div className="mt-3 text-sm font-semibold">{c.t}</div>
              <div className="text-sm text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-accent" />
            <div className="text-sm font-semibold">Technology stack</div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {STACK.map((s) => (
              <div key={s.k} className="rounded-xl border border-border bg-surface p-3">
                <div className="text-sm font-semibold">{s.k}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-accent" />
              <div className="text-sm font-semibold">Built around the full P2P process</div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              From vendor onboarding through payment, every step of Procure-to-Pay is modelled, measured and
              explainable in the dataset — {KPI.purchaseOrders.toLocaleString("en-IN")} POs,
              {" "}{KPI.invoices.toLocaleString("en-IN")} invoices and {KPI.categories} procurement categories.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <div className="text-sm font-semibold">Portfolio-grade quality</div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Reproducible pipeline, versioned SQL, documented DAX measures and a clean React front end —
              everything a hiring manager needs to review the work end to end.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-accent/10 p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">Built by {OWNER.name}</div>
              <div className="text-xs text-muted-foreground">{OWNER.title}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={OWNER.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-surface"><Github className="h-4 w-4" /> GitHub</a>
              <a href={OWNER.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-surface"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              <a href={MAILTO} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background transition hover:opacity-90"><Mail className="h-4 w-4" /> Email</a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-lg font-semibold tracking-tight">{k}</div>
      <div className="text-[11px] text-muted-foreground">{v}</div>
    </div>
  );
}
