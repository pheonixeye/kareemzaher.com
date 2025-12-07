import { articlesMeta } from '../articles/articles_meta.js';

// Get current language
function getCurrentLang() {
    return window.localStorage.getItem('lang') || 'ar';
}

function buildLatestArticles() {
    const container = document.getElementById('latest-articles-grid');
    if (!container) return;

    const lang = getCurrentLang();
    const isArabic = lang === 'ar';
    const readMoreText = isArabic ? 'اقرأ المقال' : 'Read Article';

    container.innerHTML = '';

    // Get latest 4 articles (assuming array is chronological, so reverse it)
    // Note: slice() creates a shallow copy, reverse() mutates it.
    // So create copy first.
    const latestArticles = [...articlesMeta].reverse().slice(0, 4);

    latestArticles.forEach((article) => {
        const card = document.createElement('a');
        card.href = article.filePath;
        card.className = 'article-card';
        // Open in same tab or new? User said "navigates... directly", usually same tab.

        card.innerHTML = `
            <div class="article-card-image">
                <img src="${article.imgUrl}" alt="${article.title}" loading="lazy" />
            </div>
            <div class="article-card-content">
                <h3 class="article-card-title">${article.title}</h3>
                <p class="article-card-description">${article.description}</p>
                <span class="read-article-btn">${readMoreText}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

// Initial build
document.addEventListener('DOMContentLoaded', () => {
    buildLatestArticles();
});

// Re-build when language changes logic is generic
const langBtn = document.getElementById('lang-btn');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        setTimeout(buildLatestArticles, 100);
    });
}
