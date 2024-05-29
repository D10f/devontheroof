import fs from "fs";
import AsciidocParser from "./Parser";
import { CustomConverter } from "./converters/BaseConverter";

export function getPostFilenames() {
  const files = fs.readdirSync("public", "utf-8");
  return files.filter((file) => file.endsWith(".adoc"));
}

export function getPostSlugs() {
  return getPostFilenames().map((post) => ({
    slug: post.replace(/\..*$/, ""),
  }));
}

export function getPostData(
  filename: string,
  converters: CustomConverter[] = [],
) {
  const post = new AsciidocParser(filename);
  converters.forEach((converter) => post.use(converter));
  return post;
}

export function getAllPosts() {
  return getPostFilenames().map((filename) => getPostData(filename));
}
