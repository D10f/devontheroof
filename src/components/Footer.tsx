import Link from "next/link";
import Tooltip from "@/components/Tooltip";

export default function Footer() {
    return (
        <footer className="footer">
            <h2>Thanks for visiting!</h2>
            <div className="footer__field">
                <p>You can find more about me on:</p>
                <ul>
                    <li>
                        <Link
                            aria-label="Link to Codeberg profile"
                            href="https://codeberg.org/D10f"
                            data-tooltip-id="codeberg"
                        >
                            <svg aria-hidden="true">
                                <use href={`/sprite.svg#icon-codeberg`} />
                            </svg>
                        </Link>
                        <Tooltip id="codeberg" place="top" content="Codeberg" />
                    </li>
                    <li>
                        <Link
                            aria-label="Link to Github profile"
                            href="https://github.com/D10f"
                            data-tooltip-id="github"
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
                            href="https://codepen.io/D10f"
                            data-tooltip-id="codepen"
                        >
                            <svg aria-hidden="true">
                                <use href={`/sprite.svg#icon-codepen`} />
                            </svg>
                        </Link>
                        <Tooltip id="codepen" place="top" content="Codepen" />
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
        </footer>
    );
}
