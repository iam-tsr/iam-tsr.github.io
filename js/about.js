// About page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add navbar background on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Add animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe social links
    const socialLinks = document.querySelector('.social-links');
    if (socialLinks) {
        socialLinks.style.opacity = '0';
        socialLinks.style.transform = 'translateY(20px)';
        socialLinks.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(socialLinks);
    }

    // Handle external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('External link clicked:', link.href);
        });
    });

    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Console message
    console.log('%c👋 Welcome to my website!', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
});
