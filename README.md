# Visit Nairobi — Your Gateway to Africa

A production-oriented destination, business and investment platform built with Next.js App Router, TypeScript, Tailwind CSS, Cloudflare D1 and R2. It includes the public editorial experience, search and filtering, saved-item and itinerary tools, operational forms, SEO infrastructure and a role-oriented administration dashboard.

## Local setup

1. Use Node.js 22.13 or newer.
2. Copy `.env.example` to `.env.local` and set the values required for your environment.
3. Run `npm install`.
4. Run `npm run db:generate` after schema changes.
5. Run `npm run dev` and open the local address shown.
6. Run `npm test` before deployment.

The hosting platform injects the D1 binding `DB` and the R2 binding `MEDIA`. Local D1 development uses Wrangler’s local database. Never commit real secrets.

The curated records are defined in `app/expanded-content.ts` and mirrored into D1 by `db/seed.ts`. The seed includes 20 Nairobi-and-beyond destinations, more than 30 editorial stories, visitor attractions, restaurants, hotels, nightlife and shopping. Changeable details link to official sources rather than being copied into stale fields.

## Editorial workflow

Content moves through **Draft → In review → Approved → Scheduled/Published → Archived**. Contributors create drafts but do not publish. A rejection must include an editorial reason. Content with changeable facts should include verification status, source, source URL, reference period where relevant, last-reviewed date and the next review date.

Suggested role boundaries:

- Super administrator: all configuration and user management.
- Administrator: content, workflows and operational records.
- Editor: review, approve and publish editorial content.
- Contributor: create and update drafts only.
- Events manager: events and event submissions.
- Partnerships manager: partner records and enquiries only.
- Business content manager: business hub and sector content.
- Support agent: contact and outdated-information reports.
- Analyst: read-only dashboards and exports.

The dashboard included in this build demonstrates these queues and workflow transitions. Connect identity claims to the server-side role checks before public organisational launch.

## Forms and email

Forms validate email and consent, contain a honeypot, post to `/api/forms`, and persist submissions in D1. Newsletter subscriptions and operational enquiries appear in the admin data feed. Configure `EMAIL_API_URL`, `EMAIL_API_KEY`, `EMAIL_FROM`, and `STAFF_NOTIFICATION_EMAIL` for provider delivery. Add an edge rate limiter or Turnstile at deployment for public launch.

## Identity and administration

Sign-in and registration use the hosting platform’s secure identity flow. Saved items, account preferences, exports and deletion are handled by D1-backed API routes. Set `ADMIN_EMAILS` to a comma-separated allowlist for administrator data access. The admin feed seeds the structured content catalogue on first use and displays live content, subscriber, user and submission counts.

## Media

Production uploads belong in R2, with metadata in D1: alt text, caption, creator credit, licence, source URL, focal point, rights restrictions and expiry date. Demonstration photography in `public/images` is sourced from Wikimedia Commons and credited in the site footer.

## Deployment, backups and restoration

Deploy the built worker and static assets with the D1 and R2 bindings declared in `.openai/hosting.json`. Schedule daily D1 exports and R2 object-version retention; encrypt backup storage and test restoration quarterly. Restoration should create a fresh database, apply migrations in order, import the latest verified export and reconcile media objects before traffic is switched.

## Launch checklist

- Replace draft legal copy with counsel-approved text.
- Verify every changing fact and official source.
- Configure map, email, analytics and consent providers.
- Add organisational identity, role claims and server-side authorisation.
- Configure rate limiting, bot protection and upload scanning.
- Run accessibility testing with keyboard, screen reader and zoom.
- Run responsive, metadata, broken-link and performance checks.
- Confirm retention periods, privacy contacts and incident procedures.
