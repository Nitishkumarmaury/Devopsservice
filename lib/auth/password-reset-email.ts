import { siteConfig } from "@/lib/constants";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";
type PasswordResetEmailValues = {
  to: string;
  fullName?: string;
  resetUrl: string;
  expiresAt: Date;
};

export class EmailProviderIpBlockedError extends Error {
  ipAddress?: string;

  constructor(message = "Email provider blocked this server IP address.", ipAddress?: string) {
    super(message);
    this.name = "EmailProviderIpBlockedError";
    this.ipAddress = ipAddress;
  }
}

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
  const fromName = siteConfig.name;

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

function formatExpiry(expiresAt: Date) {
  return expiresAt.toLocaleString("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

function isBrevoIpBlockedMessage(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("unrecognised ip address") ||
    normalized.includes("unrecognized ip address") ||
    normalized.includes("authorised_ips") ||
    normalized.includes("authorized ips") ||
    normalized.includes("ip not authorized")
  );
}

function getBlockedIpAddress(message: string) {
  return message.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/)?.[0];
}

function buildHtmlEmail(values: PasswordResetEmailValues) {
  const name = values.fullName?.trim() || "there";
  const expiry = formatExpiry(values.expiresAt);

  return `
    <div style="margin:0;padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:bold;">Secure account access</p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;">Reset your password</h1>
      <p style="margin:0 0 12px;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;">
        We received a request to reset your ${escapeHtml(siteConfig.name)} account password. Use the secure link below to choose a new password.
      </p>
      <p style="margin:0 0 16px;">
        <a href="${escapeHtml(values.resetUrl)}">Reset password</a>
      </p>
      <p style="margin:0 0 12px;font-size:13px;">
        This link expires at ${escapeHtml(expiry)} and can be used only once. If you did not request this, you can safely ignore this email.
      </p>
      <p style="margin:0;font-size:12px;line-height:1.5;word-break:break-all;">
        ${escapeHtml(values.resetUrl)}
      </p>
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
    if (response.status === 401 && isBrevoIpBlockedMessage(message)) {
      throw new EmailProviderIpBlockedError(undefined, getBlockedIpAddress(message));
    }
    throw new Error("Password reset email could not be sent.");
  }
}

export async function sendPasswordResetEmail(values: PasswordResetEmailValues) {
  const config = getBrevoConfig();
  await sendWithBrevoTransactional(values, config);
}
