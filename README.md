# Virginia Dental Care Redesign Platform

This is no longer just a static homepage mockup. The project is now structured as a real platform foundation:

- `apps/web`: Next.js patient website and mobile-friendly PWA.
- `apps/api`: NestJS backend for booking, practice data, and PMS integration.
- `packages/shared`: Shared domain data and TypeScript contracts.
- `docs/static-prototype`: The first static HTML concept, kept only as reference.

## Run Locally

```bash
npm install
npm run dev
```

Web: `http://localhost:3000`  
API: `http://localhost:4000`

## Production Shape

- The web/mobile app never talks to Eaglesoft directly.
- Booking requests go through the Nest API.
- The API owns the PMS adapter and currently defaults to `EAGLESOFT_MODE=mock`.
- Real Eaglesoft scheduling should be implemented through Patterson Innovation Connection or an authorized integration partner, not direct database access or browser scraping.
- A temporary Netlify demo can run without a database. In that mode, appointment actions hand off to the practice's current booking link or phone number and do not store patient submissions on Netlify.
- Production appointment workflows should use a database-backed API for request status, audit history, integration attempts, and patient contact records.
- Production hosting on a VPS still needs HIPAA operational controls: BAA/vendor review, TLS, encryption, access control, audit logs, backups, retention rules, incident response, and restricted logging of patient-identifiable data.

See [docs/EAGLESOFT_INTEGRATION_PLAN.md](docs/EAGLESOFT_INTEGRATION_PLAN.md).

## Deploy Web Demo On Netlify

This repo includes `netlify.toml` for a Git-connected Netlify deploy:

- Build command: `npm run build:web`
- Publish directory: `apps/web/.next`
- Node version: `22`

Do not set `NEXT_PUBLIC_API_BASE_URL` for the demo-only Netlify site unless the Nest API is deployed separately. Without that variable, the booking area routes patients to the existing online booking link and phone number instead of storing form submissions.

## Production VPS Notes

- Deploy `apps/web` as the public Next.js app.
- Deploy `apps/api` behind HTTPS on a separate API subdomain or private reverse proxy path.
- Set `NEXT_PUBLIC_API_BASE_URL` only after the API, database, backup process, logging, and vendor contracts are ready for patient data.
- Use Postgres for booking requests, integration status, audit history, and patient contact records.
- Keep Eaglesoft as the scheduling source of truth and sync through approved Patterson Innovation Connection or an authorized scheduling partner.
