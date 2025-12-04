/**
 * Converti PNG da RGB a CMYK usando ImageMagick
 * 
 * Converte tutti i PNG in output/print-libro-1 in TIFF CMYK
 * per la stampa su Pixartprinting
 * 
 * Prerequisiti: ImageMagick installato
 * 
 * Utilizzo:
 *   node convert-cmyk.js              # Converte libro-1
 *   node convert-cmyk.js --book libro-2
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurazione
const BOOKS = {
  'libro-1': {
    inputDir: './output/print-libro-1',
    outputDir: './output/print-libro-1-cmyk'
  },
  'libro-2': {
    inputDir: './output/print-libro-2',
    outputDir: './output/print-libro-2-cmyk'
  }
};

// Profilo colore CMYK per stampa europea (Fogra 39 equivalente)
// ImageMagick usa i profili di sistema o quelli incorporati
const CMYK_PROFILE = 'CMYK';  // Profilo CMYK generico di ImageMagick

async function convertToCMYK(bookKey) {
  const book = BOOKS[bookKey];
  if (!book) {
    console.error(`❌ Libro non trovato: ${bookKey}`);
    return;
  }

  const inputDir = path.resolve(book.inputDir);
  const outputDir = path.resolve(book.outputDir);

  // Verifica cartella input
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Cartella non trovata: ${inputDir}`);
    console.log('   Esegui prima: node export-png-print.js');
    return;
  }

  // Crea cartella output
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎨 CONVERSIONE RGB → CMYK');
  console.log('='.repeat(60));
  console.log(`📂 Input:  ${inputDir}`);
  console.log(`📂 Output: ${outputDir}`);
  console.log(`🖨️  Formato: TIFF CMYK (per stampa professionale)`);
  console.log('='.repeat(60) + '\n');

  // Trova tutti i PNG
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  
  if (files.length === 0) {
    console.error('❌ Nessun file PNG trovato!');
    return;
  }

  console.log(`📄 Trovati ${files.length} file PNG\n`);

  let converted = 0;
  let errors = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFile = file.replace('.png', '.tiff');
    const outputPath = path.join(outputDir, outputFile);

    try {
      // Comando ImageMagick per conversione CMYK
      // -colorspace CMYK: converte in spazio colore CMYK
      // -compress lzw: compressione lossless
      // -density 300: mantiene 300 DPI
      const cmd = `magick "${inputPath}" -colorspace CMYK -compress lzw -density 300 "${outputPath}"`;
      
      execSync(cmd, { stdio: 'pipe' });
      console.log(`✅ ${outputFile}`);
      converted++;
    } catch (error) {
      console.error(`❌ Errore: ${file} - ${error.message}`);
      errors++;
    }
  }

  // Sommario
  console.log('\n' + '='.repeat(60));
  console.log('📊 RISULTATO CONVERSIONE');
  console.log('='.repeat(60));
  console.log(`✅ Convertiti: ${converted} file`);
  if (errors > 0) {
    console.log(`❌ Errori: ${errors} file`);
  }
  console.log(`\n📁 File CMYK salvati in: ${outputDir}`);
  
  console.log('\n📋 PROSSIMI PASSI:');
  console.log('─'.repeat(40));
  console.log('1. Apri il template Pixartprinting');
  console.log('2. Inserisci i file TIFF nelle pagine corrispondenti');
  console.log('3. Verifica allineamento con le guide');
  console.log('4. Esporta come PDF/X-1a o PDF/X-4');
  console.log('='.repeat(60) + '\n');
}

// Funzione per verificare ImageMagick
function checkImageMagick() {
  try {
    execSync('magick --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Main
async function main() {
  // Verifica ImageMagick
  if (!checkImageMagick()) {
    console.error('❌ ImageMagick non trovato!');
    console.log('   Installa con: winget install ImageMagick.ImageMagick');
    process.exit(1);
  }

  // Parse argomenti
  const args = process.argv.slice(2);
  let bookKey = 'libro-1';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book' && args[i + 1]) {
      bookKey = args[i + 1];
    }
  }

  await convertToCMYK(bookKey);
}

main().catch(console.error);
