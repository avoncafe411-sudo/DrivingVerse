const fs = require('fs');
const path = require('path');
const dir = path.resolve('games');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
const games = [];
for (const file of files) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8');
  const slug = file.replace(/\.html$/, '');
  const titleMatch = text.match(/<h1[^>]*class="game-title"[^>]*>([^<]+)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  const categoryMatch = text.match(/<span[^>]*class="badge-pill"[^>]*>([^<]+)<\/span>/i);
  const category = categoryMatch ? categoryMatch[1].trim() : 'Driving';
  const imageMatch = text.match(/<div[^>]*class="game-frame__placeholder"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i);
  const image = imageMatch ? imageMatch[1] : 'images/game-placeholder.svg';
  const descriptionMatch = text.match(/<section[^>]*aria-labelledby="description-title"[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  const controlsMatch = text.match(/<section[^>]*aria-labelledby="controls-title"[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  const controls = controlsMatch ? controlsMatch[1].trim() : '';
  const playButtonMatch = text.match(/<button[^>]*id="playGameButton"[^>]*>([^<]+)<\/button>/i);
  const playLabel = playButtonMatch ? playButtonMatch[1].trim() : 'PLAY GAME';
  const detailUrl = `games/${file}`;
  const iframeSrcMatch = text.match(/const iframeHtml = ([\s\S]*?);\s*if \(playButton/i);
  let url = '';
  if (iframeSrcMatch) {
    const scriptValue = iframeSrcMatch[1];
    const srcMatch = scriptValue.match(/src=\\"([^\\"]+)\\"/i);
    if (srcMatch) {
      url = srcMatch[1];
    } else {
      const altSrcMatch = scriptValue.match(/src="([^"]+)"/i);
      url = altSrcMatch ? altSrcMatch[1] : '';
    }
  }
  if (!url) {
    const iframeMatch = text.match(/<iframe[^>]*src="([^"]+)"/i);
    if (iframeMatch) url = iframeMatch[1];
  }
  games.push({
    slug,
    title,
    category,
    image,
    description,
    controls,
    detailUrl,
    url,
    playLabel,
    rating: '4.5'
  });
}
console.log(JSON.stringify(games, null, 2));
