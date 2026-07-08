import { siteConfig } from "@/lib/constants";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_CAMPAIGNS_URL = "https://api.brevo.com/v3/emailCampaigns";

type PasswordResetEmailValues = {
  to: string;
  fullName?: string;
  resetUrl: string;
  expiresAt: Date;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getBrevoConfig() {
  const provider = process.env.CONTACT_EMAIL_PROVIDER || "brevo";
  const apiKey = process.env.CONTACT_PROVIDER_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const fromName = process.env.CONTACT_EMAIL_FROM_NAME || siteConfig.name;

  if (provider.toLowerCase() !== "brevo") {
    throw new Error("Password reset email provider is not configured for Brevo.");
  }

  if (!apiKey || !from) {
    throw new Error("Password reset email configuration is incomplete.");
  }

  return {
    apiKey,
    from,
    fromName,
  };
}

function parseBoolean(value?: string) {
  return ["1", "true", "yes", "on"].includes(value?.trim().toLowerCase() ?? "");
}

function parsePositiveInt(value?: string) {
  const parsed = Number.parseInt(value?.trim() ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function formatExpiry(expiresAt: Date) {
  return expiresAt.toLocaleString("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

function buildHtmlEmail(values: PasswordResetEmailValues) {
  const name = values.fullName?.trim() || "there";
  const expiry = formatExpiry(values.expiresAt);

  return `
    <div style="margin:0;padding:30px;background:#fff6fb;font-family:Inter,Segoe UI,Arial,sans-serif;color:#251426;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #f1d8e6;border-radius:24px;overflow:hidden;box-shadow:0 28px 80px rgba(171,79,134,0.16);">
        <div style="padding:30px;background:linear-gradient(135deg,#ffe5f0 0%,#fff8fb 48%,#efe7ff 100%);border-bottom:1px solid #f1d8e6;">
          <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#b83270;font-weight:800;">Secure account access</p>
          <h1 style="margin:0;font-size:28px;line-height:1.18;color:#241327;">Reset your password</h1>
        </div>
        <div style="padding:30px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#5f5062;">Hi ${escapeHtml(name)},</p>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#5f5062;">
            We received a request to reset your ${escapeHtml(siteConfig.name)} account password. Use the secure button below to choose a new password.
          </p>
          <a href="${escapeHtml(values.resetUrl)}" style="display:inline-block;border-radius:999px;background:linear-gradient(135deg,#d65b98 0%,#a66bea 55%,#6d8ef4 100%);padding:14px 24px;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;box-shadow:0 14px 34px rgba(166,107,234,0.28);">
            Reset password
          </a>
          <p style="margin:24px 0 0;font-size:13px;line-height:1.65;color:#8a748b;">
            This link expires at ${escapeHtml(expiry)} and can be used only once. If you did not request this, you can safely ignore this email.
          </p>
          <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#9a849b;word-break:break-all;">
            ${escapeHtml(values.resetUrl)}
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildTextEmail(values: PasswordResetEmailValues) {
  return [
    `Reset your ${siteConfig.name} password`,
    "",
    `Open this secure reset link: ${values.resetUrl}`,
    "",
    `This link expires at ${formatExpiry(values.expiresAt)} and can be used only once.`,
    "If you did not request this reset, ignore this email.",
  ].join("\n");
}

async function sendWithBrevoTransactional(
  values: PasswordResetEmailValues,
  config: { apiKey: string; from: string; fromName: string },
) {
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
      to: [{ email: values.to, name: values.fullName }],
      subject: `Reset your ${siteConfig.name} password`,
      htmlContent: buildHtmlEmail(values),
      textContent: buildTextEmail(values),
      tags: ["password-reset"],
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    console.error(`Brevo password reset email failed: ${response.status} ${message.slice(0, 500)}`);
    throw new Error("Password reset email could not be sent.");
  }
}

async function readBrevoResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { message: text };
  }
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
    const message = typeof data.message === "string" ? data.message.slice(0, 500) : JSON.stringify(data).slice(0, 500);
    console.error(`Brevo password reset ${context} failed: ${response.status} ${message}`);
    throw new Error(`Brevo password reset ${context} failed.`);
  }

  return data;
}

async function sendWithReusableCampaignTest(
  values: PasswordResetEmailValues,
  config: { apiKey: string; campaignId: number },
) {
  await requestBrevo(
    "PUT",
    `${BREVO_CAMPAIGNS_URL}/${config.campaignId}`,
    config.apiKey,
    {
      name: `Password reset email - ${new Date().toISOString()}`,
      subject: `Reset your ${siteConfig.name} password`,
      htmlContent: buildHtmlEmail(values),
    },
    "campaign update",
  );

  await requestBrevo(
    "POST",
    `${BREVO_CAMPAIGNS_URL}/${config.campaignId}/sendTest`,
    config.apiKey,
    {
      emailTo: [values.to],
    },
    "campaign test send",
  );
}

function getPasswordResetFallbackCampaignId() {
  return parsePositiveInt(process.env.BREVO_PASSWORD_RESET_TEST_CAMPAIGN_ID) ?? parsePositiveInt(process.env.BREVO_REUSABLE_TEST_CAMPAIGN_ID);
}

function canUsePasswordResetCampaignFallback() {
  return (
    parseBoolean(process.env.BREVO_PASSWORD_RESET_CAMPAIGN_FALLBACK_ENABLED) ||
    parseBoolean(process.env.BREVO_CAMPAIGN_FALLBACK_ENABLED)
  );
}

export async function sendPasswordResetEmail(values: PasswordResetEmailValues) {
  const config = getBrevoConfig();

  try {
    await sendWithBrevoTransactional(values, config);
    return;
  } catch (error) {
    if (!canUsePasswordResetCampaignFallback()) {
      throw error;
    }
  }

  const campaignId = getPasswordResetFallbackCampaignId();

  if (!campaignId) {
    throw new Error("Password reset campaign fallback is enabled but no reusable Brevo campaign id is configured.");
  }

  await sendWithReusableCampaignTest(values, {
    apiKey: config.apiKey,
    campaignId,
  });
}
