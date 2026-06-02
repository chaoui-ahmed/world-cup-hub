import { createFileRoute, Link } from "@tanstack/react-router";
import { GROUPS, MATCHES, TEAMS, TEAM_MAP, formatKickoff } from "@/lib/wc-data";
import { getInitialTimezone } from "@/components/TimezoneSelect";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "World Cup 2026 — Overview" },
      { name: "description", content: "The FIFA World Cup 2026 hub. 48 teams, 12 groups, 104 matches across USA, Canada and Mexico." },
      { property: "og:title", content: "World Cup 2026 — Overview" },
      { property: "og:description", content: "48 teams. 3 host nations. 104 matches. Your complete World Cup 2026 hub." },
    ],
  }),
  component: Index,
});

function Index() {
  const [tz] = useState<string>(() => getInitialTimezone());
  const upcoming = [...MATCHES]
    .filter((m) => new Date(m.kickoffUTC).getTime() > Date.now() - 1000 * 60 * 60 * 3)
    .sort((a, b) => +new Date(a.kickoffUTC) - +new Date(b.kickoffUTC))
    .slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              June 11 – July 19, 2026
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-neutral-900 leading-[0.95]">
              The world's<br />game, on three<br />nations.
            </h1>
            <p className="max-w-xl text-lg text-neutral-600 leading-relaxed">
              48 nations. 12 groups. 104 matches across the United States, Canada and Mexico. Your complete hub for the 2026 FIFA World Cup.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link to="/matches" className="inline-flex items-center rounded-md bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-700 transition">
                View all matches →
              </Link>
              <Link to="/teams" className="inline-flex items-center rounded-md border border-neutral-200 px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition">
                Browse teams
              </Link>
            </div>
          </div>

          {/* Stats */}
          <dl className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200">
            {[
              { k: "48", l: "Teams" },
              { k: "12", l: "Groups" },
              { k: "104", l: "Matches" },
              { k: "16", l: "Host cities" },
            ].map((s) => (
              <div key={s.l} className="bg-white p-6">
                <dt className="text-xs uppercase tracking-wider text-neutral-500">{s.l}</dt>
                <dd className="mt-1 text-3xl font-bold tracking-tight text-neutral-900">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Next matches */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Up next</h2>
            <p className="mt-1 text-sm text-neutral-500">Shown in your local time. Adjust on the matches page.</p>
          </div>
          <Link to="/matches" className="text-sm font-medium text-neutral-900 hover:underline underline-offset-4">All matches →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((m) => {
            const h = TEAM_MAP[m.homeId];
            const a = TEAM_MAP[m.awayId];
            const { date, time } = formatKickoff(m.kickoffUTC, tz);
            return (
              <div key={m.id} className="rounded-xl border border-neutral-200 p-5 hover:border-neutral-300 transition">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-500">
                  <span>{m.stage === "Group" ? `Group ${m.group}` : m.stage}</span>
                  <span>{date} · {time}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-2xl">{h?.flag}</span>
                  <span className="text-sm font-semibold text-neutral-900 flex-1 ml-2 truncate">{h?.name}</span>
                  <span className="text-xs text-neutral-400 px-2">vs</span>
                  <span className="text-sm font-semibold text-neutral-900 flex-1 text-right truncate mr-2">{a?.name}</span>
                  <span className="text-2xl">{a?.flag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Groups */}
      <section className="mx-auto max-w-7xl px-6 py-12 border-t border-neutral-200">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">All 12 groups</h2>
          <Link to="/matches" className="text-sm font-medium text-neutral-900 hover:underline underline-offset-4">Standings →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GROUPS.map((g) => {
            const teams = TEAMS.filter((t) => t.group === g);
            return (
              <div key={g} className="rounded-xl border border-neutral-200 p-5">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider text-neutral-500">Group</span>
                  <span className="text-2xl font-bold text-neutral-900">{g}</span>
                </div>
                <ul className="space-y-1.5">
                  {teams.map((t) => (
                    <li key={t.id}>
                      <Link to="/teams/$teamId" params={{ teamId: t.id }} className="flex items-center gap-2 rounded-md px-2 py-1 -mx-2 hover:bg-neutral-50">
                        <span className="text-lg">{t.flag}</span>
                        <span className="text-sm text-neutral-900 truncate flex-1">{t.name}</span>
                        <span className="text-[10px] tabular-nums text-neutral-400">#{t.fifaRank}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
