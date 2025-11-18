import { loadMarkdownContent } from '../parsers/markdown-parser.js';

export function renderCodePage() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <main class="container">
            <section class="section active">
                <div class="hero">
                    <h1 class="title">code</h1>
                    <p class="tagline">open source projects and language models with datasets</p>
                </div>
                
                <div class="code-content" id="code">
                    <!-- Content will be loaded from projects.md -->
                </div>

                <div class="end-tagline">
                    <p><span style="font-style: italic;">For more open source contributions: </span><a href="https://github.com/iam-tsr" target="_blank"><img src="https://img.shields.io/github/followers/iam-tsr?style=flat&label=Follow%20%40iam-tsr" alt="Follow @iam-tsr"></a></p>
                </div>
            </section>
        </main>
    `;
    
    // Load markdown content
    loadMarkdownContent('/content/projects.md', '#code');
    
    // Update page title
    document.title = 'code';
}
