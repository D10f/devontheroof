import fs from "fs";
import AsciidocParser from "./Parser";
import { CustomConverter } from "./converters/BaseConverter";

type DocType = "posts" | "pages" | "projects";

const syntaxHighlighterThemes = [
    "catppuccin-latte",
    "catppuccin-frappe",
    "catppuccin-macchiato",
    "catppuccin-mocha",
    "github-dark",
    "github-light",
];

export function getFilenames(dir = "posts") {
    const files = fs.readdirSync(`public/${dir}`, "utf-8");
    return files.filter((file) => file.match(/[^\.draft]\.adoc$/));
}

export function getSlugs(dir = "posts") {
    return getFilenames(dir).map((post) => ({
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

export function getDocs(type: DocType) {
    return getFilenames(type).map((filename) =>
        getPostData(`public/${type}/${filename}`),
    );
}

export function generatePageMetadata(post: AsciidocParser) {
    return {
        title: "D10f | " + post.title,
        description: post.description,
        keywords: post.keywords + ", " + post.technologies,
    };
}
