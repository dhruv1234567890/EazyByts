import React from 'react';

const Blogs = () => {
  return (
    <section id="blogs">
      <div className="container">
        <h2 data-aos="fade-up">Latest Blog Posts</h2>
        <div id="blog-list" className="grid">
         
          <div className="card" data-aos="fade-up">
            <h3>How to Build a REST API</h3>
            <p>A step-by-step guide to creating your first REST API with Node.js and Express...</p>
            <a href="#">Read More</a>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="200">
            <h3>Understanding React Hooks</h3>
            <p>Dive deep into what React Hooks are and how to use them effectively...</p>
            <a href="#">Read More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;