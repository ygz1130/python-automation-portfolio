const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";


export function splitColumns(value) {
  return value
    .split(",")
    .map((column) => column.trim())
    .filter(Boolean);
}


export async function cleanFile({ file, requiredColumns, duplicateKeys }) {
  const form = new FormData();
  form.append("file", file);
  form.append("required_columns", JSON.stringify(requiredColumns));
  form.append("duplicate_keys", JSON.stringify(duplicateKeys));

  const response = await fetch(`${API_BASE}/api/clean`, {
    method: "POST",
    body: form,
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.detail || "Unable to clean this file");
  }
  return body;
}


export function artifactUrl(path) {
  return `${API_BASE}${path}`;
}
