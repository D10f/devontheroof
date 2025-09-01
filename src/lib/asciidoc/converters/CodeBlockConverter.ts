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
                "catppuccin-light": "catppuccin-latte",
                "catppuccin-dark": "catppuccin-frappe",
                "catppuccin-macchiato": "catppuccin-macchiato",
                "everforest-dark": "everforest-dark",
                "everforest-light": "everforest-light",
                "solarized-light": "solarized-light",
                "solarized-dark": "solarized-dark",
                "gruvbox-light": "gruvbox-light-hard",
                "gruvbox-dark": "gruvbox-dark-hard",
            },
            colorReplacements: {
                "solarized-light": {
                    "#fdf6e3": "#fffce8",
                },
                "solarized-dark": {
                    "#002b36": "#073642",
                },
                "gruvbox-light-hard": {
                    "#f9f5d7": "#faf6d9",
                },
                "gruvbox-dark-hard": {
                    "#1d2021": "#282828",
                },
            },
            transformers: [
                this.transformAnnotations(),
                this.transformConsoleCodeBlock(),
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationFocus(),
            ],
            defaultColor: "catppuccin-macchiato",
            cssVariablePrefix: "--shiki-",
        });

        //return `<div class="listingblock" data-language="${lang}">
        return `<div class="codeblock">
            <button class="codeblock__copy-btn rotating-btn ${title ? "mt-6" : ""} js-required">
                <span class="unselectable">
                    <svg aria-hidden="true">
                        <use href="/sprite.svg#icon-clipboard" />
                    </svg>

                    <svg aria-hidden="true" style="transform: rotate(180deg);">
                        <use href="/sprite.svg#icon-clipboard-success" />
                    </svg>
                </span>
            </button>
            <div class="listingblock" data-language="${lang}">
                <span style="font-style: italic;">${title || ""}</span>
                <figure>
                    ${title ? `<figcaption class="visually-hidden">${title}</figcaption>` : ""}
                    ${output.replace(/tabindex="0"/, 'tabindex="-1"')}
                </figure>
            </div>
        </div>`;
    }

    /**
     * This does two things, when code block is of language "console":
     * 1. Makes the leading $ or # (command prompt) unselectable.
     * 2. Removes a leading space added by shiki on each line of code.
     *    Most shells don't record commands starting with a space,
     *    which can make copy and pasting the code snippet very annoying.
     */
    private transformConsoleCodeBlock(): ShikiTransformer {
        return {
            postprocess(html, options) {
                return options.lang === "console"
                    ? html.replaceAll(
                          /<span class="line"><span style="([^"]*)">([$#])(<\/span><span style="([^"]*)">)/g,
                          (_, p1, p2, p3) => {
                              return `<span class="line"><span class="unselectable" style="${p1}">${p2}${p3}`;
                          },
                      )
                    : html;
            },
        };
    }

    /**
     * Replaces asciidoc's callout markers with nicer-looking numeric tags
     */
    private transformAnnotations(): ShikiTransformer {
        const codeCalloutRegExp = new RegExp(/\s+(?:\/\/|#)(?:\s+<\d>)+/g);

        function buildAnnotation(num: number) {
            return `<i class="conum pl-2" data-value="${num}"><b>${htmlEntities[num - 1]}</b></i>`;
        }

        return {
            /** Replace original callout with a predictable pattern before tokenization */
            preprocess(code) {
                const codeCallouts = code.matchAll(codeCalloutRegExp);
                let splits = null;

                let i = 0;
                for (const codeCalloutMatch of codeCallouts) {
                    if (splits == null) {
                        splits = code.split(codeCalloutRegExp);
                    }

                    const matchedStr = codeCalloutMatch[0];
                    const matchedItr = matchedStr.matchAll(/<(\d)>/g);

                    for (const [_, codeCalloutId] of matchedItr) {
                        splits[i] += `__codeCallout${codeCalloutId}`;
                    }

                    i++;
                }

                return splits ? splits.join("") : code;
            },

            /** Replace predicatble pattern with HTML code */
            postprocess(html) {
                // For reference, pattern generated by shiki: &#x3C;2
                return html.replaceAll(/__codeCallout(\d)+/g, (_, p1) =>
                    buildAnnotation(p1),
                );
            },
        };
    }
}
