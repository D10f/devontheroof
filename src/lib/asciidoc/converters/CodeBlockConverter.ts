import { Block } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";
import {
    BundledLanguage,
    BundledTheme,
    HighlighterGeneric,
    ShikiTransformer,
} from "shiki";
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationFocus,
} from "@shikijs/transformers";

type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

const htmlEntities = ["❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾"];

export default class CodeBlockConverter implements CustomConverter {
    /**
     * The node type that this class modifies.
     */
    public targetNode = "listing";

    constructor(private highlighter: Highlighter) {}

    convert(node: Block) {
        const input = node.getSourceLines().join("\n");
        const lang = node.getAttribute("language");
        const title = node.getAttribute("title");
        const output = this.highlighter.codeToHtml(input, {
            lang,
            themes: {
                light: "github-light",
                dark: "github-dark",
                latte: "catppuccin-latte",
                frappe: "catppuccin-frappe",
                macchiato: "catppuccin-macchiato",
                mocha: "catppuccin-mocha",
            },
            transformers: [
                this.transformAnnotations(),
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationFocus(),
            ],
            defaultColor: false,
            cssVariablePrefix: "--shiki-",
        });

        return `<div class="listingblock" data-language="${lang}">
            <span style="font-style: italic;">${title || ""}</span>
            <figure class="content">
                ${title ? `<figcaption class="visually-hidden">${title}</figcaption>` : ""}
                ${output}
            </figure>
        </div>`;
    }

    /**
     * Replaces asciidoc's callout markers with nicer-looking numeric tags
     */
    private transformAnnotations(): ShikiTransformer {
        function buildAnnotation(num: number) {
            return `<i class="conum pl-2 unselectable" data-value="${num}"><b>${htmlEntities[num - 1]}</b></i>`;
        }

        return {
            /** Replace original callout with a predictable pattern before tokenization */
            preprocess(code) {
                return code.replaceAll(/(\/\/|#)\s+<(\d)+>/g, (_, _p1, p2) => {
                    return `__annotation${p2}`;
                });
            },

            /** Replace predicatble pattern with HTML code */
            postprocess(html) {
                // For reference, pattern generated by shiki: &#x3C;2
                return html.replaceAll(/__annotation(\d)+/g, (_, p1) =>
                    buildAnnotation(p1),
                );
            },
        };
    }
}
