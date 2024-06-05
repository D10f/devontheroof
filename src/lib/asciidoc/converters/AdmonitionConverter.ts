import { AbstractNode } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

export default class AdmonitionConverter implements CustomConverter {
    /**
     * The node type that this class modifies.
     */
    public targetNode = "admonition";

    convert(node: AbstractNode): string {
        // @ts-ignore
        const content = node.lines;
        switch (node.getAttribute("name")) {
            case "warning":
                return `
                    <div class="admonition warning">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                        </svg>
                        <p>${content}</p>
                    </div>`;
            default:
                return "";
        }
    }
}
