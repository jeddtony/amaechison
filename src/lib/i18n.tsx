import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type Lang = "sv" | "en";

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  sv: {
    // Header / Footer
    "nav.home": "Hem",
    "nav.services": "Tjänster",
    "nav.propertyMaintenance": "Fastighetsunderhåll",
    "nav.about": "Om oss",
    "nav.contact": "Kontakt",
    "cta.requestQuote": "Begär offert",
    "footer.tagline": "Frakt-, bud-, flytt- och fastighetsunderhållstjänster levererade med nordisk precision. Vi betjänar Stockholm och hela Sverige.",
    "footer.services": "Tjänster",
    "footer.company": "Företag",
    "footer.freight": "Frakt",
    "footer.courier": "Bud",
    "footer.moving": "Flytt",
    "footer.maintenance": "Fastighetsunderhåll",
    "footer.about": "Om oss",
    "footer.contact": "Kontakt",
    "footer.getQuote": "Få en offert",
    "footer.rights": "Alla rättigheter förbehållna.",
    "footer.city": "Stockholm · Sverige",

    // Language switch
    "lang.switch": "Byt språk",

    // 404 / Error
    "err.404": "Sidan hittades inte",
    "err.404.desc": "Sidan du letar efter finns inte eller har flyttats.",
    "err.goHome": "Till startsidan",
    "err.title": "Sidan kunde inte laddas",
    "err.desc": "Något gick fel hos oss. Du kan försöka igen eller gå tillbaka till startsidan.",
    "err.tryAgain": "Försök igen",

    // Home / Hero
    "home.hero.kicker": "Stockholm · Hela Sverige",
    "home.hero.title1": "Hanterat med",
    "home.hero.title2": "precision.",
    "home.hero.title3": "Varje gång.",
    "home.hero.lead": "Frakt-, bud- och flyttjänster — samt pålitligt fastighetsunderhåll och reparationer — för privatpersoner, hyresvärdar och företag i hela Sverige. Oavsett vad som ska flyttas eller skötas om hanterar vi det med samma standard.",
    "home.hero.exploreLogistics": "Frakttjänster",
    "home.hero.explorePropertyMaintenance": "Fastighetsunderhåll",

    // Home / Marquee
    "home.marquee.nationwide": "Hela landet",
    "home.marquee.sameDay": "Samma dag",
    "home.marquee.insured": "Försäkrat",

    // Home / Services
    "home.services.kicker": "Vad vi gör",
    "home.services.title": "Tre tjänster. En standard av omsorg.",
    "home.services.viewAll": "Visa alla →",
    "home.services.learnMore": "Läs mer",
    "home.services.freight.title": "Frakt",
    "home.services.freight.desc": "Pallgods och hela lass över hela Sverige. Lager, distribution och last mile-lösningar för växande företag.",
    "home.services.courier.title": "Bud",
    "home.services.courier.desc": "Same-day och tidskritiska budkörningar i Stockholm med omnejd. Dokument, mindre paket, brådskande leveranser.",
    "home.services.moving.title": "Flytt",
    "home.services.moving.desc": "Hem- och kontorsflyttar hanterade med omsorg. Möbler, vitvaror och ömtåligt — packat, flyttat och placerat.",

    // Home / Promise
    "home.promise.dispatch": "Dispatch i Stockholm",
    "home.promise.insured": "Försäkrat gods",
    "home.promise.nationwide": "Rikstäckande",
    "home.promise.customers": "Företag & privat",

    // Home / Property maintenance
    "home.property.kicker": "Det här gör vi också",
    "home.property.title": "Fastighetsunderhåll, gjort ordentligt.",
    "home.property.cta": "Utforska fastighetsunderhåll",

    // Home / CTA
    "home.cta.kicker": "Redo när du är",
    "home.cta.title": "Berätta vad som behöver göras.",
    "home.cta.desc": "Skicka detaljerna så återkommer vi med en tydlig, fast offert — oftast samma dag.",

    // About
    "about.kicker": "Om oss",
    "about.title1": "En lugnare sorts",
    "about.title2": "logistik.",
    "about.lead": "Vi är ett Stockholmsbaserat transportföretag byggt kring en enkel idé: godset du skickar ska komma fram utan historier. Inga överraskningar, inga skador, ingen jakt på uppdateringar — bara tydlig kommunikation och ren leverans.",
    "about.who.title": "Vilka vi arbetar med",
    "about.who.p1": "Vi betjänar två sorters kunder, sida vid sida. Privathushåll som behöver en varsam flytt eller en snabb budkörning, och företag — möbelåterförsäljare, e-handelsvarumärken, mindre tillverkare — som behöver pålitlig frakt mellan lager och slutkund.",
    "about.who.p2": "Samma team. Samma standard. Oavsett om det är en enda soffa eller en full lastbil.",
    "about.where.title": "Var vi verkar",
    "about.where.desc": "Vårt hemma är Stockholm och närregionen — men våra rutter går genom hela landet. Om det ska från Malmö till Kiruna, eller över stan på en timme, kan vi flytta det.",
    "about.region": "Region",
    "about.principles.title": "Principer som styr varje uppdrag.",
    "about.principles.1.t": "Omsorg först",
    "about.principles.1.d": "Ditt gods hanteras på samma sätt som vi skulle hantera vårt eget. Inslaget, spänt och aldrig stressat.",
    "about.principles.2.t": "Tydlig prissättning",
    "about.principles.2.d": "Fasta offerter innan hjulen rullar. Inga mystiska avgifter, inga överraskningar i finstilt vid leverans.",
    "about.principles.3.t": "Riktig kommunikation",
    "about.principles.3.d": "En riktig person att nå. Live-uppdateringar när det behövs. Bekräftelse när det landar.",
    "about.getInTouch": "Ta kontakt",

    // About / Property maintenance
    "about.property.kicker": "Fastighetsunderhåll",
    "about.property.title": "Vi tar också hand om fastigheter.",
    "about.property.p1": "Vid sidan av vår logistikverksamhet driver vi en dedikerad tjänst för fastighetsunderhåll — allmänna reparationer, löpande skötsel, besiktningar och förbättringsprojekt för husägare, hyresvärdar, fastighetsförvaltare och företag. Samma pålitlighet, samma standard.",
    "about.property.cta": "Utforska fastighetsunderhåll",

    // Services page
    "services.kicker": "Tjänster",
    "services.title": "Byggt för det som ska fram.",
    "services.lead": "Oavsett om det är ett enskilt brådskande paket, ett helt lager med varor eller ditt hem — vi har byggt vår verksamhet för att hantera det rent.",
    "services.freight.kicker": "01 · Frakt",
    "services.freight.title": "Frakt & distribution",
    "services.freight.lead": "Pallgods och hela lass för företag som behöver pålitlig, spårbar transport av gods över Sverige.",
    "services.freight.b1": "LTL och FTL rikstäckande",
    "services.freight.b2": "B2B-distribution för handel & tillverkare",
    "services.freight.b3": "Möbler och skrymmande gods till slutkund",
    "services.freight.b4": "Lastning, spänning och säker transport",
    "services.courier.kicker": "02 · Bud",
    "services.courier.title": "Same-day bud",
    "services.courier.lead": "Tidskritiska paket och dokument flyttade genom Stockholm och storregionen — enligt ditt schema, inte vårt.",
    "services.courier.b1": "Same-day och schemalagda hämtningar",
    "services.courier.b2": "Direkta punkt-till-punkt-leveranser",
    "services.courier.b3": "Dokument, prover och mindre paket",
    "services.courier.b4": "Löpande kommunikation hela vägen",
    "services.moving.kicker": "03 · Flytt",
    "services.moving.title": "Hem- & kontorsflyttar",
    "services.moving.lead": "En helhetsflytt hanterad av ett team som behandlar dina saker — och dina väggar — med respekt.",
    "services.moving.b1": "Bostads- och kontorsflyttar",
    "services.moving.b2": "Varsam hantering av möbler och ömtåligt",
    "services.moving.b3": "Packmaterial och hjälp",
    "services.moving.b4": "Montering, placering och städning",
    "services.maintenance.kicker": "Fastighetsunderhåll",
    "services.maintenance.title": "Fastighetsunderhåll & reparationer",
    "services.maintenance.lead": "Pålitligt underhåll för husägare, hyresvärdar, fastighetsförvaltare och företag — vi håller bostäder och kommersiella fastigheter i utmärkt skick.",
    "services.maintenance.b1": "Allmänna reparationer och vardagliga fixar",
    "services.maintenance.b2": "Löpande skötsel och schemalagda besiktningar",
    "services.maintenance.b3": "Förbättringsprojekt, stora som små",
    "services.maintenance.b4": "Snabb service och gediget hantverk, varje gång",

    // Property maintenance page
    "services.crossLink": "Letar du efter fastighetsunderhåll istället?",
    "propertyPage.who.title": "Vilka vi hjälper",
    "propertyPage.who.p1": "Vi arbetar med husägare, hyresvärdar, fastighetsförvaltare och företag — bostäder såväl som kommersiella fastigheter. Oavsett om det är en enda hyreslägenhet eller en hel portfölj av kommersiella enheter gäller samma standard.",
    "propertyPage.office.kicker": "För företag",
    "propertyPage.office.title": "Kontorsinredning & planlösning.",
    "propertyPage.office.lead": "Ska ni göra om kontoret? Vi hjälper företag att planera om och möblera sin arbetsyta på nytt — från planlösning och möblering till en fullständig ombyggnad av kontorsytan — så att kontoret fungerar för hur teamet faktiskt arbetar idag.",
    "propertyPage.office.b1": "Planlösning och layoutdesign för kontor",
    "propertyPage.office.b2": "Ommöblering, montering och placering av möbler",
    "propertyPage.office.b3": "Anpassning för nya team, aktivitetsbaserat arbete eller mötesrum",
    "propertyPage.office.b4": "Arbete planerat kring er verksamhets öppettider, minimal störning",
    "propertyPage.included.title": "Det här ingår",
    "propertyPage.crossLink": "Behöver du frakt, bud eller flytt istället?",

    // Contact
    "contact.kicker": "Kontakt",
    "contact.title": "Nu sätter vi det i rörelse.",
    "contact.lead": "Skicka detaljerna så återkommer vi med en fast offert — oftast samma dag.",
    "contact.f.name": "Ditt namn",
    "contact.f.email": "E-post",
    "contact.f.phone": "Telefon (valfritt)",
    "contact.f.service": "Tjänst",
    "contact.f.pickup": "Upphämtningsadress (valfritt)",
    "contact.f.dropoff": "Leveransadress (valfritt)",
    "contact.f.date": "Önskat datum (valfritt)",
    "contact.f.datePh": "Välj ett datum",
    "contact.f.message": "Berätta om uppdraget",
    "contact.f.messagePh": "Vad behöver flyttas, när och något särskilt vi bör veta.",
    "contact.f.freight": "Frakt",
    "contact.f.courier": "Bud",
    "contact.f.moving": "Flytt",
    "contact.f.maintenance": "Fastighetsunderhåll",
    "contact.f.other": "Annat",
    "contact.send": "Skicka förfrågan",
    "contact.sending": "Skickar...",
    "contact.sent": "Tack — vi hör av oss inom kort.",
    "contact.error": "Något gick fel. Försök igen eller mejla oss direkt.",
    "contact.reach.title": "Nå oss direkt",
    "contact.reach.desc": "Föredrar du att prata igenom det? Vi svarar gärna på frågor innan något åtagande.",
    "contact.reach.phone": "Telefon",
    "contact.reach.email": "E-post",
    "contact.reach.base": "Bas",
    "contact.hours": "Öppettider",
    "contact.hours.mf": "Mån – Fre · 07:00 – 19:00",
    "contact.hours.sat": "Lör · Enligt överenskommelse",
    "contact.err.name": "Ange ditt namn",
    "contact.err.email": "Ange en giltig e-postadress",
    "contact.err.message": "Berätta lite om uppdraget",
    "contact.success.title": "Tack för din förfrågan!",
    "contact.success.desc": "Vi har tagit emot din förfrågan och återkommer med en fast offert — oftast samma dag.",
    "contact.success.close": "Stäng",
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.propertyMaintenance": "Property Maintenance",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.requestQuote": "Request quote",
    "footer.tagline": "Freight, courier, moving and property maintenance services delivered with Nordic precision. Serving Stockholm and all of Sweden.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.freight": "Freight",
    "footer.courier": "Courier",
    "footer.moving": "Moving",
    "footer.maintenance": "Property Maintenance",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.getQuote": "Get a quote",
    "footer.rights": "All rights reserved.",
    "footer.city": "Stockholm · Sverige",

    "lang.switch": "Switch language",

    "err.404": "Page not found",
    "err.404.desc": "The page you're looking for doesn't exist or has been moved.",
    "err.goHome": "Go home",
    "err.title": "This page didn't load",
    "err.desc": "Something went wrong on our end. You can try refreshing or head back home.",
    "err.tryAgain": "Try again",

    "home.hero.kicker": "Stockholm · Nationwide Sweden",
    "home.hero.title1": "Handled with",
    "home.hero.title2": "precision.",
    "home.hero.title3": "Every time.",
    "home.hero.lead": "Freight, courier and moving services — and reliable property maintenance and repairs — for private customers, landlords and businesses across Sweden. Whatever needs moving or maintaining, we handle it to the same standard.",
    "home.hero.exploreLogistics": "Logistics services",
    "home.hero.explorePropertyMaintenance": "Property maintenance",

    "home.marquee.nationwide": "Nationwide",
    "home.marquee.sameDay": "Same-day",
    "home.marquee.insured": "Insured",

    "home.services.kicker": "What we do",
    "home.services.title": "Three services. One standard of care.",
    "home.services.viewAll": "View all →",
    "home.services.learnMore": "Learn more",
    "home.services.freight.title": "Freight",
    "home.services.freight.desc": "Palletised and full-load freight across Sweden. Warehousing, distribution and last-mile options for growing businesses.",
    "home.services.courier.title": "Courier",
    "home.services.courier.desc": "Same-day and time-critical courier runs in Stockholm and surroundings. Documents, small parcels, urgent deliveries.",
    "home.services.moving.title": "Moving",
    "home.services.moving.desc": "Home and office moves handled with care. Furniture, appliances and fragile items — packed, moved and placed.",

    "home.promise.dispatch": "Dispatch in Stockholm",
    "home.promise.insured": "Insured cargo",
    "home.promise.nationwide": "Nationwide coverage",
    "home.promise.customers": "Businesses & private",

    "home.property.kicker": "What we also do",
    "home.property.title": "Property maintenance, done properly.",
    "home.property.cta": "Explore property maintenance",

    "home.cta.kicker": "Ready when you are",
    "home.cta.title": "Tell us what needs doing.",
    "home.cta.desc": "Send us the details and we'll return with a clear, fixed quote — usually the same day.",

    "about.kicker": "About",
    "about.title1": "A quieter kind of",
    "about.title2": "logistics.",
    "about.lead": "We're a Stockholm-based transport company built around a simple idea: the goods you send should arrive without stories. No surprises, no damage, no chasing updates — just clear communication and clean delivery.",
    "about.who.title": "Who we work with",
    "about.who.p1": "We serve two kinds of customers, side by side. Private households who need a careful move or a fast courier run, and businesses — furniture retailers, e-commerce brands, small manufacturers — who need dependable freight between warehouse and end customer.",
    "about.who.p2": "Same team. Same standards. Whether it's a single sofa or a full truckload.",
    "about.where.title": "Where we operate",
    "about.where.desc": "Our home is Stockholm and the surrounding region — but our routes run across the entire country. If it needs to go from Malmö to Kiruna, or across town in an hour, we can move it.",
    "about.region": "Region",
    "about.principles.title": "Principles that guide every job.",
    "about.principles.1.t": "Care first",
    "about.principles.1.d": "Your goods are handled the way we'd handle our own. Wrapped, strapped, and never rushed.",
    "about.principles.2.t": "Clear pricing",
    "about.principles.2.d": "Fixed quotes before the wheels move. No mystery fees, no fine-print surprises at delivery.",
    "about.principles.3.t": "Real communication",
    "about.principles.3.d": "A real person you can reach. Live updates when it matters. Confirmation when it lands.",
    "about.getInTouch": "Get in touch",

    "about.property.kicker": "Property Maintenance",
    "about.property.title": "We also take care of properties.",
    "about.property.p1": "Alongside our logistics work, we run a dedicated property maintenance service — general repairs, routine upkeep, inspections and improvement projects for homeowners, landlords, property managers and businesses. Same reliability, same standard of care.",
    "about.property.cta": "Explore property maintenance",

    "services.kicker": "Services",
    "services.title": "Built for what needs to arrive.",
    "services.lead": "Whether it's a single urgent parcel, a warehouse of stock or your entire home — we've built our operation to handle it cleanly.",
    "services.freight.kicker": "01 · Freight",
    "services.freight.title": "Freight & distribution",
    "services.freight.lead": "Palletised freight and full loads for businesses that need reliable, trackable movement of goods across Sweden.",
    "services.freight.b1": "LTL and FTL nationwide",
    "services.freight.b2": "B2B distribution for retailers & manufacturers",
    "services.freight.b3": "Furniture and bulky goods to end customers",
    "services.freight.b4": "Loading, strapping and secure transit",
    "services.courier.kicker": "02 · Courier",
    "services.courier.title": "Same-day courier",
    "services.courier.lead": "Time-critical parcels and documents moved across Stockholm and the greater region — on your schedule, not ours.",
    "services.courier.b1": "Same-day and scheduled pick-ups",
    "services.courier.b2": "Direct point-to-point deliveries",
    "services.courier.b3": "Documents, samples and small parcels",
    "services.courier.b4": "Live communication throughout",
    "services.moving.kicker": "03 · Moving",
    "services.moving.title": "Home & office moves",
    "services.moving.lead": "A full-service move handled by a team that treats your belongings — and your walls — with respect.",
    "services.moving.b1": "Residential and office relocations",
    "services.moving.b2": "Careful handling of furniture and fragiles",
    "services.moving.b3": "Packing materials and assistance",
    "services.moving.b4": "Assembly, placement and clean-up",
    "services.maintenance.kicker": "Property Maintenance",
    "services.maintenance.title": "Property Maintenance & Repairs",
    "services.maintenance.lead": "Reliable maintenance for homeowners, landlords, property managers and businesses — keeping residential and commercial properties in excellent condition.",
    "services.maintenance.b1": "General repairs and everyday fixes",
    "services.maintenance.b2": "Routine upkeep and scheduled inspections",
    "services.maintenance.b3": "Property improvement projects, large and small",
    "services.maintenance.b4": "Prompt service and quality workmanship, every time",

    "propertyPage.who.title": "Who we help",
    "propertyPage.who.p1": "We work with homeowners, landlords, property managers and businesses — residential and commercial properties alike. Whether it's a single rental flat or a portfolio of commercial units, the same standard applies.",
    "propertyPage.office.kicker": "For Businesses",
    "propertyPage.office.title": "Office layout & space planning.",
    "propertyPage.office.lead": "Reconfiguring your office? We help businesses redesign and rearrange their workspace — from furniture layout and space planning to full office reconfigurations — so your office works for how your team actually works today.",
    "propertyPage.office.b1": "Space planning and layout design for offices",
    "propertyPage.office.b2": "Furniture rearrangement, assembly and placement",
    "propertyPage.office.b3": "Reconfiguration for new teams, hot-desking or meeting rooms",
    "propertyPage.office.b4": "Work scheduled around your business hours, minimal disruption",
    "propertyPage.included.title": "What's included",
    "propertyPage.crossLink": "Need freight, courier or moving instead?",

    "services.crossLink": "Looking for property maintenance instead?",

    "contact.kicker": "Contact",
    "contact.title": "Let's get it moving.",
    "contact.lead": "Send us the details and we'll come back with a fixed quote — usually the same day.",
    "contact.f.name": "Your name",
    "contact.f.email": "Email",
    "contact.f.phone": "Phone (optional)",
    "contact.f.service": "Service",
    "contact.f.pickup": "Pickup location (optional)",
    "contact.f.dropoff": "Drop-off location (optional)",
    "contact.f.date": "Preferred date (optional)",
    "contact.f.datePh": "Select a date",
    "contact.f.message": "Tell us about the job",
    "contact.f.messagePh": "What needs moving, when, and anything special we should know.",
    "contact.f.freight": "Freight",
    "contact.f.courier": "Courier",
    "contact.f.moving": "Moving",
    "contact.f.maintenance": "Property Maintenance",
    "contact.f.other": "Other",
    "contact.send": "Send request",
    "contact.sending": "Sending...",
    "contact.sent": "Thanks — we'll be in touch shortly.",
    "contact.error": "Something went wrong. Please try again or email us directly.",
    "contact.reach.title": "Reach us directly",
    "contact.reach.desc": "Prefer to talk it through? We're glad to answer questions before any commitment.",
    "contact.reach.phone": "Phone",
    "contact.reach.email": "Email",
    "contact.reach.base": "Base",
    "contact.hours": "Hours",
    "contact.hours.mf": "Mon – Fri · 07:00 – 19:00",
    "contact.hours.sat": "Sat · By appointment",
    "contact.err.name": "Please enter your name",
    "contact.err.email": "Please enter a valid email",
    "contact.err.message": "Tell us a bit about the job",
    "contact.success.title": "Thank you for your enquiry!",
    "contact.success.desc": "We've received your request and will come back with a fixed quote — usually the same day.",
    "contact.success.close": "Close",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "amaechison.lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  // SSR-safe default is Swedish. Sync from localStorage after hydration.
  const [lang, setLangState] = useState<Lang>("sv");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "sv" || stored === "en") setLangState(stored);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  };

  const t = (k: string) => translations[lang][k] ?? translations.en[k] ?? k;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("lang.switch")}
        className={
          "inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-muted-foreground outline-none transition-colors hover:text-gold " +
          className
        }
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.code}</span>
        <ChevronDown className="h-3 w-3 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px] border border-border/60 bg-background">
        {LANGUAGES.map(({ code, label, flag }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLang(code)}
            className={
              "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-[0.18em] " +
              (lang === code ? "text-gold" : "text-muted-foreground hover:text-foreground")
            }
          >
            <span className="text-base leading-none">{flag}</span>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}