// frontend/src/components/Home.jsx

import React from 'react';

const Home = () => {
  return (
    <section id="home">
      {/* Container for the animated background */}
      <div className="aurora-background">
        <div className="shape1"></div>
        <div className="shape2"></div>
      </div>

<div className="container">
    <h1 data-aos="fade-up">Hi, I'm <span>Dhruv.</span></h1>
    <p className="subtitle" data-aos="fade-up" data-aos-delay="200">
        I build web apps & tooling — specialising in React + Node — Full-stack developer building interactive apps & delightful UX.
    </p>
    <div className="home-buttons" data-aos="fade-up" data-aos-delay="400">
        <a href="#projects" className="btn btn-primary">View Projects</a>
        <a href="/Resume_Dhruv_Chunawala.pdf" className="btn btn-secondary" download>Download CV</a>
    </div>
</div>
    </section>
  );
};

export default Home;