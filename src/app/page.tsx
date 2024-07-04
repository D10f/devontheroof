import Link from "next/link";

export default function Home() {
    return (
        <div className="content">
            <h1>Work in Progress. Please hold.</h1>
            <p>
                <Link href="/blog">Blog</Link>
            </p>
            <p>
                <Link href="/what-i-use">What I Use</Link>
            </p>
        </div>
    );
}
