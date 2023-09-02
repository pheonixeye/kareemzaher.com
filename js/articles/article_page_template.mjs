import { Article, ArticleParagraph } from "./article_base.js";

function buildParagraphElement(paragraph, isEnglish) {
  const template = `
  <h4 class="margin center-text">${
    isEnglish ? paragraph.title.en : paragraph.title.ar
  }</h4>
  <p class="margin center-text">${
    isEnglish ? paragraph.body.en : paragraph.body.ar
  }</p>
  `;
  return template;
}

function buildArticlePage(article, isEnglish) {
  // console.log(article);
  const imgElement =
    article.articleimage == undefined
      ? `<div></div>`
      : `<img src = ${article.articleimage} alt = "article main image"></img>`;
  const date = new Date(article.timeofpub);
  const dateStringEN = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} -- ${date.getHours()} : ${date.getMinutes()}`;
  const dateStringAR = `${date.getHours()} : ${date.getMinutes()} -- ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const dateElement = `<p>${isEnglish ? dateStringEN : dateStringAR}</p>`;

  const paragraphs = article.paragraphs;

  const paragraphList = paragraphs.map((e) => {
    return buildParagraphElement(e, isEnglish);
  });

  return /*html*/ `
  <!DOCTYPE html>
  <html lang="ar">
    <head>
      <!--**META-TAGS-->
      <meta
        name="description"
        content="د. كريم زاهر -  جراحة المسالك البولية و الذكورة -  المقالات"
      />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>
        د. كريم زاهر - اخصائي جراحة المسالك البولية و الذكورة - المقالات
      </title>
      <link rel=”canonical” href=”https://www.kareemzaher.com/articles” />
      <link rel="stylesheet" href="styles.css" />
      <link rel="stylesheet" href="styles/social_links.css" />
      <link rel="stylesheet" href="styles/footer.css" />
      <link rel="stylesheet" href="styles/page_content.css" />
      <link rel="stylesheet" href="styles/floating_btn.css" />
      <link rel="stylesheet" href="styles/articles_meta.css" />
      <link rel="favicon" type="image/x-icon" href="favicon.ico"/>
      <style>
        .margin{
          margin: 10px 20px;
        }
        .center-text{
          text-align:center;
        }
        .start-text{
          text-align:start;
        }
      </style>
    </head>
    <!-- Google tag (gtag.js) -->
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-KP1XD52S9B"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
  
      gtag("config", "G-KP1XD52S9B");
    </script>
  
    <body id="articles-id">
      <div class="page-content">
        ${imgElement}
        <h1 class="margin">${
          isEnglish ? article.title.en : article.title.ar
        }</h1>
        ${dateElement}
        <h3 class="margin center-text">${
          isEnglish ? article.shortDescription.en : article.shortDescription.ar
        }</h3>
        ${paragraphList}
      </div>
  
      <script src="js/nav_and_footer_add.js" type="text/javascript"></script>
      <script src="js/build_navbar.js" type="module"></script>
      <script src="js/mobile_nav_fns.js" type="text/javascript"></script>
      <script src="js/contact.js" type="text/javascript"></script>
      <script src="js/footer.js" type="module"></script>
      <script src="localization.mjs" type="module"></script>
      <script src="localization_helper_article.mjs" type="module"></script>
    </body>
  </html>
  `;
}

export default buildArticlePage;
