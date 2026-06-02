import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TEAMS } from "@/lib/wc-data";

export const Route = createFileRoute("/teams/")({
  head: () => ({
    meta: [
      { title: "Teams · World Cup 2026" },
      { name: "description", content: "Every nation at the 2026 World Cup. Tap a team to see their squad, stats, play style and recent form." },
      { property: "og:title", content: "World Cup 2026 — Teams" },
      { property: "og:description", content: "All 48 nations competing at the 2026 World Cup. Squads, stats and play styles." },
    ],
  }),
  component: TeamsIndex,
});

function TeamsIndex() {
  const [q, setQ] = useState("");
  const [conf, setConf] = useState("All");
  const confederations = useMemo(() => ["All", ...Array.from(new Set(TEAMS.map((t) => t.confederation)))], []);
  const filtered = TEAMS.filter(
    (t) => (conf === "All" || t.confederation === conf) && t.name.toLowerCase().includes(q.toLowerCase())
  ).sort((a, b) => a.fifaRank - b.fifaRank);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="border-b border-neutral-200 pb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Nations</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900">All 48 teams</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">Pick a team to open their page — squad, stats, recent form and play style, themed in their colors.</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search teams…"
          className="h-9 w-64 rounded-md border border-neutral-200 bg-white px-3 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
        />
        <select
          value={conf}
          onChange={(e) => setConf(e.target.value)}
          className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
        >
          {confederations.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <Link
            key={t.id}
            to="/teams/$teamId"
            params={{ teamId: t.id }}
            className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[40px] transition-transform group-hover:scale-110" style={{ background: t.primary }} />
            <div className="absolute right-4 top-4 h-2 w-12 rounded-full" style={{ background: t.accent }} />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{t.flag}</span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">Group {t.group} · {t.confederation}</div>
                  <div className="truncate text-lg font-semibold text-neutral-900">{t.name}</div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
                <span>FIFA #{t.fifaRank}</span>
                <span className="flex gap-1">
                  {t.recentForm.map((f, i) => (
                    <span key={i} className={`inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-semibold ${
                      f === "W" ? "bg-emerald-100 text-emerald-700" :
                      f === "D" ? "bg-neutral-100 text-neutral-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>{f}</span>
                  ))}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
