import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.enum(["freight", "courier", "moving", "other"]),
  pickup: z.string().trim().max(200).optional().or(z.literal("")),
  dropoff: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export const sendEnquiry = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const serviceLabel: Record<string, string> = {
      freight: "Freight",
      courier: "Courier",
      moving: "Moving",
      other: "Other",
    };

    const result = await resend.emails.send({
      from: "Amaechison Contact Form <noreply@amaechison.se>",
      to: "hej@amaechison.se",
      replyTo: data.email,
      subject: `New enquiry from ${data.name} — ${serviceLabel[data.service]}`,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Service:</strong> ${serviceLabel[data.service]}</p>
        ${data.pickup ? `<p><strong>Pickup:</strong> ${data.pickup}</p>` : ""}
        ${data.dropoff ? `<p><strong>Drop-off:</strong> ${data.dropoff}</p>` : ""}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (result.error) {
      console.error("[send-enquiry] Resend error:", result.error);
      throw new Error(result.error.message);
    }

    return { ok: true };
  });
