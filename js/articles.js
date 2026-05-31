/* eslint-disable camelcase */
import { articlesMeta } from "../articles/articles_meta.js";

function _buildArticleMetaContainer(meta) {
  return /*html*/ `
  <div class='article-card'>
    <a href='${meta.filePath}' class='article-card-image'>
      <img src='${meta.imgUrl}' alt='${meta.title}'>
    </a>
    <div class='article-card-content'>
      <h2><a href='${meta.filePath}'>${meta.title}</a></h2>
      <p>${meta.description}</p>
      <a href='${meta.filePath}' class='read-more-link'>اقرأ المقال</a>
    </div>
  </div>
  `;
}

const articlesContainer = document.getElementById("article-meta-container");

if (articlesContainer) {
  articlesMeta.forEach((meta) => {
    articlesContainer.insertAdjacentHTML(
      "beforeend",
      _buildArticleMetaContainer(meta)
    );
  });
}
