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
