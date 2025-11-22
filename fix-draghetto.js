const fs = require('fs');

const file = 'libro-1/index.html';
let content = fs.readFileSync(file, 'utf-8');

const oldPattern = 'alt="Elliott" class="draghetto-decorator"';
const newPattern = 'alt="" aria-hidden="true" class="draghetto-decorator"';

content = content.split(oldPattern).join(newPattern);

fs.writeFileSync(file, content);
console.log('✅ Tutti i draghetto aggiornati con aria-hidden');
