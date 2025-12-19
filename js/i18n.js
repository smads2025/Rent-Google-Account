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

        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

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
            // Skip typing text elements (handled by separate script)
            if (!element.classList.contains('typing-text')) {
                element.textContent = text;
            }
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

    return result || key; // Fallback to key if translation not found
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
            'hero.cta': 'Bắt Đầu Ngay',
            'hero.prefix': 'Thuê tài khoản invoice'
        },
        en: {
            'nav.home': 'Home',
            'nav.products': 'Products',
            'nav.services': 'Services',
            'nav.about': 'About Us',
            'nav.contact': 'Contact',
            'hero.cta': 'Get Started',
            'hero.prefix': 'Rent invoice account'
        }
    };

    translations = fallbacks[lang] || fallbacks.vi;
    applyTranslations();

    // Save to localStorage
    localStorage.setItem('language', lang);
    currentLang = lang;

    // Dispatch event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
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