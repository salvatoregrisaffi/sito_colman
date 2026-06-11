# Guida: Configurazione Form di Contatto

## Opzione 1: Formspree (CONSIGLIATO - Gratuito e Facile)

Formspree è il modo più veloce per aggiungere un form funzionante senza codice backend.

### Step 1: Registrati su Formspree

1. Visita https://formspree.io/
2. Clicca "Sign Up"
3. Registrati con email e password
4. Conferma email

### Step 2: Crea un nuovo Form

1. Nel dashboard, clicca "+ New Project"
2. Dai un nome: "Sarda Sapori Contact"
3. Clicca "Create"
4. Clicca "+ Add Form"
5. Nomina il form: "contact-form"
6. Clicca "Create Form"

### Step 3: Copia il Form ID

Vedrai qualcosa come:
```
https://formspree.io/f/xyzabcdef
```

Copia: `xyzabcdef` (è il tuo FORM_ID)

### Step 4: Aggiorna il File HTML

Nel file `index.html`, trova la sezione form (intorno a riga 220):

**PRIMA:**
```html
<form id="contactForm" class="form">
```

**DOPO:**
```html
<form action="https://formspree.io/f/xyzabcdef" method="POST" class="form">
```

Sostituisci `xyzabcdef` con il tuo FORM_ID.

### Step 5: Rimuovi lo Script di Validazione

Nel file `js/main.js`, trova la sezione "FORM CONTATTI" (intorno a riga 73) e **commenta o rimuovi** questo blocco:

```javascript
// RIMUOVI QUESTO (oppure commenta con // )
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // ... resto del codice ...
    });
}
```

### Step 6: Testa il Form

1. Ricarica il sito
2. Compila il form di contatto
3. Clicca "Invia Messaggio"
4. Dovresti ricevere un'email di conferma
5. Nel dashboard Formspree, vedrai il messaggio

---

## Opzione 2: PHP (Se Preferite Un Backend Custom)

Se Aruba supporta PHP (è incluso), potete usare lo script seguente.

### Step 1: Crea `send-email.php`

Crea un file `/send-email.php` nella root del sito:

```php
<?php
// Configurazione
$to = "sara@sardasapori.it"; // Email dove ricevere i messaggi
$from_domain = "sardasapori.it";

// Validazione dati
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Metodo non consentito');
}

// Raccogli i dati
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Validazione
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    die('Tutti i campi sono obbligatori');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die('Email non valida');
}

// Costruisci il messaggio email
$email_subject = "[Sarda Sapori] Nuovo messaggio da: $name";
$email_body = "
Nome: $name
Email: $email
Soggetto: $subject

Messaggio:
$message
";

// Header email
$headers = "From: noreply@$from_domain\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Invia email
if (mail($to, $email_subject, $email_body, $headers)) {
    // Invia anche una email di conferma al cliente
    $confirmation_subject = "Abbiamo ricevuto il tuo messaggio - Sarda Sapori";
    $confirmation_body = "
Caro/a $name,

Grazie per aver contattato Sarda Sapori!

Abbiamo ricevuto il tuo messaggio:
\"$message\"

Ti contatteremo al più presto all'indirizzo email $email.

Cordiali saluti,
Team Sarda Sapori
    ";
    
    $confirmation_headers = "From: noreply@$from_domain\r\n";
    $confirmation_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    mail($email, $confirmation_subject, $confirmation_body, $confirmation_headers);
    
    // Risposta di successo
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Messaggio inviato con successo']);
} else {
    // Errore nell'invio
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore nell\'invio del messaggio']);
}

// Funzione per sanitizzare input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
```

### Step 2: Aggiorna il Form HTML

Nel file `index.html`, cambia l'attributo `action` del form:

```html
<form action="send-email.php" method="POST" class="form">
```

### Step 3: Aggiorna il JavaScript

Nel file `js/main.js`, sostituisci la sezione FORM CONTATTI:

```javascript
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;

            const response = await fetch('send-email.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert('Grazie! Il vostro messaggio è stato inviato con successo.');
                contactForm.reset();
            } else {
                alert('Errore: ' + result.message);
            }
        } catch (error) {
            console.error('Errore:', error);
            alert('Si è verificato un errore. Riprova più tardi.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
```

---

## Opzione 3: EmailJS (Se Usate JavaScript Puro)

EmailJS permette di inviare email direttamente dal browser senza backend.

### Step 1: Registrati su EmailJS

1. Visita https://www.emailjs.com/
2. Clicca "Sign Up Free"
3. Registrati

### Step 2: Setup Account

1. Vai a "Email Services"
2. Aggiungi un nuovo servizio (es. Gmail)
3. Segui le istruzioni di setup

### Step 3: Crea un Template

1. Vai a "Email Templates"
2. Clicca "+ Create New Template"
3. Personalizza il template con i parametri:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`

### Step 4: Aggiorna HTML e JavaScript

Aggiungi nel `<head>` dell'HTML:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
```

Nel `js/main.js`:
```javascript
// Inizializza EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Prendi da EmailJS dashboard

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const params = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        };

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;

        try {
            const response = await emailjs.send(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                params
            );

            alert('Messaggio inviato con successo!');
            contactForm.reset();
        } catch (error) {
            alert('Errore nell\'invio: ' + error.text);
        } finally {
            submitBtn.textContent = 'Invia Messaggio';
            submitBtn.disabled = false;
        }
    });
}
```

---

## Quale Scegliere?

| Opzione | Pros | Contras | Consiglio |
|---------|------|---------|----------|
| **Formspree** | Facile, gratuito, no backend | Limite di 50 form/mese (free) | ✅ **MIGLIORE** |
| **PHP** | Completo, personalizzabile | Richiede configurazione | Se avete un developer |
| **EmailJS** | Tutto nel browser, no server | Token visibile nel codice | Piccoli progetti |

---

## Problemi Comuni

### Formspree: "Form non trovato"
- Verifica di aver copiato correttamente il FORM_ID
- Assicurati che il form sia confermato su Formspree

### PHP: "Errore 500"
- Contatta Aruba per verificare se PHP è abilitato
- Controlla i log di errore PHP

### EmailJS: Email non inviata
- Verifica che il servizio email sia configurato
- Controlla la console del browser (F12 → Console)

---

**Raccomandazione finale:** Usate **Formspree** per semplicità e affidabilità! 🚀
