import json
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path
from zipfile import BadZipFile

import pandas as pd

from app.models import CleaningResult


def read_table(filename: str, payload: bytes) -> pd.DataFrame:
    extension = Path(filename).suffix.lower()
    if extension not in {".csv", ".xlsx"}:
        raise ValueError("Supported formats are CSV and XLSX")

    try:
        if extension == ".csv":
            frame = pd.read_csv(BytesIO(payload))
        else:
            frame = pd.read_excel(BytesIO(payload))
    except (BadZipFile, OSError, UnicodeError, ValueError) as error:
        raise ValueError("The uploaded file is empty or unreadable") from error

    if len(frame.columns) == 0:
        raise ValueError("The uploaded file is empty or unreadable")
    return frame


def write_clean_csv(result: CleaningResult) -> bytes:
    return result.cleaned.to_csv(index=False).encode("utf-8")


def write_clean_xlsx(result: CleaningResult) -> bytes:
    output = BytesIO()
    summary = pd.DataFrame(
        [{"metric": key, "value": value} for key, value in result.metrics.items()]
    )
    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        result.cleaned.to_excel(writer, sheet_name="Cleaned Data", index=False)
        result.rejected.to_excel(writer, sheet_name="Rejected Rows", index=False)
        summary.to_excel(writer, sheet_name="Quality Summary", index=False)
    return output.getvalue()


def write_quality_report(result: CleaningResult) -> bytes:
    report = {
        "metrics": result.metrics,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    return json.dumps(report, indent=2, ensure_ascii=False).encode("utf-8")
