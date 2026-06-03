import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { HOST_CITIES, MATCHES, TEAM_MAP, formatKickoff, DEFAULT_TZ, type HostCity } from "@/lib/wc-data";
import { TimezoneSelect, getInitialTimezone } from "@/components/TimezoneSelect";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Host Cities Map · World Cup 2026" },
      { name: "description", content: "Interactive map of the 16 World Cup 2026 host cities across the USA, Canada and Mexico. Click any city to see its fixtures." },
      { property: "og:title", content: "World Cup 2026 — Host Cities Map" },
      { property: "og:description", content: "Explore all 16 host cities and filter the schedule by venue." },
    ],
  }),
  component: MapPage,
});

// Bounding box covering NA host territory.
const BOUNDS = { latMin: 18, latMax: 51, lngMin: -125, lngMax: -73 };

function project(c: HostCity) {
  const x = ((c.lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * 100;
  const y = ((BOUNDS.latMax - c.lat) / (BOUNDS.latMax - BOUNDS.latMin)) * 100;
  return { x, y };
}

function MapPage() {
  const [tz, setTz] = useState(() => getInitialTimezone());
  const [selected, setSelected] = useState<string | null>(null);

  function setTzAndSave(v: string) {
    setTz(v);
    try { window.localStorage.setItem("wc-tz", v); } catch {}
  }

  const filtered = useMemo(
    () => MATCHES.filter((m) => !selected || m.venueId === selected)
      .sort((a, b) => +new Date(a.kickoffUTC) - +new Date(b.kickoffUTC)),
    [selected]
  );

  const selectedCity = selected ? HOST_CITIES.find((c) => c.id === selected) ?? null : null;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Host cities</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900">
            16 cities. 3 nations. <span className="text-neutral-400">One tournament.</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-500">
            Click a city on the map to filter the schedule by venue. Times are shown in {" "}
            <span className="font-medium text-neutral-700">{tz === DEFAULT_TZ ? "Heure de Paris" : tz}</span>.
          </p>
        </div>
        <TimezoneSelect value={tz} onChange={setTzAndSave} />
      </header>

      {/* Map */}
      <section className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white overflow-hidden">
          <div className="relative aspect-[16/11] w-full">
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Country labels */}
            <span className="absolute left-[10%] top-[12%] text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">Canada</span>
            <span className="absolute left-[35%] top-[44%] text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">United States</span>
            <span className="absolute left-[28%] top-[82%] text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">Mexico</span>

            {/* Dots */}
            {HOST_CITIES.map((c) => {
              const { x, y } = project(c);
              const active = selected === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(active ? null : c.id)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  aria-label={`${c.city} — ${c.stadium}`}
                >
                  <span className={`relative block h-3 w-3 rounded-full ring-4 transition ${active ? "bg-neutral-900 ring-neutral-900/15" : "bg-neutral-900 ring-neutral-900/0 group-hover:ring-neutral-900/10"}`}>
                    {active && <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-neutral-900/30" />}
                  </span>
                  <span className={`absolute left-1/2 top-3 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-0.5 text-[10px] font-medium transition ${active ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-700 group-hover:border-neutral-300"}`}>
                    {c.city}
                  </span>
                </button>
              );
            })}
          </div>
          {selected && (
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Clear filter ×
            </button>
          )}
        </div>

        {/* City detail / list */}
        <div className="space-y-3">
          {selectedCity ? (
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-[11px] uppercase tracking-wider text-neutral-500">{selectedCity.country}</p>
              <h2 className="mt-1 text-2xl font-bold text-neutral-900">{selectedCity.city}</h2>
              <p className="mt-1 text-sm text-neutral-600">{selectedCity.stadium}</p>
              <p className="mt-3 text-xs text-neutral-500">Capacity · {selectedCity.capacity.toLocaleString()}</p>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-200 p-5 text-sm text-neutral-500">
              Select a city on the map to see its dedicated fixtures, or browse all 16 venues below.
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {HOST_CITIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id === selected ? null : c.id)}
                className={`rounded-lg border p-3 text-left transition ${selected === c.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300"}`}
              >
                <div className="text-[10px] uppercase tracking-wider opacity-70">{c.country}</div>
                <div className="mt-0.5 text-sm font-semibold">{c.city}</div>
                <div className="text-[11px] opacity-70 truncate">{c.stadium}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fixtures filtered */}
      <section className="mt-12">
        <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            {selectedCity ? `Fixtures at ${selectedCity.stadium}` : "All fixtures"}
          </h2>
          <span className="text-xs uppercase tracking-wider text-neutral-500">{filtered.length} matches</span>
        </div>
        {filtered.length === 0 ? (
          <p className="mt-6 text-sm text-neutral-500">No matches scheduled at this venue yet.</p>
        ) : (
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {filtered.map((m) => {
              const h = TEAM_MAP[m.homeId];
              const a = TEAM_MAP[m.awayId];
              const { date, time } = formatKickoff(m.kickoffUTC, tz);
              if (!h || !a) return null;
              return (
                <li key={m.id} className="rounded-xl border border-neutral-200 bg-white p-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-500">
                    <span>{m.stage === "Group" ? `Group ${m.group}` : m.stage}</span>
                    <span>{date} · {time}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <Link to="/teams/$teamId" params={{ teamId: h.id }} className="flex flex-1 items-center gap-2 min-w-0 hover:underline underline-offset-4">
                      <span className="text-xl">{h.flag}</span>
                      <span className="truncate text-sm font-semibold text-neutral-900">{h.name}</span>
                    </Link>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400">vs</span>
                    <Link to="/teams/$teamId" params={{ teamId: a.id }} className="flex flex-1 items-center justify-end gap-2 min-w-0 hover:underline underline-offset-4">
                      <span className="truncate text-right text-sm font-semibold text-neutral-900">{a.name}</span>
                      <span className="text-xl">{a.flag}</span>
                    </Link>
                  </div>
                  <div className="mt-2 truncate text-xs text-neutral-500">{m.venue} · {m.city}</div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
