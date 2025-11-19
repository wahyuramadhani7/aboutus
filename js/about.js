// about.js - Efek romantis & interaktif untuk halaman About

document.addEventListener("DOMContentLoaded", function () {
    console.log("About page loaded with love ❤️");

    // 1. Animasi masuk saat scroll (fade-up)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, observerOptions);

    document.querySelectorAll('.story-content, .timeline-item, .fact-card, .love-quote').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // 2. Timeline line yang muncul bertahap
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        const line = document.createElement('div');
        line.classList.add('timeline-line');
        timelineContainer.appendChild(line);

        setTimeout(() => {
            line.classList.add('grow');
        }, 500);
    }

    // 3. Love Counter (hari bersama sejak pertama bertemu)
    const startDate = new Date("2023-01-15"); // ubah tanggal ini sesuai pertemuan kalian
    const counterElement = document.getElementById("love-counter");

    function updateLoveCounter() {
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (counterElement) {
            counterElement.textContent = diffDays;
        }
    }

    if (document.getElementById("love-counter")) {
        updateLoveCounter();
        setInterval(updateLoveCounter, 86400000); // update tiap hari
    }

    // 4. Floating hearts di background (romantis banget!)
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.innerHTML = "❤️";

        // Posisi random horizontal
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 8 + 10 + "s";
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = Math.random() * 20 + 20 + "px";

        document.body.appendChild(heart);

        // Hapus setelah selesai animasi
        setTimeout(() => {
            heart.remove();
        }, 18000);
    }

    // Buat hati setiap beberapa detik
    setInterval(createHeart, 2500);
    // Langsung buat beberapa di awal
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 800);
    }

    // 5. Efek hover pada fun facts card
    document.querySelectorAll('.fact-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 6. Tambah sedikit confetti saat halaman dibuka (opsional, manis!)
    if (typeof confetti === "function") {
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff69b4', '#ff1493', '#ff4081', '#ffc0cb', '#ff8da1']
            });
        }, 1000);
    }
});