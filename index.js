import express, { json, urlencoded } from "express";
import cors from "cors";
import { fetchArticleByMeta } from "./js/articles/article_fetch.js";
import buildArticlePage from "./js/articles/article_page_template.mjs";
import err404 from "./js/articles/404_page_template.mjs";
import { Article } from "./js/articles/article_base.js";
import fs from "fs";
// import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(json());

const corsOptions = {
  origin:
    "https://cosmosurgeserver.xyz/cpanel-articles-articles/111111/fetch-by-meta",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors());

app.use(urlencoded({ extended: true }));

app.use(express.static("."));

let langObj = { lang: "ar" };

async function fetchStoredLocale() {
  // const buffer = fs.readFileSync("./json/lang.json");
  // const stringBuffer = buffer.toString();
  // const langObj = JSON.parse(stringBuffer);
  // // console.log(langObj["lang"]);
  return langObj["lang"];
}

async function modLocale(stringLocale) {
  langObj = { lang: stringLocale };
  // await fs.writeFileSync(`./json/lang.json`, langObj);
  // console.log("updated language json file");
  return langObj["lang"];
}

app.get("/:articleId", cors(corsOptions), async (req, res) => {
  const articleId = req.params.articleId;
  const isEnglish = (await fetchStoredLocale()) == "en";
  // console.log(isEnglish);
  try {
    const article = await fetchArticleByMeta(articleId);
    res.send(buildArticlePage(article, isEnglish));
  } catch (error) {
    res.send(err404);
  }
});

app.put("/:lang", async (req, res) => {
  console.log(req.path);
  const lang = req.params.lang;
  await modLocale(lang);
  res.status(200).send("OK");
});

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`);
  // await fetchStoredLocale();
});

// export { fetchStoredLocale, modLocaleInJson };
