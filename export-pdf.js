/**
 * Export PDF Generator for Mya ed Elliott Books
 * 
 * Genera file PDF ad alta risoluzione (300 DPI) da HTML
 * usando Puppeteer
 * 
 * Utilizzo:
 *   node export-pdf.js                   # Genera entrambi i libri
 *   node export-pdf.js --book libro-1    # Genera solo Libro 1
 *   node export-pdf.js --book libro-2    # Genera solo Libro 2
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configurazione
const BOOKS = {
  'libro-1': {
    name: 'Mya e l\'Uovo Misterioso',
    htmlPath: './libro-1/index.html',
    outputPath: './output/libro-1.pdf'
  },
  'libro-2': {
    name: 'Mya ed Elliott - Avventure e Addii',
    htmlPath: './libro-2/index.html',
    outputPath: './output/libro-2.pdf'
  }
};

const PDF_OPTIONS = {
  width: '21cm',
  height: '21cm',
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  scale: 1.0,
  timeout: 60000
};

/**
 * Genera PDF da file HTML
 */
async function generatePDF(bookKey, bookConfig) {
  const htmlPath = path.resolve(bookConfig.htmlPath);
  const outputPath = path.resolve(bookConfig.outputPath);

  // Verifica che il file HTML esista
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ File non trovato: ${htmlPath}`);
    return false;
  }

  // Crea cartella output se non esiste
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log(`\n📖 Elaborando: ${bookConfig.name}`);
    console.log(`📄 Input:  ${htmlPath}`);

    // Avvia browser
    const browser = await puppeteer.launch({
      headless: 'new'
    });

    const page = await browser.newPage();

    // Imposta viewport (importante per CSS media queries)
    // 2480px = 21cm a 300 DPI, con deviceScaleFactor 2 = 600 DPI equivalente
    await page.setViewport({
      width: 2480,    // 21cm a 300 DPI
      height: 2480,
      deviceScaleFactor: 2  // Raddoppia la risoluzione per stampa HD
    });

    // Carica il file HTML (usa file:// protocol)
    const fileUrl = `file://${htmlPath}`;
    await page.goto(fileUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Genera PDF
    await page.pdf({
      path: outputPath,
      ...PDF_OPTIONS
    });

    await browser.close();

    // Verifica che il file è stato creato
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`✅ Completato: ${outputPath}`);
      console.log(`📊 Dimensione: ${sizeMB} MB`);
      return true;
    } else {
      console.error(`❌ Errore: il file PDF non è stato creato`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Errore durante la generazione del PDF per ${bookKey}:`);
    console.error(error);
    return false;
  }
}

/**
 * Main - Gestisce argomenti da linea di comando
 */
async function main() {
  console.log('🎨 Generatore PDF - Mya ed Elliott Books');
  console.log('==========================================\n');

  // Estrai parametri
  const args = process.argv.slice(2);
  let booksToProcess = Object.keys(BOOKS);

  if (args.includes('--book')) {
    const bookIndex = args.indexOf('--book');
    const bookKey = args[bookIndex + 1];

    if (bookKey && BOOKS[bookKey]) {
      booksToProcess = [bookKey];
    } else {
      console.error(`❌ Libro non riconosciuto: ${bookKey}`);
      console.log('📚 Libri disponibili: ' + Object.keys(BOOKS).join(', '));
      process.exit(1);
    }
  }

  console.log(`📚 Libri da elaborare: ${booksToProcess.join(', ')}\n`);

  // Elabora ogni libro
  let successCount = 0;
  for (const bookKey of booksToProcess) {
    const success = await generatePDF(bookKey, BOOKS[bookKey]);
    if (success) {
      successCount++;
    }
  }

  // Riepilogo
  console.log('\n==========================================');
  console.log(`✅ Completati: ${successCount}/${booksToProcess.length}`);

  if (successCount === booksToProcess.length) {
    console.log('🎉 Tutti i PDF sono stati generati con successo!');
  } else {
    console.log('⚠️ Alcuni PDF non sono stati generati correttamente');
    process.exit(1);
  }
}

// Esegui
main().catch(error => {
  console.error('❌ Errore critico:');
  console.error(error);
  process.exit(1);
});
