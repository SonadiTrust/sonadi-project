// ========================================
// PHOTOS/GALLERY PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Photo gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let galleryImages = [];

    // Initialize gallery
    function initGallery() {
        galleryImages = Array.from(galleryItems).map(item => ({
            src: item.dataset.src || item.querySelector('img').src,
            alt: item.querySelector('img').alt || '',
            caption: item.dataset.caption || ''
        }));
    }

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        const image = galleryImages[index];
        
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        
        // Set caption if exists
        const caption = lightbox.querySelector('.lightbox-caption');
        if (caption) {
            caption.textContent = image.caption;
        }
        
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animate lightbox appearance
        if (typeof gsap !== 'undefined') {
            gsap.from(lightbox, {
                duration: 0.3,
                opacity: 0,
                ease: 'power2.out'
            });
            
            gsap.from(lightboxImg, {
                duration: 0.5,
                scale: 0.9,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
        }
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Show next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }

    // Show previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }

    // Update lightbox image
    function updateLightboxImage() {
        const image = galleryImages[currentImageIndex];
        
        if (typeof gsap !== 'undefined') {
            gsap.to(lightboxImg, {
                duration: 0.2,
                opacity: 0,
                onComplete: () => {
                    lightboxImg.src = image.src;
                    lightboxImg.alt = image.alt;
                    
                    const caption = lightbox.querySelector('.lightbox-caption');
                    if (caption) {
                        caption.textContent = image.caption;
                    }
                    
                    gsap.to(lightboxImg, {
                        duration: 0.3,
                        opacity: 1,
                        ease: 'power2.out'
                    });
                }
            });
        } else {
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
        }
    }

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.dataset.category || '';
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    
                    // Animate item appearance
                    if (typeof gsap !== 'undefined') {
                        gsap.from(item, {
                            duration: 0.5,
                            scale: 0.8,
                            opacity: 0,
                            ease: 'back.out(1.7)'
                        });
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reinitialize gallery with filtered items
            setTimeout(initGallery, 100);
        });
    });

    // Event listeners
    if (galleryItems.length > 0) {
        initGallery();
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        }
    });

    // Close lightbox when clicking on background
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Infinite scroll for gallery (optional)
    function initInfiniteScroll() {
        let page = 1;
        let loading = false;
        
        function loadMoreImages() {
            if (loading) return;
            
            loading = true;
            
            // Simulate loading more images
            setTimeout(() => {
                // Here you would typically fetch more images from the server
                // console.log(`Loading page ${page + 1}`); // Removed for production
                page++;
                loading = false;
            }, 1000);
        }
        
        // Check if we need to load more images
        window.addEventListener('scroll', utils.throttle(() => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
                loadMoreImages();
            }
        }, 200));
    }

    // Photo gallery animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate gallery items
        const galleryTrigger = document.querySelector('.photo-gallery');
        if (galleryTrigger) {
            gsap.from('.gallery-item', {
                scrollTrigger: {
                    trigger: '.photo-gallery',
                    start: 'top 80%'
                },
                duration: 0.6,
                scale: 0.8,
                opacity: 0,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            });
        }

        // Animate filter buttons (only if they exist)
        const filterContainer = document.querySelector('.gallery-filter');
        if (filterContainer) {
            gsap.from('.gallery-filter .filter-btn', {
                scrollTrigger: {
                    trigger: '.gallery-filter',
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
        // Fallback: Ensure gallery items are visible if GSAP fails
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 50);
        });
    }
    
    // Additional fallback: Force visibility after 2 seconds
    setTimeout(() => {
        galleryItems.forEach(item => {
            item.style.opacity = '1';
            item.style.display = 'block';
            item.style.transform = 'none';
        });
    }, 2000);

    // Initialize infinite scroll if needed
    // initInfiniteScroll();
});
