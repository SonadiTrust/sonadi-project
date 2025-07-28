// About page scroll animations
document.addEventListener("DOMContentLoaded", function () {
  // Wait for GSAP to load
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Only animate CTA button with special effect - ensure it starts hidden
    gsap.set(".cta-section .btn", {
      opacity: 0,
      y: 50,
      scale: 0.7,
      rotationY: 45,
    });

    gsap.to(".cta-section .btn", {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false, // Set to true for debugging
        onEnter: () => {
          // console.log("CTA button animation triggered!"); // Removed for production
        },
      },
    });

    // Add hover animation to the button
    const ctaButton = document.querySelector(".cta-section .btn");
    if (ctaButton) {
      ctaButton.addEventListener("mouseenter", () => {
        gsap.to(ctaButton, {
          scale: 1.08,
          y: -3,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      ctaButton.addEventListener("mouseleave", () => {
        gsap.to(ctaButton, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    // Refresh ScrollTrigger to ensure proper initialization
    ScrollTrigger.refresh();
    
    // Force a check after a short delay to catch any elements already in view
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

  } else {
    // console.log("GSAP not loaded"); // Removed for production
  }
});
