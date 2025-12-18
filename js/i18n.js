// SIMPLE I18N SYSTEM
let currentLang = localStorage.getItem('language') || 'vi';
let translations = {};

// Load language file
async function loadLanguage(lang) {
    try {
        const response = await fetch(`./locales/${lang}.json`);
        translations = await response.json();
        applyTranslations();

        // Save to localStorage
        localStorage.setItem('language', lang);
        currentLang = lang;

    } catch (error) {
        console.log('Error loading language, using fallback');
        useFallback(lang);
    }
}

// Apply translations
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const text = getTranslation(key);

        if (text) {
            element.textContent = text;
        }
    });
}

// Get translation with fallback
function getTranslation(key) {
    const keys = key.split('.');
    let result = translations;

    for (const k of keys) {
        result = result?.[k];
        if (!result) break;
    }

    return result || element.textContent; // Fallback to current text
}

// Fallback translations
function useFallback(lang) {
    const fallbacks = {
        vi: {
            'nav.home': 'Trang Chủ',
            'nav.products': 'Sản Phẩm',
            'nav.services': 'Dịch Vụ',
            'nav.about': 'Về Chúng Tôi',
            'nav.contact': 'Liên Hệ',
            'hero.cta': 'Bắt Đầu Ngay'
        },
        en: {
            'nav.home': 'Home',
            'nav.products': 'Products',
            'nav.services': 'Services',
            'nav.about': 'About Us',
            'nav.contact': 'Contact',
            'hero.cta': 'Get Started'
        }
    };

    translations = fallbacks[lang] || fallbacks.vi;
    applyTranslations();
}

// Change language
function changeLanguage(lang) {
    if (lang === currentLang) return;
    loadLanguage(lang);
    updateLanguageButtons(lang);
}

// Update language buttons UI
function updateLanguageButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    // Load initial language
    loadLanguage(currentLang);
    updateLanguageButtons(currentLang);
});