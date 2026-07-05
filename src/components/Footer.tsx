import { Github, Linkedin, Mail } from "lucide-react";
import { OWNER, MAILTO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-foreground">Built by {OWNER.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{OWNER.title}</div>
            <div className="mt-1 text-xs font-medium tracking-wide text-muted-foreground">
              SQL · PySpark · Power BI · DAX · React
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={OWNER.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={MAILTO}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-card hover:shadow-soft"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-5 text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Procurement Copilot · Enterprise Analytics Portfolio by {OWNER.name}
        </div>
      </div>
    </footer>
  );
}
