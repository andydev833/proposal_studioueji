/* ============================================
   スタジオうえじ様向け 提案書Webページ
   JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Intersection Observer for fade-in ---
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach((el) => fadeObserver.observe(el));

  // --- Side Navigation active state ---
  const sideNavItems = document.querySelectorAll('.side-nav__item');
  const sections = [];

  sideNavItems.forEach((item) => {
    const sectionId = item.getAttribute('data-section');
    const sectionEl = document.getElementById(sectionId);
    if (sectionEl) {
      sections.push({ id: sectionId, el: sectionEl, navItem: item });
    }
  });

  const updateActiveNav = () => {
    const scrollY = window.scrollY + window.innerHeight * 0.35;

    let activeSection = sections[0];

    for (const section of sections) {
      if (section.el.offsetTop <= scrollY) {
        activeSection = section;
      }
    }

    sideNavItems.forEach((item) => item.classList.remove('is-active'));
    if (activeSection) {
      activeSection.navItem.classList.add('is-active');
    }
  };

  // Throttled scroll handler
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateActiveNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  updateActiveNav();

  // --- Mobile Navigation ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        mobileToggle.textContent = '☰';
        mobileToggle.setAttribute('aria-label', 'メニューを開く');
      });
    });
  }

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = window.innerWidth <= 768 ? 60 : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
