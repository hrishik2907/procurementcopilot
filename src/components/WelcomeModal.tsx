import { useEffect, useRef, useState } from "react";
import { UploadCloud, FileSpreadsheet, CheckCircle2, X, Loader2 } from "lucide-react";
import { markDatasetLoaded, useDatasetLoaded } from "@/lib/dataset-store";

type Phase = "idle" | "uploading" | "done";

const TABLES = [
  "Vendor Master",
  "Purchase Requisition",
  "Purchase Order",
  "Goods Receipt",
  "Invoice",
  "Payment",
];

export function WelcomeModal() {
  const { loaded, setDatasetLoaded } = useDatasetLoaded();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loaded === false) setOpen(true);
  }, [loaded]);

  const startUpload = (name?: string) => {
    setFileName(name ?? "procurement_dataset_fy26.xlsx");
    setPhase("uploading");
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / 2200) * 100));
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setPhase("done");
      }
    }, 80);
  };

  const close = () => {
    setOpen(false);
    markDatasetLoaded();
    setDatasetLoaded(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in" />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-elevated animate-scale-in">
        <button
          onClick={close}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-border bg-gradient-to-br from-accent/15 via-transparent to-transparent px-8 py-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            First-time setup
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Welcome to Procurement Copilot</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Before we begin, upload your procurement dataset.
          </p>
        </div>

        <div className="px-8 py-7">
          {phase === "idle" && (
            <>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDrag(true);
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDrag(false);
                  const f = e.dataTransfer.files?.[0];
                  startUpload(f?.name);
                }}
                className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                  drag ? "border-accent bg-accent/5" : "border-border bg-surface"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <div className="mt-4 text-sm font-medium">Drag & drop your file here</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Supported formats: Excel (.xlsx), CSV
                </div>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-95"
                >
                  <UploadCloud className="h-4 w-4" />
                  Upload Dataset
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".xlsx,.csv"
                  className="hidden"
                  onChange={(e) => startUpload(e.target.files?.[0]?.name)}
                />
                <div className="mt-5 text-[11px] text-muted-foreground">
                  This upload is currently a prototype. No backend required.
                </div>
              </div>
            </>
          )}

          {phase === "uploading" && (
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-accent" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{fileName}</div>
                  <div className="text-xs text-muted-foreground">Parsing tables & validating schema…</div>
                </div>
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent/70 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-right text-xs text-muted-foreground">{progress}%</div>
            </div>
          )}

          {phase === "done" && (
            <div>
              <div className="flex items-start gap-3 rounded-2xl border border-success/30 bg-success/5 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
                <div>
                  <div className="text-sm font-semibold">Dataset Uploaded Successfully</div>
                  <div className="text-xs text-muted-foreground">
                    Rows Loaded: <span className="font-medium text-foreground">5,248</span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tables Loaded
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {TABLES.map((t, i) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-xs animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      <span className="truncate">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={close}
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
