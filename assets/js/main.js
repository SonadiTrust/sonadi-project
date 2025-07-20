// Utility functions
const utils = {
    // Debounce function to limit how often a function can be called
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function to limit how often a function can be called
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// Form validation
const formValidation = {
    // Validate email format
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate phone number format
    isValidPhone(phone) {
        const re = /^\+?[\d\s-]{10,}$/;
        return re.test(phone);
    },

    // Show error message
    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
        
        if (!formGroup.querySelector('.invalid-feedback')) {
            errorDiv.className = 'invalid-feedback';
            formGroup.appendChild(errorDiv);
        }
        
        input.classList.add('is-invalid');
        errorDiv.textContent = message;
    },

    // Clear error message
    clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.invalid-feedback');
        
        input.classList.remove('is-invalid');
        if (errorDiv) {
            errorDiv.textContent = '';
        }
    }
};

// Image lazy loading
const lazyLoad = {
    init() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    }
};

// Modal functionality
const modal = {
    init() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.dataset.modal;
                const modalElement = document.getElementById(modalId);
                
                if (modalElement) {
                    this.open(modalElement);
                }
            });
        });
        
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.close(e.target);
            }
        });
        
        // Close modal when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    this.close(openModal);
                }
            }
        });
    },
    
    open(modalElement) {
        modalElement.classList.add('show');
        document.body.style.overflow = 'hidden';
    },
    
    close(modalElement) {
        modalElement.classList.remove('show');
        document.body.style.overflow = '';
    }
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading
    lazyLoad.init();
    
    // Initialize modal functionality
    modal.init();
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            utils.smoothScroll(anchor.getAttribute('href'));
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (utils.isInViewport(element)) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', utils.throttle(animateOnScroll, 100));
    
    // Run initial animation check
    animateOnScroll();
}); 

// ========================================
// ADVANCED ANIMATIONS MODULE
// ========================================

const AdvancedAnimations = {
    // Initialize GSAP animations
    initGSAP() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
            
            // Hero section animations
            this.animateHero();
            
            // Card animations
            this.animateCards();
            
            // Text animations
            this.animateText();
            
            // Parallax effects
            this.initParallax();
            
            // Counter animations
            this.animateCounters();
        }
    },

    // Hero section entrance animation
    animateHero() {
        const tl = gsap.timeline();
        
        tl.from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-buttons .btn', {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.3');
    },

    // Card hover and scroll animations
    animateCards() {
        const cards = document.querySelectorAll('.card, .team-card, .service-card');
        
        cards.forEach((card, index) => {
            // Scroll trigger animation
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                delay: index * 0.1,
                ease: 'power2.out'
            });

            // Hover animations
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: -10,
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                    ease: 'power2.out'
                });
            });
        });
    },

    // Text animations
    animateText() {
        // Typewriter effect
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%'
                },
                duration: text.length * 0.05,
                text: {
                    value: text,
                    delimiter: ''
                },
                ease: 'none'
            });
        });

        // Split text animation
        const splitTextElements = document.querySelectorAll('.split-text');
        splitTextElements.forEach(element => {
            const words = element.textContent.split(' ');
            element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
            
            gsap.from(element.querySelectorAll('.word'), {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%'
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            });
        });
    },

    // Parallax effects
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    },

    // Counter animations
    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count || counter.textContent);
            
            gsap.from(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%'
                },
                duration: 2,
                textContent: 0,
                snap: { textContent: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                    counter.textContent = Math.ceil(this.targets()[0].textContent);
                }
            });
        });
    },

    // Stagger animation for lists
    staggerAnimation(selector, delay = 0.1) {
        const elements = document.querySelectorAll(selector);
        
        gsap.from(elements, {
            scrollTrigger: {
                trigger: elements[0],
                start: 'top 80%'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: delay,
            ease: 'power2.out'
        });
    },

    // Page transition animations
    pageTransition() {
        const tl = gsap.timeline();
        
        tl.to('.page-transition', {
            duration: 0.5,
            scaleY: 1,
            transformOrigin: 'bottom',
            ease: 'power2.inOut'
        })
        .to('.page-transition', {
            duration: 0.5,
            scaleY: 0,
            transformOrigin: 'top',
            ease: 'power2.inOut',
            delay: 0.1
        });
    },

    // Scroll-triggered animations
    scrollAnimations() {
        // Fade in elements
        gsap.utils.toArray('.fade-in').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                opacity: 0,
                y: 50,
                ease: 'power2.out'
            });
        });

        // Slide in from left
        gsap.utils.toArray('.slide-left').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                x: -100,
                opacity: 0,
                ease: 'power2.out'
            });
        });

        // Slide in from right
        gsap.utils.toArray('.slide-right').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                x: 100,
                opacity: 0,
                ease: 'power2.out'
            });
        });
    },

    // Initialize all animations
    init() {
        this.initGSAP();
        this.scrollAnimations();
        
        // Animate staggered elements
        this.staggerAnimation('.stagger-item', 0.1);
        
        console.log('Advanced animations initialized');
    }
};

// Initialize advanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure GSAP is loaded
    setTimeout(() => {
        AdvancedAnimations.init();
    }, 100);
});

// CSS Animation helpers
const CSSAnimations = {
    // Add animation class with callback
    animate(element, animationClass, callback) {
        element.classList.add(animationClass);
        
        element.addEventListener('animationend', function handler() {
            element.removeEventListener('animationend', handler);
            element.classList.remove(animationClass);
            if (callback) callback();
        });
    },

    // Animate on scroll using CSS classes
    onScroll() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            if (utils.isInViewport(element) && !element.classList.contains('animated')) {
                const animationClass = element.dataset.animate;
                element.classList.add(animationClass, 'animated');
            }
        });
    },

    // Initialize CSS animations
    init() {
        window.addEventListener('scroll', utils.throttle(this.onScroll.bind(this), 100));
        this.onScroll(); // Run once on load
    }
};

// Initialize CSS animations
document.addEventListener('DOMContentLoaded', function() {
    CSSAnimations.init();
});