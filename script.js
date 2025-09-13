document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 1000, 
        once: true,     
        offset: 50,     
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        alert(`Thank you for your message, ${name}! (This is a frontend demo)`);
        
        contactForm.reset();
    });
});