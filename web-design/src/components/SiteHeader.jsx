import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function Wordmark() {
  return (
    <span className="wordmark">
      form <i>&</i> field<span className="wordmark-dot">®</span>
    </span>
  );
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(
    () => window.matchMedia("(max-width: 700px)").matches,
  );
  const trigger = useRef(null);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const change = () => {
      setMobile(media.matches);
      setOpen(false);
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    function escape(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header wrap">
      <Link
        className="brand-link"
        to="/"
        aria-label="Form & Field home"
        onClick={() => setOpen(false)}
      >
        <Wordmark />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        ref={trigger}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="primary-navigation"
        className="primary-nav"
        aria-label="Primary navigation"
        hidden={mobile && !open}
      >
        <Link to="/#work" onClick={() => setOpen(false)}>
          Work
        </Link>
        <Link to="/#services" onClick={() => setOpen(false)}>
          Services
        </Link>
        <Link to="/#studio" onClick={() => setOpen(false)}>
          About
        </Link>
        <Link className="nav-cta" to="/#inquiry" onClick={() => setOpen(false)}>
          Start a project <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
