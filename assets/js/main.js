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
    
    // Add scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', utils.throttle(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }, 100));
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
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