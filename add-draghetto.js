const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'libro-1/index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Sostituisci tutte le chiusure pagina senza draghetto
const pattern = /(<div class="page-number">\d+<\/div>)\n  <\/div>/g;
const replacement = '$1\n    <img src="./images/draghetto-small.png" alt="Elliott" class="draghetto-decorator">\n  </div>';

content = content.replace(pattern, replacement);

fs.writeFileSync(filePath, content);
console.log('✅ Draghetto aggiunto a tutte le pagine!');
