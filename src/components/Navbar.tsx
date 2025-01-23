"use client";

import Link from "next/link";
import ThemeController from "@/components/ThemeController";
import useScrollDirection from "@/hooks/useScrollDirection";
import { catppuccin } from "@/themes/_catppuccin";
import { everforest } from "@/themes/_everforest";
import { monokai } from "@/themes/_monokai";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

const themes = {
    Catppuccin: catppuccin,
    Everforest: everforest,
    Monokai: monokai,
};

export default function Navbar() {
    const { direction } = useScrollDirection();
    const path = usePathname();

    const navbarStyle = direction > 0 ? "navbar navbar--hidden" : "navbar";

    const navbarLinkStyle = useCallback(
        (segment: string) => {
            return path.includes(segment) ? "navbar__links--active" : "";
        },
        [path],
    );

    //<NavbarBreadcrumb />
    return (
        <nav className={navbarStyle}>
            <div className="navbar__content">
                <h1>
                    <Link href="/">D10f</Link>
                </h1>

                <menu className="navbar__links">
                    <li>
                        <Link className={navbarLinkStyle("blog")} href="/blog">
                            Blog
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={navbarLinkStyle("projects")}
                            href="/projects"
                        >
                            Projects
                        </Link>
                    </li>

                    <li>
                        <Link className={navbarLinkStyle("uses")} href="/uses">
                            Uses
                        </Link>
                    </li>
                </menu>

                <menu className="navbar__dropdown">
                    <li>
                        <ThemeController themes={themes} />
                    </li>
                </menu>
            </div>
        </nav>
    );
}
