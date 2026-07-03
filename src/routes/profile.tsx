import { createFileRoute } from "@tanstack/react-router";
import { Mail, Building2, MapPin, Shield } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · Procurement Copilot" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Account" title="Profile" description="Your personal workspace settings and preferences." />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="h-28 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent" />
          <div className="-mt-12 px-6 pb-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-foreground text-2xl font-semibold text-background ring-4 ring-card">SK</div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-xl font-semibold tracking-tight">Hrishik Marfatia</div>
                <div className="text-sm text-muted-foreground">Procurement Lead · Acme Industries</div>
              </div>
              <button className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background">Edit profile</button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Field i={Mail} k="Email" v="sara.klein@acme.com" />
              <Field i={Building2} k="Department" v="Indirect Procurement" />
              <Field i={MapPin} k="Region" v="EMEA · Frankfurt" />
              <Field i={Shield} k="Role" v="Admin · Approver" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="text-sm font-semibold">Preferences</div>
          <div className="mt-3 space-y-3 text-sm">
            {[
              ["Daily AI digest", "Get a morning email with overnight insights."],
              ["Risk alerts", "Notify me when a supplier crosses a high-risk threshold."],
              ["Report subscriptions", "Auto-send executive reports each quarter."],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-xl border border-border bg-surface p-3">
                <div><div className="font-medium">{k}</div><div className="text-xs text-muted-foreground">{v}</div></div>
                <span className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-foreground transition">
                  <span className="ml-5 h-5 w-5 rounded-full bg-background shadow-soft" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ i: I, k, v }: any) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground"><I className="h-3.5 w-3.5" /> {k}</div>
      <div className="mt-1 text-sm font-medium">{v}</div>
    </div>
  );
}
