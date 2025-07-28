// ========================================
// FOUNDERS PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Founder profile interactions
    const founderCards = document.querySelectorAll('.founder-card');
    
    founderCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        const shortBio = card.querySelector('.bio-short');
        const fullBio = card.querySelector('.bio-full');
        
        // Read more/less functionality
        if (readMoreBtn && shortBio && fullBio) {
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const isExpanded = fullBio.style.display !== 'none';
                
                if (isExpanded) {
                    fullBio.style.display = 'none';
                    shortBio.style.display = 'block';
                    this.textContent = 'Read More';
                } else {
                    fullBio.style.display = 'block';
                    shortBio.style.display = 'none';
                    this.textContent = 'Read Less';
                    
                    // Animate expansion
                    if (typeof gsap !== 'undefined') {
                        gsap.from(fullBio, {
                            duration: 0.5,
                            height: 0,
                            opacity: 0,
                            ease: 'power2.out'
                        });
                    }
                }
            });
        }

        // Enhanced card hover effects
        card.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: -15,
                    scale: 1.02,
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                    ease: 'power2.out'
                });
                
                // Animate founder image
                const founderImage = this.querySelector('.founder-image');
                if (founderImage) {
                    gsap.to(founderImage, {
                        duration: 0.3,
                        scale: 1.05,
                        ease: 'power2.out'
                    });
                }
            }
        });

        card.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                    ease: 'power2.out'
                });
                
                // Reset founder image
                const founderImage = this.querySelector('.founder-image');
                if (founderImage) {
                    gsap.to(founderImage, {
                        duration: 0.3,
                        scale: 1,
                        ease: 'power2.out'
                    });
                }
            }
        });
    });

    // Founder contact functionality
    const contactButtons = document.querySelectorAll('.contact-founder-btn');
    contactButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const founderId = this.dataset.founderId;
            openFounderContactModal(founderId);
        });
    });

    // Open founder contact modal
    function openFounderContactModal(founderId) {
        const founderData = getFounderData(founderId);
        
        if (founderData) {
            createFounderContactModal(founderData);
        }
    }

    // Get founder data (placeholder)
    function getFounderData(founderId) {
        const founderDatabase = {
            'founder1': {
                name: 'Jane Smith',
                role: 'Co-Founder & CEO',
                email: 'jane@sonadi.org',
                specialties: ['Animal Welfare', 'Non-profit Management', 'Community Outreach']
            },
            'founder2': {
                name: 'John Doe',
                role: 'Co-Founder & Director',
                email: 'john@sonadi.org',
                specialties: ['Veterinary Care', 'Animal Rescue', 'Education']
            }
        };
        
        return founderDatabase[founderId] || null;
    }

    // Create founder contact modal
    function createFounderContactModal(founderData) {
        const modalHTML = `
            <div class="modal fade" id="founderContactModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Contact ${founderData.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="founder-contact-info mb-3">
                                <p class="text-muted">${founderData.role}</p>
                                <p><strong>Email:</strong> <a href="mailto:${founderData.email}">${founderData.email}</a></p>
                                <p><strong>Specialties:</strong> ${founderData.specialties.join(', ')}</p>
                            </div>
                            
                            <form id="founderContactForm">
                                <input type="hidden" name="founderId" value="${founderData.id}">
                                <div class="mb-3">
                                    <label for="senderName" class="form-label">Your Name *</label>
                                    <input type="text" class="form-control" id="senderName" name="name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="senderEmail" class="form-label">Your Email *</label>
                                    <input type="email" class="form-control" id="senderEmail" name="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="messageSubject" class="form-label">Subject *</label>
                                    <input type="text" class="form-control" id="messageSubject" name="subject" required>
                                </div>
                                <div class="mb-3">
                                    <label for="messageContent" class="form-label">Message *</label>
                                    <textarea class="form-control" id="messageContent" name="message" rows="4" required placeholder="Write your message to ${founderData.name}..."></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" form="founderContactForm" class="btn btn-primary">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('founderContactModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = new bootstrap.Modal(document.getElementById('founderContactModal'));
        modal.show();
        
        // Handle form submission
        document.getElementById('founderContactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (formValidation.validateForm(this)) {
                submitFounderMessage(this);
            }
        });
        
        // Clean up when modal is hidden
        document.getElementById('founderContactModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    // Submit founder message
    function submitFounderMessage(form) {
        const submitBtn = form.closest('.modal').querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        submitBtn.disabled = true;
        
        // Simulate message submission
        setTimeout(() => {
            showNotification('Message sent successfully! The founder will get back to you soon.', 'success');
            
            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('founderContactModal')).hide();
        }, 2000);
    }

    // Founder timeline interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // Animate content reveal
            const content = this.querySelector('.timeline-content');
            if (content && typeof gsap !== 'undefined') {
                if (this.classList.contains('active')) {
                    gsap.from(content, {
                        duration: 0.5,
                        height: 0,
                        opacity: 0,
                        ease: 'power2.out'
                    });
                }
            }
        });
    });

    // Mission statement reveal
    const missionText = document.querySelector('.mission-text');
    if (missionText) {
        const revealBtn = document.querySelector('.reveal-mission-btn');
        
        if (revealBtn) {
            revealBtn.addEventListener('click', function() {
                missionText.classList.toggle('revealed');
                this.textContent = missionText.classList.contains('revealed') ? 'Hide Mission' : 'Our Mission';
                
                if (typeof gsap !== 'undefined' && missionText.classList.contains('revealed')) {
                    gsap.from(missionText, {
                        duration: 1,
                        y: 30,
                        opacity: 0,
                        ease: 'power2.out'
                    });
                }
            });
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 350px;';
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

    // Founders page animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate founder cards
        gsap.from('.founder-card', {
            scrollTrigger: {
                trigger: '.founders-section',
                start: 'top 80%'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: 'power2.out'
        });

        // Animate timeline
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '.founders-timeline',
                start: 'top 80%'
            },
            duration: 0.6,
            x: -50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out'
        });

        // Animate mission section
        gsap.from('.mission-section', {
            scrollTrigger: {
                trigger: '.mission-section',
                start: 'top 80%'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });

        // Animate founder quotes
        gsap.from('.founder-quote', {
            scrollTrigger: {
                trigger: '.founder-quotes',
                start: 'top 80%'
            },
            duration: 0.8,
            scale: 0.95,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });
    }
});
