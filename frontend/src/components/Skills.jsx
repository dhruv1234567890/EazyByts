import React from 'react';

const Skills = () => {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
            <h2>My Skills</h2>
        </div>
        
        <div className="skills-grid" data-aos="fade-up" data-aos-delay="200">
            <div className="skill-item"><i className="devicon-javascript-plain"></i> JavaScript</div>
            <div className="skill-item"><i className="devicon-react-original"></i> React</div>
            <div className="skill-item"><i className="devicon-nodejs-plain"></i> Node.js</div>
            <div className="skill-item"><i className="devicon-mysql-plain"></i> MySQL</div>
            <div className="skill-item"><i className="devicon-mongodb-plain"></i> MongoDB</div>
            <div className="skill-item"><i className="devicon-github-original"></i> GitHub</div>
            <div className="skill-item"><i className="devicon-html5-plain"></i> HTML5</div>
            <div className="skill-item"><i className="devicon-css3-plain"></i> CSS3</div>
        </div>
      </div>
    </section>
  );
};

export default Skills;