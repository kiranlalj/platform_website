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
  const rightGrid = document.getElementById('right-card-grid');

  // Decorative grid variations per tab (array of [row, col, type])
  const gridPatterns = [
    // Tab 1 Grid 
    [[1,5,'caret'], [2,2,'dot'], [3,4,'dot'], [4,1,'dot'], [5,2,'dot']],
    // Tab 2 Grid
    [[3,3,'dot'], [3,5,'dot'], [4,4,'dot'], [5,2,'dot'], [5,4,'dot']],
    // Tab 3 Grid
    [[4,1,'dot'], [4,2,'dot'], [4,3,'dot'], [4,5,'dot'], [5,2,'dot']],
    // Tab 4 Grid
    [[2,2,'dot'], [3,5,'dot'], [4,1,'dot'], [4,4,'dot'], [5,3,'dot']]
  ];

  function updateRightGrid(tabIndex) {
    if (!rightGrid || !gridPatterns[tabIndex]) return;
    const activePoints = gridPatterns[tabIndex];
    let html = '';
    
    for (let r = 1; r <= 5; r++) {
      html += `<!-- Row ${r} -->\n`;
      for (let c = 1; c <= 5; c++) {
        const found = activePoints.find(d => d[0] === r && d[1] === c);
        if (found) {
          if (found[2] === 'caret') {
            html += `<div class="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-[#f95738] mx-auto mt-[1px]"></div>\n`;
          } else {
            html += `<div class="w-1.5 h-1.5 rounded-full bg-[#f95738] mx-auto opacity-100 scale-110 transition-all duration-500"></div>\n`;
          }
        } else {
          html += `<div class="w-1.5 h-1.5 rounded-full bg-white/20 mx-auto transition-all duration-300"></div>\n`;
        }
      }
    }
    rightGrid.innerHTML = html;
  }
  
  if (accTabs.length > 0) {
    // Render initial grid
    updateRightGrid(0);

    accTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Reset all tabs to collapsed state
        accTabs.forEach((t, i) => {
          t.style.flex = '1';
          t.classList.remove('flex-[4]', 'bg-pf-orange');
          t.classList.add('flex-[1]', 'bg-[#161616]', 'hover:bg-[#1a1a1a]');
          
          // Switch numbers
          const num = t.querySelector('.acc-num');
          if(num) {
             num.classList.remove('text-4xl', 'lg:text-5xl', 'text-white/80');
             num.classList.add('text-4xl', 'lg:text-3xl', 'xl:text-4xl', 'text-white/40');
          }
          
          // Toggle header lines/icons for inactive
          const line = t.querySelector('.acc-line');
          if (line) {
             line.classList.remove('hidden');
             line.classList.add('block');
          }
          const iconActive = t.querySelector('.acc-icon-active');
          if (iconActive) {
             iconActive.classList.remove('block');
             iconActive.classList.add('hidden');
          }
          const iconInactive = t.querySelector('.acc-icon-inactive');
          if (iconInactive) {
             iconInactive.classList.remove('hidden');
             iconInactive.classList.add('block');
          }

          // Hide inner content
          const content = t.querySelector('.acc-content');
          if (content) {
             content.classList.remove('opacity-100', 'delay-200');
             content.classList.add('opacity-0', 'pointer-events-none');
          }

          // Hide inner graphics
          const graphics = t.querySelector('.acc-graphics');
          if (graphics) {
             graphics.classList.remove('translate-y-0', 'delay-300', 'bg-black/10');
             graphics.classList.add('translate-y-8');
          }

          // Show vertical hover title
          const titleInactive = t.querySelector('.acc-title-inactive');
          if (titleInactive) {
             titleInactive.classList.remove('hidden');
             titleInactive.classList.add('block');
             
             // Wait for display block before opacity
             setTimeout(() => {
                titleInactive.classList.remove('opacity-0');
                titleInactive.classList.add('opacity-100');
             }, 50);
          }
          
          // Reset indicator
          if (accIndicators[i]) {
             accIndicators[i].className = 'w-[2px] h-[14px] bg-white/10 indicator transition-colors duration-300';
          }
        });

        // Activate clicked tab
        tab.style.flex = '4';
        tab.classList.remove('flex-[1]', 'bg-[#161616]', 'hover:bg-[#1a1a1a]');
        tab.classList.add('flex-[4]', 'bg-pf-orange');

        const activeNum = tab.querySelector('.acc-num');
        if (activeNum) {
           activeNum.classList.remove('lg:text-3xl', 'xl:text-4xl', 'text-white/40');
           activeNum.classList.add('text-4xl', 'lg:text-5xl', 'text-white/80');
        }

        // Toggle header lines/icons for active
        const line = tab.querySelector('.acc-line');
        if (line) {
           line.classList.remove('block');
           line.classList.add('hidden');
        }
        const iconActive = tab.querySelector('.acc-icon-active');
        if (iconActive) {
           iconActive.classList.remove('hidden');
           iconActive.classList.add('block');
        }
        const iconInactive = tab.querySelector('.acc-icon-inactive');
        if (iconInactive) {
           iconInactive.classList.remove('block');
           iconInactive.classList.add('hidden');
        }

        // Show inner content
        const content = tab.querySelector('.acc-content');
        if (content) {
           content.classList.remove('opacity-0', 'pointer-events-none');
           content.classList.add('opacity-100', 'delay-200');
        }

        const graphics = tab.querySelector('.acc-graphics');
        if (graphics) {
           graphics.classList.remove('translate-y-8');
           graphics.classList.add('translate-y-0', 'delay-300', 'bg-black/10');
        }

        const titleInactive = tab.querySelector('.acc-title-inactive');
        if (titleInactive) {
           titleInactive.classList.remove('opacity-100');
           titleInactive.classList.add('opacity-0');
           setTimeout(() => {
              titleInactive.classList.remove('block');
              titleInactive.classList.add('hidden');
           }, 300);
        }

        // Update active indicator dot (this is for the bottom vertical bar indicator)
        if (accIndicators[index]) {
           accIndicators[index].className = 'w-[2px] h-[14px] bg-[#f95738] indicator transition-colors duration-300';
        }

        // Trigger dynamic grid swap
        updateRightGrid(index);
      });
    });
  }

  // 3. Process Horizontal Slider Logic
  const psTitle = document.getElementById('ps-title');
  if (psTitle) {
    const data = [
      { title: "Step 1 — Smart Connect", desc: "Platform’s AI analyzes your tech stack and swiftly configures your ideal environment. One connection is all it takes to set everything up following industry best practices.", metric: "30", metricUnit: "sec", metricLbl: "Average connection time", image: "https://framerusercontent.com/images/1cdanDHiXl29Fvv4Cs7zAkPS0.jpg" },
      { title: "Step 2 — Auto Optimize", desc: "Once connected, our system continuously fine-tunes configurations and resource allocation in real time. The platform adapts to your usage patterns, ensuring peak performance and efficiency without manual tweaking.", metric: "55", metricUnit: "sec", metricLbl: "Average optimization time", image: "https://framerusercontent.com/images/HGUyRo3Ko6fOp6Ks3LrpzaNBBVk.jpg" },
      { title: "Step 3 — Scale Ready", desc: "As your needs grow, Platform automatically scales your infrastructure up or down. Capacity is adjusted on the fly so you maintain speed and stability under any load, without over-provisioning or downtime.", metric: "3", metricUnit: "min", metricLbl: "Average scaling time", image: "https://framerusercontent.com/images/ukKikzoLdTBSJugvA1C94bIp4.jpeg" },
      { title: "Step 4 — Auto Guard", desc: "Platform's adaptive security layer kicks in to protect your system 24/7. It learns and evolves with new threats, providing advanced threat prevention and keeping your infrastructure secure — all without manual intervention.", metric: "10", metricUnit: "sec", metricLbl: "Average threat detection", image: "https://framerusercontent.com/images/225d0nciRq6DjfvPI1KMQDPP4.jpeg" }
    ];
    
    let index = 0;
    const ui = {
      title: document.getElementById('ps-title'),
      desc: document.getElementById('ps-desc'),
      metric: document.getElementById('ps-metric'),
      label: document.getElementById('ps-metric-label'),
      media: document.getElementById('ps-media'),
      prev: document.getElementById('ps-prev'),
      next: document.getElementById('ps-next'),
      dots: document.getElementById('ps-dots').children
    };

    function renderSlider() {
      [ui.title, ui.desc, ui.metric, ui.label, ui.media].forEach(e => { if(e) e.style.opacity = '0'; });
      
      setTimeout(() => {
        if(ui.title) ui.title.innerText = data[index].title;
        if(ui.desc) ui.desc.innerText = data[index].desc;
        if(ui.metric) ui.metric.innerHTML = `${data[index].metric}<span class="text-lg md:text-xl text-white/30 ml-2 font-normal">${data[index].metricUnit}</span>`;
        if(ui.label) ui.label.innerText = data[index].metricLbl;
        if(ui.media) ui.media.src = data[index].image;
        
        if(ui.dots) {
          Array.from(ui.dots).forEach((d, i) => {
            d.className = i === index ? "h-2 w-8 bg-[#f95738] rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(249,87,56,0.3)]" : "h-[6px] w-[6px] bg-white/20 hover:bg-white/40 cursor-pointer rounded-full transition-all duration-300";
          });
        }
        [ui.title, ui.desc, ui.metric, ui.label, ui.media].forEach(e => { if(e) e.style.opacity = '1'; });
      }, 300);
    }

    if(ui.next) ui.next.addEventListener('click', () => { index = (index + 1) % data.length; renderSlider(); });
    if(ui.prev) ui.prev.addEventListener('click', () => { index = (index - 1 + data.length) % data.length; renderSlider(); });
    
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
