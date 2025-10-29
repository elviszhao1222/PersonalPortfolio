// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated statistics counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for statistics animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Intersection Observer for project cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('fade-in');
    cardObserver.observe(card);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add active state styling via CSS (we'll add this to styles.css dynamically)
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add hover effects for tech tags
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Add click animation to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('a')) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all animations start properly
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
        }, index * 100);
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.projects-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});

// GitHub integration - Make file names clickable
function convertFilesToGitHubLinks() {
    if (!window.GITHUB_CONFIG || !GITHUB_CONFIG.username || GITHUB_CONFIG.username === 'YOUR_GITHUB_USERNAME') {
        console.log('GitHub not configured. Set GITHUB_CONFIG.username in index.html');
        return;
    }

    document.querySelectorAll('.project-card').forEach(card => {
        const repoKey = card.getAttribute('data-github-repo');
        if (!repoKey || !GITHUB_CONFIG.repos[repoKey]) return;

        const repoName = GITHUB_CONFIG.repos[repoKey];
        const username = GITHUB_CONFIG.username;
        const baseUrl = `https://github.com/${username}/${repoName}`;

        const fileListItems = card.querySelectorAll('.project-files li');
        fileListItems.forEach(li => {
            const fileText = li.textContent.trim();
            
            // Handle multiple files separated by "/" or combined like "file.cpp/h"
            if (fileText.includes('/') || fileText.includes('(')) {
                // For combined entries like "AccPos.cpp/h" or "file1/file2", link to the directory
                const firstFile = fileText.split('/')[0].split('(')[0].trim();
                const cleanFileName = firstFile;
                
                // Try to find the file - if it has an extension, link to it; otherwise link to directory
                if (cleanFileName.includes('.')) {
                    li.innerHTML = `<a href="${baseUrl}/blob/main/${cleanFileName}" target="_blank" rel="noopener noreferrer">${fileText}</a>`;
                } else {
                    li.innerHTML = `<a href="${baseUrl}/tree/main/${cleanFileName}" target="_blank" rel="noopener noreferrer">${fileText}</a>`;
                }
            } else if (fileText.includes('.') || fileText.toLowerCase().includes('src/') || fileText.toLowerCase().includes('include/')) {
                // Regular file with extension or path
                const filePath = fileText;
                li.innerHTML = `<a href="${baseUrl}/blob/main/${filePath}" target="_blank" rel="noopener noreferrer">${fileText}</a>`;
            } else {
                // File without clear extension - try to find it
                // For entries like "Multiple chapter files", link to the repo root
                if (fileText.toLowerCase().includes('multiple') || fileText.toLowerCase().includes('chapter')) {
                    li.innerHTML = `<a href="${baseUrl}" target="_blank" rel="noopener noreferrer">${fileText}</a>`;
                } else {
                    // Try as file name
                    li.innerHTML = `<a href="${baseUrl}/blob/main/${fileText}" target="_blank" rel="noopener noreferrer">${fileText}</a>`;
                }
            }
        });
    });
}

// Initialize GitHub links after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    convertFilesToGitHubLinks();
});

// Re-run after a small delay to ensure GITHUB_CONFIG is loaded
setTimeout(() => {
    convertFilesToGitHubLinks();
}, 100);

