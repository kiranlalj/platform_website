async function loadComponent(id, url) {
  try {
    const response = await fetch(`${url}?t=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${url}:`, error);
  }
}

async function loadAllComponents() {
  const components = [
    { id: 'comp-00-navbar', url: 'components/00-navbar.html' },
    { id: 'comp-01-hero', url: 'components/01-hero.html' },
    { id: 'comp-01b-infrastructure', url: 'components/01b-infrastructure.html' },
    { id: 'comp-02-our-work', url: 'components/02-our-work.html' },
    { id: 'comp-03-services', url: 'components/03-services.html' },
    { id: 'comp-04-process', url: 'components/04-process.html' },
    { id: 'comp-05-analytics', url: 'components/05-analytics.html' },
    { id: 'comp-06-pricing', url: 'components/06-pricing.html' },
    { id: 'comp-07-faq', url: 'components/07-faq.html' },
    { id: 'comp-08-team', url: 'components/08-team.html' },
    { id: 'comp-09-testimonials', url: 'components/09-testimonials.html' },
    { id: 'comp-09b-labs', url: 'components/09b-labs.html' },
    { id: 'comp-09c-contact', url: 'components/09c-contact.html' },
    { id: 'comp-10-footer', url: 'components/10-footer.html' }
  ];

  // Load all components concurrently
  await Promise.all(components.map(comp => loadComponent(comp.id, comp.url)));

  // Dispatch an event so animations.js knows the DOM is ready
  document.dispatchEvent(new Event('componentsLoaded'));
}

// Start loading
loadAllComponents();
