import { Block } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";
import {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  getHighlighter,
} from "shiki";

const defaultThemes: BundledTheme[] = [
  "catppuccin-latte",
  "catppuccin-frappe",
  "catppuccin-macchiato",
  "catppuccin-mocha",
  "github-dark",
  "github-light",
];

const defaultLanguages: BundledLanguage[] = [
  "javascript",
  "typescript",
  "console",
  "shell",
  "bash",
];

export default class CodeBlockConverter implements CustomConverter {
  /**
   * The node type that this class modifies.
   */
  public targetNode = "listing";

  private highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null;

  constructor(
    private themes = defaultThemes,
    private languages = defaultLanguages,
  ) {
    this.highlighter = null;
    getHighlighter({ themes: this.themes, langs: this.languages }).then((h) => {
      this.highlighter = h;
    });
  }

  convert(node: Block) {
    const input = node.getSourceLines().join("\n");
    const output = this.highlighter?.codeToHtml(input, {
      lang: node.getAttribute("language"),
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

    return `<div class="listingblock">
      <div class="content">
        ${output}
      </div>
    </div>`;
  }
}
