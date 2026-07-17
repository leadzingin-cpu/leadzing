# Deployment Guide

## Prerequisites

- The booking backend (`apps-script/`) already deployed as a Google Apps
  Script Web App, with its `/exec` URL in hand. If you haven't done this
  yet or need to redeploy, see the "Booking backend" section near the
  bottom of this file first.
- A Vercel account connected to whatever Git host this repository lives
  on (GitHub/GitLab/Bitbucket).

## 1. Verify locally before pushing

From the `leadzing-hero/` directory:

```bash
npm install
npm run lint         # must show "No ESLint warnings or errors"
npx tsc --noEmit      # must produce no output at all
npm run build         # must finish with "Compiled successfully"
npm run dev            # spot-check the site at http://localhost:3000
```

All four passed cleanly in this cleanup's own verification, except
`npm run build`, which couldn't be run to completion in the *sandbox this
cleanup was performed in* specifically because that environment has no
network access to download Next.js's native SWC compiler binary — an
environment restriction, not a project issue (see `CHANGELOG.md` for the
full explanation). Run it yourself once locally before pushing, on a
machine with normal internet access, for a final confirmation — it's
expected to pass, since the two checks that catch the overwhelming
majority of real build failures (`tsc`, `next lint`) both already do.

## 2. Environment variable

The project needs exactly one environment variable:

```
NEXT_PUBLIC_BOOKING_API_URL=https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXX/exec
```

This is already set in your local `.env.local` (gitignored, not part of
the repository — never commit it). You'll set the same value in Vercel
directly (next step) since `.env.local` doesn't travel with a Git push.

## 3. Import the project into Vercel

1. [vercel.com/new](https://vercel.com/new) → import this Git repository.
2. Vercel auto-detects Next.js — leave **Framework Preset** as "Next.js."
3. **Root Directory**: leave as `.` (the repository root) *unless* this
   repository's root actually contains a wrapping folder above
   `leadzing-hero/` — in that case, set Root Directory to `leadzing-hero`.
   Confirm by checking that `package.json` is directly inside whatever
   directory you set as the root.
4. **Build Command**: leave as the default (`next build` / `npm run build`).
5. **Output Directory**: leave as the default (`.next`).
6. **Install Command**: leave as the default (`npm install`).

## 4. Add the environment variable in Vercel

Project Settings → Environment Variables:

| Key | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_BOOKING_API_URL` | your Apps Script `/exec` URL | Production, Preview, Development |

Since this is a `NEXT_PUBLIC_*` variable, it's baked into the client
bundle at build time — if you ever change the Apps Script deployment URL,
you'll need to update this value in Vercel **and trigger a new deploy**
(redeploying without a fresh build won't pick up the change).

## 5. Deploy

Click **Deploy**. Vercel will run `npm install` then `npm run build`
using the environment variable from step 4. First deploy typically takes
1-3 minutes.

## 6. Post-deploy checklist

- [ ] Homepage loads, all six sections render (Hero, Problem, Solution,
      Capabilities, Process, Final CTA/Footer).
- [ ] Navbar's anchor links scroll to the right sections.
- [ ] "Book Discovery Call" (Navbar, Hero, Final CTA) all open the same
      booking modal.
- [ ] Complete a full test booking (Schedule -> Details -> Confirm) and
      verify a new row appears in the "LeadZing Leads" Google Sheet
      within a few seconds.
- [ ] "About" in the Navbar opens the About modal; ESC and outside-click
      both close it.
- [ ] Resize/test on a phone-width viewport: Process section shows the
      accordion, nav menu opens/closes properly, nothing overflows
      horizontally.

## 7. Custom domain (optional)

Project Settings → Domains → add your domain, then follow Vercel's DNS
instructions (usually a CNAME or A record at your registrar).

---

## Booking backend (Google Apps Script) — redeploying if needed

Only needed if you're setting this up fresh, or the Apps Script code in
`apps-script/` has changed since the last deployment.

1. Open the Google Sheet named **LeadZing Leads** (or create a new blank
   spreadsheet and rename it exactly that).
2. **Extensions → Apps Script**.
3. Replace the default `Code.gs` content with this repo's
   `apps-script/Code.gs`.
4. Add a second file (**+ → Script**) named `Config`, paste in
   `apps-script/Config.gs`.
5. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the generated `/exec` URL and use it as
   `NEXT_PUBLIC_BOOKING_API_URL` (both locally in `.env.local` and in
   Vercel's environment variables).
7. If you edit `Code.gs`/`Config.gs` later, you must **Deploy → Manage
   deployments → (edit icon) → New version → Deploy** to publish the
   change — saving the file alone does not update the live `/exec`
   endpoint's behavior.
