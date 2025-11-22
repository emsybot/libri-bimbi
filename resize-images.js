/**
 * Script per ridimensionare immagini a 2480×1740px (300 DPI)
 * 
 * Uso: node resize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGET_WIDTH = 2480;
const TARGET_HEIGHT = 1740;

async function resizeImages() {
  const sourceDir = './illustrations-raw/libro-1';
  const targetDir = './libro-1/images';
  
  // Crea cartella target se non esiste
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  try {
    const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));
    
    console.log(`\n📐 Ridimensionamento immagini a ${TARGET_WIDTH}×${TARGET_HEIGHT}px`);
    console.log(`📁 Source: ${sourceDir}`);
    console.log(`📁 Target: ${targetDir}\n`);
    
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      try {
        await sharp(sourcePath)
          .resize(TARGET_WIDTH, TARGET_HEIGHT, {
            fit: 'contain',           // Mantiene aspect ratio
            background: { r: 255, g: 255, b: 255, alpha: 0 }  // Sfondo trasparente
          })
          .png({ quality: 95, compression: 9 })  // Compressione alta
          .toFile(targetPath);
        
        const stats = fs.statSync(targetPath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`✅ ${file} → ${sizeMB} MB`);
      } catch (error) {
        console.error(`❌ Errore con ${file}:`, error.message);
      }
    }
    
    console.log(`\n✨ Ridimensionamento completato!`);
    console.log(`📊 Immagini salvate in: ${targetDir}\n`);
    
  } catch (error) {
    console.error('❌ Errore:', error);
  }
}

resizeImages();
