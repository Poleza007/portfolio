/* ===========================
   PAGE LOAD BLUR
   Overlay поверх страницы — не ломает position:fixed
   =========================== */
const loader = document.createElement('div');
loader.id = 'page-loader';
document.body.prepend(loader);

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 550);
    }, 100);
});

/* ===========================
   NAV SCROLL
   =========================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===========================
   BURGER MENU
   =========================== */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===========================
   SMOOTH SCROLL
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ===========================
   TEXT LINE REVEAL
   Wraps each heading in overflow:hidden
   and slides it up on scroll
   =========================== */
function initTextReveal() {
    document.querySelectorAll('.section-title, .contact__title').forEach(el => {
        // Remove fade-in since we handle it here
        el.classList.remove('fade-in');

        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        el.style.transform = 'translateY(100%)';
        el.style.opacity = '0';
        el.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease';

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.style.transform = 'translateY(0)';
                    el.style.opacity = '1';
                    obs.unobserve(wrapper);
                }
            });
        }, { threshold: 0.2 });

        obs.observe(wrapper);
    });

    // Paragraphs — стаггерный fade снизу вверх
    document.querySelectorAll('.about__text, .contact__text, .services__price-note p, .process__step-desc, .hero__desc').forEach((el, i) => {
        el.classList.remove('fade-in');
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.2 });

        obs.observe(el);
    });
}

initTextReveal();

/* ===========================
   FADE-IN FROM BOTTOM
   Staggered for grid children
   =========================== */
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const siblings = [...(entry.target.parentElement?.querySelectorAll('.fade-in') || [])];
            const idx = siblings.indexOf(entry.target);
            const delay = idx >= 0 ? idx * 0.12 : 0;
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ===========================
   MAGNETIC CURSOR
   Кнопки и лого притягиваются к курсору
   =========================== */
function initMagnetic() {
    // Сильный магнетизм — кнопки
    document.querySelectorAll('.btn').forEach(el => {
        let isHovered = false;

        el.addEventListener('mouseenter', () => {
            isHovered = true;
            el.style.transition = 'transform 0.15s ease, background 0.3s, color 0.3s';
        });

        el.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            el.style.transform = `translate(${dx * 0.38}px, ${dy * 0.38}px)`;
        });

        el.addEventListener('mouseleave', () => {
            isHovered = false;
            el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, color 0.3s';
            el.style.transform = 'translate(0, 0)';
        });
    });

    // Слабый магнетизм — карточки
    document.querySelectorAll('.service-card, .portfolio-card').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            el.style.transform = `translate(${dx * 0.04}px, ${dy * 0.04}px) translateY(-6px)`;
            el.style.transition = 'transform 0.15s ease';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // Лого
    const logo = document.querySelector('.nav__logo');
    if (logo) {
        logo.style.cursor = 'default';
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            logo.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
            logo.style.transition = 'transform 0.1s ease';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'translate(0, 0)';
            logo.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    }
}

initMagnetic();

/* ===========================
   PARALLAX ON SCROLL
   =========================== */
function initParallax() {
    const bgText   = document.querySelector('.hero__bg-text');
    const heroPhoto = document.querySelector('.hero__photo-wrap');
    const heroLeft  = document.querySelector('.hero__left');

    function onScroll() {
        const y = window.scrollY;
        if (bgText)    bgText.style.transform    = `translate(-50%, calc(-50% + ${y * 0.28}px))`;
        if (heroPhoto) heroPhoto.style.transform  = `translateY(${y * 0.14}px)`;
        if (heroLeft)  heroLeft.style.transform   = `translateY(${y * 0.07}px)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
}

initParallax();
