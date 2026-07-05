import { useEffect, useState } from "react";
import { Sparkles, Github, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { markDatasetLoaded, useDatasetLoaded } from "@/lib/dataset-store";
import { OWNER, KPI } from "@/lib/constants";

const GITHUB_URL = OWNER.github;

export function WelcomeModal() {
  const { loaded, setDatasetLoaded } = useDatasetLoaded();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loaded === false) setOpen(true);
  }, [loaded]);

  const enter = () => {
    setOpen(false);
    markDatasetLoaded();
    setDatasetLoaded(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-md animate-fade-in" />
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-elevated animate-scale-in">
        {/* Header */}
        <div className="relative border-b border-border bg-gradient-to-br from-accent/20 via-transparent to-transparent px-8 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shadow-glow">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Powered by Procurement Copilot
              </div>
              <div className="text-lg font-semibold tracking-tight">Enterprise Procurement Analytics</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-sm text-muted-foreground">Welcome,</div>
            <div className="mt-0.5 text-2xl font-semibold tracking-tight">Hrishik Marfatia</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Your enterprise analytics workspace has been prepared.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-2 gap-3">
            <Info label="Portfolio" value="Enterprise Analytics" />
            <Info
              label="Status"
              value={
                <span className="inline-flex items-center gap-1.5 text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Connected
                </span>
              }
            />
            <Info label="Business Tables" value="12" />
            <Info label="Records" value="5,248" />
          </div>

          <div className="col-span-2 mt-3 rounded-xl border border-border bg-surface p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Dataset
            </div>
            <div className="mt-0.5 text-sm font-semibold">Enterprise Procurement FY2024 – FY2026</div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
              <Cpu className="h-3.5 w-3.5 text-accent" /> Analytics
            </div>
            {["Power BI", "SQL", "PySpark", "DAX"].map((t) => (
              <span key={t} className="rounded-md border border-border bg-card px-2 py-0.5 text-[11px] font-semibold">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition hover:bg-surface"
            >
              <Github className="h-4 w-4" />
              View GitHub Repository
            </a>
            <button
              onClick={enter}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-soft transition hover:opacity-90"
            >
              Enter Workspace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Secure enterprise session · Preconfigured dataset already loaded
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
