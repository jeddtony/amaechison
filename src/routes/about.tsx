import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Amaechison | Stockholm Transport" },
      { name: "description", content: "Amaechison is a Stockholm-based transport company handling freight, courier and moving for private customers and businesses across Sweden." },
      { property: "og:title", content: "About — Amaechison" },
      { property: "og:description", content: "A Stockholm-based transport company built on precision, care and communication." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const t = useT();
  const regions = ["Stockholm", "Uppsala", "Södertälje", "Västerås", "Göteborg", "Malmö"];
  const principles = [
    { n: "01", t: t("about.principles.1.t"), d: t("about.principles.1.d") },
    { n: "02", t: t("about.principles.2.t"), d: t("about.principles.2.d") },
    { n: "03", t: t("about.principles.3.t"), d: t("about.principles.3.d") },
  ];
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 lg:px-10 lg:pb-24 lg:pt-32">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{t("about.kicker")}</p>
          <h1 className="mt-6 max-w-4xl text-5xl md:text-7xl">
            {t("about.title1")} <em className="text-gradient-gold not-italic">{t("about.title2")}</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("about.lead")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="text-3xl md:text-4xl">{t("about.who.title")}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t("about.who.p1")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.who.p2")}</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl">{t("about.where.title")}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t("about.where.desc")}</p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {regions.map((c) => (
                <div key={c} className="border-l border-gold/40 pl-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{t("about.region")}</p>
                  <p className="mt-1 font-display text-xl">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <h2 className="max-w-3xl text-3xl md:text-4xl">{t("about.principles.title")}</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.n}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{p.n}</p>
                <h3 className="mt-4 text-2xl">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-gold/70 px-6 py-4 text-xs uppercase tracking-[0.22em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
            >
              {t("about.getInTouch")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}