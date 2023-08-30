// import { fetchArticleByMeta } from "./article_fetch.js";

// const metaTitleLink = document.querySelectorAll(".article-meta-nav-link");

// console.log(metaTitleLink);

// let article = {};

// document.body.addEventListener("click", async function (e) {
//   e.preventDefault();
//   if (e.target.closest("a")) {
//     const articleId = e.target.closest("a").getAttribute("data");
//     // console.log(articleId);
//     article = await fetchArticleByMeta(articleId);
//     // console.log(article);
//     window.history.replaceState(article, "", `/${articleId}`);
//   }
// });
