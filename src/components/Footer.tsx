import Link from "next/link";
import Tooltip from "@/components/Tooltip";
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
                                data-tooltip-id="_nextjs"
                                href="https://nextjs.org"
                                target="_blank"
                            >
                                <SvgIcon iconName="nextjs" />
                            </Link>
                            <Tooltip
                                id="_nextjs"
                                place="bottom"
                                content="Next.js"
                            />
                        </li>
                        <li>
                            <Link
                                aria-label="Link to send an email to address"
                                data-tooltip-id="_asciidoc"
                                href="https://asciidoctor.org"
                                target="_blank"
                            >
                                <SvgIcon iconName="asciidoc" />
                            </Link>
                            <Tooltip
                                id="_asciidoc"
                                place="bottom"
                                content="AsciiDoc"
                            />
                        </li>
                        <li>
                            <Link
                                aria-label="Source code for this website"
                                data-tooltip-id="_git"
                                href="https://github.com/d10f/devontheroof"
                                target="_blank"
                            >
                                <SvgIcon iconName="git" />
                            </Link>
                            <Tooltip
                                id="_git"
                                place="bottom"
                                content="Git (source code)"
                            />
                        </li>
                    </ul>
                </div>
                <div className="footer__field">
                    <p>Find more about me:</p>
                    <ul>
                        <li>
                            <Link
                                aria-label="Link to Codeberg profile"
                                href="https:codeberg.org/D10f"
                                data-tooltip-id="codeberg"
                                target="_blank"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-codeberg`} />
                                </svg>
                            </Link>
                            <Tooltip
                                id="codeberg"
                                place="top"
                                content="Codeberg"
                            />
                        </li>
                        <li>
                            <Link
                                aria-label="Link to Github profile"
                                href="https:github.com/D10f"
                                data-tooltip-id="github"
                                target="_blank"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-github`} />
                                </svg>
                            </Link>
                            <Tooltip id="github" place="top" content="GitHub" />
                        </li>
                        <li>
                            <Link
                                aria-label="Link to Codepen profile"
                                href="https:codepen.io/D10f"
                                data-tooltip-id="codepen"
                                target="_blank"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-codepen`} />
                                </svg>
                            </Link>
                            <Tooltip
                                id="codepen"
                                place="top"
                                content="Codepen"
                            />
                        </li>
                    </ul>
                </div>

                <div className="footer__field">
                    <p>Get in touch:</p>
                    <ul>
                        <li>
                            <Link
                                aria-label="Link to send an email to address devontheroof@pm.me"
                                data-tooltip-id="email"
                                href="mailto:devontheroof@pm.me"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-email`} />
                                </svg>
                            </Link>
                            <Tooltip id="email" place="top" content="Email" />
                        </li>
                        <li>
                            <Link
                                aria-label="Link to a public PGP key to encrypt the body of an email"
                                data-tooltip-id="gpg"
                                href="#"
                            >
                                <svg aria-hidden="true">
                                    <use href={`/sprite.svg#icon-gpg-key`} />
                                </svg>
                            </Link>
                            <Tooltip
                                id="gpg"
                                place="top"
                                content="PGP public key"
                            />
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
