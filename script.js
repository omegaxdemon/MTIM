// MTIM XXII - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('open');
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileNav.classList.contains('open')) {
                icon.innerHTML = '<path d="m6 6 12 12M6 18 18 6"></path>'; // X icon
            } else {
                icon.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>'; // Menu icon
            }
        });

        // Close mobile menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('svg');
                icon.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>';
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    
    function handleScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Active navigation highlighting
    function setActiveNav() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (currentPath === href || (currentPath === '/' && href === '/') || 
                (currentPath.includes(href) && href !== '/')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNav();

    // Smooth scrolling for anchor links (if on same page)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-right, .animate-scale-in');
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        if (el.classList.contains('animate-fade-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('animate-slide-right')) {
            el.style.transform = 'translateX(50px)';
        } else if (el.classList.contains('animate-scale-in')) {
            el.style.transform = 'scale(0.95)';
        }
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(el);
    });

    // Form submission handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.firstName || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message (in a real app, you'd send this to a server)
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Responsive banner switching for hero section
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        function updateHeroBanner() {
            const width = window.innerWidth;
            let bannerSrc;
            
            if (width < 768) {
                bannerSrc = 'assets/mobile-banner.png';
            } else if (width < 1024) {
                bannerSrc = 'assets/tablet-banner.png';
            } else {
                bannerSrc = 'assets/desktop-banner.png';
            }
            
            heroBg.style.backgroundImage = `url(${bannerSrc})`;
        }
        
        updateHeroBanner();
        window.addEventListener('resize', updateHeroBanner);
    }

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Parallax effect for hero background (simplified)
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);

    // Stagger animation delays
    const staggerElements = document.querySelectorAll('[class*="stagger-"]');
    staggerElements.forEach(element => {
        const staggerClass = Array.from(element.classList).find(cls => cls.startsWith('stagger-'));
        if (staggerClass) {
            const delay = parseInt(staggerClass.split('-')[1]) * 0.1;
            element.style.animationDelay = `${delay}s`;
        }
    });

    // External link handling
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 100;
        box-shadow: var(--shadow-glow);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
});