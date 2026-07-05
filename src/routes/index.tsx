import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, LayoutDashboard, ArrowRight, Github, CheckCircle2 } from "lucide-react";
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

const TECH = ["SQL", "PySpark", "Power BI", "Power Query", "DAX", "React", "AI"];

function Home() {
  return (
    <AppShell>
      <WelcomeModal />

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
            Turn procurement data into decisions. An enterprise analytics workspace combining
            Power BI dashboards, SQL &amp; PySpark pipelines, and Jarvis — an AI analyst that
            explains what happened and what to do next.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-95"
            >
              <LayoutDashboard className="h-4 w-4" />
              View Interactive Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-surface"
            >
              <Github className="h-4 w-4" />
              View Source Code
            </a>
            <Link
              to="/ai-analyst"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-soft transition hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              Meet Jarvis
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {TECH.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Built on real procurement schema
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" /> 5,248 records · 12 tables
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" /> AI-powered decision support
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </AppShell>
  );
}
