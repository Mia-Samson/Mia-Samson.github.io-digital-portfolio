document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        // Load preference
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '☀️';
        }

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.innerHTML = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeBtn.innerHTML = '☀️';
            }
        });
    }

    // --- Mobile Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '☰';
            });
        });
    }

    // --- Typing Animation (Hero Section) ---
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const phrases = ["B.Tech CSE Student", "Bharatanatyam Dancer", "Public Speaker", "Passionate Learner"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before typing next
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        setTimeout(typeEffect, 1000);
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Login Form Logic ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('password-error');
        const togglePasswordBtn = document.getElementById('toggle-password');
        const successMsg = document.getElementById('login-success-msg');

        // Toggle Password visibility
        if (togglePasswordBtn) {
            togglePasswordBtn.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
            });
        }

        const isValidEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Email Validation
            if (!emailInput.value.trim()) {
                emailError.textContent = "Email must not be empty";
                emailError.style.display = "block";
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                emailError.textContent = "Please enter a valid email (e.g., name@example.com)";
                emailError.style.display = "block";
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailError.style.display = "none";
                emailInput.classList.remove('is-invalid');
            }

            // Password Validation
            if (!passwordInput.value) {
                passwordError.textContent = "Password must not be empty";
                passwordError.style.display = "block";
                passwordInput.classList.add('is-invalid');
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                passwordError.textContent = "Password must contain at least 6 characters";
                passwordError.style.display = "block";
                passwordInput.classList.add('is-invalid');
                isValid = false;
            } else {
                passwordError.style.display = "none";
                passwordInput.classList.remove('is-invalid');
            }

            // Success Action
            if (isValid) {
                successMsg.style.display = "block";
                const submitBtn = loginForm.querySelector("button[type='submit']");
                submitBtn.disabled = true;
                submitBtn.textContent = "Logging in...";
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
        
        // Remove error states on typing
        emailInput.addEventListener('input', () => {
            emailError.style.display = "none";
            emailInput.classList.remove('is-invalid');
        });
        passwordInput.addEventListener('input', () => {
            passwordError.style.display = "none";
            passwordInput.classList.remove('is-invalid');
        });
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const msgInput = document.getElementById('contact-message');
        const contactSuccess = document.getElementById('contact-success');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Name Check
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
            }

            // Email Check
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !re.test(String(emailInput.value).toLowerCase())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }

            // Message Check (Min 10 chars)
            if (!msgInput.value.trim() || msgInput.value.trim().length < 10) {
                msgInput.classList.add('is-invalid');
                isValid = false;
                // Add simple error msg to placeholder
                msgInput.placeholder = "Message must be at least 10 characters...";
            } else {
                msgInput.classList.remove('is-invalid');
            }

            if (isValid) {
                contactSuccess.style.display = "block";
                contactForm.reset();
                setTimeout(() => {
                    contactSuccess.style.display = "none";
                }, 4000);
            }
        });
        
        // Remove validations on input
        [nameInput, emailInput, msgInput].forEach(el => {
            el.addEventListener('input', () => el.classList.remove('is-invalid'));
        });
    }

    // --- Gallery Modal Logic ---
    const galleryData = {
        'bharatanatyam': `
            <h3 class="playfair" style="color:var(--secondary); margin-bottom: 20px;">Bharatanatyam Performances</h3>
            <div class="modal-gallery-grid">
                <img src="./images/brt1.jpeg" alt="Bharatanatyam 1" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
                <img src="./images/brt2.jpeg" alt="Bharatanatyam 2" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
                <img src="./images/brt3.jpeg" alt="Bharatanatyam 3" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
            </div>
        `,
        'miss-femina': `
            <h3 class="playfair" style="color:var(--secondary); margin-bottom: 20px;">Miss Femina</h3>
            <div class="modal-gallery-grid">
                <img src="./images/femina4.jpeg" alt="Award Ceremony" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
                <img src="./images/femina2.jpeg" alt="Ramp Walk" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
                <img src="./images/femina1.jpeg" alt="Group Photo" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
            </div>
        `,
        'fashion-show': `
            <h3 class="playfair" style="color:var(--secondary); margin-bottom: 20px;">Fashion Show</h3>
            <div class="modal-gallery-grid">
                <img src="./images/femina3.jpeg" alt="Fashion Show" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
                <img src="./images/femina5.jpeg" alt="Fashion Show" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
                <img src="./images/femina.jpeg" alt="Fashion Show Showcase" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid var(--border);">
            </div>
        `,
        'modeling': `
            <h3 class="playfair" style="color:var(--secondary); margin-bottom: 20px;">Modeling & Advertisement</h3>
            <p style="margin-bottom: 20px; color: var(--text-muted);">Explore some of my professional campaigns and ad features below:</p>
            <a href="https://www.instagram.com/reel/DJLa0ZBKXuD/?igsh=MWFlM3lnN3Bta3Vseg==" target="_blank" class="btn btn-primary" style="display: block; margin-bottom: 15px; text-align: center;">Watch Ad Commercial Reel</a>
            <a href="https://www.instagram.com/p/DJzEdU7Bn1H/?igsh=cXZ5emh5YjZuZ2w1" target="_blank" class="btn btn-outline" style="display: block; text-align: center;">View Modeling Shoot</a>
        `
    };

    window.openGalleryModal = function(id) {
        const modal = document.getElementById('galleryModal');
        const contentArea = document.getElementById('modal-content-area');
        if (modal && contentArea && galleryData[id]) {
            contentArea.innerHTML = galleryData[id];
            modal.style.display = 'block';
        }
    };

    window.closeGalleryModal = function() {
        const modal = document.getElementById('galleryModal');
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // Close modal if user clicks outside of modal content
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('galleryModal');
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

});
