import { articlesMeta } from "./articles_meta_fetch.js";

const template = `
<div class="article-meta-container">
   <div class="article-meta-img">
     <img
       src="https://res.cloudinary.com/dw5zbj6pk/image/upload/v1692725344/guroypdqgwltsm9ipvzo.webp"
       alt="blog article thumbnail"
     />
   </div>
   <div class="article-meta-text">
     <h3>Article Meta Title</h3>
     <p>article meta description paragraph</p>
     <h6>article meta created at</h6>
   </div>
 </div>
`;

const articlesMetaGrid = document.querySelector(".articles-meta-grid");

function buildArticleMetaUI(meta, isEnglish) {
  const date = new Date(meta.createdAt);
  const dateStringEN = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} -- ${date.getHours()}:${date.getMinutes()}`;
  const dateStringAR = `${date.getHours()}:${date.getMinutes()} -- ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const template = `
  <div class="article-meta-container">
   
  <div class="article-meta-img">
    <img
      src="${meta.thumbnail}"
      alt="blog article thumbnail"
    />
  </div>
   <div class="article-meta-text">
     <a class="article-meta-nav-link" data="${meta.articleId}" href="/${
    meta.articleId
  }"><h3>${isEnglish ? meta.title.en : meta.title.ar}</h3></a>
     <p class="article-meta-description-text">${
       isEnglish ? meta.description.en : meta.description.ar
     }</p>
     <p><span>${isEnglish ? dateStringEN : dateStringAR}</span></p>
   </div>
 </div>
`;
  return template;
}

function clearArticlesMeta() {
  articlesMetaGrid.innerHTML = "";
}

function buildArticlesMeta() {
  const isEnglish =
    document.querySelector("html").getAttribute("lang") === "en";

  clearArticlesMeta();
  articlesMeta.forEach((meta) => {
    articlesMetaGrid.innerHTML += buildArticleMetaUI(meta, isEnglish);
  });
}

buildArticlesMeta();

const observer = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    if (m.type === "attributes") {
      buildArticlesMeta();
      console.log("observer fired...");
    }
  });
});
observer.observe(document.querySelector("html"), {
  attributes: true, //configure it to listen to attribute changes
});
