import { AbstractNode, Converter } from "asciidoctor";
import { CustomConverter } from "@/lib/asciidoc/converters/BaseConverter";
import {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  createCssVariablesTheme,
  getHighlighter,
} from "shiki";

const myTheme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});

export default class CodeBlockConverter implements CustomConverter {
  /**
   * The node type that this class modifies.
   */
  public targetNode = "listing";

  private themes = [
    "catppuccin-latte",
    "catppuccin-frappe",
    "catppuccin-macchiato",
    "catppuccin-mocha",
    "github-dark",
    "github-light",
    "one-dark-pro",
    "nord",
    "vitesse-dark",
    "vitesse-light",
  ];

  private languages = ["javascript", "console", "shell", "bash"];

  private highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null;

  constructor() {
    this.highlighter = null;
    getHighlighter({ themes: this.themes, langs: this.languages }).then((h) => {
      this.highlighter = h;
    });
  }

  convert(node: AbstractNode) {
    const input = node.lines.join("\n");
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
