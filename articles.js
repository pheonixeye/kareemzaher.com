import express, { Router } from "express";
import cors from "cors";
import { Article } from "./js/articles/article_base.js";
import axios from "axios";
import buildArticlePage from "./js/articles/article_page_template.mjs";
import err404 from "./js/articles/404_page_template.mjs";

const articlesRouter = Router();
articlesRouter.use("/", express.static("./"));

const corsOptions = {
  origin:
    "https://cosmosurgeserver.xyz/cpanel-articles-articles/111111/fetch-by-meta",
  optionsSuccessStatus: 200,
  // credentials: true,
};

async function fetchArticleByMeta(articleId) {
  try {
    const response = await axios.post(
      "https://cosmosurgeserver.xyz/cpanel-articles-articles/111111/fetch-by-meta",
      { article_id: articleId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return Article.fromJSON(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// middleware that is specific to this router
articlesRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());

  next();
});
articlesRouter.get("/:articleId", [cors(corsOptions)], async (req, res) => {
  const articleId = req.params.articleId;
  console.log(articleId);
  const cookieString = req.headers.cookie;
  const cookies = new Map();

  if (cookieString) {
    const cookieList = cookieString.split(";");

    // Loop through the myCookies array
    for (let cookie of cookieList) {
      // Split the elements at "="
      cookie = cookie.split("=");

      // Set the first element as key and second element as value
      cookies.set(cookie[0], cookie[1]);
    }
  }

  const isEnglish = cookies["lang"] && cookies["lang"] == "en";
  // console.log(isEnglish);
  try {
    const article = await fetchArticleByMeta(articleId);
    res.send(buildArticlePage(article, isEnglish));
  } catch (error) {
    res.send(err404);
  }
});

export default articlesRouter;
