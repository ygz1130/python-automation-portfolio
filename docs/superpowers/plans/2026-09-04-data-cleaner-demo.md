# Data Cleaner Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first portfolio demo: a locally runnable web application that cleans CSV/XLSX data, detects duplicates and validation issues, previews results, and exports cleaned files plus a quality report.

**Architecture:** A FastAPI service parses uploaded files and delegates deterministic transformations to a pure Python cleaning module. A React/Vite interface uploads a sample or user file, selects duplicate keys, displays metrics and rejected rows, and downloads generated artifacts. The core remains independent of HTTP and the UI so it can be tested with in-memory data.

**Tech Stack:** Python 3.11+, FastAPI, pandas, openpyxl, pytest, httpx/TestClient, React 18, Vite, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-09-04-python-automation-portfolio-design.md`

## Global Constraints

- The demo must run locally without cloud accounts, paid APIs, or credentials.
- Only generated fictional business data may be committed.
- Source uploads must never be overwritten.
- CSV and XLSX input and output are required.
- Unsupported files and files larger than 10 MiB must be rejected with actionable messages.
- Tests must not require network access.
- The web UI must support desktop and narrow viewport screenshots.
- Commit after every task and keep each commit independently testable.

## File Map

```text
README.md                                      Portfolio index
.gitignore                                     Python, Node, build, and local-output exclusions
data-cleaner/README.md                         Demo-specific setup and business explanation
data-cleaner/backend/pyproject.toml             Python dependencies and pytest configuration
data-cleaner/backend/app/__init__.py            Backend package marker
data-cleaner/backend/app/models.py              Typed cleaning configuration and result models
data-cleaner/backend/app/cleaner.py             Pure normalization, validation, and deduplication
data-cleaner/backend/app/files.py               CSV/XLSX parsing and artifact serialization
data-cleaner/backend/app/main.py                FastAPI routes and temporary result cache
data-cleaner/backend/tests/test_cleaner.py       Core behavior tests
data-cleaner/backend/tests/test_files.py         File parsing and serialization tests
data-cleaner/backend/tests/test_api.py           HTTP contract tests
data-cleaner/frontend/package.json               Frontend scripts and dependencies
data-cleaner/frontend/vite.config.js             Vite and test configuration
data-cleaner/frontend/index.html                 Browser entry document
data-cleaner/frontend/src/main.jsx               React application entry
data-cleaner/frontend/src/App.jsx                Demo workflow and state orchestration
data-cleaner/frontend/src/api.js                 Backend API client
data-cleaner/frontend/src/styles.css             Responsive portfolio presentation
data-cleaner/frontend/src/App.test.jsx           Frontend workflow tests
data-cleaner/sample-data/messy_customers.csv     Fictional demonstration input
data-cleaner/portfolio/                          Final screenshots and Upwork copy
```

---

### Task 1: Core cleaning engine and project foundation

**Files:**
- Create: `.gitignore`
- Create: `README.md`
- Create: `data-cleaner/backend/pyproject.toml`
- Create: `data-cleaner/backend/app/__init__.py`
- Create: `data-cleaner/backend/app/models.py`
- Create: `data-cleaner/backend/app/cleaner.py`
- Create: `data-cleaner/backend/tests/test_cleaner.py`

**Interfaces:**
- Produces: `CleaningConfig(required_columns: list[str], duplicate_keys: list[str])`
- Produces: `CleaningResult(cleaned: pd.DataFrame, rejected: pd.DataFrame, metrics: dict[str, int])`
- Produces: `clean_dataframe(frame: pd.DataFrame, config: CleaningConfig) -> CleaningResult`

- [ ] **Step 1: Add repository exclusions and Python project metadata**

Create `.gitignore` with `.venv/`, `__pycache__/`, `.pytest_cache/`, `node_modules/`, `dist/`, `.coverage`, and `data-cleaner/output/`. Create `data-cleaner/backend/pyproject.toml` with runtime dependencies `fastapi`, `uvicorn`, `python-multipart`, `pandas`, and `openpyxl`, plus development dependencies `pytest` and `httpx`. Configure pytest with `pythonpath = ["."]`.

- [ ] **Step 2: Write failing normalization and deduplication tests**

Create `data-cleaner/backend/tests/test_cleaner.py` containing these behaviors:

```python
import pandas as pd

from app.cleaner import clean_dataframe
from app.models import CleaningConfig


def test_normalizes_columns_cells_and_removes_duplicate_rows():
    frame = pd.DataFrame(
        {
            " Customer ID ": [" C-001 ", "C-001", "C-002"],
            "Email Address": [" A@EXAMPLE.COM ", "a@example.com", ""],
            "Company Name": [" Northwind  Labs ", "Northwind Labs", "  Contoso  "],
        }
    )
    result = clean_dataframe(
        frame,
        CleaningConfig(
            required_columns=["customer_id", "email_address"],
            duplicate_keys=["customer_id"],
        ),
    )
    assert result.cleaned["customer_id"].tolist() == ["C-001"]
    assert result.cleaned["email_address"].tolist() == ["a@example.com"]
    assert result.cleaned["company_name"].tolist() == ["Northwind Labs"]
    assert result.metrics == {
        "input_rows": 3,
        "output_rows": 1,
        "duplicate_rows": 1,
        "rejected_rows": 1,
        "empty_cells": 1,
    }


def test_missing_required_column_raises_actionable_error():
    frame = pd.DataFrame({"name": ["Example"]})
    config = CleaningConfig(required_columns=["email"], duplicate_keys=[])

    try:
        clean_dataframe(frame, config)
    except ValueError as error:
        assert str(error) == "Missing required columns: email"
    else:
        raise AssertionError("Expected a missing-column error")
```

- [ ] **Step 3: Run the core tests and verify they fail**

Run: `python -m pytest data-cleaner/backend/tests/test_cleaner.py -v`

Expected: collection fails because `app.cleaner` and `app.models` do not exist.

- [ ] **Step 4: Implement result models and deterministic cleaning**

In `models.py`, define frozen dataclasses for `CleaningConfig` and `CleaningResult`. In `cleaner.py`, implement:

```python
def normalize_column(name: object) -> str:
    return re.sub(r"[^a-z0-9]+", "_", str(name).strip().lower()).strip("_")


def normalize_cell(value: object) -> object:
    if pd.isna(value):
        return None
    if isinstance(value, str):
        compact = " ".join(value.split())
        if not compact:
            return None
        if "@" in compact:
            return compact.lower()
        return compact
    return value
```

`clean_dataframe` must copy the input, normalize columns and values, validate configured column names, count empty cells after normalization, move rows missing required values into `rejected`, mark later occurrences of configured duplicate keys as duplicates, remove those duplicates from the clean output, and return the exact metrics asserted above.

- [ ] **Step 5: Run the tests and verify they pass**

Run: `python -m pytest data-cleaner/backend/tests/test_cleaner.py -v`

Expected: all tests pass.

- [ ] **Step 6: Add the root portfolio README**

Create `README.md` with the title `Python Automation Portfolio`, an explicit `Self-Initiated Demonstration Projects` statement, a table linking to the Data Cleaner and the planned API Report Generator, and a note that all committed data is fictional.

- [ ] **Step 7: Commit the foundation**

Run:

```bash
git add .gitignore README.md data-cleaner/backend
git commit -m "feat: add data cleaning core"
```

---

### Task 2: CSV/XLSX input and report artifacts

**Files:**
- Create: `data-cleaner/backend/app/files.py`
- Create: `data-cleaner/backend/tests/test_files.py`
- Create: `data-cleaner/sample-data/messy_customers.csv`

**Interfaces:**
- Consumes: `CleaningResult` from `app.models`
- Produces: `read_table(filename: str, payload: bytes) -> pd.DataFrame`
- Produces: `write_clean_csv(result: CleaningResult) -> bytes`
- Produces: `write_clean_xlsx(result: CleaningResult) -> bytes`
- Produces: `write_quality_report(result: CleaningResult) -> bytes`

- [ ] **Step 1: Write failing file-format tests**

Create tests that assert:

```python
def test_reads_csv_bytes():
    frame = read_table("customers.csv", b"id,name\n1,Northwind\n")
    assert frame.to_dict(orient="records") == [{"id": 1, "name": "Northwind"}]


def test_rejects_unsupported_extension():
    with pytest.raises(ValueError, match="Supported formats are CSV and XLSX"):
        read_table("customers.txt", b"id,name")


def test_xlsx_contains_cleaned_rejected_and_summary_sheets(cleaning_result):
    workbook = openpyxl.load_workbook(BytesIO(write_clean_xlsx(cleaning_result)))
    assert workbook.sheetnames == ["Cleaned Data", "Rejected Rows", "Quality Summary"]
```

Also assert that `write_quality_report` returns UTF-8 JSON containing every metric key.

- [ ] **Step 2: Run file tests and verify they fail**

Run: `python -m pytest data-cleaner/backend/tests/test_files.py -v`

Expected: failure because `app.files` does not exist.

- [ ] **Step 3: Implement safe readers and writers**

Implement extension-based parsing using `pd.read_csv(BytesIO(payload))` and `pd.read_excel(BytesIO(payload))`. Raise `ValueError("Supported formats are CSV and XLSX")` for other extensions and `ValueError("The uploaded file is empty or unreadable")` when parsing fails or returns no columns.

Serialize CSV without an index. Serialize XLSX with the three required sheets. Serialize the quality report as indented UTF-8 JSON with `metrics` and a `generated_at` UTC timestamp.

- [ ] **Step 4: Add fictional sample data**

Create `messy_customers.csv` with 12 fictional rows that demonstrate inconsistent column names, whitespace, capitalization, missing email values, and duplicates by customer ID. Do not include real names, email addresses, phone numbers, or company records; use reserved `example.com` addresses and invented company names.

- [ ] **Step 5: Run backend tests**

Run: `python -m pytest data-cleaner/backend/tests -v`

Expected: all tests pass.

- [ ] **Step 6: Commit file support**

Run:

```bash
git add data-cleaner/backend/app/files.py data-cleaner/backend/tests/test_files.py data-cleaner/sample-data
git commit -m "feat: add csv and xlsx artifacts"
```

---

### Task 3: FastAPI upload and download contract

**Files:**
- Create: `data-cleaner/backend/app/main.py`
- Create: `data-cleaner/backend/tests/test_api.py`

**Interfaces:**
- Consumes: `read_table`, `clean_dataframe`, and artifact writers
- Produces: `POST /api/clean`
- Produces: `GET /api/results/{result_id}/{artifact}` where artifact is `csv`, `xlsx`, or `report`
- Produces: `GET /api/health`

- [ ] **Step 1: Write failing API contract tests**

Create `test_api.py` with a `TestClient` and tests for:

```python
def test_clean_csv_returns_metrics_preview_and_downloads(client):
    response = client.post(
        "/api/clean",
        files={"file": ("customers.csv", b"customer_id,email\n1,a@example.com\n1,a@example.com\n")},
        data={"required_columns": '["customer_id", "email"]', "duplicate_keys": '["customer_id"]'},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["metrics"]["duplicate_rows"] == 1
    assert body["preview"] == [{"customer_id": 1, "email": "a@example.com"}]
    assert set(body["downloads"]) == {"csv", "xlsx", "report"}


def test_rejects_files_larger_than_ten_mebibytes(client):
    payload = b"x" * (10 * 1024 * 1024 + 1)
    response = client.post("/api/clean", files={"file": ("large.csv", payload)})
    assert response.status_code == 413
    assert response.json()["detail"] == "File must be 10 MiB or smaller"
```

Also test invalid JSON configuration, unsupported extensions, missing required columns, health status, and all three downloads.

- [ ] **Step 2: Run API tests and verify they fail**

Run: `python -m pytest data-cleaner/backend/tests/test_api.py -v`

Expected: failure because `app.main` does not exist.

- [ ] **Step 3: Implement the FastAPI service**

Create a FastAPI app with permissive localhost CORS for Vite development. Parse `required_columns` and `duplicate_keys` as JSON arrays of strings. Enforce the 10 MiB limit before parsing. Store result artifacts in a bounded in-memory dictionary keyed by UUID; retain at most the 20 most recent results. Return:

```json
{
  "result_id": "uuid",
  "metrics": {
    "input_rows": 12,
    "output_rows": 8,
    "duplicate_rows": 2,
    "rejected_rows": 2,
    "empty_cells": 3
  },
  "columns": ["customer_id", "email"],
  "preview": [],
  "rejected_preview": [],
  "downloads": {
    "csv": "/api/results/uuid/csv",
    "xlsx": "/api/results/uuid/xlsx",
    "report": "/api/results/uuid/report"
  }
}
```

Map client input errors to HTTP 400, oversize files to 413, unknown result IDs to 404, and unknown artifact names to 404.

- [ ] **Step 4: Run backend tests**

Run: `python -m pytest data-cleaner/backend/tests -v`

Expected: all tests pass.

- [ ] **Step 5: Start the API and smoke-check health**

Run: `python -m uvicorn app.main:app --app-dir data-cleaner/backend --host 127.0.0.1 --port 8000`

In a second command, run: `curl http://127.0.0.1:8000/api/health`

Expected: `{"status":"ok"}`.

- [ ] **Step 6: Commit the HTTP layer**

Run:

```bash
git add data-cleaner/backend/app/main.py data-cleaner/backend/tests/test_api.py
git commit -m "feat: expose data cleaner api"
```

---

### Task 4: Lightweight React web demo

**Files:**
- Create: `data-cleaner/frontend/package.json`
- Create: `data-cleaner/frontend/vite.config.js`
- Create: `data-cleaner/frontend/index.html`
- Create: `data-cleaner/frontend/src/main.jsx`
- Create: `data-cleaner/frontend/src/api.js`
- Create: `data-cleaner/frontend/src/App.jsx`
- Create: `data-cleaner/frontend/src/styles.css`
- Create: `data-cleaner/frontend/src/App.test.jsx`

**Interfaces:**
- Consumes: `POST /api/clean` and result download URLs
- Produces: upload/configuration form, processing status, metric cards, preview tables, errors, and download actions

- [ ] **Step 1: Create frontend metadata and failing workflow test**

Configure Vite with React and Vitest using a `jsdom` environment. Add scripts `dev`, `build`, and `test`. Write a test that mocks `fetch`, selects a CSV fixture, enters `customer_id,email` as required columns and `customer_id` as duplicate keys, clicks `Clean data`, and asserts that `12 input rows`, `8 clean rows`, `2 duplicates`, and a preview row render.

- [ ] **Step 2: Run the frontend test and verify it fails**

Run: `npm test -- --run`

Working directory: `data-cleaner/frontend`

Expected: failure because the application components do not exist.

- [ ] **Step 3: Implement the API client**

Implement:

```javascript
export async function cleanFile({ file, requiredColumns, duplicateKeys }) {
  const form = new FormData();
  form.append("file", file);
  form.append("required_columns", JSON.stringify(requiredColumns));
  form.append("duplicate_keys", JSON.stringify(duplicateKeys));
  const response = await fetch("http://127.0.0.1:8000/api/clean", { method: "POST", body: form });
  const body = await response.json();
  if (!response.ok) throw new Error(body.detail || "Unable to clean this file");
  return body;
}
```

Add `splitColumns(value)` that trims comma-separated values and removes empty entries.

- [ ] **Step 4: Implement the single-page workflow**

Build a two-column desktop layout that collapses to one column below 760 px. The left side contains the product statement, drop-zone/file picker, configuration fields, sample-data link, and primary action. The right side shows an empty-state explanation before a run and, after a run, metric cards, clean and rejected previews, and three download buttons.

Use the visible title `Data Quality Studio` and the subtitle `Clean messy customer data without changing the source file.` Include `Self-Initiated Demo Project` in the footer.

- [ ] **Step 5: Add polished responsive styles**

Use a restrained dark navy, warm white, teal, and amber palette; system fonts; high-contrast focus states; rounded panels; compact tables; and no external images or web fonts. Loading, success, and failure states must remain readable at 390 px width.

- [ ] **Step 6: Run frontend tests and build**

Run: `npm test -- --run`

Run: `npm run build`

Expected: tests pass and Vite produces `dist/` without warnings that block deployment.

- [ ] **Step 7: Commit the web demo**

Run:

```bash
git add data-cleaner/frontend
git commit -m "feat: add data cleaner web interface"
```

---

### Task 5: Documentation, end-to-end verification, and portfolio assets

**Files:**
- Create: `data-cleaner/README.md`
- Create: `data-cleaner/portfolio/upwork-entry.md`
- Create: `data-cleaner/portfolio/data-quality-studio-overview.png`
- Create: `data-cleaner/portfolio/data-quality-studio-results.png`
- Modify: `README.md`

**Interfaces:**
- Consumes: the completed backend and frontend
- Produces: a reproducible demo package and publication-ready portfolio copy

- [ ] **Step 1: Write the demo README**

Document the business problem, capabilities, architecture, sample-data safety, prerequisites, backend setup, frontend setup, test commands, limitations, and a five-minute evaluator walkthrough. State that the project is self-initiated and all data is fictional.

- [ ] **Step 2: Write truthful Upwork portfolio copy**

Create `upwork-entry.md` with:

- Title: `CSV & Excel Data Cleaner with Quality Reporting`
- Label: `Self-Initiated Demo Project`
- Problem: small teams receive inconsistent spreadsheets with duplicates and missing fields
- Solution: FastAPI and React workflow with non-destructive cleaning, validation, preview, and downloads
- Deliverables: tested source code, sample data, CSV/XLSX outputs, quality report, setup guide
- Skills: Python, FastAPI, pandas, React, API Integration, Data Processing, Data Extraction
- No repository URL before publication; the verified URL will be added after the remote exists

- [ ] **Step 3: Run the complete automated verification**

Run: `python -m pytest data-cleaner/backend/tests -v`

Run: `npm test -- --run`

Run: `npm run build`

Expected: every command exits successfully.

- [ ] **Step 4: Run the local applications and browser smoke test**

Start FastAPI on `127.0.0.1:8000` and Vite on `127.0.0.1:5173`. In the browser, load the fictional sample CSV, configure `customer_id,email_address` as required and `customer_id` as the duplicate key, run cleaning, and verify the metric cards, both previews, and all three download links.

- [ ] **Step 5: Capture portfolio screenshots**

Capture one desktop screenshot of the upload/configuration state and one desktop screenshot of the populated results state. Confirm neither screenshot includes local usernames, filesystem paths, browser history, credentials, or personal data.

- [ ] **Step 6: Commit the publication-ready demo**

Run:

```bash
git add README.md data-cleaner/README.md data-cleaner/portfolio
git commit -m "docs: prepare data cleaner portfolio entry"
```

- [ ] **Step 7: Verify the clean repository state**

Run: `git status --short`

Expected: no output.

Run: `git log --oneline --decorate -6`

Expected: the design commit plus one commit for each completed implementation task.

---

### Task 6: Publication checkpoints

**Files:**
- Modify: `data-cleaner/portfolio/upwork-entry.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: verified local repository and screenshots
- Produces: public GitHub repository and one published Upwork portfolio entry

- [ ] **Step 1: Request action-time confirmation for GitHub publication**

Explain that the next actions will create a public GitHub repository named `python-automation-portfolio` under the user's authenticated account and upload the source code, commit history, fictional sample data, documentation, and screenshots. Proceed only after the user confirms.

- [ ] **Step 2: Create the public GitHub repository and push `main`**

Create the repository without an auto-generated README, add it as `origin`, and push the existing `main` branch. Do not upload secrets, environment files, build outputs, or unrelated workspace content.

- [ ] **Step 3: Record and verify the public repository URL**

Add a `Repository URL:` line containing exactly the URL returned by GitHub, update the root README link with that same URL, run the automated verification again, commit as `docs: add public repository links`, and push that commit.

- [ ] **Step 4: Request action-time confirmation for Upwork publication**

Show the exact title, description, skill list, GitHub URL, and screenshots that will be published to the user's Upwork profile. Proceed only after the user confirms.

- [ ] **Step 5: Create and publish the Upwork portfolio entry**

Upload only the two reviewed screenshots, enter the approved copy, attach the verified GitHub URL, select the relevant skills, publish, and verify the new entry is visible on the freelancer profile.
