import { ArticleMeta, defURI, uri } from "./articles_meta_base.js";

defURI("dev");

const articlesMeta = [];

async function fetchArticlesMeta() {
  try {
    const response = await fetch(uri);
    const json = await response.json();
    console.log(json);
    articlesMeta.push(...ArticleMeta.toArticleMetaListFromJson(...json));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

await fetchArticlesMeta();

export { articlesMeta };
