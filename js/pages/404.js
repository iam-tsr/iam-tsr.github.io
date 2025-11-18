export function render404Page() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <main class="container">
            <section class="section active">
                <div class="hero">
                    <h1 class="title">404</h1>
                    <p class="tagline">Page not found</p>
                </div>
                
                <div class="content">
                    <p>The page you're looking for doesn't exist.</p>
                    <p><a href="/about" data-link>Go back to home</a></p>
                </div>
            </section>
        </main>
    `;
    
    document.title = '404 - Not Found';
}
