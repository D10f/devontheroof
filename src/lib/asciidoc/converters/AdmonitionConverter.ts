import { AbstractNode } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

export default class AdmonitionConverter implements CustomConverter {
    /**
     * The node type that this class modifies.
     */
    public targetNode = "admonition";

    convert(node: AbstractNode): string {
        // @ts-ignore
        const lines = node.lines;
        const type = node.getAttribute("name");
        const content = lines.join("").replace(/`([^`]+)`/g, "<code>$1</code>");

        return `
            <div class="admonition ${type}">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <use href="/sprite.svg#icon-${type}" />
                </svg>
                <p>${content}</p>
            </div>`;
    }
}
