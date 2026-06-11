# Sarda Sapori - Guida Completa

## Struttura Progetto

Il sito è stato creato con la seguente struttura:

```
sito_colman/
├── index.html              # Pagina principale
├── css/
│   └── styles.css          # Stili CSS responsive
├── js/
│   └── main.js             # JavaScript (menu mobile, form, animazioni)
└── assets/                 # Cartella per immagini
    ├── hero.jpg            # Immagine hero
    ├── bottarga.jpg        # Bottarga
    ├── nero-seppia.jpg     # Nero di Seppia
    ├── crema-bottarga.jpg  # Crema di Bottarga
    ├── sara.jpg            # Foto Sara
    └── alessandro.jpg      # Foto Alessandro
```

## Step 1: Preparare le Immagini

Dovete inserire queste immagini nella cartella `/assets/`:

1. **hero.jpg** - La foto panoramica dal catalogo (copertina principale)
2. **bottarga.jpg** - Foto della bottarga di muggine
3. **nero-seppia.jpg** - Foto del nero di seppia
4. **crema-bottarga.jpg** - Foto della crema di bottarga
5. **sara.jpg** - Foto di Sara (oppure avatar generico)
6. **alessandro.jpg** - Foto di Alessandro (oppure avatar generico)

### Dimensioni Consigliate:
- **hero.jpg**: 1200x500px (landscape)
- **Prodotti**: 600x400px
- **Team**: 500x500px (quadrato)

> Se non avete le foto dei fondatori, potete usare placeholders o avatar generici per il momento.

## Step 2: Testare il Sito Localmente

### Con VS Code Live Server:
1. Installa l'estensione "Live Server" di Ritwick Dey
2. Click destro su `index.html` → "Open with Live Server"
3. Il sito si apre su `http://localhost:5500`

### Con Python:
```bash
cd /Users/salvatoregrisaffi/progetti_vscode/sito_colman
python3 -m http.server 8000
```
Poi visita `http://localhost:8000`

## Step 3: Personalizzazioni Consigliate

### Nel file `index.html`:

1. **Aggiorna il form di contatto** (attualmente mostra un alert):
   - Opzione A: Usa Formspree (gratuito)
     ```html
     <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     ```
   - Opzione B: Configura un backend PHP/Node.js su Aruba

2. **Personalizza la mappa** (sostituisci il link Google Maps):
   ```html
   <!-- Nel file HTML, cerca la sezione localizzazione -->
   <!-- Vai su Google Maps, cerca "Vico II Argentaria 24 Iglesias" -->
   <!-- Clicca Share > Embed a map > Copia il codice iframe -->
   ```

3. **Aggiungi Social Media** (se desiderate):
   ```html
   <!-- Nel footer, prima della chiusura </div> -->
   <div class="social-links">
       <a href="https://instagram.com/sardasapori" target="_blank">Instagram</a>
       <a href="https://facebook.com/sardasapori" target="_blank">Facebook</a>
   </div>
   ```

## Step 4: Pubblicazione su Aruba

### Accesso a Hosting Aruba:

1. **Accedi a managehosting.aruba.it**
   - User: 9652873@aruba.it
   - Password: Xw44gU3c28

2. **Vai a "File Manager" o FTP**
   - Opzione 1: File Manager Web
     - Naviga a `/public_html` o `/www`
     - Carica i file del sito

   - Opzione 2: FTP (Consigliato)
     ```
     Host: ftp.sardasapori.it (o quello fornito da Aruba)
     User: 9652873@aruba.it
     Password: Xw44gU3c28
     ```

### Software FTP Consigliato:
- **FileZilla** (gratuito) - https://filezilla-project.org/
- **WinSCP** (gratuito per Windows)
- **Cyberduck** (gratuito per Mac)

### Passi per caricare con FileZilla:

1. Apri FileZilla
2. File → Site Manager → New Site
3. Inserisci:
   - Host: ftp.sardasapori.it
   - User: 9652873@aruba.it
   - Password: Xw44gU3c28
4. Connect
5. Naviga a `/public_html`
6. Carica tutti i file da `sito_colman/`

## Step 5: Verificare il Sito Online

Dopo aver caricato i file:

1. Aspetta 10-15 minuti per la propagazione DNS
2. Visita https://www.sardasapori.it
3. Controlla che:
   - Tutte le immagini siano visibili
   - I link di navigazione funzionino
   - Il form di contatto sia configurato
   - La mappa sia visibile

## Step 6: Configurare SSL (HTTPS)

Aruba offre SSL gratuito:

1. Nel pannello Aruba, vai a "SSL/TLS"
2. Seleziona "Let's Encrypt" (gratuito)
3. Applica a sardasapori.it
4. Aspetta la validazione (5-10 minuti)

## Step 7: Deploy con GitHub Pages

Questo repository è ora pronto per il deploy automatico su GitHub Pages.

1. Crea un repository nuovo su GitHub.
2. Nella cartella del progetto esegui:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<TUO_UTENTE>/<TUO_REPO>.git
   git push -u origin main
   ```
3. Su GitHub, vai alla sezione `Actions` del repository: verrà eseguito il deploy automatico.
4. Dopo il primo push, GitHub Pages pubblicherà il sito da `main`.

> Se vuoi usare un dominio personalizzato, aggiungi un file `CNAME` in root con il dominio scelto.

## Prossimi Passi: Aggiungere l'Ecommerce

Quando sarete pronti per l'ecommerce, consiglio:

### Opzione 1: WooCommerce (WordPress)
- Converte il sito WordPress
- Aggiunge un vero shop con carrello
- Integrazione PayPal/Stripe
- Gestione magazzino

### Opzione 2: Shopify
- Piattaforma dedicata all'ecommerce
- Non richiede configurazione tecnica
- Abbonamento a partire da 29$/mese

### Opzione 3: Custom Solution
- Node.js + React/Vue frontend
- Strapi CMS per i prodotti
- Stripe/PayPal per i pagamenti

Consiglio: **Iniziate con WordPress + WooCommerce** su Aruba, è la soluzione più veloce.

## Supporto e Problemi Comuni

### Il sito non si carica dopo upload
- Controlla che i file siano in `/public_html`
- Verifica che non ci sia un `index.php` che conflitto
- Pulisci cache browser (Ctrl+Shift+Del)

### Le immagini non si vedono
- Controlla i percorsi delle immagini
- Verifica che le immagini siano in `/assets`
- Prova a ricaricare con Ctrl+Shift+R

### Form non invia
- Configura Formspree (vedi Step 3)
- Oppure implementa un backend su Aruba

### Dominio non punta al sito
- Aspetta 24-48 ore per la propagazione DNS
- Nel pannello Aruba, verifica che il dominio punti al vostro hosting

## Contatti per Supporto Tecnico

Se avete problemi:
- **Aruba Support**: support.aruba.it
- **FileZilla Help**: docs.filezilla-project.org
- **HTML/CSS Questions**: stackoverflow.com (tag "html", "css")

---

## Checklist Pre-Pubblicazione

- [ ] Tutte le immagini caricate in `/assets`
- [ ] Form di contatto configurato
- [ ] Mappa Google Maps aggiornata
- [ ] Link social (se aggiunti)
- [ ] Testato in mobile (80% traffico da mobile)
- [ ] Testato in Chrome, Firefox, Safari
- [ ] URL sardasapori.it funziona
- [ ] HTTPS attivato
- [ ] Meta description corretto (SEO)

---

**Buona fortuna con il lancio di Sarda Sapori! 🌊**
