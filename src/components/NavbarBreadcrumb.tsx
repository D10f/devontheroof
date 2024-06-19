"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarBreadcrumb() {
    const pathname = usePathname();
    const route = pathname.match(/[^/]+/g);

    if (!route) return null;

    return route.map((p, idx) => {
        const active = idx === route.length - 1;

        return (
            <article className="navbar__breadcrumb" key={p}>
                <span className="px-2 unselectable">/</span>
                <h2 className={active ? "navbar__breadcrumb--active" : ""}>
                    <Link href={`/${p.toLowerCase()}`}>{p}</Link>
                </h2>
            </article>
        );
    });
}
