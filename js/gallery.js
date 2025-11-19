// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.placeholder-image');
const lightboxTitle = lightbox.querySelector('.lightbox-caption h3');
const lightboxDesc = lightbox.querySelector('.lightbox-caption p');
const closeLightbox = document.querySelector('.close-lightbox');
const prevLightbox = document.querySelector('.prev-lightbox');
const nextLightbox = document.querySelector('.next-lightbox');

// Gallery data
const galleryData = [
    {
        title: 'Kencan di Kafe',
        description: 'Menikmati kopi dan kue favorit di kafe kesayangan',
        emoji: '☕'
    },
    {
        title: 'Pantai Bersama',
        description: 'Menikmati sunset yang indah di tepi pantai',
        emoji: '🌅'
    },
    {
        title: 'Anniversary',
        description: 'Merayakan anniversary pertama dengan penuh kebahagiaan',
        emoji: '🎉'
    },
    {
        title: 'Dinner Romantis',
        description: 'Makan malam yang romantis dengan lilin dan musik',
        emoji: '🍽️'
    },
    {
        title: 'Gunung Bersama',
        description: 'Mendaki gunung di pagi hari dan melihat sunrise',
        emoji: '⛰️'
    },
    {
        title: 'Ulang Tahun',
        description: 'Merayakan ulang tahun dengan penuh cinta dan kebahagiaan',
        emoji: '🎂'
    },
    {
        title: 'Nonton Bioskop',
        description: 'Marathon film favorit sambil makan popcorn',
        emoji: '🎬'
    },
    {
        title: 'Road Trip',
        description: 'Petualangan seru di jalan raya menuju destinasi impian',
        emoji: '🚗'
    },
    {
        title: 'Valentine',
        description: 'Valentine penuh cinta dengan bunga dan coklat',
        emoji: '💝'
    }
];

let currentImageIndex = 0;

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightboxFunc() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update lightbox content
function updateLightboxContent() {
    const data = galleryData[currentImageIndex];
    lightboxImage.textContent = `${data.emoji} Foto ${currentImageIndex + 1}`;
    lightboxTitle.textContent = data.title;
    lightboxDesc.textContent = data.description;
}

// Navigate to previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
}

// Navigate to next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    updateLightboxContent();
}

// Event listeners
closeLightbox.addEventListener('click', closeLightboxFunc);
prevLightbox.addEventListener('click', showPrevImage);
nextLightbox.addEventListener('click', showNextImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightboxFunc();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    }
});

// Prevent image dragging in lightbox
lightboxImage.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            showNextImage();
        } else {
            // Swipe right - previous image
            showPrevImage();
        }
    }
}

// Gallery hover effect enhancement
galleryItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});