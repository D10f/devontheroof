import AdmonitionConverter from "@/lib/asciidoc/converters/AdmonitionConverter";
import ImageConverter from "@/lib/asciidoc/converters/ImageConverter";
import PreambleConverter from "@/lib/asciidoc/converters/PreambleConverter";
import SectionConverter from "@/lib/asciidoc/converters/SectionConverter";
import {
    generatePageMetadata,
    getPostData,
    getSlugs,
} from "@/lib/asciidoc/posts";

export let metadata = {};

export const dynamicParams = false;

export function generateStaticParams() {
    return getSlugs("pages");
}

export default function SinglePage({ params }: any) {
    const post = getPostData(`public/pages/${params.slug}.adoc`, [
        new ImageConverter(),
        new PreambleConverter(),
        new SectionConverter(),
        new AdmonitionConverter(),
    ]);

    metadata = generatePageMetadata(post);

    return (
        <div className="post">
            <header>
                <h1 className="post__title">{post.title}</h1>
                {post.subtitle && (
                    <h2 className="post__subtitle">{post.subtitle}</h2>
                )}
            </header>

            <aside className="post__metadata">
                <span>{post.date.format("MMM Do, YYYY")}</span>
            </aside>

            <main
                className="post__content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
}
