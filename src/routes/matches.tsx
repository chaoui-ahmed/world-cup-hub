import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GROUPS, MATCHES, TEAMS, TEAM_MAP, computeStandings } from "@/lib/wc-data";
import { MatchCard } from "@/components/MatchCard";
import { TimezoneSelect, getInitialTimezone } from "@/components/TimezoneSelect";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Matches & Groups · World Cup 2026" },
      { name: "description", content: "Every World Cup 2026 fixture in your local timezone, with live group standings across all 12 groups." },
      { property: "og:title", content: "World Cup 2026 — Matches & Groups" },
      { property: "og:description", content: "Full schedule, kickoff times in your timezone, groups and standings." },
    ],
  }),
  component: MatchesPage,
});

function MatchesPage() {
  const [tz, setTz] = useState<string>(() => getInitialTimezone());
  const [stage, setStage] = useState<"All" | "Group" | "R32" | "R16" | "QF" | "SF" | "Final">("All");
  const [groupFilter, setGroupFilter] = useState<string>("All");
  const [teamFilter, setTeamFilter] = useState<string>("All");

  function setTzAndSave(v: string) {
    setTz(v);
    try { window.localStorage.setItem("wc-tz", v); } catch {}
  }

  const grouped = useMemo(() => {
    const filtered = MATCHES.filter((m) => {
      if (stage !== "All" && m.stage !== stage) return false;
      if (groupFilter !== "All" && m.group !== groupFilter) return false;
      if (teamFilter !== "All" && m.homeId !== teamFilter && m.awayId !== teamFilter) return false;
      return true;
    }).sort((a, b) => +new Date(a.kickoffUTC) - +new Date(b.kickoffUTC));

    const buckets: Record<string, typeof MATCHES> = {};
    filtered.forEach((m) => {
      const d = new Date(m.kickoffUTC);
      const key = d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", timeZone: tz });
      (buckets[key] ||= []).push(m);
    });
    return buckets;
  }, [stage, groupFilter, teamFilter, tz]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Fixtures</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900">Every match. Your time.</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Times displayed in <span className="font-medium text-neutral-700">{tz === "Europe/Paris" ? "Heure de Paris (CEST)" : tz}</span>. Change the timezone anytime.
          </p>
        </div>
        <TimezoneSelect value={tz} onChange={setTzAndSave} />
      </header>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Selector label="Stage" value={stage} onChange={(v) => setStage(v as typeof stage)} options={["All","Group","R32","R16","QF","SF","Final"]} />
        <Selector label="Group" value={groupFilter} onChange={setGroupFilter} options={["All", ...GROUPS]} />
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none"
        >
          <option value="All">All teams</option>
          {TEAMS.map((t) => <option key={t.id} value={t.id}>{t.flag} {t.name}</option>)}
        </select>
      </div>

      {/* Matches grouped by day */}
      <section className="mt-10 space-y-12">
        {Object.entries(grouped).length === 0 && (
          <p className="text-sm text-neutral-500">No matches match these filters.</p>
        )}
        {Object.entries(grouped).map(([day, list]) => (
          <div key={day}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">{day}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => <MatchCard key={m.id} match={m} tz={tz} />)}
            </div>
          </div>
        ))}
      </section>

      {/* Standings */}
      <section className="mt-20 border-t border-neutral-200 pt-12">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Groups & standings</h2>
        <p className="mt-1 text-sm text-neutral-500">Top 2 of each group, plus 8 best third-placed teams, advance to the round of 32.</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {GROUPS.map((g) => <StandingsTable key={g} group={g} />)}
        </div>
      </section>
    </main>
  );
}

function Selector({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="flex items-center gap-2 text-sm text-neutral-600">
      <span className="text-xs uppercase tracking-wider text-neutral-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function StandingsTable({ group }: { group: string }) {
  const rows = computeStandings(group);
  return (
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
      <div className="flex items-baseline justify-between border-b border-neutral-100 px-5 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Group {group}</h3>
      </div>
      <table className="w-full text-sm">
        <thead className="text-[11px] uppercase tracking-wider text-neutral-500">
          <tr className="border-b border-neutral-100">
            <th className="py-2 pl-5 pr-2 text-left font-medium">Team</th>
            <th className="px-2 py-2 text-right font-medium tabular-nums">P</th>
            <th className="px-2 py-2 text-right font-medium tabular-nums">W</th>
            <th className="px-2 py-2 text-right font-medium tabular-nums">D</th>
            <th className="px-2 py-2 text-right font-medium tabular-nums">L</th>
            <th className="px-2 py-2 text-right font-medium tabular-nums">GD</th>
            <th className="py-2 pl-2 pr-5 text-right font-medium tabular-nums">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const t = TEAM_MAP[r.teamId];
            return (
              <tr key={r.teamId} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50">
                <td className="py-2.5 pl-5 pr-2">
                  <Link to="/teams/$teamId" params={{ teamId: r.teamId }} className="flex items-center gap-2">
                    <span className="text-[11px] tabular-nums text-neutral-400 w-4">{i + 1}</span>
                    <span className="text-base">{t.flag}</span>
                    <span className="font-medium text-neutral-900 truncate">{t.name}</span>
                  </Link>
                </td>
                <td className="px-2 py-2.5 text-right tabular-nums">{r.played}</td>
                <td className="px-2 py-2.5 text-right tabular-nums">{r.wins}</td>
                <td className="px-2 py-2.5 text-right tabular-nums">{r.draws}</td>
                <td className="px-2 py-2.5 text-right tabular-nums">{r.losses}</td>
                <td className="px-2 py-2.5 text-right tabular-nums">{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                <td className="py-2.5 pl-2 pr-5 text-right font-semibold tabular-nums">{r.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
