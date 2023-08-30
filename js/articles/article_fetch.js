import { Article } from "./article_base.js";

const devUri =
  "http://127.0.0.1:8888/cpanel-articles-articles/111111/fetch-by-meta";

// let requestedArticle = {};

async function fetchArticleByMeta(articleId) {
  try {
    const response = await fetch(devUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article_id: articleId }),
    });
    const json = await response.json();
    // console.log(json);
    return Article.fromJSON(json);
    // return requestedArticle;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchArticleByMeta2(articleId) {
  try {
    const response = await fetch(devUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article_id: articleId }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { fetchArticleByMeta, fetchArticleByMeta2 };
