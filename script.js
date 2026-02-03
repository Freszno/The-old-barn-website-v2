// ===================================
// NAVIGATION BAR
// ===================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    const accordionBody = accordionItem.querySelector('.accordion-body');
    const isActive = accordionItem.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.accordion-body').style.maxHeight = null;
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      accordionItem.classList.add('active');
      accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
    }
  });
});

// ===================================
// BOOK BUTTON FUNCTIONALITY
// ===================================

const bookButtons = document.querySelectorAll('.book-btn, .book-top');

bookButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Add click animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
    
    // Show alert (replace with your booking system)
    alert('Booking feature coming soon! Please call +44 1303 763044 to book your appointment.');
  });
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('.services, .reviews, .gift, .contact').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Observe review cards
document.querySelectorAll('.review-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// ===================================
// ACCORDION ITEM ANIMATIONS
// ===================================

document.querySelectorAll('.accordion-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
  observer.observe(item);
});

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

window.addEventListener('load', () => {
  // Trigger animations for elements in viewport on load
  const inViewportElements = document.querySelectorAll('.services, .reviews, .accordion-item, .review-card');
  
  inViewportElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
});
