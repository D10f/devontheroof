import Tooltip from "@/components/Tooltip";
import SvgIcon from "@/components/SvgIcon";

type PostTagProps = {
    tag: string;
};

export default function PostTag({ tag }: PostTagProps) {
    return (
        <>
            <span className="post__tag" data-tooltip-id={tag}>
                <SvgIcon iconName={tag} />
            </span>
            <Tooltip id={tag} place="bottom" content={tag} />
        </>
    );
}
