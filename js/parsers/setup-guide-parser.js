// Setup Guide Markdown Parser with Section-based Filtering
function parseSetupGuideMarkdown(markdown) {
    const lines = markdown.split('\n');
    let sections = [];
    let currentSection = null;
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeLanguage = '';
    let sidebarItems = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Handle code blocks
        if (line.trim().startsWith('```')) {
            if (!inCodeBlock) {
                // Starting a code block
                inCodeBlock = true;
                codeLanguage = line.trim().substring(3).trim();
                codeBlockContent = [];
            } else {
                // Ending a code block
                inCodeBlock = false;
                const codeContent = formatShellCode(codeBlockContent.join('\n'));
                const codeHtml = `<div class="code-block"><i class="fas fa-copy copy-icon" onclick="copyCode(this)"></i><pre><code>${codeContent}</code></pre></div>`;
                if (currentSection) {
                    currentSection.content.push(codeHtml);
                }
                codeBlockContent = [];
            }
            continue;
        }
        
        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }
        
        // Skip empty lines
        if (line.trim() === '') {
            continue;
        }
        
        // Headers - start new section
        if (line.startsWith('# ')) {
            const title = line.substring(2).trim();
            const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            
            // Save previous section
            if (currentSection) {
                sections.push(currentSection);
            }
            
            // Start new section
            currentSection = {
                title: title,
                id: id,
                content: [`<h2 id="${id}" class="section-title">${title}</h2>`]
            };
            sidebarItems.push({ title, id });
        } else if (line.startsWith('## ')) {
            if (currentSection) {
                currentSection.content.push(`<h3>${line.substring(3).trim()}</h3>`);
            }
        } else if (line.startsWith('### ')) {
            if (currentSection) {
                currentSection.content.push(`<h4>${line.substring(4).trim()}</h4>`);
            }
        }
        // Bold notes
        else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
            const content = line.trim().substring(2, line.trim().length - 2);
            if (currentSection) {
                currentSection.content.push(`<div class="note"><p><strong>Note:</strong> ${content}</p></div>`);
            }
        }
        // Regular paragraph
        else {
            // Process inline markdown
            let processed = line;
            processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
            processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');
            processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
            
            if (currentSection) {
                currentSection.content.push(`<p class="command-description">${processed}</p>`);
            }
        }
    }
    
    // Save last section
    if (currentSection) {
        sections.push(currentSection);
    }
    
    return { sections, sidebarItems };
}

function formatShellCode(code) {
    // Split into lines and process each line
    const lines = code.split('\n');
    const formattedLines = lines.map(line => {
        // Check if line starts with $ (shell prompt)
        if (line.trim().startsWith('$')) {
            // Split on first space after $
            const match = line.match(/^(\s*\$\s+)(.*)/);
            if (match) {
                return `<span class="shell-prompt">${escapeHtml(match[1])}</span><span class="shell-command">${escapeHtml(match[2])}</span>`;
            }
        }
        // Regular line
        return escapeHtml(line);
    });
    return formattedLines.join('\n');
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function copyCode(icon) {
    const codeBlock = icon.parentElement;
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        // Change to check icon temporarily
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        icon.style.color = '#22c55e';
        
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
            icon.style.color = '#4ade80';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function generateSidebar(items) {
    if (items.length === 0) return '';
    
    let html = '<aside class="sidebar-nav">';
    html += '<h3>Quick Navigation</h3>';
    html += '<button class="sidebar-btn active" onclick="showAllSections()">All Sections</button>';
    html += '<ul>';
    items.forEach((item, index) => {
        html += `<li><a href="#" class="sidebar-link" data-section="${item.id}" onclick="filterSection('${item.id}'); return false;">${item.title}</a></li>`;
    });
    html += '</ul></aside>';
    return html;
}

function showAllSections() {
    const sections = document.querySelectorAll('.guide-section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
    
    // Update active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.sidebar-btn').classList.add('active');
}

function filterSection(sectionId) {
    const sections = document.querySelectorAll('.guide-section');
    sections.forEach(section => {
        if (section.dataset.section === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Update active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    document.querySelector('.sidebar-btn').classList.remove('active');
    
    // Scroll to top of content
    // document.querySelector('.setup-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function loadSetupGuide(markdownFile) {
    try {
        const response = await fetch(markdownFile);
        if (!response.ok) {
            throw new Error(`Failed to load ${markdownFile}`);
        }
        const markdown = await response.text();
        const { sections, sidebarItems } = parseSetupGuideMarkdown(markdown);
        
        // Insert sidebar
        const setupLayout = document.querySelector('.setup-layout');
        const sidebar = generateSidebar(sidebarItems);
        setupLayout.insertAdjacentHTML('afterbegin', sidebar);
        
        // Insert sections
        const contentDiv = document.querySelector('.setup-content .content');
        let html = '';
        sections.forEach(section => {
            html += `<div class="guide-section" data-section="${section.id}">`;
            html += section.content.join('\n');
            html += '</div>';
        });
        contentDiv.innerHTML = html;
    } catch (error) {
        console.error('Error loading setup guide:', error);
    }
}
