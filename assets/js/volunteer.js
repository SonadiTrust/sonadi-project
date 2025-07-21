// ========================================
// VOLUNTEER PAGE FUNCTIONALITY - AUTO-ONLY VERSION
// ========================================

console.log('🎬 Volunteer JS loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded');
    
    // Find slideshow elements
    const slideshow = document.querySelector('.slideshow');
    const slides = document.querySelectorAll('.slide');
    
    console.log('🔍 Found slideshow:', slideshow);
    console.log('🔍 Found slides:', slides.length);
    
    if (!slideshow || slides.length === 0) {
        console.log('❌ No slideshow or slides found');
        return;
    }
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    // Simple function to show a specific slide
    function showSlide(index) {
        console.log('🎯 Showing slide:', index);
        
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Show the target slide
        slides[index].style.display = 'block';
        slides[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Start auto-play only
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
        console.log('▶️ Auto-play started');
    }
    
    // Initialize everything
    function init() {
        console.log('🔧 Initializing auto-only slideshow...');
        
        // Show first slide
        showSlide(0);
        
        // Start auto-play if more than 1 slide
        if (slides.length > 1) {
            startAutoPlay();
        }
        
        console.log('✅ Auto-only slideshow initialized!');
    }
    
    // Start initialization
    init();
});
