/* eslint-disable camelcase */
import articlesMeta from "../articles/articles_meta.json" assert { type: "json" };

function _buildArticleMetaContainer(meta) {
  return /*html*/ `
  <div>
    <ul>
        <a href='${meta.filePath}'>${meta.title}</a>
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
