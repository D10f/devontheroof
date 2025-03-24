import { AbstractNode } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

export default class AdmonitionConverter implements CustomConverter {
    /**
     * The node type that this class modifies.
     */
    public targetNode = "admonition";

    /**
     * Keeps a count of how many admonition have been processed. This is
     * used to assign them a HTML class to position them left/right in
     * alternative order.
     */
    private admonitionCounter = 0;

    convert(node: AbstractNode): string {
        // @ts-ignore
        const lines = node.lines;
        const type = node.getAttribute("name");
        const content = lines.join("").replace(/`([^`]+)`/g, "<code>$1</code>");
        let position =
            this.admonitionCounter++ % 2 === 0
                ? "admonition--left"
                : "admonition--right";

        return `
            <div class="admonition ${position} ${type}">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <use href="/sprite.svg#icon-${type}" />
                </svg>
                <p>${content}</p>
            </div>`;
    }
}
