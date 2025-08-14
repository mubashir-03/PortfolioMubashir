document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Typing animation for hero section
    if (document.querySelector('.typing-text')) {
        const typedTextSpan = document.querySelector('.typing-text');
        const textArray = ["Fronted Web Developer", "UI/UX Designer", "Freelancer"];
        const typingDelay = 100;  // Faster typing speed
        const erasingDelay = 50;  // Faster erasing speed
        const newTextDelay = 1000;  // Shorter delay between words
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }

        setTimeout(type, 1000);
    }

    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Animate progress bars when scrolled to
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateProgressBars() {
        skillItems.forEach(item => {
            const progress = item.querySelector('.progress');
            const percent = item.querySelector('.skill-info span:last-child').textContent;
            
            if (isElementInViewport(item) && !progress.style.width) {
                progress.style.width = percent;
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Run once on page load

    // Testimonials slider
    if (document.querySelector('.testimonials-slider')) {
        let currentSlide = 0;
        const testimonials = document.querySelectorAll('.testimonial-item');
        const totalTestimonials = testimonials.length;
        
        function showSlide(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            testimonials[index].style.display = 'block';
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalTestimonials;
            showSlide(currentSlide);
        }
        
        // Show first testimonial initially
        showSlide(currentSlide);
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Portfolio modal
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const modal = document.querySelector('.project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (portfolioLinks.length > 0) {
        portfolioLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Here you would typically load project details via AJAX or have them preloaded
                // For this example, we'll just show the modal with placeholder content
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <h2>Project Title</h2>
                    <div class="project-image">
                        <img src="images/project1.jpg" alt="Project" style="width:100%; border-radius:8px; margin:20px 0;">
                    </div>
                    <p><strong>Client:</strong> Client Name</p>
                    <p><strong>Date:</strong> January 2024</p>
                    <p><strong>Category:</strong> Web Design</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="#" class="btn btn-primary" style="margin-top:20px;">Visit Project</a>
                `;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            showFormMessage('Your message has been sent successfully!', 'success');
            contactForm.reset();
        });
    }
    
    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        setTimeout(() => {
            formMessage.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 300);
        }, 5000);
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .pricing-card, .timeline-item, .skill-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .pricing-card, .timeline-item, .skill-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});