import express, { json, urlencoded } from "express";
import cors from "cors";
import buildArticlePage from "./js/articles/article_page_template.mjs";
import err404 from "./js/articles/404_page_template.mjs";
import { Article } from "./js/articles/article_base.js";
import cookieSession from "cookie-session";

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

app.use(
  cookieSession({
    name: "lang",
    keys: ["ar"],
  })
);

async function fetchArticleByMeta(articleId) {
  try {
    const response = await fetch(corsOptions.origin, {
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

app.get("/:articleId", cors(corsOptions), async (req, res) => {
  const articleId = req.params.articleId;
  const cookieString = req.headers.cookie;
  const cookieList = cookieString.split(";");
  const cookies = new Map();

  // Loop through the myCookies array
  for (let cookie of cookieList) {
    // Split the elements at "="
    cookie = cookie.split("=");

    // Set the first element as key and second element as value
    cookies.set(cookie[0], cookie[1]);
  }
  const isEnglish = cookies["lang"] == "en";
  // console.log(isEnglish);
  try {
    const article = await fetchArticleByMeta(articleId);
    res.send(buildArticlePage(article, isEnglish));
  } catch (error) {
    res.send(err404);
  }
});

app.put("/:lang", async (req, res) => {
  // console.log(req.path);
  const lang = req.params.lang;
  // await modLocale(lang);
  res.cookie("lang", lang);
  res.status(200).send("OK");
});

//The 404 Route (ALWAYS Keep this as the last route)
// app.use(function (req, res) {
//   res.status(404).sendFile("404.html", { root: "./" });
// });

app.all("*", (req, res) => {
  res.status(404).send(err404);
});

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`);
  // await fetchStoredLocale();
});

// export { fetchStoredLocale, modLocaleInJson };
