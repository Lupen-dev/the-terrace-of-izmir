// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Gallery Image Modal
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;

// Create modal
const modal = document.createElement('div');
modal.className = 'image-modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <img class="modal-image" src="" alt="">
        <div class="modal-caption"></div>
        <div class="modal-navigation">
            <button class="modal-prev">❮</button>
            <button class="modal-next">❯</button>
        </div>
    </div>
`;
document.body.appendChild(modal);

// Modal styles
const modalStyles = `
    .image-modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        animation: modalFadeIn 0.3s ease;
    }

    .modal-content {
        position: relative;
        margin: auto;
        display: block;
        width: 90%;
        max-width: 800px;
        top: 50%;
        transform: translateY(-50%);
    }

    .modal-image {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: #fff;
        font-size: 35px;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .modal-close:hover {
        color: #3498db;
    }

    .modal-caption {
        text-align: center;
        color: #fff;
        padding: 15px 0;
        font-size: 1.2rem;
    }

    .modal-navigation {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .modal-prev, .modal-next {
        background: rgba(52, 152, 219, 0.8);
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 1.2rem;
        transition: background 0.3s ease;
    }

    .modal-prev:hover, .modal-next:hover {
        background: rgba(52, 152, 219, 1);
    }

    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Add modal styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Modal elements
const modalImage = modal.querySelector('.modal-image');
const modalCaption = modal.querySelector('.modal-caption');
const modalClose = modal.querySelector('.modal-close');
const modalPrev = modal.querySelector('.modal-prev');
const modalNext = modal.querySelector('.modal-next');

// Gallery item click handlers
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        showModal();
    });
});

function showModal() {
    const currentItem = galleryItems[currentImageIndex];
    const img = currentItem.querySelector('img');
    const caption = currentItem.querySelector('h4');
    
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalCaption.textContent = caption.textContent;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    showModal();
}

function showPrevImage() {
    currentImageIndex = currentImageIndex === 0 ? galleryItems.length - 1 : currentImageIndex - 1;
    showModal();
}

// Modal event listeners
modalClose.addEventListener('click', hideModal);
modalNext.addEventListener('click', showNextImage);
modalPrev.addEventListener('click', showPrevImage);

// Close modal on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        switch (e.key) {
            case 'Escape':
                hideModal();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
        }
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Show success message (in a real application, you would send this to a server)
    showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
    contactForm.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                z-index: 3000;
                animation: slideIn 0.5s ease;
                max-width: 400px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            
            .notification-success {
                background: #27ae60;
            }
            
            .notification-error {
                background: #e74c3c;
            }
            
            .notification-info {
                background: #3498db;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        
        const notificationStyleSheet = document.createElement('style');
        notificationStyleSheet.id = 'notification-styles';
        notificationStyleSheet.textContent = notificationStyles;
        document.head.appendChild(notificationStyleSheet);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.hero-content, .about-text, .about-image, .gallery-item, .team-category, .contact-item'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
});

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Add lazy loading to images (if implemented)
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;

const loadingStyleSheet = document.createElement('style');
loadingStyleSheet.textContent = loadingStyles;
document.head.appendChild(loadingStyleSheet);

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Sayfa başına dön');
document.body.appendChild(backToTopButton);

// Back to top styles
const backToTopStyles = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #3498db;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1500;
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: #2980b9;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(52, 152, 219, 0.4);
    }
`;

const backToTopStyleSheet = document.createElement('style');
backToTopStyleSheet.textContent = backToTopStyles;
document.head.appendChild(backToTopStyleSheet);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation Enhancement
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearFieldError(e);
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Bu alan zorunludur.');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Geçerli bir e-mail adresi giriniz.');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Geçerli bir telefon numarası giriniz.');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

function clearFieldError(e) {
    const field = e.target;
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.classList.remove('error');
}

// Add field error styles
const fieldErrorStyles = `
    .field-error {
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }
    
    input.error,
    textarea.error {
        border: 2px solid #e74c3c !important;
        background: rgba(231, 76, 60, 0.1) !important;
    }
`;

const fieldErrorStyleSheet = document.createElement('style');
fieldErrorStyleSheet.textContent = fieldErrorStyles;
document.head.appendChild(fieldErrorStyleSheet);