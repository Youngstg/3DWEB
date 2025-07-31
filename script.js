// Smooth scrolling and active navigation
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
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

    // Add fade-in animation for cards when scrolling
    const cards = document.querySelectorAll('.description-card, .skill-card, .portfolio-card, .contact-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initialize cards with fade-in styles
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const layerBlur = document.querySelector('.layer-blur');
        const imageGradient = document.querySelector('.image-gradient');
        
        if (layerBlur) {
            layerBlur.style.transform = `translateY(${scrolled * 0.1}px) rotate(-30deg)`;
        }
        
        if (imageGradient) {
            imageGradient.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });

    // Enhanced header background opacity and blur on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 0.95);
        const blurAmount = Math.min(scrolled / 10, 25);
        
        header.style.background = `rgba(0, 0, 0, ${opacity})`;
        header.style.backdropFilter = `blur(${blurAmount}px)`;
        header.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
        
        // Add stronger border when scrolled
        if (scrolled > 50) {
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            header.style.boxShadow = 'none';
        }
    });

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

    // 3D object visibility and interaction control
    const splineViewer = document.querySelector('.object-3d');
    let isSplineVisible = false;
    
    if (splineViewer) {
        const splineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isSplineVisible = entry.isIntersecting;
                
                if (isSplineVisible) {
                    // Enable mouse events when visible
                    splineViewer.style.pointerEvents = 'auto';
                } else {
                    // Disable mouse events when not visible
                    splineViewer.style.pointerEvents = 'none';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        splineObserver.observe(splineViewer);
    }
});