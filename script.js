document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: true,     // Whether animation should happen only once
        offset: 50,     // Offset (in px) from the original trigger point
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        // This is where you will later send data to your Node.js backend
        alert(`Thank you for your message, ${name}! (This is a frontend demo)`);
        
        contactForm.reset();
    });
});