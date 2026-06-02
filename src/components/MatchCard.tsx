import { Link } from "@tanstack/react-router";
import { formatKickoff, TEAM_MAP, type Match } from "@/lib/wc-data";

export function MatchCard({ match, tz }: { match: Match; tz: string }) {
  const home = TEAM_MAP[match.homeId];
  const away = TEAM_MAP[match.awayId];
  const { date, time } = formatKickoff(match.kickoffUTC, tz);
  const stageLabel =
    match.stage === "Group" ? `Group ${match.group}` :
    match.stage === "R32" ? "Round of 32" :
    match.stage === "R16" ? "Round of 16" :
    match.stage === "QF" ? "Quarter-final" :
    match.stage === "SF" ? "Semi-final" :
    match.stage === "Final" ? "Final" :
    match.stage;

  if (!home || !away) return null;

  return (
    <article className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow-sm">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-500">
        <span>{stageLabel}</span>
        <span>{date}</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <Link to="/teams/$teamId" params={{ teamId: home.id }} className="flex flex-1 items-center gap-3 min-w-0">
          <span className="text-2xl">{home.flag}</span>
          <span className="truncate text-base font-semibold text-neutral-900 group-hover:underline underline-offset-4">{home.name}</span>
        </Link>
        <div className="flex shrink-0 flex-col items-center px-3">
          <span className="text-lg font-bold tabular-nums text-neutral-900">{time}</span>
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">vs</span>
        </div>
        <Link to="/teams/$teamId" params={{ teamId: away.id }} className="flex flex-1 items-center justify-end gap-3 min-w-0">
          <span className="truncate text-right text-base font-semibold text-neutral-900 group-hover:underline underline-offset-4">{away.name}</span>
          <span className="text-2xl">{away.flag}</span>
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
        <span className="truncate">{match.venue}</span>
        <span className="shrink-0">{match.city}</span>
      </div>
    </article>
  );
}
