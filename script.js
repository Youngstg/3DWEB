// True Glass Cursor Implementation (Apple Style)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize glass cursor
    const glassCursor = document.querySelector('.glass-cursor');
    const glassLens = document.querySelector('.glass-lens');
    const glassReflection = document.querySelector('.glass-reflection');
    
    let mouseX = 0;
    let mouseY = 0;
    let lensX = 0;
    let lensY = 0;
    let reflectionX = 0;
    let reflectionY = 0;
    
    // Smooth glass cursor animation with minimal lag
    function animateGlassCursor() {
        // Lens follows mouse with very minimal easing for precise tracking
        lensX += (mouseX - lensX) * 0.9;
        lensY += (mouseY - lensY) * 0.9;
        glassLens.style.left = lensX + 'px';
        glassLens.style.top = lensY + 'px';
        
        // Reflection follows closely for liquid glass effect
        reflectionX += (mouseX - reflectionX) * 0.85;
        reflectionY += (mouseY - reflectionY) * 0.85;
        glassReflection.style.left = reflectionX + 'px';
        glassReflection.style.top = reflectionY + 'px';
        
        requestAnimationFrame(animateGlassCursor);
    }
    
    // Initialize cursor position
    function initializeCursor() {
        // Get initial mouse position
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        lensX = mouseX;
        lensY = mouseY;
        reflectionX = mouseX;
        reflectionY = mouseY;
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor when moving
        glassCursor.classList.add('visible');
    });
    
    // Add glass hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .contact-icon-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            glassCursor.classList.add('hover');
            glassCursor.classList.add('morphing');
        });
        
        el.addEventListener('mouseleave', () => {
            glassCursor.classList.remove('hover');
            glassCursor.classList.remove('morphing');
        });
    });
    
    // Add water droplet click effect
    document.addEventListener('mousedown', () => {
        glassCursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        glassCursor.classList.remove('click');
    });
    
    // Text lens cursor
    const textElements = document.querySelectorAll('p, h1, h2, h3, span, .description');
    
    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            glassCursor.classList.add('text');
        });
        
        el.addEventListener('mouseleave', () => {
            glassCursor.classList.remove('text');
        });
    });
    
    // Hide/show cursor when entering/leaving window
    document.addEventListener('mouseenter', () => {
        glassCursor.classList.add('visible');
    });
    
    document.addEventListener('mouseleave', () => {
        glassCursor.classList.remove('visible');
    });
    
    // Initialize and start glass animation
    initializeCursor();
    animateGlassCursor();

// Smooth scrolling and active navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Add click event to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Listen to scroll events
    window.addEventListener('scroll', updateActiveNav);
    
    // Optimized skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
                skillObserver.unobserve(progressBar);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Add smooth scroll to buttons in home section
    const getStartedBtn = document.querySelector('.btn-sign');
    const emailBtn = document.querySelector('.btn-get');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.querySelector('#portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Only fade-in animation for description and contact cards
    const cards = document.querySelectorAll('.description-card, .contact-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.style.opacity = '1';
                target.style.transform = 'translateY(0)';
                cardObserver.unobserve(target);
            }
        });
    }, { 
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });

    // Initialize only description and contact cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.willChange = 'opacity, transform';
        cardObserver.observe(card);
    });

    // Optimized scroll effects with throttling and cached DOM elements
    const header = document.querySelector('header');
    const layerBlur = document.querySelector('.layer-blur');
    const imageGradient = document.querySelector('.image-gradient');
    
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Parallax effects
        if (layerBlur) {
            layerBlur.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0) rotate(-30deg)`;
        }
        
        if (imageGradient) {
            imageGradient.style.transform = `translate3d(0, ${scrolled * 0.05}px, 0)`;
        }
        
        // Header effects
        if (header) {
            const opacity = Math.min(scrolled / 100, 0.95);
            const blurAmount = Math.min(scrolled / 10, 25);
            
            header.style.background = `rgba(0, 0, 0, ${opacity})`;
            header.style.backdropFilter = `blur(${blurAmount}px)`;
            header.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
            
            if (scrolled > 50) {
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                header.style.boxShadow = 'none';
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Simple scroll optimization
    window.addEventListener('scroll', requestTick, { passive: true });

    // Add typing effect to main title
    const mainTitle = document.querySelector('.home-content h1');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

});