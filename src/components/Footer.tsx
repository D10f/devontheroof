import Link from "next/link";
// import Tooltip from "@/components/Tooltip";
import BackToTop from "@/components/BackToTop";
import SvgIcon from "@/components/SvgIcon";

export default function Footer() {
    return (
        <footer className="footer">
            <BackToTop />

            <div className="footer__links">
                <div className="footer__field">
                    <p>This site is built with:</p>
                    <ul>
                        <li>
                            <Link
                                aria-label="Link to send an email to address"
                                aria-describedby="footer__nextjs"
                                href="https://nextjs.org"
                                target="_blank"
                            >
                                <SvgIcon iconName="nextjs" />
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer_nextjs"
                            >
                                Next.js
                            </span>
                        </li>
                        <li>
                            <Link
                                aria-label="Link to send an email to address"
                                aria-describedby="footer__asciidoctor"
                                href="https://asciidoctor.org"
                                target="_blank"
                            >
                                <SvgIcon iconName="asciidoc" />
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer_asciidoctor"
                            >
                                Asciidoctor
                            </span>
                        </li>
                        <li>
                            <Link
                                aria-label="Source code for this website"
                                aria-describedby="footer__git"
                                href="https://github.com/d10f/devontheroof"
                                target="_blank"
                            >
                                <SvgIcon iconName="git" />
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer__git"
                            >
                                Git version control
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="footer__field">
                    <p>Find more about me:</p>
                    <ul>
                        <li>
                            <Link
                                aria-label="Link to Codeberg profile"
                                href="https://codeberg.org/D10f"
                                aria-describedby="footer__codeberg"
                                target="_blank"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-codeberg`} />
                                </svg>
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer__codeberg"
                            >
                                Codeberg
                            </span>
                        </li>
                        <li>
                            <Link
                                aria-label="Link to Github profile"
                                href="https://github.com/D10f"
                                aria-describedby="footer__github"
                                target="_blank"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-github`} />
                                </svg>
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer__github"
                            >
                                GitHub
                            </span>
                        </li>
                        <li>
                            <Link
                                aria-label="Link to Codepen profile"
                                href="https://codepen.io/D10f"
                                aria-describedby="footer__codepen"
                                target="_blank"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-codepen`} />
                                </svg>
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer__codepen"
                            >
                                Codepen
                            </span>
                        </li>
                        <li>
                            <Link
                                aria-label="Link to Exercism profile"
                                href="https://exercism.org/profiles/quasimodo"
                                aria-describedby="footer__exercism"
                                target="_blank"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-exercism`} />
                                </svg>
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer__exercism"
                            >
                                Exercism
                            </span>
                        </li>
                        <li>
                            <Link
                                aria-label="Link to Codewars profile"
                                href="https://www.codewars.com/users/imperation_bypasser"
                                aria-describedby="footer__codewars"
                                target="_blank"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-codewars`} />
                                </svg>
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer__codewars"
                            >
                                Codewars
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="footer__field">
                    <p>Get in touch:</p>
                    <ul>
                        <li>
                            <Link
                                aria-label="Link to send an email to address devontheroof@pm.me"
                                aria-describedby="footer__email"
                                href="mailto:devontheroof@pm.me"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-email`} />
                                </svg>
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer__email"
                            >
                                Email
                            </span>
                        </li>
                        <li>
                            <Link
                                aria-label="Link to a public PGP key to encrypt the body of an email"
                                aria-describedby="footer__pgp"
                                href="#"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-gpg-key`} />
                                </svg>
                            </Link>
                            <span
                                className="footer__field-tooltip"
                                role="tooltip"
                                id="footer__pgp"
                            >
                                PGP public key
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <p className="footer__license">
                All content by me &copy; 2024
                <Link
                    className="pl-1"
                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                    target="_blank"
                    rel="license noopener noreferrer"
                >
                    CC BY-SA 4.0
                </Link>
            </p>
        </footer>
    );
}
