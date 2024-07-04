import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/asciidoc/posts";

export default function BlogPage() {
    const posts = getAllPosts();
    posts.sort((a, b) => (a.date.isBefore(b.date) ? 1 : -1));

    return (
        <main className="content">
            {posts.map((post) => (
                <PostCard post={post} key={post.slug} />
            ))}
        </main>
    );
}
