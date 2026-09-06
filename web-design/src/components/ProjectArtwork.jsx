export function ConceptImage({
  image = "coast",
  alt = "",
  className = "",
  eager = false,
  sizes = "(max-width: 700px) 100vw, 80vw",
}) {
  const path = `${import.meta.env.BASE_URL}images/aster-${image}`;
  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet={`${path}-768.webp 768w, ${path}.webp 1536w`}
        sizes={sizes}
      />
      <img
        src={`${path}.jpg`}
        width="1536"
        height="1024"
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
export function AsterScreen({ compact = false, eager = false }) {
  return (
    <div className={`aster-screen ${compact ? "aster-screen--compact" : ""}`}>
      <div className="aster-nav">
        <span className="aster-logo">
          aster house<span>COASTAL RETREAT</span>
        </span>
        <div>
          Our place<span>The rooms</span>
          <span className="mock-button">Plan your stay ↗</span>
        </div>
      </div>
      <div className="aster-hero">
        <ConceptImage
          eager={eager}
          alt="Original concept image of an ivory coastal retreat overlooking a quiet bay"
        />
        <div className="aster-hero-copy">
          <span className="micro">SIX ROOMS. ONE QUIETER PACE.</span>
          <p>
            A little closer
            <br />
            to <i>doing nothing.</i>
          </p>
          <span className="aster-explore">
            Discover Aster House <span>↗</span>
          </span>
        </div>
        <span className="aster-coordinate">
          38° 42′ N / A STUDY IN STILLNESS
        </span>
      </div>
      <div className="aster-bottom">
        <span>
          A place to arrive.
          <br />A reason to stay.
        </span>
        <p>
          Salt in the air. Light on the walls.
          <br />
          Make a little room for the unhurried.
        </p>
        <span className="aster-small-mark">a*</span>
      </div>
    </div>
  );
}
export function CommonArtwork() {
  return (
    <div
      className="common-art"
      role="img"
      aria-label="Common Ground original product interface concept, showing neighbourhood projects and a community garden"
    >
      <div className="common-screen" aria-hidden="true">
        <aside>
          <b>
            common
            <br />
            ground<span>↗</span>
          </b>
          <small>YOUR NEIGHBOURHOOD</small>
          <span className="common-active">⌂ &nbsp; Overview</span>
          <span>◫ &nbsp; Projects</span>
          <span>◎ &nbsp; Community</span>
          <div className="common-aside-bottom">
            Little actions.
            <br />
            Shared possibilities.
          </div>
        </aside>
        <div className="common-main">
          <div className="common-topline">
            Oakwood neighbourhood <span>☀ &nbsp; AG</span>
          </div>
          <small>MONDAY, 14 SEPTEMBER</small>
          <h4>
            Good things start
            <br />
            with <em>us.</em>
          </h4>
          <p>Find a little way to make a difference.</p>
          <div className="common-stats">
            <span>
              <b>12</b>Local projects
            </span>
            <span>
              <b>86</b>Neighbours involved
            </span>
            <span>
              <b>04</b>Happening this week
            </span>
          </div>
          <div className="common-project">
            <div className="garden-pattern">✳</div>
            <div>
              <small>GROW TOGETHER</small>
              <b>A garden for everyone</b>
              <p>Turning an empty corner into a shared space.</p>
              <span className="common-progress" />
              <small>8 neighbours taking part &nbsp; ↗</small>
            </div>
          </div>
        </div>
      </div>
      <span className="art-caption">
        PRODUCT STUDY — COMMUNITY, MADE VISIBLE.
      </span>
    </div>
  );
}
export function NomaArtwork() {
  return (
    <div
      className="noma-art"
      role="img"
      aria-label="Noma Editions original publishing storefront concept with terracotta and black geometric print covers"
    >
      <div className="noma-screen" aria-hidden="true">
        <div className="noma-nav">
          <b>
            NOMA<span>EDITIONS</span>
          </b>
          <span>Books & objects &nbsp; Journal &nbsp; Bag (0)</span>
        </div>
        <div className="noma-head">
          <small>INDEPENDENT WORDS. LASTING OBJECTS.</small>
          <h4>
            For the
            <br />
            <i>longer look.</i>
          </h4>
          <span>Discover the collection ↗</span>
        </div>
        <div className="noma-books">
          <div className="book book-clay">
            <span>
              FORM
              <br />
              STUDIES
            </span>
            <div className="book-orbit" />
            <small>NOMA EDITIONS &nbsp; № 001</small>
          </div>
          <div className="book book-ivory">
            <span>
              The art
              <br />
              of noticing.
            </span>
            <div className="book-stripes" />
            <small>OBSERVATIONS, VOL. 02</small>
          </div>
        </div>
        <div className="noma-caption">
          <span>Small editions. A wider perspective.</span>
          <span>01 / 03</span>
        </div>
      </div>
      <span className="art-caption">
        COMMERCE STUDY — OBJECTS WITH SOMETHING TO SAY.
      </span>
    </div>
  );
}
export function ProjectArtwork({ variant }) {
  if (variant === "aster")
    return (
      <div className="aster-art">
        <span className="art-kicker">A STUDY IN STILLNESS</span>
        <AsterScreen compact />
        <span className="art-caption">
          ASTER HOUSE — IDENTITY & DIGITAL EXPERIENCE
        </span>
      </div>
    );
  return variant === "common" ? <CommonArtwork /> : <NomaArtwork />;
}
