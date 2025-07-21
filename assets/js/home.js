document.addEventListener("DOMContentLoaded", function () {
  // Wait for GSAP to load
  if (typeof gsap !== "undefined") {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Start animations immediately
    initMainAnimations();

    function initMainAnimations() {
      // FLOATING ELEMENTS ANIMATION
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-15, 15)",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // PARALLAX BACKGROUND
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // STATS COUNTER ANIMATION
      const statItems = document.querySelectorAll(".stat-item");
      statItems.forEach((item, index) => {
        const counter = item.querySelector(".counter-number");
        const targetValueRaw = item.dataset.counter || "0";

        // Extract numeric value from string (e.g., "10,000+" -> 10000)
        const numericMatch = targetValueRaw.match(/[\d,]+/);
        const targetValue = numericMatch
          ? parseInt(numericMatch[0].replace(/,/g, ""))
          : 0;
        const hasPlus = targetValueRaw.includes("+");

        // Entrance animation
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.8, rotationY: -45 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Counter animation
        if (counter && targetValue > 0) {
          const originalText = counter.textContent;
          const prefix = originalText.match(/^[^\d]*/)[0]; // Get emoji and any non-digit prefix

          // Set initial state
          counter.innerHTML = prefix + "0";

          gsap.fromTo(
            counter,
            { innerHTML: prefix + "0" },
            {
              innerHTML: prefix + targetValueRaw,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                const progress = this.progress();
                const currentValue = Math.ceil(targetValue * progress);

                // Format number with commas if original had them
                let formattedValue = currentValue.toLocaleString();
                if (hasPlus && progress > 0.9) {
                  formattedValue += "+";
                }

                counter.innerHTML = prefix + formattedValue;
              },
            }
          );
        }
      });

      // CARDS ANIMATION WITH 3D EFFECTS
      const cards = document.querySelectorAll(".info-card");
      cards.forEach((card, index) => {
        // Entrance animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotationX: 45,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Card content stagger animation
        const cardTitle = card.querySelector(".card-title");
        const cardParagraphs = card.querySelectorAll(
          ".card-content p, .value-item"
        );
        const cardButton = card.querySelector(".card-button");

        if (cardTitle) {
          gsap.fromTo(
            cardTitle,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (cardParagraphs.length > 0) {
          gsap.fromTo(
            cardParagraphs,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.1,
              delay: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (cardButton) {
          gsap.fromTo(
            cardButton,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 3D tilt effect on hover - DISABLED
        /*
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });
        */
      });

      // SMOOTH SCROLLING FOR BETTER PERFORMANCE
      gsap.config({
        force3D: true,
        nullTargetWarn: false,
      });

      // Advanced GSAP animations initialized
      // console.log("🎉 Advanced GSAP animations initialized!"); // Removed for production
    }
  } else {
    console.warn("GSAP not loaded, falling back to CSS animations");

    // Fallback CSS animations for when GSAP is not available
    document
      .querySelectorAll(".hero-title, .hero-subtitle, .hero-buttons")
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
  }
});
