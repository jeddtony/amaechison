import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Wrench, LayoutGrid, Check } from "lucide-react";
import serviceOffice from "@/assets/service-office.jpeg";
import serviceMaintenance from "@/assets/service-maintenance.jpeg";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/property-maintenance")({
  head: () => ({
    meta: [
      { title: "Property Maintenance & Repairs | Amaechison" },
      { name: "description", content: "Reliable property maintenance for homeowners, landlords, property managers and businesses across Stockholm and Sweden. General repairs, upkeep, inspections and improvement projects." },
      { property: "og:title", content: "Property Maintenance — Amaechison" },
      { property: "og:description", content: "Reliable property maintenance for residential and commercial properties across Sweden." },
    ],
  }),
  component: PropertyMaintenancePage,
});

function PropertyMaintenancePage() {
  const t = useT();
  const bullets = [5, 1, 2, 3, 4].map((n) => t(`services.maintenance.b${n}`));
  const officeBullets = [1, 2, 3, 4].map((n) => t(`propertyPage.office.b${n}`));

  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 lg:px-10 lg:pb-24 lg:pt-32">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
            <Wrench className="h-4 w-4" />
            {t("services.maintenance.kicker")}
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl md:text-7xl">{t("services.maintenance.title")}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t("services.maintenance.lead")}</p>
          <div className="mt-10">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-gold px-6 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-gold-soft"
            >
              {t("cta.requestQuote")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:py-28">
          <div>
            <h2 className="text-3xl md:text-4xl">{t("propertyPage.who.title")}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t("propertyPage.who.p1")}</p>
          </div>
          <div className="overflow-hidden">
            <img
              src={serviceMaintenance}
              alt={t("propertyPage.who.title")}
              loading="lazy"
              width={1200}
              height={1400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:py-28">
          <div className="overflow-hidden lg:order-1">
            <img
              src={serviceOffice}
              alt={t("propertyPage.office.title")}
              loading="lazy"
              width={1200}
              height={1400}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lg:order-2">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
              <LayoutGrid className="h-4 w-4" />
              {t("propertyPage.office.kicker")}
            </div>
            <h2 className="mt-6 text-3xl md:text-4xl">{t("propertyPage.office.title")}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t("propertyPage.office.lead")}</p>
            <ul className="mt-8 space-y-3">
              {officeBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-gold" />
                  <span className="text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 border border-gold/70 px-6 py-4 text-xs uppercase tracking-[0.22em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
              >
                {t("cta.requestQuote")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <h2 className="max-w-2xl text-3xl md:text-4xl">{t("propertyPage.included.title")}</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-4 text-base">
                <Check className="mt-1 h-5 w-5 flex-none text-gold" />
                <span className="text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 border border-border/60 bg-card/30 p-8 sm:flex-row sm:items-center lg:p-10">
          <p className="text-lg text-foreground/90">{t("propertyPage.crossLink")}</p>
          <Link
            to="/services"
            className="group inline-flex flex-none items-center gap-3 border border-gold/70 px-6 py-4 text-xs uppercase tracking-[0.22em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            {t("nav.services")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
