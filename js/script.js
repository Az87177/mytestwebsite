// Sample portfolio items - Replace with your actual images
const portfolioItems = [
    { id: 1, category: 'nature', src: 'https://source.unsplash.com/random/800x600/?nature', title: 'Nature 1' },
    { id: 2, category: 'nature', src: 'https://source.unsplash.com/random/800x600/?landscape', title: 'Nature 2' },
    { id: 3, category: 'portrait', src: 'https://source.unsplash.com/random/800x600/?portrait', title: 'Portrait 1' },
    { id: 4, category: 'portrait', src: 'https://source.unsplash.com/random/800x600/?people', title: 'Portrait 2' },
    { id: 5, category: 'urban', src: 'https://source.unsplash.com/random/800x600/?city', title: 'Urban 1' },
    { id: 6, category: 'urban', src: 'https://source.unsplash.com/random/800x600/?architecture', title: 'Urban 2' },
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.querySelector('.portfolio-grid');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio filtering
function filterPortfolio(category) {
    const items = portfolioItems.filter(item => 
        category === 'all' ? true : item.category === category
    );
    
    portfolioGrid.innerHTML = items.map(item => `
        <div class="portfolio-item" data-category="${item.category}">
            <img src="${item.src}" alt="${item.title}" loading="lazy">
        </div>
    `).join('');
}

// Initialize portfolio
filterPortfolio('all');

// Filter button click handlers
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterPortfolio(button.getAttribute('data-filter'));
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Image lazy loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Category Navigation
const categoryItems = document.querySelectorAll('.category-item');
const categoriesSection = document.getElementById('categories');
const portfolioSection = document.getElementById('portfolio');
const backBtn = document.querySelector('.back-btn');

categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        
        // Hide categories section with fade out
        categoriesSection.style.opacity = '0';
        setTimeout(() => {
            categoriesSection.style.display = 'none';
            
            // Show portfolio section with fade in
            portfolioSection.classList.remove('hidden');
            setTimeout(() => {
                portfolioSection.classList.add('visible');
            }, 50);

            // Filter portfolio to show only selected category
            filterPortfolio(category);
            
            // Update active filter button
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }, 300);
    });
});

// Back button functionality
backBtn.addEventListener('click', () => {
    // Hide portfolio section with fade out
    portfolioSection.classList.remove('visible');
    setTimeout(() => {
        portfolioSection.classList.add('hidden');
        
        // Show categories section with fade in
        categoriesSection.style.display = 'block';
        setTimeout(() => {
            categoriesSection.style.opacity = '1';
        }, 50);
    }, 300);
});

// Smooth scroll for the scroll indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    console.log('Scroll indicator found:', scrollIndicator); // Debug log

    scrollIndicator.addEventListener('click', function() {
        console.log('Scroll indicator clicked'); // Debug log
        const categoriesSection = document.querySelector('.categories');
        console.log('Categories section found:', categoriesSection); // Debug log
        
        if (categoriesSection) {
            const yOffset = -20; // Small offset to account for any spacing
            const y = categoriesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    });
});

// Basic scroll functionality
const scrollButton = document.querySelector('.scroll-indicator');
scrollButton.addEventListener('click', () => {
    document.getElementById('categories').scrollIntoView();
}); 