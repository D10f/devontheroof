import SvgIcon from "@/components/SvgIcon";

type PostTagProps = {
    tag: string;
};

export default function PostTag({ tag }: PostTagProps) {
    return (
        <>
            <span className="post__tag" aria-describedby="technologyname">
                <SvgIcon iconName={tag} />
                <div
                    className="post__tooltip"
                    role="tooltip"
                    id="technologyname"
                >
                    {tag}
                </div>
            </span>
        </>
    );
}
