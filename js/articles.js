/* eslint-disable camelcase */
import articlesMeta from "../articles/articles_meta.json" assert { type: "json" };

function _buildArticleMetaContainer(meta) {
  //TODO:STYLE PAGE TO DISPLAY PROPERLY
  return /*html*/ `
  <div>
    <ul>
        <h2><a href='${meta.filePath}'>${meta.title}</a></h2>
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
