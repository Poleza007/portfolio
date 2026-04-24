/* Loader */
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
    }, 100);
});

/* Nav scroll */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* Burger */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

/* Reveal on scroll */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

/* Magnetic buttons */
document.querySelectorAll('.btn').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        el.style.transition = 'transform 0.1s ease, background 0.3s, color 0.3s, border-color 0.3s';
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0,0)';
        el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), background 0.3s, color 0.3s, border-color 0.3s';
    });
});

/* Parallax hero glow */
const glow = document.querySelector('.hero__glow');
window.addEventListener('scroll', () => {
    if (glow) glow.style.transform = `translateY(${window.scrollY * 0.2}px)`;
}, { passive: true });
