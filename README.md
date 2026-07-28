# CloudOpsync

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
NEXT_PUBLIC_SITE_URL=https://cloudopsync.com
CONTACT_EMAIL_PROVIDER=brevo
CONTACT_EMAIL_TO=hello@cloudopsync.com
CONTACT_EMAIL_FROM=hello@cloudopsync.com
CONTACT_PROVIDER_API_KEY=
BREVO_CONTACT_LIST_IDS=
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
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The contact API route validates requests server-side and keeps provider credentials out of client code. `CONTACT_EMAIL_PROVIDER=brevo` sends contact inquiries through Brevo transactional email using `CONTACT_PROVIDER_API_KEY`. When `BREVO_CONTACT_LIST_IDS` is set, website leads are also added to those Brevo contact lists and saved with a CRM deal and note.

Use Brevo transactional SMTP for production contact and password reset emails. Campaign and test-campaign sends are intentionally not used, because Brevo can add unsubscribe UI or a test subject prefix to those messages.

## Login and Public Lead Capture

The public contact request flow is open for lead capture and protected by server-side validation, a honeypot field, and rate limiting. The Cloud Architecture Advisor is protected by a server-side session cookie. Configure `MONGODB_URI`, `AUTH_SESSION_SECRET`, and the bootstrap username/password in `.env.local`. On the first successful bootstrap login, the app stores a hashed user record in MongoDB and uses that user for later logins.

Visitors can create new accounts through `/signup`. Successful signup stores a hashed password in MongoDB and immediately creates the same secure session cookie used by `/login`.

Password reset links are sent through the configured Brevo email provider. Set `NEXT_PUBLIC_SITE_URL` to the real public HTTPS origin before production deploys, because reset emails are built from that value rather than request headers. `AUTH_PASSWORD_RESET_MAX_AGE_MINUTES` controls reset link expiry and `AUTH_PASSWORD_RESET_COOLDOWN_SECONDS` controls per-account resend cooldown.

Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to enable shared Redis-backed forgot-password rate limiting. Without those values, the route falls back to the in-memory limiter used for local development.

Protected surfaces:

- `/advisor`
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
