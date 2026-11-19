document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // === 1. Initialize Lucide Icons ===
  // ============================================================
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  // ============================================================
  // === 2. Loading Screen ===
  // ============================================================
  const loadingScreen = document.getElementById('loading-screen');
  const loadingProgress = document.getElementById('loading-progress');
  const loadingPercent = document.getElementById('loading-percent');

  if (loadingScreen && loadingProgress && loadingPercent) {
    let progress = 0;
    const loadingInterval = setInterval(() => {
      // Increment by a random amount between 5 and 20
      const increment = Math.floor(Math.random() * 16) + 5;
      progress = Math.min(progress + increment, 100);

      // Update the progress bar width and percentage text
      loadingProgress.style.width = progress + '%';
      loadingPercent.textContent = progress + '%';

      if (progress >= 100) {
        clearInterval(loadingInterval);

        // Wait 400ms after reaching 100%, then begin hide transition
        setTimeout(() => {
          loadingScreen.classList.add('loading-hidden');

          // After the CSS transition completes (500ms), set display:none
          setTimeout(() => {
            loadingScreen.style.display = 'none';

            // Re-initialize Lucide icons for any elements that were hidden
            if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
              lucide.createIcons();
            }
          }, 500);
        }, 400);
      }
    }, 120);
  }

  // ============================================================
  // === 3. Typing Animation ===
  // ============================================================
  const typingText = document.getElementById('typing-text');
  const roles = [
    'Java Full Stack Developer',
    'Software Engineer',
    'Spring Boot Developer',
    'Java Backend Engineer',
    'Full Stack Engineer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      // Typing forward
      charIndex++;
      typingText.textContent = currentRole.substring(0, charIndex);

      if (charIndex === currentRole.length) {
        // Finished typing — pause before deleting
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 100);
    } else {
      // Deleting backward
      charIndex--;
      typingText.textContent = currentRole.substring(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 100);
        return;
      }
      setTimeout(typeEffect, 40);
    }
  }

  // Kick off the typing animation if typingText is present
  if (typingText) {
    typeEffect();
  }

  // ============================================================
  // === 4. Navbar Scroll Effect ===
  // ============================================================
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  if (navbar || backToTopBtn) {
    window.addEventListener('scroll', () => {
      // Add/remove 'scrolled' class based on scroll position
      if (window.scrollY > 20) {
        if (navbar) navbar.classList.add('scrolled');
      } else {
        if (navbar) navbar.classList.remove('scrolled');
      }

      // Back to Top Button visibility
      if (window.scrollY > 400) {
        if (backToTopBtn) backToTopBtn.classList.add('visible');
      } else {
        if (backToTopBtn) backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ============================================================
  // === 5. Mobile Menu ===
  // ============================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (menuIconOpen) menuIconOpen.style.display = 'block';
    if (menuIconClose) menuIconClose.style.display = 'none';
  }

  if (mobileMenuBtn && mobileMenu && menuIconOpen && menuIconClose) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');

      if (mobileMenu.classList.contains('open')) {
        menuIconOpen.style.display = 'none';
        menuIconClose.style.display = 'block';
      } else {
        menuIconOpen.style.display = 'block';
        menuIconClose.style.display = 'none';
      }
    });

    // Close mobile menu when any mobile nav link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ============================================================
  // === 6. Active Navigation Link Highlighting ===
  // ============================================================
  const sections = document.querySelectorAll(
    '#home, #about, #skills, #projects, #experience, #education, #certifications, #achievements, #contact'
  );
  const navLinks = document.querySelectorAll('.nav-link');
  const allMobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function setActiveLink(id) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    allMobileNavLinks.forEach(link => {
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if (sections.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // ============================================================
  // === 7. Scroll Reveal Animations ===
  // ============================================================
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

  if (scrollRevealElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after revealing (once behavior)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    scrollRevealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ============================================================
  // === 8. Animated Stat Counters ===
  // ============================================================
  const statCounters = document.querySelectorAll('.stat-counter');
  const animatedCounters = new Set(); // Track already-animated counters

  function animateCounter(counterEl) {
    if (!counterEl) return;
    const target = parseFloat(counterEl.getAttribute('data-target')) || 0;
    const suffix = counterEl.getAttribute('data-suffix') || '';
    const decimals = parseInt(counterEl.getAttribute('data-decimals')) || 0;
    const totalSteps = 40;
    const duration = 1500; // 1.5 seconds
    const stepTime = duration / totalSteps;
    let currentStep = 0;

    const counterInterval = setInterval(() => {
      currentStep++;
      const progressRatio = currentStep / totalSteps;
      // Ease-out curve for smoother animation
      const easedProgress = 1 - Math.pow(1 - progressRatio, 3);
      const currentValue = target * easedProgress;

      if (decimals > 0) {
        counterEl.textContent = currentValue.toFixed(decimals) + suffix;
      } else {
        counterEl.textContent = Math.floor(currentValue) + suffix;
      }

      if (currentStep >= totalSteps) {
        clearInterval(counterInterval);
        // Ensure final value is exact
        if (decimals > 0) {
          counterEl.textContent = target.toFixed(decimals) + suffix;
        } else {
          counterEl.textContent = target + suffix;
        }
      }
    }, stepTime);
  }

  if (statCounters.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedCounters.has(entry.target)) {
          animatedCounters.add(entry.target);
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    statCounters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // ============================================================
  // === 9. Back to Top Button ===
  // ============================================================
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // === 10. Contact Form (EmailJS) ===
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formError = document.getElementById('form-error');

  const EMAILJS_SERVICE_ID = "service_vq3kst9";
  const EMAILJS_TEMPLATE_ID = "template_fe6rsf8";
  const EMAILJS_PUBLIC_KEY = "4_KiyvocN_rBR5GEw";

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset any previous error message
      if (formError) {
        formError.style.display = 'none';
        formError.textContent = '';
      }

      // Basic validation — check that name, email, and message are filled
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');

      if (
        (name && !name.value.trim()) ||
        (email && !email.value.trim()) ||
        (message && !message.value.trim())
      ) {
        if (formError) {
          formError.textContent = 'Please fill out all required fields.';
          formError.style.display = 'block';
        }
        return; // Don't submit if fields are empty
      }

      // Populate compatibility fields for EmailJS templates ({{name}}, {{email}}, {{time}}, {{message}})
      const timeInput = contactForm.querySelector('[name="time"]');
      if (timeInput) {
        timeInput.value = new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
      }
      const fromName = contactForm.querySelector('[name="from_name"]');
      const replyTo = contactForm.querySelector('[name="reply_to"]');
      const fromEmail = contactForm.querySelector('[name="from_email"]');
      if (fromName && name) fromName.value = name.value.trim();
      if (replyTo && email) replyTo.value = email.value.trim();
      if (fromEmail && email) fromEmail.value = email.value.trim();

      // Save original button content and show spinner
      const originalBtnContent = formSubmitBtn ? formSubmitBtn.innerHTML : 'Send Message';
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      }

      try {
        if (typeof emailjs !== 'undefined') {
          const serviceSelect = contactForm.querySelector('[name="service"]');
          const templateParams = {
            name: name.value.trim(),
            email: email.value.trim(),
            time: new Date().toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short'
            }),
            message: message.value.trim(),
            service: serviceSelect ? serviceSelect.value : 'General Inquiry',
            from_name: name.value.trim(),
            reply_to: email.value.trim(),
            from_email: email.value.trim(),
          };

          // Primary: emailjs.send (direct JSON API)
          try {
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_TEMPLATE_ID,
              templateParams,
              {
                publicKey: EMAILJS_PUBLIC_KEY,
              }
            );
          } catch (sendErr) {
            console.warn('emailjs.send failed, trying sendForm fallback...', sendErr);
            await emailjs.sendForm(
              EMAILJS_SERVICE_ID,
              EMAILJS_TEMPLATE_ID,
              contactForm,
              {
                publicKey: EMAILJS_PUBLIC_KEY,
              }
            );
          }

          contactForm.reset();

          // Trigger success UI animations
          if (formSuccess) {
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');

            if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
              lucide.createIcons();
            }

            // After 6 seconds, hide success and show form again
            setTimeout(() => {
              formSuccess.classList.remove('show');
              contactForm.style.display = '';
            }, 6000);
          }
        } else {
          throw new Error('Email service is temporarily unavailable. Please email directly at harshgorantiwar@gmail.com');
        }

      } catch (error) {
        console.error('EmailJS submission error:', error);
        let errorDetails = '';
        if (typeof error === 'string') {
          errorDetails = error;
        } else if (error && error.text) {
          errorDetails = error.text;
        } else if (error && error.message) {
          errorDetails = error.message;
        }

        const errMsg = errorDetails
          ? `Failed to send: ${errorDetails}`
          : 'Failed to send message. Please try again or email directly at harshgorantiwar@gmail.com.';

        if (formError) {
          formError.textContent = errMsg;
          formError.style.display = 'block';
        } else {
          alert(errMsg);
        }
      } finally {
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = originalBtnContent;
          if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
            lucide.createIcons();
          }
        }
      }
    });
  }

  // ============================================================
  // === 11. Cursor Glow (Desktop Only) ===
  // ============================================================
  const cursorGlow = document.getElementById('cursor-glow');

  function handleCursorGlow() {
    if (!cursorGlow) return;

    if (window.innerWidth > 768) {
      cursorGlow.style.display = 'block';
    } else {
      cursorGlow.style.display = 'none';
    }
  }

  // Set initial state
  handleCursorGlow();

  // Update cursor glow position on mouse move
  if (cursorGlow) {
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(() => {
          cursorGlow.style.transform = `translate(${mouseX - 75}px, ${mouseY - 75}px)`;
          isMoving = false;
        });
      }
    });

    // Re-check on resize (hide on mobile, show on desktop)
    window.addEventListener('resize', handleCursorGlow);
  }

  // ============================================================
  // === 12. Smooth Scroll for Nav Links ===
  // ============================================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if it's open
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          closeMobileMenu();
        }
      }
    });
  });

  // ============================================================
  // === 13. Year in Footer ===
  // ============================================================
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // ============================================================
  // === 14. Certificate Preview Toggles ===
  // ============================================================
  const certToggleButtons = document.querySelectorAll('.btn-cert-preview');

  certToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;
      const targetContainer = document.getElementById(targetId);
      if (!targetContainer) return;

      targetContainer.classList.toggle('open');
      const isOpen = targetContainer.classList.contains('open');

      const toggleText = btn.querySelector('.cert-toggle-text');
      const eyeIcon = btn.querySelector('.cert-eye-icon');

      if (toggleText) {
        toggleText.textContent = isOpen ? 'Hide Certificate' : 'Show Certificate';
      }
      if (eyeIcon) {
        eyeIcon.setAttribute('data-lucide', isOpen ? 'eye-off' : 'eye');
        if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
          lucide.createIcons();
        }
      }
    });
  });

});
