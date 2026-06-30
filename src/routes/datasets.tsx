import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Database, UploadCloud, FileSpreadsheet, CheckCircle2, Loader2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/datasets")({
  head: () => ({ meta: [{ title: "Dataset Center · Procurement Copilot" }] }),
  component: DatasetsPage,
});

const DATASETS = [
  { n: "FY26 Procurement Master", r: 5248, t: "Excel", date: "Today", status: "Active" },
  { n: "FY25 Procurement Master", r: 4892, t: "Excel", date: "Jan 8, 2026", status: "Archived" },
  { n: "APAC Spend Extract", r: 1342, t: "CSV", date: "Dec 19, 2026", status: "Active" },
];

function DatasetsPage() {
  const [uploading, setUploading] = useState(false);

  const simulate = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success("Dataset uploaded", { description: "5,248 rows · 6 tables ingested" });
    }, 1800);
  };

  return (
    <AppShell>
      <PageHeader eyebrow="Data" title="Dataset Center" description="Upload and manage procurement datasets across the organization." />
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center shadow-soft">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground"><UploadCloud className="h-6 w-6" /></div>
          <div className="mt-3 text-sm font-semibold">Upload a new procurement dataset</div>
          <div className="mt-1 text-xs text-muted-foreground">Excel or CSV · Up to 50MB · Prototype upload</div>
          <button onClick={simulate} disabled={uploading} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-glow disabled:opacity-60">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            {uploading ? "Uploading…" : "Upload Dataset"}
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold"><Database className="h-4 w-4" /> Available datasets</div>
            <span className="text-xs text-muted-foreground">{DATASETS.length} datasets</span>
          </div>
          <div className="divide-y divide-border">
            {DATASETS.map((d) => (
              <div key={d.n} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface ring-1 ring-border"><FileSpreadsheet className="h-4 w-4" /></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{d.n}</div>
                  <div className="text-xs text-muted-foreground">{d.r.toLocaleString()} rows · {d.t} · {d.date}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${d.status === "Active" ? "bg-success/10 text-success" : "bg-surface text-muted-foreground"}`}>
                  {d.status === "Active" && <CheckCircle2 className="mr-1 inline h-3 w-3" />}
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
