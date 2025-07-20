// ========================================
// TEAM PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get team cards
    const teamCards = document.querySelectorAll('.team-card, .team .card');
    
    // IMMEDIATE FIX: Make team cards visible right away
    teamCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Team member card interactions
    teamCards.forEach(card => {
        // Team member modal functionality
        const viewProfileBtn = card.querySelector('.view-profile-btn');
        if (viewProfileBtn) {
            viewProfileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const memberId = this.dataset.member;
                openMemberModal(memberId);
            });
        }

        // Social media links interaction
        const socialLinks = card.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click event
            });
        });

        // Card hover effects (enhanced)
        card.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: -10,
                    scale: 1.03,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    ease: 'power2.out'
                });
                
                // Animate social links
                const socialLinks = this.querySelectorAll('.social-link');
                gsap.to(socialLinks, {
                    duration: 0.2,
                    scale: 1.1,
                    stagger: 0.05,
                    ease: 'back.out(1.7)'
                });
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
                
                // Reset social links
                const socialLinks = this.querySelectorAll('.social-link');
                gsap.to(socialLinks, {
                    duration: 0.2,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Team member modal
    function openMemberModal(memberId) {
        // This would typically fetch member details from server
        const memberData = getMemberData(memberId);
        
        if (memberData) {
            createMemberModal(memberData);
        }
    }

    // Get member data (placeholder - replace with actual data fetching)
    function getMemberData(memberId) {
        const memberDatabase = {
            'member1': {
                name: 'Dr. Sarah Johnson',
                role: 'Veterinarian',
                bio: 'Dr. Johnson has been caring for animals for over 15 years...',
                experience: '15+ years',
                specialization: 'Small Animal Care',
                education: 'DVM from University of Veterinary Medicine',
                image: '/assets/img/member1.jpg'
            },
            // Add more members as needed
        };
        
        return memberDatabase[memberId] || null;
    }

    // Create member modal
    function createMemberModal(memberData) {
        const modalHTML = `
            <div class="modal fade" id="memberModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${memberData.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="${memberData.image}" alt="${memberData.name}" class="img-fluid rounded">
                                </div>
                                <div class="col-md-8">
                                    <h6 class="text-primary">${memberData.role}</h6>
                                    <p>${memberData.bio}</p>
                                    <div class="member-details">
                                        <p><strong>Experience:</strong> ${memberData.experience}</p>
                                        <p><strong>Specialization:</strong> ${memberData.specialization}</p>
                                        <p><strong>Education:</strong> ${memberData.education}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('memberModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('memberModal'));
        modal.show();
        
        // Clean up when modal is hidden
        document.getElementById('memberModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    // Team statistics counter
    const teamStats = document.querySelectorAll('.team-stat-number');
    teamStats.forEach(stat => {
        const target = parseInt(stat.dataset.count || stat.textContent);
        
        if (typeof gsap !== 'undefined') {
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%'
                },
                duration: 2,
                textContent: 0,
                snap: { textContent: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                    stat.textContent = Math.ceil(this.targets()[0].textContent);
                }
            });
        }
    });

    // Team filter functionality
    const teamFilter = document.querySelector('.team-filter');
    if (teamFilter) {
        const filterButtons = teamFilter.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.dataset.filter;
                
                // Filter team members
                teamCards.forEach(card => {
                    const memberRole = card.dataset.role || '';
                    const memberDepartment = card.dataset.department || '';
                    
                    if (filterValue === 'all' || 
                        memberRole.includes(filterValue) || 
                        memberDepartment.includes(filterValue)) {
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

    // Team page animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Team cards entrance animation with enhanced stagger
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -20% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
                    // Stagger the animation for each card
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150); // 150ms delay between each card
                }
            });
        }, observerOptions);

        teamCards.forEach(card => {
            observer.observe(card);
        });

        // Animate team statistics
        gsap.from('.team-stat', {
            scrollTrigger: {
                trigger: '.team-statistics',
                start: 'top 80%'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out'
        });

        // Animate team introduction
        gsap.from('.team-intro', {
            scrollTrigger: {
                trigger: '.team-intro',
                start: 'top 80%'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    } else {
        // Fallback for when GSAP is not available - just add the animate-in class immediately
        teamCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 150);
        });
    }

    // Team member search functionality
    const teamSearch = document.getElementById('teamSearch');
    if (teamSearch) {
        teamSearch.addEventListener('input', utils.debounce(function() {
            const searchTerm = this.value.toLowerCase();
            
            teamCards.forEach(card => {
                const memberName = card.querySelector('.member-name')?.textContent.toLowerCase() || '';
                const memberRole = card.querySelector('.member-role')?.textContent.toLowerCase() || '';
                const memberBio = card.querySelector('.member-bio')?.textContent.toLowerCase() || '';
                
                if (memberName.includes(searchTerm) || 
                    memberRole.includes(searchTerm) || 
                    memberBio.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300));
    }

    // Fallback: Ensure team cards are visible even if animations fail
    setTimeout(() => {
        teamCards.forEach(card => {
            if (!card.classList.contains('animate-in')) {
                card.classList.add('animate-in');
            }
        });
    }, 2000); // 2 second fallback
});
