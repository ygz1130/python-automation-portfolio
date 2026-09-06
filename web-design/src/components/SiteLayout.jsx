import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SiteHeader, Wordmark } from "./SiteHeader";

function RouteEffects() {
  const location = useLocation();
  const previous = useRef(null);
  useEffect(() => {
    document.title =
      location.pathname.replace(/\/+$/, "") === "/work/aster-house"
        ? "Aster House — Form & Field"
        : "Form & Field — Independent Digital Design Studio";
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        target?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        });
        target?.focus({ preventScroll: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
        if (previous.current && previous.current !== location.pathname)
          document
            .getElementById("main-content")
            ?.focus({ preventScroll: true });
      }
      previous.current = location.pathname;
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);
  return null;
}
export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <Link to="/" aria-label="Form & Field home">
          <Wordmark />
        </Link>
        <p>Good things take shape.</p>
        <nav aria-label="Footer navigation">
          <Link to="/#work">Selected work</Link>
          <Link to="/#services">Services</Link>
          <Link to="/#inquiry">Inquiry</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Form & Field</span>
        <span>Self-initiated portfolio demonstration.</span>
        <span>Considered from first pixel to last.</span>
      </div>
    </footer>
  );
}
export function SiteLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <RouteEffects />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
