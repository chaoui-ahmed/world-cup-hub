import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MATCHES, TEAM_MAP, computeStandings, formatKickoff, squadFor, type Player } from "@/lib/wc-data";
import { TimezoneSelect, getInitialTimezone } from "@/components/TimezoneSelect";

export const Route = createFileRoute("/teams/$teamId")({
  head: ({ params }) => {
    const t = TEAM_MAP[params.teamId];
    if (!t) return { meta: [{ title: "Team not found" }] };
    return {
      meta: [
        { title: `${t.name} · World Cup 2026` },
        { name: "description", content: `${t.name} at the 2026 World Cup — Group ${t.group}, squad, stats, play style and fixtures.` },
        { property: "og:title", content: `${t.name} · World Cup 2026` },
        { property: "og:description", content: `${t.name} squad, stats and fixtures at the 2026 FIFA World Cup.` },
      ],
    };
  },
  loader: ({ params }) => {
    if (!TEAM_MAP[params.teamId]) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-neutral-900">Team not found</h1>
      <Link to="/teams" className="mt-6 inline-flex rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">Back to teams</Link>
    </main>
  ),
  component: TeamPage,
});

function TeamPage() {
  const { teamId } = Route.useParams();
  const team = TEAM_MAP[teamId];
  const [tz, setTz] = useState<string>(() => getInitialTimezone());
  const squad = squadFor(team.id);
  const fixtures = useMemo(
    () => MATCHES.filter((m) => m.homeId === team.id || m.awayId === team.id).sort((a, b) => +new Date(a.kickoffUTC) - +new Date(b.kickoffUTC)),
    [team.id]
  );
  const standings = useMemo(() => computeStandings(team.group), [team.group]);

  function setTzAndSave(v: string) {
    setTz(v);
    try { window.localStorage.setItem("wc-tz", v); } catch {}
  }

  // CSS custom property theming for this team
  const themeStyle = {
    ["--team-primary" as string]: team.primary,
    ["--team-secondary" as string]: team.secondary,
    ["--team-accent" as string]: team.accent,
  } as React.CSSProperties;

  return (
    <main style={themeStyle}>
      {/* Themed hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${team.primary} 0%, ${team.primary} 55%, ${team.accent} 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 text-white">
          <Link to="/teams" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/80 hover:text-white">
            ← All teams
          </Link>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-6xl drop-shadow">{team.flag}</span>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/80">{team.confederation} · Group {team.group}</div>
                  <h1 className="mt-1 text-5xl sm:text-6xl font-bold tracking-tight">{team.name}</h1>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-white/90 text-lg leading-relaxed">{team.style}</p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/20 backdrop-blur-sm">
              <Stat label="FIFA rank" value={`#${team.fifaRank}`} />
              <Stat label="Formation" value={team.formation} />
              <Stat label="Coach" value={team.coach} />
              <Stat label="Captain" value={team.captain} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-xs uppercase tracking-wider text-white/80">Recent form</span>
            <div className="flex gap-1.5">
              {team.recentForm.map((f, i) => (
                <span key={i} className={`inline-flex h-7 w-7 items-center justify-center rounded text-xs font-bold ${
                  f === "W" ? "bg-emerald-500 text-white" :
                  f === "D" ? "bg-white/30 text-white" :
                  "bg-rose-500 text-white"
                }`}>{f}</span>
              ))}
            </div>
            {team.titles > 0 && (
              <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                ★ {team.titles} World Cup title{team.titles > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-12 lg:grid-cols-3">
        {/* Squad */}
        <section className="lg:col-span-2">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Squad</h2>
            <span className="text-xs uppercase tracking-wider text-neutral-500">{squad.length} listed</span>
          </div>
          {squad.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500">
              Detailed squad coming soon for {team.name}.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {squad.map((p) => <PlayerCard key={p.name + p.number} player={p} accent={team.primary} />)}
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Standings */}
          <div className="rounded-xl border border-neutral-200 overflow-hidden">
            <div className="border-b border-neutral-100 px-5 py-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Group {team.group}</h3>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {standings.map((r, i) => {
                  const t = TEAM_MAP[r.teamId];
                  const me = r.teamId === team.id;
                  return (
                    <tr key={r.teamId} className={`border-b border-neutral-50 last:border-0 ${me ? "bg-neutral-50" : ""}`}>
                      <td className="py-2.5 pl-5 pr-2">
                        <Link to="/teams/$teamId" params={{ teamId: r.teamId }} className="flex items-center gap-2">
                          <span className="text-[11px] tabular-nums text-neutral-400 w-4">{i + 1}</span>
                          <span className="text-base">{t.flag}</span>
                          <span className={`truncate ${me ? "font-semibold text-neutral-900" : "text-neutral-800"}`}>{t.name}</span>
                        </Link>
                      </td>
                      <td className="py-2.5 pl-2 pr-5 text-right text-xs tabular-nums text-neutral-500">{r.pts} pts</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Fixtures */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Fixtures</h3>
              <TimezoneSelect value={tz} onChange={setTzAndSave} label="" />
            </div>
            <ul className="space-y-2">
              {fixtures.map((m) => {
                const opp = m.homeId === team.id ? TEAM_MAP[m.awayId] : TEAM_MAP[m.homeId];
                const isHome = m.homeId === team.id;
                const { date, time } = formatKickoff(m.kickoffUTC, tz);
                return (
                  <li key={m.id} className="rounded-lg border border-neutral-200 p-3">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-500">
                      <span>{m.stage === "Group" ? `Group ${m.group}` : m.stage}</span>
                      <span>{date} · {time}</span>
                    </div>
                    <Link to="/teams/$teamId" params={{ teamId: opp.id }} className="mt-1 flex items-center gap-2 hover:underline underline-offset-4">
                      <span className="text-xs text-neutral-400">{isHome ? "vs" : "@"}</span>
                      <span className="text-base">{opp.flag}</span>
                      <span className="font-medium text-neutral-900 truncate">{opp.name}</span>
                    </Link>
                    <div className="mt-1 text-xs text-neutral-500 truncate">{m.venue}, {m.city}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 px-5 py-3 min-w-[140px]">
      <div className="text-[10px] uppercase tracking-wider text-white/70">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function PlayerCard({ player, accent }: { player: Player; accent: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 hover:border-neutral-300 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded px-1.5 text-[11px] font-bold text-white" style={{ background: accent }}>
              {player.number}
            </span>
            <span className="truncate text-base font-semibold text-neutral-900">{player.name}</span>
          </div>
          <div className="mt-1 text-xs text-neutral-500">{player.position} · age {player.age} · {player.club}</div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-neutral-400">Rating</div>
          <div className="text-lg font-bold tabular-nums text-neutral-900">{player.rating.toFixed(1)}</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-3 text-center text-xs">
        <div>
          <div className="text-neutral-400">Caps</div>
          <div className="font-semibold tabular-nums text-neutral-900">{player.caps}</div>
        </div>
        <div>
          <div className="text-neutral-400">Goals</div>
          <div className="font-semibold tabular-nums text-neutral-900">{player.goals}</div>
        </div>
        <div>
          <div className="text-neutral-400">Assists</div>
          <div className="font-semibold tabular-nums text-neutral-900">{player.assists ?? "—"}</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-600 leading-relaxed">{player.notes}</p>
    </div>
  );
}
