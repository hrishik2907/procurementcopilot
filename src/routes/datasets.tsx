import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Database,
  Download,
  BookOpen,
  LineChart,
  FileText,
  ShoppingCart,
  ScrollText,
  Users,
  ShieldAlert,
  Wallet,
  ArrowRight,
  CheckCircle2,
  ServerCog,
  Target,
  Clock,
  Table2,
  KeyRound,
  Share2,
  Sparkles,
  BrainCircuit,
  FileBarChart2,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/datasets")({
  head: () => ({
    meta: [
      { title: "Enterprise Procurement Dataset · Procurement Copilot" },
      {
        name: "description",
        content:
          "Central repository powering procurement analytics, supplier intelligence and AI-driven business recommendations.",
      },
    ],
  }),
  component: DatasetsPage,
});

const STATS = [
  { v: "5,248", l: "Records", sub: "Ingested rows" },
  { v: "12", l: "Business Tables", sub: "Normalized schema" },
  { v: "300", l: "Vendors", sub: "Active suppliers" },
  { v: "FY 2024–2026", l: "Coverage", sub: "3 fiscal years" },
];

const SOURCES = [
  {
    icon: FileText,
    name: "Invoice",
    desc: "AP invoices with 3-way match, tax and payment terms.",
    size: "1,842 rows · 24 cols",
  },
  {
    icon: ShoppingCart,
    name: "Purchase Orders",
    desc: "PO headers and line items across all business units.",
    size: "1,209 rows · 31 cols",
  },
  {
    icon: ScrollText,
    name: "Contracts",
    desc: "Framework agreements, SLAs and renewal calendar.",
    size: "486 rows · 18 cols",
  },
  {
    icon: Users,
    name: "Vendor Master",
    desc: "Supplier onboarding, qualification and compliance data.",
    size: "300 rows · 42 cols",
  },
  {
    icon: ShieldAlert,
    name: "Supplier Risk",
    desc: "Financial, geopolitical and ESG risk indicators.",
    size: "300 rows · 16 cols",
  },
  {
    icon: Wallet,
    name: "Department Budget",
    desc: "Cost center budgets, commitments and consumption.",
    size: "1,111 rows · 12 cols",
  },
];

const FLOW = [
  { icon: Database, name: "Dataset", sub: "Ingested source" },
  { icon: ShieldCheck, name: "Data Validation", sub: "Quality & lineage" },
  { icon: LineChart, name: "Analytics Dashboard", sub: "KPIs & trends" },
  { icon: BrainCircuit, name: "AI Procurement Analyst", sub: "Insight generation" },
  { icon: FileBarChart2, name: "Executive Reports", sub: "Board-ready output" },
];

const INFO = [
  { icon: ServerCog, label: "Source System", value: "SAP S/4HANA · Ariba · Coupa" },
  { icon: Target, label: "Business Purpose", value: "Procure-to-Pay analytics & decision support" },
  { icon: Clock, label: "Last Updated", value: "Today · 09:42 UTC" },
  { icon: Table2, label: "Total Tables", value: "12 normalized business tables" },
  { icon: KeyRound, label: "Primary Keys", value: "vendor_id, po_id, invoice_id, contract_id" },
  { icon: Share2, label: "Relationships", value: "28 foreign keys · star schema" },
];

function DatasetsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Data"
        title="Dataset Center"
        description="Enterprise procurement data foundation for analytics, AI and executive reporting."
      />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* SECTION 1 */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Enterprise data foundation
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Enterprise Procurement Dataset
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              Central repository powering procurement analytics, supplier intelligence and AI-driven
              business recommendations.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-border bg-surface p-4 shadow-soft transition hover:-translate-y-0.5 hover:bg-card"
                >
                  <div className="text-2xl font-semibold tracking-tight">{s.v}</div>
                  <div className="mt-1 text-sm font-medium">{s.l}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success ring-1 ring-success/30">
                <CheckCircle2 className="h-3.5 w-3.5" /> Connected
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/#gallery"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-glow"
              >
                <LineChart className="h-4 w-4" /> View Dashboard Gallery
              </a>
              <button
                onClick={() =>
                  toast.success("Sample dataset requested", {
                    description: "Attach your procurement CSV to enable download.",
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-surface"
              >
                <Download className="h-4 w-4" /> Download Sample Dataset
              </button>
              <button
                onClick={() =>
                  toast("Data dictionary", { description: "12 tables · 232 fields documented" })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-surface"
              >
                <BookOpen className="h-4 w-4" /> View Data Dictionary
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Available Data Sources
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Six core business tables curated for procurement decision-making.
              </p>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {SOURCES.length} sources
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOURCES.map((s) => (
              <div
                key={s.name}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface ring-1 ring-border">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </span>
                </div>
                <div className="mt-4 text-sm font-semibold">{s.name}</div>
                <p className="mt-1 flex-1 text-xs text-muted-foreground">{s.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Table2 className="h-3 w-3" /> {s.size}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-foreground opacity-0 transition group-hover:opacity-100">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Procurement Data Flow</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            From raw ingestion to executive-ready insight.
          </p>

          <div className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="grid gap-3 lg:grid-cols-9 lg:items-center">
              {FLOW.map((f, i) => (
                <Fragment key={f.name}>
                  <div className="lg:col-span-1 flex flex-col items-center rounded-2xl border border-border bg-surface p-4 text-center transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background ring-1 ring-border">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div className="mt-3 text-sm font-semibold">{f.name}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{f.sub}</div>
                  </div>
                  {i < FLOW.length - 1 && <FlowArrow />}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Dataset Information</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Governance, lineage and structural metadata.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INFO.map((i) => (
              <div
                key={i.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <i.icon className="h-3.5 w-3.5 text-accent" /> {i.label}
                </div>
                <div className="mt-2 text-sm font-medium">{i.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 */}
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Enterprise-grade procurement dataset</div>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    Supporting dashboards, AI analysis, supplier intelligence and executive reporting
                    across the global Procure-to-Pay lifecycle.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
                  SOC 2 aligned
                </span>
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                  GDPR ready
                </span>
                <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border">
                  Audit logged
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function FlowArrow() {
  return (
    <div className="lg:col-span-1 flex items-center justify-center py-2 lg:py-0">
      <div className="relative h-6 w-full max-w-[80px] lg:h-[2px]">
        <div className="absolute inset-x-0 top-1/2 hidden h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-border lg:block">
          <div
            className="h-full w-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.86 0.17 92), transparent)",
              animation: "flow-slide 2.4s ease-in-out infinite",
            }}
          />
        </div>
        <div className="flex h-full items-center justify-center lg:hidden">
          <ArrowRight className="h-4 w-4 rotate-90 text-muted-foreground" />
        </div>
        <ArrowRight className="absolute right-0 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground lg:block" />
      </div>
      <style>{`
        @keyframes flow-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
