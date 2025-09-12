import React from 'react';

const Home = () => {
  return (
    <section id="home">
      <div className="container" data-aos="fade-in">
        <h1>Hi, I'm <span>Dhruv</span></h1>
        <p className="subtitle">I build web apps & tooling — specialising in React + Node — Full-stack developer building interactive apps & delightful UX.</p>
        <div className="home-buttons">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="/Resume_Dhruv_Chunawala.pdf" className="btn btn-secondary" download>Download CV</a>
        </div>
      </div>
    </section>
  );
};

export default Home;