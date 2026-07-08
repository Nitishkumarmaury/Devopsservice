# DevOps Service Studio

Premium DevOps and cloud engineering landing page built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, Lucide icons, React Hook Form, and Zod.

This project is structured as a production-ready marketing site for cloud infrastructure, CI/CD automation, monitoring, migrations, production troubleshooting, and ongoing DevOps support.

## Technology Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion for React
- Lucide React
- React Hook Form
- Zod validation
- Server-side contact API
- Server-side Cloud Architecture Advisor integration

## Local Installation

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` from `.env.example`.

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
CONTACT_EMAIL_PROVIDER=brevo
CONTACT_EMAIL_TO=nitish.henceforth@gmail.com
CONTACT_EMAIL_FROM=nitish.henceforth@gmail.com
CONTACT_EMAIL_FROM_NAME=DevOps Service Studio
CONTACT_PROVIDER_API_KEY=
BREVO_CONTACT_LIST_IDS=
BREVO_CAMPAIGN_FALLBACK_ENABLED=false
BREVO_NOTIFICATION_LIST_IDS=
BREVO_REUSABLE_TEST_CAMPAIGN_ID=
AI_ADVISOR_ENABLED=true
AI_PROVIDER_API_KEY=
ADVISOR_MODEL=
AI_PROVIDER_PROJECT_REFERENCE=327005939382
MONGODB_URI=
AUTH_DB_NAME=Devopsservice
AUTH_USERS_COLLECTION=users
AUTH_BOOTSTRAP_USERNAME=
AUTH_BOOTSTRAP_PASSWORD=
AUTH_SESSION_SECRET=
AUTH_SESSION_MAX_AGE_SECONDS=86400
AUTH_PASSWORD_RESET_MAX_AGE_MINUTES=30
AUTH_PASSWORD_RESET_COOLDOWN_SECONDS=60
BREVO_PASSWORD_RESET_CAMPAIGN_FALLBACK_ENABLED=false
BREVO_PASSWORD_RESET_TEST_CAMPAIGN_ID=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The contact API route validates requests server-side and keeps provider credentials out of client code. `CONTACT_EMAIL_PROVIDER=brevo` sends contact inquiries through Brevo using `CONTACT_PROVIDER_API_KEY`. When `BREVO_CONTACT_LIST_IDS` is set, website leads are also added to those Brevo contact lists and saved with a CRM deal and note.

If Brevo transactional SMTP is not yet activated on the account, set `BREVO_CAMPAIGN_FALLBACK_ENABLED=true` and `BREVO_NOTIFICATION_LIST_IDS` to an owner-only Brevo list. This fallback creates and sends an internal campaign notification after a lead is captured. Do not point `BREVO_NOTIFICATION_LIST_IDS` at a public lead or newsletter list, because Brevo campaigns send to every recipient in the configured list.

When a Brevo account is still under validation and cannot create campaigns, `BREVO_REUSABLE_TEST_CAMPAIGN_ID` can be set to a reusable internal campaign ID. The contact route updates that campaign content and sends it as a Brevo test email to `CONTACT_EMAIL_TO`. Treat this as a temporary notification fallback until transactional SMTP is activated and the sending domain is authenticated.

## Login Protection

The contact request flow and Cloud Architecture Advisor are protected by a server-side session cookie. Configure `MONGODB_URI`, `AUTH_SESSION_SECRET`, and the bootstrap username/password in `.env.local`. On the first successful bootstrap login, the app stores a hashed user record in MongoDB and uses that user for later logins.

Visitors can create new accounts through `/signup`. Successful signup stores a hashed password in MongoDB and immediately creates the same secure session cookie used by `/login`.

Password reset links are sent through the configured Brevo email provider. Set `NEXT_PUBLIC_SITE_URL` to the real public HTTPS origin before production deploys, because reset emails are built from that value rather than request headers. `AUTH_PASSWORD_RESET_MAX_AGE_MINUTES` controls reset link expiry and `AUTH_PASSWORD_RESET_COOLDOWN_SECONDS` controls per-account resend cooldown.

If Brevo transactional sending is not active yet, `BREVO_PASSWORD_RESET_CAMPAIGN_FALLBACK_ENABLED=true` can send reset emails through a reusable Brevo test campaign. Prefer a dedicated `BREVO_PASSWORD_RESET_TEST_CAMPAIGN_ID`; otherwise the app falls back to `BREVO_REUSABLE_TEST_CAMPAIGN_ID`.

Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to enable shared Redis-backed forgot-password rate limiting. Without those values, the route falls back to the in-memory limiter used for local development.

Protected surfaces:

- `/contact`
- `/advisor`
- `/api/contact`
- `/api/ai/cloud-advisor`

## Cloud Architecture Advisor

The `Cloud Architecture Advisor` section uses a server-side provider helper only. No provider key is exposed to React components, browser JavaScript, HTML, console logs, or API responses.

Install or refresh dependencies with:

```bash
npm install
```

Set these variables in `.env.local` for local development and in your production host:

```bash
AI_ADVISOR_ENABLED=true
AI_PROVIDER_API_KEY=your-server-only-provider-key
ADVISOR_MODEL=gemini-2.5-flash
AI_PROVIDER_PROJECT_REFERENCE=327005939382
```

The project reference is stored only for provider-side identification. Authentication uses `AI_PROVIDER_API_KEY`.

Security rules:

- Do not use `NEXT_PUBLIC_` for the advisor provider key.
- Do not pass the key through React props, Client Components, browser JavaScript, HTML, console logs, API responses, or commits.
- The provider SDK is used only in `app/api/ai/cloud-advisor/route.ts` through server-side helpers.
- The advisor sends only technical architecture fields. It does not collect contact information before generation.

To disable the advisor section, set:

```bash
AI_ADVISOR_ENABLED=false
```

The API route validates input and provider output with Zod, limits request body size, applies a short in-memory per-IP limiter, uses a request timeout, and attempts one controlled JSON repair. The in-memory limiter is suitable for basic development protection only; it does not coordinate across every serverless instance. Replace `lib/ai/rate-limit.ts` with Redis, Upstash, or another shared store for production-grade abuse protection.

## Content Editing

- Update company name, URL, email, and location in `lib/constants.ts`.
- Edit services in `data/services.ts`.
- Edit technology and capability groups in `data/technologies.ts`.
- Edit workflow, solutions, process, and why-us content in `data/landing.ts`.
- Edit case study categories in `data/case-studies.ts`.
- Edit pricing guidance in `data/pricing.ts`.

## Metrics

Metrics are controlled by `data/metrics.ts`.

Set `showMetricsSection` to `true` only after verified business metrics are available.

## Case Studies

The project examples section uses realistic engagement patterns without publishing unverified client metrics.

## Testimonials

Testimonials are hidden while `data/testimonials.ts` exports an empty array. Add approved testimonials with:

```ts
{
  quote: "",
  name: "",
  position: "",
  company: "",
  avatar: "",
}
```

## Production Build

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Deployment On Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy with the default Next.js settings.
5. Confirm `AI_PROVIDER_API_KEY` is configured only as a server-side production secret if the advisor is enabled.

## Deployment On A Linux Server

```bash
npm install
npm run build
npm run start
```

For production, run behind Nginx, Apache, or Caddy with HTTPS, process management, logs, and monitoring. PM2 can be used to manage the Next.js process.

## Accessibility Notes

- Semantic sections and headings
- Skip-to-content link
- Keyboard accessible navigation and mobile menu
- Accessible FAQ accordion
- Accessible form labels and status messages
- Reduced-motion support in global CSS

## Performance Notes

- Server Components are used by default.
- Client Components are limited to navigation, animations, tabs, counters, accordion, and form behavior.
- The hero infrastructure visual is CSS-based and avoids heavy 3D dependencies.
- No third-party tracking scripts are loaded.

## Publishing Warning

Replace all sample metrics, project outcomes, contact information, social links, and legal content with verified information before publishing.
