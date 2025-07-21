// ========================================
// ACTIVITIES PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get activity cards
    const activityCards = document.querySelectorAll('.activity-card');
    
    // IMMEDIATE FIX: Ensure activity cards are visible
    activityCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Activity filtering (only if filter buttons exist)
    const activityFilters = document.querySelectorAll('.activity-filter .filter-btn');
    
    if (activityFilters.length > 0) {
        activityFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                activityFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                const filterValue = this.dataset.filter;
                
                // Filter activity cards
                activityCards.forEach(card => {
                    const category = card.dataset.category || '';
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        
                        // Animate card appearance
                        if (typeof gsap !== 'undefined') {
                            gsap.from(card, {
                                duration: 0.5,
                                scale: 0.9,
                                opacity: 0,
                                ease: 'back.out(1.7)'
                            });
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Activity card interactions (only if interactive elements exist)
    activityCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.learn-more-btn');
        const registerBtn = card.querySelector('.register-btn');
        
        // Learn more functionality
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const activityId = card.dataset.activityId;
                showActivityDetails(activityId);
            });
        }
        
        // Registration functionality
        if (registerBtn) {
            registerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const activityId = card.dataset.activityId;
                openRegistrationModal(activityId);
            });
        }
        
        // Add basic hover effect for all activity cards
        card.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: -10,
                    scale: 1.02,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Show activity details
    function showActivityDetails(activityId) {
        const activityData = getActivityData(activityId);
        
        if (activityData) {
            createActivityModal(activityData);
        }
    }

    // Get activity data (placeholder)
    function getActivityData(activityId) {
        const activityDatabase = {
            'activity1': {
                title: 'Weekend Animal Care',
                description: 'Join us for hands-on animal care every weekend...',
                date: '2025-07-26',
                time: '9:00 AM - 5:00 PM',
                location: 'Sonadi Animal Shelter',
                requirements: ['Age 16+', 'Basic animal handling knowledge'],
                capacity: 20,
                registered: 15
            },
            // Add more activities as needed
        };
        
        return activityDatabase[activityId] || null;
    }

    // Create activity modal
    function createActivityModal(activityData) {
        const modalHTML = `
            <div class="modal fade" id="activityModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${activityData.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="activity-details">
                                <p class="lead">${activityData.description}</p>
                                <div class="row">
                                    <div class="col-md-6">
                                        <h6>Date & Time</h6>
                                        <p><i class="fas fa-calendar me-2"></i>${activityData.date}</p>
                                        <p><i class="fas fa-clock me-2"></i>${activityData.time}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <h6>Location</h6>
                                        <p><i class="fas fa-map-marker-alt me-2"></i>${activityData.location}</p>
                                        <h6>Capacity</h6>
                                        <p>${activityData.registered}/${activityData.capacity} registered</p>
                                    </div>
                                </div>
                                <div class="requirements">
                                    <h6>Requirements</h6>
                                    <ul>
                                        ${activityData.requirements.map(req => `<li>${req}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="openRegistrationModal('${activityData.id}')">Register Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('activityModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to DOM and show
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = new bootstrap.Modal(document.getElementById('activityModal'));
        modal.show();
        
        // Clean up when modal is hidden
        document.getElementById('activityModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    // Open registration modal
    window.openRegistrationModal = function(activityId) {
        const registrationHTML = `
            <div class="modal fade" id="registrationModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Activity Registration</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="activityRegistrationForm">
                                <input type="hidden" name="activityId" value="${activityId}">
                                <div class="mb-3">
                                    <label for="participantName" class="form-label">Full Name *</label>
                                    <input type="text" class="form-control" id="participantName" name="name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="participantEmail" class="form-label">Email *</label>
                                    <input type="email" class="form-control" id="participantEmail" name="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="participantPhone" class="form-label">Phone Number *</label>
                                    <input type="tel" class="form-control" id="participantPhone" name="phone" required>
                                </div>
                                <div class="mb-3">
                                    <label for="participantAge" class="form-label">Age *</label>
                                    <input type="number" class="form-control" id="participantAge" name="age" min="16" required>
                                </div>
                                <div class="mb-3">
                                    <label for="experience" class="form-label">Previous Experience</label>
                                    <textarea class="form-control" id="experience" name="experience" rows="3" placeholder="Tell us about any previous experience with animals..."></textarea>
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="agreementCheck" required>
                                    <label class="form-check-label" for="agreementCheck">
                                        I agree to the terms and conditions and understand the activity requirements.
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" form="activityRegistrationForm" class="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Close activity modal if open
        const activityModal = document.getElementById('activityModal');
        if (activityModal) {
            bootstrap.Modal.getInstance(activityModal).hide();
        }
        
        // Add registration modal to DOM
        document.body.insertAdjacentHTML('beforeend', registrationHTML);
        const modal = new bootstrap.Modal(document.getElementById('registrationModal'));
        modal.show();
        
        // Handle form submission
        document.getElementById('activityRegistrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (formValidation.validateForm(this)) {
                submitActivityRegistration(this);
            }
        });
        
        // Clean up when modal is hidden
        document.getElementById('registrationModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    };

    // Submit activity registration
    function submitActivityRegistration(form) {
        const submitBtn = form.closest('.modal').querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registering...';
        submitBtn.disabled = true;
        
        // Simulate registration submission
        setTimeout(() => {
            showNotification('Registration successful! You will receive a confirmation email shortly.', 'success');
            
            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('registrationModal')).hide();
        }, 2000);
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

    // Activities calendar integration
    const calendarView = document.querySelector('.activities-calendar');
    if (calendarView) {
        // Initialize calendar view
        initActivitiesCalendar();
    }

    function initActivitiesCalendar() {
        // Calendar implementation would go here
        // console.log('Activities calendar initialized'); // Removed for production
    }

    // Activities page animations - FAST VERSION
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate activity cards - much faster
        gsap.from('.activity-card', {
            scrollTrigger: {
                trigger: '.activities-wrapper',
                start: 'top 90%'
            },
            duration: 0.2,
            y: 20,
            opacity: 0,
            stagger: 0.05,
            ease: 'power2.out'
        });

        // Animate filter buttons (only if they exist) - faster
        const filterButtons = document.querySelectorAll('.activity-filter .filter-btn');
        if (filterButtons.length > 0) {
            gsap.from('.activity-filter .filter-btn', {
                scrollTrigger: {
                    trigger: '.activity-filter',
                    start: 'top 95%'
                },
                duration: 0.2,
                y: 10,
                opacity: 0,
                stagger: 0.03,
                ease: 'power2.out'
            });
        }

        // Animate upcoming events (only if they exist) - faster
        const upcomingEvents = document.querySelectorAll('.upcoming-event');
        if (upcomingEvents.length > 0) {
            gsap.from('.upcoming-event', {
                scrollTrigger: {
                    trigger: '.upcoming-events',
                    start: 'top 90%'
                },
                duration: 0.3,
                x: -20,
                opacity: 0,
                stagger: 0.05,
                ease: 'power2.out'
            });
        }
    } else {
        // Fallback: Ensure cards are visible if GSAP fails - faster
        activityCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 30);
        });
    }
    
    // Additional fallback: Force visibility after 1 second (faster)
    setTimeout(() => {
        activityCards.forEach(card => {
            card.style.opacity = '1';
            card.style.display = 'block';
            card.style.transform = 'none';
        });
    }, 1000);
});
