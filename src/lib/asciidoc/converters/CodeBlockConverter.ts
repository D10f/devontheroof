import { Block } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";
import { BundledLanguage, BundledTheme, HighlighterGeneric } from "shiki";

type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

export default class CodeBlockConverter implements CustomConverter {
  /**
   * The node type that this class modifies.
   */
  public targetNode = "listing";

  constructor(private highlighter: Highlighter) { }

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
      defaultColor: false,
      cssVariablePrefix: "--shiki-",
    });

    return `<div class="listingblock" data-language="${lang}">
      <div class="content">
        ${output}
      </div>
    </div>`;
  }
}
