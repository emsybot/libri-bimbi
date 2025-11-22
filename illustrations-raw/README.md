# Cartella per le Illustrazioni Raw

Questa cartella contiene le versioni non elaborate delle illustrazioni.

## Struttura consigliata

```
illustrations-raw/
├── libro-1/
│   ├── pagina-01/
│   │   ├── original.png (o .jpg se da AI)
│   │   ├── variations/
│   │   │   ├── variation-1.png
│   │   │   └── variation-2.png
│   │   ├── metadata.txt
│   │   └── prompt-used.txt
│   ├── pagina-02/
│   └── ...
│
└── libro-2/
    ├── pagina-01/
    └── ...
```

## Cosa salvare qui

1. **Versioni originali da AI**: Prima di ottimizzare
2. **Variazioni**: Se hai creato multiple versioni di una pagina
3. **Sorgenti**: Se create in Photoshop, Procreate, etc.
4. **Metadata**: Note su prompt usato, artista, licenza

## Cosa NON salvare qui

- File .psd o .ai molto grandi (fatti backup separati)
- Versioni finali già ottimizzate (quelle vanno in `libro-X/images/`)
- File di sistema o duplicati

## Workflow

```
1. Crea in AI (DALL-E, Midjourney, etc)
   ↓
2. Salva originale in illustrations-raw/
   ↓
3. Ottimizza (resize, compress, color fix)
   ↓
4. Salva finale in libro-X/images/
   ↓
5. Testa in HTML
   ↓
6. Genera PDF
```

## Note

- Queste folder vengono escluse da `.gitignore` se troppo grandi
- Fai backup regolari su cloud (Google Drive, Dropbox, etc)
- Mantieni sempre l'originale non compresso da qualche parte
