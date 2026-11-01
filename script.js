(() => {
  const root = document.documentElement;

  // Years of experience, counted from June 2015
  const start = new Date(2015, 5, 1);
  const years = Math.floor((Date.now() - start) / (365.25 * 24 * 3600 * 1000));
  document.querySelectorAll('[data-years]').forEach((el) => { el.textContent = years; });
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle
  const isDark = () =>
    root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;

  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Header border once scrolled
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Highlight the nav link for the section in view
  const links = new Map(
    [...document.querySelectorAll('.nav-links a')].map((a) => [a.getAttribute('href').slice(1), a])
  );
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove('active'));
        links.get(entry.target.id)?.classList.add('active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });

  // Fade sections in as they scroll into view
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.job, .project, .stat, .skill-group').forEach((el) => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  // Copy email
  const copyBtn = document.querySelector('.copy-btn');
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
      copyBtn.textContent = 'Copied!';
    } catch (e) {
      copyBtn.textContent = 'Press ⌘C';
    }
    setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
  });
})();
