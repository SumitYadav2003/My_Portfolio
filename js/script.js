// ============================================
// THEME TOGGLE
// ============================================
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// ============================================
// MOBILE NAV
// ============================================
(function () {
  const burger = document.getElementById('navBurger');
  const links = document.querySelector('.nav-links');
  burger.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
})();

// ============================================
// SCROLL PROGRESS BAR
// ============================================
(function () {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
})();

// ============================================
// CUSTOM CURSOR (desktop only)
// ============================================
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const dot = document.getElementById('cursorDot');
  let x = 0, y = 0;
  window.addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    document.body.classList.add('cursor-ready');
  });
  const hoverables = document.querySelectorAll('a, button, select, .chip, .dot');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => dot.classList.remove('cursor-hover'));
  });
})();

// ============================================
// HERO PHOTO TILT
// ============================================
(function () {
  const photo = document.getElementById('heroPhoto');
  if (!photo || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  photo.addEventListener('mousemove', (e) => {
    const r = photo.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    photo.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
  });
  photo.addEventListener('mouseleave', () => { photo.style.transform = 'rotateY(0) rotateX(0)'; });
})();

// ============================================
// HERO STAT COUNT-UP — runs once on load, part of the hero's one load moment
// ============================================
(function () {
  const nums = document.querySelectorAll('#heroStats .stat-num');
  if (!nums.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  setTimeout(() => nums.forEach(animateCount), 1300);
})();

// ============================================
// GENERIC SCROLL REVEAL — for timeline items and skill groups
// ============================================
(function () {
  const targets = document.querySelectorAll('.reveal-target');
  if (!targets.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(t => observer.observe(t));
})();

// ============================================
// TERMINAL TYPE EFFECT (About section) — runs once when in view
// ============================================
(function () {
  const body = document.getElementById('terminalBody');
  const lines = [
    { prompt: '$ ', text: 'whoami', type: 'cmd' },
    { text: 'Sumit Yadav — Full-stack developer', type: 'out' },
    { prompt: '$ ', text: 'cat focus.txt', type: 'cmd' },
    { text: 'AI-integrated web apps · Django · PostgreSQL', type: 'out' },
    { prompt: '$ ', text: 'status --search', type: 'cmd' },
    { text: 'OPEN_TO_WORK=true  RELOCATE=true', type: 'key' },
  ];

  let started = false;

  function typeLine(i) {
    if (i >= lines.length) {
      body.insertAdjacentHTML('beforeend', '<span class="terminal-cursor"></span>');
      return;
    }
    const line = lines[i];
    const lineEl = document.createElement('div');
    body.appendChild(lineEl);

    let prefix = '';
    if (line.type === 'cmd') prefix = `<span class="t-prompt">${line.prompt}</span>`;
    if (line.type === 'out') { lineEl.style.color = '#8b949e'; }
    if (line.type === 'key') { lineEl.innerHTML = `<span class="t-key">${line.text}</span>`; setTimeout(() => typeLine(i + 1), 500); return; }

    let charIndex = 0;
    const speed = line.type === 'cmd' ? 45 : 12;
    function tick() {
      lineEl.innerHTML = prefix + line.text.slice(0, charIndex);
      charIndex++;
      if (charIndex <= line.text.length) {
        setTimeout(tick, speed);
      } else {
        setTimeout(() => typeLine(i + 1), line.type === 'cmd' ? 200 : 400);
      }
    }
    tick();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        typeLine(0);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(document.getElementById('terminal'));
})();

// ============================================
// PROJECT TABS
// ============================================
(function () {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const article = tabGroup.closest('.project');
    tabGroup.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const panelName = tab.dataset.tab;
        article.querySelectorAll('.tab-panel').forEach(p => {
          p.classList.toggle('active', p.dataset.panel === panelName);
        });
      });
    });
  });
})();

// ============================================
// PROJECT SCREENSHOT CAROUSELS
// ============================================
function setupCarousel(imgId, dotsId, folder, files) {
  const img = document.getElementById(imgId);
  const dotsWrap = document.getElementById(dotsId);
  if (!img || !dotsWrap) return;
  const dots = dotsWrap.querySelectorAll('.dot');
  let current = 0;
  let timer;

  function show(idx) {
    current = idx;
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = '';
    img.src = `images/${folder}/${files[idx]}`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { show(i); resetTimer(); });
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => show((current + 1) % files.length), 5000);
  }
  resetTimer();
}

setupCarousel('culinaaiImg', 'culinaaiDots', 'culinaai', [
  '01-generate-recipe.png', '02-ai-cooking-assistant.png', '03-dashboard.png', '04-saved-recipes.png'
]);
setupCarousel('carverseImg', 'carverseDots', 'carverse', [
  '01-listing.png', '02-about.png', '03-appointment.png', '04-review.png'
]);

// ============================================
// LIVE VALIDATION DEMO (CulinaAI)
// Mirrors the report's rule logic in miniature — NOT connected to any real API.
// ============================================
(function () {
  const runBtn = document.getElementById('demoRun');
  const output = document.getElementById('demoOutput');
  if (!runBtn) return;

  // A small fixed set of mock "generated" ingredients per diet, so the demo
  // has something concrete to validate against.
  const mockRecipes = {
    none: { name: 'Creamy Peanut Butter Noodles', ingredients: ['peanut butter', 'noodles', 'soy sauce', 'garlic'], time: 20 },
    vegan: { name: 'Vegan Peanut Tofu Stir-fry', ingredients: ['tofu', 'peanut butter', 'broccoli', 'soy sauce'], time: 25 },
    vegetarian: { name: 'Paneer and Peanut Curry', ingredients: ['paneer', 'peanut butter', 'tomato', 'cream'], time: 35 },
  };

  runBtn.addEventListener('click', () => {
    const diet = document.getElementById('demoDiet').value;
    const allergy = document.getElementById('demoAllergy').value;
    const maxTime = parseInt(document.getElementById('demoTime').value, 10);

    const recipe = mockRecipes[diet];
    const checks = [];
    let score = 0;
    let criticalFail = false;

    // Allergy safety (20 pts) — critical gate
    const hasNut = recipe.ingredients.some(i => i.includes('peanut'));
    const hasDairy = recipe.ingredients.some(i => ['paneer', 'cream', 'cheese'].some(d => i.includes(d)));
    let allergyOk = true;
    if (allergy === 'nut' && hasNut) allergyOk = false;
    if (allergy === 'dairy' && hasDairy) allergyOk = false;
    checks.push({ name: 'Allergy safety', pts: 20, ok: allergyOk });
    if (allergyOk) score += 20; else criticalFail = true;

    // Diet compliance (20 pts)
    let dietOk = true;
    if (diet === 'vegan' && hasDairy) dietOk = false;
    checks.push({ name: 'Diet compliance', pts: 20, ok: dietOk });
    if (dietOk) score += 20; else criticalFail = true;

    // Ingredient match (15 pts) — always fine in this mock, generator matched the request
    checks.push({ name: 'Ingredient match', pts: 15, ok: true });
    score += 15;

    // Structure (15 pts) — always fine, mock is well-formed
    checks.push({ name: 'Structure', pts: 15, ok: true });
    score += 15;

    // Cooking time (10 pts)
    const timeOk = recipe.time <= maxTime;
    checks.push({ name: `Cooking time (needs \u2264${maxTime}m, recipe is ${recipe.time}m)`, pts: 10, ok: timeOk });
    if (timeOk) score += 10;

    // Equipment (10 pts) — always fine in this mock
    checks.push({ name: 'Equipment', pts: 10, ok: true });
    score += 10;

    // Difficulty (5 pts)
    checks.push({ name: 'Difficulty', pts: 5, ok: true });
    score += 5;

    // Cuisine/nutrition relevance (5 pts)
    checks.push({ name: 'Cuisine / nutrition relevance', pts: 5, ok: true });
    score += 5;

    const finalScore = criticalFail ? Math.min(score, 35) : score;
    const passed = !criticalFail && finalScore >= 70;

    const checksHtml = checks.map(c => `
      <div class="demo-check">
        <span class="demo-check-name">${c.name} <span style="color:var(--text-dimmer)">(${c.pts}pt)</span></span>
        <span class="demo-check-result ${c.ok ? 'ok' : 'bad'}">${c.ok ? 'PASS' : 'FAIL'}</span>
      </div>`).join('');

    output.innerHTML = `
      <div class="demo-score-row">
        <span class="demo-score ${passed ? 'pass' : 'fail'}">${finalScore}<span style="font-size:16px;color:var(--text-dimmer)">/100</span></span>
        <span class="demo-status-badge ${passed ? 'pass' : 'fail'}">${passed ? 'ACCEPTED' : criticalFail ? 'CRITICAL FAIL \u2014 REGENERATE' : 'BELOW THRESHOLD'}</span>
      </div>
      <div class="demo-checks">${checksHtml}</div>
      <p class="demo-note">Mock recipe used: "${recipe.name}". ${criticalFail ? 'A critical safety/diet failure caps the score regardless of other checks \u2014 this mirrors how the real engine treats allergy and diet gates.' : 'This is a simplified illustration of the scoring logic described in the project writeup.'}</p>
    `;
  });
})();

// ============================================
// COPY EMAIL
// ============================================
(function () {
  const btn = document.getElementById('copyEmailBtn');
  const hint = document.getElementById('copyHint');
  const email = document.getElementById('emailValue').textContent;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
      hint.textContent = 'Copied!';
      hint.classList.add('copied');
      setTimeout(() => { hint.textContent = 'Click to copy'; hint.classList.remove('copied'); }, 1800);
    });
  });
})();
