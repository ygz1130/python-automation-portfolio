from dataclasses import dataclass

import pandas as pd


@dataclass(frozen=True)
class CleaningConfig:
    required_columns: list[str]
    duplicate_keys: list[str]


@dataclass(frozen=True)
class CleaningResult:
    cleaned: pd.DataFrame
    rejected: pd.DataFrame
    metrics: dict[str, int]
