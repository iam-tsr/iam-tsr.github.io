// Simple markdown to HTML parser
function parseMarkdown(markdown) {
    let html = markdown;
    
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
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Line breaks to paragraphs
    const lines = html.split('\n');
    let inParagraph = false;
    let result = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (line === '') {
            if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
            }
            continue;
        }
        
        // Skip lines that are already HTML tags
        if (line.match(/^<h[1-6]>/) || line.match(/^<\/h[1-6]>/)) {
            if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
            }
            result.push(line);
            continue;
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
    
    return result.join('');
}

// Load markdown content into a specified element
async function loadMarkdownContent(markdownFile, targetElement) {
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
