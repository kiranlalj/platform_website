/**
 * theme.js
 * Light / dark theme toggle with localStorage persistence.
 */

const STORAGE_KEY = 'pf-theme';
const DARK        = 'dark';
const LIGHT       = 'light';

function getPreferred() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  // Update toggle icon
  const icons = document.querySelectorAll('[data-theme-icon]');
  icons.forEach(el => {
    el.className = theme === DARK ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });

  // Update aria labels
  const btns = document.querySelectorAll('[data-theme-toggle]');
  btns.forEach(btn => {
    btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || DARK;
  applyTheme(current === DARK ? LIGHT : DARK);
}

export function initTheme() {
  applyTheme(getPreferred());

  const btns = document.querySelectorAll('[data-theme-toggle]');
  btns.forEach(btn => btn.addEventListener('click', toggleTheme));
}
