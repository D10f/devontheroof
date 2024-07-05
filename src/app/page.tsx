import ImageConverter from "@/lib/asciidoc/converters/ImageConverter";
import { generatePageMetadata, getPostData } from "@/lib/asciidoc/posts";

export let metadata = {};

export default function Home() {
    const post = getPostData("public/pages/home.adoc", [new ImageConverter()]);

    metadata = generatePageMetadata(post);

    return (
        <div className="layout-content">
            <main
                className="post__content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
}
