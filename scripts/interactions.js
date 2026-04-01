// Global interactions for dynamically loaded components

function initInteractions() {
  
  // 1. Mobile Menu Hamburger Toggle
  const hamburger = document.getElementById('hamburger-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const backdrop = document.getElementById('backdrop');
  const closeMenu = document.getElementById('close-menu');
  const menuLinks = document.querySelectorAll('.menu-link');

  if (hamburger && overlay) {
    let isOpen = false;

    const toggleMenu = () => {
      isOpen = !isOpen;
      
      if (isOpen) {
        if (backdrop) {
          backdrop.classList.remove('opacity-0', 'pointer-events-none');
          backdrop.classList.add('opacity-100', 'pointer-events-auto');
        }
        overlay.classList.remove('-translate-y-full');
        overlay.classList.add('translate-y-0');
        document.body.style.overflow = 'hidden'; 
      } else {
        if (backdrop) {
          backdrop.classList.add('opacity-0', 'pointer-events-none');
          backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        }
        overlay.classList.remove('translate-y-0');
        overlay.classList.add('-translate-y-full');
        document.body.style.overflow = 'auto';
      }
    };

    hamburger.addEventListener('click', toggleMenu);
    if(closeMenu) closeMenu.addEventListener('click', toggleMenu);
    if(backdrop) backdrop.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', () => {
       if (isOpen) toggleMenu();
    }));
  }

  // 2. Services Horizontal Accordion Toggle
  const accTabs = document.querySelectorAll('.acc-tab');
  const accIndicators = document.querySelectorAll('#accordion-indicators .indicator');
  
  if (accTabs.length > 0) {
    accTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Reset all tabs to collapsed state
        accTabs.forEach((t, i) => {
          // Shrink flex
          t.style.flex = '1';
          t.classList.remove('flex-[4]', 'bg-pf-orange');
          t.classList.add('flex-[1]', 'bg-[#161616]', 'hover:bg-[#1a1a1a]');
          
          // Show collapsed number
          const collapsedNum = t.querySelector('span.text-3xl, span.text-4xl, span.text-5xl');
          if(collapsedNum && !collapsedNum.classList.contains('text-white/80')) {
             collapsedNum.className = 'text-4xl lg:text-3xl xl:text-4xl font-light tracking-tight text-white/40 transition-all duration-700';
          }
          
          // Show the small rotated arrow
          const arrow = t.querySelector('svg');
          if(arrow && arrow.classList.contains('lg:hidden')) {
             // keep it existing, but maybe ensure it's visible if needed
          }

          // Hide inner content
          const content = t.querySelector('.acc-content');
          if(content) {
             content.classList.remove('opacity-100', 'delay-200');
             content.classList.add('opacity-0', 'pointer-events-none');
          }

          // Hide inner graphics via translation
          const graphics = t.querySelector('.acc-graphics');
          if (graphics) {
             graphics.classList.remove('translate-y-0', 'delay-300');
             graphics.classList.add('translate-y-8');
          }

          // Show vertical title
          const titleInactive = t.querySelector('.acc-title-inactive');
          if (titleInactive) {
             titleInactive.classList.remove('hidden', 'opacity-0');
             titleInactive.classList.add('opacity-100');
          }
          
          // Update indicator dots
          if (accIndicators[i]) {
             accIndicators[i].className = 'w-3 h-[4px] bg-white/20 rounded-full indicator transition-colors';
          }
        });

        // Activate the clicked tab
        tab.style.flex = '4';
        tab.classList.remove('flex-[1]', 'bg-[#161616]', 'hover:bg-[#1a1a1a]');
        tab.classList.add('flex-[4]', 'bg-pf-orange');

        // Update active number
        const activeNum = tab.querySelector('span.text-3xl, span.text-4xl, span.text-5xl');
        if(activeNum) {
           activeNum.className = 'text-4xl lg:text-5xl font-light tracking-tight text-white/80 transition-all duration-700';
        }

        // Show inner content
        const content = tab.querySelector('.acc-content');
        if(content) {
           content.classList.remove('opacity-0', 'pointer-events-none');
           content.classList.add('opacity-100', 'delay-200');
        }

        // Show inner graphics
        const graphics = tab.querySelector('.acc-graphics');
        if (graphics) {
           graphics.classList.remove('translate-y-8');
           graphics.classList.add('translate-y-0', 'delay-300');
        }

        // Hide vertical title
        const titleInactive = tab.querySelector('.acc-title-inactive');
        if (titleInactive) {
           titleInactive.classList.remove('opacity-100');
           titleInactive.classList.add('hidden'); // or keep it just opacity-0
        }

        // Update active indicator dot
        if (accIndicators[index]) {
           accIndicators[index].className = 'w-3 h-[4px] bg-pf-orange rounded-full indicator transition-colors';
        }
      });
    });
  }

  // 3. Process Horizontal Slider Logic
  const psTitle = document.getElementById('ps-title');
  if (psTitle) {
    const data = [
      { title: "Step 1 — Smart Connect", desc: "Platform’s AI analyzes your tech stack and swiftly configures your ideal environment. One connection is all it takes to set everything up following industry best practices.", metric: "30", metricUnit: "sec", metricLbl: "Average connection time", icon: "fa-cube" },
      { title: "Step 2 — Design Generation", desc: "Our system automatically drafts complete architectural diagrams customized perfectly to your data flows safely across global zones.", metric: "1.2", metricUnit: "s", metricLbl: "Design latency", icon: "fa-pen-nib" },
      { title: "Step 3 — Build Ecosystem", desc: "Dependencies and containers are provisioned natively, bringing your application up with multi-node redundancy in an instant.", metric: "99", metricUnit: "%", metricLbl: "Automation rate", icon: "fa-network-wired" },
      { title: "Step 4 — Auto Guard", desc: "Platform’s adaptive security layer kicks in to protect your system 24/7. It learns and evolves with new threats without manual intervention.", metric: "10", metricUnit: "sec", metricLbl: "Average threat detection", icon: "fa-shield-halved" }
    ];
    
    let index = 0;
    const ui = {
      title: document.getElementById('ps-title'),
      desc: document.getElementById('ps-desc'),
      metric: document.getElementById('ps-metric'),
      label: document.getElementById('ps-metric-label'),
      icon: document.getElementById('ps-icon'),
      prev: document.getElementById('ps-prev'),
      next: document.getElementById('ps-next'),
      dots: document.getElementById('ps-dots').children
    };

    function renderSlider() {
      [ui.title, ui.desc, ui.metric, ui.label, ui.icon].forEach(e => { if(e) e.style.opacity = '0'; });
      
      setTimeout(() => {
        if(ui.title) ui.title.innerText = data[index].title;
        if(ui.desc) ui.desc.innerText = data[index].desc;
        if(ui.metric) ui.metric.innerHTML = `${data[index].metric}<span class="text-xl md:text-2xl text-white/40 ml-1">${data[index].metricUnit}</span>`;
        if(ui.label) ui.label.innerText = data[index].metricLbl;
        if(ui.icon) ui.icon.className = `fa-solid ${data[index].icon} text-7xl md:text-9xl text-white transition-all duration-700`;
        
        if(ui.dots) {
          Array.from(ui.dots).forEach((d, i) => {
            d.className = i === index ? "h-2 w-8 bg-[#EF6D3D] rounded-full transition-all" : "h-2 w-2 bg-white/20 hover:bg-white/40 cursor-pointer rounded-full transition-all";
          });
        }

        if(ui.prev) {
          ui.prev.classList.toggle('opacity-40', index === 0);
          ui.prev.classList.toggle('cursor-not-allowed', index === 0);
        }
        if(ui.next) {
          ui.next.classList.toggle('opacity-40', index === data.length - 1);
          ui.next.classList.toggle('cursor-not-allowed', index === data.length - 1);
        }

        [ui.title, ui.desc, ui.metric, ui.label, ui.icon].forEach(e => { if(e) e.style.opacity = '1'; });
      }, 300);
    }

    if(ui.next) ui.next.addEventListener('click', () => { if(index < data.length-1) { index++; renderSlider(); } });
    if(ui.prev) ui.prev.addEventListener('click', () => { if(index > 0) { index--; renderSlider(); } });
    
    // Add dot click handlers
    if(ui.dots) {
      Array.from(ui.dots).forEach((d, i) => {
        d.addEventListener('click', () => {
          index = i;
          renderSlider();
        });
      });
    }
  }

  console.log("✅ Component interactive scripts initialized.");
}

// Attach to the custom loader event so it runs precisely when all DOM nodes exist
document.addEventListener('componentsLoaded', initInteractions);
