const fs = require('fs');
const path = require('path');
const errors = [];
const read = (p) => fs.readFileSync(p, 'utf8');
const projectRoot = process.cwd();
const expectIndex = ['js/script.js', 'css/style.css'];
expectIndex.forEach((p) => {
  if (!fs.existsSync(p)) errors.push(`${p} missing`);
});
const indexHtml = read('index.html');
['featuredGames', 'trendingGames', 'recentGames', 'popularGames'].forEach((id) => {
  if (!indexHtml.includes(`id="${id}"`)) errors.push(`index.html missing ${id}`);
});
const style = read('css/style.css');
['.games-grid', '.game-card', '.game-card__footer', '.badge', '.play-button'].forEach((sel) => {
  if (!style.includes(sel)) errors.push(`css/style.css missing ${sel}`);
});
const script = read('js/script.js');
try {
  new Function(script);
} catch (err) {
  errors.push(`js/script.js syntax error: ${err.message}`);
}
const gameFiles = fs.readdirSync('games').filter((f) => f.endsWith('.html'));
if (!gameFiles.length) errors.push('no games/*.html files found');
gameFiles.forEach((filename) => {
  const txt = read(path.join('games', filename));
  if (!txt.includes('id="gamePlayerPlaceholder"')) errors.push(`${filename} missing placeholder`);
  if (!txt.includes('id="playGameButton"')) errors.push(`${filename} missing play button`);
  if (txt.includes('<iframe') && txt.includes('gamemonetize') && !txt.includes('gd_sdk_referrer_url')) errors.push(`${filename} iframe missing gd_sdk_referrer_url`);
  if (!txt.includes('window.games')) errors.push(`${filename} missing related games data`);
});
['pages/about.html','pages/contact.html','pages/privacy.html','pages/terms.html','pages/dmca.html','pages/disclaimer.html'].forEach((p) => {
  if (!fs.existsSync(p)) errors.push(`${p} missing`);
});
if (errors.length) {
  console.log('FOUND ERRORS:');
  errors.forEach((e) => console.log('- ' + e));
  process.exit(1);
}
console.log('site validation passed');
