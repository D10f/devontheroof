import Tooltip from "@/components/Tooltip";

type PostTagProps = {
    tag: string;
};

export default function PostTag({ tag }: PostTagProps) {
    const svgSprite = `/sprite.svg#icon-${tag}`;

    return (
        <>
            <span className="post__tag" data-tooltip-id={tag}>
                <svg aria-hidden="true">
                    <use href={svgSprite} />
                </svg>
            </span>
            <Tooltip id={tag} place="bottom" content={tag} />
        </>
    );
}
