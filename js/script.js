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

    // 3. Start typing effect after 1 second
    setTimeout(typeEffect, 1000);
});

// ============ Variables ============
let currentPage = 'home';

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

// Handle navigation clicks - FIXED SELECTOR
document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        setActiveNavItem(page);

        // Close mobile menu if open
        if (mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }

        // Optional: Scroll to section if exists
        const sectionId = page; // home, products, services, etc.
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============ Language Switcher ============
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const lang = this.dataset.lang;

        // Call i18n function to change language
        if (typeof changeLanguage === 'function') {
            changeLanguage(lang);
        }

        // Update UI
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang);
        });
    });
});

// ============ Typing Effect ============
const typingText = document.getElementById('typingText');
const texts = [
    'Microsoft Ads Agency',
    'Google Ads Agency',
    'TikTok Ads Agency',
    'Facebook Ads Agency',
    'LinkedIn Ads Agency'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// ============ Testimonial Tabs ============
const tabPills = document.querySelectorAll('.tab-pill');
const testimonialText = document.getElementById('testimonialText');
const testimonialAuthor = document.getElementById('testimonialAuthor');
const testimonialRole = document.getElementById('testimonialRole');

const testimonials = {
    agencies: {
        text: "Media Blast streamlined our entire account creation process. We went from waiting weeks to getting premium agency accounts approved in just 48 hours. The quality and reliability have been exceptional for our clients.",
        author: "Sarah Johnson",
        role: "Head of Operations, Digital Agency XYZ"
    },
    affiliates: {
        text: "As an affiliate marketer, speed is everything. Media Blast gave me instant access to top-tier ad accounts that would have taken months to get approved on my own. My ROI increased by 300% in the first quarter.",
        author: "Michael Chen",
        role: "Performance Marketing Lead, Affiliate Network Pro"
    },
    crypto: {
        text: "Finding compliant ad accounts for crypto campaigns was nearly impossible until we found Media Blast. They understand the industry and provide accounts that actually work for blockchain and Web3 projects.",
        author: "Alex Rodriguez",
        role: "CMO, CryptoVentures Inc"
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

        setTimeout(() => {
            testimonialText.textContent = testimonial.text;
            testimonialAuthor.textContent = testimonial.author;
            testimonialRole.textContent = testimonial.role;

            testimonialText.style.opacity = '1';
            testimonialAuthor.style.opacity = '1';
            testimonialRole.style.opacity = '1';
        }, 300);
    });
});

// Scroll To Top Functionality
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
