// Gestion du menu burger AMÉLIORÉE
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const overlay = document.getElementById('overlay');
const menuIcon = document.getElementById('menu-icon');

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    const isActive = navLinks.classList.contains('active');
    
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Changer l'icône du menu
    if (!isActive) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Empêche le scroll
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = ''; // Rétablit le scroll
    }
}

// Fonction pour fermer le menu
function closeMenu() {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
    document.body.style.overflow = ''; // Rétablit le scroll
    
    // Fermer tous les dropdowns ouverts
    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

// Événements
if (mobileMenu) {
    mobileMenu.addEventListener('click', toggleMenu);
}

if (overlay) {
    overlay.addEventListener('click', closeMenu);
}

// Fermer le menu en cliquant sur un lien simple
document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Gestion du dropdown en mobile
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = toggle.parentElement;
            dropdown.classList.toggle('active');
        }
    });
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        navLinks && 
        navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu')) {
        closeMenu();
    }
});

// Fermer le menu en appuyant sur Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Animation au défilement
const fadeElements = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

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

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('Service Worker registration failed: ', registrationError);
            });
    });
}

// Install Prompt for PWA
let deferredPrompt;
const installButton = document.createElement('button');
installButton.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    installButton.textContent = 'Installer l\'App';
    installButton.className = 'btn btn-primary';
    installButton.style.marginTop = '20px';
    const heroBtns = document.querySelector('.hero-btns');
    if (heroBtns) {
        heroBtns.appendChild(installButton);
        installButton.style.display = 'inline-block';
    }
    
    installButton.addEventListener('click', () => {
        installButton.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});

// Page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a solution page
    const solutionPages = [
        'agriculture-saas.html',
        'sante-saas.html', 
        'commerce-saas.html',
        'education-saas.html',
        'politique-saas.html',
        'logistique-saas.html'
    ];
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (solutionPages.includes(currentPage)) {
        // Add specific functionality for solution pages
        initializeSolutionPage();
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

function initializeSolutionPage() {
    // Add animations or specific interactions for solution pages
    console.log('Initializing solution page features');
}

function handleContactForm(e) {
    e.preventDefault();
    // Handle contact form submission
    alert('Merci pour votre message! Nous vous contacterons bientôt.');
    e.target.reset();
}