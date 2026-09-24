document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       Sticky Header Setup
       ========================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    /* ==========================================
       Mobile Menu Toggle
       ========================================== */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Hamburger animation
            const spans = mobileBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const spans = mobileBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    /* ==========================================
       Smooth Scroll for Anchor Links
       ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            // Adjust offset for sticky header
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
            window.scrollTo({
                 top: offsetPosition,
                 behavior: "smooth"
            });
        });
    });

    /* ==========================================
       Intersection Observer for Animations
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale');
    animateElements.forEach(el => observer.observe(el));

    /* ==========================================
       Active Navigation Highlighting
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
});

// Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.booking-modal-close');
    const openBtns = document.querySelectorAll('.open-booking-modal');

    if (!modal) return;

    function openModal(e) {
        if (e) e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

// Image Modal Logic for Planning
document.addEventListener('DOMContentLoaded', () => {
    const imgModal = document.getElementById('image-modal');
    const imgTriggers = document.querySelectorAll('.planning-img-trigger');
    const imgModalTarget = document.getElementById('img-modal-target');
    const closeImgModal = document.querySelector('.image-modal-close');

    if (imgModal && imgTriggers.length > 0) {
        const openImage = (e) => {
            if (e) e.preventDefault();
            
            let src = '';
            if (e.currentTarget.tagName === 'IMG') {
                src = e.currentTarget.src;
            } else if (e.currentTarget.dataset.imgSrc) {
                src = e.currentTarget.dataset.imgSrc;
            }
            
            if (src) {
                imgModalTarget.src = src;
                imgModal.style.display = "block";
                document.body.style.overflow = 'hidden';
            }
        };

        const closeImage = () => {
            imgModal.style.display = "none";
            document.body.style.overflow = '';
            imgModalTarget.src = '';
        };

        imgTriggers.forEach(trigger => trigger.addEventListener('click', openImage));
        
        if (closeImgModal) closeImgModal.addEventListener('click', closeImage);
        
        window.addEventListener('click', (e) => {
            if (e.target === imgModal) {
                closeImage();
            }
        });
    }
});
