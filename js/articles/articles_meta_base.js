/* eslint-disable camelcase */
class Translatable {
  constructor(en, ar) {
    this.en = en;
    this.ar = ar;
  }

  static fromJSON(json) {
    return new Translatable(json.en, json.ar);
  }
}

class ArticleMeta {
  constructor(docid, title, description, thumbnail, article_id, created_at) {
    this.docid = docid;
    this.title = new Translatable(title.en, title.ar);
    this.description = new Translatable(description.en, description.ar);
    this.thumbnail = thumbnail;
    this.articleId = article_id;
    this.createdAt = created_at;
  }

  static fromJSON(json) {
    return new ArticleMeta(
      json.docid,
      Translatable.fromJSON(json.title),
      Translatable.fromJSON(json.description),
      json.thumbnail,
      json.article_id,
      json.created_at
    );
  }

  static toArticleMetaListFromJson(...json) {
    return json.map((e) => ArticleMeta.fromJSON(e));
  }
}

const devUri = "http://localhost:8888/cpanel-articles-meta/111111";
const prodUri = "https://cosmosurgeserver.xyz/cpanel-articles-meta/111111";

let uri;

function defURI(param) {
  switch (param) {
    case "dev":
      uri = devUri;
      break;
    case "prod":
      uri = prodUri;
      break;
    default:
      uri = undefined;
  }
}

export { defURI, uri, ArticleMeta };
