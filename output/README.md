# Output - PDF Generati

Questa cartella contiene i file PDF finali generati da Puppeteer.

## File generati

```
output/
├── libro-1.pdf        # Mya e l'Uovo Misterioso (pronto per stampa)
└── libro-2.pdf        # Mya ed Elliott - Avventure e Addii (pronto per stampa)
```

## Come generare i PDF

### Metodo 1: Automatico (Puppeteer)
```bash
npm install          # Prima volta solo
npm run export-pdf   # Genera entrambi
```

### Metodo 2: Manuale da Browser
```bash
1. Apri: libro-1/index.html
2. Premi: Ctrl+P (Print)
3. Seleziona: "Salva come PDF"
4. Salva in: output/libro-1.pdf
```

### Metodo 3: Stampa Diretta
```bash
1. Apri: libro-1/index.html
2. Premi: Ctrl+P
3. Seleziona stampante
4. Stampa
```

## Specifiche PDF

- **Risoluzione**: 300 DPI
- **Formato pagina**: 21cm × 21cm
- **Margini**: 0cm (senza margini)
- **Colore**: RGB (convertire a CMYK per offset)
- **Compressione**: Standard

## QA Checklist

Prima di stampare, verifica:

- [ ] PDF si apre senza errori
- [ ] Tutte le pagine sono presenti
- [ ] Immagini sono visibili e chiare
- [ ] Testo è leggibile
- [ ] Numerazione pagine è corretta
- [ ] Colori appaiono accurati
- [ ] Dimensioni pagina: 21×21cm verificate

## Per Stampa Offset (Tipografica)

Se il tipografo richiede file CMYK:

1. Converti le immagini originali RGB → CMYK
2. Rigenerai PDF con:
   ```bash
   # Via Puppeteer con opzioni CMYK (richiede configurazione)
   # O via Photoshop: File → Export → PDF con CMYK
   ```
3. Consegna: `libro-1-CMYK.pdf` + `libro-2-CMYK.pdf`

## Storage

- **Master**: Mantieni copia su cloud (Google Drive, Dropbox)
- **Backup**: Hard drive esterno
- **Versionamento**: Git può tracciare versioni PDF se < 100MB totale

---

**Nota**: I file in questa cartella vengono generati automaticamente.
Non modificarli manualmente - rigenera da `libro-X/index.html`
