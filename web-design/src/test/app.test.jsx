import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../App";
import { InquiryForm, validateInquiry } from "../components/InquiryForm";

const renderApp = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );

test("homepage leads into a real case study and cross-route inquiry", async () => {
  const user = userEvent.setup();
  renderApp();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Digital experiences with a point of view.",
  );
  expect(
    screen.getByRole("link", { name: "View selected work" }),
  ).toHaveAttribute("href", "/#work");
  for (const title of ["Common Ground", "Noma Editions"]) {
    const card = screen
      .getByRole("heading", { name: title })
      .closest("article");
    expect(within(card).getByText("Concept preview")).toBeInTheDocument();
    expect(within(card).queryByRole("link")).not.toBeInTheDocument();
  }
  await user.click(
    screen.getByRole("link", { name: "View Aster House case study" }),
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Aster House",
  );
  expect(
    screen.getByText("Self-initiated fictional case study"),
  ).toBeInTheDocument();
  expect(document.title).toContain("Aster House");
  await user.click(
    within(
      screen.getByRole("navigation", { name: "Case study navigation" }),
    ).getByRole("link", { name: /Start a project/ }),
  );
  expect(
    screen.getByRole("heading", { name: "Have a focused project in mind?" }),
  ).toBeInTheDocument();
  await waitFor(() => expect(document.getElementById("inquiry")).toHaveFocus());
});

test("direct case route and unknown route have useful pages", () => {
  const view = renderApp("/work/aster-house");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Aster House",
  );
  view.unmount();
  renderApp("/missing");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Digital experiences",
  );
});

test("direct trailing-slash case route retains the case-study title", () => {
  renderApp("/work/aster-house/");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Aster House");
  expect(document.title).toBe("Aster House — Form & Field");
});

test("mobile disclosure hides closed links and restores focus on Escape", async () => {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("max-width"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
  const user = userEvent.setup();
  renderApp();
  const header = screen.getByRole("banner");
  const trigger = within(header).getByRole("button", {
    name: "Open navigation",
  });
  expect(
    within(header).queryByRole("link", { name: "Work" }),
  ).not.toBeInTheDocument();
  await user.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  within(header).getByRole("link", { name: "Work" }).focus();
  await user.keyboard("{Escape}");
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await user.click(trigger);
  await user.click(within(header).getByRole("link", { name: "Services" }));
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(
    within(header).queryByRole("link", { name: "Services" }),
  ).not.toBeInTheDocument();
});

test("invalid inquiry announces errors and focuses the first invalid control", async () => {
  const user = userEvent.setup();
  render(<InquiryForm />);
  await user.click(
    screen.getByRole("button", { name: /Send project outline/ }),
  );
  const name = screen.getByLabelText("Name");
  expect(name).toHaveFocus();
  expect(name).toHaveAttribute("aria-invalid", "true");
  expect(name).toHaveAccessibleDescription(/2.*80/);
  expect(screen.getByRole("alert")).toHaveTextContent(/check/i);
  expect(screen.getByLabelText("Email")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

const valid = {
  name: "Ada Field",
  email: "ada@example.com",
  projectType: "Brand website",
  budget: "",
  note: "A calm editorial website for a small design studio.",
};
test.each([
  ["name", " A "],
  ["name", "A".repeat(81)],
  ["email", "not-an-email"],
  ["email", "ada@"],
  ["projectType", "invalid"],
  ["note", " ".repeat(20)],
  ["note", "x".repeat(19)],
  ["note", "x".repeat(801)],
  ["budget", "invalid"],
])("rejects invalid %s boundary: %s", (key, value) => {
  expect(validateInquiry({ ...valid, [key]: value })[key]).toBeTruthy();
});
test.each([
  { name: " Ab ", note: " xxxxxxxxxxxxxxxxxxxx " },
  {
    name: "A".repeat(80),
    note: "x".repeat(800),
    budget: "Exploring",
    projectType: "Other",
  },
])("accepts valid trimmed bounds", (data) =>
  expect(validateInquiry({ ...valid, ...data })).toEqual({}),
);

test("valid submission stays local, announces success, then resets and focuses Name", async () => {
  const user = userEvent.setup();
  const fetchSpy = vi.spyOn(window, "fetch");
  const xhrSpy = vi.spyOn(XMLHttpRequest.prototype, "send");
  const storageSpy = vi.spyOn(Storage.prototype, "setItem");
  render(<InquiryForm />);
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: valid.name },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: valid.email },
  });
  await user.selectOptions(
    screen.getByLabelText("Project type"),
    valid.projectType,
  );
  fireEvent.change(screen.getByLabelText("Project note"), {
    target: { value: valid.note },
  });
  await user.click(
    screen.getByRole("button", { name: /Send project outline/ }),
  );
  const status = screen.getByRole("status");
  expect(status).toHaveTextContent("Thanks — your demo inquiry is ready.");
  expect(status).toHaveFocus();
  expect(fetchSpy).not.toHaveBeenCalled();
  expect(xhrSpy).not.toHaveBeenCalled();
  expect(storageSpy).not.toHaveBeenCalled();
  await user.click(
    screen.getByRole("button", { name: "Write another inquiry" }),
  );
  expect(screen.getByLabelText("Name")).toHaveValue("");
  expect(screen.getByLabelText("Email")).toHaveValue("");
  expect(screen.getByLabelText("Project note")).toHaveValue("");
  expect(screen.getByLabelText("Name")).toHaveFocus();
});
