// ========================================
// DONATION PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Clear any stuck notifications on page load
    const existingNotifications = document.querySelectorAll('.alert.position-fixed');
    existingNotifications.forEach(notification => notification.remove());
    
    // Donation amount selection
    const donationAmounts = document.querySelectorAll('.donation-amount');
    const customAmountInput = document.getElementById('customAmount');
    const donationForm = document.getElementById('donationForm');
    
    // Handle preset donation amounts
    donationAmounts.forEach(amount => {
        amount.addEventListener('click', function() {
            // Remove active class from all amounts
            donationAmounts.forEach(a => a.classList.remove('active', 'selected'));
            
            // Add active class to clicked amount
            this.classList.add('active', 'selected');
            
            // Clear custom amount
            if (customAmountInput) {
                customAmountInput.value = '';
            }
            
            // Store selected amount
            const selectedAmount = this.dataset.amount;
            document.getElementById('selectedAmount').value = selectedAmount;
        });
    });

    // Handle custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Remove active class from preset amounts
            donationAmounts.forEach(a => a.classList.remove('active', 'selected'));
            
            // Update selected amount
            document.getElementById('selectedAmount').value = this.value;
        });
    }

    // Donation type selection (one-time vs recurring)
    const donationTypes = document.querySelectorAll('input[name="donationType"]');
    donationTypes.forEach(type => {
        type.addEventListener('change', function() {
            const recurringOptions = document.querySelector('.recurring-options');
            if (recurringOptions) {
                if (this.value === 'recurring') {
                    recurringOptions.style.display = 'block';
                } else {
                    recurringOptions.style.display = 'none';
                }
            }
        });
    });

    // Donation form submission
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedAmount = document.getElementById('selectedAmount')?.value;
            if (!selectedAmount || selectedAmount <= 0) {
                showNotification('Please select a donation amount', 'warning');
                return;
            }
            
            if (typeof formValidation !== 'undefined' && formValidation.validateForm(donationForm)) {
                processDonation(donationForm);
            }
        });
    }

    // Process donation
    function processDonation(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show processing state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        submitBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            showNotification('Thank you for your donation! Redirecting to payment gateway...', 'success');
            
            // Here you would typically redirect to payment processor
            // window.location.href = '/payment-gateway';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Donation impact calculator
    const impactCalculator = document.querySelector('.impact-calculator');
    if (impactCalculator) {
        const amountInput = document.getElementById('selectedAmount');
        const impactDisplay = document.querySelector('.impact-display');
        
        function updateImpact(amount) {
            if (!amount || amount <= 0) {
                impactDisplay.innerHTML = '';
                return;
            }
            
            const impacts = {
                50: 'Feed 5 animals for a week',
                100: 'Provide medical care for 2 animals',
                250: 'Vaccinate 10 animals',
                500: 'Sponsor an animal rescue mission',
                1000: 'Support our shelter for a month'
            };
            
            let impact = '';
            for (const [threshold, description] of Object.entries(impacts)) {
                if (amount >= threshold) {
                    impact = description;
                }
            }
            
            if (impact) {
                impactDisplay.innerHTML = `<div class="alert alert-info"><i class="fas fa-heart me-2"></i>${impact}</div>`;
            }
        }
        
        // Update impact when amount changes
        document.addEventListener('change', function(e) {
            if (e.target.id === 'selectedAmount' || e.target.classList.contains('donation-amount')) {
                const amount = document.getElementById('selectedAmount')?.value;
                if (amount) {
                    updateImpact(amount);
                }
            }
        });
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove any existing notifications first
        const existingNotifications = document.querySelectorAll('.alert.position-fixed');
        existingNotifications.forEach(notification => notification.remove());
        
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

    // Donation page animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate donation amounts
        gsap.from('.donation-amount', {
            scrollTrigger: {
                trigger: '.donation-amounts',
                start: 'top 80%'
            },
            duration: 0.6,
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });

        // Animate donation form
        gsap.from('.donation-form', {
            scrollTrigger: {
                trigger: '.donation-form',
                start: 'top 80%'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });

        // Animate impact stories
        gsap.from('.impact-story', {
            scrollTrigger: {
                trigger: '.impact-stories',
                start: 'top 80%'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }
});
