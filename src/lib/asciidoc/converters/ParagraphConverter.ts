import { AbstractBlock, Converter } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

export default class ParagraphConverter implements CustomConverter {
    public targetNode = "paragraph";

    convert(node: AbstractBlock, defaultConverter: Converter) {
        return defaultConverter
            .convert(node)
            .replaceAll(
                /<span class="line-through">([^<]*)<\/span>/g,
                (_, p1) => {
                    return `<del>${p1}</del>`;
                },
            );
    }
}
