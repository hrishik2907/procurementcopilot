import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Brain, Lightbulb, Shield, Workflow, BarChart3 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About · Procurement Copilot" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="About" title="Procurement Copilot" description="AI-Powered Procurement Decision Support Platform" />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground"><Sparkles className="h-3.5 w-3.5" /> Vision</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Turn Procurement Data into Business Decisions</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Procurement teams already have dashboards. Dashboards tell users <em>what happened</em>. But business users still spend hours understanding <em>why</em> something happened, <em>what caused it</em>, <em>which process failed</em>, and <em>what should be improved</em>.
            Procurement Copilot combines procurement analytics with artificial intelligence to help managers make faster and better business decisions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { i: BarChart3, t: "Dashboard", d: "Shows WHAT happened." },
            { i: Brain, t: "AI Analyst", d: "Explains WHY it happened." },
            { i: Lightbulb, t: "AI Recommendations", d: "Suggests WHAT to improve." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface ring-1 ring-border"><c.i className="h-4 w-4" /></div>
              <div className="mt-3 text-sm font-semibold">{c.t}</div>
              <div className="text-sm text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2"><Workflow className="h-4 w-4 text-accent" /><div className="text-sm font-semibold">Built for the full P2P process</div></div>
            <p className="mt-2 text-sm text-muted-foreground">From vendor onboarding through payment, every step of Procure-to-Pay is connected, measurable and explainable.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /><div className="text-sm font-semibold">Enterprise-grade security</div></div>
            <p className="mt-2 text-sm text-muted-foreground">SOC 2, GDPR-aligned controls, fine-grained role-based access and full audit trails. Your data never trains public models.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
