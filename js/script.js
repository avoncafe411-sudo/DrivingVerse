// DrivingVerse interaction layer
const appState = {
  currentCategory: 'All',
  searchTerm: '',
};

const games = [
  {
    title: 'Turbo Drift Arena',
    category: 'Racing',
    rating: '4.9',
    description: 'High-speed street battles with sharp turns and immersive neon visuals.',
    image: 'images/game-placeholder.svg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
  },
  {
    title: 'Mountain Offroad Rush',
    category: 'Off-road',
    rating: '4.8',
    description: 'Conquer rugged terrain and survive treacherous mountain paths.',
    image: 'images/game-placeholder.svg',
    featured: true,
    trending: true,
    recent: false,
    popular: true,
  },
  {
    title: 'City Parking Master',
    category: 'Parking',
    rating: '4.7',
    description: 'Precision parking challenges with realistic controls and tight spaces.',
    image: 'images/game-placeholder.svg',
    featured: true,
    trending: false,
    recent: true,
    popular: true,
  },
  {
    title: 'Metro Bus Simulator',
    category: 'Bus',
    rating: '4.6',
    description: 'Drive a fully loaded city bus through busy routes and delays.',
    image: 'images/game-placeholder.svg',
    featured: false,
    trending: true,
    recent: true,
    popular: false,
  },
  {
    title: 'Heavy Haul Truck',
    category: 'Truck',
    rating: '4.8',
    description: 'Transport cargo across long roads with realistic truck handling.',
    image: 'images/game-placeholder.svg',
    featured: false,
    trending: true,
    recent: false,
    popular: true,
  },
  {
    title: 'Street Bike Fury',
    category: 'Bike',
    rating: '4.5',
    description: 'A fast-paced two-wheel adventure with slick stunt opportunities.',
    image: 'images/game-placeholder.svg',
    featured: false,
    trending: false,
    recent: true,
    popular: false,
  },
  {
    title: 'Police Chase Pursuit',
    category: 'Police',
    rating: '4.9',
    description: 'Engage in action-packed chases with tactical police driving.',
    image: 'images/game-placeholder.svg',
    featured: false,
    trending: false,
    recent: true,
    popular: true,
  },
  {
    title: 'Harvest Tractor Dash',
    category: 'Tractor',
    rating: '4.4',
    description: 'A relaxed yet charming farm route with tractor customization.',
    image: 'images/game-placeholder.svg',
    featured: false,
    trending: false,
    recent: false,
    popular: false,
  },
  {
    title: 'Speedline Coupe',
    category: 'Car',
    rating: '4.7',
    description: 'Classic coupe racing with clean controls and polished visuals.',
    image: 'images/game-placeholder.svg',
    featured: true,
    trending: false,
    recent: true,
    popular: true,
  },
];

function filterGames() {
  const normalizedSearch = appState.searchTerm.trim().toLowerCase();
  const categoryMatch = appState.currentCategory === 'All' || game => game.category === appState.currentCategory;

  const visibleGames = games.filter((game) => {
    const matchesCategory = appState.currentCategory === 'All' ? true : game.category === appState.currentCategory;
    const matchesSearch = !normalizedSearch || `${game.title} ${game.category} ${game.description}`.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return visibleGames;
}

function createGameCard(game) {
  const card = document.createElement('article');
  card.className = 'game-card';
  card.innerHTML = `
    <img src="${game.image}" alt="${game.title} thumbnail" loading="lazy" />
    <div class="game-card__content">
      <div class="game-card__top">
        <h3>${game.title}</h3>
        <span class="badge">${game.category}</span>
      </div>
      <div class="meta-row">
        <span class="rating">★ ${game.rating}</span>
        <span>${game.category}</span>
      </div>
      <p>${game.description}</p>
      <div class="game-card__footer">
        <a href="#" aria-label="Play ${game.title}">Play now</a>
      </div>
    </div>
  `;
  return card;
}

function renderGames(containerId, source) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filtered = filterGames().filter((game) => source(game));
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
