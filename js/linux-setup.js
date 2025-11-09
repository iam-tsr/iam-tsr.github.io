// Linux Setup page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add copy functionality to code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach((block, index) => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyBtn.setAttribute('data-index', index);
        
        // Insert button at the beginning of code block
        block.insertBefore(copyBtn, block.firstChild);
        
        // Add click event
        copyBtn.addEventListener('click', () => {
            const code = block.querySelector('pre code').textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                    copyBtn.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                copyBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            });
        });
    });

    // Sidebar navigation active state
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.section-title');

    // Highlight active section on scroll
    function highlightActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Highlight code syntax (basic highlighting)
    const codeElements = document.querySelectorAll('.code-block code');
    codeElements.forEach(code => {
        let html = code.innerHTML;
        
        // Highlight comments
        html = html.replace(/(#.*)/g, '<span style="color: #6b7280;">$1</span>');
        
        // Highlight commands (simple pattern)
        html = html.replace(/\b(sudo|apt|git|docker|npm|pip|curl|wget|chmod|ssh-keygen|eval|cat|echo)\b/g, 
            '<span style="color: #f472b6;">$1</span>');
        
        // Highlight flags
        html = html.replace(/(-[a-zA-Z]+|--[a-zA-Z-]+)/g, 
            '<span style="color: #fbbf24;">$1</span>');
        
        code.innerHTML = html;
    });

    // Console message
    console.log('%c🐧 Linux Setup Guide', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
});
