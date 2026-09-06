# Form & Field — release verification

Date: 2026-09-06. Source: 88a618e. Environment: Windows, local Chrome, production Vite preview using /python-automation-portfolio/; Lighthouse 12 and axe-core through Playwright. Node 24.15.0.

## Results

- UI regression suite: 17 passed, 0 failed.
- Pages artifact suite: 2 passed, 0 failed; root HTML, 404 fallback, and the known case route contain identical application entries.
- Disclosure audit: 3 required notices present; 0 unsupported-claim patterns.
- Build: successful, repository base included; self-hosted fonts and license texts included.
- Both routes at 360×800, 768×1024, 1440×1000: no horizontal overflow; no axe WCAG 2/2.1 A/AA violations.
- No page exceptions or HTTP failures observed.
- Mobile menu, Escape focus, direct case refresh, cross-route inquiry, invalid form focus, successful local-only submit, and reset focus passed.
- Additional keyboard-only checks: skip link, case navigation, visible focus, mobile menu open/close passed; reduced-motion animation disabled.
- Independent code review: no unresolved Critical or Important findings. Trailing-slash document title and cover contrast were corrected and re-reviewed.

| Page | Preset | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- | --- |
| Home | Mobile | 97 | 100 | 100 | 100 |
| Home | Desktop | 97 | 100 | 100 | 100 |
| Aster House | Mobile | 95 | 100 | 96 | 100 |
| Aster House | Desktop | 95 | 100 | 96 | 100 |

The case-study Best Practices advisory concerns small type, including deliberately scaled mockup illustrations. These measurements are local single-run evidence, not real-user performance data or accessibility certification.

## Visual package

Screenshots were captured directly from the same local production build with local fonts loaded and motion reduced, then visually inspected.

- home-desktop.png: 1440×1600, homepage opening and selected-work introduction.
- aster-house-desktop.png: 1440×1600, case-study opening and hospitality concept.
- home-mobile.png: 360×1600, responsive homepage.

## Publication boundary

Deployment of e9ab71a was subsequently verified on 2026-09-06: GitHub Actions run 34032578359 succeeded; homepage and /work/aster-house/ both returned HTTP 200 and exactly matched the verified local HTML. The public browser rendered both pages, navigated from home to case, and retained the case title/content after direct refresh. The deployed design is unchanged from the screenshots.

Live: https://ygz1130.github.io/python-automation-portfolio/

Upwork copy remains a draft pending the user's review and explicit publication approval. Original data-cleaner work is unchanged.
