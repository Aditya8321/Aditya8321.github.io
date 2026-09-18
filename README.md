# Aditya Shah - portfolio

Personal site for **Aditya Shah**: NYU Tandon MSFE, IAQF 2026 winner, AI & Risk Management intern at Traxys North America (Summer 2026), Graduate TA for Financial Risk Management.

Live at **https://aditya8321.github.io** (GitHub Pages). Built with **Next.js 15** (static export) · **React 19** · **TypeScript** · **Tailwind CSS**. No server, no database, no analytics.

---

## Editing content

Everything textual lives in `data/`:

| What | File |
|---|---|
| Name, email, socials, headline, lede, "Now" block | `data/site.ts` |
| Experience list (most recent first) | `data/experience.ts` |
| Papers | `data/publications.ts` |
| Projects (`featured: true` = shown in "Selected") | `data/projects.ts` |
| Skills groups | `data/skills.ts` |
| Degrees + certifications | `data/education.ts` |
| About paragraphs | `components/sections/About.tsx` |

Files in `public/` are served as-is: `Aditya-Shah-Resume.pdf` (the résumé link in the nav), `profile.jpg`, `papers/`, `certificates/`, `projects/` (plot images).

**Updating the résumé:** copy the new PDF over `public/Aditya-Shah-Resume.pdf`, commit, push.

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build (writes the static site to `out/`):

```bash
npm run build
```

---

## Deployment: GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes `out/` on every push to `main`.

One-time setup in the GitHub repo:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Recommended: rename the repo to **`Aditya8321.github.io`** (Settings → General → Repository name) so the site lives at the root URL `https://aditya8321.github.io/`. Without the rename it is served at `https://aditya8321.github.io/portfolio/`; the workflow sets `NEXT_PUBLIC_BASE_PATH` automatically either way.
3. After renaming, update the local remote:
   ```bash
   git remote set-url origin git@github.com:Aditya8321/Aditya8321.github.io.git
   ```

### Optional custom domain

If a custom domain is kept (e.g. `adityashah.work`): Settings → Pages → Custom domain → enter it, tick **Enforce HTTPS**, and at the registrar add `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and a `CNAME` for `www` → `aditya8321.github.io`. The workflow picks the domain up on the next deploy.

---

## Contact form

The form posts JSON to [FormSubmit](https://formsubmit.co) (`https://formsubmit.co/ajax/<site email>`), which relays it to the inbox. No account or API key. **The first submission triggers a one-time activation email** to the site address; click the link in it and the form is live. Set `NEXT_PUBLIC_FORM_ENDPOINT` to use a different relay.

Inputs are validated client-side with Zod (`lib/contact-schema.ts`); a hidden honeypot field (`website`) is forwarded as FormSubmit's `_honey` so bot submissions are dropped.

---

## Design notes

Warm paper / ink palette with a rust accent, defined as CSS variables in `app/globals.css`; dark mode follows the system setting and can be toggled from the nav (stored in `localStorage`). Type: Instrument Serif for headings, IBM Plex Sans for text, IBM Plex Mono for dates and labels (self-hosted at build time via `next/font`). Sections use a two-column editorial layout with a sticky title (`components/ui/Section.tsx`). There is a print stylesheet, so the page prints as a CV.

Interactive pieces, all client-side and dependency-free: a ⌘K / Ctrl-K command palette (`components/CommandPalette.tsx`) that searches sections, projects, papers and links; a filterable project index with expand/collapse (`components/sections/ProjectIndex.tsx`); a Black–Scholes pricer with Greeks, a price curve and an implied-vol solver (`components/sections/Playground.tsx`, math in `lib/bs.ts`); native-`<dialog>` lightboxes for project plots; scrollspy in the nav; copy-email buttons; local time in the hero; a back-to-top link. Keyboard: `⌘K` search, `t` theme, `Esc` close.

Security: the site is static, so headers cannot be set by the host; a `Content-Security-Policy` meta tag in `app/layout.tsx` restricts scripts, styles, images, and connections to the site itself plus FormSubmit.

---

## History

Until September 2026 the site ran on Vercel with a Resend-backed API route for the contact form and the domain `adityashah.work` registered at GoDaddy. It was moved to GitHub Pages to keep hosting free.
