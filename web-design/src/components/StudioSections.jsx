const services = [
  [
    "Brand websites",
    "Positioning, information architecture, visual direction, and responsive page design.",
    "STRATEGY / DESIGN / EXPERIENCE",
  ],
  [
    "Product interfaces",
    "Focused flows and interface systems that make early products easier to understand and use.",
    "USER FLOWS / UI / DESIGN SYSTEMS",
  ],
  [
    "Frontend delivery",
    "Accessible, responsive React builds with thoughtful motion and clean handoff.",
    "REACT / RESPONSIVE / ACCESSIBILITY",
  ],
];
export function Services() {
  return (
    <section
      id="services"
      tabIndex={-1}
      className="services section-space"
      aria-labelledby="services-heading"
    >
      <div className="wrap services-layout">
        <div className="services-intro">
          <p className="eyebrow">02 / FROM THE FIRST IDEA</p>
          <h2 id="services-heading">
            What{" "}
            <br />
            we <i>do.</i>
          </h2>
          <p>
            A clear idea, carefully expressed.{" "}
            <br />
            Built to work in the real world.
          </p>
          <span className="services-symbol" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="service-list">
          {services.map(([title, text, tags], i) => (
            <article className="service-row" key={title}>
              <span className="service-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="micro">{tags}</span>
              </div>
              <span className="service-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section
      className="process wrap section-space"
      aria-labelledby="process-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / THOUGHTFUL STEPS, SHARED DIRECTION</p>
          <h2 id="process-heading">
            A clear path from{" "}
            <br />
            <i>idea to launch.</i>
          </h2>
        </div>
        <p>
          Enough structure to move with purpose.{" "}
          <br />
          Enough room for something unexpected.
        </p>
      </div>
      <div className="process-grid">
        {[
          [
            "Frame",
            "Clarify the audience, message, scope, and measure of success.",
          ],
          [
            "Shape",
            "Build the visual system and test the most important screen first.",
          ],
          [
            "Finish",
            "Develop, refine across breakpoints, verify quality, and prepare the release.",
          ],
        ].map(([title, text], index) => (
          <article key={title}>
            <div className="process-top">
              <span>0{index + 1}</span>
              <span aria-hidden="true">{["↗", "✳", "↗"][index]}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function StudioStatement() {
  return (
    <section
      id="studio"
      tabIndex={-1}
      className="studio wrap section-space"
      aria-labelledby="studio-heading"
    >
      <div className="studio-stamp" aria-hidden="true">
        <span>INDEPENDENT IN SPIRIT</span>
        <span className="studio-monogram">
          f<i>&</i>f
        </span>
        <span>INTENTIONAL IN EVERY DETAIL</span>
      </div>
      <div>
        <p className="eyebrow">04 / A NOTE ON THE STUDIO</p>
        <h2 id="studio-heading">
          Small by design.{" "}
          <br />
          <i>Close to the work.</i>
        </h2>
        <p>
          Form & Field is a fictional independent studio concept created to
          demonstrate an end-to-end web-design process—from positioning and art
          direction to responsive frontend delivery. Every project shown here is
          original portfolio work, not a claim of paid client engagement.
        </p>
        <span className="studio-signoff">A portfolio of possibilities.</span>
      </div>
    </section>
  );
}
