import { fetchArticleByMeta } from "./article_fetch.js";

const metaTitleLink = document.getElementsByClassName("article-meta-nav-link");

// console.log(metaTitleLink);

let article = {};

// metaTitleLink;

document.body.addEventListener("click", async function (e) {
  if (e.target.closest("a")) {
    e.preventDefault();
    const href = e.target.closest("a").href.split("/");
    const articleId = href[href.length - 1].toString();
    article = await fetchArticleByMeta(articleId);
    console.log(article);
  }
});
