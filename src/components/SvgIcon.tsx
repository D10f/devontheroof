type SvgIconProps = {
    iconName: string;
};

export default function SvgIcon({ iconName }: SvgIconProps) {
    return (
        <svg aria-hidden="true">
            <use href={`/sprite.svg#icon-${iconName}`} />
        </svg>
    );
}
