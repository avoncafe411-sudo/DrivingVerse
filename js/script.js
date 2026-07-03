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
    title: 'Fireboy and Watergirl',
    category: 'Racing',
    rating: '4.8',
    description: 'Play Fireboy and Watergirl online for free on DrivingVerse.',
    image: 'images/game-placeholder.svg',
    featured: true,
    trending: false,
    recent: true,
    popular: false,
    link: 'games/fireboy-and-watergirl.html',
    buttonText: 'Play Now',
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

{
  title: 'Speed Racer',
  category: 'Racing',
  rating: '4.7',
  description: 'Play Speed Racer online for free. Drive fast, avoid obstacles and survive as long as possible.',
  image: 'images/game-placeholder.svg',
  featured: true,
  trending: true,
  recent: true,
  popular: true,
  link: 'games/speed-racer.html',
  buttonText: 'Play Now',
},

{
  title: 'Drift Car Driving',
  category: 'Racing',
  rating: '4.9',
  description: 'High-speed drifting and highway racing with realistic driving.',
  image: 'https://img.gamemonetize.com/psaxcnaaudnghwtus0rvv9lsb3gczzxv/512x384.jpg',
  featured: true,
  trending: true,
  recent: true,
  popular: true,
  link: 'games/drift-car-driving.html',
  buttonText: 'Play Now',
},


  {
    title: 'Offroad Jeep Game: SUV Driving',
    category: 'Arcade',
    description: 'Offroad Jeep Game: SUV Driving is an exciting off-road driving simulator where you control powerful SUVs on challenging tracks. The game features 1 Career Mode with 7 thrilling levels. Each level includes checkpoint missions and racing challenges to test your driving skills. Drive through mountains, mud roads, hills, and city environments, reach checkpoints on time, and win intense races.',
    image: 'https://img.gamemonetize.com/anfamy8v3p1ko4723p7tj539utsyp00s/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/offroad-jeep-game-suv-driving.html',
    buttonText: 'Play Now',
  },

  {
    title: 'City Coach Driving Games 3d',
    category: 'Adventure',
    description: 'Start your journey in Easy Mode, featuring 5 engaging levels with 5 unique buses, each offering a different driving experience. Complete missions by picking up passengers from one location and safely dropping them off at their destination. Level 3 brings a special challenge with a night driving environment, where you must drive carefully in low visibility and ensure passenger safety. Game Features: Realistic city bus driving experience 5 unique buses to drive 5 challenging levels in Easy Mode Night driving mission (Level 3) Passenger pick and drop system Seat belt safety feature for immersive gameplay',
    image: 'https://img.gamemonetize.com/mjhc5jxshmoh78fem4yu3repbmoobhsy/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/city-coach-driving-games-3d.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Wrong Side Driving   Car Game',
    category: 'Racing',
    description: 'Wrong Side Driving is a fast-paced endless driving game where you take the ultimate risk — driving on the wrong side of the road! Dodge oncoming traffic, collect power-ups, and test your reflexes as the speed increases with every passing second. One mistake and it’s game over with a big crash explosion! Perfect for both casual players and thrill-seekers, this game guarantees endless fun and excitement.',
    image: 'https://img.gamemonetize.com/61jfjtg8j15v0mxqya1uzhjc1iftdah4/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/wrong-side-driving-car-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Offroad Truck Driving Simulator',
    category: 'Racing',
    description: 'Offroad Truck Driving Simulator is the ultimate off-road mud truck driving game and realistic car racing simulator! Experience stunning graphics, real driving physics, and a huge selection of 4x4 trucks with unique characteristics. Customize and tune your vehicles endlessly, conquer extreme obstacles, and complete dozens of offroad racing challenges, time trials, and dirt races. Enjoy real truck sounds, a simple in-game map, and epic open-road adventures. Fans of Snow Runner, Mud Runner, 4x4 Mania, and Offroad Outlaws will love this ultimate off-roading diesel truck simulator!',
    image: 'https://img.gamemonetize.com/bwrunfiqbjfxprp91bq5v0xhtqzmukno/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/offroad-truck-driving-simulator.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Parking Expert: Driving Exam',
    category: 'Arcade',
    description: 'Welcome to a game that will test your driving skills and turn you into a true parking master! You will face a variety of challenges — from parking in tight city spaces to maneuvering in complex conditions. Control your car, avoid obstacles, follow the rules, and prove that you deserve the title of the best driver! Game Features: • Realistic car physics for an immersive driving experience. • A wide variety of levels. • Engaging tasks inspired by real driving school exams. • Easy and intuitive controls suitable for both beginners and experienced players. Test your focus, precision, and agility in parking challenges. Every level is a new test',
    image: 'https://img.gamemonetize.com/3efo9ee8ez14ljclx20uake4khgruzf9/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/parking-expert-driving-exam.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Vice City Mad Driving',
    category: 'Racing',
    description: 'Vice City Mad Driving is an open city driving game where chaos meets freedom. Explore a neon city inspired by classic vice streets, drive fast cars, perform crazy stunts, smash through traffic, and cause mayhem with no rules holding you back. Jump into free roam driving, test your skills, and enjoy pure arcade madness directly in your browser.',
    image: 'https://img.gamemonetize.com/sjq4qrvuzt2vrxwh89cxxc02hhb9arst/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/vice-city-mad-driving.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Vehicle Driving Master Game',
    category: 'Adventure',
    description: 'Gear up for an exciting driving adventure in vehicle master driving 3d! This vehicle master car game isnt just about racing to the finish line; its about driving and parking the multiple vehicles on their designated spots with full care. From sports cars to heavy trucks, each vehicle feels unique with its own handling and challenges. Customize your city rides to match your style and become the real vehicle master 3d driver. Vehicle master 3d game is full of challenges of car parking and driving master. Jump into the vehicles driver seat and show your vehicle driving skills in city driver game.',
    image: 'https://img.gamemonetize.com/qarvyvvg2opieitmizdgb8aoik63t0jm/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/vehicle-driving-master-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Drift X Driving Car Game',
    category: 'Action',
    description: 'Welcome to the world of car drift and driving games. Get ready to ignite your engines, push the pedal to the metal, and drift like a pro in the most thrilling car drift and driving game ever. This is not just a driving simulator game, its an adrenaline-pumping, tire-squealing, smoke-flying experience that takes your car control skills to the next level. Whether you are into precision driving, freestyle drifting, or open world cruising, this game has something for every car enthusiast.',
    image: 'https://img.gamemonetize.com/1mf5gvj912ik2r7i0nkbfobb4ow3ax1t/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/drift-x-driving-car-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'School Bus Driving Game',
    category: 'Adventure',
    description: 'Are you ready to perform your driver duty as a 4x4 bus driver? If yes then this city high school bus is for you, where you can pick up and drop students at their school on time. The students are waiting for their school bus, pick them up, and drop them at the school. As a preschool bus driver, perform your summer camp school transportation service safely. In free school bus games, follow the traffic rules while driving high school coaches because it takes into consideration the lives of students and teachers. After school pickup service, you have to need drop students at their homes carefully.',
    image: 'https://img.gamemonetize.com/7zmhlham22sb3ndn5f69fqks9pnu9xv4/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/school-bus-driving-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Tractor Parking And Driving Game',
    category: 'Adventure',
    description: 'Welcome to the tractor parking driving game, the ultimate tractor driving and parking simulator made for everyone who loves realistic parking challenges. This game gives you the fun of parking powerful tractors on a beautiful highway environment with smooth roads and open spaces. It’s simple, relaxing, and full of interesting levels that test your patience, timing, and driving skills. This tractor game gives you a full real tractor driving and parking experience. You’ll learn how to control your vehicle properly in tight spaces, reverse park, and handle turns on smooth roads.',
    image: 'https://img.gamemonetize.com/15b7hdc6yr0f8mk95jgbx9b03q4q6c14/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/tractor-parking-and-driving-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'OffRoad Jeep Driving Game',
    category: 'Racing',
    description: 'Welcome to play offroad jeep driving simulator on impossible offroad tracks where you will show your driving skills and enjoy an off-road journey in the mountains area. SUV 4x4 offroad jeep driving simulator offline powerful engine Prado car games offroad drive simulator 2023 with your driving skills reach the target without destroying your mountain climb truck game offroad jeep games stunt racing game and keep your grip on the mountain hill roads and complete the missions that You are assigned as a professional uphill jeep simulator 3d offroad driver, Fast Jeep Wrangler simulator off-road 4x4 jeep driving games.',
    image: 'https://img.gamemonetize.com/l73y71zlm4347f4sw6y0key3hm7fepq2/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/offroad-jeep-driving-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'City Cargo Truck Driving Game',
    category: 'Adventure',
    description: 'Welcome to the city truck cargo game. Experience the thrill of driving a truck through a bustling city. Gear up for the ultimate cargo delivery adventure in City Cargo Truck Simulator, where you take the wheel of powerful trucks to transport cars in a bustling city. Navigate through heavy traffic, narrow streets, and tricky turns as you complete challenging delivery missions with precision and speed. Can you handle the pressure and become the top cargo truck driver in the city? Every mission requires skillful driving and precise parking. Feel the weight of your cargo as you drive.',
    image: 'https://img.gamemonetize.com/2t96bk2qy6gfeqe3wvcorrpkytk33rcf/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/city-cargo-truck-driving-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Emergency Ambulance Driving Game',
    category: 'Adventure',
    description: 'Welcome to the ambulance rescue simulator game! Are you ready to become a real-life hero? Take a seat and start your job in a fully modeled and realistic ambulance game. Ambulance rescue simulator game offers an exciting and educational experience. Navigate through busy city streets, rush to accident scenes, and transport patients safely to the hospital. Your mission is to drive fast, stay calm, and save lives! Get turn on the sirens, and show your emergency driving skills in this action-packed rescue game! Experience realistic engine sounds, emergency sirens, and heart-pounding rescue music as you race to save lives.',
    image: 'https://img.gamemonetize.com/ex0828f49g2pkh7v0v9ygdxxwwwoq69v/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/emergency-ambulance-driving-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Army Truck Driving Game',
    category: 'Adventure',
    description: 'The new offline games for boys. If youre looking for a top truck simulator army games. Then these are the best army truck driving simulator games. enjoy playing new games. the new game 2021 offline for boys. Drive your free army transport in these military truck games. Driving in the snow will be challenging in our new military truck driving game, which is top army racing game. New Truck simulator in the army is best truck Driving games offline. Play the new truck driving offline games. As an army truck driver in mission games, you have to be very careful as roads are very dangerous to drive but that’s what the Army Truck Simulator 2024 game',
    image: 'https://img.gamemonetize.com/w73g33vh2xbip5he0p67smokz0m79ewr/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/army-truck-driving-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Modern Bus Driving Game',
    category: 'Adventure',
    description: 'Welcome to the world of bus simulator games. Get ready to experience the thrill of driving a real modern bus driving simulator game. Drive your bus on bustling city streets, hilly mountain roads, and off road terrain in this realistic and immersive bus simulator game. Drive a variety of modern buses, complete routes, and transport passengers safely to their destinations. Whether you’re maneuvering through heavy traffic or cruising on scenic highways, every level delivers a unique and engaging driving experience.',
    image: 'https://img.gamemonetize.com/lomadsoeaa1xnnazl1vti18dul0vo66e/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/modern-bus-driving-game.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Euro Truck Driving Simulator',
    category: 'Racing',
    description: 'Welcome to the euro truck driving simulator game. Drive powerful trucks across highways and mountain roads in this realistic truck driving simulator game. Load cargo, follow traffic rules, and complete challenging delivery missions in detailed 3D environments. Hop in and drive your colorful truck through fun levels and easy roads Get ready for a relaxing and exciting ride with a euro truck game. Truck driving simulators made for fun! Drive cool trucks, complete easy cargo missions, and explore colorful roads in this enjoyable and easy-to-learn truck driving experience.',
    image: 'https://img.gamemonetize.com/oukqsx8lias75zxke9657cll9pe1dhly/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/euro-truck-driving-simulator.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Super Zombie Driving',
    category: 'Racing',
    description: 'Super Zombie Driving throws you straight into a post-apocalyptic city overrun by the undead, where your only mission is to survive behind the wheel. In this thrilling action-packed driving game, every street is filled with zombies, wrecked cars, and chaos. Choose your vehicle, start the engine, and get ready to crush your way through hordes of zombies as you complete missions to clean up the streets and earn rewards. Each level challenges you to smash a specific number of zombies before time runs out, pushing your reflexes and driving skills to the limit.',
    image: 'https://img.gamemonetize.com/v90vdwuzah53dm2037cu0wo74xep0dqe/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/super-zombie-driving.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Otr Off Road Driving',
    category: 'Racing',
    description: 'Love car games and a true off-road driving adventure? In OTR Off-road Driving, you will have a real vehicle simulation experience. Enter off-road mode, choose different levels to start your challenge. Challenge your driving skills in the mountains. Work your way up the steep hill to your destination. Enter the Flyover Bridge Mode, control your car to the bullseye and win. Pay attention to finish the task within the time.',
    image: 'https://img.gamemonetize.com/vpzq3xlp2ff0238wccv4nx91334kkpd6/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/otr-off-road-driving.html',
    buttonText: 'Play Now',
  },

  {
    title: 'Truck Driving Simulator offroad',
    category: 'Action',
    description: 'Experience the thrill of offroad trucking! Navigate rugged terrain, deliver cargo through challenging paths, and master powerful trucks in realistic environments. Conquer hills, mud, and rivers in this ultimate truck driving simulator adventure. Ready to drive? Web Dev https://www.crazygamesonline.com/',
    image: 'https://img.gamemonetize.com/a6i1ot5d0scwphehyrsl0vned0ezjk8q/512x384.jpg',
    featured: true,
    trending: true,
    recent: true,
    popular: true,
    link: 'games/truck-driving-simulator-offroad.html',
    buttonText: 'Play Now',
  },
];

function filterGames() {
  const normalizedSearch = appState.searchTerm.trim().toLowerCase();

  const visibleGames = games.filter((game) => {
    const matchesCategory =
      appState.currentCategory === 'All'
        ? true
        : game.category === appState.currentCategory;

    const matchesSearch =
      !normalizedSearch ||
      `${game.title} ${game.category} ${game.description}`
        .toLowerCase()
        .includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return visibleGames;
}

function createGameCard(game) {
  const ratingValue = game.rating ? game.rating : '4.5';
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
        <span class="rating">⭐ ${ratingValue}</span>
      </div>
      <div class="game-card__footer">
        <a href="${game.link || '#'}" aria-label="Play ${game.title}">${game.buttonText || 'Play Now'}</a>
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
