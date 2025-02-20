// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Particle effect
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 150; 
    const connectionDistance = 150; 
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1; 
            this.vy = (Math.random() - 0.5) * 1;
            this.radius = Math.random() * 1.5 + 0.5; 
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(100, 181, 246, 0.6)'; 
            ctx.fill();
        }
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 181, 246, ${0.2 - distance/connectionDistance * 0.15})`; 
                    ctx.lineWidth = 0.6; 
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
});

// Typing effect
document.addEventListener('DOMContentLoaded', () => {
    const typedTextElement = document.querySelector('.typed-text');
    const phrases = [
        'Ai specialist',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Innovator'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let deletingDelay = 50;
    let newPhraseDelay = 2000;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? deletingDelay : typingDelay;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = newPhraseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(type, typeSpeed);
    }

    if (typedTextElement) {
        setTimeout(type, newPhraseDelay);
    }
});

// Cursor trail effect
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('cursorCanvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero-section');
    
    if (!canvas || !heroSection) return;

    // Set canvas size
    function resizeCanvas() {
        const rect = heroSection.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Trail effect
    const points = [];
    const maxPoints = 150;
    const trailLength = 50;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDrawing = false;

    // Smooth movement
    const easing = 0.15; // Adjust this value to change smoothness (0-1)
    
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    function addPoint(x, y) {
        points.push({ 
            x, 
            y, 
            age: 0,
            // Store velocity for each point
            vx: points.length > 0 ? x - points[points.length - 1].x : 0,
            vy: points.length > 0 ? y - points[points.length - 1].y : 0
        });
        if (points.length > maxPoints) {
            points.shift();
        }
    }

    function drawTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Smooth cursor position
        currentX = lerp(currentX, targetX, easing);
        currentY = lerp(currentY, targetY, easing);
        
        // Add new point with smoothed position
        addPoint(currentX, currentY);
        
        // Draw connecting lines
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw the trail
        for (let i = 0; i < points.length - 1; i++) {
            const point = points[i];
            const nextPoint = points[i + 1];
            const alpha = 1 - (point.age / trailLength);
            
            if (alpha <= 0) continue;

            // Calculate control points for smooth curve
            const cp1x = point.x + point.vx * 0.5;
            const cp1y = point.y + point.vy * 0.5;
            const cp2x = nextPoint.x - nextPoint.vx * 0.5;
            const cp2y = nextPoint.y - nextPoint.vy * 0.5;

            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextPoint.x, nextPoint.y);
            
            const gradient = ctx.createLinearGradient(
                point.x, point.y, 
                nextPoint.x, nextPoint.y
            );
            gradient.addColorStop(0, `rgba(95, 184, 255, ${alpha * 0.7})`);
            gradient.addColorStop(1, `rgba(95, 184, 255, ${alpha})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3 + (alpha * 4);
            ctx.shadowColor = 'rgba(95, 184, 255, 0.5)';
            ctx.shadowBlur = 10;
            ctx.stroke();
            
            point.age++;
        }

        // Remove old points
        while (points.length > 0 && points[0].age >= trailLength) {
            points.shift();
        }

        requestAnimationFrame(drawTrail);
    }

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;

        if (!isDrawing) {
            currentX = targetX;
            currentY = targetY;
            isDrawing = true;
            drawTrail();
        }
    }

    function handleMouseLeave() {
        points.length = 0;
        isDrawing = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);
});

// Cursor spotlight effect
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) {
        console.error('Hero section not found');
        return;
    }

    function updateSpotlight(e) {
        // Get the relative position within the viewport
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        // Update the CSS variables with percentage values
        heroSection.style.setProperty('--cursor-x', `${x}%`);
        heroSection.style.setProperty('--cursor-y', `${y}%`);
    }

    // Listen for mousemove on the entire document
    document.addEventListener('mousemove', updateSpotlight);
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

// Chat Widget Functions
function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    chatWidget.classList.toggle('minimized');
}

function appendMessage(message, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const userInput = document.getElementById('userMessage');
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    appendMessage(message, true);
    userInput.value = '';
    
    try {
        // Send message to backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        // Add bot response to chat
        appendMessage(data.response, false);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Sorry, I encountered an error. Please try again.', false);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chatWidget');
    const userMessageInput = document.getElementById('userMessage');

    if (chatWidget && userMessageInput) {
        chatWidget.addEventListener('click', toggleChat);
        userMessageInput.addEventListener('keypress', handleKeyPress);
    }
});
