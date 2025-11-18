// Simple markdown to HTML parser
function parseMarkdown(markdown) {
    let html = markdown;
    
    // Horizontal rules (must be before headers)
    html = html.replace(/^---$/gim, '<hr>');
    html = html.replace(/^\*\*\*$/gim, '<hr>');
    html = html.replace(/^___$/gim, '<hr>');
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/_(.*?)_/gim, '<em>$1</em>');
    
    // Links - handle internal vs external links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, function(match, text, url) {
        // Check if it's an internal link (starts with / or doesn't start with http)
        const isInternal = url.startsWith('/') || (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//'));
        
        if (isInternal) {
            // For internal links, add data-link attribute for client-side routing
            return `<a href="${url}" data-link>${text}</a>`;
        } else {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        }
    });
    
    // Line breaks to paragraphs and lists
    const lines = html.split('\n');
    let inParagraph = false;
    let inList = false;
    let result = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (line === '') {
            if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
            }
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            continue;
        }
        
        // Skip lines that are already HTML tags
        if (line.match(/^<h[1-6]>/) || line.match(/^<\/h[1-6]>/) || line.match(/^<hr>/)) {
            if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
            }
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            result.push(line);
            continue;
        }
        
        // Handle list items
        if (line.match(/^-\s+(.+)/)) {
            const listContent = line.replace(/^-\s+/, '');
            if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
            }
            if (!inList) {
                result.push('<ul>');
                inList = true;
            }
            result.push(`<li>${listContent}</li>`);
            continue;
        }
        
        // Close list if we're in one and encounter non-list content
        if (inList) {
            result.push('</ul>');
            inList = false;
        }
        
        // Start new paragraph
        if (!inParagraph) {
            result.push('<p>');
            inParagraph = true;
        } else {
            result.push(' ');
        }
        
        result.push(line);
    }
    
    if (inParagraph) {
        result.push('</p>');
    }
    if (inList) {
        result.push('</ul>');
    }
    
    return result.join('');
}

// Load markdown content into a specified element
export async function loadMarkdownContent(markdownFile, targetElement) {
    try {
        const response = await fetch(markdownFile);
        if (!response.ok) {
            throw new Error(`Failed to load ${markdownFile}`);
        }
        const markdown = await response.text();
        const html = parseMarkdown(markdown);
        
        // Find the content div and insert the HTML before the social-links
        const contentDiv = document.querySelector(targetElement);
        const socialLinks = contentDiv.querySelector('.social-links');
        
        if (socialLinks) {
            socialLinks.insertAdjacentHTML('beforebegin', html);
        } else {
            contentDiv.innerHTML = html + contentDiv.innerHTML;
        }
    } catch (error) {
        console.error('Error loading markdown content:', error);
    }
}
