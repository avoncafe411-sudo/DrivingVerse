// DrivingVerse interaction layer
const appState = {
  currentCategory: 'All',
  searchTerm: '',
};

const games = window.games || [];

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function filterGames() {
  const normalizedSearch = appState.searchTerm.trim().toLowerCase();
  const categoryFilter = appState.currentCategory.toLowerCase();

  return games.filter((game) => {
    const matchesCategory =
      appState.currentCategory === 'All' ||
      [game.category, game.title, game.description]
        .map((value) => String(value || '').toLowerCase())
        .some((text) => text.includes(categoryFilter));

    const matchesSearch =
      !normalizedSearch ||
      `${game.title || ''} ${game.category || ''} ${game.description || ''}`
        .toLowerCase()
        .includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

function createGameCard(game) {
  const ratingValue = game.rating || '4.5';
  const href = game.link || game.detailUrl || '#';
  const buttonText = game.buttonText || 'Play Now';

  const card = document.createElement('article');
  card.className = 'game-card';
  card.innerHTML = `
    <img src="${escapeHtml(game.image || 'images/game-placeholder.svg')}" alt="${escapeHtml(game.title)} thumbnail" loading="lazy" />
    <div class="game-card__content">
      <div class="game-card__top">
        <h3>${escapeHtml(game.title)}</h3>
        <span class="badge">${escapeHtml(game.category || 'Driving')}</span>
      </div>
      <div class="meta-row">
        <span class="rating">⭐ ${escapeHtml(ratingValue)}</span>
      </div>
      <div class="game-card__footer">
        <a href="${escapeHtml(href)}" aria-label="Play ${escapeHtml(game.title)}">${escapeHtml(buttonText)}</a>
      </div>
    </div>
  `;

  return card;
}

function renderGames(containerId, predicate) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filtered = filterGames().filter((game) => predicate(game));
  container.innerHTML = '';

  if (!filtered.length) {
    container.innerHTML = '<div class="empty-state">No games match this search yet.</div>';
    return;
  }

  filtered.forEach((game) => container.appendChild(createGameCard(game)));
}

function renderAllSections() {
  renderGames('featuredGames', (game) => game.featured);
  renderGames('trendingGames', (game) => game.trending);
  renderGames('recentGames', (game) => game.recent);
  renderGames('popularGames', (game) => game.popular);
}

function setActiveCategoryButtons() {
  document.querySelectorAll('.category-chip').forEach((button) => {
    button.classList.toggle('active', button.dataset.category === appState.currentCategory);
  });
}

function handleCategorySelection(event) {
  const target = event.target.closest('.category-chip');
  if (!target) return;
  appState.currentCategory = target.dataset.category;
  setActiveCategoryButtons();
  renderAllSections();
}

function handleSearchInput(event) {
  appState.searchTerm = event.target.value;
  renderAllSections();
}

function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNavigation');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}

function initScrollTop() {
  const scrollButton = document.getElementById('scrollTop');
  if (!scrollButton) return;

  const toggleVisibility = () => {
    scrollButton.classList.toggle('visible', window.scrollY > 480);
  };

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
}

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const toggleHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  window.addEventListener('scroll', toggleHeader, { passive: true });
  toggleHeader();
}

function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const root = document.documentElement;
  const savedTheme = localStorage.getItem('drivingverse-theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    toggle.querySelector('span').textContent = savedTheme === 'light' ? '☾' : '☀';
  }

  toggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('drivingverse-theme', nextTheme);
    toggle.querySelector('span').textContent = nextTheme === 'light' ? '☾' : '☀';
  });
}

function init() {
  renderAllSections();
  setActiveCategoryButtons();
  initMenu();
  initScrollTop();
  initStickyHeader();
  initThemeToggle();

  document.querySelector('.category-grid')?.addEventListener('click', handleCategorySelection);
  document.querySelector('.search-bar input')?.addEventListener('input', handleSearchInput);
}

document.addEventListener('DOMContentLoaded', init);
