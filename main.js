// Main JavaScript functionality for Dr. Abdulqadir Book Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initStatsCounters();
    initCarousels();
    initModals();
    initFloatingShapes();
    initSmoothScroll();
    
    console.log('Website initialized successfully');
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}

// Animated statistics counters
function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // 50 steps for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, stepTime);
}

// Initialize carousels
function initCarousels() {
    // Gallery carousel
    const galleryCarousel = document.getElementById('gallery-carousel');
    if (galleryCarousel) {
        new Splide('#gallery-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                },
                1024: {
                    perPage: 2,
                }
            }
        }).mount();
    }
}

// Modal functionality
function initModals() {
    const previewBtn = document.getElementById('preview-btn');
    const previewModal = document.getElementById('preview-modal');
    const closeModal = document.getElementById('close-modal');
    const orderBtn = document.getElementById('order-btn');
    
    if (previewBtn && previewModal) {
        previewBtn.addEventListener('click', function() {
            previewModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal && previewModal) {
        closeModal.addEventListener('click', function() {
            previewModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        previewModal.addEventListener('click', function(e) {
            if (e.target === previewModal) {
                previewModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            showComingSoonPopup('Order functionality coming soon! Please contact us directly.');
        });
    }
    
    // Event button handlers
    const eventButtons = document.querySelectorAll('.event-card button');
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            showComingSoonPopup('Event registration coming soon! Please check back later.');
        });
    });
}

function showComingSoonPopup(message) {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 transform translate-x-full transition-transform duration-300';
    popup.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm text-gray-700">${message}</p>
            </div>
            <div class="ml-4 flex-shrink-0">
                <button class="text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Animate in
    setTimeout(() => {
        popup.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        popup.classList.add('translate-x-full');
        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, 300);
    }, 5000);
}

// Floating shapes animation using p5.js
function initFloatingShapes() {
    const shapesContainer = document.getElementById('floating-shapes');
    if (!shapesContainer) return;
    
    // Create p5.js sketch for floating psychology symbols
    const sketch = (p) => {
        let particles = [];
        const numParticles = 15;
        
        p.setup = () => {
            const canvas = p.createCanvas(shapesContainer.offsetWidth, shapesContainer.offsetHeight);
            canvas.parent(shapesContainer);
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    size: p.random(20, 40),
                    speedX: p.random(-0.5, 0.5),
                    speedY: p.random(-0.5, 0.5),
                    opacity: p.random(0.1, 0.3),
                    symbol: p.random(['🧠', '⚡', '🎯', '💭', '📚', '🔬'])
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around edges
                if (particle.x > p.width + particle.size) particle.x = -particle.size;
                if (particle.x < -particle.size) particle.x = p.width + particle.size;
                if (particle.y > p.height + particle.size) particle.y = -particle.size;
                if (particle.y < -particle.size) particle.y = p.height + particle.size;
                
                // Draw particle
                p.fill(255, 255, 255, particle.opacity * 255);
                p.noStroke();
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(particle.size);
                p.text(particle.symbol, particle.x, particle.y);
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(shapesContainer.offsetWidth, shapesContainer.offsetHeight);
        };
    };
    
    new p5(sketch);
}

// Smooth scroll functionality
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-yellow-600');
        link.classList.add('text-gray-700');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-yellow-600');
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-triggered animations for cards
function initCardAnimations() {
    const cards = document.querySelectorAll('.card-hover');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => cardObserver.observe(card));
}

// Initialize card animations
document.addEventListener('DOMContentLoaded', initCardAnimations);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate layouts if needed
    const event = new Event('resize');
    window.dispatchEvent(event);
}, 250));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero-bg .reveal');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 200);
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}