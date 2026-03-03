// ===== THEME TOGGLE =====
(function initThemeToggle() {
    const saved = localStorage.getItem('site-theme') || 'dark';
    document.documentElement.dataset.theme = saved;
    window._currentTheme = saved;

    // Set particle color based on theme
    window._particleColor = saved === 'light' ? '26, 26, 46' : '255, 255, 255';

    const iconEl = document.getElementById('theme-icon');
    if (iconEl) iconEl.textContent = saved === 'light' ? '☀️' : '🌙';

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = next;
            window._currentTheme = next;
            localStorage.setItem('site-theme', next);

            window._particleColor = next === 'light' ? '26, 26, 46' : '255, 255, 255';

            const icon = document.getElementById('theme-icon');
            if (icon) icon.textContent = next === 'light' ? '☀️' : '🌙';
        });
    }
})();

// ===== PARTICLES =====
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            const c = window._particleColor || '255, 255, 255';
            ctx.fillStyle = `rgba(${c}, ${this.opacity})`;
            ctx.fill();
        }
    }

    const count = Math.min(80, Math.floor((w * h) / 15000));
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });

        // draw lines between nearby particles
        const c = window._particleColor || '255, 255, 255';
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${c}, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
})();

// ===== SHOOTING STARS =====
(function initShootingStars() {
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.top = Math.random() * 60 + '%';
        star.style.left = Math.random() * 100 + '%';
        const angle = Math.random() * 30 + 15;
        star.style.transform = `rotate(${angle}deg)`;
        document.body.appendChild(star);

        const duration = Math.random() * 1500 + 800;
        const distance = Math.random() * 300 + 200;

        star.animate([
            { opacity: 0, transform: `rotate(${angle}deg) translateX(0)` },
            { opacity: 1, transform: `rotate(${angle}deg) translateX(${distance * 0.3}px)` },
            { opacity: 0, transform: `rotate(${angle}deg) translateX(${distance}px)` }
        ], { duration, easing: 'ease-out' });

        setTimeout(() => star.remove(), duration);
    }

    setInterval(createStar, Math.random() * 3000 + 2000);
    setTimeout(createStar, 1000);
})();

// ===== NAVBAR SCROLL =====
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
        // close menu on link click
        menu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => menu.classList.remove('active'));
        });
    }
})();

// ===== I18N TRANSLATION SYSTEM =====
(function initI18n() {
    const translations = {
        it: {
            // Nav
            'nav.about': 'Chi Sono',
            'nav.stack': 'Tech Stack',
            'nav.projects': 'Progetti',
            'nav.contact': 'Collaboriamo',

            // Tags & Terminal
            'tag.about': '&lt;chi-sono /&gt;',
            'tag.stack': '&lt;tech-stack /&gt;',
            'tag.projects': '&lt;progetti /&gt;',
            'tag.contact': '&lt;contatti /&gt;',
            'terminal.title': '~/chi-sono',

            // Hero
            'hero.badge': 'Disponibile per nuovi progetti',
            'hero.title1': 'Trasformo idee complesse in',
            'hero.title2': 'software che funziona.',
            'hero.description': 'Full-Stack Web Developer & Software Engineer. Progetto architetture backend robuste, ottimizzo software desktop e costruisco interfacce web responsive che scalano con il tuo business.',
            'hero.cta1': 'Scopri i miei lavori',
            'hero.cta2': 'Parliamone',
            'hero.stat1': 'Anni nel settore',
            'hero.stat2': 'Soluzioni rilasciate',
            'hero.stat3': 'Uptime medio',

            // Typing phrases
            'typing': [
                'Full-Stack Web Developer',
                'Backend Architect',
                'Performance Optimizer',
                'Problem Solver',
                'Clean Code Advocate'
            ],

            // About
            'about.title1': 'Dalle fondamenta in C++ alle',
            'about.title2': 'architetture web moderne',
            'about.lead': 'Ho iniziato scrivendo codice dove la performance è non negoziabile: <strong>software aziendali interni in C++ e C#</strong>, soluzioni che gestiscono flussi di lavoro critici e devono funzionare senza compromessi.',
            'about.p1': 'Oggi porto quella stessa mentalità nel mondo web. Con <strong>HTML, CSS, JavaScript, TypeScript, PHP, SQL e MongoDB</strong> costruisco applicazioni dinamiche e full-stack che uniscono la solidità del backend alla reattività di un\'interfaccia moderna.',
            'about.p2': 'Il risultato? Software che non è solo "funzionante", ma <strong>robusto, manutenibile e pronto a scalare</strong>. Che sia un tool interno per 50 utenti o una piattaforma web per migliaia, il mio obiettivo resta lo stesso: consegnare codice di cui andare fieri.',
            'about.h1': 'Architetture Solide',
            'about.h1desc': 'Backend progettati per durare e crescere con il business',
            'about.h2': 'Performance Obsessed',
            'about.h2desc': 'Ottimizzazione a ogni livello, dal database all\'UI',
            'about.h3': 'Desktop → Web',
            'about.h3desc': 'Migrazione e modernizzazione di sistemi legacy',

            // Tech Stack
            'stack.title1': 'Gli strumenti con cui',
            'stack.title2': 'costruisco soluzioni',
            'stack.subtitle': 'Un ecosistema completo, dal basso livello all\'interfaccia utente.',
            'stack.python': 'Scripting, automazione, data analysis e sviluppo backend con framework moderni.',
            'stack.cpp': 'Fondamenta solide per software desktop ad alte prestazioni e tool critici.',
            'stack.dotnet': 'Framework di riferimento per API REST, microservizi e applicazioni cross-platform.',
            'stack.html': 'Struttura semantica e design responsive. Animazioni CSS, Flexbox, Grid e glassmorphism.',
            'stack.js': 'Logica frontend e backend. ES6+, DOM API, async/await e tipizzazione forte con TS.',
            'stack.php': 'Backend server-side, query SQL, gestione database relazionali e API RESTful.',
            'stack.extras': 'Anche nel mio toolkit',

            // Projects
            'projects.title1': 'Soluzioni reali,',
            'projects.title2': 'risultati misurabili',
            'projects.inv.title': 'Gestione Inventario',
            'projects.inv.desc': 'Sistema completo per la gestione dell\'inventario aziendale. Tracciamento prodotti, movimentazioni di magazzino e reportistica integrata per ottimizzare i flussi logistici.',
            'projects.tourn.title': 'Realizzatore di Tornei',
            'projects.tourn.desc': 'Applicazione desktop in C# per la creazione e gestione di tornei. Generazione automatica di bracket, gestione partecipanti e tracciamento risultati in tempo reale.',
            'projects.market.desc': 'Tool per il tracciamento e l\'analisi di dati di mercato. Raccolta automatizzata, elaborazione e visualizzazione di trend per supportare decisioni data-driven.',

            // Contact
            'contact.title1': 'Hai un progetto in mente?',
            'contact.title2': 'Costruiamolo insieme.',
            'contact.subtitle': 'Cerchi uno sviluppatore web affidabile per una collaborazione a lungo termine o un progetto specifico? Scrivimi — rispondo entro 24 ore.',
            'contact.mode': 'Modalità',
            'contact.modeDesc': 'Full-remote · Freelance · Contratto',
            'contact.response': 'Risposta',
            'contact.responseDesc': 'Entro 24 ore lavorative',

            // Form
            'form.name': 'Nome',
            'form.namePh': 'Il tuo nome',
            'form.email': 'Email',
            'form.emailPh': 'la-tua@email.com',
            'form.subject': 'Di cosa hai bisogno?',
            'form.selectDefault': 'Seleziona un\'opzione',
            'form.optWebapp': 'Applicazione Web',
            'form.optDesktop': 'Software Desktop',
            'form.optApi': 'API / Backend',
            'form.optMigration': 'Migrazione Legacy',
            'form.optConsulting': 'Consulenza Tecnica',
            'form.optOther': 'Altro',
            'form.message': 'Raccontami del tuo progetto',
            'form.messagePh': 'Budget indicativo, tempistiche, dettagli tecnici...',
            'form.submit': 'Iniziamo a collaborare',
            'form.sent': '✓ Messaggio inviato!',

            // Footer
            'footer.text': 'Progettato, sviluppato e deployato con <span class="heart">♥</span> e tanto codice',
        },
        en: {
            // Nav
            'nav.about': 'About Me',
            'nav.stack': 'Tech Stack',
            'nav.projects': 'Projects',
            'nav.contact': 'Let\'s Talk',

            // Tags & Terminal
            'tag.about': '&lt;about-me /&gt;',
            'tag.stack': '&lt;tech-stack /&gt;',
            'tag.projects': '&lt;projects /&gt;',
            'tag.contact': '&lt;contact /&gt;',
            'terminal.title': '~/about-me',

            // Hero
            'hero.badge': 'Available for new projects',
            'hero.title1': 'I turn complex ideas into',
            'hero.title2': 'software that works.',
            'hero.description': 'Full-Stack Web Developer & Software Engineer. I design robust backend architectures, optimize desktop software and build responsive web interfaces that scale with your business.',
            'hero.cta1': 'See my work',
            'hero.cta2': 'Get in touch',
            'hero.stat1': 'Years in the field',
            'hero.stat2': 'Solutions shipped',
            'hero.stat3': 'Average uptime',

            // Typing phrases
            'typing': [
                'Full-Stack Web Developer',
                'Backend Architect',
                'Performance Optimizer',
                'Problem Solver',
                'Clean Code Advocate'
            ],

            // About
            'about.title1': 'From C++ foundations to',
            'about.title2': 'modern web architectures',
            'about.lead': 'I started writing code where performance is non-negotiable: <strong>enterprise internal software in C++ and C#</strong>, solutions that manage critical workflows and must work without compromise.',
            'about.p1': 'Today I bring that same mindset to the web world. With <strong>HTML, CSS, JavaScript, TypeScript, PHP, SQL and MongoDB</strong> I build dynamic, full-stack applications that combine backend solidity with the responsiveness of a modern interface.',
            'about.p2': 'The result? Software that isn\'t just "working", but <strong>robust, maintainable and ready to scale</strong>. Whether it\'s an internal tool for 50 users or a web platform for thousands, my goal stays the same: delivering code to be proud of.',
            'about.h1': 'Solid Architectures',
            'about.h1desc': 'Backends designed to last and grow with the business',
            'about.h2': 'Performance Obsessed',
            'about.h2desc': 'Optimization at every level, from database to UI',
            'about.h3': 'Desktop → Web',
            'about.h3desc': 'Migration and modernization of legacy systems',

            // Tech Stack
            'stack.title1': 'The tools I use to',
            'stack.title2': 'build solutions',
            'stack.subtitle': 'A complete ecosystem, from low-level to user interface.',
            'stack.python': 'Scripting, automation, data analysis and backend development with modern frameworks.',
            'stack.cpp': 'Solid foundations for high-performance desktop software and critical tools.',
            'stack.dotnet': 'Go-to framework for REST APIs, microservices and cross-platform applications.',
            'stack.html': 'Semantic structure and responsive design. CSS animations, Flexbox, Grid and glassmorphism.',
            'stack.js': 'Frontend and backend logic. ES6+, DOM API, async/await and strong typing with TS.',
            'stack.php': 'Server-side backend, SQL queries, relational database management and RESTful APIs.',
            'stack.extras': 'Also in my toolkit',

            // Projects
            'projects.title1': 'Real solutions,',
            'projects.title2': 'measurable results',
            'projects.inv.title': 'Inventory Management',
            'projects.inv.desc': 'Complete system for business inventory management. Product tracking, warehouse movements and integrated reporting to optimize logistics flows.',
            'projects.tourn.title': 'Tournament Maker',
            'projects.tourn.desc': 'Desktop application in C# for creating and managing tournaments. Automatic bracket generation, participant management and real-time result tracking.',
            'projects.market.desc': 'Tool for tracking and analyzing market data. Automated collection, processing and trend visualization to support data-driven decisions.',

            // Contact
            'contact.title1': 'Have a project in mind?',
            'contact.title2': 'Let\'s build it together.',
            'contact.subtitle': 'Looking for a reliable web developer for a long-term collaboration or a specific project? Write me — I respond within 24 hours.',
            'contact.mode': 'Work Mode',
            'contact.modeDesc': 'Full-remote · Freelance · Contract',
            'contact.response': 'Response',
            'contact.responseDesc': 'Within 24 business hours',

            // Form
            'form.name': 'Name',
            'form.namePh': 'Your name',
            'form.email': 'Email',
            'form.emailPh': 'your@email.com',
            'form.subject': 'What do you need?',
            'form.selectDefault': 'Select an option',
            'form.optWebapp': 'Web Application',
            'form.optDesktop': 'Desktop Software',
            'form.optApi': 'API / Backend',
            'form.optMigration': 'Legacy Migration',
            'form.optConsulting': 'Technical Consulting',
            'form.optOther': 'Other',
            'form.message': 'Tell me about your project',
            'form.messagePh': 'Estimated budget, timeline, technical details...',
            'form.submit': 'Let\'s start collaborating',
            'form.sent': '✓ Message sent!',

            // Footer
            'footer.text': 'Designed, developed and deployed with <span class="heart">♥</span> and lots of code',
        }
    };

    let currentLang = localStorage.getItem('site-lang') || 'it';

    function applyTranslations(lang) {
        const t = translations[lang];
        if (!t) return;

        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) el.textContent = t[key];
        });

        // Update innerHTML (for elements with embedded HTML like <strong>)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            if (t[key]) el.innerHTML = t[key];
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (t[key]) el.placeholder = t[key];
        });

        // Update html lang
        document.documentElement.lang = lang === 'en' ? 'en' : 'it';

        // Update the toggle button
        const flagEl = document.getElementById('lang-flag');
        const codeEl = document.getElementById('lang-code');
        if (flagEl) flagEl.textContent = lang === 'it' ? '🇮🇹' : '🇺🇸';
        if (codeEl) codeEl.textContent = lang === 'it' ? 'IT' : 'EN';

        // Update typing phrases
        if (t['typing'] && window._typingPhrases) {
            window._typingPhrases = t['typing'];
        }

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = lang === 'en'
                ? 'Full-Stack Web Developer & Software Engineer. Modern web applications, robust backends and responsive interfaces with HTML, CSS, JavaScript, TypeScript, PHP, Python and .NET.'
                : 'Full-Stack Web Developer & Software Engineer. Applicazioni web moderne, backend robusti e interfacce responsive con HTML, CSS, JavaScript, TypeScript, PHP, Python e .NET.';
        }
    }

    // Apply on load
    applyTranslations(currentLang);

    // Toggle listener
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'it' ? 'en' : 'it';
            localStorage.setItem('site-lang', currentLang);
            applyTranslations(currentLang);
        });
    }
})();

// ===== TYPING EFFECT =====
(function initTyping() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    window._typingPhrases = [
        'Full-Stack Web Developer',
        'Backend Architect',
        'Performance Optimizer',
        'Problem Solver',
        'Clean Code Advocate'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const phrases = window._typingPhrases;
        const current = phrases[phraseIndex % phrases.length];
        if (!deleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                setTimeout(() => { deleting = true; type(); }, 2000);
                return;
            }
            setTimeout(type, 60 + Math.random() * 40);
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 30);
        }
    }
    setTimeout(type, 800);
})();

// ===== SCROLL REVEAL =====
(function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
})();

// ===== STAT COUNTER =====
(function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                if (el.dataset.animated) return;
                el.dataset.animated = 'true';

                let current = 0;
                const duration = 1500;
                const step = target / (duration / 16);

                function update() {
                    current += step;
                    if (current >= target) {
                        el.textContent = target;
                        return;
                    }
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                }
                update();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
})();

// ===== SKILL BARS =====
(function initSkillBars() {
    const fills = document.querySelectorAll('.level-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const width = el.dataset.width;
                setTimeout(() => { el.style.width = width + '%'; }, 200);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(el => observer.observe(el));
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== CONTACT FORM (EmailJS) =====
(function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // ⚠️ CONFIGURA QUI I TUOI DATI EMAILJS ⚠️
    const EMAILJS_PUBLIC_KEY = 'YROtHd2k8uJH8fbal';      // La tua Public Key da EmailJS
    const EMAILJS_SERVICE_ID = 'service_vq637io';      // Il Service ID (es. 'service_gmail')
    const EMAILJS_TEMPLATE_ID = 'template_wdxv4lh';    // Il Template ID (es. 'template_contact')

    // Inizializza EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        const lang = localStorage.getItem('site-lang') || 'it';

        // Stato di caricamento
        btn.disabled = true;
        btn.innerHTML = `<span>${lang === 'en' ? 'Sending...' : 'Invio in corso...'}</span>
            <svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;

        // Parametri del template EmailJS
        const templateParams = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            subject: form.querySelector('#subject').value,
            message: form.querySelector('#message').value,
        };

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

            // Successo
            const sentText = lang === 'en' ? '✓ Message sent!' : '✓ Messaggio inviato!';
            btn.innerHTML = `<span>${sentText}</span>`;
            btn.style.background = 'linear-gradient(135deg, #34d399, #059669)';
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        } catch (error) {
            // Errore
            console.error('EmailJS error:', error);
            const errorText = lang === 'en' ? '✗ Failed to send. Try again.' : '✗ Invio fallito. Riprova.';
            btn.innerHTML = `<span>${errorText}</span>`;
            btn.style.background = 'linear-gradient(135deg, #f87171, #dc2626)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }
    });
})();
