# Python Automation Portfolio Design

## Objective

Create a public, truthful portfolio for short, low-risk Upwork projects. The portfolio will demonstrate small Python automation and data-processing engagements that a single freelancer can deliver quickly. Both entries will be presented as self-initiated demonstration projects, not paid client work.

## Delivery Strategy

Build and publish one complete demo before starting the second. Commit every recoverable milestone locally and push those commits after the GitHub repository is created. This keeps work resumable if a session or usage window ends.

Milestone order for each demo:

1. Project skeleton and sample data
2. Failing tests for core behavior
3. Python implementation and passing tests
4. Lightweight web interface
5. Documentation and portfolio screenshots
6. GitHub publication
7. Separate Upwork portfolio entry

## Repository

The repository will be named `python-automation-portfolio` and use a monorepo layout:

```text
python-automation-portfolio/
  data-cleaner/
  api-report-generator/
  docs/
  README.md
```

Each demo will be independently installable and runnable. Shared code will only be introduced if both demos genuinely need it.

## Demo 1: Data Cleaner and Deduplicator

### User outcome

A user uploads a CSV or XLSX file, reviews detected data-quality issues, applies safe cleaning rules, previews the result, and downloads a cleaned file plus a quality report.

### Scope

- CSV and XLSX input
- Column-name normalization
- Whitespace and empty-value normalization
- Configurable duplicate detection using selected columns
- Basic type and required-field checks
- Before/after summary with issue counts
- Cleaned CSV/XLSX download
- Human-readable quality report
- Generated fictional business data for the demonstration

### Non-goals

- No personal or confidential data
- No destructive edits to the source file
- No machine-learning inference
- No cloud database or user accounts

## Demo 2: API Data Collector and Report Generator

### User outcome

A user runs a small collection job against a public demonstration API or bundled offline fixture, sees validation and retry results, and downloads a normalized CSV/XLSX report.

### Scope

- JSON API collection with configurable endpoint
- Bundled offline fixture for deterministic demonstrations and tests
- Timeouts, bounded retries, and clear failure messages
- Response schema validation
- Field selection and normalization
- Run summary and structured logs
- CSV/XLSX report download
- No credentials or paid APIs required

### Non-goals

- No authentication flows
- No scraping or access-control bypass
- No always-on cloud scheduler
- No write operations against third-party services

## Technical Design

Each demo will use a Python FastAPI backend and a compact React/Vite frontend. The backend owns file parsing, validation, transformation, and report generation. The frontend provides a polished, responsive workflow with input, progress, summary cards, preview tables, errors, and downloads.

The demos will run locally with documented commands. Tests will not depend on network access. Network-facing behavior in the API collector will be isolated behind a client interface so retries and failures can be tested with fixtures.

## Data Flow

### Data cleaner

1. Browser uploads a source file to FastAPI.
2. Backend validates format and size, then parses into a tabular model.
3. Cleaning rules produce a new dataset without modifying the source.
4. Backend returns metrics and a preview.
5. User downloads cleaned data and the quality report.

### API collector

1. Browser submits an endpoint or selects sample mode.
2. Backend fetches or loads a fixture through the collector interface.
3. Validator rejects malformed records and records reasons.
4. Normalizer maps valid records to the report schema.
5. Backend returns run metrics, preview data, and downloadable reports.

## Error Handling

- Reject unsupported files and oversized uploads with actionable messages.
- Preserve the original input and avoid silent coercion.
- Report rejected rows or API records separately from valid output.
- Bound API retries and surface final failure details without exposing secrets.
- Make empty datasets and duplicate-only datasets valid, tested outcomes.

## Testing and Verification

- Unit tests for normalization, validation, duplicate detection, and report generation
- API tests for successful and invalid requests
- Fixture-based tests for timeouts, retries, malformed JSON, and partial rejection
- Frontend production build verification
- Browser smoke test of upload/collect, preview, metrics, and download flows
- Screenshot review at desktop and narrow viewport widths

## Documentation and Presentation

The root README will explain the portfolio purpose and link to both demos. Each demo README will include its business problem, features, architecture, setup, tests, limitations, and screenshots.

Each Upwork portfolio entry will include:

- An honest `Self-Initiated Demo Project` label
- A short client-style problem statement
- Concrete implementation details
- Verifiable outcomes shown in screenshots
- A link to the relevant GitHub directory

## Publication Boundaries

Creating the public GitHub repository, pushing code, and publishing each Upwork portfolio entry are external representational actions. Local work will be completed first. The user will be asked for action-time confirmation immediately before each publication step.

