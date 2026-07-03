const fs = require('fs');
const path = require('path');
const scriptText = fs.readFileSync(path.resolve('js', 'script.js'), 'utf8');
const gamesArrayMatch = scriptText.match(/const games = \[([\s\S]*?)\];/m);
const gamesFromScript = [];
if (gamesArrayMatch) {
  const objectTexts = Array.from(gamesArrayMatch[1].matchAll(/\{[\s\S]*?\}(?=\s*,|\s*$)/g)).map(m => m[0]);
  for (const objText of objectTexts) {
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
    gamesFromScript.push(game);
  }
}
const upgradeText = fs.readFileSync(path.resolve('upgrade_game_pages.js'), 'utf8');
const feedMatch = upgradeText.match(/const feed = JSON\.parse\(`([\s\S]*?)`\)/m);
let feed = [];
if (feedMatch) {
  const jsonText = feedMatch[1];
  try {
    feed = JSON.parse(jsonText);
  } catch (err) {
    console.error('Failed to parse feed JSON:', err.message);
  }
}
const gameFiles = fs.readdirSync(path.resolve('games')).filter((f) => f.endsWith('.html'));
const gamesFromPages = [];
for (const file of gameFiles) {
  const filePath = path.resolve('games', file);
  const text = fs.readFileSync(filePath, 'utf8');
  const titleMatch = text.match(/<h1[^>]*class="game-title"[^>]*>([^<]+)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].trim() : undefined;
  const categoryMatch = text.match(/<span[^>]*class="badge-pill"[^>]*>([^<]+)<\/span>/i);
  const category = categoryMatch ? categoryMatch[1].trim() : undefined;
  const imageMatch = text.match(/<div[^>]*class="game-frame__placeholder"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i);
  const image = imageMatch ? imageMatch[1] : undefined;
  const descMatch = text.match(/<section[^>]*aria-labelledby="description-title"[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  const description = descMatch ? descMatch[1].trim() : undefined;
  const controlsMatch = text.match(/<section[^>]*aria-labelledby="controls-title"[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  const controls = controlsMatch ? controlsMatch[1].trim() : undefined;
  let url;
  const iframeMatch = text.match(/<iframe[^>]*src="([^"]+)"/i);
  if (iframeMatch) {
    url = iframeMatch[1];
  } else {
    const iframeHtmlMatch = text.match(/const iframeHtml\s*=\s*(['"])([\s\S]*?)\1\s*;/i);
    if (iframeHtmlMatch) {
      const rawIframe = iframeHtmlMatch[2]
        .replace(/\\r\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
      const iframeSrcMatch = rawIframe.match(/src=["']([^"']+)["']/i);
      if (iframeSrcMatch) {
        url = iframeSrcMatch[1];
      }
    }
  }
  if (url && !url.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//) && !url.startsWith('/')) {
    url = path.posix.join('games', path.posix.dirname(file).replace('games/', ''), url);
  }
  const slug = file.replace(/\.html$/, '');
  gamesFromPages.push({ file, slug, title, category, image, description, controls, url });
}
const merged = gamesFromPages.map((pageGame) => {
  const scriptGame = gamesFromScript.find((g) => g.link === `games/${pageGame.file}` || (g.title && g.title.replace(/\s*\|.*$/, '').trim() === pageGame.title));
  const feedGame = feed.find((g) => g.title === pageGame.title);
  return {
    slug: pageGame.slug,
    title: pageGame.title,
    category: pageGame.category || scriptGame?.category || feedGame?.category || 'Driving',
    image: pageGame.image || scriptGame?.image || feedGame?.thumb || 'images/game-placeholder.svg',
    description: pageGame.description || scriptGame?.description || feedGame?.description || '',
    controls: pageGame.controls || scriptGame?.instructions || feedGame?.instructions || '',
    url: feedGame?.url || pageGame.url || '',
    detailUrl: `games/${pageGame.file}`,
    rating: scriptGame?.rating || '4.5',
    buttonText: scriptGame?.buttonText || 'Play Now',
    featured: scriptGame?.featured || false,
    trending: scriptGame?.trending || false,
    recent: scriptGame?.recent || false,
    popular: scriptGame?.popular || false,
    source: {
      fromScript: !!scriptGame,
      fromFeed: !!feedGame,
      fromPage: !!pageGame.url,
    },
  };
});
const output = { gamesFromScript, feedCount: feed.length, games: merged };
fs.writeFileSync(path.resolve('scripts', 'merged_games.json'), JSON.stringify(output, null, 2), 'utf8');
const jsData = `window.games = ${JSON.stringify(merged, null, 2)};\nwindow.gameData = window.games;\n`;
fs.writeFileSync(path.resolve('js', 'games-data.js'), jsData, 'utf8');
console.log('wrote scripts/merged_games.json');
console.log('wrote js/games-data.js');
