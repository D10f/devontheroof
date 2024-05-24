import fs from "fs";
import Asciidoctor from "asciidoctor";

export function getPosts() {
  const files = fs.readdirSync("public", "utf-8");
  return files.filter((file) => file.endsWith(".adoc"));
}

export function parsePost(slug: string) {
  const asciidoctor = Asciidoctor();
  return asciidoctor.loadFile(`public/${slug}.adoc`, { safe: "unsafe" });
}
