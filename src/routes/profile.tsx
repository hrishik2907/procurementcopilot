import { createFileRoute } from "@tanstack/react-router";
import { Mail, Building2, GraduationCap, Github, Linkedin, ExternalLink, Award } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { OWNER, MAILTO, KPI } from "@/lib/constants";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · Procurement Copilot" }] }),
  component: ProfilePage,
});

const INITIALS = OWNER.name
  .split(" ")
  .map((s) => s[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Portfolio"
        title="Profile"
        description="The engineer and analyst behind the Procurement Copilot portfolio project."
      />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:shadow-elevated">
          <div className="h-28 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent" />
          <div className="-mt-12 px-6 pb-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-foreground text-2xl font-semibold text-background ring-4 ring-card">
              {INITIALS}
            </div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-xl font-semibold tracking-tight">{OWNER.name}</div>
                <div className="text-sm text-muted-foreground">{OWNER.title}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={OWNER.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-surface hover:shadow-soft"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href={OWNER.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-surface hover:shadow-soft"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  href={MAILTO}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  <Mail className="h-4 w-4" /> Contact
                </a>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Field i={Mail} k="Email" v={OWNER.email} href={MAILTO} />
              <Field i={GraduationCap} k="Focus" v="Business Analytics · Data Engineering · BI" />
              <Field i={Building2} k="Portfolio" v={OWNER.organization} />
              <Field i={Award} k="Stack" v="SQL · PySpark · Power BI · DAX · React · AI" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="text-sm font-semibold">About this portfolio</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Procurement Copilot is an end-to-end enterprise analytics project I built to demonstrate the full
            analytics lifecycle — from raw procurement data through SQL cleaning, PySpark ETL, Power Query
            transformations, a Power BI semantic model with DAX measures, and an AI decision layer named Jarvis.
            The React application you're viewing is the portfolio wrapper that showcases the underlying
            {" "}<span className="font-medium text-foreground">{KPI.records.toLocaleString("en-IN")}-row</span>{" "}
            procurement dataset across {KPI.tables} connected tables covering {KPI.fyRange}.
          </p>
        </div>

        {/* Professional Summary + Skills + Competencies + Education */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Block title="Professional Summary" className="lg:col-span-3">
            Business analytics professional focused on end-to-end BI delivery — from SQL data engineering
            and PySpark ETL through Power BI semantic modelling, DAX and AI-driven decision support.
            Passionate about building analytics products that leaders actually use.
          </Block>
          <Block title="Technical Skills">
            <SkillGroup title="Data" items={["SQL", "PySpark", "Power Query", "Python"]} />
            <SkillGroup title="BI" items={["Power BI", "DAX", "Semantic Modelling", "Power BI Service"]} />
            <SkillGroup title="Frontend" items={["React", "TypeScript", "Tailwind"]} />
            <SkillGroup title="AI" items={["LLM Reasoning", "Prompt Design", "Grounded Analytics"]} />
          </Block>
          <Block title="Core Competencies">
            <ul className="space-y-1.5 text-sm">
              {[
                "Data Engineering",
                "PySpark ETL",
                "Power BI Reporting",
                "Executive Analytics",
                "AI-enabled Business Intelligence",
                "Business Decision Support",
              ].map((c) => (
                <li key={c} className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-accent-foreground" />{c}</li>
              ))}
            </ul>
          </Block>
          <Block title="Education & Highlights">
            <div className="text-sm font-semibold">Business Analytics — Graduate Study</div>
            <div className="text-xs text-muted-foreground">Focus: Data Engineering · BI · Applied AI</div>
            <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Project Highlights</div>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• End-to-end procurement analytics platform</li>
              <li>• {KPI.records.toLocaleString("en-IN")} records · {KPI.tables} connected tables</li>
              <li>• Jarvis AI analyst grounded on curated measures</li>
            </ul>
          </Block>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href={OWNER.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">GitHub</div>
                <div className="text-xs text-muted-foreground">hrishik2907</div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
          <a
            href={OWNER.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">LinkedIn</div>
                <div className="text-xs text-muted-foreground">hrishik-marfatia</div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
          <a
            href={MAILTO}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">Email</div>
                <div className="text-xs text-muted-foreground">{OWNER.email}</div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ i: I, k, v, href }: { i: any; k: string; v: string; href?: string }) {
  const body = (
    <>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <I className="h-3.5 w-3.5" /> {k}
      </div>
      <div className="mt-1 text-sm font-medium">{v}</div>
    </>
  );
  return href ? (
    <a href={href} className="block rounded-xl border border-border bg-surface p-3 transition hover:bg-card">
      {body}
    </a>
  ) : (
    <div className="rounded-xl border border-border bg-surface p-3">{body}</div>
  );
}
