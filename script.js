// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you can add logic to show different content based on the tab
            const tabText = this.textContent;
            console.log('Switched to:', tabText);
        });
    });
    
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
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
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // CTA Button click handlers
    const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add your sign-up or consultation logic here
            alert('Thank you for your interest! This would connect you to our sign-up form.');
        });
    });
    
    // Waitlist Form Handler
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const userType = document.getElementById('userType').value;
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Validate user type selection
            if (!userType) {
                showNotification('Please select how you want to join Versum.', 'error');
                return;
            }
            
            // Validate email
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address. Temporary or disposable email addresses are not allowed.', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<span>Joining...</span>';
            console.log('Loading state applied'); // Debug
            
            try {
                // Use a simpler approach with form submission
                const formData = new FormData();
                formData.append('email', email);
                formData.append('userType', userType);
                
                const response = await fetch('https://script.google.com/macros/s/AKfycbz3C2zvj5GLdQdLiLpurbY2w0Bj6OLsacUmXSx1TiNDWjpN7YSlD1J-P5hm3tkVZH2j/exec', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    // Show success page
                    showSuccessPage(userType);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('There was an error submitting your request. Please try again.', 'error');
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalText;
            }
        });
    }
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
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
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Form validation with spam prevention
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            return false;
        }
        
        // Check for common spam patterns
        const spamPatterns = [
            /test/i,
            /example/i,
            /admin/i,
            /root/i,
            /noreply/i,
            /no-reply/i,
            /donotreply/i,
            /do-not-reply/i,
            /mailinator/i,
            /10minutemail/i,
            /guerrillamail/i,
            /tempmail/i,
            /temp-mail/i,
            /yopmail/i,
            /throwaway/i,
            /trashmail/i,
            /spam/i,
            /fake/i,
            /dummy/i,
            /123456/i,
            /qwerty/i,
            /password/i,
            /asdf/i
        ];
        
        // Check if email contains spam patterns
        for (let pattern of spamPatterns) {
            if (pattern.test(email)) {
                return false;
            }
        }
        
        // Check for suspicious domains (temporary email services)
        const suspiciousDomains = [
            'mailinator.com',
            '10minutemail.com',
            'guerrillamail.com',
            'tempmail.org',
            'yopmail.com',
            'throwaway.email',
            'trashmail.com',
            'temp-mail.org',
            'disposablemail.com',
            'fakeinbox.com',
            'tempr.email',
            'getairmail.com'
        ];
        
        const domain = email.split('@')[1]?.toLowerCase();
        if (suspiciousDomains.includes(domain)) {
            return false;
        }
        
        return true;
    }
    
    // Mobile menu toggle (if needed)
    function createMobileMenu() {
        const header = document.querySelector('.header-content');
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-toggle';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        mobileMenuButton.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-open');
        });
        
        // Only show on mobile
        if (window.innerWidth <= 768) {
            header.appendChild(mobileMenuButton);
        }
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add some interactive statistics (example)
    function animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                number.textContent = Math.floor(current);
                
                if (current >= target) {
                    number.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }
    
    // Call animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsObserver.observe(statsSection);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        let icon, background;
        switch(type) {
            case 'success':
                icon = 'fa-check-circle';
                background = '#4CAF50';
                break;
            case 'error':
                icon = 'fa-exclamation-circle';
                background = '#f44336';
                break;
            default:
                icon = 'fa-info-circle';
                background = '#0077b5';
        }
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${background};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
});

// Add some utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #0077b5;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', debounce(function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    }, 100));
    
    scrollButton.addEventListener('click', scrollToTop);
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// Modal functions
function openModal() {
    const modal = document.getElementById('learnMoreModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('learnMoreModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
document.addEventListener('click', function(event) {
    const modal = document.getElementById('learnMoreModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Tab switching function
function switchTab(tabName) {
    // Remove active class from all tabs and content
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const activeTabBtn = document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
    const activeTabContent = document.getElementById(`${tabName}-tab`);
    
    if (activeTabBtn) activeTabBtn.classList.add('active');
    if (activeTabContent) activeTabContent.classList.add('active');
}

// Success page function
function showSuccessPage(userType) {
    const waitlistContainer = document.querySelector('.waitlist-container');
    
    let message, icon;
    if (userType === 'patient') {
        message = "Thank you for joining Versum! We'll notify you as soon as our platform goes live and you can start connecting with dental students for quality, supervised care.";
        icon = "fas fa-user";
    } else {
        message = "Thank you for joining Versum! We'll notify you as soon as our platform goes live so you can connect with patients, provide supervised care, and build experience.";
        icon = "fas fa-graduation-cap";
    }
    
    waitlistContainer.innerHTML = `
        <div class="background-image"></div>
        <div class="overlay"></div>
        <div class="success-content">
            <div class="success-card">
                <div class="success-icon">
                    <img src="public/VersumLogo.png" alt="Versum Logo" class="success-logo">
                </div>
                <h1>You're on the waitlist!</h1>
                <p class="success-message">
                    ${message}
                </p>
                <div class="success-actions">
                    <button class="back-btn" onclick="location.reload()">
                        <i class="fas fa-arrow-left"></i>
                        <span>Back to Home</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}
