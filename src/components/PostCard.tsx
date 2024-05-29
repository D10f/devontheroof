import AsciidocParser from "@/lib/asciidoc/Parser";
import Link from "next/link";

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
            </header>

            <p>{post.preamble}</p>
        </article>
    );
}
