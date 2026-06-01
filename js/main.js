// Theme toggle
(function () {
  const STORAGE_KEY = 'theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    const theme = getSavedTheme();
    applyTheme(theme);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
      });
    }

    // Mark active nav link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      if (link.href === window.location.href) link.classList.add('active');
    });

    // Week schedule tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length) {
      tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
          document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');
          document.getElementById('tab-' + this.dataset.tab).classList.add('active');
        });
      });
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        const open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open);
      });
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
        });
      });
    }
  });
})();
