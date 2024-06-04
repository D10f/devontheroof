import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";
import { Block } from "asciidoctor";

const htmlEntities = ["❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾"];

export default class ColistConverter implements CustomConverter {
    /**
     * The node type that this class modifies.
     */
    public targetNode = "colist";

    convert(node: Block) {
        const rows = node.getBlocks().map((block) => this.buildRow(block));

        return `<div class="colist arabic">
                <table>
                    <tbody>
                        ${rows.join("")}
                    </tbody>
                </table>
            </div>`;
    }

    buildRow(block: Block) {
        const colistId = block.getAttribute("coids") as string;
        const [_, marker] = colistId.match(/-(\d)+$/) as RegExpMatchArray;
        // @ts-ignore
        const text = block.text;
        return `<tr>
            <td>
                <i class="conum pr-2" data-value="${marker}"></i>
                <b class="unselectable">${htmlEntities[parseInt(marker) - 1]}</b>
            </td>
            <td>${text}</td>
        </tr>`;
    }
}
