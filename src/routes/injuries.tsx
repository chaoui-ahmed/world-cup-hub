import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { INJURIES, TEAMS, TEAM_MAP } from "@/lib/wc-data";

export const Route = createFileRoute("/injuries")({
  head: () => ({
    meta: [
      { title: "Injury Report · World Cup 2026" },
      { name: "description", content: "Up-to-date injury reports for the 2026 FIFA World Cup. Status, expected return and team for each player." },
      { property: "og:title", content: "World Cup 2026 — Injury Report" },
      { property: "og:description", content: "Status and expected return for every notable injury at the 2026 World Cup." },
    ],
  }),
  component: InjuriesPage,
});

function InjuriesPage() {
  const [status, setStatus] = useState<"All" | "Out" | "Doubtful" | "Returning">("All");
  const [teamId, setTeamId] = useState<string>("All");

  const filtered = useMemo(
    () => INJURIES.filter((i) => (status === "All" || i.status === status) && (teamId === "All" || i.teamId === teamId)),
    [status, teamId]
  );

  const counts = useMemo(() => ({
    out: INJURIES.filter((i) => i.status === "Out").length,
    doubt: INJURIES.filter((i) => i.status === "Doubtful").length,
    ret: INJURIES.filter((i) => i.status === "Returning").length,
  }), []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="border-b border-neutral-200 pb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Medical room</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900">Injury report</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          Updated player availability for the tournament. Statuses change daily as squads finalize their fitness checks.
        </p>
      </header>

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
        <StatPill label="Out" value={counts.out} dot="bg-rose-500" />
        <StatPill label="Doubtful" value={counts.doubt} dot="bg-amber-500" />
        <StatPill label="Returning" value={counts.ret} dot="bg-emerald-500" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
        >
          <option value="All">All statuses</option>
          <option value="Out">Out</option>
          <option value="Doubtful">Doubtful</option>
          <option value="Returning">Returning</option>
        </select>
        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
        >
          <option value="All">All teams</option>
          {TEAMS.map((t) => <option key={t.id} value={t.id}>{t.flag} {t.name}</option>)}
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Player</th>
              <th className="px-5 py-3 text-left font-medium">Team</th>
              <th className="px-5 py-3 text-left font-medium">Injury</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
              <th className="px-5 py-3 text-left font-medium">Expected return</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inj, idx) => {
              const t = TEAM_MAP[inj.teamId];
              return (
                <tr key={idx} className="border-t border-neutral-100 hover:bg-neutral-50">
                  <td className="px-5 py-3 font-medium text-neutral-900">{inj.player}</td>
                  <td className="px-5 py-3">
                    <Link to="/teams/$teamId" params={{ teamId: inj.teamId }} className="flex items-center gap-2 text-neutral-700 hover:underline underline-offset-4">
                      <span className="text-base">{t?.flag}</span>
                      <span>{t?.name}</span>
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-neutral-600">{inj.injury}</td>
                  <td className="px-5 py-3"><StatusBadge status={inj.status} /></td>
                  <td className="px-5 py-3 text-neutral-600">{inj.expected}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-neutral-500">No injuries match the current filters.</p>
        )}
      </div>
    </main>
  );
}

function StatPill({ label, value, dot }: { label: string; value: number; dot: string }) {
  return (
    <div className="bg-white p-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {label}
      </div>
      <div className="mt-1 text-3xl font-bold tabular-nums text-neutral-900">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: "Out" | "Doubtful" | "Returning" }) {
  const styles =
    status === "Out" ? "bg-rose-50 text-rose-700 ring-rose-200" :
    status === "Doubtful" ? "bg-amber-50 text-amber-700 ring-amber-200" :
    "bg-emerald-50 text-emerald-700 ring-emerald-200";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles}`}>{status}</span>;
}
