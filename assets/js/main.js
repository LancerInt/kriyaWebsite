const navToggle = document.querySelector('#nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const backToTop = document.querySelector('#back-to-top');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const toggleBackToTop = () => {
    const isVisible = window.scrollY > 400;
    backToTop.style.opacity = isVisible ? '1' : '0';
    backToTop.style.visibility = isVisible ? 'visible' : 'hidden';
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);
}

const revealItems = document.querySelectorAll('[data-reveal]');
if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}
