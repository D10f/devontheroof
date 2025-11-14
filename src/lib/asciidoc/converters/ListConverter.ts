import { AbstractBlock, Converter } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

export default class OlistConverter implements CustomConverter {
    public targetNode = "olist";

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
