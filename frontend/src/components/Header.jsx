import React, { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header id="header">
            <div className="container">
                <nav>
                    <a href="#home" className="logo">Dhruv Chunawala</a>
                    
                    <ul className="desktop-nav">
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Portfolio</a></li>
                        <li><a href="#blogs">Blogs</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>

                    <div className="mobile-nav-toggle" onClick={toggleMenu}>
                        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>

                    <div className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
                        <ul>
                            <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
                            <li><a href="#projects" onClick={toggleMenu}>Portfolio</a></li>
                            <li><a href="#blogs" onClick={toggleMenu}>Blogs</a></li>
                            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;