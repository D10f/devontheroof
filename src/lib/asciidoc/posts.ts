import fs from "fs";
import AsciidocParser from "./Parser";
import { CustomConverter } from "./converters/BaseConverter";

const syntaxHighlighterThemes = [
    "catppuccin-latte",
    "catppuccin-frappe",
    "catppuccin-macchiato",
    "catppuccin-mocha",
    "github-dark",
    "github-light",
];

export function getPostFilenames() {
    const files = fs.readdirSync("public/posts", "utf-8");
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
    const post = new AsciidocParser(filename, syntaxHighlighterThemes);
    converters.forEach((converter) => post.use(converter));
    return post;
}

export function getAllPosts() {
    return getPostFilenames().map((filename) => getPostData(filename));
}

export function generatePageMetadata(post: AsciidocParser) {
    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords + ", " + post.technologies,
    };
}
