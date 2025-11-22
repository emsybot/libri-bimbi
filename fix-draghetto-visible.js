const fs = require('fs');

const file = 'libro-1/index.html';
let content = fs.readFileSync(file, 'utf-8');

// Rimuovi aria-hidden="true" dai draghetto
content = content.replace(/alt="" aria-hidden="true" class="draghetto-decorator"/g, 'alt="" class="draghetto-decorator"');

fs.writeFileSync(file, content);
console.log('✅ Rimosso aria-hidden dai draghetto - ora sono visibili');
