import PostCard from "@/components/PostCard";
import { getDocs } from "@/lib/asciidoc/posts";

export default function BlogPage() {
    const posts = getDocs("posts");
    posts.sort((a, b) => (a.date.isBefore(b.date) ? 1 : -1));

    return (
        <main className="layout-content">
            {posts.map((post) => (
                <PostCard post={post} key={post.slug} />
            ))}
        </main>
    );
}
