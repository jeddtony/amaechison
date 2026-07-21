import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, CheckCircle2, ArrowUpRight, CalendarIcon } from "lucide-react";
import { useT } from "@/lib/i18n";
import { sendEnquiry } from "@/lib/send-enquiry";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Quote Request — Amaechison" },
      { name: "description", content: "Request a fixed quote for freight, courier or moving services in Stockholm and across Sweden. Same-day response." },
      { property: "og:title", content: "Contact Amaechison" },
      { property: "og:description", content: "Request a quote for freight, courier or moving services." },
    ],
  }),
  component: ContactPage,
});

function buildSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().trim().min(1, t("contact.err.name")).max(100),
    email: z.string().trim().email(t("contact.err.email")).max(255),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    service: z.enum(["freight", "courier", "moving", "other"]),
    pickup: z.string().trim().max(200).optional().or(z.literal("")),
    dropoff: z.string().trim().max(200).optional().or(z.literal("")),
    message: z.string().trim().min(1, t("contact.err.message")).max(2000),
    serviceDate: z.string().optional(),
  });
}

function ContactPage() {
  const t = useT();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serviceDate, setServiceDate] = useState<Date | undefined>(undefined);
  const [dateOpen, setDateOpen] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? "freight") as "freight" | "courier" | "moving" | "other",
      pickup: String(fd.get("pickup") ?? ""),
      dropoff: String(fd.get("dropoff") ?? ""),
      message: String(fd.get("message") ?? ""),
      serviceDate: serviceDate ? serviceDate.toISOString() : undefined,
    };
    const result = buildSchema(t).safeParse(raw);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await sendEnquiry({ data: result.data });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-24 lg:px-10 lg:pb-20 lg:pt-32">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{t("contact.kicker")}</p>
          <h1 className="mt-6 max-w-3xl text-5xl md:text-7xl">{t("contact.title")}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t("contact.lead")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label={t("contact.f.name")} name="name" error={errors.name} required />
                <Field label={t("contact.f.email")} name="email" type="email" error={errors.email} required />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Field label={t("contact.f.phone")} name="phone" type="tel" error={errors.phone} />
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t("contact.f.service")}</label>
                  <select
                    name="service"
                    defaultValue="freight"
                    className="border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-gold"
                  >
                    <option value="freight">{t("contact.f.freight")}</option>
                    <option value="courier">{t("contact.f.courier")}</option>
                    <option value="moving">{t("contact.f.moving")}</option>
                    <option value="other">{t("contact.f.other")}</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Field label={t("contact.f.pickup")} name="pickup" error={errors.pickup} />
                <Field label={t("contact.f.dropoff")} name="dropoff" error={errors.dropoff} />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t("contact.f.date")}
                  </label>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center justify-between border-b border-border bg-transparent py-3 text-left text-foreground outline-none transition-colors hover:border-gold focus:border-gold"
                      >
                        <span className={serviceDate ? "text-foreground" : "text-muted-foreground/60"}>
                          {serviceDate
                            ? serviceDate.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" })
                            : t("contact.f.datePh")}
                        </span>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={serviceDate}
                        onSelect={(d) => { setServiceDate(d); setDateOpen(false); }}
                        disabled={{ before: new Date() }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t("contact.f.message")}</label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder={t("contact.f.messagePh")}
                  className="border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-3 bg-gold px-6 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-gold-soft disabled:opacity-60"
                >
                  {status === "sending" ? t("contact.sending") : t("contact.send")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                {status === "error" && (
                  <p className="text-sm text-destructive">{t("contact.error")}</p>
                )}
              </div>
            </form>
          </div>

          <aside className="space-y-10 border-l border-border/60 lg:pl-14">
            <div>
              <h2 className="text-2xl">{t("contact.reach.title")}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t("contact.reach.desc")}</p>
            </div>
            <div className="space-y-6">
              <ContactRow icon={Phone} label={t("contact.reach.phone")} value="+46 735 084 946" href="tel:+46735084946" />
              <ContactRow icon={Mail} label={t("contact.reach.email")} value="hej@amaechison.se" href="mailto:hej@amaechison.se" />
              <ContactRow icon={MapPin} label={t("contact.reach.base")} value="Stockholm, Sverige" />
            </div>
            <div className="border-t border-border/60 pt-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{t("contact.hours")}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t("contact.hours.mf")}</p>
              <p className="text-sm text-muted-foreground">{t("contact.hours.sat")}</p>
            </div>
          </aside>
        </div>
      </section>

      <Dialog open={status === "sent"} onOpenChange={(open) => { if (!open) setStatus("idle"); }}>
        <DialogContent className="max-w-md border border-border/60 bg-background p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gold/40 text-gold">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <DialogTitle className="mt-6 font-display text-2xl text-foreground">
            {t("contact.success.title")}
          </DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("contact.success.desc")}
          </DialogDescription>
          <button
            onClick={() => setStatus("idle")}
            className="mx-auto mt-8 inline-flex items-center gap-2 border border-gold/70 px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            {t("contact.success.close")}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({
  label, name, type = "text", error, required,
}: { label: string; name: string; type?: string; error?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-gold"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-4">
      <a
        href={href}
        className="mt-1 flex h-9 w-9 flex-none items-center justify-center border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
      >
        <Icon className="h-4 w-4" />
      </a>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} className="mt-1 block text-foreground transition-colors hover:text-gold">{value}</a>
        ) : (
          <p className="mt-1 text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}