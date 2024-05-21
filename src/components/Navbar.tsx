import Link from "next/link";
import ThemeController from "@/components/ThemeController";

export default function Navbar() {
    return (
        <nav className="navbar">
            <h1>
                <Link href="/">D10f</Link>
            </h1>

            <ul>
                <li>
                    <ThemeController />
                </li>
            </ul>
        </nav>
    );
}
