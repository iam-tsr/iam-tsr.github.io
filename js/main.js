import '../css/styles.css';
import Router from './router.js';
import { renderAboutPage } from './pages/about.js';
import { renderCodePage } from './pages/code.js';
import { renderFedoraGuidePage } from './pages/fedora-guide.js';
import { render404Page } from './pages/404.js';

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

// Initialize app
async function initApp() {
    // Load navbar and footer first
    await loadComponent('navbar-placeholder', '/js/components/navbar.html');
    await loadComponent('footer-placeholder', '/js/components/footer.html');
    
    // Define routes
    const routes = {
        'about': renderAboutPage,
        'code': renderCodePage,
        'fedora-guide': renderFedoraGuidePage,
        '404': render404Page
    };
    
    // Initialize router
    new Router(routes);
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
