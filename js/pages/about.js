import { loadMarkdownContent } from '../parsers/markdown-parser.js';

export function renderAboutPage() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <main class="container">
            <section class="section active">
                <div class="hero">
                    <h1 class="name-title">Tushar Soni<span class="conjuction"> aka </span><span class="subtitle-inline">TSR</span></h1>
                    <!-- <p class="tagline">write tagline here</p> -->
                </div>
                
                <div class="content" id="about">
                    <!-- Content will be loaded from about.md -->
                </div>

                <div class="resources-section">
                    <h2 class="title">resources</h2>
                    <div id="resources" class="resources-content">
                        <!-- Resources will be loaded from resources.md -->
                    </div>
                </div>
            </section>
        </main>
    `;
    
    // Load markdown content
    loadMarkdownContent('/content/about.md', '#about');
    loadMarkdownContent('/content/resources.md', '#resources');
    
    // Update page title
    document.title = 'about';
}
