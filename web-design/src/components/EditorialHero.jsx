import { Link } from "react-router-dom";
export function EditorialHero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-copy reveal">
        <p className="eyebrow">
          <span className="status-dot" />
          Independent digital design studio
        </p>
        <h1 id="hero-heading">
          Digital experiences <br />
          with a <i>point</i> <br />
          of <i>view.</i>
        </h1>
        <p className="hero-description">
          We shape distinctive brand websites and product interfaces for small
          teams with ambitious ideas.
        </p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/#work">
            View selected work <span aria-hidden="true">↘</span>
          </Link>
          <Link className="text-link" to="/#inquiry">
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="hero-art reveal" aria-hidden="true">
        <div className="art-topline">
          <span>FORM & FIELD</span>
          <span>EST. 2026</span>
        </div>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="editorial-print">
          <div className="print-top">
            <span>A PRACTICE IN</span>
            <span>01—26</span>
          </div>
          <div className="print-title">
            form
            <br />
            <i>& feeling.</i>
          </div>
          <div className="print-circle" />
          <div className="print-footer">
            <span>CLARITY IN EVERY DETAIL.</span>
            <span>F/F</span>
          </div>
        </div>
        <span className="art-side-label">
          INDEPENDENT THINKING / CONSIDERED MAKING
        </span>
        <div className="art-bottomline">
          <span>
            Thoughtful by nature.
            <br />
            Distinctive by design.
          </span>
          <span className="art-flower">✳</span>
        </div>
      </div>
      <div className="hero-foot">
        <span>Strategy meets feeling. Design meets function.</span>
        <span>
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
