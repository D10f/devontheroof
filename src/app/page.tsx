import ImageConverter from "@/lib/asciidoc/converters/ImageConverter";
import { generatePageMetadata, getPostData } from "@/lib/asciidoc/posts";

export const metadata = {
    title: "D10f | Home",
};

export default function Home() {
    //const post = getPostData("public/pages/home.adoc", [new ImageConverter()]);
    //
    //metadata = generatePageMetadata(post);

    return (
        <div className="layout-content">
            <h1>Hello</h1>
        </div>
    );

    //return (
    //    <div className="layout-content">
    //        <main
    //            className="post__content"
    //            dangerouslySetInnerHTML={{ __html: post.content }}
    //        />
    //    </div>
    //);
}
