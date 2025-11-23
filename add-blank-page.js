// Script per aggiungere una pagina bianca prima della quarta di copertina
const fs = require('fs');

const htmlPath = './libro-1/index.html';
let content = fs.readFileSync(htmlPath, 'utf8');

// Trova la posizione della quarta di copertina (BACK COVER - BOOKMARK PAGE)
const backCoverComment = '  <!-- BACK COVER - BOOKMARK PAGE -->';
const blankPageToAdd = `  <!-- ADDITIONAL BLANK PAGE - Per raggiungere 32 pagine (multiplo di 4) -->\r\n  <div class="page blank-page">\r\n  </div>\r\n\r\n`;

// Inserisci la pagina bianca PRIMA della quarta di copertina
content = content.replace(backCoverComment, blankPageToAdd + backCoverComment);

// Salva il file
fs.writeFileSync(htmlPath, content, 'utf8');

console.log('✅ Pagina bianca aggiunta con successo!');
console.log('📄 Il libro ora ha 32 pagine (multiplo di 4)');
