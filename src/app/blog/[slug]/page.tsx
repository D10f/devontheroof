import {
    generatePageMetadata,
    getPostData,
    getSlugs,
} from "@/lib/asciidoc/posts";
import ImageConverter from "@/lib/asciidoc/converters/ImageConverter";
import PreambleConverter from "@/lib/asciidoc/converters/PreambleConverter";
import ColistConverter from "@/lib/asciidoc/converters/ColistConverter";
import AdmonitionConverter from "@/lib/asciidoc/converters/AdmonitionConverter";
import SectionConverter from "@/lib/asciidoc/converters/SectionConverter";
import { Metadata } from "next";

type Props = {
    params: {
        slug: string;
    };
};

// throws a 404 error if the dynamic route was not generated by Next.js
export const dynamicParams = false;

export function generateStaticParams() {
    return getSlugs("posts");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getPostData(`public/posts/${params.slug}.adoc`);
    return generatePageMetadata(post);
}

export default async function PostPage({ params }: Props) {
    const post = getPostData(`public/posts/${params.slug}.adoc`, [
        new ImageConverter(),
        new PreambleConverter(),
        new ColistConverter(),
        new AdmonitionConverter(),
        new SectionConverter(),
    ]);

    await post.useSyntaxHighligher();

    return (
        <div className="layout-content">
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
