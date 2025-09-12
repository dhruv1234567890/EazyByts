import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send form data to the backend will go here
    alert('Form submitted! (Frontend placeholder)');
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 data-aos="fade-up">Contact Me</h2>
        <div className="contact-info-strip" data-aos="fade-up" data-aos-delay="200">
          <div className="contact-item">
            <div className="icon-box"><i className="fas fa-phone"></i></div>
            <div>
              <h4>Call me</h4>
              <p>+91 9427550037</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon-box"><i className="fas fa-envelope"></i></div>
            <div>
              <h4>Email me</h4>
              <p>chunawaladhruv301@gmail.com</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon-box"><i className="fas fa-map-marker-alt"></i></div>
            <div>
              <h4>Address</h4>
              <p>India</p>
            </div>
          </div>
        </div>
        <form id="contact-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="400">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;