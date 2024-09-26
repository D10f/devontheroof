import { AbstractNode } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

type NodeAttributes = {
    default_alt: string;
    alt: string;
};

export default class FaIconConverter implements CustomConverter {
    /**
     * The node type that this class modifies.
     */
    public targetNode = "inline_image";

    convert(node: AbstractNode): string {
        const attributes = node.getAttributes() as NodeAttributes;

        // NOTE: This will need to be updated at some point instead of
        // hard-coding the same icon everywhere.
        const nodeHTML = `
            <span class="icon"><i>&check;<i/></span>
        `;

        return nodeHTML;
    }
}
