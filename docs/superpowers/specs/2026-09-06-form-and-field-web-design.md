# Form & Field Web Design Portfolio — Design Specification

**Date:** 2026-09-06

**Status:** Approved for implementation planning

**Project location:** `web-design/` within the `python-automation-portfolio` repository

## 1. Purpose and truthfulness

Form & Field is a self-initiated, fictional web-design demonstration created specifically for a public portfolio. It is not presented as paid client work, and no fabricated testimonial, revenue figure, conversion result, award, or client endorsement may appear anywhere in the site, repository, screenshots, or Upwork entry.

The demo must prove that the creator can deliver a polished, responsive marketing site with a coherent visual system, a convincing case-study narrative, thoughtful interaction design, accessible implementation, and production-ready frontend quality. It is intentionally small enough to finish and verify quickly.

## 2. Target customer and conversion goal

The target customer is a founder, small premium brand, creative studio, or early-stage product team seeking a focused website or product-marketing engagement. They value taste, clarity, responsive craftsmanship, and a short delivery cycle more than a large agency process.

The primary journey is:

1. Understand the studio's positioning from the homepage hero.
2. Inspect selected work and open the featured case study.
3. See the design reasoning, visual system, and responsive execution.
4. Return to a clear project-inquiry call to action.

The primary conversion is a completed local demo inquiry form. The form does not send data to a server or third party. It confirms submission in the interface and clearly labels itself as a demonstration.

## 3. Brand concept

### 3.1 Identity

- **Studio name:** Form & Field
- **Descriptor:** Independent digital design studio
- **Positioning:** Brand websites, product interfaces, and frontend experiences shaped with editorial restraint
- **Personality:** Quietly confident, tactile, precise, culturally aware, and human
- **Tone:** Short declarative copy, concrete language, no agency clichés, no inflated claims

### 3.2 Visual direction: Editorial Atelier

The design combines an art-book sensibility with the usefulness of a modern product studio. It should feel premium without looking corporate or ornamental.

- **Background:** warm ivory, approximately `#F3EFE6`
- **Primary text:** soft charcoal, approximately `#1D1D1A`
- **Primary accent:** deep forest green, approximately `#24463A`
- **Secondary accent:** muted terracotta, approximately `#B9654B`
- **Display type:** Instrument Serif
- **Body and interface type:** DM Sans
- **Grid:** 12-column desktop grid with intentional asymmetry; simplified 6-column tablet and 4-column mobile layouts
- **Spacing:** generous outer margins, large section pauses, and compact typographic groupings
- **Imagery:** original abstract compositions, interface mockups, typographic studies, and browser/device frames created for this demo
- **Texture:** subtle grain or paper texture is acceptable when CSS-generated and low contrast

Remote font loading may use Google Fonts, with resilient fallbacks. The experience must remain legible and structurally stable if remote fonts are unavailable.

### 3.3 Motion

Motion supports hierarchy rather than spectacle:

- restrained first-view reveal for hero text and artwork
- small image crop or translation changes on project-card hover
- animated underline or directional cue for text links
- short section reveals that never delay reading or navigation
- no scroll hijacking, custom cursor, autoplay audio, or continuously moving decorative element
- `prefers-reduced-motion` disables nonessential animation and smooth scrolling

## 4. Scope and routes

The implementation is a two-route React application:

- `/` — studio homepage
- `/work/aster-house` — complete fictional case study

The site is a frontend-only demo. It has no authentication, database, CMS, analytics tracker, payment system, file upload, real email delivery, or external form service.

## 5. Homepage information architecture and copy

### 5.1 Site header

The header contains:

- Form & Field wordmark linking to `/`
- `Work` anchor linking to `#work`
- `Services` anchor linking to `#services`
- `About` anchor linking to `#studio`
- `Start a project` link to `#inquiry`

On mobile, navigation becomes an accessible disclosure menu. It closes after selection, returns focus to the menu trigger when dismissed with Escape, and is operable by keyboard.

### 5.2 Editorial hero

**Eyebrow:** `Independent digital design studio`

**Headline:** `Digital experiences with a point of view.`

**Supporting copy:** `We shape distinctive brand websites and product interfaces for small teams with ambitious ideas.`

**Primary action:** `View selected work` → `#work`

**Secondary action:** `Start a project` → `#inquiry`

The hero includes an original abstract editorial composition that establishes the forest-green and terracotta palette without using stock photography.

### 5.3 Selected work

Section label: `Selected work`

Section introduction: `A small collection of identities, interfaces, and digital spaces designed to make complex ideas feel immediate.`

Three project cards are shown. Only Aster House has a full case-study route; the other two are intentionally labeled as concept previews and must not lead to empty pages.

1. **Aster House**
   - Category: `Hospitality identity · Editorial website`
   - Year: `2026`
   - Summary: `A warm digital home for a fictional coastal retreat, balancing slow-living atmosphere with direct booking clarity.`
   - Action: `View case study` → `/work/aster-house`
2. **Common Ground**
   - Category: `Community platform · Product UI`
   - Year: `2026`
   - Summary: `A concept interface that helps neighbourhood groups turn shared intentions into visible local projects.`
   - Label: `Concept preview`
3. **Noma Editions**
   - Category: `Independent publishing · Commerce concept`
   - Year: `2026`
   - Summary: `A restrained storefront concept built around limited editions, material detail, and editorial discovery.`
   - Label: `Concept preview`

Each card uses a distinct original visual system so the set demonstrates range while retaining one portfolio identity.

### 5.4 Services

Section label: `What we do`

Service groups:

- **Brand websites** — `Positioning, information architecture, visual direction, and responsive page design.`
- **Product interfaces** — `Focused flows and interface systems that make early products easier to understand and use.`
- **Frontend delivery** — `Accessible, responsive React builds with thoughtful motion and clean handoff.`

### 5.5 Process

Section label: `A clear path from idea to launch`

1. **Frame** — `Clarify the audience, message, scope, and measure of success.`
2. **Shape** — `Build the visual system and test the most important screen first.`
3. **Finish** — `Develop, refine across breakpoints, verify quality, and prepare the release.`

### 5.6 Studio statement

Anchor: `#studio`

**Heading:** `Small by design. Close to the work.`

**Body:** `Form & Field is a fictional independent studio concept created to demonstrate an end-to-end web-design process—from positioning and art direction to responsive frontend delivery. Every project shown here is original portfolio work, not a claim of paid client engagement.`

This statement is the site's clearest disclosure. It must remain visible in the final build and in screenshots where practical.

### 5.7 Inquiry section

Anchor: `#inquiry`

**Heading:** `Have a focused project in mind?`

**Supporting copy:** `Share the essentials. This portfolio demo will show the intended inquiry experience without sending your information.`

Fields:

- Name — required, 2–80 characters
- Email — required, valid email format
- Project type — required select: Brand website, Product interface, Frontend build, Other
- Budget range — optional select: Under $500, $500–$1,500, $1,500–$3,000, Exploring
- Project note — required, 20–800 characters
- Submit button: `Send project outline`

Above the button, display: `Demo form — nothing is transmitted or stored.`

On valid submit, prevent network activity, replace the form state with: `Thanks — your demo inquiry is ready. In a live project, this would be sent securely to the studio.` Include a `Write another inquiry` reset action.

Invalid fields show concise inline errors, set `aria-invalid` and `aria-describedby`, and move focus to the first invalid field or an error summary.

### 5.8 Footer

The footer contains the wordmark, `Selected work`, `Services`, `Inquiry`, the current year, and the disclosure `Self-initiated portfolio demonstration.` It must not include invented social profiles or contact details.

## 6. Aster House case study

### 6.1 Case-study premise

Aster House is a fictional six-room coastal retreat. The project demonstrates how a calm editorial identity can coexist with practical hospitality information. The case study describes design decisions and deliverables, not measured business performance.

### 6.2 Case-study hero

- **Project:** `Aster House`
- **Descriptor:** `A quiet digital retreat for the coast.`
- **Services:** `Strategy · Art direction · Web design · Frontend`
- **Year:** `2026`
- **Disclosure:** `Self-initiated fictional case study`

The hero includes an original full-width composition featuring the Aster House wordmark, a coastal color study, and a representative homepage frame.

### 6.3 Challenge

**Heading:** `Making stillness useful`

**Copy:** `The concept called for a site that felt slow and restorative without hiding the practical information a guest needs. The design had to hold atmosphere, room details, location, and a clear booking path in one restrained system.`

### 6.4 Strategy

**Heading:** `Editorial rhythm, hospitality clarity`

Three principles:

- **Lead with place** — natural color, generous crops, and short sensory language establish context quickly.
- **Reveal details progressively** — rooms, amenities, and location appear in a deliberate reading sequence.
- **Keep decisions visible** — dates, room types, and booking actions remain easy to find without dominating the mood.

### 6.5 Visual system

Show original assets for:

- a wordmark and typographic hierarchy
- a compact palette inspired by chalk, seaweed, sun-warmed clay, and ink
- icon or monogram studies drawn specifically for the concept
- desktop and mobile interface frames
- a small room-card and availability-module system

The presentation must explicitly label the imagery and identity as original concept work. Do not reuse an existing hotel's identity or imply a real property relationship.

### 6.6 Responsive screens

Show at least:

- homepage hero at desktop width
- room overview at desktop or tablet width
- booking or availability module at desktop width
- navigation, room card, and call-to-action states at mobile width

The screens may be rendered as code-native mockups or original raster artwork, but they must remain readable, consistent, and free of third-party marks.

### 6.7 Outcomes and deliverables

**Heading:** `A focused system ready to grow`

Use qualitative, verifiable language:

- `A responsive editorial homepage and room-discovery flow`
- `A compact identity and reusable interface system`
- `Clear booking cues without a heavy commerce aesthetic`
- `Accessible interaction patterns across desktop and mobile`

Do not use percentage improvements, customer quotes, launch statistics, or revenue claims.

### 6.8 Case-study close

Provide:

- `Back to selected work` → `/#work`
- `Start a project` → `/#inquiry`
- teaser for Common Ground labeled `Next concept preview`, without an inactive link masquerading as navigation

## 7. Technical architecture

### 7.1 Stack

- React
- Vite
- React Router
- custom CSS with shared tokens and component-level organization
- Vitest
- Testing Library

No component framework is required. Keep production dependencies deliberately small.

### 7.2 Directory boundary

All website code and website-specific assets live under `web-design/`. Existing automation-demo code must not be changed unless a repository-level documentation or deployment reference genuinely requires it.

Suggested implementation structure:

```text
web-design/
  public/
  src/
    assets/
    components/
    data/
    pages/
    styles/
    test/
  index.html
  package.json
  vite.config.js
```

### 7.3 Component boundaries

- `SiteHeader` — desktop navigation, mobile disclosure menu, current-route behavior
- `EditorialHero` — homepage introduction and primary visual
- `SelectedWork` — project collection and supported card states
- `ProjectCard` — linked case study or clearly non-linked concept preview
- `Services` — three service groups
- `Process` — three-stage approach
- `StudioStatement` — positioning and truthful portfolio disclosure
- `InquiryForm` — local validation, success state, reset behavior, no network submission
- `CaseStudyPage` — Aster House narrative composed from reusable case-study sections
- `SiteFooter` — navigation, current year, and disclosure
- `ScrollToTop` or equivalent route-transition behavior — ensures the case page opens at its beginning

Static project information belongs in local structured data so content is separate from repeated presentation markup. Form state remains local to `InquiryForm`; no global state library is needed.

### 7.4 Routing and GitHub Pages

The live demo is hosted from the existing GitHub repository with GitHub Pages, using a repository-scoped base path of `/python-automation-portfolio/`.

Implementation requirements:

- configure Vite `base` for the repository path
- configure React Router with the matching basename
- preserve clean application routes, including `/work/aster-house`
- produce a Pages-compatible `404.html` fallback from the built `index.html` so direct visits and refreshes on the case-study route return to the client router
- deploy only the `web-design` build output through a GitHub Actions workflow
- do not disturb the Python automation demo or expose local-only artifacts

The exact public Pages URL is expected to be `https://ygz1130.github.io/python-automation-portfolio/` once Pages is enabled and deployment succeeds.

## 8. Original asset policy

All visible project artwork must be original to this portfolio demo. Acceptable sources are:

- HTML and CSS compositions
- locally authored SVG shapes and icons
- AI-generated abstract or environmental imagery created specifically for the fictional project
- locally rendered browser and device mockups using the demo interface

Every generated image must be reviewed for accidental logos, signatures, malformed text, or resemblance to a named real brand. Text that matters to the case study should be rendered as HTML, SVG, or verified interface content rather than left to image-generation typography.

Repository documentation must record any third-party font license and any generated-image provenance needed for truthful reuse. No scraped website screenshots, unlicensed stock photography, or copied design-system assets are permitted.

## 9. Responsive, accessibility, and interaction requirements

### 9.1 Breakpoint verification

The finished site must be manually reviewed at:

- 360 × 800 mobile
- 768 × 1024 tablet
- 1440 × 1000 desktop

Layouts may adapt fluidly between these widths. There must be no unintended horizontal scrolling, clipped essential content, overlapping controls, or unreadably small text.

### 9.2 Accessibility

- semantic landmarks and heading order
- one visible page-level `h1` per route
- keyboard access to every interactive control
- clearly visible focus states
- minimum comfortable target sizes for touch controls
- meaningful alt text for informative images and empty alt text for decorative images
- labels and instructions associated with form controls
- errors announced to assistive technology
- sufficient foreground/background contrast
- mobile menu state expressed through accessible attributes
- reduced-motion support

### 9.3 Performance

- responsive image sizing, with AVIF or WebP sources and a compatible fallback for raster artwork
- lazy-load below-the-fold imagery
- no large animation library unless a measured need justifies it
- avoid layout shift caused by media or fonts
- no console errors or failed local asset requests in the production build

## 10. Test and acceptance criteria

### 10.1 Automated checks

Vitest and Testing Library must cover at minimum:

- homepage renders the positioning, selected work, and inquiry path
- Aster House card navigates to the case-study route
- concept-preview cards do not create broken navigation
- mobile menu opens, closes, and supports keyboard interaction
- inquiry validation rejects missing or malformed required data
- a valid inquiry produces the local success state without a network request
- inquiry reset returns to an empty form
- case-study page includes its fictional-project disclosure
- reduced-motion styling or behavior has a verifiable implementation hook

The production build must complete successfully.

### 10.2 Browser quality review

- verify both routes at all three target viewport sizes
- verify direct refresh on `/work/aster-house` in the deployed Pages environment
- complete the entire site using only the keyboard
- verify focus, menu, link, form-error, form-success, hover, and reduced-motion states
- confirm no console errors

### 10.3 Lighthouse targets

Run Lighthouse against the production build at desktop and mobile presets. Target:

- Performance: 90 or higher
- Accessibility: 95 or higher
- Best Practices: 90 or higher
- SEO: 90 or higher

If a target is missed, document the measured score and correct actionable issues before publication.

## 11. Portfolio publication package

The web-design project becomes a new, independent Upwork portfolio entry; it is not merged into the existing data-cleaner entry.

Prepare these assets only after the deployed site passes verification:

- desktop homepage screenshot at 1440px viewport
- desktop Aster House case-study screenshot at 1440px viewport
- mobile homepage or case-study screenshot at 360px viewport
- live GitHub Pages link
- public GitHub repository link

Recommended Upwork title: `Editorial Portfolio Website & Case Study — React`

Recommended role: `Web Designer & Frontend Developer`

Recommended description:

> Self-initiated fictional studio concept designed and built to demonstrate an end-to-end web-design workflow. I created the positioning, editorial art direction, responsive interface, accessible interactions, and React implementation. The site includes a conversion-focused homepage, an original hospitality case study, and a local demo inquiry flow. No real client relationship or performance result is claimed.

Recommended skills, adjusted to Upwork's available labels and maximum count:

- Web Design
- Responsive Design
- Landing Page
- React
- User Interface Design

Publication is a separate action. Do not create or submit the Upwork item until the user has reviewed the finished live demo and explicitly approved publication.

## 12. Definition of done

The project is ready for publication only when all of the following are true:

1. Both routes and all required sections are implemented under `web-design/`.
2. All portfolio claims and disclosures are truthful and visible.
3. All artwork is original or properly licensed and documented.
4. Automated tests and the production build pass.
5. Responsive, keyboard, reduced-motion, console, and direct-route checks pass.
6. Lighthouse targets are met or any remaining gap is explicitly reported and accepted.
7. GitHub Pages is live and both application routes are usable.
8. Three final portfolio screenshots accurately represent the deployed build.
9. The user has reviewed the live demo before any Upwork publication action.

## 13. Explicit non-goals

- building a real hospitality booking engine
- collecting or transmitting visitor data
- creating a backend or CMS
- adding more full case-study routes in this first version
- presenting fictional projects as paid engagements
- optimizing for a specific real brand or copying an existing studio site
- modifying the completed Python automation demo
