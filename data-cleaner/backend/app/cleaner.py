import re

import pandas as pd

from app.models import CleaningConfig, CleaningResult


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


def _validate_columns(frame: pd.DataFrame, config: CleaningConfig) -> None:
    missing_required = [
        column for column in config.required_columns if column not in frame.columns
    ]
    if missing_required:
        raise ValueError(f"Missing required columns: {', '.join(missing_required)}")

    missing_duplicate_keys = [
        column for column in config.duplicate_keys if column not in frame.columns
    ]
    if missing_duplicate_keys:
        raise ValueError(
            f"Missing duplicate key columns: {', '.join(missing_duplicate_keys)}"
        )


def clean_dataframe(frame: pd.DataFrame, config: CleaningConfig) -> CleaningResult:
    normalized = frame.copy()
    normalized.columns = [normalize_column(column) for column in normalized.columns]
    normalized = normalized.map(normalize_cell)

    _validate_columns(normalized, config)

    empty_cells = int(normalized.isna().sum().sum())
    if config.required_columns:
        rejected_mask = normalized[config.required_columns].isna().any(axis=1)
    else:
        rejected_mask = pd.Series(False, index=normalized.index)

    rejected = normalized.loc[rejected_mask].reset_index(drop=True)
    candidates = normalized.loc[~rejected_mask]

    if config.duplicate_keys:
        duplicate_mask = candidates.duplicated(
            subset=config.duplicate_keys,
            keep="first",
        )
    else:
        duplicate_mask = pd.Series(False, index=candidates.index)

    cleaned = candidates.loc[~duplicate_mask].reset_index(drop=True)
    metrics = {
        "input_rows": len(normalized),
        "output_rows": len(cleaned),
        "duplicate_rows": int(duplicate_mask.sum()),
        "rejected_rows": len(rejected),
        "empty_cells": empty_cells,
    }
    return CleaningResult(cleaned=cleaned, rejected=rejected, metrics=metrics)
