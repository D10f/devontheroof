import { getAllPosts } from "@/lib/asciidoc/posts";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog">
      {posts.map((post) => (
        <article className="card" key={post.slug}>
          <header>
            <h2 className="card__title">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <time className="card__date">{post.date}</time>
          </header>

          <p>{post.preamble}</p>
        </article>
      ))}
    </div>
  );
}
