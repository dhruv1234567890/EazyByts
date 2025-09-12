import React from 'react';

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <nav>
          <a href="#home" className="logo">Dhruv Chunawala</a>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Portfolio</a></li>
            <li><a href="#blogs">Blogs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="/Resume_Dhruv_Chunawala.pdf" className="btn btn-outline">Download CV</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;