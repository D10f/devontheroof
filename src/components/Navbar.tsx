"use client";

import Link from "next/link";
import ThemeController from "@/components/ThemeController";
import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import useScrollDirection from "@/hooks/useScrollDirection";

export default function Navbar() {
    const { direction } = useScrollDirection();

    const navbarStyle = direction > 0 ? "navbar navbar--hidden" : "navbar";

    return (
        <nav className={navbarStyle}>
            <div className="navbar__content">
                <h1>
                    <Link href="/">D10f</Link>
                </h1>

                <NavbarBreadcrumb />

                <ul>
                    <li>
                        <ThemeController />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
