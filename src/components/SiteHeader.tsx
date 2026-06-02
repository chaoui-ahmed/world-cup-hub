import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  const linkBase = "px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-md";
  const active = { className: "px-3 py-2 text-sm font-semibold text-neutral-900 bg-neutral-100 rounded-md" };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-white text-sm font-bold">26</div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">FIFA</span>
            <span className="text-sm font-semibold tracking-tight text-neutral-900">World Cup 2026</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className={linkBase} activeProps={active} activeOptions={{ exact: true }}>Overview</Link>
          <Link to="/matches" className={linkBase} activeProps={active}>Matches</Link>
          <Link to="/injuries" className={linkBase} activeProps={active}>Injuries</Link>
          <Link to="/teams" className={linkBase} activeProps={active}>Teams</Link>
        </nav>
      </div>
    </header>
  );
}
