// Photo data with actual photos
const photoData = {
    portrait: [
        {
            src: 'images/portrait/portrait15.jpg',
            title: 'Portrait 15',
            description: 'Professional portrait'
        },
        {
            src: 'images/portrait/portrait16.JPG',
            title: 'Portrait 16',
            description: 'Studio portrait'
        },
        {
            src: 'images/portrait/portrait20.jpg',
            title: 'Portrait 20',
            description: 'Creative portrait'
        },
        {
            src: 'images/portrait/portrait21.jpg',
            title: 'Portrait 21',
            description: 'Studio portrait'
        },
        {
            src: 'images/portrait/portrait22.jpg',
            title: 'Portrait 22',
            description: 'Professional photography'
        },
        {
            src: 'images/portrait/portrait23.jpg',
            title: 'Portrait 23',
            description: 'Portrait session'
        },
        {
            src: 'images/portrait/portrait24.jpg',
            title: 'Portrait 24',
            description: 'Creative portrait'
        }
    ],
    family: [
        {
            src: 'images/family/WhatsApp Image 2025-02-08 at 23.31.08_a0270237.jpg',
            title: 'Family Photo 1',
            description: 'Family moments captured'
        },
        {
            src: 'images/family/WhatsApp Image 2025-02-08 at 23.30.19_7ab8a811.jpg',
            title: 'Family Photo 2',
            description: 'Cherished memories'
        },
        {
            src: 'images/family/WhatsApp Image 2025-02-08 at 23.29.47_b5b80d5e.jpg',
            title: 'Family Photo 3',
            description: 'Family gathering'
        },
        {
            src: 'images/family/WhatsApp Image 2025-02-08 at 23.29.24_8ba8ae55.jpg',
            title: 'Family Photo 4',
            description: 'Special moments'
        },
        {
            src: 'images/family/WhatsApp Image 2025-02-09 at 00.07.47_48ef2892.jpg',
            title: 'Family Photo 5',
            description: 'Family portrait'
        },
        {
            src: 'images/family/WhatsApp Image 2025-02-09 at 00.07.46_5a8b63b5.jpg',
            title: 'Family Photo 6',
            description: 'Family memories'
        },
        {
            src: 'images/family/WhatsApp Image 2025-02-08 at 23.59.47_cdffcab7.jpg',
            title: 'Family Photo 7',
            description: 'Family gathering'
        },
        {
            src: 'images/family/WhatsApp Image 2025-02-08 at 23.59.47_0ff01a7c.jpg',
            title: 'Family Photo 8',
            description: 'Family moments'
        }
    ],
    landscape: [
        {
            src: 'images/landscape/1.jpg',
            title: 'Landscape 1',
            description: 'Stunning landscape view'
        },
        {
            src: 'images/landscape/٢.jpg',
            title: 'Landscape 2',
            description: 'Nature at its finest'
        },
        {
            src: 'images/landscape/٣.jpg',
            title: 'Landscape 3',
            description: 'Beautiful scenery'
        },
        {
            src: 'images/landscape/7.jpg',
            title: 'Landscape 4',
            description: 'Natural beauty'
        },
        {
            src: 'images/landscape/9.jpg',
            title: 'Landscape 5',
            description: 'Scenic view'
        },
        {
            src: 'images/landscape/12.jpg',
            title: 'Landscape 6',
            description: 'Landscape photography'
        },
        {
            src: 'images/landscape/IMG_0434.JPG',
            title: 'Landscape 7',
            description: 'Nature photography'
        },
        {
            src: 'images/landscape/IMG_0435.JPG',
            title: 'Landscape 8',
            description: 'Scenic landscape'
        },
        {
            src: 'images/landscape/IMG_0436.JPG',
            title: 'Landscape 9',
            description: 'Natural landscape'
        },
        {
            src: 'images/landscape/137A4434 copy.jpg',
            title: 'Landscape 10',
            description: 'Natural beauty'
        },
        {
            src: 'images/landscape/137A4435 copy.jpg',
            title: 'Landscape 11',
            description: 'Scenic view'
        },
        {
            src: 'images/landscape/137A4444 copy.jpg',
            title: 'Landscape 12',
            description: 'Landscape photography'
        },
        {
            src: 'images/landscape/137A4449 copy.jpg',
            title: 'Landscape 13',
            description: 'Nature photography'
        }
    ],
    urban: [
        {
            src: 'images/urban/IMG_1063 copy.jpg',
            title: 'Urban Scene 1',
            description: 'City architecture'
        },
        {
            src: 'images/urban/IMG_1064 copy.jpg',
            title: 'Urban Scene 2',
            description: 'City life'
        },
        {
            src: 'images/urban/IMG_1065 copy.jpg',
            title: 'Urban Scene 3',
            description: 'Urban landscape'
        },
        {
            src: 'images/urban/IMG_1067 copy.jpg',
            title: 'Urban Scene 4',
            description: 'City streets'
        },
        {
            src: 'images/urban/IMG_1069 copy.jpg',
            title: 'Urban Scene 5',
            description: 'Urban photography'
        },
        {
            src: 'images/urban/IMG_1070 copy.jpg',
            title: 'Urban Scene 6',
            description: 'City view'
        },
        {
            src: 'images/urban/IMG_1071 copy.jpg',
            title: 'Urban Scene 7',
            description: 'Urban architecture'
        },
        {
            src: 'images/urban/IMG_1072 copy.jpg',
            title: 'Urban Scene 8',
            description: 'City landscape'
        },
        {
            src: 'images/urban/IMG_10866 copy.jpg',
            title: 'Urban Scene 9',
            description: 'Urban photography'
        }
    ]
};

// Modal functionality
let currentImageIndex = 0;
let currentImages = [];

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.modal-close');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

function openModal(index) {
    currentImageIndex = index;
    modalImg.src = currentImages[currentImageIndex].src;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    updateNavigationButtons();
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentImageIndex].src;
    updateNavigationButtons();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentImageIndex].src;
    updateNavigationButtons();
}

function updateNavigationButtons() {
    prevBtn.style.visibility = currentImages.length > 1 ? 'visible' : 'hidden';
    nextBtn.style.visibility = currentImages.length > 1 ? 'visible' : 'hidden';
}

// Event listeners for modal
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('show')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Function to get category from URL
function getCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'portrait';
}

// Function to load category photos
function loadCategoryPhotos() {
    const category = getCategoryFromUrl();
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryTitle = document.getElementById('gallery-title');
    
    // Update page title
    galleryTitle.textContent = category === 'all' ? 'All Photography' : category.charAt(0).toUpperCase() + category.slice(1) + ' Gallery';
    
    // Clear existing content
    galleryGrid.innerHTML = '';
    
    // Get photos for the category
    let photos = [];
    if (category === 'all') {
        // Combine all categories
        Object.values(photoData).forEach(categoryPhotos => {
            photos = photos.concat(categoryPhotos);
        });
    } else {
        photos = photoData[category] || [];
    }
    
    currentImages = photos;
    
    // Create gallery items
    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
        `;
        
        // Add click event to open modal
        item.addEventListener('click', () => openModal(index));
        
        galleryGrid.appendChild(item);
    });
    
    // Trigger initial animation check
    handleScrollAnimations();
}

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const items = document.querySelectorAll('.gallery-item:not(.visible)');
    
    items.forEach(item => {
        if (isInViewport(item)) {
            item.classList.add('visible');
        }
    });
}

// Function to load images
function loadImages() {
    const images = document.querySelectorAll('.gallery-item img[data-src]');
    
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load category photos
    loadCategoryPhotos();
    
    // Add scroll event listener with throttling
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScrollAnimations();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}); 