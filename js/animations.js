// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Initialize vertical facilities animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initVerticalTimelineFacilitiesAnimation();

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
});

function initVerticalTimelineFacilitiesAnimation() {
  const bubble = document.getElementById('verticalScrollBubble');
  const section = document.querySelector('.vertical-facilities-section');
  const container = document.getElementById('verticalFacilitiesContainer');
  
  if (!bubble || !section || !container) return;
  
  // Set initial position and show bubble
  gsap.set(bubble, { 
    opacity: 1,
    scale: 0
  });

  // Create the main timeline for bubble movement
  const bubbleTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 60%",
      end: "bottom 40%",
      scrub: 1.2,
      onUpdate: function(self) {
        // Update bubble scale and rotation based on scroll progress
        gsap.to(bubble, {
          scale: 0.7 + (self.progress * 0.5),
          rotation: self.progress * 360,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  });

  // Animate bubble along the zig-zag vertical path
  bubbleTimeline.to(bubble, {
    motionPath: {
      path: "#verticalMotionPath",
      align: "#verticalMotionPath",
      alignOrigin: "0.5 0.5",
      autoRotate: false
    },
    duration: 1,
    ease: "none"
  });

  // Animate cards on scroll - alternating entrance directions
  const cards = document.querySelectorAll('.vertical-facility-card');
  cards.forEach((card, index) => {
    const isOdd = index % 2 === 0; // Note: CSS nth-child is 1-based, JS array is 0-based
    
    gsap.fromTo(card, {
      x: isOdd ? -80 : 80,
      opacity: 0,
      scale: 0.9,
      rotation: isOdd ? -5 : 5
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Add staggered animation for the timeline dots
    gsap.fromTo(card, {
      '--dot-scale': 0
    }, {
      '--dot-scale': 1,
      duration: 0.5,
      delay: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: card,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Header animation with enhanced effects
  gsap.fromTo('.vertical-section-header', {
    y: 50,
    opacity: 0,
    scale: 0.95
  }, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.vertical-section-header',
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  // Enhanced hover effects for cards
  cards.forEach((card, index) => {
    const isOdd = index % 2 === 0;
    
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.05,
        rotation: isOdd ? 2 : -2,
        x: isOdd ? 10 : -10,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Animate the timeline dot on hover
      gsap.to(this, {
        '--dot-pulse': 1,
        duration: 0.3
      });
    });

    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        rotation: 0,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(this, {
        '--dot-pulse': 0,
        duration: 0.3
      });
    });

    // Click animation with ripple effect
    card.addEventListener('click', function() {
      gsap.to(this, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
      
      // Create a ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(39, 94, 89, 0.2);
        width: 20px;
        height: 20px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 100;
      `;
      this.appendChild(ripple);
      
      gsap.to(ripple, {
        scale: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      });
    });
  });

  // Parallax effect for the path with enhanced movement
  gsap.to('.vertical-path-container', {
    y: -80,
    rotation: 2,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // Add floating animation to emojis
  cards.forEach((card) => {
    const emoji = card.querySelector('.vertical-facility-emoji');
    if (emoji) {
      gsap.to(emoji, {
        y: -10,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    }
  });
}

// Add CSS custom properties for dynamic animations
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .vertical-facility-card::after {
      transform: translateY(-50%) scale(var(--dot-scale, 1));
      background: radial-gradient(circle, 
        rgba(39, 94, 89, var(--dot-pulse, 0)) 0%, 
        rgba(39, 94, 89, 0) 70%), 
        #275E59;
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);
});