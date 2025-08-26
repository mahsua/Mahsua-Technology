// Global functions that can be called from HTML
function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '☀️ Light';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '🌙 Dark';
        localStorage.setItem('theme', 'light');
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !phone || !email) {
        alert('Please fill out all required fields: Full Name, Phone Number, and Email.');
        return;
    }
    const whatsappNumber = '919752107808';
    let whatsappMessage = `Hello Mahsua Technology,\n\nI have a new inquiry:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}`;
    if (message) { whatsappMessage += `\n\n*Message:* ${message}`; }
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// All code that needs to run after the page loads goes here
document.addEventListener('DOMContentLoaded', function() {
    // Theme setup
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = (savedTheme === 'dark') ? '☀️ Light' : '🌙 Dark';
    }

    // Contact form listener
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Project filtering logic
    const filterButtons = document.querySelectorAll('.project-filters button');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');
                projectCards.forEach(card => {
                    card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? 'block' : 'none';
                });
            });
        });
    }

    // Tech stack modal logic
    const techItems = document.querySelectorAll('.tech-item');
    const modalOverlay = document.getElementById('techModalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    if (modalOverlay) {
        const techDescriptions = {
            "Google Sites": "A user-friendly, no-code website builder integrated with Google Workspace, ideal for simple, cost-effective portfolio sites and internal business tools.",
            "Firebase": "A platform by Google for building powerful web and mobile applications. It provides a real-time database, user authentication, hosting, and more, without needing to manage servers.",
            "JavaScript, HTML, CSS": "The core trio of web development. HTML structures the content, CSS styles it, and JavaScript adds interactivity and dynamic functionality to create fully custom web applications.",
            "GitHub": "A web-based platform for version control using Git. It's essential for collaborative software development, allowing our team to track changes, manage code, and work together efficiently and securely.",
            "Responsive Design": "An approach to web design that ensures our applications look and work perfectly on all devices, from large desktops to small mobile phones, providing a seamless user experience for everyone.",
            "Google Workspace": "A suite of cloud productivity and collaboration tools from Google (like Gmail, Drive, and Sheets). We integrate with these tools to automate tasks and streamline your business workflows."
        };
        techItems.forEach(item => {
            item.addEventListener('click', () => {
                const title = item.querySelector('h4').innerText;
                modalTitle.innerText = title;
                modalDescription.innerText = techDescriptions[title] || "Description not available.";
                modalOverlay.classList.add('active');
            });
        });
        function closeModal() { modalOverlay.classList.remove('active'); }
        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) { closeModal(); }
        });
    }
    
    // Card animation on scroll observer initialization
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.service-card, .tech-item, .feature-item, .project-card').forEach(card => {
        observer.observe(card);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) { 
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
            }
        });
    });

    // Header scroll effect & Progress Bar update on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.style.backdropFilter = (window.scrollY > 100) ? 'blur(10px)' : 'none';
            header.style.backgroundColor = (window.scrollY > 100) ? 'rgba(255, 255, 255, 0.9)' : 'var(--bg-primary)';
        }
        updateScrollProgress();
    });

    // Custom cursor logic
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
        });
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX - 20 + 'px';
            cursorFollower.style.top = followerY - 20 + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        document.querySelectorAll('a, button, .cta-button, .service-card, .tech-item, .feature-item, .theme-toggle, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.2)';
                cursorFollower.style.borderColor = 'var(--primary-green)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.borderColor = 'var(--primary-pink)';
            });
        });
    }
});