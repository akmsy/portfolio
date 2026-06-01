/* =============================================
   PORTFOLIO AY — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll-triggered animations ── */
  const animEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings in same parent
        const siblings = [...entry.target.parentElement.querySelectorAll(
          '.fade-up, .fade-left, .fade-right'
        )];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 70}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  animEls.forEach(el => observer.observe(el));

  /* ── Hero elements show immediately ── */
  document.querySelectorAll('.hero .fade-up, .hero .fade-left, .hero .fade-right')
    .forEach((el, i) => {
      el.style.transitionDelay = `${i * 100}ms`;
      el.classList.add('visible');
    });

  /* ── Navbar scroll shrink ── */
  const navbar = document.querySelector('.navbar-custom');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.padding = '8px 0';
      navbar.style.boxShadow = '0 2px 20px rgba(180,130,120,.1)';
    } else {
      navbar.style.padding = '14px 0';
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--rose-deep)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Smooth scroll for internal anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile menu
      const navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse && navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
      }
    });
  });

  /* ── Skill cards stagger on hover row ── */
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.zIndex = '2';
    });
    card.addEventListener('mouseleave', function () {
      this.style.zIndex = '';
    });
  });

  /* ── Counter animation for stats ── */
  const countEls = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 35);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countEls.forEach(el => countObserver.observe(el));

  /* ── Cursor glow (desktop only) ── */
  if (window.innerWidth > 992) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(232,180,184,.09) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity .3s;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
  }

});
