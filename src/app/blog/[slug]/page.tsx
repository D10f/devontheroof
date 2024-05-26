import { getPosts } from "@/lib/asciidoc/posts";
import ImageConverter from "@/lib/asciidoc/converters/ImageConverter";
import PreambleConverter from "@/lib/asciidoc/converters/PreambleConverter";
import AsciidocParser from "@/lib/asciidoc/Parser";

// throws a 404 error if the dynamic route was not generated by Next.js
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({
    slug: post.replace(/\..*$/, ""),
  }));
}

export default function PostPage({ params }: any) {
  const post = new AsciidocParser(params.slug)
    .use(new ImageConverter())
    .use(new PreambleConverter());

  return (
    <div className="post">
      <header>
        <h1 className="post__title">{post.title}</h1>
        {post.subtitle && <h2 className="post__subtitle">{post.subtitle}</h2>}
      </header>

      <aside className="post__metadata">
        <span>{post.date}</span>
      </aside>

      <main
        className="post__content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
