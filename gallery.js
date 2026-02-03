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
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===================================
// GALLERY FILTERING
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Add click effect to filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Get the filter value
    const filterValue = button.getAttribute('data-filter');
    
    // Filter gallery items with animation
    galleryItems.forEach((item, index) => {
      const itemCategory = item.getAttribute('data-category');
      
      // Hide all items first with fade out
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          
          // Stagger the fade-in animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, index * 50);
        } else {
          item.style.display = 'none';
        }
      }, 300);
    });
    
    // Add ripple effect to button
    createRipple(button, event);
  });
});

// ===================================
// RIPPLE EFFECT FOR BUTTONS
// ===================================

function createRipple(button, event) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
  .filter-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===================================
// GALLERY ITEM HOVER EFFECTS
// ===================================

galleryItems.forEach(item => {
  const img = item.querySelector('img');
  
  item.addEventListener('mouseenter', function(e) {
    // Add subtle rotation based on mouse position
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    img.style.transform = `scale(1.15) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  item.addEventListener('mouseleave', function() {
    // Return to normal size - scale(1) means original size
    img.style.transform = 'scale(1)';
  });
  
  item.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    img.style.transform = `scale(1.15) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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

// Observe gallery items for staggered entrance
galleryItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
  observer.observe(item);
});

// ===================================
// KEYBOARD NAVIGATION FOR FILTERS
// ===================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const activeButton = document.querySelector('.filter-btn.active');
    const currentIndex = Array.from(filterButtons).indexOf(activeButton);
    let newIndex;
    
    if (e.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % filterButtons.length;
    } else {
      newIndex = (currentIndex - 1 + filterButtons.length) % filterButtons.length;
    }
    
    filterButtons[newIndex].click();
    filterButtons[newIndex].focus();
  }
});

// Make filter buttons focusable
filterButtons.forEach(button => {
  button.setAttribute('tabindex', '0');
  
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click();
    }
  });
});

// ===================================
// COUNT AND DISPLAY FILTERED ITEMS
// ===================================

function updateItemCount() {
  const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
  let visibleCount = 0;
  
  galleryItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    if (activeFilter === 'all' || itemCategory === activeFilter) {
      visibleCount++;
    }
  });
  
  // You can display this count if needed
  console.log(`Showing ${visibleCount} items`);
}

// ===================================
// LIGHTBOX FUNCTIONALITY (Optional)
// ===================================

galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    const imgSrc = img.getAttribute('src');
    const category = this.querySelector('.gallery-category').textContent;
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${imgSrc}" alt="${category}">
        <p class="lightbox-caption">${category}</p>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Fade in
    setTimeout(() => {
      lightbox.style.opacity = '1';
    }, 10);
    
    // Close lightbox
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    function closeLightbox() {
      lightbox.style.opacity = '0';
      setTimeout(() => {
        lightbox.remove();
        document.body.style.overflow = '';
      }, 300);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeClose(e) {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', escapeClose);
      }
    });
  });
});

// Add lightbox styles
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    animation: zoomIn 0.3s ease;
  }
  
  .lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }
  
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    font-size: 3rem;
    color: white;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .lightbox-close:hover {
    transform: rotate(90deg);
  }
  
  .lightbox-caption {
    text-align: center;
    color: white;
    font-size: 1.2rem;
    margin-top: 1rem;
    font-weight: 600;
  }
  
  @keyframes zoomIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(lightboxStyle);

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

window.addEventListener('load', () => {
  // Show all items initially with staggered animation
  galleryItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 50);
  });
  
  updateItemCount();
});
