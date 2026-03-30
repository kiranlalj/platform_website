/* ── Particles ── */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.a = Math.random() * 0.6 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 180; i++) {
    particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(loop);
  }

  loop();
})();

/* ── Counters ── */
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.decimals || 0);
  const prefix = el.dataset.prefix || '';

  const obj = { v: 0 };

  gsap.to(obj, {
    v: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = prefix + obj.v.toFixed(dec);
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true
    }
  });
});

/* ── Process slider ── */
const processSteps = [
  {
    title: 'Step 1 — Smart Connect',
    desc: "Platform's AI analyzes your tech stack and swiftly configures your ideal environment. One connection is all it takes to set everything up following industry best practices.",
    metric: '30',
    unit: 'sec',
    metricLabel: 'Average connection time'
  },
  {
    title: 'Step 2 — Deploy',
    desc: 'Automated deployment pipelines push your infrastructure live in minutes. Zero-downtime deployments with instant rollback capabilities.',
    metric: '< 5',
    unit: 'min',
    metricLabel: 'Average deploy time'
  },
  {
    title: 'Step 3 — Monitor',
    desc: 'Real-time dashboards give you complete visibility. AI-powered alerts notify you before issues impact your users.',
    metric: '24/7',
    unit: '',
    metricLabel: 'Continuous monitoring'
  },
  {
    title: 'Step 4 — Scale',
    desc: 'Platform automatically scales your infrastructure based on demand. Pay only for what you use, scale to millions instantly.',
    metric: '∞',
    unit: '',
    metricLabel: 'Unlimited scale'
  }
];

let psIdx = 0;

function updateProcess() {
  const s = processSteps[psIdx];

  document.getElementById('psTitle').textContent = s.title;
  document.getElementById('psDesc').textContent = s.desc;

  document.getElementById('psMetric').innerHTML =
    s.metric + (s.unit ? ` <span>${s.unit}</span>` : '');

  document.getElementById('psMetricLabel').textContent = s.metricLabel;

  document.querySelectorAll('.ps-dots span').forEach((d, i) => {
    d.classList.toggle('active', i === psIdx);
  });
}

document.getElementById('psNext').addEventListener('click', () => {
  psIdx = (psIdx + 1) % processSteps.length;
  updateProcess();
});

document.getElementById('psBack').addEventListener('click', () => {
  psIdx = (psIdx - 1 + processSteps.length) % processSteps.length;
  updateProcess();
});

/* ── Section progress dots ── */
const sections = [
  'hero',
  'work',
  'services',
  'process',
  'analytics',
  'pricing',
  'faq',
  'team',
  'testimonials'
];

const dots = document.querySelectorAll('.progress-dots span');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = sections.indexOf(e.target.id);

      if (idx > -1) {
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => observer.observe(s));