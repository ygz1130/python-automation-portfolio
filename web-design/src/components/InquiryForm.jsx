import { useEffect, useRef, useState } from "react";
const projectTypes = [
  "Brand website",
  "Product interface",
  "Frontend build",
  "Other",
];
const budgets = ["Under $500", "$500–$1,500", "$1,500–$3,000", "Exploring"];
const empty = { name: "", email: "", projectType: "", budget: "", note: "" };
export function validateInquiry(values) {
  const errors = {};
  if (values.name.trim().length < 2 || values.name.trim().length > 80)
    errors.name = "Enter a name between 2 and 80 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!projectTypes.includes(values.projectType))
    errors.projectType = "Choose a project type.";
  if (values.budget && !budgets.includes(values.budget))
    errors.budget = "Choose one of the budget ranges.";
  if (values.note.trim().length < 20 || values.note.trim().length > 800)
    errors.note = "Write a project note between 20 and 800 characters.";
  return errors;
}
export function InquiryForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useRef(null);
  const status = useRef(null);
  const resetFocus = useRef(false);
  useEffect(() => {
    if (success) status.current?.focus();
    else if (resetFocus.current) {
      form.current?.elements.name.focus();
      resetFocus.current = false;
    }
  }, [success]);
  const change = (event) => {
    const next = { ...values, [event.target.name]: event.target.value };
    setValues(next);
    if (submitted) setErrors(validateInquiry(next));
  };
  function submit(event) {
    event.preventDefault();
    const next = validateInquiry(values);
    setErrors(next);
    setSubmitted(true);
    if (Object.keys(next).length)
      form.current.elements[Object.keys(next)[0]]?.focus();
    else {
      setValues(empty);
      setSuccess(true);
    }
  }
  const props = (name) => ({
    id: `inquiry-${name}`,
    name,
    value: values[name],
    onChange: change,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name]
      ? `error-${name}`
      : name === "note"
        ? "note-help"
        : undefined,
  });
  const error = (name) =>
    errors[name] && (
      <span className="field-error" id={`error-${name}`}>
        {errors[name]}
      </span>
    );
  if (success)
    return (
      <div className="inquiry-success">
        <div ref={status} role="status" tabIndex={-1}>
          <span className="success-symbol" aria-hidden="true">
            ↗
          </span>
          <h3>Thanks — your demo inquiry is ready.</h3>
          <p>In a live project, this would be sent securely to the studio.</p>
        </div>
        <button
          className="text-link"
          onClick={() => {
            resetFocus.current = true;
            setErrors({});
            setSubmitted(false);
            setSuccess(false);
          }}
        >
          Write another inquiry
        </button>
      </div>
    );
  return (
    <form ref={form} className="inquiry-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="inquiry-name">Name</label>
          <input
            {...props("name")}
            autoComplete="name"
            placeholder="Your name"
            required
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="inquiry-email">Email</label>
          <input
            {...props("email")}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          {error("email")}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="inquiry-projectType">Project type</label>
          <select {...props("projectType")} required>
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {error("projectType")}
        </div>
        <div className="field">
          <label htmlFor="inquiry-budget">
            Budget range <span>(optional)</span>
          </label>
          <select {...props("budget")}>
            <option value="">Select a range</option>
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
          {error("budget")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="inquiry-note">Project note</label>
        <textarea
          {...props("note")}
          rows={3}
          placeholder="A little about your idea, your timeline, and what you have in mind…"
          required
        />
        {error("note")}
        <span className="field-help" id="note-help">
          20–800 characters<span>{values.note.trim().length} / 800</span>
        </span>
      </div>
      {Object.keys(errors).length > 0 && (
        <p className="form-alert" role="alert">
          Please check the highlighted fields.
        </p>
      )}
      <p className="demo-note">Demo form — nothing is transmitted or stored.</p>
      <button className="button button-dark" type="submit">
        Send project outline <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
export function InquirySection() {
  return (
    <section
      id="inquiry"
      tabIndex={-1}
      className="inquiry wrap section-space"
      aria-labelledby="inquiry-heading"
    >
      <div className="inquiry-intro">
        <p className="eyebrow">05 / SOMETHING IN MIND?</p>
        <h2 id="inquiry-heading">
          Have a focused{" "}
          <br />
          project <i>in mind?</i>
        </h2>
        <p>
          Share the essentials. This portfolio demo will show the intended
          inquiry experience without sending your information.
        </p>
        <span className="inquiry-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <InquiryForm />
    </section>
  );
}
