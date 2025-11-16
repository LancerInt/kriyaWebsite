(function () {
  const body = document.body;
  const preloader = document.getElementById('preloader');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const dropdowns = document.querySelectorAll('.dropdown');
  const categoryItems = document.querySelectorAll('.category-item');
  const tooltipTargets = document.querySelectorAll('[data-tooltip]');
  const backToTop = document.getElementById('backToTop');
  const downloadButtons = document.querySelectorAll('.variant-link[data-file]');
  const revealBlocks = document.querySelectorAll('.reveal');
  const mailtoForms = document.querySelectorAll('[data-mailto-form]');

  /* Preloader */
  window.addEventListener('load', () => {
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 600);
    }
  });

  /* Mobile nav */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      body.classList.toggle('nav-open');
    });

    navMenu.addEventListener('click', (e) => {
      if (e.target.matches('.nav-link')) {
        navMenu.classList.remove('active');
        body.classList.remove('nav-open');
      }
    });
  }

  /* Dropdown handling */
  const closeDropdowns = () => dropdowns.forEach((drop) => drop.classList.remove('active'));

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.dropbtn');
    if (!trigger) return;

    let closeTimeout;

    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        clearTimeout(closeTimeout);
        closeDropdowns();
        dropdown.classList.add('active');
      }
    });

    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        closeTimeout = setTimeout(() => dropdown.classList.remove('active'), 150);
      }
    });

    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const isActive = dropdown.classList.contains('active');
        closeDropdowns();
        if (!isActive) {
          dropdown.classList.add('active');
        }
      }
    });
  });

  /* Category submenu */
  categoryItems.forEach((item) => {
    const link = item.querySelector('.category-link');
    if (!link) return;

    link.addEventListener('click', (e) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        categoryItems.forEach((i) => i !== item && i.classList.remove('active'));
        item.classList.toggle('active');
      }
    });
  });

  /* Tooltip */
  if (tooltipTargets.length) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    let activeEl = null;

    const showTooltip = (el) => {
      tooltip.textContent = el.getAttribute('data-tooltip');
      const rect = el.getBoundingClientRect();
      tooltip.style.left = `${rect.right + 12}px`;
      tooltip.style.top = `${rect.top + rect.height / 2}px`;
      tooltip.classList.add('visible');
      activeEl = el;
    };

    const hideTooltip = () => {
      tooltip.classList.remove('visible');
      activeEl = null;
    };

    tooltipTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => showTooltip(el));
      el.addEventListener('mouseleave', hideTooltip);
      el.addEventListener('mousemove', (e) => {
        if (activeEl === el) {
          tooltip.style.left = `${e.pageX + 14}px`;
          tooltip.style.top = `${e.pageY - 10}px`;
        }
      });
    });

    window.addEventListener('scroll', () => {
      if (activeEl) hideTooltip();
    });
  }

  /* Scroll reveal */
  if ('IntersectionObserver' in window && revealBlocks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealBlocks.forEach((block) => observer.observe(block));
  } else {
    revealBlocks.forEach((block) => block.classList.add('revealed'));
  }

  /* Back to top */
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Variant downloads */
  downloadButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const file = btn.getAttribute('data-file');
      if (file) {
        window.open(file, '_blank', 'noopener');
      }
    });
  });

  /* Mailto forms */
  mailtoForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const subject = encodeURIComponent(formData.get('subject') || 'Contact Sales Request');
      const lines = [];
      for (const [key, value] of formData.entries()) {
        if (key !== 'subject' && value) {
          lines.push(`${key}: ${value}`);
        }
      }
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:info@kriya.ltd?subject=${subject}&body=${body}`;
      form.reset();
    });
  });
})();
