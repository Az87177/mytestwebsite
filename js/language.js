// Language switching functionality
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
        this.translations = {
            en: {
                // Gallery titles
                'All Photography': 'All Photography',
                'Contracts Gallery': 'Contracts Gallery',
                'Graduation Parties Gallery': 'Graduation Parties Gallery',
                'Portrait Gallery': 'Portrait Gallery',
                'Soldiers Graduate Gallery': 'Soldiers Graduate Gallery',
                'Volunteers Gallery': 'Volunteers Gallery',
                'Weddings Gallery': 'Weddings Gallery',
                'Loading...': 'Loading...',
                'Gallery': 'Gallery'
            },
            ar: {
                // Gallery titles
                'All Photography': 'جميع الأعمال',
                'Contracts Gallery': 'معرض العقود',
                'Graduation Parties Gallery': 'معرض حفلات التخرج',
                'Portrait Gallery': 'معرض البورتريه',
                'Soldiers Graduate Gallery': 'معرض تخرج العساكر',
                'Volunteers Gallery': 'معرض التطوعات',
                'Weddings Gallery': 'معرض الأفراح',
                'Loading...': 'جاري التحميل...',
                'Gallery': 'المعرض'
            }
        };
        
        this.init();
    }

    init() {
        // Apply saved language on page load
        this.applyLanguage(this.currentLanguage);
        
        // Add event listener to language switch button
        const languageSwitch = document.getElementById('languageSwitch');
        if (languageSwitch) {
            languageSwitch.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // Update gallery title if we're on gallery page
        this.updateGalleryTitle();
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
        this.applyLanguage(this.currentLanguage);
        localStorage.setItem('selectedLanguage', this.currentLanguage);
        
        // Update gallery title if we're on gallery page
        this.updateGalleryTitle();
        
        // Dispatch custom event for gallery page
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }

    applyLanguage(language) {
        const html = document.documentElement;
        const langText = document.querySelector('.lang-text');
        
        if (language === 'ar') {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            if (langText) langText.textContent = 'English';
        } else {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            if (langText) langText.textContent = 'عربي';
        }

        // Update all elements with translation data attributes
        const elementsWithTranslations = document.querySelectorAll('[data-en][data-ar]');
        
        elementsWithTranslations.forEach(element => {
            const translation = element.getAttribute(`data-${language}`);
            if (translation) {
                element.innerHTML = translation;
            }
        });

        this.currentLanguage = language;
    }

    updateGalleryTitle() {
        const galleryTitle = document.getElementById('gallery-title');
        if (!galleryTitle) return;

        const currentText = galleryTitle.textContent;
        const translation = this.translations[this.currentLanguage][currentText];
        
        if (translation) {
            galleryTitle.textContent = translation;
        } else {
            // If no direct translation found, try to find the reverse translation
            const reverseLang = this.currentLanguage === 'en' ? 'ar' : 'en';
            for (const [key, value] of Object.entries(this.translations[reverseLang])) {
                if (value === currentText) {
                    const newTranslation = this.translations[this.currentLanguage][key];
                    if (newTranslation) {
                        galleryTitle.textContent = newTranslation;
                        break;
                    }
                }
            }
        }
    }

    // Method to get translation for gallery titles
    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize language manager
const languageManager = new LanguageManager();

// Make it globally accessible
window.languageManager = languageManager; 