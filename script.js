/* ========== UTILITY & HELPERS ========== */

function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function handlePurchase() {
    console.log('🛒 Purchase initiated');
    alert('🔒 Přesměrování na bezpečné zaplacení...\n\nTady budeš integrovat tvůj payment gateway (Stripe, Gopay, atd.)');
}

/* ========== FAQ ACCORDION ========== */

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    faqItem.classList.toggle('active');
}

/* ========== ANIMATIONS ========== */

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

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
});

/* ========== SMOOTH SCROLL ========== */

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

/* ========== HEADER SHADOW ON SCROLL ========== */

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 20) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

/* ========== REVEAL ANIMATIONS ========== */

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .problem-item,
    .inside-item,
    .testimonial {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    section.in-view .problem-item,
    section.in-view .inside-item,
    section.in-view .testimonial {
        opacity: 1;
        transform: translateY(0);
    }
    
    section.in-view .problem-item:nth-child(1) { transition-delay: 0.1s; }
    section.in-view .problem-item:nth-child(2) { transition-delay: 0.2s; }
    section.in-view .problem-item:nth-child(3) { transition-delay: 0.3s; }
    section.in-view .problem-item:nth-child(4) { transition-delay: 0.4s; }
    section.in-view .problem-item:nth-child(5) { transition-delay: 0.5s; }
    
    section.in-view .inside-item:nth-child(1) { transition-delay: 0.1s; }
    section.in-view .inside-item:nth-child(2) { transition-delay: 0.2s; }
    section.in-view .inside-item:nth-child(3) { transition-delay: 0.3s; }
    section.in-view .inside-item:nth-child(4) { transition-delay: 0.4s; }
    section.in-view .inside-item:nth-child(5) { transition-delay: 0.5s; }
    section.in-view .inside-item:nth-child(6) { transition-delay: 0.6s; }
    
    section.in-view .testimonial:nth-child(1) { transition-delay: 0.1s; }
    section.in-view .testimonial:nth-child(2) { transition-delay: 0.2s; }
    section.in-view .testimonial:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(styleSheet);

/* ========== TRACK EVENTS ========== */

function trackEvent(eventName, eventData = {}) {
    console.log(`📊 Event: ${eventName}`, eventData);
}

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

/* ========== PERFORMANCE MONITORING ========== */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ MindCurrency stránka plně načtena');
});

/* ========== CONSOLE MESSAGE ========== */

console.clear();
console.log('%c👑🧠 MindCurrency - Proč Tě Přitahují Emočně Nedostupní Lidé', 
    'color: #d4a574; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(212,165,116,0.5)');
console.log('%cVědecký model jak přerušit vztahový cyklus.', 
    'color: #c41e3a; font-size: 14px;');
console.log('%c📱 Instagram: @mindcurrency_\n🔗 Linky: linktr.ee/MindCurrency', 
    'color: #e8dcc8; font-size: 12px;');
