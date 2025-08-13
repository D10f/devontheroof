import { BundledLanguage, Highlighter, createHighlighter } from "shiki";

export class ShikiHighlighter {
    private static instance: ShikiHighlighter;
    private highlighter: Highlighter | null;

    private constructor() {
        this.highlighter = null;
    }

    static getInstance() {
        if (!ShikiHighlighter.instance) {
            ShikiHighlighter.instance = new ShikiHighlighter();
        }

        return ShikiHighlighter.instance;
    }

    async getHighlighter(languages: BundledLanguage[]) {
        if (!this.highlighter) {
            this.highlighter = await createHighlighter({
                themes: [
                    "catppuccin-latte",
                    "catppuccin-frappe",
                    "catppuccin-macchiato",
                    "everforest-light",
                    "everforest-dark",
                    "solarized-light",
                    "solarized-dark",
                ],
                langs: [],
            });
        }

        await this.highlighter.loadLanguage(...languages);

        return this.highlighter;
    }
}
