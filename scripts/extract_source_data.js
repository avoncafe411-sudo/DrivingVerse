const fs = require('fs');
const path = require('path');

const scriptText = fs.readFileSync(path.resolve('js', 'script.js'), 'utf8');
const gamesArrayMatch = scriptText.match(/const games = \[([\s\S]*?)\];/m);
if (!gamesArrayMatch) throw new Error('Could not extract games array from js/script.js');
const objectTexts = Array.from(gamesArrayMatch[1].matchAll(/\{[\s\S]*?\}(?=\s*,|\s*$)/g)).map((m) => m[0]);
const games = objectTexts.map((objText) => {
  const get = (key) => {
    const match = objText.match(new RegExp(`${key}:\\s*'([^']*)'`, 'i'));
    return match ? match[1] : undefined;
  };
  const game = {
    title: get('title'),
    category: get('category'),
    description: get('description'),
    image: get('image'),
    link: get('link'),
    rating: get('rating'),
    buttonText: get('buttonText'),
    featured: /featured:\s*true/.test(objText),
    trending: /trending:\s*true/.test(objText),
    recent: /recent:\s*true/.test(objText),
    popular: /popular:\s*true/.test(objText),
  };
  return game;
});

const upgradeText = fs.readFileSync(path.resolve('upgrade_game_pages.js'), 'utf8');
const feedMatch = upgradeText.match(/const feed = JSON\.parse\(`([\s\S]*?)`\)/m);
let feed = [];
if (feedMatch) {
  try {
    feed = JSON.parse(feedMatch[1]);
  } catch (err) {
    console.error('Feed JSON parse failed', err.message);
  }
}

console.log(JSON.stringify({ parsedGames: games, feedCount: feed.length, feedKeys: feed.slice(0, 5).map(g => ({title:g.title,id:g.id,url:g.url})) }, null, 2));
