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

/* Parallax hero */
const heroBefore = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (heroBefore) heroBefore.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
}, { passive: true });

/* Count-up animation for stats */
function countUp(el, target, duration = 1500) {
    const isDecimal = target.toString().includes('.');
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numEl = entry.target.querySelector('.stat__num');
            if (numEl) {
                const raw = numEl.textContent;
                const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
                const suffix = raw.replace(/[0-9.]/g, '');
                if (!isNaN(num)) {
                    countUp({ textContent: '' }, num);
                    let s = 0;
                    const sp = num / (1500 / 16);
                    const t = setInterval(() => {
                        s += sp;
                        if (s >= num) { numEl.textContent = raw; clearInterval(t); }
                        else { numEl.textContent = Math.floor(s) + suffix; }
                    }, 16);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(el => statsObserver.observe(el));
