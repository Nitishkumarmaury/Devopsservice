import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionUserFromRequest, unauthorizedJson } from "@/lib/auth/session";
import { contactSchema } from "@/lib/schemas";

type ContactValues = ReturnType<typeof contactSchema.parse>;

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_DEALS_URL = "https://api.brevo.com/v3/crm/deals";
const BREVO_NOTES_URL = "https://api.brevo.com/v3/crm/notes";
const BREVO_CAMPAIGNS_URL = "https://api.brevo.com/v3/emailCampaigns";

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
    ["Project type", values.projectType],
    ["Estimated budget", values.estimatedBudget],
    ["Timeline", values.projectTimeline],
    ["Current infrastructure", values.currentInfrastructure],
    ["Project details", values.projectDetails],
  ] as const;
}

function buildTextEmail(values: ContactValues) {
  return formatLines(values).map(([label, value]) => `${label}: ${value}`).join("\n\n");
}

function buildHtmlEmail(values: ContactValues) {
  const rows = formatLines(values)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid #f3dce8;color:#9f4668;font-weight:700;vertical-align:top;width:190px;">${escapeHtml(label)}</td>
          <td style="padding:14px 18px;border-bottom:1px solid #f3dce8;color:#241327;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="margin:0;padding:28px;background:#fff7fb;font-family:Inter,Segoe UI,Arial,sans-serif;color:#241327;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #f3dce8;border-radius:22px;overflow:hidden;box-shadow:0 24px 70px rgba(159,70,104,0.14);">
        <div style="padding:28px;background:linear-gradient(135deg,#ffe5f0 0%,#fff8fb 46%,#efe8ff 100%);color:#241327;border-bottom:1px solid #f3dce8;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#b83270;font-weight:800;">Website inquiry</p>
          <h1 style="margin:0;font-size:26px;line-height:1.2;">New DevOps project inquiry</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
          ${rows}
        </table>
        <div style="padding:18px 24px;color:#8d6478;font-size:12px;">
          Sent from the DevOps Service Studio website contact form.
        </div>
      </div>
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
      subject: `${values.requestType}: ${values.projectType} from ${values.fullName}`,
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

function parseBoolean(value?: string) {
  return ["1", "true", "yes", "on"].includes(value?.trim().toLowerCase() ?? "");
}

function parsePositiveInt(value?: string) {
  const parsed = Number.parseInt(value?.trim() ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
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

async function putBrevo<TBody extends Record<string, unknown>>(
  url: string,
  apiKey: string,
  body: TBody,
  context: string,
) {
  return requestBrevo("PUT", url, apiKey, body, context);
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

  return `<p><strong>Website lead captured from DevOps Service Studio.</strong></p>${rows}`;
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

async function sendCampaignNotification(
  values: ContactValues,
  config: { from: string; fromName: string; apiKey: string; listIds: number[] },
) {
  const campaign = await postBrevo(
    BREVO_CAMPAIGNS_URL,
    config.apiKey,
    {
      name: `Website inquiry notification - ${values.fullName} - ${new Date().toISOString()}`,
      subject: `${values.requestType}: ${values.projectType} from ${values.fullName}`,
      sender: {
        name: config.fromName,
        email: config.from,
      },
      type: "classic",
      htmlContent: buildHtmlEmail(values),
      recipients: {
        listIds: config.listIds,
      },
    },
    "campaign notification create",
  );

  const campaignId =
    typeof campaign.id === "number" || typeof campaign.id === "string" ? String(campaign.id) : undefined;

  if (!campaignId) {
    throw new Error("Brevo campaign notification create returned no campaign id.");
  }

  await postBrevo(`${BREVO_CAMPAIGNS_URL}/${campaignId}/sendNow`, config.apiKey, {}, "campaign notification send");
}

async function sendReusableCampaignTestNotification(
  values: ContactValues,
  config: { to: string; apiKey: string; campaignId: number },
) {
  await putBrevo(
    `${BREVO_CAMPAIGNS_URL}/${config.campaignId}`,
    config.apiKey,
    {
      name: `Website inquiry notification - ${values.fullName}`,
      subject: `${values.requestType}: ${values.projectType} from ${values.fullName}`,
      htmlContent: buildHtmlEmail(values),
    },
    "reusable test campaign update",
  );

  await postBrevo(
    `${BREVO_CAMPAIGNS_URL}/${config.campaignId}/sendTest`,
    config.apiKey,
    {
      emailTo: [config.to],
    },
    "reusable test campaign send",
  );
}

export async function POST(request: NextRequest) {
  if (!getSessionUserFromRequest(request)) {
    return unauthorizedJson();
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
        errors: parsed.error.flatten().fieldErrors,
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
  const fromName = process.env.CONTACT_EMAIL_FROM_NAME || "DevOps Service Studio";
  const apiKey = process.env.CONTACT_PROVIDER_API_KEY;
  const listIds = parseListIds(process.env.BREVO_CONTACT_LIST_IDS);
  const notificationListIds = parseListIds(process.env.BREVO_NOTIFICATION_LIST_IDS);
  const campaignFallbackEnabled = parseBoolean(process.env.BREVO_CAMPAIGN_FALLBACK_ENABLED);
  const reusableTestCampaignId = parsePositiveInt(process.env.BREVO_REUSABLE_TEST_CAMPAIGN_ID);

  if (provider && to && from && apiKey) {
    if (provider.toLowerCase() !== "brevo") {
      console.warn("Unsupported contact email provider configured", { provider });
      return NextResponse.json(
        { success: false, message: "Email provider is not configured correctly. Please email the project details directly." },
        { status: 500 },
      );
    }

    let leadCaptured = false;

    try {
      await captureLeadInBrevo(values, { apiKey, listIds });
      leadCaptured = true;
    } catch {
      leadCaptured = false;
    }

    try {
      await sendWithBrevo(values, { to, from, fromName, apiKey });
    } catch {
      let notificationQueued = false;

      if (leadCaptured && reusableTestCampaignId) {
        try {
          await sendReusableCampaignTestNotification(values, { apiKey, to, campaignId: reusableTestCampaignId });
          notificationQueued = true;
        } catch (error) {
          console.error("Brevo reusable test campaign notification failed", {
            message: error instanceof Error ? error.message : String(error),
          });
        }
      }

      if (leadCaptured && !notificationQueued && campaignFallbackEnabled && notificationListIds?.length) {
        try {
          await sendCampaignNotification(values, { apiKey, from, fromName, listIds: notificationListIds });
          notificationQueued = true;
        } catch (error) {
          console.error("Brevo campaign notification fallback failed", {
            message: error instanceof Error ? error.message : String(error),
          });
        }
      }

      if (leadCaptured) {
        return NextResponse.json({
          success: true,
          message: notificationQueued
            ? "Thanks. Your inquiry has been received and a notification has been queued."
            : "Thanks. Your inquiry has been received and saved for review.",
        });
      }

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
