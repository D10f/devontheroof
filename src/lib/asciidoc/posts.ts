import fs from "fs";

export function getPosts() {
  const files = fs.readdirSync("public", "utf-8");
  return files.filter((file) => file.endsWith(".adoc"));
}
