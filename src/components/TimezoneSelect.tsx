import { TIMEZONES, DEFAULT_TZ } from "@/lib/wc-data";

export function TimezoneSelect({
  value,
  onChange,
  label = "Timezone",
}: {
  value: string;
  onChange: (tz: string) => void;
  label?: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-neutral-600">
      {label && <span className="text-xs uppercase tracking-wider text-neutral-500">{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none"
      >
        {TIMEZONES.map((tz) => (
          <option key={tz.id} value={tz.id}>{tz.label}</option>
        ))}
      </select>
    </label>
  );
}

// Default is the editorial "Heure de Paris" (Europe/Paris). Users can override
// via the selector; their choice persists in localStorage.
export function getInitialTimezone(): string {
  if (typeof window === "undefined") return DEFAULT_TZ;
  try {
    const saved = window.localStorage.getItem("wc-tz");
    if (saved) return saved;
  } catch {}
  return DEFAULT_TZ;
}
