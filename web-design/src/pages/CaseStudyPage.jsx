import { Link } from "react-router-dom";
import {
  AsterScreen,
  CommonArtwork,
  ConceptImage,
} from "../components/ProjectArtwork";

function Availability() {
  return (
    <div className="availability">
      <span>
        Make room for
        <br />
        <i>a slower stay.</i>
      </span>
      <div>
        <small>ARRIVAL</small>
        <b>
          18 September <span>⌄</span>
        </b>
      </div>
      <div>
        <small>DEPARTURE</small>
        <b>
          21 September <span>⌄</span>
        </b>
      </div>
      <div>
        <small>GUESTS</small>
        <b>
          2 guests <span>⌄</span>
        </b>
      </div>
      <span className="availability-action">Find your room ↗</span>
    </div>
  );
}
export function CaseStudyPage() {
  return (
    <div className="case-page">
      <section className="case-hero wrap">
        <Link className="text-link back-link" to="/#work">
          <span aria-hidden="true">↖</span> Back to selected work
        </Link>
        <div className="case-heading">
          <div>
            <p className="eyebrow">01 / HOSPITALITY, RECONSIDERED</p>
            <h1>Aster House</h1>
            <p className="case-deck">
              A quiet digital retreat <i>for the coast.</i>
            </p>
          </div>
          <span className="case-monogram" aria-hidden="true">
            a*
          </span>
        </div>
        <div className="case-meta">
          <div>
            <span>DISCIPLINES</span>
            <p>Strategy · Art direction · Web design · Frontend</p>
          </div>
          <div>
            <span>YEAR</span>
            <p>2026</p>
          </div>
          <div>
            <span>PROJECT TYPE</span>
            <p>Self-initiated fictional case study</p>
          </div>
        </div>
      </section>
      <section
        className="case-showcase wrap"
        aria-label="Aster House desktop homepage concept"
      >
        <div className="case-showcase-inner">
          <div className="showcase-label">
            <span>ASTER HOUSE</span>
            <span>A COASTAL COLOR STUDY</span>
            <div className="mini-palette">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <AsterScreen eager />
          <div className="showcase-caption">
            <span>01 — THE DIGITAL ARRIVAL</span>
            <span>Original concept imagery & identity</span>
          </div>
        </div>
      </section>
      <section className="case-narrative wrap section-space">
        <p className="eyebrow">THE CHALLENGE</p>
        <div>
          <h2>
            Making <i>stillness useful</i>
          </h2>
          <p className="large-copy">
            The concept called for a site that felt slow and restorative without
            hiding the practical information a guest needs. The design had to
            hold atmosphere, room details, location, and a clear booking path in
            one restrained system.
          </p>
          <p className="case-small-note">
            A fictional six-room coastal retreat. An exploration of how
            atmosphere and practical information can share the same space.
          </p>
        </div>
      </section>
      <section className="case-strategy wrap section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE STRATEGY</p>
            <h2>
              Editorial rhythm,
              <br />
              <i>hospitality clarity.</i>
            </h2>
          </div>
        </div>
        <div className="strategy-grid">
          {[
            [
              "Lead with place",
              "Natural color, generous crops, and short sensory language establish context quickly.",
            ],
            [
              "Reveal details progressively",
              "Rooms, amenities, and location appear in a deliberate reading sequence.",
            ],
            [
              "Keep decisions visible",
              "Dates, room types, and booking actions remain easy to find without dominating the mood.",
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="visual-system section-space">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE VISUAL LANGUAGE</p>
              <h2>
                A sense <i>of place.</i>
              </h2>
            </div>
            <p>
              Chalk, seaweed, sun-warmed clay, and ink. An identity drawn from
              the quiet details of the coast.
            </p>
          </div>
          <div className="identity-grid">
            <div className="identity-wordmark">
              <span className="micro">01 / WORDMARK & TYPOGRAPHY</span>
              <p>aster house</p>
              <span className="identity-subtitle">ROOM TO SLOW DOWN.</span>
              <div className="type-specimen">
                <span>
                  Aa <i>Bb</i> Cc
                </span>
                <span>
                  Instrument Serif
                  <br />
                  DM Sans / A considered contrast
                </span>
              </div>
            </div>
            <div className="identity-mark">
              <span className="micro">02 / MONOGRAM STUDY</span>
              <span className="identity-symbol">a*</span>
              <span className="micro">A SMALL MARK. A QUIET PRESENCE.</span>
            </div>
            <div className="palette-row">
              {[
                ["Chalk", "#F2EEE5"],
                ["Seaweed", "#344B3D"],
                ["Clay", "#B66F50"],
                ["Ink", "#292D29"],
              ].map(([name, color]) => (
                <div key={name} style={{ "--swatch": color }}>
                  <span className="palette-color" />
                  <span>
                    {name}
                    <small>{color}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="visual-disclosure">
            Original concept work — identity, interface design, and AI-generated
            environmental imagery created for this fictional project.
          </p>
        </div>
      </section>
      <section className="rooms-section wrap section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE ROOM-DISCOVERY FLOW</p>
            <h2>
              Space to <i>settle in.</i>
            </h2>
          </div>
          <p>
            Useful details sit beside generous imagery. Each room has a
            character; every decision has a clear next step.
          </p>
        </div>
        <div
          className="rooms-screen"
          role="img"
          aria-label="Original Aster House room overview and availability interface concept"
        >
          <div className="rooms-screen-head">
            <span className="aster-logo">aster house</span>
            <span>THE ROOMS &nbsp; / &nbsp; 02</span>
          </div>
          <div className="room-content">
            <ConceptImage
              image="room"
              alt="Original concept image of a sunlit limestone bedroom with an arched window"
            />
            <div className="room-details">
              <span className="micro">A GOOD PLACE TO DO VERY LITTLE</span>
              <h3>
                The light
                <br />
                <i>comes in slowly.</i>
              </h3>
              <p>
                Six considered rooms. Linen, limestone, and a window to
                somewhere quieter.
              </p>
              <div className="room-specs">
                <span>The Terrace Room</span>
                <span>02 guests · 32 m²</span>
              </div>
              <span className="mock-room-cta">
                Explore the room <span>↗</span>
              </span>
            </div>
          </div>
          <Availability />
        </div>
        <p className="showcase-caption">
          02 — ROOM OVERVIEW & AVAILABILITY MODULE / PRESENTATION CONCEPT
        </p>
      </section>
      <section className="responsive-section section-space">
        <div className="wrap responsive-layout">
          <div>
            <p className="eyebrow">CONSIDERED AT EVERY SCALE</p>
            <h2>
              The same calm.
              <br />
              <i>A smaller screen.</i>
            </h2>
            <p>
              Navigation stays within reach. Room details become a natural
              reading sequence. The next step is always easy to find.
            </p>
            <div className="responsive-notes">
              <span>
                01 <b>Simple, visible navigation</b>
              </span>
              <span>
                02 <b>A room card with the essentials</b>
              </span>
              <span>
                03 <b>A clear invitation to stay</b>
              </span>
            </div>
            <span className="micro">
              MOBILE INTERFACE STUDIES / ORIGINAL CONCEPT
            </span>
          </div>
          <div className="phone-pair">
            <div className="phone phone-one">
              <div className="phone-top">
                9:41<span>••• ▰</span>
              </div>
              <div className="phone-nav">
                <span>aster house</span>
                <span>Menu +</span>
              </div>
              <ConceptImage alt="Coastal courtyard concept in the mobile homepage" />
              <div className="phone-copy">
                <small>A QUIETER PACE</small>
                <h3>
                  A little closer
                  <br />
                  to <i>doing nothing.</i>
                </h3>
                <p>
                  Six rooms on the coast.
                  <br />A place to be, for a while.
                </p>
                <span className="phone-cta">Plan your stay ↗</span>
              </div>
            </div>
            <div className="phone phone-two">
              <div className="phone-top">
                9:41<span>••• ▰</span>
              </div>
              <div className="phone-nav">
                <span>aster house</span>
                <span>Menu +</span>
              </div>
              <div className="phone-room-heading">
                <small>FIND YOUR QUIET</small>
                <h3>
                  Room to <i>rest.</i>
                </h3>
              </div>
              <ConceptImage
                image="room"
                alt="Limestone bedroom concept in the mobile room card"
              />
              <div className="phone-copy">
                <h3>The Terrace Room</h3>
                <p>
                  Sun-warmed mornings.
                  <br />A terrace all to yourself.
                </p>
                <div className="phone-room-meta">
                  02 guests <span>32 m²</span>
                </div>
                <span className="phone-cta">Explore the room ↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="case-narrative outcomes wrap section-space">
        <p className="eyebrow">THE DELIVERABLES</p>
        <div>
          <h2>
            A focused system
            <br />
            <i>ready to grow.</i>
          </h2>
          <ul>
            {[
              "A responsive editorial homepage and room-discovery flow",
              "A compact identity and reusable interface system",
              "Clear booking cues without a heavy commerce aesthetic",
              "Accessible interaction patterns across desktop and mobile",
            ].map((text) => (
              <li key={text}>
                <span aria-hidden="true">↗</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="case-close wrap section-space">
        <div>
          <p className="eyebrow">
            THE NEXT GOOD THING STARTS WITH A CONVERSATION
          </p>
          <h2>
            Let’s give your idea
            <br />
            <i>a considered form.</i>
          </h2>
          <nav aria-label="Case study navigation">
            <Link className="button button-dark" to="/#inquiry">
              Start a project <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" to="/#work">
              Back to selected work <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
        <div className="next-preview">
          <CommonArtwork />
          <div>
            <span>Next concept preview</span>
            <h3>Common Ground</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
