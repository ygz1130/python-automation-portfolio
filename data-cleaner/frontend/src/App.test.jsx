import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "./App";


describe("data cleaning workflow", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("uploads configuration and renders metrics with a clean preview", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        result_id: "demo-result",
        metrics: {
          input_rows: 12,
          output_rows: 8,
          duplicate_rows: 2,
          rejected_rows: 2,
          empty_cells: 3,
        },
        columns: ["customer_id", "email", "company_name"],
        preview: [
          {
            customer_id: "C-001",
            email: "hello@aster-vale.example.com",
            company_name: "Aster Vale Studio",
          },
        ],
        rejected_preview: [],
        downloads: {
          csv: "/api/results/demo-result/csv",
          xlsx: "/api/results/demo-result/xlsx",
          report: "/api/results/demo-result/report",
        },
      }),
    });
    const user = userEvent.setup();
    render(<App />);

    const file = new File(["customer_id,email\nC-001,a@example.com"], "customers.csv", {
      type: "text/csv",
    });
    await user.upload(screen.getByLabelText(/choose a csv or xlsx file/i), file);
    await user.type(screen.getByLabelText(/required columns/i), "customer_id,email");
    await user.type(screen.getByLabelText(/duplicate keys/i), "customer_id");
    await user.click(screen.getByRole("button", { name: /clean data/i }));

    expect(await screen.findByText("12 input rows")).toBeInTheDocument();
    expect(screen.getByText("8 clean rows")).toBeInTheDocument();
    expect(screen.getByText("2 duplicates")).toBeInTheDocument();
    expect(screen.getByText("Aster Vale Studio")).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it("loads the fictional sample into the file picker", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      blob: async () => new Blob(["customer_id,email\nC-001,a@example.com\n"]),
    });
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /load sample data/i }));

    expect(await screen.findByText("messy_customers.csv")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clean data/i })).toBeEnabled();
  });
});
