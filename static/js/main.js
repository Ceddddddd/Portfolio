// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// Close mobile menu on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Smooth scrolling for navigation links
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

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Initialize circular progress bars
function initializeCircleProgress() {
    const circles = document.querySelectorAll('.circle-progress');
    circles.forEach(circle => {
        const value = circle.getAttribute('data-value');
        circle.style.setProperty('--value', value);
    });
}

// Initialize progress bars when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initializeCircleProgress();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe the skills section
document.querySelector('#skills').querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const texts = [
    "Building AI Solutions",
    "Creating Smart Apps",
    "Solving Complex Problems",
    "Innovating with Code"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, typingDelay);
}

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (typedTextSpan) setTimeout(type, newTextDelay);
});

// Profile image parallax effect
const profileImage = document.querySelector('.profile-image');
const techStack = document.querySelector('.tech-stack');

document.addEventListener('mousemove', (e) => {
    if (!profileImage || !techStack) return;
    
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    profileImage.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg)`;
    techStack.style.transform = `translateY(-50%) translateX(${-mouseX * 20}px)`;
});

// Reset transform on mouse leave
document.addEventListener('mouseleave', () => {
    if (!profileImage || !techStack) return;
    
    profileImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    techStack.style.transform = 'translateY(-50%) translateX(0)';
});
