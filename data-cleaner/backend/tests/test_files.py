import json
from io import BytesIO

import openpyxl
import pandas as pd
import pytest

from app.files import (
    read_table,
    write_clean_xlsx,
    write_quality_report,
)
from app.models import CleaningResult


@pytest.fixture
def cleaning_result() -> CleaningResult:
    return CleaningResult(
        cleaned=pd.DataFrame([{"id": 1, "name": "Northwind"}]),
        rejected=pd.DataFrame([{"id": 2, "name": None}]),
        metrics={
            "input_rows": 2,
            "output_rows": 1,
            "duplicate_rows": 0,
            "rejected_rows": 1,
            "empty_cells": 1,
        },
    )


def test_reads_csv_bytes():
    frame = read_table("customers.csv", b"id,name\n1,Northwind\n")
    assert frame.to_dict(orient="records") == [{"id": 1, "name": "Northwind"}]


def test_rejects_unsupported_extension():
    with pytest.raises(ValueError, match="Supported formats are CSV and XLSX"):
        read_table("customers.txt", b"id,name")


def test_xlsx_contains_cleaned_rejected_and_summary_sheets(cleaning_result):
    workbook = openpyxl.load_workbook(BytesIO(write_clean_xlsx(cleaning_result)))
    assert workbook.sheetnames == [
        "Cleaned Data",
        "Rejected Rows",
        "Quality Summary",
    ]


def test_quality_report_contains_every_metric(cleaning_result):
    report = json.loads(write_quality_report(cleaning_result).decode("utf-8"))

    assert report["metrics"] == cleaning_result.metrics
    assert set(report) == {"metrics", "generated_at"}
    assert report["generated_at"].endswith("+00:00")
