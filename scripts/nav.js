/* ── Nav scroll ── */
window.addEventListener('scroll', () => {
  document
    .getElementById('mainNav')
    .classList.toggle('scrolled', scrollY > 60);
});

/* ── Hamburger ── */
document.getElementById('hamburger').addEventListener('click', function () {
  this.classList.toggle('open');
});