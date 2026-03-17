// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animations for sibling elements
            const siblings = entry.target.parentElement.querySelectorAll('[data-aos]');
            const i = Array.from(siblings).indexOf(entry.target);
            entry.target.style.transitionDelay = `${i * 0.08}s`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Language toggle
const langBtns = document.querySelectorAll('.lang-btn');
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update active button
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update all translatable elements
    document.querySelectorAll('[data-en][data-fr]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Check if it's an element that should use innerHTML (contains HTML tags)
            if (text.includes('<') || text.includes('&')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Update the html lang attribute
    document.documentElement.lang = lang;
}

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});

// Apply saved language on page load
if (currentLang !== 'en') {
    setLanguage(currentLang);
}

// Animated number counter
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = match[2]; // e.g. "+"
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));
}
