import AsciidocParser from "@/lib/asciidoc/Parser";
import Link from "next/link";
import PostTag from "@/components/PostTag";

type PostCardProps = {
    post: AsciidocParser;
};

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="card" key={post.slug}>
            <header>
                <h2 className="card__title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <time className="card__date">{post.date}</time>
                <aside className="card__tags">
                    {post.technologies.map((tech) => (
                        <PostTag tag={tech} key={post.title} />
                    ))}
                </aside>
            </header>

            <p>{post.preamble}</p>
        </article>
    );
}
