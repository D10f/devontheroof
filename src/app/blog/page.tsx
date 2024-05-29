import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/asciidoc/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog">
      {posts.map((post) => (
        <PostCard post={post} key={post.slug} />
      ))}
    </div>
  );
}
