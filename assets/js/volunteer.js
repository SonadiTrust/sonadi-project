// ========================================
// VOLUNTEER PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Volunteer application form
    const volunteerForm = document.getElementById('volunteerForm');
    const skillsCheckboxes = document.querySelectorAll('input[name="skills"]');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]');
    
    // Handle volunteer form submission
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            if (formValidation.validateForm(volunteerForm)) {
                // Check if at least one skill is selected
                const selectedSkills = Array.from(skillsCheckboxes).filter(cb => cb.checked);
                if (selectedSkills.length === 0) {
                    showNotification('Please select at least one skill or area of interest', 'warning');
                    return;
                }
                
                // Check if at least one availability slot is selected
                const selectedAvailability = Array.from(availabilityCheckboxes).filter(cb => cb.checked);
                if (selectedAvailability.length === 0) {
                    showNotification('Please select at least one availability slot', 'warning');
                    return;
                }
                
                submitVolunteerApplication(volunteerForm);
            }
        });
    }

    // Submit volunteer application
    function submitVolunteerApplication(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Thank you for your interest in volunteering! We will contact you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Volunteer opportunity cards interaction
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    opportunityCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.learn-more-btn');
        const detailsSection = card.querySelector('.opportunity-details');
        
        if (learnMoreBtn && detailsSection) {
            learnMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle details visibility
                const isVisible = detailsSection.style.display !== 'none';
                detailsSection.style.display = isVisible ? 'none' : 'block';
                
                // Update button text
                this.textContent = isVisible ? 'Learn More' : 'Show Less';
                
                // Animate the transition
                if (typeof gsap !== 'undefined') {
                    if (!isVisible) {
                        gsap.from(detailsSection, {
                            duration: 0.5,
                            height: 0,
                            opacity: 0,
                            ease: 'power2.out'
                        });
                    }
                }
            });
        }
    });

    // Skills filter functionality
    const skillsFilter = document.querySelector('.skills-filter');
    if (skillsFilter) {
        const filterButtons = skillsFilter.querySelectorAll('.filter-btn');
        const opportunityCards = document.querySelectorAll('.opportunity-card');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.dataset.filter;
                
                // Filter opportunities
                opportunityCards.forEach(card => {
                    const cardSkills = card.dataset.skills || '';
                    
                    if (filterValue === 'all' || cardSkills.includes(filterValue)) {
                        card.style.display = 'block';
                        
                        // Animate card appearance
                        if (typeof gsap !== 'undefined') {
                            gsap.from(card, {
                                duration: 0.5,
                                scale: 0.9,
                                opacity: 0,
                                ease: 'power2.out'
                            });
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Volunteer testimonials carousel
    const testimonialsCarousel = document.querySelector('.volunteer-testimonials');
    if (testimonialsCarousel) {
        let currentTestimonial = 0;
        const testimonials = testimonialsCarousel.querySelectorAll('.testimonial-item');
        const totalTestimonials = testimonials.length;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
        }
        
        // Auto-rotate testimonials
        if (totalTestimonials > 1) {
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                showTestimonial(currentTestimonial);
            }, 5000);
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 350px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Volunteer page animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate volunteer opportunities
        gsap.from('.opportunity-card', {
            scrollTrigger: {
                trigger: '.volunteer-opportunities',
                start: 'top 80%'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out'
        });

        // Animate volunteer form
        gsap.from('.volunteer-form', {
            scrollTrigger: {
                trigger: '.volunteer-form',
                start: 'top 80%'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });

        // Animate benefits section
        gsap.from('.volunteer-benefit', {
            scrollTrigger: {
                trigger: '.volunteer-benefits',
                start: 'top 80%'
            },
            duration: 0.6,
            scale: 0.9,
            opacity: 0,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        });

        // Animate testimonials
        gsap.from('.volunteer-testimonials', {
            scrollTrigger: {
                trigger: '.volunteer-testimonials',
                start: 'top 80%'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    }
});
