import Link from "next/link";
import Tooltip from "@/components/Tooltip";
import SvgIcon from "@/components/SvgIcon";

export default function ContactPageIcons() {
    return (
        <ul className="contact__links">
            <li>
                <Link
                    aria-label="Link to Codeberg profile"
                    href="https://codeberg.org/D10f"
                    data-tooltip-id="codeberg"
                >
                    <SvgIcon iconName="codeberg" />
                </Link>
                <Tooltip id="codeberg" place="bottom" content="Codeberg" />
            </li>
            <li>
                <Link
                    aria-label="Link to Github profile"
                    href="https://github.com/D10f"
                    data-tooltip-id="github"
                >
                    <SvgIcon iconName="github" />
                </Link>
                <Tooltip id="github" place="bottom" content="GitHub" />
            </li>
            <li>
                <Link
                    aria-label="Link to Codepen profile"
                    href="https://codepen.io/D10f"
                    data-tooltip-id="codepen"
                >
                    <SvgIcon iconName="codepen" />
                </Link>
                <Tooltip id="codepen" place="bottom" content="Codepen" />
            </li>
        </ul>
    );
}
