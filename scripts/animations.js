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

  // 4. Word-by-Word Style Stroke highlight (Infrastructure Section)
  const strokeText = document.querySelector('.style-stroke');
  if(strokeText) {
    gsap.to(strokeText, {
      color: '#ffffff',
      webkitTextStrokeColor: 'transparent',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#comp-01b-infrastructure',
        start: 'top center',
        end: 'center center',
        scrub: true
      }
    });
  }

  console.log('✅ All components loaded & GSAP animations bound successfully.');
});