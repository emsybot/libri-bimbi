/**
 * Export PNG per Stampa Pixartprinting
 * 
 * Genera file PNG ad alta risoluzione (300 DPI) per brossura fresata
 * Formato: 21x21 cm con 3mm di abbondanza = 216x216mm = 2551x2551px
 * 
 * NOTA: I PNG sono in RGB. Per CMYK dovrai convertirli con:
 * - ImageMagick: magick convert input.png -colorspace CMYK output.tiff
 * - Photoshop: Modifica > Converti in profilo > CMYK (Fogra 39)
 * - Online: https://www.rgb2cmyk.org/
 * 
 * Utilizzo:
 *   node export-png-print.js              # Esporta libro-1
 *   node export-png-print.js --book libro-2
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURAZIONE PIXARTPRINTING
// ============================================
const CONFIG = {
  // Formato finito 21x21 cm
  pageSize: {
    width: 210,   // mm
    height: 210   // mm
  },
  // Abbondanza (bleed) 3mm per lato
  bleed: 3,       // mm
  // Dorso per 32 pagine
  spine: 7,       // mm (dal preventivo Pixartprinting)
  // DPI per stampa professionale
  dpi: 300,
  
  // Calcoli automatici
  get totalPageWidth() { return this.pageSize.width + (this.bleed * 2); },   // 216mm
  get totalPageHeight() { return this.pageSize.height + (this.bleed * 2); }, // 216mm
  get pixelWidth() { return Math.round(this.totalPageWidth * this.dpi / 25.4); },   // 2551px
  get pixelHeight() { return Math.round(this.totalPageHeight * this.dpi / 25.4); }, // 2551px
  
  // Copertina stesa: 4ª cop + dorso + 1ª cop + bleed
  get coverWidth() { return (this.pageSize.width * 2) + this.spine + (this.bleed * 2); }, // 433mm
  get coverPixelWidth() { return Math.round(this.coverWidth * this.dpi / 25.4); } // 5114px circa
};

// Libri disponibili
const BOOKS = {
  'libro-1': {
    name: 'Mya e l\'Uovo Misterioso',
    htmlPath: './libro-1/index.html',
    outputDir: './output/print-libro-1'
  },
  'libro-2': {
    name: 'Mya ed Elliott - Avventure e Addii',
    htmlPath: './libro-2/index.html',
    outputDir: './output/print-libro-2'
  }
};

/**
 * Genera PNG delle singole pagine per stampa
 */
async function exportPNGsForPrint(bookKey) {
  const book = BOOKS[bookKey];
  if (!book) {
    console.error(`❌ Libro non trovato: ${bookKey}`);
    return;
  }

  const htmlPath = path.resolve(book.htmlPath);
  const outputDir = path.resolve(book.outputDir);

  // Verifica file HTML
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ File HTML non trovato: ${htmlPath}`);
    return;
  }

  // Crea cartella output
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('\n' + '='.repeat(60));
  console.log('🖨️  EXPORT PNG PER PIXARTPRINTING');
  console.log('='.repeat(60));
  console.log(`📖 Libro: ${book.name}`);
  console.log(`📐 Formato pagina: ${CONFIG.totalPageWidth}x${CONFIG.totalPageHeight}mm`);
  console.log(`🎯 Risoluzione: ${CONFIG.pixelWidth}x${CONFIG.pixelHeight}px @ ${CONFIG.dpi} DPI`);
  console.log(`📂 Output: ${outputDir}`);
  console.log('='.repeat(60) + '\n');

  try {
    // Avvia browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Imposta viewport per export ad alta risoluzione
    // Usiamo dimensioni in pixel corrispondenti a 216x216mm @ 300 DPI
    // deviceScaleFactor: 3 per ottenere ~2551px da 850px base
    await page.setViewport({
      width: 850,   // 216mm a ~100 DPI base
      height: 850,
      deviceScaleFactor: 3  // 850 * 3 = 2550px ≈ 2551px target
    });

    // Carica HTML
    const fileUrl = `file://${htmlPath}`;
    await page.goto(fileUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Conta le pagine
    const pageCount = await page.evaluate(() => {
      return document.querySelectorAll('.page').length;
    });

    console.log(`📄 Trovate ${pageCount} pagine\n`);

    // Inietta CSS per abbondanze e dimensioni corrette
    // 850px viewport * 3 scale = 2550px output
    // CSS usa 216mm che corrisponde al viewport
    await page.addStyleTag({
      content: `
        /* Reset per export */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          width: 850px !important;
          height: 850px !important;
          overflow: hidden !important;
        }
        
        /* Nascondi tutte le pagine tranne quella corrente */
        .page {
          display: none !important;
        }
        
        .page.export-current {
          display: flex !important;
          width: 850px !important;
          height: 850px !important;
          padding: 12px !important;  /* ~3mm di bleed a 100dpi base */
          margin: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
        }
        
        /* Scala contenuto interno per adattarlo */
        .page.export-current .page-image {
          height: 55% !important;
        }
        
        .page.export-current .page-text {
          height: 45% !important;
        }
        
        /* Contenuto della pagina (area di taglio) */
        .page.export-current > * {
          position: relative;
          z-index: 1;
        }
        
        /* Estendi sfondo fino all'abbondanza */
        .page.export-current::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: inherit;
          z-index: 0;
        }
      `
    });

    // Esporta ogni pagina
    for (let i = 0; i < pageCount; i++) {
      const pageNum = i + 1;
      const paddedNum = String(pageNum).padStart(2, '0');
      let filename;
      
      // Determina il nome del file in base alla posizione
      if (i === 0) {
        filename = `01-copertina-fronte.png`;
      } else if (i === pageCount - 1) {
        filename = `${paddedNum}-copertina-retro.png`;
      } else {
        filename = `${paddedNum}-pagina-interna.png`;
      }

      const outputPath = path.join(outputDir, filename);

      // Attiva solo la pagina corrente
      await page.evaluate((index) => {
        const pages = document.querySelectorAll('.page');
        pages.forEach((p, idx) => {
          p.classList.remove('export-current');
          if (idx === index) {
            p.classList.add('export-current');
          }
        });
      }, i);

      // Attendi rendering
      await new Promise(resolve => setTimeout(resolve, 300));

      // Screenshot dell'intera pagina (viewport)
      await page.screenshot({
        path: outputPath,
        type: 'png',
        omitBackground: false,
        clip: {
          x: 0,
          y: 0,
          width: 850,
          height: 850
        }
      });
      console.log(`✅ ${filename}`);
    }

    await browser.close();

    // Sommario finale
    console.log('\n' + '='.repeat(60));
    console.log('✅ EXPORT COMPLETATO!');
    console.log('='.repeat(60));
    console.log(`\n📁 File salvati in: ${outputDir}\n`);
    
    console.log('📋 PROSSIMI PASSI:');
    console.log('─'.repeat(40));
    console.log('1. COPERTINA STESA:');
    console.log('   - Usa Photoshop/GIMP per unire:');
    console.log('     copertina-retro + dorso (7mm) + copertina-fronte');
    console.log('   - Dimensione finale: 433mm x 216mm');
    console.log('');
    console.log('2. CONVERSIONE CMYK:');
    console.log('   - Photoshop: Modifica > Converti in profilo > Fogra 39');
    console.log('   - ImageMagick: magick convert file.png -profile Fogra39.icc file.tiff');
    console.log('   - Online: rgb2cmyk.org');
    console.log('');
    console.log('3. INSERISCI NEL TEMPLATE:');
    console.log('   - Apri il template Pixartprinting');
    console.log('   - Inserisci le immagini nelle pagine corrispondenti');
    console.log('   - Verifica allineamento con guide');
    console.log('');
    console.log('⚠️  NOTA: Le immagini sono in RGB.');
    console.log('    Convertile in CMYK prima di caricare su Pixartprinting!');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ Errore durante l\'export:', error);
  }
}

/**
 * Esporta copertina stesa (4ª + dorso + 1ª)
 */
async function exportCoverSpread(bookKey) {
  const book = BOOKS[bookKey];
  if (!book) return;

  const htmlPath = path.resolve(book.htmlPath);
  const outputDir = path.resolve(book.outputDir);
  const outputPath = path.join(outputDir, '00-copertina-stesa.png');

  console.log('\n📕 Generazione copertina stesa...');

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // Dimensioni copertina stesa in pixel
    const coverWidthPx = CONFIG.coverPixelWidth;  // ~5114px
    const coverHeightPx = CONFIG.pixelHeight;      // 2551px

    await page.setViewport({
      width: coverWidthPx,
      height: coverHeightPx,
      deviceScaleFactor: 1
    });

    // Crea HTML per copertina stesa
    const fileUrl = `file://${htmlPath}`;
    await page.goto(fileUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Ottieni le immagini di copertina fronte e retro
    const coverData = await page.evaluate(() => {
      const pages = document.querySelectorAll('.page');
      const coverFront = pages[0];
      const coverBack = pages[pages.length - 1];
      
      return {
        frontHtml: coverFront ? coverFront.outerHTML : '',
        backHtml: coverBack ? coverBack.outerHTML : ''
      };
    });

    // Crea pagina con copertina stesa
    const spineWidthMm = CONFIG.spine;
    const pageWidthMm = CONFIG.pageSize.width;
    const bleedMm = CONFIG.bleed;
    const totalWidthMm = CONFIG.coverWidth;
    const totalHeightMm = CONFIG.totalPageHeight;

    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: ${totalWidthMm}mm;
            height: ${totalHeightMm}mm;
            display: flex;
            background: white;
          }
          .back-cover {
            width: ${pageWidthMm + bleedMm}mm;
            height: ${totalHeightMm}mm;
            background: #f8f9fa;
          }
          .spine {
            width: ${spineWidthMm}mm;
            height: ${totalHeightMm}mm;
            background: linear-gradient(135deg, #FFE4D6 0%, #FFF5E1 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .spine-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            transform: rotate(180deg);
            font-family: 'Segoe UI', sans-serif;
            font-size: 10pt;
            font-weight: bold;
            color: #8B6F47;
            letter-spacing: 1px;
          }
          .front-cover {
            width: ${pageWidthMm + bleedMm}mm;
            height: ${totalHeightMm}mm;
            background: linear-gradient(135deg, #fff5e1 0%, #ffe4b5 100%);
          }
        </style>
      </head>
      <body>
        <div class="back-cover"></div>
        <div class="spine">
          <span class="spine-text">MYA E L'UOVO MISTERIOSO</span>
        </div>
        <div class="front-cover"></div>
      </body>
      </html>
    `);

    await page.screenshot({
      path: outputPath,
      type: 'png',
      fullPage: true,
      omitBackground: false
    });

    await browser.close();

    console.log(`✅ Copertina stesa salvata: ${outputPath}`);
    console.log(`   Dimensioni: ${CONFIG.coverWidth}mm x ${CONFIG.totalPageHeight}mm`);
    console.log('   ⚠️  NOTA: Devi completare manualmente inserendo le grafiche!');

  } catch (error) {
    console.error('❌ Errore copertina stesa:', error);
  }
}

// ============================================
// MAIN
// ============================================
async function main() {
  const args = process.argv.slice(2);
  let bookKey = 'libro-1';

  // Parse argomenti
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book' && args[i + 1]) {
      bookKey = args[i + 1];
    }
  }

  console.log('\n🚀 Avvio export PNG per stampa...\n');
  
  // Mostra configurazione
  console.log('📐 CONFIGURAZIONE:');
  console.log(`   Formato finito: ${CONFIG.pageSize.width}x${CONFIG.pageSize.height}mm`);
  console.log(`   Abbondanza: ${CONFIG.bleed}mm per lato`);
  console.log(`   Formato totale: ${CONFIG.totalPageWidth}x${CONFIG.totalPageHeight}mm`);
  console.log(`   Pixel: ${CONFIG.pixelWidth}x${CONFIG.pixelHeight}px`);
  console.log(`   DPI: ${CONFIG.dpi}`);
  console.log(`   Dorso: ${CONFIG.spine}mm`);

  // Esporta pagine singole
  await exportPNGsForPrint(bookKey);
}

main().catch(console.error);
