import { AbstractBlock, Converter } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";

export default class SectionConverter implements CustomConverter {
    public targetNode = "section";

    convert(node: AbstractBlock, defaultConverter: Converter) {
        //const content = defaultConverter.convert(node);
        //console.log(content);
        //return content;
        return defaultConverter
            .convert(node)
            .replaceAll(
                /\s+?(<h[23] id="(.*)">[^<]+)(<\/h[23]>)/g,
                (_, p1, p2, p3) => {
                    const anchorHtml = `<a class="anchor" href="#${p2}">
                    <svg aria-hidden="true">
                        <use href="/sprite.svg#icon-link" />
                    </svg>
                </a>`;
                    return p1 + anchorHtml + p3;
                },
            );
    }
}
