import json
from collections import OrderedDict
from dataclasses import dataclass
from uuid import uuid4

import pandas as pd
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from app.cleaner import clean_dataframe
from app.files import (
    read_table,
    write_clean_csv,
    write_clean_xlsx,
    write_quality_report,
)
from app.models import CleaningConfig


MAX_FILE_SIZE = 10 * 1024 * 1024
MAX_RESULTS = 20


@dataclass(frozen=True)
class StoredArtifact:
    content: bytes
    media_type: str
    filename: str


app = FastAPI(title="CSV/Excel Data Cleaner")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_results: OrderedDict[str, dict[str, StoredArtifact]] = OrderedDict()


def _parse_columns(value: str, field_name: str) -> list[str]:
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError as error:
        raise ValueError(f"{field_name} must be a JSON array of strings") from error

    if not isinstance(parsed, list) or any(
        not isinstance(item, str) for item in parsed
    ):
        raise ValueError(f"{field_name} must be a JSON array of strings")
    return parsed


def _preview(frame: pd.DataFrame) -> list[dict[str, object]]:
    return json.loads(frame.head(10).to_json(orient="records"))


def _store_result(result_id: str, artifacts: dict[str, StoredArtifact]) -> None:
    _results[result_id] = artifacts
    while len(_results) > MAX_RESULTS:
        _results.popitem(last=False)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/clean")
async def clean_upload(
    file: UploadFile = File(...),
    required_columns: str = Form("[]"),
    duplicate_keys: str = Form("[]"),
) -> dict[str, object]:
    payload = await file.read(MAX_FILE_SIZE + 1)
    if len(payload) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File must be 10 MiB or smaller")

    try:
        config = CleaningConfig(
            required_columns=_parse_columns(required_columns, "required_columns"),
            duplicate_keys=_parse_columns(duplicate_keys, "duplicate_keys"),
        )
        frame = read_table(file.filename or "", payload)
        result = clean_dataframe(frame, config)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

    result_id = str(uuid4())
    artifacts = {
        "csv": StoredArtifact(
            content=write_clean_csv(result),
            media_type="text/csv",
            filename="cleaned-data.csv",
        ),
        "xlsx": StoredArtifact(
            content=write_clean_xlsx(result),
            media_type=(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ),
            filename="cleaned-data.xlsx",
        ),
        "report": StoredArtifact(
            content=write_quality_report(result),
            media_type="application/json",
            filename="quality-report.json",
        ),
    }
    _store_result(result_id, artifacts)

    download_base = f"/api/results/{result_id}"
    return {
        "result_id": result_id,
        "metrics": result.metrics,
        "columns": result.cleaned.columns.tolist(),
        "preview": _preview(result.cleaned),
        "rejected_preview": _preview(result.rejected),
        "downloads": {
            "csv": f"{download_base}/csv",
            "xlsx": f"{download_base}/xlsx",
            "report": f"{download_base}/report",
        },
    }


@app.get("/api/results/{result_id}/{artifact}")
def download_result(result_id: str, artifact: str) -> Response:
    artifacts = _results.get(result_id)
    if artifacts is None:
        raise HTTPException(status_code=404, detail="Result not found")

    stored = artifacts.get(artifact)
    if stored is None:
        raise HTTPException(status_code=404, detail="Artifact not found")

    return Response(
        content=stored.content,
        media_type=stored.media_type,
        headers={"Content-Disposition": f'attachment; filename="{stored.filename}"'},
    )
