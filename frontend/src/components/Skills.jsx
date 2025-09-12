import React from 'react';

const Skills = () => {
  return (
    <section id="skills">
      <div className="container">
        <h2 data-aos="fade-up">My Skills</h2>
        <div className="skills-grid" data-aos="fade-up" data-aos-delay="200">
          <div className="skill-item">ReactJS</div>
          <div className="skill-item">Node.js</div>
          <div className="skill-item">MongoDB</div>
          <div className="skill-item">JavaScript</div>
          <div className="skill-item">HTML5</div>
          <div className="skill-item">CSS3</div>
        </div>
      </div>
    </section>
  );
};

export default Skills;