import SvgIcon from "@/components/SvgIcon";

type PostTagProps = {
    tooltipId: string;
    tag: string;
};

export default function PostTag({ tag, tooltipId }: PostTagProps) {
    return (
        <>
            <span className="post__tag" aria-describedby={tooltipId}>
                <SvgIcon iconName={tag} />
                <div id={tooltipId} className="post__tooltip" role="tooltip">
                    {tag}
                </div>
            </span>
        </>
    );
}
