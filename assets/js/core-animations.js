// ========================================
// CORE ANIMATIONS MODULE
// ========================================

const CoreAnimations = {
    // Initialize GSAP animations with error handling
    initGSAP() {
        try {
            if (typeof gsap !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger, TextPlugin);
                
                // Initialize common animations
                this.initScrollAnimations();
                this.initStaggerAnimations();
                this.initParallax();
            } else {
                console.warn('GSAP library not loaded - animations disabled');
            }
        } catch (error) {
            console.error('Error initializing GSAP animations:', error);
        }
    },

    // Common scroll-triggered animations
    initScrollAnimations() {
        try {
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
        } catch (error) {
            console.error('Error in scroll animations:', error);
        }
    },

    // Stagger animation for lists
    initStaggerAnimations() {
        const staggerElements = document.querySelectorAll('.stagger-item');
        if (staggerElements.length > 0) {
            gsap.from(staggerElements, {
                scrollTrigger: {
                    trigger: staggerElements[0],
                    start: 'top 80%'
                },
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
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

    // Card hover animations
    initCardAnimations() {
        const cards = document.querySelectorAll('.card:not(.team .card), .team-card, .service-card');
        
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

    // Initialize all core animations
    init() {
        this.initGSAP();
        this.animateCounters();
        this.initCardAnimations();
    }
};
