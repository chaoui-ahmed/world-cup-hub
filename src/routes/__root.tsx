import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold tracking-tight text-neutral-900">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-neutral-900">Page not found</h2>
        <p className="mt-2 text-sm text-neutral-500">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
            Back to overview
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">This page didn't load</h1>
        <p className="mt-2 text-sm text-neutral-500">Something went wrong. Try refreshing.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "World Cup 2026 — Matches, Teams & Injuries" },
      { name: "description", content: "Complete World Cup 2026 hub: full schedule with timezone, groups, standings, injury reports and team pages with squads, stats and play styles." },
      { property: "og:title", content: "World Cup 2026 — Matches, Teams & Injuries" },
      { property: "og:description", content: "Schedule, groups, standings, injuries and team pages for the 2026 FIFA World Cup." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <Outlet />
        <footer className="border-t border-neutral-200 mt-24">
          <div className="mx-auto max-w-7xl px-6 py-10 text-xs text-neutral-500 flex flex-wrap items-center justify-between gap-4">
            <span>FIFA World Cup 2026 · Hosted by USA · Canada · Mexico</span>
            <span>June 11 – July 19, 2026</span>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
