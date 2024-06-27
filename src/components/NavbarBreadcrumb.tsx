"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarBreadcrumb() {
    const pathname = usePathname();
    const route = pathname.match(/[^/]+/g);

    if (!route) return null;

    return route.slice(0, -1).map((p, idx) => {
        // NOTE: if last item (current page) is sliced, no need to check for
        // active item:
        //const active = idx === route.length - 1;
        //<h2 className={active ? "navbar__breadcrumb--active" : ""}>

        return (
            <article className="navbar__breadcrumb" key={p}>
                <span className="px-2 unselectable">/</span>
                <h2>
                    <Link href={`/${p.toLowerCase()}`}>{p}</Link>
                </h2>
            </article>
        );
    });
}
