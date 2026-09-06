# Form & Field Web Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a polished two-route React portfolio demo for the fictional Form & Field studio, with an editorial homepage, a complete Aster House case study, an accessible local inquiry flow, original visuals, and a verified GitHub Pages deployment.

**Architecture:** A standalone Vite application lives under `web-design/` and uses React Router for `/` and `/work/aster-house`. Static content is stored in local structured data, interaction state stays inside focused components, artwork is rendered with HTML/CSS/SVG, and a Pages-specific fallback supports direct route refreshes without affecting the existing Python demo.

**Tech Stack:** Node.js 22, React 19, React Router 7, Vite 7, custom CSS, Vitest, Testing Library, jsdom, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-06-form-and-field-web-design.md`

## Global Constraints

- Work only inside `web-design/`, `.github/workflows/deploy-web-design.yml`, and directly related repository documentation.
- Preserve every existing `data-cleaner/` file and behavior.
- Use the exact studio identity `Form & Field` and exact fictional-project disclosures from the specification.
- Routes are exactly `/` and `/work/aster-house`; unsupported routes redirect to `/`.
- Production base path is `/python-automation-portfolio/`; local development uses `/`.
- The inquiry form performs no network request and stores no visitor data.
- Use original HTML, CSS, SVG, or newly generated assets; no scraped screens, real brand identities, or unlicensed stock media.
- Use Instrument Serif with Georgia fallback for display type, and DM Sans with Arial fallback for body/interface type.
- Core colors begin with ivory `#F3EFE6`, charcoal `#1D1D1A`, forest `#24463A`, and terracotta `#B9654B`.
- Verify 360 × 800, 768 × 1024, and 1440 × 1000 at both routes.
- Honor `prefers-reduced-motion`; do not add scroll hijacking, a custom cursor, autoplay audio, or endless decorative motion.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90 on mobile and desktop.
- Do not push, enable Pages, or create the Upwork entry without fresh user confirmation at that action boundary.
- Each task runs its focused test, the full suite, and a production build before its local commit.

---

## File Map

- `web-design/package.json`, `package-lock.json`, `index.html`, `vite.config.js` — runtime, document shell, test environment, and base path.
- `web-design/src/main.jsx`, `App.jsx` — browser entry and route table.
- `web-design/src/pages/HomePage.jsx`, `CaseStudyPage.jsx` — route compositions.
- `web-design/src/data/projects.js` — immutable selected-work content.
- `web-design/src/components/SiteLayout.jsx`, `SiteHeader.jsx`, `SiteFooter.jsx` — shared shell and route transitions.
- `web-design/src/components/EditorialHero.jsx`, `SelectedWork.jsx`, `ProjectCard.jsx`, `ProjectArtwork.jsx` — introduction and selected projects.
- `web-design/src/components/Services.jsx`, `Process.jsx`, `StudioStatement.jsx`, `SectionIntro.jsx` — homepage narrative.
- `web-design/src/components/InquiryForm.jsx` — local validation and success state.
- `web-design/src/components/AsterShowcase.jsx` — four original coded case-study scenes.
- `web-design/src/styles/tokens.css`, `base.css`, `layout.css`, `components.css`, `motion.css` — focused visual layers.
- `web-design/src/test/` — shared renderer plus route, card, header, homepage, form, case-study, and artwork tests.
- `web-design/scripts/create-pages-fallback.mjs`, its Node test, and `check-content.mjs` — deployment and truthfulness safeguards.
- `.github/workflows/deploy-web-design.yml` — isolated Pages pipeline.
- `web-design/README.md`, `portfolio/upwork-entry.md`, and three final PNG files — verified handoff package.

---

### Task 1: Create the isolated Vite foundation and route contract

**Files:**
- Create: `web-design/package.json`
- Create: `web-design/package-lock.json`
- Create: `web-design/index.html`
- Create: `web-design/vite.config.js`
- Create: `web-design/src/main.jsx`
- Create: `web-design/src/App.jsx`
- Create: `web-design/src/test/setup.js`
- Create: `web-design/src/test/renderApp.jsx`
- Create: `web-design/src/test/app-routing.test.jsx`

**Interfaces:**
- Produces: `AppRoutes(): JSX.Element`
- Produces: `renderApp(initialEntries?: string[]): RenderResult`
- Produces: scripts `dev`, `test`, `test:run`, `build`, `preview`

- [ ] **Step 1: Create dependency and test configuration**

Create this manifest and run `npm install` inside `web-design/` to generate the lockfile:

```json
{
  "name": "form-and-field-web-design",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "engines": { "node": ">=22" },
  "scripts": {
    "dev": "vite",
    "test": "vitest",
    "test:run": "vitest run",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.8.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.0",
    "@vitejs/plugin-react": "^4.7.0",
    "jsdom": "^26.1.0",
    "vite": "^7.1.0",
    "vitest": "^3.2.0"
  }
}
```

Create `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/python-automation-portfolio/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
}));
```

Run:

```bash
cd web-design
npm install
```

Expected: exit 0 and `package-lock.json` exists.

- [ ] **Step 2: Write failing route tests**

Create `src/test/app-routing.test.jsx`:

```jsx
import { screen } from '@testing-library/react';
import { renderApp } from './renderApp';

test('renders the studio homepage', () => {
  renderApp(['/']);
  expect(screen.getByRole('heading', { name: /digital experiences with a point of view/i })).toBeInTheDocument();
});

test('renders Aster House at its route', () => {
  renderApp(['/work/aster-house']);
  expect(screen.getByRole('heading', { name: 'Aster House' })).toBeInTheDocument();
});

test('redirects an unsupported route home', async () => {
  renderApp(['/missing-page']);
  expect(await screen.findByRole('heading', { name: /digital experiences with a point of view/i })).toBeInTheDocument();
});
```

Create `src/test/renderApp.jsx`:

```jsx
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';

export function renderApp(initialEntries = ['/']) {
  return render(<MemoryRouter initialEntries={initialEntries}><AppRoutes /></MemoryRouter>);
}
```

- [ ] **Step 3: Verify the route test is red**

```bash
npm run test:run -- src/test/app-routing.test.jsx
```

Expected: FAIL because `../App` does not exist.

- [ ] **Step 4: Implement the minimal route shell**

Create `src/App.jsx`:

```jsx
import { Navigate, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<main><h1>Digital experiences with a point of view.</h1></main>} />
      <Route path="/work/aster-house" element={<main><h1>Aster House</h1></main>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

Create `src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './App';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename || undefined}><AppRoutes /></BrowserRouter>
  </StrictMode>,
);
```

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
afterEach(cleanup);
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }),
});
Object.defineProperty(window, 'scrollTo', { writable: true, value: vi.fn() });
```

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Form & Field — a self-initiated web design portfolio demo." />
    <meta name="theme-color" content="#F3EFE6" />
    <title>Form & Field — Independent Digital Design Studio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Verify green and build**

```bash
npm run test:run -- src/test/app-routing.test.jsx
npm run test:run
npm run build
```

Expected: 3 route tests pass and Vite writes `dist/index.html`.

- [ ] **Step 6: Commit**

```bash
git add web-design
git commit -m "feat(web): scaffold Form and Field routes"
```

---

### Task 2: Define selected-work data and card states

**Files:**
- Create: `web-design/src/data/projects.js`
- Create: `web-design/src/components/ProjectCard.jsx`
- Create: `web-design/src/components/SelectedWork.jsx`
- Create: `web-design/src/test/project-card.test.jsx`

**Interfaces:**
- Produces: `projects: readonly Project[]`
- Produces: `ProjectCard({ project }): JSX.Element`
- `Project` fields: `slug`, `title`, `category`, `year`, `summary`, `artwork`, `href`, `status`
- `status` is `'case-study'` or `'concept-preview'`; only the former has a route.

- [ ] **Step 1: Write failing card tests**

Create `src/test/project-card.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';

const base = {
  slug: 'aster-house', title: 'Aster House', year: '2026', artwork: 'aster',
  category: 'Hospitality identity · Editorial website',
  summary: 'A warm digital home for a fictional coastal retreat.',
};

test('links a completed case study', () => {
  const project = { ...base, href: '/work/aster-house', status: 'case-study' };
  render(<MemoryRouter><ProjectCard project={project} /></MemoryRouter>);
  expect(screen.getByRole('link', { name: /view aster house case study/i })).toHaveAttribute('href', '/work/aster-house');
});

test('does not link a concept preview', () => {
  const project = { ...base, title: 'Common Ground', href: null, status: 'concept-preview' };
  render(<MemoryRouter><ProjectCard project={project} /></MemoryRouter>);
  expect(screen.getByText('Concept preview')).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Verify red**

```bash
npm run test:run -- src/test/project-card.test.jsx
```

Expected: FAIL because `ProjectCard` does not exist.

- [ ] **Step 3: Implement exact immutable content and both card states**

Create `projects.js`:

```js
export const projects = Object.freeze([
  Object.freeze({ slug: 'aster-house', title: 'Aster House', category: 'Hospitality identity · Editorial website', year: '2026', summary: 'A warm digital home for a fictional coastal retreat, balancing slow-living atmosphere with direct booking clarity.', artwork: 'aster', href: '/work/aster-house', status: 'case-study' }),
  Object.freeze({ slug: 'common-ground', title: 'Common Ground', category: 'Community platform · Product UI', year: '2026', summary: 'A concept interface that helps neighbourhood groups turn shared intentions into visible local projects.', artwork: 'common', href: null, status: 'concept-preview' }),
  Object.freeze({ slug: 'noma-editions', title: 'Noma Editions', category: 'Independent publishing · Commerce concept', year: '2026', summary: 'A restrained storefront concept built around limited editions, material detail, and editorial discovery.', artwork: 'noma', href: null, status: 'concept-preview' }),
]);
```

Implement `ProjectCard` with two explicit branches:

```jsx
import { Link } from 'react-router-dom';

export function ProjectCard({ project }) {
  const details = (
    <>
      <p>{project.category}</p>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <p>{project.year}</p>
    </>
  );
  if (project.status === 'case-study') {
    return <article>{details}<Link to={project.href} aria-label={`View ${project.title} case study`}>View case study</Link></article>;
  }
  return <article>{details}<span>Concept preview</span></article>;
}
```

`SelectedWork` uses `id="work"`, exact copy from specification section 5.3, and maps all three records.

- [ ] **Step 4: Verify and commit**

```bash
npm run test:run -- src/test/project-card.test.jsx
npm run test:run
npm run build
git add web-design/src/data web-design/src/components/ProjectCard.jsx web-design/src/components/SelectedWork.jsx web-design/src/test/project-card.test.jsx
git commit -m "feat(web): add selected work content model"
```

Expected: both card tests, full suite, and build pass before commit.

---

### Task 3: Build the accessible shared shell

**Files:**
- Create: `web-design/src/components/SiteLayout.jsx`
- Create: `web-design/src/components/SiteHeader.jsx`
- Create: `web-design/src/components/SiteFooter.jsx`
- Create: `web-design/src/test/site-header.test.jsx`
- Modify: `web-design/src/App.jsx`

**Interfaces:**
- Produces: `SiteLayout(): JSX.Element` with `<Outlet />`
- Header anchors: `/#work`, `/#services`, `/#studio`, `/#inquiry`
- Menu trigger names: `Open navigation`, `Close navigation`

- [ ] **Step 1: Write failing keyboard and disclosure tests**

Create `src/test/site-header.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';

test('opens the mobile menu and exposes its state', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><SiteHeader /></MemoryRouter>);
  const trigger = screen.getByRole('button', { name: 'Open navigation' });
  await user.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toHaveAttribute('data-open', 'true');
});

test('Escape closes the menu and restores trigger focus', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><SiteHeader /></MemoryRouter>);
  const trigger = screen.getByRole('button', { name: 'Open navigation' });
  await user.click(trigger);
  await user.keyboard('{Escape}');
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('footer discloses the demo status', () => {
  render(<MemoryRouter><SiteFooter /></MemoryRouter>);
  expect(screen.getByText('Self-initiated portfolio demonstration.')).toBeInTheDocument();
});
```

- [ ] **Step 2: Verify red**

```bash
npm run test:run -- src/test/site-header.test.jsx
```

Expected: FAIL because the shell components do not exist.

- [ ] **Step 3: Implement menu state and shared layout**

Use this focus contract in `SiteHeader`:

```jsx
const [isOpen, setIsOpen] = useState(false);
const triggerRef = useRef(null);
function closeMenu(restoreFocus = false) {
  setIsOpen(false);
  if (restoreFocus) triggerRef.current?.focus();
}
useEffect(() => {
  const onKeyDown = (event) => event.key === 'Escape' && isOpen && closeMenu(true);
  document.addEventListener('keydown', onKeyDown);
  return () => document.removeEventListener('keydown', onKeyDown);
}, [isOpen]);
```

The button uses `aria-controls="primary-navigation"`, `aria-expanded`, and the exact changing name. Navigation uses `id="primary-navigation"`, `aria-label="Primary navigation"`, and `data-open={String(isOpen)}`. Each selected link closes the menu.

`SiteLayout` renders a skip link to `#main-content`, `SiteHeader`, `<main id="main-content"><Outlet /></main>`, and `SiteFooter`. On pathname changes it calls `window.scrollTo({ top: 0, behavior: 'auto' })`. Update `AppRoutes` to use this parent layout for both routes and the wildcard redirect.

- [ ] **Step 4: Verify and commit**

```bash
npm run test:run -- src/test/site-header.test.jsx src/test/app-routing.test.jsx
npm run test:run
npm run build
git add web-design/src/App.jsx web-design/src/components/SiteLayout.jsx web-design/src/components/SiteHeader.jsx web-design/src/components/SiteFooter.jsx web-design/src/test/site-header.test.jsx
git commit -m "feat(web): add accessible site navigation"
```

Expected: shell and route tests, full suite, and build pass before commit.

---

### Task 4: Compose the complete homepage narrative

**Files:**
- Create: `web-design/src/pages/HomePage.jsx`
- Create: `web-design/src/components/EditorialHero.jsx`
- Create: `web-design/src/components/Services.jsx`
- Create: `web-design/src/components/Process.jsx`
- Create: `web-design/src/components/StudioStatement.jsx`
- Create: `web-design/src/components/SectionIntro.jsx`
- Create: `web-design/src/test/home-page.test.jsx`
- Modify: `web-design/src/App.jsx`

**Interfaces:**
- Produces: `HomePage(): JSX.Element`
- Produces: section IDs `work`, `services`, `studio`, `inquiry`
- Consumes: `SelectedWork(): JSX.Element`

- [ ] **Step 1: Write failing copy and anchor tests**

```jsx
import { screen, within } from '@testing-library/react';
import { renderApp } from './renderApp';

test('presents positioning and conversion paths', () => {
  renderApp(['/']);
  expect(screen.getByText('Independent digital design studio')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1, name: 'Digital experiences with a point of view.' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View selected work' })).toHaveAttribute('href', '#work');
  expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '#inquiry');
});

test('renders all service and process groups', () => {
  renderApp(['/']);
  const services = screen.getByRole('region', { name: 'What we do' });
  expect(within(services).getByRole('heading', { name: 'Brand websites' })).toBeInTheDocument();
  expect(within(services).getByRole('heading', { name: 'Product interfaces' })).toBeInTheDocument();
  expect(within(services).getByRole('heading', { name: 'Frontend delivery' })).toBeInTheDocument();
  for (const name of ['Frame', 'Shape', 'Finish']) expect(screen.getByRole('heading', { name })).toBeInTheDocument();
});

test('states that the studio and work are self-initiated', () => {
  renderApp(['/']);
  expect(screen.getByText(/form & field is a fictional independent studio concept/i)).toBeInTheDocument();
  expect(screen.getByText(/not a claim of paid client engagement/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Verify red**

```bash
npm run test:run -- src/test/home-page.test.jsx
```

Expected: FAIL because `HomePage` and its section components do not exist.

- [ ] **Step 3: Implement the approved homepage copy**

Compose the page from focused components:

```jsx
export function HomePage() {
  return (
    <>
      <EditorialHero />
      <SelectedWork />
      <Services />
      <Process />
      <StudioStatement />
      <section id="inquiry" aria-labelledby="inquiry-heading">
        <SectionIntro eyebrow="Start a project" headingId="inquiry-heading" heading="Have a focused project in mind?" copy="Share the essentials. This portfolio demo will show the intended inquiry experience without sending your information." />
      </section>
    </>
  );
}
```

Use every exact heading and body string in specification sections 5.2–5.6. `Services` has `id="services"` and `aria-label="What we do"`; `StudioStatement` has `id="studio"`. Use one `h1`, section `h2` elements, and card/service/process `h3` elements. Replace the temporary homepage route with `<HomePage />`.

- [ ] **Step 4: Verify and commit**

```bash
npm run test:run -- src/test/home-page.test.jsx src/test/app-routing.test.jsx
npm run test:run
npm run build
git add web-design/src/App.jsx web-design/src/pages/HomePage.jsx web-design/src/components/EditorialHero.jsx web-design/src/components/Services.jsx web-design/src/components/Process.jsx web-design/src/components/StudioStatement.jsx web-design/src/components/SectionIntro.jsx web-design/src/test/home-page.test.jsx
git commit -m "feat(web): compose editorial studio homepage"
```

Expected: homepage tests, full suite, and build pass before commit.

---

### Task 5: Implement the local-only inquiry form

**Files:**
- Create: `web-design/src/components/InquiryForm.jsx`
- Create: `web-design/src/test/inquiry-form.test.jsx`
- Modify: `web-design/src/pages/HomePage.jsx`

**Interfaces:**
- Produces: `validateInquiry(values): Record<string, string>`
- Produces: `InquiryForm(): JSX.Element`
- Field names: `name`, `email`, `projectType`, `budget`, `note`
- Success copy: `Thanks — your demo inquiry is ready. In a live project, this would be sent securely to the studio.`

- [ ] **Step 1: Write failing validation and no-network tests**

Create `src/test/inquiry-form.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, vi } from 'vitest';
import { InquiryForm, validateInquiry } from '../components/InquiryForm';

afterEach(() => vi.restoreAllMocks());

test('returns exact errors for invalid required values', () => {
  const values = { name: '', email: 'broken', projectType: '', budget: '', note: 'short' };
  expect(validateInquiry(values)).toEqual({
    name: 'Enter your name using 2 to 80 characters.',
    email: 'Enter a valid email address.',
    projectType: 'Choose a project type.',
    note: 'Describe the project using 20 to 800 characters.',
  });
});

test('marks and focuses the first invalid field', async () => {
  const user = userEvent.setup();
  render(<InquiryForm />);
  await user.click(screen.getByRole('button', { name: 'Send project outline' }));
  const name = screen.getByLabelText('Name');
  expect(name).toHaveAttribute('aria-invalid', 'true');
  expect(name).toHaveFocus();
});

test('submits locally without fetch and resets', async () => {
  const user = userEvent.setup();
  const fetchSpy = vi.spyOn(globalThis, 'fetch');
  render(<InquiryForm />);
  await user.type(screen.getByLabelText('Name'), 'Mira Chen');
  await user.type(screen.getByLabelText('Email'), 'mira@example.com');
  await user.selectOptions(screen.getByLabelText('Project type'), 'Brand website');
  await user.type(screen.getByLabelText('Project note'), 'A focused launch site for a new design-led service.');
  await user.click(screen.getByRole('button', { name: 'Send project outline' }));
  expect(fetchSpy).not.toHaveBeenCalled();
  expect(screen.getByText(/your demo inquiry is ready/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Write another inquiry' }));
  expect(screen.getByLabelText('Name')).toHaveValue('');
});
```

- [ ] **Step 2: Verify red**

```bash
npm run test:run -- src/test/inquiry-form.test.jsx
```

Expected: FAIL because the form module does not exist.

- [ ] **Step 3: Implement explicit validation and local state**

Use this exported validator:

```js
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateInquiry(values) {
  const errors = {};
  const nameLength = values.name.trim().length;
  const noteLength = values.note.trim().length;
  if (nameLength < 2 || nameLength > 80) errors.name = 'Enter your name using 2 to 80 characters.';
  if (!emailPattern.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.projectType) errors.projectType = 'Choose a project type.';
  if (noteLength < 20 || noteLength > 800) errors.note = 'Describe the project using 20 to 800 characters.';
  return errors;
}
```

Use controlled fields and `noValidate`. On submit, call only `event.preventDefault()`, validate, focus the first invalid control using a ref map, or set `submitted=true`. Do not call `fetch`, `XMLHttpRequest`, `sendBeacon`, local storage, or session storage.

Use the exact select options from specification section 5.7. Error IDs follow `${fieldName}-error`; invalid controls receive `aria-invalid="true"` and `aria-describedby`. The success copy has `role="status"`; reset restores initial values and focuses Name. Render `Demo form — nothing is transmitted or stored.` above the button and add `<InquiryForm />` to the homepage inquiry section.

- [ ] **Step 4: Verify and commit**

```bash
npm run test:run -- src/test/inquiry-form.test.jsx src/test/home-page.test.jsx
npm run test:run
npm run build
git add web-design/src/components/InquiryForm.jsx web-design/src/pages/HomePage.jsx web-design/src/test/inquiry-form.test.jsx
git commit -m "feat(web): add local-only project inquiry flow"
```

Expected: validation, focus, no-network, success, reset, full-suite, and build checks pass before commit.

---

### Task 6: Build the complete Aster House case study

**Files:**
- Create: `web-design/src/pages/CaseStudyPage.jsx`
- Create: `web-design/src/components/AsterShowcase.jsx`
- Create: `web-design/src/test/case-study.test.jsx`
- Modify: `web-design/src/App.jsx`

**Interfaces:**
- Produces: `CaseStudyPage(): JSX.Element`
- Produces: `AsterShowcase({ scene }): JSX.Element`
- `scene` is `'identity'`, `'rooms'`, `'booking'`, or `'mobile'`
- Return links are `/#work` and `/#inquiry`

- [ ] **Step 1: Write failing structure and link tests**

Create `src/test/case-study.test.jsx`:

```jsx
import { screen } from '@testing-library/react';
import { renderApp } from './renderApp';

test('renders the complete fictional case-study structure', () => {
  renderApp(['/work/aster-house']);
  expect(screen.getByRole('heading', { level: 1, name: 'Aster House' })).toBeInTheDocument();
  expect(screen.getByText('Self-initiated fictional case study')).toBeInTheDocument();
  for (const name of ['Making stillness useful', 'Editorial rhythm, hospitality clarity', 'A focused system ready to grow']) {
    expect(screen.getByRole('heading', { name })).toBeInTheDocument();
  }
});

test('provides real return links and a non-linked next preview', () => {
  renderApp(['/work/aster-house']);
  expect(screen.getByRole('link', { name: 'Back to selected work' })).toHaveAttribute('href', '/#work');
  expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/#inquiry');
  expect(screen.getByText('Next concept preview')).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /common ground/i })).not.toBeInTheDocument();
});

test('renders four original showcase scenes', () => {
  renderApp(['/work/aster-house']);
  expect(screen.getAllByRole('img', { name: /aster house concept/i })).toHaveLength(4);
});
```

- [ ] **Step 2: Verify red**

```bash
npm run test:run -- src/test/case-study.test.jsx
```

Expected: FAIL because the complete case-study modules do not exist.

- [ ] **Step 3: Implement exact narrative and coded scenes**

Import `Link` from `react-router-dom`, then build `CaseStudyPage` with approved public text rather than structural labels:

```jsx
<article className="case-study">
  <header className="case-hero">
    <p>Self-initiated fictional case study</p>
    <h1>Aster House</h1>
    <p>A quiet digital retreat for the coast.</p>
    <dl><dt>Services</dt><dd>Strategy · Art direction · Web design · Frontend</dd><dt>Year</dt><dd>2026</dd></dl>
    <AsterShowcase scene="identity" />
  </header>
  <section aria-labelledby="challenge-heading">
    <h2 id="challenge-heading">Making stillness useful</h2>
    <p>The concept called for a site that felt slow and restorative without hiding the practical information a guest needs. The design had to hold atmosphere, room details, location, and a clear booking path in one restrained system.</p>
  </section>
  <section aria-labelledby="strategy-heading">
    <h2 id="strategy-heading">Editorial rhythm, hospitality clarity</h2>
    <ul><li>Lead with place</li><li>Reveal details progressively</li><li>Keep decisions visible</li></ul>
  </section>
  <section aria-labelledby="visual-system-heading">
    <h2 id="visual-system-heading">Visual system</h2>
    <AsterShowcase scene="rooms" /><AsterShowcase scene="booking" />
  </section>
  <section aria-labelledby="responsive-heading">
    <h2 id="responsive-heading">Responsive screens</h2>
    <AsterShowcase scene="mobile" />
  </section>
  <section aria-labelledby="outcomes-heading">
    <h2 id="outcomes-heading">A focused system ready to grow</h2>
    <ul><li>A responsive editorial homepage and room-discovery flow</li><li>A compact identity and reusable interface system</li><li>Clear booking cues without a heavy commerce aesthetic</li><li>Accessible interaction patterns across desktop and mobile</li></ul>
  </section>
  <footer className="case-study__next">
    <Link to="/#work">Back to selected work</Link><Link to="/#inquiry">Start a project</Link>
    <p>Next concept preview</p><p>Common Ground</p>
  </footer>
</article>
```

Add the three full strategy descriptions and the visual-system paragraph from specification sections 6.4–6.6 beside this markup. Do not render quantitative results, testimonials, awards, or transactional behavior.

`AsterShowcase` uses `role="img"`; its `aria-label` value is the template string `Aster House concept — ${scene}`. Its four JSX scenes contain:

- `identity`: wordmark, four palette swatches, `COAST / 43.2° N`
- `rooms`: cards named `The Dune Room` and `The Garden Room`
- `booking`: `Arrival`, `Departure`, and `Check the stay`
- `mobile`: narrow frame, menu label, room title, and `Explore rooms`

Replace the temporary case route with `<CaseStudyPage />`.

- [ ] **Step 4: Verify and commit**

```bash
npm run test:run -- src/test/case-study.test.jsx src/test/app-routing.test.jsx
npm run test:run
npm run build
git add web-design/src/App.jsx web-design/src/pages/CaseStudyPage.jsx web-design/src/components/AsterShowcase.jsx web-design/src/test/case-study.test.jsx
git commit -m "feat(web): add Aster House case study"
```

Expected: narrative, scene, link, full-suite, and build checks pass before commit.

---

### Task 7: Apply the Editorial Atelier system and original artwork

**Files:**
- Create: `web-design/src/components/ProjectArtwork.jsx`
- Create: `web-design/src/styles/tokens.css`
- Create: `web-design/src/styles/base.css`
- Create: `web-design/src/styles/layout.css`
- Create: `web-design/src/styles/components.css`
- Create: `web-design/src/styles/motion.css`
- Create: `web-design/src/test/artwork.test.jsx`
- Modify: `web-design/src/main.jsx`
- Modify: `web-design/src/components/EditorialHero.jsx`
- Modify: `web-design/src/components/ProjectCard.jsx`

**Interfaces:**
- Produces: `ProjectArtwork({ variant, title }): JSX.Element`
- `variant` is `'aster'`, `'common'`, or `'noma'`
- Produces: `--paper`, `--ink`, `--forest`, `--clay`, `--display`, `--sans`, `--page-gutter`, `--section-space`, `--ease-out`

- [ ] **Step 1: Write failing artwork tests**

```jsx
import { render, screen } from '@testing-library/react';
import { ProjectArtwork } from '../components/ProjectArtwork';

test.each([['aster', 'Aster House'], ['common', 'Common Ground'], ['noma', 'Noma Editions']])(
  'renders %s as named original artwork',
  (variant, title) => {
    render(<ProjectArtwork variant={variant} title={title} />);
    expect(screen.getByRole('img', { name: `${title} original concept artwork` })).toHaveAttribute('data-artwork', variant);
  },
);

test('rejects an unknown variant', () => {
  expect(() => render(<ProjectArtwork variant="unknown" title="Unknown" />)).toThrow(/unknown artwork variant/i);
});
```

- [ ] **Step 2: Verify red**

```bash
npm run test:run -- src/test/artwork.test.jsx
```

Expected: FAIL because `ProjectArtwork` does not exist.

- [ ] **Step 3: Implement three coded compositions**

Use fixed semantic markup with variant classes:

```jsx
const supported = new Set(['aster', 'common', 'noma']);
export function ProjectArtwork({ variant, title }) {
  if (!supported.has(variant)) throw new Error(`Unknown artwork variant: ${variant}`);
  const index = { aster: '01', common: '02', noma: '03' }[variant];
  return (
    <div className={`project-artwork project-artwork--${variant}`} data-artwork={variant} role="img" aria-label={`${title} original concept artwork`}>
      <span className="project-artwork__field" aria-hidden="true" />
      <span className="project-artwork__frame" aria-hidden="true" />
      <span className="project-artwork__type" aria-hidden="true">{title}</span>
      <span className="project-artwork__index" aria-hidden="true">{index}</span>
    </div>
  );
}
```

CSS variants:

- Aster: forest field, ivory frame, clay sun disc, serif wordmark.
- Common: ivory/charcoal modular grid, green status blocks, compact sans typography.
- Noma: clay field, oversized issue number, cream product-card frame, black rules.

Add a larger CSS/HTML hero composition marked `aria-hidden="true"`; hero copy already supplies its meaning.

- [ ] **Step 4: Create exact tokens, grid, focus, and motion rules**

Start `tokens.css` with:

```css
:root {
  --paper: #f3efe6;
  --paper-deep: #e8e0d2;
  --ink: #1d1d1a;
  --ink-muted: #5d5b54;
  --forest: #24463a;
  --clay: #b9654b;
  --white: #fffdf8;
  --display: "Instrument Serif", Georgia, serif;
  --sans: "DM Sans", Arial, sans-serif;
  --page-gutter: clamp(1rem, 4vw, 4.5rem);
  --section-space: clamp(5rem, 11vw, 10rem);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --focus: 3px solid #b9654b;
}
```

`base.css` imports both fonts, exposes the skip link on focus, uses `:focus-visible { outline: var(--focus); outline-offset: 4px; }`, keeps body-link underlines, and stabilizes media dimensions.

`layout.css` uses 12 columns by default, 6 below 960px, and 4 below 640px. Anchored sections get `scroll-margin-top`; grid children get `min-width: 0`.

`components.css` provides 44px minimum control heights, readable errors, non-color hover cues, and fixed aspect ratios for artwork/showcase frames.

Create `motion.css`:

```css
@keyframes reveal-in {
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: no-preference) {
  .reveal { animation: reveal-in 700ms var(--ease-out) both; }
  .project-card__artwork { transition: transform 500ms var(--ease-out); }
  .project-card:hover .project-card__artwork { transform: translateY(-0.35rem); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Import the five stylesheets from `main.jsx` in token-to-component order.

- [ ] **Step 5: Verify code and six responsive combinations**

```bash
npm run test:run -- src/test/artwork.test.jsx
npm run test:run
npm run build
npm run dev -- --host 127.0.0.1
```

Inspect both routes at 360 × 800, 768 × 1024, and 1440 × 1000. Fix horizontal scroll, clipping, overlap, low contrast, and broken composition. Emulate reduced motion and confirm nonessential motion stops.

- [ ] **Step 6: Commit**

```bash
git add web-design/src/components/ProjectArtwork.jsx web-design/src/components/EditorialHero.jsx web-design/src/components/ProjectCard.jsx web-design/src/styles web-design/src/main.jsx web-design/src/test/artwork.test.jsx
git commit -m "feat(web): apply Editorial Atelier visual system"
```

---

### Task 8: Add GitHub Pages build support

**Files:**
- Create: `web-design/scripts/create-pages-fallback.mjs`
- Create: `web-design/scripts/create-pages-fallback.test.mjs`
- Create: `.github/workflows/deploy-web-design.yml`
- Modify: `web-design/package.json`

**Interfaces:**
- Produces: `createPagesFallback(distDirectory): Promise<void>`
- Produces: scripts `test:pages` and `postbuild`
- Produces: `dist/404.html`, byte-identical to `dist/index.html`
- Deploys only `web-design/dist`

- [ ] **Step 1: Write the failing fallback test**

Create `scripts/create-pages-fallback.test.mjs`:

```js
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createPagesFallback } from './create-pages-fallback.mjs';

test('copies index.html to a byte-identical 404.html', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'form-field-pages-'));
  try {
    const html = '<!doctype html><div id="root"></div>';
    await writeFile(join(directory, 'index.html'), html, 'utf8');
    await createPagesFallback(directory);
    assert.equal(await readFile(join(directory, '404.html'), 'utf8'), html);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
```

- [ ] **Step 2: Verify red**

```bash
node --test scripts/create-pages-fallback.test.mjs
```

Expected: FAIL because the implementation module does not exist.

- [ ] **Step 3: Implement fallback and build hook**

Create `scripts/create-pages-fallback.mjs`:

```js
import { copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function createPagesFallback(distDirectory) {
  await copyFile(join(distDirectory, 'index.html'), join(distDirectory, '404.html'));
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  const projectDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
  await createPagesFallback(join(projectDirectory, 'dist'));
}
```

Add these keys without removing existing scripts:

```json
{
  "scripts": {
    "test:pages": "node --test scripts/create-pages-fallback.test.mjs",
    "postbuild": "node scripts/create-pages-fallback.mjs"
  }
}
```

- [ ] **Step 4: Create the isolated Pages workflow**

Create `.github/workflows/deploy-web-design.yml`:

```yaml
name: Deploy Form and Field

on:
  push:
    branches: [main]
    paths:
      - "web-design/**"
      - ".github/workflows/deploy-web-design.yml"
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: web-design/package-lock.json
      - run: npm ci
        working-directory: web-design
      - run: npm run test:run
        working-directory: web-design
      - run: npm run test:pages
        working-directory: web-design
      - run: npm run build
        working-directory: web-design
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: web-design/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 5: Verify and commit locally**

```bash
npm run test:pages
npm run test:run
npm run build
node -e "const fs=require('node:fs');const a=fs.readFileSync('dist/index.html');const b=fs.readFileSync('dist/404.html');if(!a.equals(b))process.exit(1)"
git add ../.github/workflows/deploy-web-design.yml package.json package-lock.json scripts
git commit -m "ci(web): add GitHub Pages deployment"
```

Expected: Node test, Vitest, build, and byte comparison pass before commit. Do not push; pushing triggers an external deployment.

---

### Task 9: Add truthfulness audit and publication documentation

**Files:**
- Create: `web-design/scripts/check-content.mjs`
- Create: `web-design/README.md`
- Create: `web-design/portfolio/upwork-entry.md`
- Modify: `web-design/package.json`
- Modify: `README.md`

**Interfaces:**
- Produces: script `check:content`
- Audit passes only when 3 disclosures are present and 0 banned claim patterns match.
- Upwork draft labels links as `Live demo` and `Source code`.

- [ ] **Step 1: Create a regression-capable content audit**

Create `scripts/check-content.mjs` with a complete recursive audit:

```js
import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const required = [
  'Self-initiated fictional case study',
  'not a claim of paid client engagement',
  'Demo form — nothing is transmitted or stored.',
];
const banned = [
  /increased (sales|revenue|conversion)/i,
  /real client/i,
  /award-winning/i,
  /customer testimonial/i,
  /guaranteed results/i,
];

async function collectSource(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const chunks = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) chunks.push(await collectSource(path));
    if (entry.isFile() && ['.js', '.jsx'].includes(extname(entry.name))) chunks.push(await readFile(path, 'utf8'));
  }
  return chunks.flat();
}

const projectDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const source = (await collectSource(join(projectDirectory, 'src'))).join('\n');
const failures = [
  ...required.filter((text) => !source.includes(text)).map((text) => `Missing required disclosure: ${text}`),
  ...banned.filter((pattern) => pattern.test(source)).map((pattern) => `Banned claim matched: ${pattern}`),
];

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Content audit passed: 3 disclosures present, 0 banned claims.');
}
```

Add `"check:content": "node scripts/check-content.mjs"` to `package.json`.

- [ ] **Step 2: Prove the audit fails and then passes**

First change one required string in the audit to `Missing disclosure sentinel` and run:

```bash
npm run check:content
```

Expected: FAIL naming `Missing disclosure sentinel`. Restore the exact required array and rerun. Expected: exit 0 with the 3/0 success line.

- [ ] **Step 3: Create truthful project and Upwork documentation**

Create `web-design/README.md` containing:

- self-initiated fictional-demo disclosure
- both routes and architecture
- Node 22 install/test/build/preview commands
- Pages base path and `404.html` explanation
- asset provenance: coded HTML/CSS/SVG authored in this repository; font names and licenses
- a six-row route/viewport QA table with empty Result cells until inspection
- a Lighthouse table with columns `Preset`, `Performance`, `Accessibility`, `Best Practices`, `SEO`, with no invented scores

Create `portfolio/upwork-entry.md` with the exact recommended title, role, description, and five skills from specification section 11. Its link section is:

```markdown
## Links

- Live demo: Pending deployment
- Source code: https://github.com/ygz1130/python-automation-portfolio/tree/main/web-design
```

Add a Form & Field section to root `README.md` that says it is a self-initiated fictional demo and links to `web-design/README.md`. Do not edit the data-cleaner description.

- [ ] **Step 4: Verify and commit**

```bash
npm run check:content
npm run test:pages
npm run test:run
npm run build
git add ../README.md README.md portfolio/upwork-entry.md scripts/check-content.mjs package.json package-lock.json
git commit -m "docs(web): add truthful publication package"
```

Expected: audit reports 3/0 and every test/build command passes before commit.

---

### Task 10: Perform final local QA and capture portfolio images

**Files:**
- Create: `web-design/portfolio/home-desktop.png`
- Create: `web-design/portfolio/aster-house-desktop.png`
- Create: `web-design/portfolio/home-mobile.png`
- Modify: `web-design/README.md`

**Interfaces:**
- Produces: three PNG captures from the production build.
- Produces: measured Lighthouse scores and a completed QA matrix.
- Produces: a clean local branch ready for a user-approved push.

- [ ] **Step 1: Run the complete suite from a clean install**

```bash
cd web-design
npm ci
npm run check:content
npm run test:pages
npm run test:run
npm run build
npm run preview -- --host 127.0.0.1
```

Expected: install, audit, tests, and build exit 0; production preview loads without console errors.

- [ ] **Step 2: Complete the route/viewport matrix**

Inspect `/` and `/work/aster-house` at:

```text
360 × 800
768 × 1024
1440 × 1000
```

For each combination, verify no horizontal scroll, clipping, overlap, broken anchors, invisible focus, or unreadable copy. Submit the homepage inquiry once with invalid input and once with valid input. Navigate both routes using only the keyboard. Emulate `prefers-reduced-motion: reduce` and confirm reveals and transitions collapse to the defined reduced duration.

Write `Pass` into a README QA result cell only after direct observation.

- [ ] **Step 3: Measure Lighthouse and correct measured failures**

Run Lighthouse mobile and desktop against the production preview and record all measured scores in `web-design/README.md`.

```text
Mobile:  Performance >= 90, Accessibility >= 95, Best Practices >= 90, SEO >= 90
Desktop: Performance >= 90, Accessibility >= 95, Best Practices >= 90, SEO >= 90
```

When a score is below threshold, inspect its audit item, fix the responsible source, rerun its focused test and `npm run build`, then repeat Lighthouse. Never record an estimated score.

- [ ] **Step 4: Capture the verified publication images**

Save these exact files from the production preview:

```text
web-design/portfolio/home-desktop.png          homepage at 1440px
web-design/portfolio/aster-house-desktop.png  case study at 1440px
web-design/portfolio/home-mobile.png           homepage at 360px
```

Use a full-page desktop capture only when text remains legible in an Upwork crop; otherwise capture the hero plus the next major section. The mobile capture spans the hero and first work card. Confirm no browser account data, development overlay, or fabricated result appears.

- [ ] **Step 5: Re-run verification and commit captures**

```bash
npm run check:content
npm run test:pages
npm run test:run
npm run build
cd ..
git diff --check
git status --short
git add web-design/portfolio/home-desktop.png web-design/portfolio/aster-house-desktop.png web-design/portfolio/home-mobile.png web-design/README.md
git commit -m "docs(web): add verified portfolio captures"
```

Expected: all checks exit 0; before staging, status lists only the three images and the measured README update from this task.

---

### Task 11: Deploy only after approval and verify live routes

**Files:**
- Modify: `web-design/portfolio/upwork-entry.md`
- Modify: `README.md`
- Modify: `web-design/README.md`

**Interfaces:**
- Produces: `https://ygz1130.github.io/python-automation-portfolio/`
- Produces: `https://ygz1130.github.io/python-automation-portfolio/work/aster-house`
- Produces: publication copy containing verified live and source links.

- [ ] **Step 1: Present evidence and request push approval**

Report exact test counts, build result, Lighthouse table, screenshot paths, commit list, and clean-status result. Ask the user for explicit approval to push `main`, which triggers Pages deployment.

Expected: stop until the user approves. Earlier design approval does not authorize the deployment action.

- [ ] **Step 2: Push after approval**

```bash
git push origin main
```

Expected: push exits 0 and the `Deploy Form and Field` workflow starts.

- [ ] **Step 3: Verify the deployment directly**

Open both public URLs:

```text
https://ygz1130.github.io/python-automation-portfolio/
https://ygz1130.github.io/python-automation-portfolio/work/aster-house
```

Verify homepage load, direct case-study load, refresh on the case route, navigation to `/#work`, navigation to `/#inquiry`, local-only inquiry success, and a clean browser console. A green workflow alone is not sufficient.

- [ ] **Step 4: Replace pending links and verify**

Replace `Pending deployment` in `portfolio/upwork-entry.md` with:

```markdown
- Live demo: https://ygz1130.github.io/python-automation-portfolio/
```

Add the same verified live URL to both README files, then run:

```bash
cd web-design
npm run check:content
npm run test:run
npm run build
cd ..
git diff --check
```

Expected: audit, tests, build, and diff check exit 0.

- [ ] **Step 5: Commit links and request approval before the next push**

```bash
git add README.md web-design/README.md web-design/portfolio/upwork-entry.md
git commit -m "docs(web): add live Form and Field links"
```

Show the commit and ask before pushing the documentation update. Do not create the Upwork entry unless the user separately approves publication after reviewing the live site.

---

## Final Acceptance Checklist

- [ ] Existing `data-cleaner/` implementation remains unchanged.
- [ ] `web-design/` contains exactly two supported routes and no dead project links.
- [ ] Homepage includes approved hero, selected work, services, process, studio disclosure, inquiry, and footer content.
- [ ] Aster House includes every approved narrative section, four original scenes, qualitative outcomes, disclosure, and working return links.
- [ ] Inquiry validation covers all required bounds, focuses errors, submits without network or storage, and resets cleanly.
- [ ] Menu behavior, keyboard operation, focus, alt semantics, heading order, contrast, and reduced motion are verified.
- [ ] Artwork is original coded content or documented generated media with no third-party marks.
- [ ] Vitest, Pages fallback test, content audit, and production build pass from a clean install.
- [ ] Both Lighthouse presets meet every target with recorded measured scores.
- [ ] Three screenshots come from the verified production build.
- [ ] GitHub Pages homepage and direct case-study refresh work after approved deployment.
- [ ] Upwork draft remains truthful and unpublished until separate user approval.
