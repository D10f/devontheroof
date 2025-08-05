import { MouseEventHandler, ReactNode } from "react";

type RotatingButtonProps = {
    isActive: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    topIcon: ReactNode;
    botIcon: ReactNode;
};

export default function RotatingButton({
    onClick,
    isActive,
    topIcon,
    botIcon,
}: RotatingButtonProps) {
    const cssClass = isActive
        ? "rotating-btn rotating-btn--active"
        : "rotating-btn";

    return (
        <button onClick={onClick} className={cssClass}>
            <span>
                {topIcon}
                {botIcon}
            </span>
        </button>
    );
}
