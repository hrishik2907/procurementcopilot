import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3, Database, Table2, Calendar, ExternalLink,
  FileSpreadsheet, MessageSquare, Github, Maximize2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Footer } from "@/components/Footer";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Analytics Hub · Procurement Copilot" },
      {
        name: "description",
        content:
          "Enterprise Power BI procurement analytics dashboard built with SQL, PySpark and DAX.",
      },
    ],
  }),
  component: DashboardPage,
});

import { OWNER } from "@/lib/constants";
const GITHUB_URL = OWNER.github;
const POWER_BI_OPEN_URL = OWNER.github;

const TECH_BADGES = ["SQL", "PySpark", "Power BI", "Power Query", "DAX"];

const SCREENSHOTS: (LightboxImage & { title: string; description: string })[] = [
  {
    src: "/dashboard-executive.jpg",
    alt: "Executive Overview",
    title: "Executive Overview",
    description:
      "Total Spend, Vendor Analysis, Category Spend, Invoice Analysis and Monthly Procurement Trends.",
  },
  {
    src: "/dashboard-analytics.jpg",
    alt: "Procurement Analytics",
    title: "Procurement Analytics",
    description:
      "Supplier Risk, Budget Utilization, Contract Performance, Vendor Intelligence and AI Recommendations.",
  },
];

function DashboardPage() {
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const images: LightboxImage[] = SCREENSHOTS.map((s) => ({ src: s.src, alt: s.alt }));

  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px] space-y-10 px-6 py-8">
        {/* Header */}
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
              Built using{" "}
              {TECH_BADGES.map((t, i) => (
                <span key={t}>
                  <span className="font-medium text-foreground">{t}</span>
                  {i < TECH_BADGES.length - 1 ? " · " : ""}
                </span>
              ))}
              . Interactive executive dashboards for procurement spend, supplier performance,
              contract risk and monthly trends.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {TECH_BADGES.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-[420px]">
            <MetaTile icon={<Calendar className="h-4 w-4" />} label="Last Refresh" value="Today, 09:42" />
            <MetaTile icon={<Database className="h-4 w-4" />} label="Dataset Size" value="5,248+ rows" />
            <MetaTile icon={<Table2 className="h-4 w-4" />} label="Tables" value="12 connected" />
            <div className="flex items-center justify-center rounded-xl border border-accent/40 bg-accent/15 p-3">
              <span className="text-sm font-semibold tracking-wide text-foreground">FY2024 – FY2026</span>
            </div>
          </div>
        </header>

        {/* Dashboard Screenshots */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {SCREENSHOTS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setLbIndex(i)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-muted/40 via-background to-accent/5">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="eager"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" /> Open fullscreen
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.description}</p>
              </div>
            </button>
          ))}
        </section>

        {/* Continue actions */}
        <section className="rounded-2xl border border-border bg-gradient-to-br from-card to-accent/5 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Continue your analysis</h3>
              <p className="text-sm text-muted-foreground">
                Open the live report, inspect the dataset or ask Jarvis about any insight.
              </p>
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
                Ask Jarvis About Dashboard
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted"
              >
                <Github className="h-4 w-4" />
                View Project on GitHub
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {lbIndex !== null && (
        <Lightbox
          images={images}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onIndexChange={setLbIndex}
        />
      )}
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
