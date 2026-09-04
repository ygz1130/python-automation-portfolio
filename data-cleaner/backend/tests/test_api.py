import uuid

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def _clean_csv(client: TestClient):
    return client.post(
        "/api/clean",
        files={
            "file": (
                "customers.csv",
                b"customer_id,email\n1,a@example.com\n1,a@example.com\n",
            )
        },
        data={
            "required_columns": '["customer_id", "email"]',
            "duplicate_keys": '["customer_id"]',
        },
    )


def test_health_status(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_clean_csv_returns_metrics_preview_and_downloads(client):
    response = _clean_csv(client)

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


def test_rejects_invalid_json_configuration(client):
    response = client.post(
        "/api/clean",
        files={"file": ("customers.csv", b"customer_id,email\n1,a@example.com\n")},
        data={"required_columns": "not-json"},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == (
        "required_columns must be a JSON array of strings"
    )


def test_rejects_unsupported_extensions(client):
    response = client.post(
        "/api/clean",
        files={"file": ("customers.txt", b"customer_id,email")},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Supported formats are CSV and XLSX"


def test_reports_missing_required_columns(client):
    response = client.post(
        "/api/clean",
        files={"file": ("customers.csv", b"customer_id\n1\n")},
        data={"required_columns": '["email"]'},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Missing required columns: email"


def test_all_result_artifacts_can_be_downloaded(client):
    result = _clean_csv(client).json()

    csv_response = client.get(result["downloads"]["csv"])
    assert csv_response.status_code == 200
    assert csv_response.text == "customer_id,email\r\n1,a@example.com\r\n"
    assert csv_response.headers["content-type"].startswith("text/csv")

    xlsx_response = client.get(result["downloads"]["xlsx"])
    assert xlsx_response.status_code == 200
    assert xlsx_response.content.startswith(b"PK")
    assert xlsx_response.headers["content-type"] == (
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

    report_response = client.get(result["downloads"]["report"])
    assert report_response.status_code == 200
    assert report_response.json()["metrics"]["duplicate_rows"] == 1
    assert report_response.headers["content-type"] == "application/json"


def test_unknown_result_and_artifact_return_not_found(client):
    unknown_result = client.get(f"/api/results/{uuid.uuid4()}/csv")
    assert unknown_result.status_code == 404
    assert unknown_result.json()["detail"] == "Result not found"

    result = _clean_csv(client).json()
    unknown_artifact = client.get(f"/api/results/{result['result_id']}/pdf")
    assert unknown_artifact.status_code == 404
    assert unknown_artifact.json()["detail"] == "Artifact not found"
