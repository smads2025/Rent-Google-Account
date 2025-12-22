// ============ Page Load Effect & Initialization ============
document.addEventListener('DOMContentLoaded', function () {
    // 1. Fade in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(function () {
        document.body.style.opacity = '1';
    }, 50);

    // 2. Initialize scroll effect
    handleScroll();

    // 3. Initialize typing effect with current language
    initTypingEffect();
});

// ============ Variables ============
let currentPage = 'home';

// ============ Typing i18n Data ============
const typingI18n = {
    vi: [
        "Tài khoản Google",
        "Tài khoản Facebook"
    ],
    en: [
        "Google Account",
        "Facebook Account"
    ]
};

// ============ Typing Effect Variables ============
const typingText = document.getElementById('typingText');
const getInitialLang = () => localStorage.getItem('language') || 'vi';
let texts = typingI18n[getInitialLang()];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false; // QUAN TRỌNG: Phải là FALSE khi bắt đầu

// ============ Initialize Typing Effect ============
function initTypingEffect() {
    console.log("🔄 INIT: Resetting typing effect...");

    // RESET HOÀN TOÀN
    const currentLang = getInitialLang();
    texts = typingI18n[currentLang];
    textIndex = 0;
    charIndex = 0;
    isDeleting = false; // ĐẢM BẢO LÀ FALSE
    typingText.textContent = '';

    console.log(`✅ Reset done: textIndex=${textIndex}, charIndex=${charIndex}, isDeleting=${isDeleting}`);

    // Start typing effect after 1 second
    setTimeout(typeEffect, 1000);
}

// ============ Typing Effect Function ============
function typeEffect() {
    const currentText = texts[textIndex];

    console.log(`=== DEBUG ===`);
    console.log(`Text: "${currentText}"`);
    console.log(`isDeleting: ${isDeleting} (QUAN TRỌNG: phải là false khi gõ!)`);
    console.log(`charIndex: ${charIndex}/${currentText.length}`);

    // FIX QUAN TRỌNG: Nếu isDeleting là true khi không nên
    if (isDeleting && charIndex === 0) {
        console.log("🚨 ERROR: isDeleting=true khi chưa gõ gì! Fixing...");
        isDeleting = false;
    }

    if (isDeleting) {
        // ========== ĐANG XOÁ ==========
        if (charIndex > 0) {
            charIndex--;
            typingText.textContent = currentText.substring(0, charIndex);
            console.log(`🗑️  Xoá: "${typingText.textContent}"`);

            if (charIndex === 0) {
                // Xoá xong -> DỪNG 2s -> GÕ TEXT MỚI
                console.log(`✅ Xoá xong -> Dừng 2000ms -> Chuyển text mới`);
                setTimeout(() => {
                    isDeleting = false; // RESET VỀ FALSE
                    textIndex = (textIndex + 1) % texts.length;
                    charIndex = 0;
                    typingText.textContent = '';
                    typeEffect(); // Gọi ngay để gõ text mới
                }, 100);
            } else {
                setTimeout(typeEffect, 80);
            }
        }
    } else {
        // ========== ĐANG GÕ ==========
        if (charIndex < currentText.length) {
            charIndex++;
            typingText.textContent = currentText.substring(0, charIndex);
            console.log(`✍️  Gõ: "${typingText.textContent}"`);

            if (charIndex === currentText.length) {
                // GÕ XONG -> DỪNG 3s -> MỚI XOÁ
                console.log(`✅ Gõ xong "${currentText}" -> Dừng 3000ms -> Sau đó mới xoá`);
                setTimeout(() => {
                    isDeleting = true; // CHỈ SET TRUE SAU KHI ĐÃ DỪNG
                    typeEffect(); // Gọi để xoá
                }, 3000);
            } else {
                setTimeout(typeEffect, 120);
            }
        }
    }
}

// ============ Initialize Typing Effect ============
function initTypingEffect() {
    // Reset typing with current language
    const currentLang = getInitialLang();
    texts = typingI18n[currentLang];
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingText.textContent = '';

    // Start typing effect after 1 second
    setTimeout(typeEffect, 1000);
}

// ============ Scroll Effect ============
function handleScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ============ Mobile Menu Toggle ============
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const closeMenu = document.getElementById('closeMenu');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('show');
}

hamburger.addEventListener('click', toggleMobileMenu);
mobileOverlay.addEventListener('click', toggleMobileMenu);
closeMenu.addEventListener('click', toggleMobileMenu);

// ============ Navigation Active State ============
function setActiveNavItem(page) {
    currentPage = page;

    // Desktop menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    // Mobile menu
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
}

// Handle navigation clicks
document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        setActiveNavItem(page);

        // Close mobile menu if open
        if (mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }

        // Scroll to section if exists
        const sectionId = page;
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============ Language Switcher ============
document.querySelectorAll('.lang-btn').forEach(btn => {
    // Set active button based on saved language
    const currentLang = getInitialLang();
    if (btn.dataset.lang === currentLang) {
        btn.classList.add('active');
    }

    btn.addEventListener('click', function () {
        const lang = this.dataset.lang;

        // Call i18n function to change language
        if (typeof changeLanguage === 'function') {
            changeLanguage(lang);
        }

        // Update UI immediately
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang);
        });

        // Reset typing effect với ngôn ngữ mới
        texts = typingI18n[lang];
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typingText.textContent = '';

        // Bắt đầu lại typing effect
        setTimeout(typeEffect, 1000);
    });
});

// ============ Listen for Language Changes ============
// This ensures typing effect updates when language changes via i18.js
window.addEventListener('languageChanged', function (event) {
    const lang = event.detail.lang;

    // Update typing texts
    texts = typingI18n[lang];
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingText.textContent = '';

    // Update language buttons UI (already handled by i18.js, but just in case)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Restart typing effect after a short delay
    setTimeout(typeEffect, 500);
});

// ============ Testimonial Tabs ============
const tabPills = document.querySelectorAll('.tab-pill');
const testimonialText = document.getElementById('testimonialText');
const testimonialAuthor = document.getElementById('testimonialAuthor');
const testimonialRole = document.getElementById('testimonialRole');
const testimonialGif = document.getElementById('testimonialGif');

const testimonials = {
    agencies: {
        text: "Chiến dịch ngành game online được phân phối ổn định nhờ tài khoản Invoice đã xác minh. Ngân sách chi tiêu mượt, hạn chế gián đoạn và giúp tối ưu hiệu quả quảng cáo trong suốt quá trình chạy.",
        author: "Khách hàng Game Online",
        role: "Doanh nghiệp phát hành & vận hành trò chơi trực tuyến.",
        gif: "media/gamebilling.gif"
    },
    affiliates: {
        text: "Các chiến dịch liên quan đến tài sản số được hỗ trợ triển khai trên tài khoản có độ tin cậy cao. Quảng cáo hiển thị đều, kiểm soát rủi ro tốt và phù hợp cho kế hoạch chạy dài hạn.",
        author: "Khách hàng Crypto",
        role: "Đội ngũ phát triển dự án & nền tảng blockchain",
        gif: "media/crypto.gif"
    },
    crypto: {
        text: "Chiến dịch video được phân phối ổn định với khả năng tiếp cận đúng tệp khách hàng. Tài khoản giúp tối ưu chi phí, tăng lượt xem chất lượng và duy trì hiệu suất quảng cáo liên tục.",
        author: "Khách hàng Video Smart",
        role: "Đơn vị sản xuất nội dung & marketing video",
        gif: "media/videosmart.gif"
    }
};

tabPills.forEach(pill => {
    pill.addEventListener('click', () => {
        tabPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const tabName = pill.dataset.tab;
        const testimonial = testimonials[tabName];

        // Fade effect
        testimonialText.style.opacity = '0';
        testimonialAuthor.style.opacity = '0';
        testimonialRole.style.opacity = '0';
        testimonialGif.style.opacity = '0';

        setTimeout(() => {
            testimonialText.textContent = testimonial.text;
            testimonialAuthor.textContent = testimonial.author;
            testimonialRole.textContent = testimonial.role;
            testimonialGif.src = testimonial.gif;

            testimonialText.style.opacity = '1';
            testimonialAuthor.style.opacity = '1';
            testimonialRole.style.opacity = '1';
            testimonialGif.style.opacity = '1';
        }, 300);
    });
});

// ============ Scroll To Top Functionality ============
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show/hide button based on scroll position
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});