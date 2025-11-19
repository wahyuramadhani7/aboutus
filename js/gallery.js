// gallery.js – versi rapi, ringan, dan berfungsi 100%

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems  = document.querySelectorAll('.gallery-item');
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc  = document.getElementById('lightbox-desc');
const closeBtn      = document.querySelector('.close-lightbox');
const prevBtn       = document.querySelector('.prev-lightbox');
const nextBtn       = document.querySelector('.next-lightbox');

let currentIndex = 0;

// ==== FILTER ====
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            const category = item.dataset.category;
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ==== LIGHTBOX ====
function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    const img   = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h3').textContent;
    const desc  = item.querySelector('.gallery-overlay p').textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent  = desc;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
}

// Event pada tombol "Lihat"
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        openLightbox(parseInt(btn.dataset.index));
    });
});

// Navigasi lightbox
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Klik di luar gambar = tutup
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// Touch swipe untuk mobile
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
lightbox.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? showNext() : showPrev();
    }
});