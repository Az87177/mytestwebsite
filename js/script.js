// Sample portfolio items - Replace with your actual images
const portfolioItems = [
    { id: 1, category: 'nature', src: 'https://source.unsplash.com/random/800x600/?nature', title: 'Nature 1' },
    { id: 2, category: 'nature', src: 'https://source.unsplash.com/random/800x600/?landscape', title: 'Nature 2' },
    { id: 3, category: 'portrait', src: 'https://source.unsplash.com/random/800x600/?portrait', title: 'Portrait 1' },
    { id: 4, category: 'portrait', src: 'https://source.unsplash.com/random/800x600/?people', title: 'Portrait 2' },
    { id: 5, category: 'urban', src: 'https://source.unsplash.com/random/800x600/?city', title: 'Urban 1' },
    { id: 6, category: 'urban', src: 'https://source.unsplash.com/random/800x600/?architecture', title: 'Urban 2' },
];

// Smooth scrolling for navigation links (relevant to all pages)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- Portfolio Page Specific Code ---
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements for Portfolio Page
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrids = {
        'portrait': document.getElementById('portrait-grid'),
        'products': document.getElementById('products-grid'),
        'events': document.getElementById('events-grid'),
        'locations': document.getElementById('locations-grid'),
        'all': document.getElementById('all-grid') // Assuming a grid for 'all' might exist
    };
    const categoryItems = document.querySelectorAll('.category-item');
    const categoriesSection = document.getElementById('categories'); // Used by category nav and scroll indicator
    const portfolioSection = document.getElementById('portfolio');
    const backBtn = document.querySelector('.back-btn');

    // Portfolio filtering function
    function filterPortfolio(category) {
        if (!portfolioGrids[category]) {
            console.warn(`Portfolio grid for category "${category}" not found.`);
            // Optionally, display all items in a default grid or handle error
            // For now, if the specific category grid isn't found, we might not want to do anything.
            // If 'all' grid exists and category is specific, it might be an error or intended for 'all-grid'.
            // This logic depends on how you want to handle missing specific category grids.
            if (category !== 'all' && portfolioGrids.all) {
                // Fallback to showing items in 'all-grid' if specific grid is missing
                // Or, simply return if specific grids are mandatory for filtering.
            } else if (!portfolioGrids.all && category === 'all'){
                 console.warn('Portfolio grid for category "all" not found.');
                 return;
            }
             // If we are here, it means either the specific grid or 'all' grid is missing.
        }

        const itemsToDisplay = portfolioItems.filter(item => 
            category === 'all' ? true : item.category === category
        );
        
        // Determine target grid: specific category or 'all'
        const targetGrid = portfolioGrids[category] || portfolioGrids.all;

        if (targetGrid) {
            targetGrid.innerHTML = itemsToDisplay.map(item => `
                <div class="portfolio-item" data-category="${item.category}">
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                </div>
            `).join('');
        } else {
            console.warn(`No suitable grid found to display items for category "${category}".`);
        }
    }

    // Initialize portfolio if filter buttons and at least one grid exist
    if (filterButtons.length > 0 && Object.values(portfolioGrids).some(grid => grid !== null)) {
        const initialCategory = filterButtons[0]?.dataset.filter || 'all';
        filterPortfolio(initialCategory); 
    }

    // Filter button click handlers
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Hide all grids that exist
                Object.values(portfolioGrids).forEach(grid => {
                    if (grid) grid.classList.add('hidden');
                });
                
                // Show selected grid if it exists
                if (portfolioGrids[filter]) {
                    portfolioGrids[filter].classList.remove('hidden');
                } else if (portfolioGrids.all) { // Fallback to all-grid if specific doesn't exist
                    portfolioGrids.all.classList.remove('hidden');
                }
                
                filterPortfolio(filter);

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Category Navigation (from index.html to portfolio section)
    if (categoryItems.length > 0 && categoriesSection && portfolioSection) {
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // If the link is to gallery.html, let it navigate
                if (item.getAttribute('href').startsWith('gallery.html')) {
                    return;
                }
                e.preventDefault(); // Prevent navigation only if not a gallery.html link

                const category = item.getAttribute('data-category');
                
                categoriesSection.style.opacity = '0';
                setTimeout(() => {
                    categoriesSection.style.display = 'none';
                    portfolioSection.classList.remove('hidden');
                    setTimeout(() => {
                        portfolioSection.classList.add('visible');
                    }, 50);

                    filterPortfolio(category);
                    
                    if (filterButtons.length > 0) {
                        filterButtons.forEach(btn => {
                            if (btn.getAttribute('data-filter') === category) {
                                btn.classList.add('active');
                            } else {
                                btn.classList.remove('active');
                            }
                        });
                    }
                }, 300);
            });
        });
    }

    // Back button functionality
    if (backBtn && portfolioSection && categoriesSection) {
        backBtn.addEventListener('click', () => {
            portfolioSection.classList.remove('visible');
            setTimeout(() => {
                portfolioSection.classList.add('hidden');
                categoriesSection.style.display = 'block';
                setTimeout(() => {
                    categoriesSection.style.opacity = '1';
                }, 50);
            }, 300);
        });
    }

    // Image lazy loading (relevant to all pages with images)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            // Ensure src is re-assigned if it was already set by browser from HTML
            // This is more for dynamic content, but good practice
            if(img.dataset.src) img.src = img.dataset.src; 
        });
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Smooth scroll for the scroll indicator (specific to index.html or pages with it)
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && categoriesSection) { // categoriesSection check added for context
        scrollIndicator.addEventListener('click', function() {
            const yOffset = -20;
            const y = categoriesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        });
    }

    // Burger menu functionality for mobile
    const burgerIcon = document.querySelector('.burger-icon');
    const navLinks = document.querySelector('.nav-links'); // This is the <nav> element

    if (burgerIcon && navLinks) {
        burgerIcon.addEventListener('click', () => {
            burgerIcon.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Update aria-expanded attribute for accessibility
            const isExpanded = burgerIcon.getAttribute('aria-expanded') === 'true' || false;
            burgerIcon.setAttribute('aria-expanded', !isExpanded);
        });

        // Optional: Close menu when a link is clicked (useful for single-page navigation)
        navLinks.querySelectorAll('.hero-btn').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    burgerIcon.classList.remove('active');
                    navLinks.classList.remove('active');
                    burgerIcon.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Optional: Close menu when clicking outside of it
        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(event.target) && 
                !burgerIcon.contains(event.target)) {
                burgerIcon.classList.remove('active');
                navLinks.classList.remove('active');
                burgerIcon.setAttribute('aria-expanded', 'false');
            }
        });
    }
}); 