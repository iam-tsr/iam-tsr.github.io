import { loadSetupGuide } from '../parsers/setup-guide-parser.js';

export function renderFedoraGuidePage() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <main class="container setup-container">
            <div class="setup-layout">
                <!-- Sidebar will be generated dynamically -->
                
                <!-- Main Content Area -->
                <div class="setup-content">
                    <section class="section active">
                        <div class="hero">
                            <h1 class="title">fedora setup guide</h1>
                            <p class="tagline">bash commands and installation guide</p>
                        </div>
                        
                        <div class="content">
                            <!-- Content will be loaded from fedora-setup-guide.md -->
                        </div>
                    </section>
                </div>
            </div>
        </main>
    `;
    
    // Load markdown content
    loadSetupGuide('/content/fedora-guide.md');
    
    // Update page title
    document.title = 'fedora setup guide';
}
