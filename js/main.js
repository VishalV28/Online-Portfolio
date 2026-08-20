document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. ANIMATED BACKGROUND ORBS
    // =============================================
    const bgMesh = document.getElementById('bgMesh');
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'bg-orb';
        bgMesh.appendChild(orb);
    }

    // =============================================
    // 2. TYPED TEXT EFFECT
    // =============================================
    const phrases = [
        'Front-End Developer',
        'Software Engineer',
        'React Native Developer',
        'Data-Driven Problem Solver',
        'UI/UX Enthusiast'
    ];

    const typedEl = document.getElementById('typedText');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            setTimeout(typeEffect, 60);
        } else {
            typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            setTimeout(typeEffect, 30);
        }
    }

    typeEffect();

    // =============================================
    // 3. NAVBAR SCROLL EFFECT
    // =============================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =============================================
    // 4. MOBILE NAV TOGGLE
    // =============================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // =============================================
    // 5. ACTIVE NAV LINK TRACKING
    // =============================================
    const sections = document.querySelectorAll('.section, .hero');
    const navLinkEls = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinkEls.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -60% 0px'
    });

    sections.forEach(section => observerNav.observe(section));

    // =============================================
    // 6. SCROLL-TRIGGERED ANIMATIONS
    // =============================================
    const animateEls = document.querySelectorAll('.animate-in');

    const observerAnim = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations slightly
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observerAnim.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateEls.forEach(el => observerAnim.observe(el));

    // =============================================
    // 7. COUNTER ANIMATION FOR STATS
    // =============================================
    const statValues = document.querySelectorAll('.stat-value[data-count]');

    const observerCount = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                let current = 0;
                const duration = 1500;
                const increment = target / (duration / 16);

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);

                observerCount.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => observerCount.observe(el));

    // =============================================
    // 8. SMOOTH SCROLL (for browsers that need it)
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // =============================================
    // 9. TILT EFFECT ON PROJECT CARDS
    // =============================================
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

});
