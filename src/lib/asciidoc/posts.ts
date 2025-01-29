import fs from "fs";
import AsciidocParser from "./Parser";
import { CustomConverter } from "./converters/BaseConverter";

type DocType = "posts" | "pages" | "projects";

export function getFilenames(dir = "posts") {
    const files = fs.readdirSync(`public/${dir}`, "utf-8");
    return process.env.NODE_ENV === "production"
        ? files.filter((file) => file.match(/^[^_][\w\-_\d]+.adoc$/))
        : files.filter((file) => file.match(/\.adoc$/));
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
    const post = new AsciidocParser(filename);
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
