import { Inline } from "asciidoctor";
import { CustomConverter } from "./BaseConverter";

export default class XrefConverter implements CustomConverter {
    public targetNode = "inline_anchor";

    convert(node: Inline) {
        const path = node.getAttribute("refid");
        return `<a href="/blog/${path}">${node.getText()}</a>`;
    }
}
