# Product Architecture

## Apps

- `apps/web`: Next.js website and mobile PWA.
- `apps/api`: NestJS backend for booking, practice data, and integrations.
- `packages/shared`: Shared practice profile, services, and booking contracts.

## Why Next.js

- Server-rendered pages for SEO-heavy dental service pages.
- Fast mobile experience with installable PWA support.
- Component boundaries for service pages, booking, reviews, location, and app-like patient flows.

## Why NestJS

- Clean controller/service/module boundaries.
- Safe place to validate booking requests.
- PMS integration stays server-side.
- Can add auth, audit logs, rate limits, database persistence, queues, and notifications without rewriting the frontend.

## Mobile Strategy

Phase 1 should be an installable PWA because it gets the practice a mobile app surface without app-store delays:

- Book appointment.
- Call office.
- Get directions.
- New-patient checklist.
- Forms/reminders once vendor/PMS path is confirmed.

Phase 2 can be React Native/Expo if the business case needs native push notifications, app-store listing, wallet passes, or deeper offline behavior.

## Backend Integration Strategy

The backend exposes stable internal routes:

- `GET /api/practice`
- `GET /api/booking/availability`
- `POST /api/booking/requests`
- `GET /api/integrations/eaglesoft/status`

The PMS adapter can later switch from `mock` to `pic` or an authorized scheduling partner without changing the public UI contract.
