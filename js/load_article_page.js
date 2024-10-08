import { url } from "../js/urls.js";

async function _fetchArticleData() {
  const loc = window.location.href;

  // console.log(loc);

  const pathSegments = loc.split("/");

  const article = Array.from(pathSegments).at(pathSegments.length - 1);

  // console.log(article);

  const jsonFile = article.split(".")[0].toString() + ".json";

  const jsonData = await fetch(`${url}/articles/${jsonFile}`);

  const articleData = await jsonData.json();

  //   console.log(articleData);

  return articleData;
}

const articleImgPlaceHolder = document.getElementById("article-img-file");
const articleTitlePlaceHolder = document.getElementById("article-long-title");
const articleDescriptionPlaceHolder = document.getElementById(
  "article-long-description"
);
const articleParagraphsContainer = document.getElementById(
  "article-paragraphs-container"
);

function _buildTemplate(data) {
  articleImgPlaceHolder.src = data.imgUrl;
  articleTitlePlaceHolder.innerText = data.title;
  articleDescriptionPlaceHolder.innerText = data.description;
  const paragraphs = Array.from(data.paragraphs);
  paragraphs.forEach((p, i) => {
    articleParagraphsContainer.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
        <div>
            <h3>${p.title}</h3>
            <p>${p.body}</p>
        </div>
    `
    );
  });
}

await _fetchArticleData().then((data) => _buildTemplate(data));

//todo: style page
//todo: add metadata
//todo: publish
