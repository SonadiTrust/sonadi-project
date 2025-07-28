// ========================================
// FORM VALIDATION MODULE
// ========================================

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

    // Show error message with error handling
    showError(input, message) {
        try {
            const formGroup = input.closest('.form-group');
            if (!formGroup) {
                console.warn('Form group not found for input:', input);
                return;
            }
            
            const errorDiv = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
            
            if (!formGroup.querySelector('.invalid-feedback')) {
                errorDiv.className = 'invalid-feedback';
                formGroup.appendChild(errorDiv);
            }
            
            input.classList.add('is-invalid');
            errorDiv.textContent = message;
        } catch (error) {
            console.error('Error showing validation message:', error);
        }
    },

    // Clear error message
    clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.invalid-feedback');
        
        input.classList.remove('is-invalid');
        if (errorDiv) {
            errorDiv.textContent = '';
        }
    },

    // Validate form field
    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        const required = input.hasAttribute('required');

        // Clear previous errors
        this.clearError(input);

        // Check if required field is empty
        if (required && !value) {
            this.showError(input, 'This field is required');
            return false;
        }

        // Skip validation if field is empty and not required
        if (!value && !required) {
            return true;
        }

        // Type-specific validation
        switch (type) {
            case 'email':
                if (!this.isValidEmail(value)) {
                    this.showError(input, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'tel':
                if (!this.isValidPhone(value)) {
                    this.showError(input, 'Please enter a valid phone number');
                    return false;
                }
                break;
            case 'text':
                if (input.name === 'name' && value.length < 2) {
                    this.showError(input, 'Name must be at least 2 characters long');
                    return false;
                }
                break;
        }

        return true;
    },

    // Validate entire form
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    },

    // Initialize form validation
    init() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Real-time validation on input
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    if (input.classList.contains('is-invalid')) {
                        this.validateField(input);
                    }
                });
            });

            // Form submission validation
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    
                    // Focus on first invalid field
                    const firstInvalid = form.querySelector('.is-invalid');
                    if (firstInvalid) {
                        firstInvalid.focus();
                    }
                }
            });
        });
    }
};
