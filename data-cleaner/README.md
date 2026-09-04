# CSV & Excel Data Cleaner

> Self-Initiated Demo Project — all included records are fictional and use reserved `example.com` addresses.

Small teams often receive customer spreadsheets with inconsistent headings, extra whitespace, mixed capitalization, missing required values, and repeated records. Data Quality Studio turns those files into reviewable, downloadable results without modifying the uploaded source.

## What it does

- Accepts CSV and XLSX files up to 10 MiB.
- Converts headings to predictable `snake_case` names.
- Trims and collapses whitespace and normalizes email capitalization.
- Rejects rows missing user-selected required values.
- Keeps the first record for user-selected duplicate keys.
- Shows clean/rejected previews and five quality metrics.
- Exports a clean CSV, a three-sheet Excel workbook, and a timestamped JSON quality report.

## Architecture

```text
React + Vite UI
      │ multipart form
      ▼
FastAPI service ──► pandas cleaning pipeline
      │                       │
      └──────────► CSV / XLSX / JSON artifacts
```

The API keeps at most the 20 most recent result packages in process memory. Uploaded files and generated results are not persisted by the application.

## Prerequisites

- Python 3.11 or newer
- Node.js 20 or newer

## Run the backend

From `data-cleaner/backend`:

```bash
python -m venv .venv
# Windows
.venv\Scripts\python -m pip install -e ".[dev]"
.venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

On macOS or Linux, replace `.venv\Scripts\python` with `.venv/bin/python`.

## Run the frontend

In a second terminal, from `data-cleaner/frontend`:

```bash
npm install
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173`.

## Tests and production build

```bash
# From data-cleaner/backend
.venv\Scripts\python -m pytest tests -v

# From data-cleaner/frontend
npm test -- --run
npm run build
```

## Five-minute evaluator walkthrough

1. Start the backend and frontend using the commands above.
2. Open the web interface and choose **Load sample data** to select the fictional fixture.
3. Confirm that `messy_customers.csv` appears in the upload panel.
4. Enter `customer_id,email_address` for required columns and `customer_id` for duplicate keys.
5. Select **Clean data**, inspect both previews, and download each output format.

## Data safety

Every record committed here was invented for this demo. There are no real names, companies, phone numbers, credentials, or customer records. The source file remains unchanged during processing.

## Deliberate limitations

This is a compact portfolio demonstration, not a hosted multi-user service. Results disappear when the API restarts; there is no authentication or durable storage. The exported workbook contains clean values and a summary, but does not preserve source formatting, formulas, or macros.
