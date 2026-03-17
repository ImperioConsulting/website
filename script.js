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
