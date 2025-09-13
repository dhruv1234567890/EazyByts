import React from 'react';

const Footer = () => {
  return (
    <footer id="footer">
 
        <div className="social-links">
          <a href="https://www.linkedin.com/in/dhruv-chunawala-01615720a" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://www.github.com/dhruv1234567890" aria-label="GitHub"><i className="fab fa-github"></i></a>
          <a href="https://www.instagram.com/chunawala.dhruv/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="mailto:chunawaladhruv301@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
        </div>
        <a href="/Resume_Dhruv_Chunawala.pdf" className="btn btn-outline" download>Download CV</a>
        <p>&copy; 2024 Dhruv. All rights reserved.</p>

    </footer>
  );
};

export default Footer;