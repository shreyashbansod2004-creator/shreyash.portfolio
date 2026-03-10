/* ===================== CUSTOM CURSOR ===================== */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = (mx - 6) + 'px';
  cursor.style.top  = (my - 6) + 'px';
});

function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Expand cursor on hover over interactive elements
document.querySelectorAll('a, button, .project, .social-btn, .contact-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    ring.style.transform   = 'scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform   = 'scale(1)';
  });
});

/* ===================== SPARKLES ON CLICK ===================== */
document.addEventListener('click', e => {
  for (let i = 0; i < 6; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = Math.random() * 6 + 3;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - size / 2}px;
      top:${e.clientY  - size / 2}px;
      --tx:${(Math.random() - 0.5) * 60}px;
      --ty:${(Math.random() - 0.5) * 60}px;
    `;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
});

/* ===================== PROGRESS BAR ===================== */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

/* ===================== ELEMENTS ===================== */
const fadeTexts = document.querySelectorAll('.fade-text');
const pops      = document.querySelectorAll('.fade-pop');
const heroName  = document.getElementById('heroName');
const nav       = document.getElementById('navbar');
const home      = document.getElementById('home');
const flipInner = document.getElementById('flipInner');
const scrollBtn = document.getElementById('scrollTopBtn');
let lastScroll  = 0;

/* ===================== PAGE LOAD ===================== */
window.addEventListener('load', () => {

  fadeTexts.forEach(el => el.classList.add('show'));
  pops.forEach(el => el.classList.add('show'));

  if (heroName) {
    heroName.style.opacity   = '1';
    heroName.style.transform = 'translateY(0)';
  }

  // Animate stat counters
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current  = 0;
    const step = () => {
      if (current < target) {
        current++;
        el.textContent = current + '+';
        setTimeout(step, 100);
      }
    };
    setTimeout(step, 800);
  });

  // Animate skill bars on load
  setTimeout(() => {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 600);

});

/* ===================== SCROLL ===================== */
window.addEventListener('scroll', () => {

  const current = window.scrollY;
  const homeTop = home.getBoundingClientRect().top;

  // Fade-in elements as they enter viewport
  fadeTexts.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 120) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });

  // Re-trigger skill bars when About section scrolls into view
  const aboutSection = document.getElementById('about');
  if (aboutSection && aboutSection.getBoundingClientRect().top < window.innerHeight - 100) {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }

  // Hide / show navbar on scroll direction
  if (current > lastScroll && current > 150) {
    nav.classList.add('nav-close');
  } else {
    if (homeTop > -200) nav.classList.remove('nav-close');
  }
  lastScroll = current;

  // Scroll-to-top button
  scrollBtn.classList.toggle('show', window.scrollY > 300);

});

/* ===================== SCROLL TOP BUTTON ===================== */
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===================== IMAGE FLIP (every 5s) ===================== */
setInterval(() => {
  if (flipInner) flipInner.classList.toggle('flip');
}, 5000);

/* ===================== PROJECT MODALS ===================== */
function openProject1()  { document.getElementById('projectModal1').style.display = 'flex'; }
function closeProject1() { document.getElementById('projectModal1').style.display = 'none'; }
function openProject2()  { document.getElementById('projectModal2').style.display = 'flex'; }
function closeProject2() { document.getElementById('projectModal2').style.display = 'none'; }

/* ===================== CONTACT POPUP ===================== */
function openContact()  { document.getElementById('contactPopup').style.display = 'flex'; }
function closeContact() { document.getElementById('contactPopup').style.display = 'none'; }

/* Close on outside click */
window.onclick = function(e) {
  if (e.target.id === 'projectModal1') closeProject1();
  if (e.target.id === 'projectModal2') closeProject2();
  if (e.target.id === 'contactPopup')  closeContact();
};

/* ===================== TYPING TEXT LOOP ===================== */
const typingEl = document.getElementById('typing');
if (typingEl) {
  const texts = [
    'Data Science Engineer',
    'AI / ML Engineer',
    'Data Science Enthusiast'
  ];
  let ti = 0, ci = 0, del = false;

  function typeLoop() {
    const cur = texts[ti];
    if (!del) {
      typingEl.textContent = cur.substring(0, ci + 1);
      ci++;
      if (ci === cur.length) { del = true; setTimeout(typeLoop, 1200); return; }
    } else {
      typingEl.textContent = cur.substring(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(typeLoop, del ? 40 : 80);
  }
  typeLoop();
}

/* ===================== NEURAL BACKGROUND CANVAS ===================== */
const canvas = document.getElementById('neural-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.8,
      vy:    (Math.random() - 0.5) * 0.8,
      size:  Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2
    });
  }

  const mouse = { x: null, y: null };
  window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x     += p.vx;
      p.y     += p.vy;
      p.pulse += 0.02;

      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      const alpha = 0.4 + 0.3 * Math.sin(p.pulse);

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(156,255,0,${alpha})`;
      ctx.fill();

      // Soft glow on larger particles
      if (p.size > 2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(156,255,0,0.03)';
        ctx.fill();
      }

      // Draw lines between nearby particles
      particles.forEach((p2, j) => {
        if (j <= i) return;
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(156,255,0,${(1 - dist / 120) * 0.12})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      });

      // Lines toward mouse cursor
      if (mouse.x) {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(156,255,0,${(1 - dist / 200) * 0.3})`;
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ===================== SMOOTH ANCHOR SCROLL ===================== */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
