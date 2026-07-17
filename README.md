# LeadZing Website

Marketing site for LeadZing, a creative marketing agency — built with
Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Framer
Motion. Includes a global "Book Discovery Call" booking modal backed by
a Google Apps Script + Google Sheets integration, and a global "About"
modal.

## Getting started

```bash
npm install
# create .env.local — see "Environment variables" below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

```
NEXT_PUBLIC_BOOKING_API_URL=<your Google Apps Script /exec URL>
```

Required for the booking modal's "Confirm Booking" step to actually save
submissions. See `DEPLOYMENT.md` for how to obtain this URL if you don't
have one yet. The site otherwise runs and renders fully without it — only
the final booking submission will fail (with a visible inline error) if
it's missing.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # run the production build locally
npm run lint     # ESLint (next lint)
```

## Project structure

See `PROJECT_STRUCTURE.md` for the full annotated folder layout and the
conventions used throughout `components/`.

## Deployment

See `DEPLOYMENT.md` for the full Vercel deployment guide, including the
Google Apps Script backend setup.

## History

See `CHANGELOG.md` for the project's full build history and the most
recent architecture/cleanup audit.
