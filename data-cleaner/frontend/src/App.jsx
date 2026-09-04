import { useState } from "react";

import { artifactUrl, cleanFile, splitColumns } from "./api";
import "./styles.css";


const METRICS = [
  ["input_rows", "input rows"],
  ["output_rows", "clean rows"],
  ["duplicate_rows", "duplicates"],
  ["rejected_rows", "rejected"],
  ["empty_cells", "empty cells"],
];


function PreviewTable({ title, columns, rows, emptyMessage }) {
  return (
    <section className="preview-block">
      <div className="section-heading">
        <h3>{title}</h3>
        <span>{rows.length} shown</span>
      </div>
      {rows.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column.replaceAll("_", " ")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${title}-${rowIndex}`}>
                  {columns.map((column) => (
                    <td key={column}>{row[column] ?? "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="table-empty">{emptyMessage}</p>
      )}
    </section>
  );
}


function Results({ result }) {
  return (
    <div className="results-content">
      <div className="results-heading">
        <div>
          <span className="eyebrow">Cleaning complete</span>
          <h2>Your data is ready</h2>
        </div>
        <span className="success-pill">Passed</span>
      </div>

      <div className="metrics-grid" aria-label="Cleaning metrics">
        {METRICS.map(([key, label]) => (
          <article className={`metric-card metric-${key}`} key={key}>
            <p>{result.metrics[key]} {label}</p>
          </article>
        ))}
      </div>

      <PreviewTable
        title="Clean preview"
        columns={result.columns}
        rows={result.preview}
        emptyMessage="No clean rows were produced."
      />
      <PreviewTable
        title="Rejected preview"
        columns={result.columns}
        rows={result.rejected_preview}
        emptyMessage="No rows were rejected."
      />

      <section className="downloads" aria-label="Download results">
        <div>
          <h3>Export results</h3>
          <p>Download the clean table or keep the audit details.</p>
        </div>
        <div className="download-actions">
          <a href={artifactUrl(result.downloads.csv)}>Clean CSV</a>
          <a href={artifactUrl(result.downloads.xlsx)}>Excel workbook</a>
          <a href={artifactUrl(result.downloads.report)}>JSON report</a>
        </div>
      </section>
    </div>
  );
}


function EmptyResults() {
  return (
    <div className="empty-results">
      <div className="empty-graphic" aria-hidden="true">
        <span className="sheet-line line-one" />
        <span className="sheet-line line-two" />
        <span className="sheet-line line-three" />
        <span className="check-mark">✓</span>
      </div>
      <span className="eyebrow">Ready when you are</span>
      <h2>See the cleanup before you download</h2>
      <p>
        Upload a file to get row-level validation, duplicate detection, a clean
        preview, and exportable audit artifacts.
      </p>
      <ul>
        <li>Source file stays unchanged</li>
        <li>Rules are visible and repeatable</li>
        <li>Results live only in process memory</li>
      </ul>
    </div>
  );
}


export default function App() {
  const [file, setFile] = useState(null);
  const [requiredColumns, setRequiredColumns] = useState("");
  const [duplicateKeys, setDuplicateKeys] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file) return;

    setStatus("loading");
    setError("");
    try {
      const body = await cleanFile({
        file,
        requiredColumns: splitColumns(requiredColumns),
        duplicateKeys: splitColumns(duplicateKeys),
      });
      setResult(body);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message);
      setStatus("error");
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Data Quality Studio home">
          <span className="brand-mark">DQ</span>
          <span>Data Quality Studio</span>
        </a>
        <span className="privacy-note"><i /> Local-first demo</span>
      </header>

      <div className="workspace" id="top">
        <section className="control-panel">
          <div className="intro">
            <span className="eyebrow">CSV + Excel automation</span>
            <h1>Turn messy tables into dependable data.</h1>
            <p>Clean messy customer data without changing the source file.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div
              className={`drop-zone ${file ? "has-file" : ""}`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="file-icon" aria-hidden="true">CSV</div>
              <div>
                <strong>{file ? file.name : "Drop your data file here"}</strong>
                <span>{file ? `${Math.ceil(file.size / 1024)} KB selected` : "CSV or XLSX · up to 10 MiB"}</span>
              </div>
              <label className="file-button">
                <span>{file ? "Replace file" : "Browse file"}</span>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  aria-label="Choose a CSV or XLSX file"
                  onChange={(event) => setFile(event.target.files[0] || null)}
                />
              </label>
            </div>

            <div className="field-group">
              <label htmlFor="required-columns">Required columns</label>
              <input
                id="required-columns"
                value={requiredColumns}
                onChange={(event) => setRequiredColumns(event.target.value)}
                placeholder="customer_id, email"
              />
              <small>Rows missing these values will be rejected.</small>
            </div>

            <div className="field-group">
              <label htmlFor="duplicate-keys">Duplicate keys</label>
              <input
                id="duplicate-keys"
                value={duplicateKeys}
                onChange={(event) => setDuplicateKeys(event.target.value)}
                placeholder="customer_id"
              />
              <small>The first matching row is kept.</small>
            </div>

            {error && <p className="error-message" role="alert">{error}</p>}

            <div className="form-actions">
              <a href="/messy_customers.csv" download>Try sample data</a>
              <button type="submit" disabled={!file || status === "loading"}>
                {status === "loading" ? "Cleaning…" : "Clean data"}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>

        <section className="results-panel" aria-live="polite">
          {result ? <Results result={result} /> : <EmptyResults />}
        </section>
      </div>

      <footer>
        <span>Self-Initiated Demo Project</span>
        <span>Python · FastAPI · React</span>
      </footer>
    </main>
  );
}
