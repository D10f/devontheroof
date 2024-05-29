type PostTagProps = {
    tag: string;
};

export default function PostTag({ tag }: PostTagProps) {
    const svgSprite = `/sprite.svg#icon-${tag}`;

    return (
        <span className="post__tag">
            <svg aria-hidden="true">
                <use xlinkHref={svgSprite} />
            </svg>
        </span>
    );
}
