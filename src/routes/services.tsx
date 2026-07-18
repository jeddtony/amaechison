import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Boxes, Package, Truck, Check } from "lucide-react";

import serviceFreightAsset from "@/assets/service-freight.jpg.asset.json";
import serviceCourierAsset from "@/assets/service-courier.jpg.asset.json";
import serviceMovingAsset from "@/assets/service-moving.jpg.asset.json";

const serviceFreight = serviceFreightAsset.url;
const serviceCourier = serviceCourierAsset.url;
const serviceMoving = serviceMovingAsset.url;
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Freight, Courier & Moving | Amaechison" },
      { name: "description", content: "Freight, same-day courier and moving services across Stockholm and Sweden. Palletised freight, urgent parcels and full-service home and office moves." },
      { property: "og:title", content: "Services — Amaechison" },
      { property: "og:description", content: "Freight, courier and moving services across Stockholm and Sweden." },
    ],
  }),
  component: ServicesPage,
});

const catalogMeta = [
  { id: "freight", icon: Boxes, image: serviceFreight },
  { id: "courier", icon: Package, image: serviceCourier },
  { id: "moving", icon: Truck, image: serviceMoving },
] as const;

function ServicesPage() {
  const t = useT();
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 lg:px-10 lg:pb-24 lg:pt-32">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{t("services.kicker")}</p>
          <h1 className="mt-6 max-w-3xl text-5xl md:text-7xl">{t("services.title")}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t("services.lead")}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {catalogMeta.map((s, idx) => {
          const kicker = t(`services.${s.id}.kicker`);
          const title = t(`services.${s.id}.title`);
          const lead = t(`services.${s.id}.lead`);
          const bullets = [1, 2, 3, 4].map((n) => t(`services.${s.id}.b${n}`));
          return (
          <section
            key={s.id}
            id={s.id}
            className="grid gap-12 border-b border-border/60 py-20 lg:grid-cols-2 lg:gap-20 lg:py-32"
          >
            <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
              <div className="overflow-hidden">
                <img
                  src={s.image}
                  alt={title}
                  loading="lazy"
                  width={1200}
                  height={1400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
                <s.icon className="h-4 w-4" />
                {kicker}
              </div>
              <h2 className="mt-6 text-4xl md:text-5xl">{title}</h2>
              <p className="mt-6 text-muted-foreground">{lead}</p>
              <ul className="mt-8 space-y-3">
                {bullets.map((b) => (
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
          </section>
          );
        })}
      </div>
    </>
  );
}