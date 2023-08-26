import { Translatable } from "./articles_meta_base.js";

class ArticleParagraph {
  constructor(uuid, title, body, image, subtitle) {
    this.uuid = uuid;
    this.title = new Translatable(title.en, title.ar);
    this.body = new Translatable(body.en, body.ar);
    this.paragraphImage = image;
    this.paragraphImageSubtitle = subtitle;
  }

  static FROMJSON(json) {
    return new ArticleParagraph(
      json.uuid,
      Translatable.fromJSON(json.title),
      Translatable.fromJSON(json.body),
      json.paragraphImage,
      json.paragraphImageSubtitle
    );
  }

  static toParagraphListFromJson(...json) {
    return json.map((e) => ArticleParagraph.FROMJSON(e));
  }
}

class Article {
  constructor(
    docid,
    timeofpub,
    title,
    shortdescription,
    tags,
    articleimage,
    paragraphs
  ) {
    this.docid = docid;
    this.timeofpub = timeofpub;
    this.title = new Translatable(title.en, title.ar);
    this.shortDescription = new Translatable(
      shortdescription.en,
      shortdescription.ar
    );
    this.tags = tags;
    this.articleImage = articleimage;
    this.paragraphs = paragraphs;
  }

  static fromJSON(json) {
    return new Article(
      json.docid,
      json.timeofpub,
      Translatable.fromJSON(json.title),
      Translatable.fromJSON(json.shortdescription),
      json.tags,
      json.articleImage,
      ArticleParagraph.toParagraphListFromJson(...json.paragraphs)
    );
  }
}

export { ArticleParagraph, Article };
