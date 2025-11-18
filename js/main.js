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

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun theme-icon';
        } else {
            themeIcon.className = 'fa-solid fa-moon theme-icon';
        }
    }
}

// Initialize app
async function initApp() {
    // Load navbar and footer first
    await loadComponent('navbar-placeholder', '/js/components/navbar.html');
    await loadComponent('footer-placeholder', '/js/components/footer.html');
    
    // Initialize theme
    initTheme();
    
    // Add theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
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
