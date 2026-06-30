import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  LayoutDashboard,
  Sparkles,
  Workflow,
  ShieldAlert,
  FileBarChart2,
  Info,
  User,
  Database,
  Search,
  Bell,
  Command,
} from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/ai-analyst", label: "AI Procurement Analyst", icon: Sparkles },
  { to: "/workspace", label: "Procurement Workspace", icon: Workflow },
  { to: "/risk", label: "Risk Center", icon: ShieldAlert },
  { to: "/reports", label: "Executive Reports", icon: FileBarChart2 },
  { to: "/datasets", label: "Dataset Center", icon: Database },
  { to: "/about", label: "About", icon: Info },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Procurement</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Copilot</div>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  active
                    ? "bg-foreground text-background shadow-soft"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-success" />
              Workspace: <span className="text-muted-foreground">Acme Industries</span>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">FY 2026 · EMEA</div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="relative max-w-md flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search vendors, POs, invoices…"
                  className="w-72 rounded-lg border border-border bg-surface py-2 pl-9 pr-16 text-sm outline-none focus:border-foreground/20 focus:ring-2 focus:ring-accent/40"
                />
                <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-flex">
                  <Command className="h-3 w-3" />K
                </kbd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-surface hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
              </button>
              <div className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">SK</div>
                <div className="text-xs leading-tight">
                  <div className="font-medium">Sara Klein</div>
                  <div className="text-muted-foreground">Procurement Lead</div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
