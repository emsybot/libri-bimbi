# 🚀 Quick Start Guide - Mya ed Elliott Books

## Struttura Completata ✅

La struttura è ora pronta! Ecco cosa è stato creato:

```
libri-bimbi/
├── 📖 LIBRO 1: Mya e l'Uovo Misterioso
│   ├── libro-1/index.html          ✅ HTML con 24 pagine
│   └── libro-1/images/             📁 (vuota - pronta per immagini)
│
├── 📖 LIBRO 2: Mya ed Elliott
│   ├── libro-2/index.html          ✅ HTML con 24 pagine
│   └── libro-2/images/             📁 (vuota - pronta per immagini)
│
├── 🎨 Assets Condivisi
│   ├── assets/styles.css           ✅ CSS per stampa HD (300 DPI, 21cm×21cm)
│   └── assets/fonts/               📁 (per font custom)
│
├── 📋 Documentazione
│   ├── README.md                   ✅ Guida completa
│   ├── ILLUSTRAZIONI.md            ✅ Specifiche tecniche immagini
│   ├── config.json                 ✅ Configurazione progetto
│   └── docs/                       ✅ Testi originali + prompt AI
│
├── 🖼️ Illustrazioni
│   ├── illustrations-raw/          📁 (versioni raw/non elaborate)
│   └── prompts/                    ✅ Prompt dettagliati per AI
│
├── 📤 Export
│   ├── output/                     📁 (qui andranno i PDF generati)
│   ├── export-pdf.js               ✅ Script Puppeteer automatico
│   └── package.json                ✅ Dipendenze Node.js
│
└── 🔧 Configurazione Git
    └── .gitignore                  ✅ Per escludere file non necessari
```

---

## 📋 Prossimi Passi

### 1️⃣ Preparare le Immagini (2480×1740px @ 300 DPI)

#### Opzione A: Generare con AI (Consigliato)
```bash
# Usa i prompt in: prompts/illustrazioni_complete.md
# Piattaforme consigliate:
# - DALL-E 3 / ChatGPT Plus
# - Midjourney 
# - Stable Diffusion

# Salva versioni raw in:
illustrations-raw/libro-1/pagina-01.png
illustrations-raw/libro-1/pagina-02.png
# etc...
```

#### Opzione B: Illustratore Umano
```bash
# Usa il documento reference:
# docs/prompt_illustrazioni_complete.md

# Consegna finale: 2480×1740px PNG
# Salva in: libro-1/images/pagina-XX.png
```

### 2️⃣ Ottimizzare le Immagini
```bash
# Per ogni immagine:
1. Verifica dimensioni: esattamente 2480×1740px
2. Converti colore: RGB sRGB (da CMYK se necessario)
3. Comprimi: TinyPNG, ImageOptim, o ImageMagick
4. Salva come PNG con alpha

# Risultato finale:
libro-1/images/
├── cover.png
├── pagina-01.png
├── pagina-02.png
# ... fino a pagina-24.png
```

### 3️⃣ Testare nel Browser
```bash
# Apri nel browser (Ctrl+O o File → Open):
- libro-1/index.html
- libro-2/index.html

# Controlla:
✓ Immagini visibili
✓ Testo leggibile
✓ Layout allineato
✓ Colori accurati
```

### 4️⃣ Generare PDF con Puppeteer

#### Installare dipendenze:
```bash
npm install
```

#### Generare i PDF:
```bash
# Entrambi i libri:
npm run export-pdf

# Solo Libro 1:
npm run export-libro-1

# Solo Libro 2:
npm run export-libro-2
```

#### Risultato:
```
output/
├── libro-1.pdf
└── libro-2.pdf
```

### 5️⃣ Stampa Domestica
```bash
# Metodo 1: Stampa diretta da browser
1. Apri: libro-1/index.html
2. Ctrl+P (oppure File → Stampa)
3. Impostazioni:
   - Margini: Nessuno
   - Colore di sfondo: ON
   - Destinazione: Stampante o "Salva come PDF"

# Metodo 2: Usa il PDF generato
1. Apri: output/libro-1.pdf
2. Stampa normalmente (Ctrl+P)
```

### 6️⃣ Stampa Tipografica (Offset)
```bash
# Prima della consegna al tipografo:
1. Converti RGB → CMYK:
   - Photoshop: Image → Mode → CMYK
   - GIMP: Decompose → CMYK
   - Online: CloudConvert.com

2. Genra PDF CMYK finale

3. Contatta il tipografo:
   "Ho PDF 300 DPI CMYK, 
    formato 21×21cm, 
    con binding per rilegatura"

4. Richiedi: Prova colore prima stampa finale
```

---

## 💡 Consigli Pratici

### Gestire le Versioni (Git)
```bash
# Salva il lavoro:
git add .
git commit -m "Aggiunte immagini pagine 1-10"
git push

# Git traccia: testo, HTML, CSS
# Immagini finali: facoltative ma utili
# Immagini raw: escluse da .gitignore
```

### Denominazione File Immagini
Seguire il pattern: `libro-X/images/pagina-XX.png`
```
✅ Corretto:
   pagina-01.png
   pagina-02.png
   pagina-24.png

❌ Sbagliato:
   img1.png
   mya_page_1.jpg
   pagina1.png (senza zero)
```

### Dimensioni File Immagini
- **Min**: ~500KB (immagini semplici)
- **Ideale**: 1-2 MB (buona qualità)
- **Max**: 5 MB (molto dettagliata)

Se > 5MB → comprimere con TinyPNG.com

### Colori Fedeli
- Visualizza in un viewer colori (non Safari)
- Testa stampa su carta prima di grande tiratura
- Se stampa offset: converti CMYK con il tipografo

---

## 📞 Domande Frequenti

**D: Come cambio i font?**
A: Modifica `assets/styles.css`, sezione `font-family`

**D: Posso usare JPEG invece di PNG?**
A: No - PNG ha trasparenza, JPEG no. Stampa richiede PNG per qualità.

**D: Come aggiungo più pagine?**
A: Copia un `<div class="page">` in index.html, aggiorna numero pagina

**D: Il PDF è troppo grande?**
A: Comprimi immagini prima di generare PDF (TinyPNG)

**D: Posso stampare senza Puppeteer?**
A: Sì - Ctrl+P dal browser su ogni libro HTML

**D: Chi decide i colori finali?**
A: Tipografo per offset, printer per home printing

---

## ✅ Checklist Prima di Stampa

- [ ] Tutte 24 immagini per Libro 1 salvate (pagina-01 to pagina-24)
- [ ] Tutte 24 immagini per Libro 2 salvate
- [ ] Immagini: esattamente 2480×1740px
- [ ] Immagini: PNG con alpha, RGB sRGB
- [ ] Test HTML nel browser: immagini visibili
- [ ] PDF generato con npm run export-pdf
- [ ] PDF visualizzato in viewer: aspetto corretto
- [ ] Test stampa: su carta qualità richiesta
- [ ] Se offset: PDF CMYK generato e approvato tipografo
- [ ] File backup: su cloud o hard drive esterno

---

## 📧 Supporto

Se hai dubbi:
1. Controlla `README.md` (guida completa)
2. Leggi `config.json` (specifiche tecniche)
3. Consulta `ILLUSTRAZIONI.md` (dettagli immagini)

Buona creazione! 🎨📚✨

---

**Ultima modifica**: Novembre 2025
