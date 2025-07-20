// ========================================
// MODAL FUNCTIONALITY
// ========================================

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

        // Close modal when clicking close button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.close(modal);
                }
            }
        });
    },
    
    open(modalElement) {
        modalElement.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on the modal for accessibility
        modalElement.focus();
        
        // Trigger open event
        modalElement.dispatchEvent(new CustomEvent('modal:open'));
    },
    
    close(modalElement) {
        modalElement.classList.remove('show');
        document.body.style.overflow = '';
        
        // Trigger close event
        modalElement.dispatchEvent(new CustomEvent('modal:close'));
    }
};
