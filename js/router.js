// Simple client-side router for clean URLs
class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        
        // Handle initial load
        this.loadRoute(window.location.pathname);
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.loadRoute(window.location.pathname);
        });
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.getAttribute('href'));
            }
        });
    }
    
    navigateTo(path) {
        history.pushState(null, null, path);
        this.loadRoute(path);
    }
    
    loadRoute(path) {
        // Normalize path
        path = path === '/' ? '/about' : path;
        path = path.replace(/^\//, ''); // Remove leading slash
        
        const route = this.routes[path] || this.routes['404'];
        
        if (route) {
            this.currentRoute = path;
            route();
            this.setActiveNavLink(path);
        }
    }
    
    setActiveNavLink(currentPath) {
        // Wait for navbar to be loaded
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkPath = link.getAttribute('href').replace(/^\//, '');
                if (linkPath === currentPath || (currentPath === '' && linkPath === 'about')) {
                    link.classList.add('active');
                }
            });
            
            // Hide nav-logo on about page, show on other pages
            const navLogo = document.getElementById('nav-logo');
            if (navLogo) {
                if (currentPath === 'about' || currentPath === '') {
                    navLogo.textContent = '';
                    navLogo.style.visibility = 'hidden';
                } else {
                    navLogo.textContent = 'TSR';
                    navLogo.style.visibility = 'visible';
                }
            }
        }, 100);
    }
}

export default Router;
