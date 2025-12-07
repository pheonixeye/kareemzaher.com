import { services } from './services_data.js';

// Get current language
function getCurrentLang() {
    return window.localStorage.getItem('lang') || 'ar';
}

// Build service cards for homepage grid
function buildServicesGrid() {
    const container = document.getElementById('services-grid');
    if (!container) return;

    const lang = getCurrentLang();
    const isArabic = lang === 'ar';

    container.innerHTML = '';

    services.forEach((service) => {
        const card = document.createElement('div');
        card.className = 'service-card';

        const title = isArabic ? service.artitle : service.entitle;
        const description = isArabic ? service.arparagraph : service.enparagraph;
        const readMoreText = isArabic ? 'اقرأ المزيد' : 'Read More';

        card.innerHTML = `
            <div class="service-card-image">
                <img src="${service.img}" alt="${title}" loading="lazy" />
            </div>
            <div class="service-card-content">
                <h3 class="service-card-title">${title}</h3>
                <p class="service-card-description">${description}</p>
                <a href="services.html#service-item-no-${service.id}" class="service-card-btn">${readMoreText}</a>
            </div>
        `;

        container.appendChild(card);
    });
}

// Initial build
document.addEventListener('DOMContentLoaded', () => {
    buildServicesGrid();
});

// Re-build when language changes
const langBtn = document.getElementById('lang-btn');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        // Small delay to allow localStorage to update
        setTimeout(buildServicesGrid, 100);
    });
}
