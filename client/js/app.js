(() => {
  'use strict';

  const log = (level, message, ctx) => {
    const ts = new Date().toISOString();
    const fn = console[level] || console.log;
    fn(`[${ts}] [${level}] ${message}`, ctx || '');
  };

  const onReady = (fn) => {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };

  const initStickyHeader = () => {
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  const initMobileNav = () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-mobile');
    if (!toggle || !menu) return;

    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.hidden = true;
      document.body.classList.remove('menu-open');
    };

    const open = () => {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      menu.hidden = false;
      menu.style.display = 'block';
      document.body.classList.add('menu-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        close();
      } else {
        open();
      }
    });

    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', close);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  };

  const initRevealOnScroll = () => {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll(
      '.section__head, .gallery__item, .service, .journal__item, .split__media, .split__text, .contact__card'
    );
    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1)';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));
  };

  const initYear = () => {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  };

  const initSmoothAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 56;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  };

  onReady(() => {
    try {
      initStickyHeader();
      initMobileNav();
      initRevealOnScroll();
      initSmoothAnchors();
      initYear();
      log('info', 'aneria.gr client ready', { url: window.location.href });
    } catch (err) {
      log('error', 'init failed', { message: err.message, stack: err.stack });
    }
  });
})();
