// ====== PRELOADER ======
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});

// ====== MOUSE GLOW ======
const glow = document.getElementById('mouseGlow');
if (glow) {
    let mouseX = -300, mouseY = -300;
    let currentX = -300, currentY = -300;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
        clearTimeout(window.glowTimeout);
        window.glowTimeout = setTimeout(() => {
            glow.classList.remove('active');
        }, 200);
    });

    function followGlow() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(followGlow);
    }
    followGlow();

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        glow.style.opacity = '1';
    });
}

// ====== NAVIGATION ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// ====== STATS COUNTER ======
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

// ====== CONTACT FORM ======
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.style.background = '#00ff88';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
                this.reset();
            }, 2000);
        }, 2000);
    });
}

// ====== MODULE CARDS ======
document.querySelectorAll('.module-card, .quick-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.borderColor = '#6fffe0';
        this.style.background = 'rgba(0,255,200,0.08)';
        setTimeout(() => {
            this.style.borderColor = '';
            this.style.background = '';
        }, 400);
    });
});

console.log('%c TESTING.NINJA ', 'background: #0b0d15; color: #6fffe0; font-size: 1.5rem; padding: 0.5rem 2rem; border-radius: 30px; border: 2px solid #6fffe0;');
console.log('%c  🚀 Future Ready • Modular • Multi-Page  ', 'color: #a0d0d0; font-size: 1rem;');
