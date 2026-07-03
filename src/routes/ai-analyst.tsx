import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, User, Brain, Lightbulb, TrendingDown, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/ai-analyst")({
  head: () => ({ meta: [{ title: "Jarvis · AI Procurement Analyst · Procurement Copilot" }] }),
  component: AnalystPage,
});

type Msg = { role: "user" | "ai"; text: string; typing?: boolean };

const SUGGESTIONS = [
  "Why did maverick spend increase last month?",
  "Which suppliers are at highest risk of disruption?",
  "Explain the rise in IT Services costs in Q4.",
  "Suggest 3 actions to reduce PO cycle time.",
];

const SAMPLE = `Maverick spend rose by 1.9% in October, driven primarily by IT Services (+4.2%).

Root cause analysis:
• 14 off-contract POs were raised against Vertex IT Services, bypassing the preferred-supplier framework.
• 9 of these POs originated from the Engineering cost center after the framework agreement expired on Oct 3.
• Approval thresholds were not updated, allowing requisitions under ₹ 20 Lakh to skip category-manager review.

Recommended actions:
1. Renew the Vertex framework agreement (saving an estimated ₹ 2.48 Cr annually vs spot rates).
2. Lower auto-approval threshold for IT Services to ₹ 8 Lakh until the contract is in place.
3. Notify the 6 requisitioners with off-contract activity and route future POs via the catalog.

Estimated impact: −₹ 3.35 Cr run-rate maverick spend, +2.1 days faster PO cycle in IT Services.`;

function AnalystPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi Hrishik — Jarvis here. I've ingested your FY2024–FY2026 procurement dataset (5,248 rows across 12 tables). Ask me anything about spend, suppliers, contracts or risk." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: "", typing: true }]);
      let i = 0;
      const id = setInterval(() => {
        i += 6;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "ai", text: SAMPLE.slice(0, i), typing: i < SAMPLE.length };
          return copy;
        });
        if (i >= SAMPLE.length) {
          clearInterval(id);
          setBusy(false);
        }
      }, 18);
    }, 500);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Decision support"
        title="Meet Jarvis · AI Procurement Analyst"
        description="Ask Jarvis in plain English. It explains why business events happened and recommends what to improve — grounded in your enterprise dataset."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Chat */}
        <div className="lg:col-span-8">
          <div className="flex h-[70vh] flex-col rounded-2xl border border-border bg-card shadow-soft">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground"><Sparkles className="h-4 w-4" /></div>
              <div>
                <div className="text-sm font-semibold">Jarvis · Procurement Decision Engine</div>
                <div className="text-[11px] text-muted-foreground">Connected to FY2024–FY2026 dataset · Reasoning enabled</div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                  {m.role === "ai" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background"><Sparkles className="h-4 w-4" /></div>
                  )}
                  <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm shadow-soft ${
                    m.role === "user" ? "bg-foreground text-background" : "bg-surface text-foreground"
                  }`}>
                    <span className={m.typing ? "typing-caret" : ""}>{m.text}</span>
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"><User className="h-4 w-4" /></div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-border p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-muted-foreground transition hover:border-foreground/30 hover:text-foreground">
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-accent/40"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Jarvis why, what, or how…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button type="submit" disabled={busy} className="inline-flex items-center gap-1 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background disabled:opacity-50">
                  Ask Jarvis <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4 lg:col-span-4">
          <Card icon={Brain} title="How Jarvis reasons">
            Jarvis correlates spend, supplier and process data, then uses LLM reasoning to explain causes and recommend actions grounded in your enterprise dataset.
          </Card>
          <Card icon={Lightbulb} title="Jarvis recommendations today">
            <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />Renew Vertex IT framework — save ~₹ 2.48 Cr/yr</li>
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />Consolidate 3 logistics suppliers into 1</li>
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />Lower IT auto-approval threshold to ₹ 8 Lakh</li>
            </ul>
          </Card>
          <Card icon={ShieldAlert} title="Jarvis watchlist">
            <div className="mt-2 space-y-2 text-xs">
              <Row k="Vertex IT Services" v="High" tone="bad" />
              <Row k="Helix Logistics" v="Medium" tone="warn" />
              <Row k="Northwind Materials" v="Low" tone="ok" />
            </div>
          </Card>
          <Card icon={TrendingDown} title="Estimated impact">
            <div className="mt-2 grid grid-cols-2 gap-2 text-center">
              <Stat k="−₹ 3.35 Cr" v="Maverick spend" />
              <Stat k="+2.1d" v="Faster PO cycle" />
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Card({ icon: Icon, title, children }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface ring-1 ring-border"><Icon className="h-4 w-4" /></div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
function Row({ k, v, tone }: any) {
  const cls = tone === "bad" ? "bg-destructive/10 text-destructive" : tone === "warn" ? "bg-warning/10 text-warning" : "bg-success/10 text-success";
  return <div className="flex items-center justify-between"><span>{k}</span><span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}>{v}</span></div>;
}
function Stat({ k, v }: any) {
  return <div className="rounded-xl border border-border bg-surface p-3"><div className="text-base font-semibold">{k}</div><div className="text-[11px] text-muted-foreground">{v}</div></div>;
}
