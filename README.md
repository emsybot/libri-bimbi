# Mya ed Elliott - Libri per Bambini

Progetto per la creazione di libri illustrati per bambini con HTML/CSS e export in PDF ad alta risoluzione per stampa.

## 📚 Struttura Progetto

```
libri-bimbi/
├── libro-1/                          # Mya e l'Uovo Misterioso
│   ├── index.html                    # Documento HTML del libro
│   └── images/                       # Immagini delle pagine (pagina-01.png, etc.)
│
├── libro-2/                          # Mya ed Elliott - Avventure e Addii
│   ├── index.html                    # Documento HTML del libro
│   └── images/                       # Immagini delle pagine (pagina-01.png, etc.)
│
├── assets/
│   ├── styles.css                    # Stili condivisi per stampa HD
│   └── fonts/                        # Font custom (se necessari)
│
├── illustrations-raw/                # Versioni raw/non elaborate delle immagini
│
├── prompts/                          # File con prompt per generazione AI
│   └── illustrazioni_complete.md     # Prompt dettagliati per ogni pagina
│
├── output/                           # File PDF generati
│   ├── libro-1.pdf
│   └── libro-2.pdf
│
├── docs/                             # Documentazione e contenuti
│   ├── libro1_mya_e_uovo.md
│   ├── libro2_mya_ed_elliott.md
│   └── prompt_illustrazioni_complete.md
│
└── README.md                         # Questo file
```

## 🎨 Specifiche Tecniche

### Dimensioni e Risoluzione
- **Formato pagina**: 21cm × 21cm (quadrato, ideale per libro rilega to)
- **Risoluzione**: 300 DPI (2480px × 2480px per pagina)
- **Layout**: Immagine (14cm) + Testo (7cm)

### Caratteristiche CSS
- ✅ Unità in `cm` e `mm` (non pixel) per stampa precisa
- ✅ `@page { size: 21cm 21cm; margin: 0; }` per controllo totale
- ✅ Colori in sRGB (conversione CMYK in post-processing)
- ✅ `page-break-after: always` per separazione pagine
- ✅ `-webkit-print-color-adjust: exact` per colori fedeli

### Immagini
- **Formato**: PNG con alfa (trasparenza)
- **Dimensioni consigliate**: 2480px × 1740px (300 DPI, 21cm × 14.5cm)
- **Posizionamento**: `images/pagina-XX.png` (XX = numero pagina)

## 📖 Contenuti

### Libro 1: Mya e l'Uovo Misterioso
24 pagine + copertina

Una bambina di 6 anni scopre un misterioso uovo sulla spiaggia, lo accudisce con amore e vede nascere Elliott, un piccolo draghetto magico verde con ali rosa.

**Temi**: Scoperta, meraviglia, amore, amicizia

### Libro 2: Mya ed Elliott - Avventure e Addii
24 pagine + copertina

Mya ed Elliott crescono insieme, aiutano altri bambini, ma Elliott deve partire per aiutare chi ha bisogno. Una storia di amore vero e amicizia che dura per sempre.

**Temi**: Crescita, sacrificio, amore incondizionato, lezione di vita

## 🚀 Generazione PDF con Puppeteer

### Installazione dipendenze
```bash
npm install puppeteer
```

### Script di esportazione (esempio Node.js)
```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(htmlFile, outputFile) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Carica il file HTML
  await page.goto(`file://${path.resolve(htmlFile)}`, {
    waitUntil: 'networkidle2'
  });
  
  // Genera PDF
  await page.pdf({
    path: outputFile,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  
  await browser.close();
}

// Uso
generatePDF('./libro-1/index.html', './output/libro-1.pdf');
generatePDF('./libro-2/index.html', './output/libro-2.pdf');
```

## 📝 Workflow Consigliato

1. **Preparare i testi**: ✅ Fatto (in `/docs`)
2. **Generare prompt**: ✅ Fatto (in `/prompts`)
3. **Creare le illustrazioni**: 
   - Usare i prompt in `prompts/illustrazioni_complete.md`
   - Salvare versioni raw in `illustrations-raw/`
   - Ottimizzare per 300 DPI in `libro-X/images/`
4. **Adattare HTML**: Aggiornare i riferimenti alle immagini se necessario
5. **Testare in browser**: Aprire `libro-1/index.html` e `libro-2/index.html`
6. **Generare PDF**: Usare Puppeteer o browser print (Ctrl+P)
7. **Verificare stampa**: Controllare qualità, colori, impaginazione

## 🎯 Checklist Pre-Stampa

- [ ] Tutte le immagini sono 2480px × 1740px (300 DPI)
- [ ] Immagini salvate come PNG con alpha
- [ ] Colori verificati (RGB per ora, CMYK in tipografia)
- [ ] PDF generato da Puppeteer
- [ ] Test di stampa su carta
- [ ] Verifica qualità colore e risoluzione
- [ ] Margini corretti (0cm)
- [ ] Numerazione pagine corretta

## 💡 Consigli Aggiuntivi

### Per Illustrazioni AI (DALL-E, Midjourney, Stable Diffusion)
- Usare i prompt dettagliati in `prompts/illustrazioni_complete.md`
- Specificare **watercolor style** OR **Pixar/Disney animation style**
- Richiedere **300 DPI** e **2480px width**
- Salvare con lossless compression (PNG)

### Per Stampa Tipografica
1. Convertire RGB → CMYK in post-processing (Photoshop, GIMP)
2. Fornire PDF a 300 DPI con spazi colore CMYK
3. Verificare che il tipografo supporti i font usati
4. Fare prova colore prima della tiratura completa

### Repository & Versionamento
✅ **Git è perfetto per**:
- Tracciare versioni di testo e layout
- Backup delle iterazioni
- Collaborazione con illustratori
- Portfolio open-source

## 📄 Licenza
Progetto per uso personale/famiglia. Adattare licenza se condiviso pubblicamente.

---

**Ultima modifica**: Novembre 2025
**Autore**: Famiglia Mya
