import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="card" data-aos="fade-up">
      <img src={project.imageUrl} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {/* You can add links here if you want */}
      {/* <a href={project.liveLink}>Live Demo</a> */}
    </div>
  );
};

export default ProjectCard;