import { Link } from "@tanstack/react-router";

const FIFA_LOGO_URL =
  "https://digitalhub.fifa.com/transform/6ce78d8a-6b80-4965-88f5-9b2f6ef3e3d6/FIFA-World-Cup-26-Emblem-Product-Creative-Elements-1";

export function SiteHeader() {
  const linkBase =
    "px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-md";
  const active = {
    className: "px-3 py-2 text-sm font-semibold text-neutral-900 bg-neutral-100 rounded-md",
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={FIFA_LOGO_URL}
            alt="FIFA World Cup 26 emblem"
            className="h-9 w-auto"
            loading="eager"
            decoding="async"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">FIFA</span>
            <span className="text-sm font-semibold tracking-tight text-neutral-900">World Cup 26</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className={linkBase} activeProps={active} activeOptions={{ exact: true }}>
            Overview
          </Link>
          <Link to="/matches" className={linkBase} activeProps={active}>Matches</Link>
          <Link to="/map" className={linkBase} activeProps={active}>Map</Link>
          <Link to="/injuries" className={linkBase} activeProps={active}>Injuries</Link>
          <Link to="/teams" className={linkBase} activeProps={active}>Teams</Link>
        </nav>
      </div>
    </header>
  );
}
