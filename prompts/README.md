# Prompts per Illustrazioni - Salva qui i file prompt

Questa cartella contiene i prompt dettagliati per generare le illustrazioni via AI.

## File disponibili

- **illustrazioni_complete.md** - Prompt per tutte le 48 pagine (24 per libro + cover)

## Come usare

### Per ogni pagina:

1. Leggi il prompt corrispondente
2. Copia il testo
3. Incolla in:
   - ChatGPT + DALL-E 3
   - Midjourney
   - Stable Diffusion WebUI
4. Genera immagine
5. Salva in `illustrations-raw/`
6. Ottimizza e sposta in `libro-X/images/`

## Template di aggiunta prompts

Se aggiungi pagine nuove, usa questo template:

```markdown
## Pagina XX

**Prompt (Watercolor style):**
[Descrizione dettagliata in inglese]

**Alternative (Animation style):**
[Descrizione alternativa Pixar/Disney style]

**Specifiche tecniche:**
- Size: 2480x1740px
- DPI: 300
- Format: PNG
- Colors: Soft watercolor / Vibrant animation
```

## Stile Raccomandato

Per uniformità tra le pagine:

### Libro 1: Spiaggia e Scoperta
**Stile**: Watercolor delicato OR Pixar/Disney animation
**Atmosfera**: Magica, rassicurante, gioiosa

### Libro 2: Crescita e Addio
**Stile**: Watercolor + drammaticità OR Pixar realistico
**Atmosfera**: Matura, emotiva, consapevole

---

**Nota**: I prompt sono già generati in `docs/prompt_illustrazioni_complete.md`
Copia/adatta da lì se necessario.
