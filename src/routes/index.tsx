import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Truck, Package, Boxes } from "lucide-react";

import heroTruckAsset from "@/assets/hero-truck.jpg.asset.json";
import serviceFreightAsset from "@/assets/service-freight.jpg.asset.json";
import serviceCourierAsset from "@/assets/service-courier.jpg.asset.json";
import serviceMovingAsset from "@/assets/service-moving.jpg.asset.json";

const heroTruck = heroTruckAsset.url;
const serviceFreight = serviceFreightAsset.url;
const serviceCourier = serviceCourierAsset.url;
const serviceMoving = serviceMovingAsset.url;
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Promise />
      <CtaBanner />
    </>
  );
}

function Hero() {
  const t = useT();
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroTruck}
          alt="Amaechison"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-32 lg:px-10 lg:pb-40 lg:pt-44">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
            <span className="inline-block h-px w-10 bg-gold" />
            {t("home.hero.kicker")}
          </p>
          <h1 className="mt-8 text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
            {t("home.hero.title1")} <em className="text-gradient-gold not-italic">{t("home.hero.title2")}</em>
            <br />
            {t("home.hero.title3")}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("home.hero.lead")}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-gold px-6 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-gold-soft"
            >
              {t("cta.requestQuote")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-border px-6 py-4 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {t("home.hero.explore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const t = useT();
  const items = ["Stockholm", "Uppsala", "Göteborg", "Malmö", t("home.marquee.nationwide"), t("home.marquee.sameDay"), t("home.marquee.insured")];
  return (
    <div className="border-y border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:px-10">
        {items.map((it, i) => (
          <span key={it} className="flex items-center gap-10">
            {it}
            {i < items.length - 1 && <span className="text-gold/60">◆</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

const serviceMeta = [
  { key: "freight", icon: Boxes, kicker: "01", image: serviceFreight },
  { key: "courier", icon: Package, kicker: "02", image: serviceCourier },
  { key: "moving", icon: Truck, kicker: "03", image: serviceMoving },
] as const;

function Services() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{t("home.services.kicker")}</p>
          <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">{t("home.services.title")}</h2>
        </div>
        <Link to="/services" className="text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-soft">
          {t("home.services.viewAll")}
        </Link>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {serviceMeta.map(({ key, icon: Icon, kicker, image }) => {
          const title = t(`home.services.${key}.title`);
          const desc = t(`home.services.${key}.desc`);
          return (
          <article key={key} className="group relative overflow-hidden border border-border/60 bg-card">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={image}
                alt={title}
                loading="lazy"
                width={1200}
                height={1400}
                className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <span className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.3em] text-gold">{kicker}</span>
              <Icon className="absolute right-6 top-6 h-5 w-5 text-gold" />
            </div>
            <div className="relative -mt-16 space-y-4 p-8">
              <h3 className="text-3xl">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <Link to="/services" className="inline-flex items-center gap-2 pt-2 text-xs uppercase tracking-[0.25em] text-gold">
                {t("home.services.learnMore")} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

function Promise() {
  const t = useT();
  const points = [
    { n: "24/7", label: t("home.promise.dispatch") },
    { n: "100%", label: t("home.promise.insured") },
    { n: "SE", label: t("home.promise.nationwide") },
    { n: "B2B/B2C", label: t("home.promise.customers") },
  ];
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-4 lg:px-10">
        {points.map((p) => (
          <div key={p.label} className="border-l border-gold/40 pl-6">
            <div className="font-display text-5xl text-gold">{p.n}</div>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="relative overflow-hidden border border-gold/40 bg-gradient-to-br from-card to-background p-10 lg:p-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{t("home.cta.kicker")}</p>
            <h2 className="mt-6 text-4xl md:text-6xl">{t("home.cta.title")}</h2>
            <p className="mt-6 max-w-lg text-muted-foreground">{t("home.cta.desc")}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-gold px-6 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-gold-soft"
            >
              {t("cta.requestQuote")} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      </div>
    </section>
  );
}
