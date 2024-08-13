/* eslint-disable camelcase */
import { articlesMeta } from "../articles/articles_meta.js";

function _buildArticleMetaContainer(meta) {
  //todo:STYLE PAGE TO DISPLAY PROPERLY
  return /*html*/ `
  <div class='articles-meta-outside-container'>
    <ul class='articles-meta-list'>
      <div class='articles-meta-inside-container'>
      <img src='${meta.imgUrl}' alt='paragraph image'>
      <h2><a href='${meta.filePath}'>${meta.title}</a></h2>
      <p>${meta.description}</p>
      </div>
    </ul>
  </div>
  `;
}

const articlesContainer = document.getElementById("article-meta-container");

articlesMeta.forEach((meta) => {
  articlesContainer.insertAdjacentHTML(
    "beforeend",
    _buildArticleMetaContainer(meta)
  );
});
