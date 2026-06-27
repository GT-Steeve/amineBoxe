// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// === BURGER MENU ===
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('active');
    });
});

// === PARTICLES ===
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 18;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
        left: ${Math.random() * 100}%;
        --dur: ${4 + Math.random() * 6}s;
        --delay: ${Math.random() * 8}s;
        --drift: ${(Math.random() - 0.5) * 100}px;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
    `;
    particlesContainer.appendChild(p);
}

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// === NUMBER COUNTERS ===
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// === SKILL BARS ===
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                bar.classList.add('animated');
            });
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.highlight-box').forEach(el => barObserver.observe(el));

// === CAROUSELS ===
const carousels = {
    photo: {
        element: document.getElementById('photoCarousel'),
        dotsContainer: null,
        currentIndex: 0,
        itemCount: 16
    },
    video: {
        element: document.getElementById('videoCarousel'),
        dotsContainer: document.getElementById('videoCarouselDots'),
        currentIndex: 0,
        itemCount: 3
    }
};

function initCarousels() {
    Object.keys(carousels).forEach(type => {
        createDots(type);
        updateCarousel(type);
    });
    updatePhotoCarouselHeight();
}

function createDots(type) {
    const c = carousels[type];
    if (!c.dotsContainer) return;
    for (let i = 0; i < c.itemCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(type, i));
        c.dotsContainer.appendChild(dot);
    }
}

function moveCarousel(type, direction) {
    const c = carousels[type];
    c.currentIndex = (c.currentIndex + direction + c.itemCount) % c.itemCount;
    updateCarousel(type);
}

function goToSlide(type, index) {
    const c = carousels[type];
    c.currentIndex = index;
    updateCarousel(type);
}

function updateCarousel(type) {
    const c = carousels[type];
    c.element.style.transform = `translateX(-${c.currentIndex * 100}%)`;
    if (type === 'photo') {
        const counter = document.getElementById('photoCounter');
        if (counter) counter.textContent = `${c.currentIndex + 1} / ${c.itemCount}`;
        updatePhotoCarouselHeight();
    }
    if (c.dotsContainer) {
        c.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === c.currentIndex);
        });
    }
}

// === HAUTEUR DYNAMIQUE CAROUSEL PHOTO ===
function updatePhotoCarouselHeight() {
    if (document.fullscreenElement) return;
    const c = carousels.photo;
    const items = c.element.querySelectorAll('.carousel-item');
    const img = items[c.currentIndex]?.querySelector('img');
    if (!img) return;
    const container = c.element.closest('.carousel-container');
    const apply = () => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            container.style.height = (container.offsetWidth * img.naturalHeight / img.naturalWidth) + 'px';
        }
    };
    if (img.complete && img.naturalWidth > 0) apply();
    else img.addEventListener('load', apply, { once: true });
}

window.addEventListener('resize', updatePhotoCarouselHeight);

// === PLEIN ÉCRAN ===
const fullscreenBtn = document.getElementById('fullscreenBtn');
const iconExpand = `<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`;
const iconCompress = `<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`;

function toggleFullscreen() {
    const container = document.querySelector('.carousel-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('fullscreenchange', () => {
    if (fullscreenBtn) {
        fullscreenBtn.innerHTML = document.fullscreenElement ? iconCompress : iconExpand;
    }
    if (!document.fullscreenElement) updatePhotoCarouselHeight();
});

// Touch swipe support
let touchStartX = 0;

function addSwipe(containerSelector, type) {
    const el = document.querySelector(containerSelector);
    if (!el) return;
    el.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    el.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) moveCarousel(type, diff > 0 ? 1 : -1);
    });
}

addSwipe('.carousel-container', 'photo');
addSwipe('.video-carousel-container', 'video');

initCarousels();

// === MODAL CONTACT ===
const modal = document.getElementById('contactModal');

function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function closeModalOnOverlay(e) {
    if (e.target === modal) closeModal();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});


// === SMOOTH ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
