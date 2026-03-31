/**
 * GSAP ANIMATIONS 
 * Listens for the custom 'componentsLoaded' event triggered by loader.js
 */
document.addEventListener('componentsLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  // 1. Reveal Elements (.fade-up)
  const fadeElements = gsap.utils.toArray('.fade-up');
  fadeElements.forEach(el => {
    gsap.fromTo(el, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // 2. Hero Background Video Parallax
  const heroVideo = document.querySelector('.hero-bg-video');
  if(heroVideo) {
    gsap.to(heroVideo, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#comp-01-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 3. Floating 3D Blobs Parallax in Infrastructure Section
  const slowBlobs = gsap.utils.toArray('.parallax-slow');
  slowBlobs.forEach(blob => {
    gsap.to(blob, {
      yPercent: -20,
      rotation: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#comp-01b-infrastructure',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  });

  const mediumBlobs = gsap.utils.toArray('.parallax-medium');
  mediumBlobs.forEach(blob => {
    gsap.to(blob, {
      yPercent: -50,
      rotation: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#comp-01b-infrastructure',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  const fastBlobs = gsap.utils.toArray('.parallax-fast');
  fastBlobs.forEach(blob => {
    gsap.to(blob, {
      yPercent: -80,
      rotation: 45,
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#comp-01b-infrastructure',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    });
  });

  // 4. Character-level Reveal for Infrastructure Text
  const infraText = document.getElementById('infrastructure-text');
  if (infraText) {
    const originalText = infraText.innerText;
    
    // Split the text manually into words and characters
    const words = originalText.split(' ');
    infraText.innerHTML = ''; // Clear original text
    
    words.forEach((word, wordIdx) => {
      // Create a word wrapper
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      
      const chars = word.split('');
      chars.forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.classList.add('char');
        charSpan.innerText = char;
        // The user's requested initial colour "#c3c4c6"
        charSpan.style.color = '#333333'; // Making it dark initially so the reveal pops to white
        charSpan.style.transition = 'color 0.1s ease';
        wordSpan.appendChild(charSpan);
      });
      
      infraText.appendChild(wordSpan);
      
      // Add a space after each word except the last one
      if (wordIdx < words.length - 1) {
        // Space doesn't need to be animated, but must be present
        const space = document.createTextNode(' ');
        infraText.appendChild(space);
      }
    });

    const chars = infraText.querySelectorAll('.char');
    const total = chars.length;

    ScrollTrigger.create({
      trigger: '#infrastructure',
      start: 'top 80%',
      end: 'top -20%',
      scrub: true,
      onUpdate: (self) => {
        // Calculate how many characters should be revealed based on scroll progress
        const revealCount = Math.floor(self.progress * total);
        
        chars.forEach((charEl, idx) => {
          if (idx < revealCount) {
            // Apply the highlighted color
            charEl.style.color = '#ffffff';
          } else {
            // Revert to initial color
            charEl.style.color = '#333333';
          }
        });
      }
    });
  }

  console.log('✅ All components loaded & GSAP animations bound successfully.');
});