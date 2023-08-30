import express, { json, urlencoded } from "express";
import cors from "cors";
import { fetchArticleByMeta } from "./js/articles/article_fetch.js";
import buildArticlePage from "./js/articles/article_page_template.mjs";
import err404 from "./js/articles/404_page_template.mjs";
import { Article } from "./js/articles/article_base.js";
import fs from "fs";
import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(json());

const corsOptions = {
  origin: "http://127.0.0.1:8888/cpanel-articles-articles/111111/fetch-by-meta",
  optionsSuccessStatus: 200,
};

const sameCorsOptions = {
  origin: "http://127.0.0.1:3000/*",
  optionsSuccessStatus: 200,
};

app.use(cors());

app.use(urlencoded({ extended: true }));

app.use(express.static("."));

async function fetchStoredLocale() {
  const request = await fetch("http://127.0.0.1:3000/json/lang.json");
  const jsonLocale = await request.json();
  console.log(jsonLocale["lang"]);
  return jsonLocale["lang"];
}

app.get("/:articleId", cors(corsOptions), async (req, res) => {
  const articleId = req.params.articleId;
  const isEnglish = (await fetchStoredLocale()) == "en";
  console.log(isEnglish);
  try {
    const article = await fetchArticleByMeta(articleId);
    res.send(buildArticlePage(article));
  } catch (error) {
    res.send(err404);
  }
});

app.put("/lang", cors(sameCorsOptions), async (req, res) => {
  const newLang = req.body.lang;
  await fs.writeFile(
    `${path.join(path.dirname("."), "json/lang.json")}`,
    JSON.stringify({ lang: newLang })
  );
  console.log("updated language json file");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
