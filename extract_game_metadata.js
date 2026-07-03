const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('games').filter((f) => f.endsWith('.html'));
const games = [];
for (const file of files) {
  const text = fs.readFileSync(path.join('games', file), 'utf8');
  const titleMatch = text.match(/<title>([^<]+)<\/i);
  const title = titleMatch ? titleMatch[1].replace(/\s*\|.*$/, '').trim() : '';
  const descMatch = text.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  const description = descMatch ? descMatch[1].trim() : '';
  const categoryMatch = text.match(/<span class="badge-pill">([^<]+)<\/i);
  const category = categoryMatch ? categoryMatch[1].trim() : '';
  const imgMatch = text.match(/<img src="([^"]+)" alt="[^"]*thumbnail"/i);
  const image = imgMatch ? imgMatch[1] : '';
  const iframeSrcMatch = text.match(/<iframe[^>]*src="([^"]+)"/i);
  const url = iframeSrcMatch ? iframeSrcMatch[1] : '';
  const instructionsMatch = text.match(/<section class="section game-section" aria-labelledby="how-to-play-title">[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  const instructions = instructionsMatch ? instructionsMatch[1].trim() : '';
  const slug = file.replace(/\.html$/, '');
  const ratingMatch = text.match(/<span class="badge-pill">[^<]+<\/i); // not great
  games.push({ file, slug, title, description, category, image, url, instructions });
}
console.log(JSON.stringify(games, null, 2));
