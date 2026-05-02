/* ========== UTILITY & HELPERS ========== */

// Smooth scroll to section
function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle purchase button
function handlePurchase() {
    // TODO: Tady bude tvůj payment gateway
    // Možnosti:
    // 1. Stripe checkout
    // 2. Gopay
    // 3. Vlastní payment systém
    
    console.log('🛒 Purchase initiated');
    alert('🔒 Přesměrování na bezpečné zaplacení...\n\nTady budeš integrovat tvůj payment gateway (Stripe, Gopay, atd.)');
    
    // Příklad pro Stripe:
    // window.location.href = 'https://checkout.stripe.com/...';
}

/* ========== ANIMATIONS ========== */

// Intersection Observer pro lazy loading a scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Pozorovat všechny sekce na stránce
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
});

/* ========== SMOOTH SCROLL PRO INTERNÍ ODKAZY ========== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ========== HEADER SHADOW NA SCROLL ========== */

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    
    // Přidej shadow na scroll
    if (scrollTop > 20) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

/* ========== REVEAL ANIMATIONS - STAGGERED ========== */

// Dynamicky přidáme CSS pro animace
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .recognition-card,
    .benefit-card,
    .testimonial,
    .feature-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    section.in-view .recognition-card,
    section.in-view .benefit-card,
    section.in-view .testimonial,
    section.in-view .feature-item {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered delay pro karty */
    section.in-view .recognition-card:nth-child(1) { transition-delay: 0.1s; }
    section.in-view .recognition-card:nth-child(2) { transition-delay: 0.2s; }
    section.in-view .recognition-card:nth-child(3) { transition-delay: 0.3s; }
    section.in-view .recognition-card:nth-child(4) { transition-delay: 0.4s; }
    section.in-view .recognition-card:nth-child(5) { transition-delay: 0.5s; }
    section.in-view .recognition-card:nth-child(6) { transition-delay: 0.6s; }
    
    section.in-view .benefit-card:nth-child(1) { transition-delay: 0.1s; }
    section.in-view .benefit-card:nth-child(2) { transition-delay: 0.2s; }
    section.in-view .benefit-card:nth-child(3) { transition-delay: 0.3s; }
    section.in-view .benefit-card:nth-child(4) { transition-delay: 0.4s; }
    
    section.in-view .testimonial:nth-child(1) { transition-delay: 0.1s; }
    section.in-view .testimonial:nth-child(2) { transition-delay: 0.2s; }
    section.in-view .testimonial:nth-child(3) { transition-delay: 0.3s; }
    
    section.in-view .feature-item:nth-child(1) { transition-delay: 0.1s; }
    section.in-view .feature-item:nth-child(2) { transition-delay: 0.2s; }
    section.in-view .feature-item:nth-child(3) { transition-delay: 0.3s; }
    section.in-view .feature-item:nth-child(4) { transition-delay: 0.4s; }
    section.in-view .feature-item:nth-child(5) { transition-delay: 0.5s; }
    section.in-view .feature-item:nth-child(6) { transition-delay: 0.6s; }
`;
document.head.appendChild(styleSheet);

/* ========== BUTTON RIPPLE EFFECT ========== */

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        let rect = this.getBoundingClientRect();
        let size = Math.max(rect.width, rect.height);
        let x = e.clientX - rect.left - size / 2;
        let y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Styluj ripple
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        // Přidej animaci do headeru
        if (!document.querySelector('style[data-ripple]')) {
            const rippleStyle = document.createElement('style');
            rippleStyle.setAttribute('data-ripple', '');
            rippleStyle.textContent = `
                @keyframes rippleAnimation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
        }
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

/* ========== EMAIL VALIDATION ========== */

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ========== TRACK EVENTS ========== */

// Sledování kliknutí na CTA tlačítka
function trackEvent(eventName, eventData = {}) {
    console.log(`📊 Event: ${eventName}`, eventData);
    
    // TODO: Integrace s Google Analytics, Facebook Pixel, atd.
    // gtag('event', eventName, eventData);
    // fbq('track', eventName);
}

// Sleduj kliknutí na "Koupit Nyní"
document.addEventListener('DOMContentLoaded', () => {
    const purchaseButtons = document.querySelectorAll('[onclick*="handlePurchase"]');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('ebook_purchase_click', {
                source: button.textContent,
                timestamp: new Date().toISOString()
            });
        });
    });
});

// Sleduj scroll skrz sekce
let scrollTracked = {};
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.id || section.className;
        
        if (rect.top < window.innerHeight * 0.5 && !scrollTracked[sectionId]) {
            scrollTracked[sectionId] = true;
            trackEvent('section_viewed', { section: sectionId });
        }
    });
}, { passive: true });

/* ========== ERROR HANDLING ========== */

window.addEventListener('error', (event) => {
    console.error('❌ JavaScript Error:', event.error);
    // Zde můžeš poslat error do loggeru
});

/* ========== LOADING STATE ========== */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Stránka plně načtena');
});

/* ========== PERFORMANCE MONITORING ========== */

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`⏱️ Čas načtení stránky: ${loadTime}ms`);
    });
}

/* ========== KEYBOARD NAVIGATION ========== */

document.addEventListener('keydown', (e) => {
    // ESC zavře modály (když by byly)
    if (e.key === 'Escape') {
        console.log('ESC pressed - zavření modálů');
    }
    
    // Alt + P = Přejdi na pricing
    if (e.altKey && e.key === 'p') {
        scrollTo('#pricing');
    }
});

/* ========== MOBILE DETECTION ========== */

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
    console.log('📱 Mobilní zařízení detekováno');
    document.body.classList.add('is-mobile');
}

/* ========== ACCESSIBILITY: FOCUS MANAGEMENT ========== */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-focus');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-focus');
});

/* ========== IMAGE LAZY LOADING ========== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ========== CONSOLE WELCOME MESSAGE ========== */

console.clear();
console.log('%c🧠 MindCurrency - Jak Přerušit Vztahový Cyklus', 
    'color: #d4a574; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(212,165,116,0.5)');
console.log('%cPsychologický model, který změní tvůj pohled na vztahy.', 
    'color: #c41e3a; font-size: 14px;');
console.log('%c📱 Instagram: @mindcurrency_\n🔗 Linky: linktr.ee/MindCurrency', 
    'color: #e8dcc8; font-size: 12px;');
console.log('%c---\n💻 Desenvolvida s láskou a strategií na prodej.\n---', 
    'color: #888; font-size: 11px; font-style: italic;');

/* ========== PAYMENT GATEWAY INTEGRATION (PLACEHOLDER) ========== */

// TODO: Nahraď tímto s tvým payment gatewayem
const paymentConfig = {
    provider: 'stripe', // 'stripe' | 'gopay' | 'custom'
    apiKey: 'YOUR_API_KEY_HERE',
    productId: 'ebook_vztahovy_cyklus',
    price: 249,
    currency: 'CZK'
};

function initializePayment() {
    console.log('💳 Payment system ready:', paymentConfig);
    // Zde inicializuj tvůj payment provider
}

document.addEventListener('DOMContentLoaded', initializePayment);
