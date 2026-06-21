#!/usr/bin/env node

/**
 * build_articles.js
 *
 * Reads all articles/*.json files and generates:
 *   1. articles/articleN.html — SEO-rich HTML shell for each article
 *   2. articles/articles_meta.js — ESM export array for the articles listing page
 *   3. sitemap.xml — complete sitemap with all pages
 *
 * Usage: node build_articles.js
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.kareemzaher.com";
const ARTICLES_DIR = path.join(__dirname, "articles");

// ─── Helpers ────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJsonString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// ─── Collect all article JSON files ─────────────────────────────────────────

function loadArticles() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".json"));
  const articles = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
    const data = JSON.parse(raw);
    articles.push(data);
  }

  // Sort by id ascending
  articles.sort((a, b) => a.id - b.id);
  return articles;
}

// ─── Generate article HTML ──────────────────────────────────────────────────

function generateArticleHtml(article) {
  const articleFile = `article${article.id}.html`;
  const canonicalUrl = `${SITE_URL}/articles/${articleFile}`;
  const today = new Date().toISOString().split("T")[0];
  const datePublished = article.datePublished || today;

  let faqSchemaScript = "";
  if (Array.isArray(article.faq) && article.faq.length > 0) {
    const faqEntities = article.faq.map(item => {
      return `      {
        "@type": "Question",
        "name": "${escapeJsonString(item.question)}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${escapeJsonString(item.answer)}"
        }
      }`;
    });

    faqSchemaScript = `
  <!-- Schema.org JSON-LD - FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${faqEntities.join(",\n")}
    ]
  }
  </script>`;
  }

  let tocHtml = "";
  if (Array.isArray(article.tableOfContents) && article.tableOfContents.length > 0) {
    tocHtml = `
    <div id="table-of-contents" class="table-of-contents">
      <h2>جدول المحتويات</h2>
      <ul>
${article.tableOfContents.map(toc => `        <li><a href="#${toc.anchor}">${escapeHtml(toc.title)}</a></li>`).join("\n")}
      </ul>
    </div>
    <br />`;
  }

  let relatedHtml = "";
  if (Array.isArray(article.relatedArticles) && article.relatedArticles.length > 0) {
    relatedHtml = `
    <div class="related-articles-section">
      <h2 class="related-articles-title">مقالات ذات صلة</h2>
      <div class="related-articles-container">
${article.relatedArticles.map(rel => `        <a href="../${rel.filePath}" class="related-article-card">
          <img src="${escapeHtml(rel.imgUrl)}" alt="${escapeHtml(rel.title)}" class="related-article-img" loading="lazy" />
          <h4 class="related-article-card-title">${escapeHtml(rel.title)}</h4>
        </a>`).join("\n")}
      </div>
    </div>
    <br />`;
  }

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
  <!--**META-TAGS-->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(article.title)}</title>
  <link rel="canonical" href="${canonicalUrl}" />
  <meta name="description"
    content="${escapeHtml(article.description)}" />
  <meta name="keywords"
    content="${escapeHtml(article.keywords || "")}" />

  <!-- Open Graph Meta Tags - Arabic -->
  <meta property="og:title" content="${escapeHtml(article.title)}" />
  <meta property="og:description"
    content="${escapeHtml(article.description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image"
    content="${escapeHtml(article.imgUrl)}" />
  <meta property="og:locale" content="ar_EG" />

  <!-- Twitter Card - Arabic -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(article.title)}" />
  <meta name="twitter:description"
    content="${escapeHtml(article.description)}" />
  <meta name="twitter:image"
    content="${escapeHtml(article.imgUrl)}" />

  <!-- Schema.org JSON-LD - Article -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${escapeJsonString(article.title)}",
    "description": "${escapeJsonString(article.description)}",
    "url": "${canonicalUrl}",
    "author": {
      "@type": "Person",
      "name": "د. كريم زاهر",
      "jobTitle": "استشاري جراحة المسالك البولية والذكورة",
      "url": "https://kareemzaher.com"
    },
    "datePublished": "${datePublished}",
    "dateModified": "${today}",
    "inLanguage": "ar",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kareemzaher.com/articles/article${article.id}.html"
    },
    "image": "${escapeJsonString(article.imgUrl)}",
    "publisher": {
      "@type": "Organization",
      "name": "عيادة الدكتور كريم زاهر",
      "description": "استشاري جراحة المسالك البولية والذكورة",
      "logo": {
        "@type": "ImageObject",
        "url": "${SITE_URL}/images_webp/doctor.webp"
      }
    }
  }
  </script>
${faqSchemaScript}

  <link rel="stylesheet" href="../styles.css" />
  <link rel="stylesheet" href="../styles/social_links.css" />
  <link rel="stylesheet" href="../styles/footer.css" />
  <link rel="stylesheet" href="../styles/page_content.css" />
  <link rel="stylesheet" href="../styles/floating_btn.css" />
  <link rel="stylesheet" href="../styles/article_page.css" />
  <link rel="stylesheet" href="../styles/breadcrumb.css" />
  <link rel="icon" type="image/x-icon" href="../favicon.ico" />

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-KP1XD52S9B"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-KP1XD52S9B");
  </script>
  <!-- Google Fonts Preconnect & Cairo Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet" />
</head>

<body id="articles-id">
  <div class="page-content">
    <nav class="breadcrumb">
      <a href="../index.html" lang-key="Home">Home</a> &gt; <a href="../articles.html" lang-key="Articles">Articles</a> &gt; <span>${escapeHtml(article.title)}</span>
    </nav>
    <br />
    <img id="article-img-file" src="" alt="article main image" width="300" height="300" />
    <h1 id="article-long-title">articleLongTitle</h1>
    <br />
    <h3 id="article-long-description">articleLongDescription</h3>
    <br />
    ${tocHtml}
    <div id="article-paragraphs-container">
      <!--load_article_page.js -->
    </div>
    ${relatedHtml}
  </div>

  <script src="../js/nav_and_footer_add.js" type="module"></script>
  <script src="../js/build_navbar.js" type="module"></script>
  <script src="../js/mobile_nav_fns.js" type="module"></script>
  <script src="../js/contact.js" type="module"></script>
  <script src="../js/footer.js" type="module"></script>
  <script src="../js/load_article_page.js" type="module"></script>
  <script src="../localization.js" type="module"></script>
</body>

</html>
`;
}

// ─── Generate articles_meta.js ──────────────────────────────────────────────

function generateArticlesMeta(articles) {
  const entries = articles.map((a) => {
    return `   {
      id: ${a.id},
      title: ${JSON.stringify(a.title)},
      description: ${JSON.stringify(a.description)},
      imgUrl: ${JSON.stringify(a.imgUrl)},
      filePath: ${JSON.stringify(a.filePath)},
      url: ${JSON.stringify(a.url)}
   }`;
  });

  return `/* eslint-disable indent */
export const articlesMeta = [
${entries.join(",\n")}
];
`;
}

// ─── Generate sitemap.xml ───────────────────────────────────────────────────

function generateSitemap(articles) {
  const today = new Date().toISOString().split("T")[0] + "T00:00:00+00:00";

  // Static pages
  const staticPages = [
    { loc: "/", changefreq: "weekly", priority: "1.00" },
    { loc: "/appointments.html", changefreq: "weekly", priority: "1.00" },
    { loc: "/services.html", changefreq: "monthly", priority: "0.90" },
    { loc: "/articles.html", changefreq: "weekly", priority: "0.90" },
  ];

  // Trailing static pages
  const trailingPages = [
    { loc: "/reviews.html", changefreq: "weekly", priority: "0.80" },
    { loc: "/erection_test.html", changefreq: "monthly", priority: "0.70" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Home Page -->
  <url>
    <loc>${SITE_URL}${staticPages[0].loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${staticPages[0].changefreq}</changefreq>
    <priority>${staticPages[0].priority}</priority>
  </url>

  <!-- Appointment Booking Page -->
  <url>
    <loc>${SITE_URL}${staticPages[1].loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${staticPages[1].changefreq}</changefreq>
    <priority>${staticPages[1].priority}</priority>
  </url>

  <!-- Services Page -->
  <url>
    <loc>${SITE_URL}${staticPages[2].loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${staticPages[2].changefreq}</changefreq>
    <priority>${staticPages[2].priority}</priority>
  </url>

  <!-- Articles Listing Page -->
  <url>
    <loc>${SITE_URL}${staticPages[3].loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${staticPages[3].changefreq}</changefreq>
    <priority>${staticPages[3].priority}</priority>
  </url>

  <!-- Article Pages -->`;

  for (const article of articles) {
    const articleDate =
      (article.datePublished || today.split("T")[0]) + "T00:00:00+00:00";
    xml += `
  <url>
    <loc>${SITE_URL}/articles/article${article.id}.html</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>`;
  }

  xml += `

  <!-- Reviews Page -->
  <url>
    <loc>${SITE_URL}${trailingPages[0].loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${trailingPages[0].changefreq}</changefreq>
    <priority>${trailingPages[0].priority}</priority>
  </url>

  <!-- Erection Test Page -->
  <url>
    <loc>${SITE_URL}${trailingPages[1].loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${trailingPages[1].changefreq}</changefreq>
    <priority>${trailingPages[1].priority}</priority>
  </url>

</urlset>
`;

  return xml;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  console.log("🔨 Building articles...\n");

  const articles = loadArticles();
  console.log(`   Found ${articles.length} article JSON files.\n`);

  // 1. Generate HTML files
  for (const article of articles) {
    const filename = `article${article.id}.html`;
    const filepath = path.join(ARTICLES_DIR, filename);
    const html = generateArticleHtml(article);
    fs.writeFileSync(filepath, html, "utf-8");
    console.log(`   ✅ Generated ${filename}`);
  }

  // 2. Generate articles_meta.js
  const metaContent = generateArticlesMeta(articles);
  const metaPath = path.join(ARTICLES_DIR, "articles_meta.js");
  fs.writeFileSync(metaPath, metaContent, "utf-8");
  console.log(`   ✅ Generated articles_meta.js`);

  // 3. Generate sitemap.xml
  const sitemapContent = generateSitemap(articles);
  const sitemapPath = path.join(__dirname, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemapContent, "utf-8");
  console.log(`   ✅ Generated sitemap.xml`);

  console.log(`\n🎉 Build complete! ${articles.length} articles processed.`);
}

main();
