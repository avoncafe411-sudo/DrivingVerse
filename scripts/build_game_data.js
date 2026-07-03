const fs = require('fs');
const path = require('path');
const scriptText = fs.readFileSync(path.resolve('js', 'script.js'), 'utf8');
const gamesArrayMatch = scriptText.match(/const games = \[([\s\S]*?)\];/m);
const gamesFromScript = [];
if (!gamesArrayMatch) throw new Error('Could not extract games array from js/script.js');
const objectTexts = Array.from(gamesArrayMatch[1].matchAll(/\{[\s\S]*?\}(?=\s*,|\s*$)/g)).map((m) => m[0]);
for (const objText of objectTexts) {
  const get = (key) => {
    const match = objText.match(new RegExp(`${key}:\\s*'([^']*)'`, 'i'));
    return match ? match[1] : undefined;
  };
  const slug = get('link') ? path.basename(get('link'), '.html') : undefined;
  gamesFromScript.push({
    title: get('title')?.trim(),
    category: get('category')?.trim(),
    description: get('description')?.trim(),
    image: get('image')?.trim(),
    link: get('link')?.trim(),
    slug,
    rating: get('rating')?.trim() || '4.5',
    buttonText: get('buttonText')?.trim() || 'Play Now',
    featured: /featured:\s*true/.test(objText),
    trending: /trending:\s*true/.test(objText),
    recent: /recent:\s*true/.test(objText),
    popular: /popular:\s*true/.test(objText),
  });
}
const gameFiles = fs.readdirSync(path.resolve('games')).filter((f) => f.endsWith('.html'));
const gamesFromPages = [];
for (const file of gameFiles) {
  const text = fs.readFileSync(path.resolve('games', file), 'utf8');
  const slug = file.replace(/\.html$/, '');
  const titleMatch = text.match(/<h1[^>]*class="game-title"[^>]*>([^<]+)<\/i);
  const title = titleMatch ? titleMatch[1].trim() : undefined;
  const categoryMatch = text.match(/<span[^>]*class="badge-pill"[^>]*>([^<]+)<\/i);
  const category = categoryMatch ? categoryMatch[1].trim() : undefined;
  const imageMatch = text.match(/<div[^>]*class="game-frame__placeholder"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i);
  const image = imageMatch ? imageMatch[1] : undefined;
  const descriptionMatch = text.match(/<h2 id="description-title">[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  const description = descriptionMatch ? descriptionMatch[1].trim() : undefined;
  const controlsMatch = text.match(/<h2 id="controls-title">[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  const controls = controlsMatch ? controlsMatch[1].trim() : undefined;
  const iframeMatch = text.match(/<iframe[^>]*src="([^"]+)"/i);
  const url = iframeMatch ? iframeMatch[1] : undefined;
  gamesFromPages.push({ slug, title, category, image, description, controls, url, detailUrl: `games/${file}` });
}
const merged = gamesFromScript.map((scriptGame) => {
  const pageGame = gamesFromPages.find((g) => g.slug === scriptGame.slug);
  return {
    slug: scriptGame.slug || pageGame?.slug,
    title: scriptGame.title || pageGame?.title,
    category: scriptGame.category || pageGame?.category || 'Driving',
    image: scriptGame.image || pageGame?.image || 'images/game-placeholder.svg',
    description: scriptGame.description || pageGame?.description || '',
    controls: pageGame?.controls || '',
    url: pageGame?.url || '',
    detailUrl: pageGame?.detailUrl || scriptGame.link || '',
    rating: scriptGame.rating || '4.5',
    buttonText: scriptGame.buttonText,
    featured: scriptGame.featured,
    trending: scriptGame.trending,
    recent: scriptGame.recent,
    popular: scriptGame.popular,
  };
});
fs.writeFileSync(path.resolve('scripts', 'parsed_games.json'), JSON.stringify(merged, null, 2), 'utf8');
console.log('Wrote scripts/parsed_games.json with', merged.length, 'entries');
