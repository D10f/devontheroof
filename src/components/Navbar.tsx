import Link from "next/link";
import ThemeController from "@/components/ThemeController";
import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";

export default function Navbar() {
    return (
        <nav className="navbar">
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
