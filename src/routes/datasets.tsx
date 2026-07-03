import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Database,
  Download,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Table2,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/datasets")({
  head: () => ({
    meta: [
      { title: "Dataset Center · Procurement Copilot" },
      {
        name: "description",
        content:
          "Enterprise procurement dataset with vendors, POs, invoices, contracts, spend and risk.",
      },
    ],
  }),
  component: DatasetsPage,
});

// ---------- Sample enterprise dataset ----------
type Row = {
  vendor: string;
  po: string;
  invoice: string;
  contract: string;
  department: string;
  category: string;
  spend: number; // INR
  payment: "Paid" | "Pending" | "Overdue" | "Processing";
  risk: "Low" | "Medium" | "High";
  status: "Open" | "Closed" | "In Review";
  country: string;
  date: string; // ISO
};

const VENDORS = [
  "Reliance Industries", "Tata Steel", "Infosys", "Wipro", "L&T Infotech",
  "Mahindra Logistics", "Adani Ports", "HDFC Services", "ITC Foods", "Godrej Chem",
  "Bajaj Electricals", "Bharti Airtel", "HCL Tech", "JSW Steel", "UltraTech Cement",
  "Siemens India", "Bosch Ltd", "ABB Power", "Hindalco", "Cipla",
];
const DEPTS = ["IT", "Operations", "Finance", "Procurement", "Logistics", "Engineering", "HR", "Marketing"];
const CATS = ["IT Services", "Raw Materials", "Logistics", "Consulting", "Marketing", "Utilities", "Capex", "MRO"];
const COUNTRIES = ["India", "UAE", "Singapore", "Germany", "USA", "UK"];
const PAYS: Row["payment"][] = ["Paid", "Pending", "Overdue", "Processing"];
const RISKS: Row["risk"][] = ["Low", "Medium", "High"];
const STATS: Row["status"][] = ["Open", "Closed", "In Review"];

function seeded(i: number) {
  return Math.abs(Math.sin(i * 9301 + 49297)) % 1;
}
const DATA: Row[] = Array.from({ length: 120 }).map((_, i) => {
  const r = (n: number) => seeded(i * 7 + n);
  const spend = Math.round(50_000 + r(1) * 4_20_00_000);
  const y = 2024 + Math.floor(r(6) * 3);
  const m = 1 + Math.floor(r(7) * 12);
  const d = 1 + Math.floor(r(8) * 27);
  return {
    vendor: VENDORS[Math.floor(r(2) * VENDORS.length)],
    po: `PO-${String(100000 + i).slice(1)}`,
    invoice: `INV-${String(200000 + i).slice(1)}`,
    contract: `CTR-${String(3000 + i).slice(1)}`,
    department: DEPTS[Math.floor(r(3) * DEPTS.length)],
    category: CATS[Math.floor(r(4) * CATS.length)],
    spend,
    payment: PAYS[Math.floor(r(5) * PAYS.length)],
    risk: RISKS[Math.floor(r(9) * RISKS.length)],
    status: STATS[Math.floor(r(10) * STATS.length)],
    country: COUNTRIES[Math.floor(r(11) * COUNTRIES.length)],
    date: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
  };
});

const COLUMNS: { key: keyof Row; label: string; align?: "right" }[] = [
  { key: "vendor", label: "Vendor" },
  { key: "po", label: "Purchase Order" },
  { key: "invoice", label: "Invoice" },
  { key: "contract", label: "Contract" },
  { key: "department", label: "Department" },
  { key: "category", label: "Category" },
  { key: "spend", label: "Spend", align: "right" },
  { key: "payment", label: "Payment" },
  { key: "risk", label: "Risk" },
  { key: "status", label: "Status" },
  { key: "country", label: "Country" },
  { key: "date", label: "Date" },
];

function DatasetsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [risk, setRisk] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortKey, setSortKey] = useState<keyof Row>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let rows = DATA.filter((r) => {
      if (dept !== "all" && r.department !== dept) return false;
      if (risk !== "all" && r.risk !== risk) return false;
      if (status !== "all" && r.status !== status) return false;
      if (!ql) return true;
      return Object.values(r).some((v) => String(v).toLowerCase().includes(ql));
    });
    rows = [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [q, dept, risk, status, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);
  const totalSpend = filtered.reduce((s, r) => s + r.spend, 0);

  const toggleSort = (k: keyof Row) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir("asc");
    }
    setPage(1);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Dataset Center"
        title="Enterprise Procurement Dataset"
        description="Central repository powering procurement analytics, supplier intelligence and Jarvis AI-driven business recommendations."
      />

      <div className="mx-auto max-w-[1500px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Table2} k="5,248" l="Records" />
          <Stat icon={Database} k="12" l="Business Tables" />
          <Stat icon={ShieldCheck} k="300" l="Vendors" />
          <Stat icon={CheckCircle2} k={formatINR(totalSpend)} l="Filtered Spend" />
        </div>

        {/* Toolbar */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[240px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search vendors, PO, invoice, contract…"
                className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-foreground/20 focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <Select label="Department" value={dept} onChange={setDept} options={["all", ...DEPTS]} />
            <Select label="Risk" value={risk} onChange={setRisk} options={["all", ...RISKS]} />
            <Select label="Status" value={status} onChange={setStatus} options={["all", ...STATS]} />
            <div className="ml-auto flex flex-wrap gap-2">
              <button
                onClick={() => toast.success("Sample procurement dataset download starting…")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-surface"
              >
                <Download className="h-4 w-4" /> Download Dataset
              </button>
              <a
                href="https://github.com/hrishik2907?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
              >
                <Github className="h-4 w-4" /> View Project on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="max-h-[640px] overflow-auto">
            <table className="w-full min-w-[1100px] border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-surface">
                <tr className="border-b border-border">
                  {COLUMNS.map((c) => {
                    const active = sortKey === c.key;
                    const Icon = !active ? ArrowUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
                    return (
                      <th
                        key={c.key}
                        onClick={() => toggleSort(c.key)}
                        className={`cursor-pointer whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground ${
                          c.align === "right" ? "text-right" : "text-left"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">
                          {c.label}
                          <Icon className={`h-3 w-3 ${active ? "text-foreground" : "text-muted-foreground/60"}`} />
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {pageRows.map((r, i) => (
                  <tr key={r.po} className={`border-b border-border/60 transition hover:bg-surface/70 ${i % 2 ? "bg-background" : ""}`}>
                    <td className="px-4 py-3 font-medium">{r.vendor}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.po}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.invoice}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.contract}</td>
                    <td className="px-4 py-3">{r.department}</td>
                    <td className="px-4 py-3">{r.category}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatINR(r.spend)}</td>
                    <td className="px-4 py-3"><Tag v={r.payment} tone={payTone(r.payment)} /></td>
                    <td className="px-4 py-3"><Tag v={r.risk} tone={riskTone(r.risk)} /></td>
                    <td className="px-4 py-3"><Tag v={r.status} tone={statusTone(r.status)} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{r.country}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{r.date}</td>
                  </tr>
                ))}
                {pageRows.length === 0 && (
                  <tr>
                    <td colSpan={COLUMNS.length} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No records match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface px-4 py-3 text-xs text-muted-foreground">
            <div>
              Showing <span className="font-semibold text-foreground">{(page - 1) * perPage + 1}</span>–
              <span className="font-semibold text-foreground">{Math.min(page * perPage, filtered.length)}</span> of{" "}
              <span className="font-semibold text-foreground">{filtered.length}</span> records
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background transition hover:bg-card disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span>
                Page <span className="font-semibold text-foreground">{page}</span> / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background transition hover:bg-card disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ icon: Icon, k, l }: { icon: any; k: string; l: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-accent" /> {l}
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{k}</div>
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs">
      <span className="font-semibold text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm font-medium outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "all" ? "All" : o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Tag({ v, tone }: { v: string; tone: "ok" | "warn" | "bad" | "muted" | "info" }) {
  const cls =
    tone === "ok" ? "bg-success/10 text-success ring-success/30" :
    tone === "warn" ? "bg-warning/10 text-warning ring-warning/30" :
    tone === "bad" ? "bg-destructive/10 text-destructive ring-destructive/30" :
    tone === "info" ? "bg-accent/15 text-accent-foreground ring-accent/30" :
    "bg-surface text-muted-foreground ring-border";
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${cls}`}>{v}</span>;
}

function payTone(p: Row["payment"]) {
  return p === "Paid" ? "ok" : p === "Overdue" ? "bad" : p === "Processing" ? "info" : "warn";
}
function riskTone(r: Row["risk"]) {
  return r === "Low" ? "ok" : r === "Medium" ? "warn" : "bad";
}
function statusTone(s: Row["status"]) {
  return s === "Closed" ? "muted" : s === "In Review" ? "warn" : "info";
}
