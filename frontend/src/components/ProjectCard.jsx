import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="card" data-aos="fade-up">
      <a href={project.liveLink || project.githubLink || '#'} target="_blank" rel="noopener noreferrer">
        <img src={project.imageUrl} alt={project.title} />
      </a>
      <div className="card-content"> 
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-tags">
          {project.technologies && project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="project-links">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <i className="fas fa-external-link-alt"></i> Live Site
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <i className="fab fa-github"></i> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;