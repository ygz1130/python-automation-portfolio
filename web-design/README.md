# Form & Field

An independent-studio website and hospitality case study, created as a self-initiated fictional portfolio demonstration. This is concept work, not a claim of paid client engagement.

## What it demonstrates

Editorial art direction, a responsive React interface, structured case-study storytelling, accessible menu and form interactions, reduced-motion support, and a static deployment workflow.

## Run locally

Requires Node 22.12+ or a newer supported LTS release.

```sh
npm ci
npm run dev
npm run test:run
npm run build
npm run preview
node --test scripts/create-pages-fallback.test.mjs
node scripts/check-content.mjs
```

## Routes

- / — studio homepage
- /work/aster-house — fictional coastal-retreat case study

The inquiry form validates locally, displays a demo success message, and does not transmit or store its input.

## Deployment

The GitHub Actions workflow builds with VITE_BASE_PATH=/python-automation-portfolio/. The router and assets use that same basename. The release script emits a direct work/aster-house/index.html entry for a successful direct request, plus a 404.html fallback and .nojekyll. Pages serves only the dist directory.

Deployment implementation follows [Vite static deployment guidance](https://vite.dev/guide/static-deploy) and [GitHub custom Pages workflow guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Provenance

All layout, interface mockups, and concept identities were authored for this demo. Font license information and image prompts are recorded with their assets. Aster House is a fictional property. No client endorsement, launch metric, or business-performance improvement is claimed.

- Instrument Serif: self-hosted through `@fontsource/instrument-serif`; Copyright 2022 The Instrument Serif Project Authors. [SIL Open Font License 1.1](public/licenses/instrument-serif-OFL.txt).
- DM Sans: self-hosted through `@fontsource/dm-sans`; Copyright 2014 The DM Sans Project Authors. [SIL Open Font License 1.1](public/licenses/dm-sans-OFL.txt).
- Original scene imagery: [exact generation prompts and provenance](portfolio/image-provenance.json). WebP variants and JPEG fallbacks are in `public/images/`.

## Validation status

Validated locally on 2026-09-06 against production source commit `88a618e` with the repository deployment basename.

- 17 interface tests and 2 Pages fallback tests passed; disclosure audit and production build passed.
- Both routes passed at 360×800, 768×1024, and 1440×1000: no horizontal overflow, failed requests, page exceptions, or axe WCAG 2/2.1 A/AA violations.
- Verified keyboard navigation, visible focus, mobile menu/Escape, direct refresh, cross-route anchors, local form validation/success/reset, and reduced-motion behavior.

| Page | Lighthouse preset | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- | --- |
| Homepage | Mobile | 97 | 100 | 100 | 100 |
| Homepage | Desktop | 97 | 100 | 100 | 100 |
| Aster House | Mobile | 95 | 100 | 96 | 100 |
| Aster House | Desktop | 95 | 100 | 96 | 100 |

Scores are single local Chrome/Lighthouse runs, not guarantees for all devices or a certification. The case-study font-size advisory includes deliberately scaled interface illustrations. Automated accessibility checks do not replace a complete manual audit.

See [QA record](portfolio/qa-summary.md), [keyboard checks](portfolio/keyboard-qa.json), and [Upwork entry draft](portfolio/upwork-entry.md). Screenshots show the verified production build.

Published at [Form & Field](https://ygz1130.github.io/python-automation-portfolio/) on 2026-09-06. The [Aster House route](https://ygz1130.github.io/python-automation-portfolio/work/aster-house/) also returned HTTP 200 and rendered correctly after a direct browser refresh. Both public HTML entries exactly matched the locally verified production build. [Deployment run](https://github.com/ygz1130/python-automation-portfolio/actions/runs/34032578359) completed successfully after Pages was enabled in repository settings. Upwork submission remains pending user review.
