# Guida Illustrazioni - Specifiche Tecniche

## 📐 Dimensioni Immagini

Per stampa HD a 300 DPI con pagina 21cm × 21cm:

### Dimensione ideale per ogni pagina
- **Larghezza**: 2480 px (21cm @ 300 DPI)
- **Altezza**: 1740 px (14.5cm @ 300 DPI)
- **Aspect Ratio**: 1.43:1 (landscape)
- **Formato**: PNG con canale alpha (trasparenza)
- **Colore**: RGB sRGB (per ora)

### Naming Convention
```
libro-X/images/
├── cover.png                    # Copertina
├── pagina-01.png               # Pagina 1
├── pagina-02.png               # Pagina 2
├── ...
└── pagina-24.png               # Pagina 24
```

## 🎨 Specifiche per Generatori AI

### DALL-E 3 / ChatGPT
```
"2480x1740 PNG image, 300 DPI, watercolor illustration
of [descrizione scena], children's book style, 
soft colors, magical realism, high quality"
```

### Midjourney
```
/imagine [descrizione] --ar 1.43:1 --quality 2 --upbeta 
[specifiche aggiuntive come watercolor, Pixar style, etc]
```

### Stable Diffusion
```
DPM++ 2M Karras, Steps: 40-50, 
Size: 2480x1740, CFG: 7-9
```

## 📁 Workflow Illustrazioni

1. **Creazione**: Salvare in `illustrations-raw/` con metadata
   ```
   illustrations-raw/
   ├── libro-1/
   │   ├── pagina-01-raw.png
   │   ├── pagina-01-variations/
   │   └── prompt-pagina-01.txt
   └── libro-2/
   ```

2. **Ottimizzazione**: Ridimensionare e comprimere
   - Verifica dimensioni (esattamente 2480x1740)
   - Converti a RGB sRGB se in CMYK
   - Comprimi PNG (TinyPNG, ImageOptim)
   - Salva in `libro-X/images/`

3. **QA**: Verifica prima di PDF
   - Controlla qualità a 100%
   - Verifica colori
   - Prova rendering nel browser

## 🔄 Conversione CMYK (Post-Stampa)

Se usi un tipografo per stampa offset:

### Adobe Photoshop
1. Image → Mode → CMYK Color
2. Edit → Convert to Profile → foglio colore tipografo
3. Export → PDF con metadati CMYK

### GIMP
1. Image → Mode → RGB (base)
2. Decompose → CMYK
3. Usa plugin: "Separate+" (CMYK)
4. Esporta TIF per tipografo

### Online Tools
- CloudConvert.com (RGB → CMYK)
- Online-convert.com (batch conversion)

## ✅ Checklist Immagini

Per ogni pagina:
- [ ] Dimensioni esatte: 2480x1740px
- [ ] Risoluzione: 300 DPI
- [ ] Formato: PNG con alpha
- [ ] Colore: RGB sRGB (9prima del tipografo)
- [ ] File size: < 5MB
- [ ] Tema coerente con descrizione libro
- [ ] Caratteri: Mya, Elliott ben riconoscibili
- [ ] Test nel browser: pagina si visualizza bene
- [ ] Test stampa: colori fedeli

## 🎭 Palette Colori Riferimento

### Personaggi Principali
- **Mya**: capelli castani (#8B6F47), pelle chiara (#F5D5B8)
- **Elliott**: verde smeraldo (#50C878), ali rosa (#FF69B4), occhi oro (#FFD700)

### Palette Libro 1 (Spiaggia)
- Azzurro cielo (#87CEEB)
- Giallo sabbia (#F4D03F)
- Verde oceano (#006994)
- Bianco spiaggia (#FFFACD)

### Palette Libro 2 (Crescita/Addio)
- Rosa tramonti (#FFB6C1 → #FF69B4)
- Blu cielo (#4169E1)
- Oro pomeriggio (#FFD700)
- Verde montagna (#228B22)

## 💾 Storage Recommandazioni

- **Originali AI**: Salva in `illustrations-raw/`
- **Finali**: `libro-X/images/`
- **Versioni alte**: Mantieni backup su cloud
- **Git**: Track solo PNG finali, non raw/PSD

---

**Nota**: Tutte le immagini devono essere ©royalty-free o create da te.
Verificare licenze di font e asset prima di stampa commerciale.
