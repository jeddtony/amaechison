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
import { I18nProvider, LanguageSwitch, useT } from "../lib/i18n";
import logoUrl from "../assets/logo.png";

function NotFoundComponent() {
  return (
    <I18nProvider>
      <NotFoundInner />
    </I18nProvider>
  );
}

function NotFoundInner() {
  const t = useT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("err.404")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("err.404.desc")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("err.goHome")}
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
    <I18nProvider>
      <ErrorInner onRetry={() => { router.invalidate(); reset(); }} />
    </I18nProvider>
  );
}

function ErrorInner({ onRetry }: { onRetry: () => void }) {
  const t = useT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("err.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("err.desc")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("err.tryAgain")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("err.goHome")}
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
      { title: "Amaechison — Freight, Courier & Moving in Stockholm" },
      { name: "description", content: "Premium freight, courier and moving services across Stockholm and nationwide Sweden. Reliable transport for private customers and businesses." },
      { name: "author", content: "Amaechison" },
      { property: "og:title", content: "Amaechison — Freight, Courier & Moving" },
      { property: "og:description", content: "Premium freight, courier and moving services across Stockholm and nationwide Sweden." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/logo.png", type: "image/png", sizes: "48x48" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
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
      <I18nProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}

function SiteHeader() {
  const t = useT();
  const linkCls = "text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-gold";
  const activeCls = "text-gold";
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="group flex items-center">
          <img src={logoUrl} alt="Amaechison" className="h-12 w-auto" />
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          <Link to="/" className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ exact: true }}>{t("nav.home")}</Link>
          <Link to="/services" className={linkCls} activeProps={{ className: activeCls }}>{t("nav.services")}</Link>
          <Link to="/about" className={linkCls} activeProps={{ className: activeCls }}>{t("nav.about")}</Link>
          <Link to="/contact" className={linkCls} activeProps={{ className: activeCls }}>{t("nav.contact")}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitch />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-gold/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            {t("cta.requestQuote")}
          </Link>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <img src={logoUrl} alt="Amaechison" className="h-12 w-auto" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold">{t("footer.services")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground">{t("footer.freight")}</Link></li>
              <li><Link to="/services" className="hover:text-foreground">{t("footer.courier")}</Link></li>
              <li><Link to="/services" className="hover:text-foreground">{t("footer.moving")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold">{t("footer.company")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">{t("footer.about")}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">{t("footer.contact")}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">{t("footer.getQuote")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Amaechison. {t("footer.rights")}</p>
          <p className="uppercase tracking-[0.25em]">{t("footer.city")}</p>
        </div>
      </div>
    </footer>
  );
}
