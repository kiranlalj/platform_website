/* ── Scroll reveal ── */
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.fade-up').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true
    }
  });
});

/* HERO PARALLAX + ZOOM */
  gsap.to(".hero__video", {
    scale: 1.3,
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

/* CONTENT PARALLAX (moves slower = depth) */
  gsap.to(".hero__content", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  /* OPTIONAL: overlay darken while scrolling */
  gsap.to(".hero__overlay", {
    opacity: 0.9,
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });