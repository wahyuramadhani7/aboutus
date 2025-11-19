// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showMessage('Mohon isi semua field yang diperlukan!', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showMessage('Mohon masukkan email yang valid!', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            showMessage('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    
    // Smooth scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide message
function hideMessage() {
    formMessage.style.opacity = '0';
    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.style.opacity = '1';
    }, 300);
}

// Input validation on blur
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#27ae60';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
});

// Email field specific validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() !== '' && !isValidEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else if (this.value.trim() !== '') {
            this.style.borderColor = '#27ae60';
        }
    });
}

// Character counter for message textarea
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = `
        text-align: right;
        font-size: 0.9rem;
        color: var(--text-light);
        margin-top: 0.5rem;
    `;
    messageTextarea.parentElement.appendChild(charCounter);
    
    const maxChars = 500;
    
    messageTextarea.addEventListener('input', function() {
        const remaining = maxChars - this.value.length;
        charCounter.textContent = `${this.value.length}/${maxChars} karakter`;
        
        if (remaining < 50) {
            charCounter.style.color = '#e74c3c';
        } else {
            charCounter.style.color = 'var(--text-light)';
        }
        
        if (remaining < 0) {
            this.value = this.value.substring(0, maxChars);
        }
    });
    
    // Initialize counter
    messageTextarea.dispatchEvent(new Event('input'));
}

// Animate form fields on focus
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// Social media links hover effect
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.05)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Contact item animation on hover
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        icon.style.transform = 'rotate(360deg) scale(1.2)';
        icon.style.transition = 'transform 0.5s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-icon');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});