import fs from "fs";
import path from "path";
import Asciidoctor, { Document, Title } from "asciidoctor";

export function getPosts() {
  const files = fs.readdirSync("public", "utf-8");
  return files.filter((file) => file.endsWith(".adoc"));
}

// export function parsePost(slug: string) {
//   const asciidoctor = Asciidoctor();
//   return asciidoctor.loadFile(`public/${slug}.adoc`, { safe: "unsafe" });
// }

function responsiveImages() {
  // const content = (post.getContent() as string).replaceAll(
  //   "assets/",
  //   "/assets/",
  // );
}

const BASE_PATHNAME = "public";

export default class Doc {
  private asciidoctor: ReturnType<typeof Asciidoctor>;
  private doc: Document;
  private documentTitle: Title;

  constructor(slug: string) {
    this.asciidoctor = Asciidoctor();
    this.doc = this.load(slug);
    this.documentTitle = this.doc.getDocumentTitle({
      partition: true,
    }) as Title;
  }

  get title() {
    return this.documentTitle.getMain();
  }

  get hasSubtitle() {
    return this.documentTitle.hasSubtitle();
  }

  get subtitle() {
    return this.documentTitle.getSubtitle();
  }

  get version() {
    return this.doc.getRevisionNumber();
  }

  get date() {
    return this.doc.getRevisionDate();
  }

  get content() {
    // makes all URLs absolute
    return this.doc.getContent()?.replaceAll("assets/", "/assets/") as string;
  }

  private load(slug: string) {
    return this.asciidoctor.loadFile(path.join(BASE_PATHNAME, slug + ".adoc"), {
      safe: "unsafe",
    });
  }
}
