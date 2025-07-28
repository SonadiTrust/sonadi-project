// ========================================
// ADOPT-A-DOG PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Dog adoption cards
    const dogCards = document.querySelectorAll('.dog-card');
    const adoptionFilters = document.querySelectorAll('.adoption-filter .filter-btn');
    
    // Filter functionality
    adoptionFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            adoptionFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Filter dog cards
            dogCards.forEach(card => {
                const dogAge = card.dataset.age || '';
                const dogSize = card.dataset.size || '';
                const dogBreed = card.dataset.breed || '';
                const dogGender = card.dataset.gender || '';
                
                let shouldShow = filterValue === 'all';
                
                if (!shouldShow) {
                    shouldShow = dogAge === filterValue || 
                                dogSize === filterValue || 
                                dogBreed.toLowerCase().includes(filterValue.toLowerCase()) ||
                                dogGender === filterValue;
                }
                
                if (shouldShow) {
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

    // Dog card interactions
    dogCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        const adoptBtn = card.querySelector('.adopt-btn');
        const favoriteBtn = card.querySelector('.favorite-btn');
        
        // View details functionality
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const dogId = card.dataset.dogId;
                showDogDetails(dogId);
            });
        }
        
        // Adoption button functionality
        if (adoptBtn) {
            adoptBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const dogId = card.dataset.dogId;
                openAdoptionForm(dogId);
            });
        }
        
        // Favorite button functionality
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(this, card.dataset.dogId);
            });
        }
    });

    // Show dog details
    function showDogDetails(dogId) {
        const dogData = getDogData(dogId);
        
        if (dogData) {
            createDogModal(dogData);
        }
    }

    // Get dog data (placeholder)
    function getDogData(dogId) {
        const dogDatabase = {
            'dog1': {
                name: 'Max',
                breed: 'Golden Retriever',
                age: '3 years',
                gender: 'Male',
                size: 'Large',
                weight: '65 lbs',
                color: 'Golden',
                personality: ['Friendly', 'Energetic', 'Good with kids'],
                medicalInfo: 'Fully vaccinated, neutered',
                story: 'Max was rescued from a shelter and is looking for a loving home...',
                images: ['/assets/img/dog1.jpg', '/assets/img/dog1-2.jpg'],
                adoptionFee: '$250'
            },
            // Add more dogs as needed
        };
        
        return dogDatabase[dogId] || null;
    }

    // Create dog details modal
    function createDogModal(dogData) {
        const modalHTML = `
            <div class="modal fade" id="dogModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Meet ${dogData.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="dog-images">
                                        <img src="${dogData.images[0]}" alt="${dogData.name}" class="img-fluid rounded mb-3">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="dog-info">
                                        <h6>Basic Information</h6>
                                        <ul class="list-unstyled">
                                            <li><strong>Breed:</strong> ${dogData.breed}</li>
                                            <li><strong>Age:</strong> ${dogData.age}</li>
                                            <li><strong>Gender:</strong> ${dogData.gender}</li>
                                            <li><strong>Size:</strong> ${dogData.size}</li>
                                            <li><strong>Weight:</strong> ${dogData.weight}</li>
                                            <li><strong>Color:</strong> ${dogData.color}</li>
                                        </ul>
                                        
                                        <h6>Personality</h6>
                                        <div class="personality-tags mb-3">
                                            ${dogData.personality.map(trait => `<span class="badge bg-primary me-1">${trait}</span>`).join('')}
                                        </div>
                                        
                                        <h6>Medical Information</h6>
                                        <p>${dogData.medicalInfo}</p>
                                        
                                        <div class="adoption-fee">
                                            <h6>Adoption Fee: <span class="text-primary">${dogData.adoptionFee}</span></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                    <h6>${dogData.name}'s Story</h6>
                                    <p>${dogData.story}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="openAdoptionForm('${dogData.id}')">Start Adoption Process</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('dogModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to DOM and show
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = new bootstrap.Modal(document.getElementById('dogModal'));
        modal.show();
        
        // Clean up when modal is hidden
        document.getElementById('dogModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    // Open adoption form
    window.openAdoptionForm = function(dogId) {
        const adoptionHTML = `
            <div class="modal fade" id="adoptionModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Adoption Application</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="adoptionForm">
                                <input type="hidden" name="dogId" value="${dogId}">
                                
                                <h6>Personal Information</h6>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="applicantName" class="form-label">Full Name *</label>
                                        <input type="text" class="form-control" id="applicantName" name="name" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="applicantEmail" class="form-label">Email *</label>
                                        <input type="email" class="form-control" id="applicantEmail" name="email" required>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="applicantPhone" class="form-label">Phone Number *</label>
                                        <input type="tel" class="form-control" id="applicantPhone" name="phone" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="applicantAge" class="form-label">Age *</label>
                                        <input type="number" class="form-control" id="applicantAge" name="age" min="18" required>
                                    </div>
                                </div>
                                
                                <h6 class="mt-4">Housing Information</h6>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="housingType" class="form-label">Housing Type *</label>
                                        <select class="form-control" id="housingType" name="housingType" required>
                                            <option value="">Select...</option>
                                            <option value="house">House</option>
                                            <option value="apartment">Apartment</option>
                                            <option value="condo">Condo</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="hasYard" class="form-label">Do you have a yard? *</label>
                                        <select class="form-control" id="hasYard" name="hasYard" required>
                                            <option value="">Select...</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <h6 class="mt-4">Experience</h6>
                                <div class="mb-3">
                                    <label for="petExperience" class="form-label">Previous Pet Experience</label>
                                    <textarea class="form-control" id="petExperience" name="experience" rows="3" placeholder="Tell us about your experience with pets..."></textarea>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="whyAdopt" class="form-label">Why do you want to adopt this dog? *</label>
                                    <textarea class="form-control" id="whyAdopt" name="reason" rows="3" required></textarea>
                                </div>
                                
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="agreementCheck" required>
                                    <label class="form-check-label" for="agreementCheck">
                                        I agree to the adoption terms and conditions and understand that this application will be reviewed.
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" form="adoptionForm" class="btn btn-primary">Submit Application</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Close dog modal if open
        const dogModal = document.getElementById('dogModal');
        if (dogModal) {
            bootstrap.Modal.getInstance(dogModal).hide();
        }
        
        // Add adoption modal to DOM
        document.body.insertAdjacentHTML('beforeend', adoptionHTML);
        const modal = new bootstrap.Modal(document.getElementById('adoptionModal'));
        modal.show();
        
        // Handle form submission
        document.getElementById('adoptionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (formValidation.validateForm(this)) {
                submitAdoptionApplication(this);
            }
        });
        
        // Clean up when modal is hidden
        document.getElementById('adoptionModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    };

    // Submit adoption application
    function submitAdoptionApplication(form) {
        const submitBtn = form.closest('.modal').querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
        submitBtn.disabled = true;
        
        // Simulate application submission
        setTimeout(() => {
            showNotification('Application submitted successfully! We will review your application and contact you soon.', 'success');
            
            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('adoptionModal')).hide();
        }, 2000);
    }

    // Toggle favorite
    function toggleFavorite(btn, dogId) {
        const isFavorited = btn.classList.contains('favorited');
        
        if (isFavorited) {
            btn.classList.remove('favorited');
            btn.innerHTML = '<i class="far fa-heart"></i>';
            // Remove from favorites
            removeFavorite(dogId);
        } else {
            btn.classList.add('favorited');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            // Add to favorites
            addFavorite(dogId);
        }
        
        // Animate the heart
        if (typeof gsap !== 'undefined') {
            gsap.from(btn, {
                duration: 0.3,
                scale: 1.3,
                ease: 'back.out(1.7)'
            });
        }
    }

    // Add to favorites
    function addFavorite(dogId) {
        let favorites = JSON.parse(localStorage.getItem('favoriteDogs') || '[]');
        if (!favorites.includes(dogId)) {
            favorites.push(dogId);
            localStorage.setItem('favoriteDogs', JSON.stringify(favorites));
        }
    }

    // Remove from favorites
    function removeFavorite(dogId) {
        let favorites = JSON.parse(localStorage.getItem('favoriteDogs') || '[]');
        favorites = favorites.filter(id => id !== dogId);
        localStorage.setItem('favoriteDogs', JSON.stringify(favorites));
    }

    // Load favorites on page load
    function loadFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favoriteDogs') || '[]');
        favorites.forEach(dogId => {
            const dogCard = document.querySelector(`[data-dog-id="${dogId}"]`);
            if (dogCard) {
                const favoriteBtn = dogCard.querySelector('.favorite-btn');
                if (favoriteBtn) {
                    favoriteBtn.classList.add('favorited');
                    favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
                }
            }
        });
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

    // Adoption page animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate dog cards (only if dogs-grid exists)
        const dogsGrid = document.querySelector('.dogs-grid');
        if (dogsGrid) {
            gsap.from('.dog-card', {
                scrollTrigger: {
                    trigger: '.dogs-grid',
                    start: 'top 80%'
                },
                duration: 0.6,
                y: 50,
                opacity: 0,
                stagger: 0.15,
                ease: 'power2.out'
            });
        }

        // Animate filter buttons (only if they exist)
        const adoptionFilter = document.querySelector('.adoption-filter');
        if (adoptionFilter) {
            gsap.from('.adoption-filter .filter-btn', {
                scrollTrigger: {
                    trigger: '.adoption-filter',
                    start: 'top 90%'
                },
                duration: 0.5,
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    } else {
        // Fallback: Ensure dog cards are visible if GSAP fails
        dogCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Additional fallback: Force visibility after 2 seconds
    setTimeout(() => {
        dogCards.forEach(card => {
            card.style.opacity = '1';
            card.style.display = 'block';
            card.style.transform = 'none';
        });
    }, 2000);

    // Load favorites
    loadFavorites();
});
