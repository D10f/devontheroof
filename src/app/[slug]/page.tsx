import { Metadata } from "next";
import ImageConverter from "@/lib/asciidoc/converters/ImageConverter";
import SectionConverter from "@/lib/asciidoc/converters/SectionConverter";
import {
    generatePageMetadata,
    getPostData,
    getSlugs,
} from "@/lib/asciidoc/posts";

type Props = {
    params: {
        slug: string;
    };
};

export const dynamicParams = false;

export function generateStaticParams() {
    return getSlugs("pages");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getPostData(`public/pages/${params.slug}.adoc`);
    return generatePageMetadata(post);
}

export default function SinglePage({ params }: any) {
    const post = getPostData(`public/pages/${params.slug}.adoc`, [
        new ImageConverter(),
        new SectionConverter(),
    ]);

    return (
        <div className="layout-content">
            <header>
                <h1 className="post__title">{post.title}</h1>
                {post.subtitle && (
                    <h2 className="post__subtitle">{post.subtitle}</h2>
                )}
            </header>

            <main
                className="post__content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
}
