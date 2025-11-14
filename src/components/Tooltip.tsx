type TooltipProps = {
    id?: string;
    position?: "top" | "right" | "bottom" | "left";
    children: React.ReactNode;
};

export default function Tooltip({ id, position, children }: TooltipProps) {
    const baseCss = "tooltip ";
    const classes = `tooltip--${position}`;

    return (
        <small
            id={id}
            className={baseCss + classes}
            data-position={position}
            role="tooltip"
        >
            {children}
        </small>
    );
}
