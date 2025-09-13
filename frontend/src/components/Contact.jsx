import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Frontend placeholder)');
  };

  return (
<section id="contact">
    <div className="container">
        <h2 data-aos="fade-up">Contact Me</h2>
        <div className="contact-wrapper">
            <div className="contact-info" data-aos="fade-right">
                <h3>Get in Touch</h3>
                <p>Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new ideas and opportunities.</p>
                <div className="info-item">
                    <i className="fas fa-phone"></i>
                    <span>+91 9427550037</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <span>chunawadhruv301@gmail.com</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>India</span>
                </div>
            </div>
            <form id="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
                <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
        </div>
    </div>
</section>
  );
};

export default Contact;