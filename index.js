import express, { json, urlencoded } from "express";
import cors from "cors";
import err404 from "./js/articles/404_page_template.mjs";
import cookieSession from "cookie-session";
import compression from "compression";
import articlesRouter from "./articles.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", express.static("./"));

app.use(json());

app.use(cors());

app.use(compression());

app.use(urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "lang",
    keys: ["ar"],
  })
);

app.use("/articles", articlesRouter);

app.put("/:lang", async (req, res) => {
  // console.log(req.path);
  const lang = req.params.lang;
  // await modLocale(lang);
  res.cookie("lang", lang);
  res.status(200).send("OK");
});

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function (req, res) {
  console.log(`Path Not Found: ${req.path}`);
  res.status(404).send(err404);
});

// app.all("*", (req, res) => {
//   res.status(404).send(err404);
// });

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`);
  // await fetchStoredLocale();
});

// export { fetchStoredLocale, modLocaleInJson };
