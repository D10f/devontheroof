import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Work in Progress. Please hold.</h1>
      <p>
        <Link href="/blog">Blog</Link>
      </p>
      <p>
        <Link href="/blog/shell">Shell scripting</Link>
      </p>
      <p>
        <Link href="/blog/practical_tls">Practical TLS</Link>
      </p>
    </>
  );
}
