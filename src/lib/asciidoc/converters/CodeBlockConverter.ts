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
            ],
            defaultColor: false,
            cssVariablePrefix: "--shiki-",
        });

        return `<div class="listingblock" data-language="${lang}">
            <div class="content">
                ${output}
            </div>
        </div>`;
    }

    /**
     * Replaces asciidoc's callout markers with nicer-looking numeric tags
     */
    private transformAnnotations(): ShikiTransformer {
        return {
            line(node) {
                const lastNode = node.children.at(-1);
                // @ts-ignore
                const contents = lastNode?.children[0];
                const colistMatch = contents?.value.match(/<(\d)+>\s*$/);

                if (colistMatch) {
                    const lastIdx = node.children.length - 1;
                    const conum = parseInt(colistMatch[1]);

                    node.children[lastIdx] = {
                        type: "element",
                        tagName: "i",
                        properties: {
                            class: "conum pl-2 unselectable",
                            "data-value": conum,
                        },
                        children: [
                            {
                                type: "element",
                                tagName: "b",
                                properties: {},
                                children: [
                                    {
                                        type: "text",
                                        value: htmlEntities[conum - 1],
                                    },
                                ],
                            },
                        ],
                    };
                }
            },
        };
    }
}
