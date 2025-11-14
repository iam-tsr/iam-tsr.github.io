// Load navbar and footer components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'about';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load navbar and footer
    await loadComponent('navbar-placeholder', '../components/navbar.html');
    await loadComponent('footer-placeholder', '../components/footer.html');
    
    // Set active link after navbar is loaded
    setActiveNavLink();
});
