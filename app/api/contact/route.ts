import { NextResponse, type NextRequest } from "next/server";
import { createMemoryRateLimiter } from "@/lib/ai/rate-limit";
import { checkUpstashRateLimit } from "@/lib/rate-limit/upstash";
import { siteConfig } from "@/lib/constants";
import { contactSchema } from "@/lib/schemas";

type ContactValues = ReturnType<typeof contactSchema.parse>;

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_DEALS_URL = "https://api.brevo.com/v3/crm/deals";
const BREVO_NOTES_URL = "https://api.brevo.com/v3/crm/notes";
const limiter = createMemoryRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 8,
  cooldownMs: 5 * 1000,
});
const rateLimitOptions = {
  namespace: "contact",
  windowMs: 10 * 60 * 1000,
  maxRequests: 8,
  cooldownMs: 5 * 1000,
};

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return `contact:${forwarded || realIp || "anonymous"}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatLines(values: ContactValues) {
  return [
    ["Request type", values.requestType],
    ["Name", values.fullName],
    ["Email", values.workEmail],
    ["Company", values.company || "Not provided"],
    ["Website", values.projectWebsite || "Not provided"],
    ["Service needed", values.projectType],
    ["Cloud provider", values.cloudProvider || "Not provided"],
    ["Estimated budget", values.estimatedBudget],
    ["Timeline", values.projectTimeline],
    ["Current infrastructure", values.currentInfrastructure],
    ["Project details", values.projectDetails],
  ] as const;
}

function buildTextEmail(values: ContactValues) {
  return formatLines(values).map(([label, value]) => `${label}: ${value}`).join("\n\n");
}

function buildContactSubject(values: ContactValues) {
  return `New website inquiry from ${values.fullName}`;
}

function buildHtmlEmail(values: ContactValues) {
  const rows = formatLines(values)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px 8px 0;vertical-align:top;font-weight:bold;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;vertical-align:top;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="margin:0;padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:bold;">Website inquiry</p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;">New DevOps project inquiry</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">
        ${rows}
      </table>
      <p style="margin:16px 0 0;font-size:12px;">Sent from the ${escapeHtml(siteConfig.name)} website contact form.</p>
    </div>
  `;
}

async function sendWithBrevo(values: ContactValues, config: { to: string; from: string; fromName: string; apiKey: string }) {
  const response = await fetch(BREVO_SEND_URL, {
    method: "POST",
    headers: {
      "api-key": config.apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: config.fromName,
        email: config.from,
      },
      to: [{ email: config.to }],
      replyTo: {
        name: values.fullName,
        email: values.workEmail,
      },
      subject: buildContactSubject(values),
      htmlContent: buildHtmlEmail(values),
      textContent: buildTextEmail(values),
      tags: ["website-contact"],
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    console.error("Brevo email send failed", {
      status: response.status,
      message: message.slice(0, 500),
    });
    throw new Error("Brevo email send failed.");
  }
}

function parseListIds(value?: string) {
  return value
    ?.split(",")
    .map((item) => Number.parseInt(item.trim(), 10))
    .filter((item) => Number.isInteger(item) && item > 0);
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? fullName,
    lastName: parts.slice(1).join(" "),
  };
}

async function readBrevoResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { message: text };
  }
}

async function postBrevo<TBody extends Record<string, unknown>>(
  url: string,
  apiKey: string,
  body: TBody,
  context: string,
) {
  return requestBrevo("POST", url, apiKey, body, context);
}

async function requestBrevo<TBody extends Record<string, unknown>>(
  method: "POST" | "PUT",
  url: string,
  apiKey: string,
  body: TBody,
  context: string,
) {
  const response = await fetch(url, {
    method,
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await readBrevoResponse(response);

  if (!response.ok) {
    console.error(`Brevo ${context} failed`, {
      status: response.status,
      message: typeof data.message === "string" ? data.message.slice(0, 500) : data,
    });
    throw new Error(`Brevo ${context} failed.`);
  }

  return data;
}

function buildBrevoNote(values: ContactValues) {
  const rows = formatLines(values)
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br />${escapeHtml(value)}</p>`)
    .join("");

  return `<p><strong>Website lead captured from ${escapeHtml(siteConfig.name)}.</strong></p>${rows}`;
}

async function captureLeadInBrevo(values: ContactValues, config: { apiKey: string; listIds?: number[] }) {
  const { firstName, lastName } = splitName(values.fullName);
  const contact = await postBrevo(
    BREVO_CONTACTS_URL,
    config.apiKey,
    {
      email: values.workEmail,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
      },
      listIds: config.listIds?.length ? config.listIds : undefined,
      updateEnabled: true,
      getId: true,
    },
    "contact capture",
  );

  const contactId = typeof contact.id === "number" ? contact.id : undefined;
  const deal = await postBrevo(
    BREVO_DEALS_URL,
    config.apiKey,
    {
      name: `${values.requestType}: ${values.projectType} - ${values.company || values.fullName}`,
      linkedContactsIds: contactId ? [contactId] : undefined,
    },
    "deal capture",
  ).catch((error) => {
    console.error("Brevo deal capture skipped", { message: error instanceof Error ? error.message : String(error) });
    return undefined;
  });

  const dealId = typeof deal?.id === "string" ? deal.id : undefined;

  await postBrevo(
    BREVO_NOTES_URL,
    config.apiKey,
    {
      text: buildBrevoNote(values),
      contactIds: contactId ? [contactId] : undefined,
      dealIds: dealId ? [dealId] : undefined,
    },
    "lead note capture",
  );
}

function formatContactValidationErrors(parsed: ReturnType<typeof contactSchema.safeParse>) {
  if (parsed.success) {
    return {};
  }

  return parsed.error.flatten().fieldErrors;
}

export async function POST(request: NextRequest) {
  let limit = await checkUpstashRateLimit(clientKey(request), rateLimitOptions);
  limit ??= limiter.check(clientKey(request));

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many contact requests. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)),
        },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const normalizedPayload =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? { requestType: "Project Inquiry", ...payload }
      : payload;

  const parsed = contactSchema.safeParse(normalizedPayload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please review the highlighted fields.",
        errors: formatContactValidationErrors(parsed),
      },
      { status: 400 },
    );
  }

  const values = parsed.data;

  if (values.website) {
    return NextResponse.json({ success: true, message: "Your inquiry has been received." });
  }

  const provider = process.env.CONTACT_EMAIL_PROVIDER;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;
  const fromName = siteConfig.name;
  const apiKey = process.env.CONTACT_PROVIDER_API_KEY;
  const listIds = parseListIds(process.env.BREVO_CONTACT_LIST_IDS);

  if (provider && to && from && apiKey) {
    if (provider.toLowerCase() !== "brevo") {
      console.warn("Unsupported contact email provider configured", { provider });
      return NextResponse.json(
        { success: false, message: "Email provider is not configured correctly. Please email the project details directly." },
        { status: 500 },
      );
    }

    try {
      await captureLeadInBrevo(values, { apiKey, listIds });
    } catch (error) {
      console.error("Brevo lead capture failed", {
        message: error instanceof Error ? error.message : String(error),
      });
    }

    try {
      await sendWithBrevo(values, { to, from, fromName, apiKey });
    } catch (error) {
      console.error("Brevo inquiry email failed", {
        message: error instanceof Error ? error.message : String(error),
      });
      return NextResponse.json(
        { success: false, message: "The message could not be sent right now. Please email the project details directly." },
        { status: 502 },
      );
    }
  } else {
    console.info("Contact form submission received", {
      projectType: values.projectType,
      estimatedBudget: values.estimatedBudget,
      projectTimeline: values.projectTimeline,
      providerConfigured: false,
    });
  }

  return NextResponse.json({
    success: true,
    message: "Thanks. Your inquiry has been received and is ready for review.",
  });
}
