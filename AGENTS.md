# AGENTS.md

Static, **Arabic-first** bilingual marketing site for Dr. Kareem Zaher (urology clinic). Vanilla HTML/CSS/ES modules. No framework, no bundler, no runtime dependencies.

## Commands

- `npm run build` — runs `build_articles.js` (Node CommonJS). Regenerates `articles/articleN.html`, `articles/articles_meta.js`, and `sitemap.xml` from `articles/*.json`. Run after adding/editing article JSON.
- **No test, lint, or typecheck scripts exist.** `.eslintrc.yml` extends `standard`, but eslint is not installed and there are no devDependencies. Do not assume `npm run lint`/`test` works.
- Serve over a static HTTP server (VSCode Live Server on port **5500**). ES modules + `fetch` will not work from `file://`.

## Critical: `js/urls.js` is a dev/prod toggle

`url` in `js/urls.js` is switched manually between local dev (`http://<hostname>:5500`) and production (`https://<hostname>`); the other value is left commented. Every shared module imports it as the base for asset/image/JSON URLs and nav links. The file's TODO says "SWITCH ON PUSH". Check which value is active before committing or publishing, and do not flip it casually.

## Architecture

- Top-level `*.html` are hand-authored pages: `index`, `appointments`, `services`, `articles`, `reviews`, `erection_test`, `thankyou`. `articles/articleN.html` are **generated — do not hand-edit**.
- Service detail pages live at `services/<slug>/index.html` (clean URL `/services/<slug>/`) and use relative `../../` asset paths, like the generated `articles/`. A `page` field on `js/services_data.js` entries is used by `js/services.js` for the card CTA; list their URLs in the `servicePages` array inside `build_articles.js` for the sitemap. List every service page there (currently: `services/varicocelectomy/`, `services/laser_lithotripsy/`, `services/turp/`, `services/penile_prothesis/`, `services/pcnl/`, `services/turbt/`).
- Shared nav, contact block, social links, and footer are injected client-side by `js/nav_and_footer_add.js`, but only into pages whose `<body>` id is in its `navPagesIds` list. `index.html` is the exception (nav/footer are inline).
- `build_navbar.js` sets the active nav link by matching `.nav-link` id to `<body id>` — keep those ids in sync with `js/navigation_data.js`.
- Data lives in hand-maintained ESM files: `js/services_data.js`, `js/ratings_data.js`, `js/navigation_data.js`. `js/fetch_doctor_data.js` is a stub (exports `{}`; fetch logic commented out).
- `json/` is unused legacy (only referenced in a commented line). `server/` is gitignored.

## Localization

- Arabic is the default and baked directly into HTML on elements tagged `lang-key="..."`.
- English is fetched at runtime from `lang/en.json`; `localization.js` swaps text per `lang-key`, flips `<html dir>`, and persists choice in `localStorage.lang`. Arabic is restored from a DOM cache, so `lang/ar.json` is not fetched. The cache uses `innerText || textContent` because `innerText` is empty for content hidden by a closed `<details>` (e.g. the service-page FAQ), which would otherwise blank Arabic on EN→AR.
- To add translatable text: add `lang-key` to the element, put Arabic inline, and add the same key to `lang/en.json`. `js/services.js` re-renders via a MutationObserver on `<html lang>`.

## Article content workflow

`articles/*.json` schema: `id, title, description, imgUrl, keywords, datePublished, filePath, url, relatedArticles[], faq[], tableOfContents[], paragraphs[]`. The output filename is `article{id}.html`, and `id` must be unique. `build_articles.js` also hardcodes static sitemap entries and `SITE_URL` — edit the script, not `sitemap.xml` directly. Article content is Arabic-only (`lang="ar" dir="rtl"`).

## Booking flow

`appointments.html` → `js/flip_calender.js` + `js/calender_update_module.js` + `js/book_appointment.js`. Submits a POST to the n8n webhook `https://n8n.prkln.app/webhook/sms`, then redirects to `thankyou.html`. The schedule is hardcoded in `js/book_appointment.js` (`sch`) and `js/schedule.js`, mirroring clinic hours (Sat/Tue/Wed/Thu, 7–10 PM). A separate backend at `https://cosmosurgeserver.xyz/` is referenced only in `var.env`.

## Repo facts

- Remote: `github.com/pheonixeye/kareemzaher.com`. Branches: `master`, `dev`, `dev-static`. No CI.
- Generated files and article data are version-controlled; rerun the build and commit its output when article JSON changes.
