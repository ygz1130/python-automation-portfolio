import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { ProjectArtwork } from "./ProjectArtwork";
export function ProjectCard({ project, index }) {
  return (
    <article className={`project-card project-card--${project.variant}`}>
      {project.href ? (
        <Link
          className="project-visual-link"
          to={project.href}
          aria-label="Explore Aster House"
        >
          <ProjectArtwork variant={project.variant} />
          <span className="project-hover" aria-hidden="true">
            Explore project ↗
          </span>
        </Link>
      ) : (
        <ProjectArtwork variant={project.variant} />
      )}
      <div className="project-meta">
        <span className="project-index">0{index + 1}</span>
        <div>
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
        </div>
        <span className="project-year">{project.year}</span>
      </div>
      <div className="project-description">
        <p>{project.summary}</p>
        {project.href ? (
          <Link
            className="text-link"
            to={project.href}
            aria-label="View Aster House case study"
          >
            View case study <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <span className="preview-label">
            Concept preview <span aria-hidden="true">◦</span>
          </span>
        )}
      </div>
    </article>
  );
}
export function SelectedWork() {
  return (
    <section
      id="work"
      tabIndex={-1}
      className="selected-work wrap section-space"
      aria-labelledby="work-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / A FEW THINGS WE’VE SHAPED</p>
          <h2 id="work-heading">
            Selected <i>work.</i>
          </h2>
        </div>
        <p>
          A small collection of identities, interfaces, and digital spaces
          designed to make complex ideas feel immediate.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      <div className="work-note">
        <span>Different worlds. The same attention to detail.</span>
        <span>ALL PROJECTS ARE ORIGINAL PORTFOLIO CONCEPTS</span>
      </div>
    </section>
  );
}
