import { fetchArticleByMeta } from "./js/articles/article_fetch.js";

const path = window.location.pathname;
const articleId = path.replace("/", "");
console.log(articleId);
const article = await fetchArticleByMeta(articleId);
const pageContent = document.querySelector(".page-content");

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

function buildArticleTemplate(article, isEnglish) {
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
  const template = `
  ${imgElement}
  <h1 class="margin">${isEnglish ? article.title.en : article.title.ar}</h1>
  ${dateElement}
  <h3 class="margin center-text">${
    isEnglish ? article.shortDescription.en : article.shortDescription.ar
  }</h3>
  ${paragraphList}
  `;
  return template;
}

function clearInnerHtml() {
  pageContent.innerHTML = "";
}

function rebuildArticlePageUI(article) {
  const isEnglish = document.querySelector("html").getAttribute("lang") == "en";
  clearInnerHtml();
  pageContent.innerHTML += buildArticleTemplate(article, isEnglish);
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    if (m.type === "attributes") {
      rebuildArticlePageUI(article);
      console.log("observer fired...");
    }
  });
});
observer.observe(document.querySelector("html"), {
  attributes: true, //configure it to listen to attribute changes
});
