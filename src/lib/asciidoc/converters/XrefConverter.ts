import { Inline } from "asciidoctor";
import { CustomConverter } from "./BaseConverter";

export default class AnchorConverter implements CustomConverter {
    public targetNode = "inline_anchor";

    convert(node: Inline) {
        const href =
            node.getType() === "xref"
                ? `/blog/${node.getAttribute("refid")}`
                : node.getTarget();

        return `<a href="${href}">${node.getText()}</a>`;
    }
}
