// ============================================
// MENU MOBILE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Chiudi menu quando si clicca su un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Chiudi menu quando si clicca fuori
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLL PER LINK ANCORA
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Osserva tutti i card quando caricano
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        '.product-card, .service-card, .team-member, .contact-item'
    );
    
    elements.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// FORM CONTATTI
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Raccogli i dati del form
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validazione di base
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Per favore, compila tutti i campi.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Per favore, inserisci un indirizzo email valido.');
            return;
        }

        try {
            // Mostra messaggio di caricamento
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;

            // Invia il form a Formspree o alternativa (configurare il vostro endpoint)
            // Per adesso, mostra un messaggio di successo
            
            // Dopo 2 secondi mostra il messaggio
            setTimeout(() => {
                alert('Grazie! Il vostro messaggio è stato inviato con successo. Vi contatteremo presto.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);

        } catch (error) {
            console.error('Errore:', error);
            alert('Si è verificato un errore. Contattaci direttamente via email.');
        }
    });
}

// ============================================
// ACTIVE NAV LINK AL SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(current => {
        const sectionTop = current.offsetTop;
        const sectionHeight = current.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            const currentId = current.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.style.color = 'var(--accent-color)';
            }
        }
    });
});

// ============================================
// NAVBAR SHADOW ON SCROLL
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 10) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Funzione per aggiungere stile attivo ai nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-color) !important;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ============================================
// LAZY LOADING IMAGES (Fallback)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                const newSrc = img.dataset.src || img.src;
                
                const imgElement = new Image();
                imgElement.onload = () => {
                    img.src = newSrc;
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease-in';
                };
                imgElement.src = newSrc;
                
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// INIZIALIZZAZIONE AL CARICAMENTO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sarda Sapori website loaded successfully');
    
    // Aggiungi animazione di caricamento
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in';
    }, 100);
});
