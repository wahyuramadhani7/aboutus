// ==================== main.js – VERSI FINAL (14 OKTOBER 2025) ====================

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Tutup menu saat klik link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar berubah warna saat scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--bg-light)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.highlight-card, .timeline-item, .fact-card, .gallery-item, .contact-item')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
});

// ==================== HARI BERSAMA – MULAI 14 OKTOBER 2025 ====================
const startDate = new Date('2025-10-14T00:00:00'); // Tanggal mulai kalian

const daysCount = document.getElementById('days-count');
const memoriesCount = document.getElementById('memories-count');

// Update Hari Bersama (real-time)
function updateDaysTogether() {
    const now = new Date();
    const difference = now - startDate;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysCount) {
        daysCount.textContent = days.toLocaleString('id-ID'); // Format Indonesia: 1.234
    }
}

// Animasi counter Kenangan Indah (hanya sekali)
function animateMemories() {
    if (!memoriesCount || sessionStorage.getItem('memoriesAnimated')) return;

    let count = 0;
    const target = 150; // Ganti angka ini kalau mau beda
    const increment = target / 100;

    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            memoriesCount.textContent = target;
            clearInterval(timer);
            sessionStorage.setItem('memoriesAnimated', 'true');
        } else {
            memoriesCount.textContent = Math.floor(count);
        }
    }, 20);
}

// Jalankan saat halaman dimuat
updateDaysTogether();
animateMemories();

// Update otomatis tiap jam (cukup untuk hari baru di tengah malam)
setInterval(updateDaysTogether, 1000 * 60 * 60);

// Kalau mau super real-time (naik pas tengah malam tanpa tunggu refresh):
// setInterval(updateDaysTogether, 1000);

// Animasi kenangan muncul saat discroll ke bagian stats
const statsSection = document.querySelector('.intro-stats');
if (statsSection && !sessionStorage.getItem('memoriesAnimated')) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMemories();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

// Loading Fade In
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = 'Up';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position:fixed; bottom:30px; right:30px; width:50px; height:50px;
    background:linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color:white; border:none; border-radius:50%; font-size:1.5rem;
    cursor:pointer; opacity:0; visibility:hidden; transition:all 0.3s ease;
    z-index:999; box-shadow:0 5px 15px rgba(0,0,0,0.2);
`;
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTopBtn.addEventListener('mouseenter', () => backToTopBtn.style.transform = 'scale(1.1)');
backToTopBtn.addEventListener('mouseleave', () => backToTopBtn.style.transform = 'scale(1)');

// ==================== SELESAI – KODE SUDAH 100% LENGKAP ====================