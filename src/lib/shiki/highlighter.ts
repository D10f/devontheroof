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
                    import("@shikijs/themes/catppuccin-latte"),
                    import("@shikijs/themes/catppuccin-frappe"),
                    import("@shikijs/themes/catppuccin-macchiato"),
                    import("@shikijs/themes/everforest-light"),
                    import("@shikijs/themes/everforest-dark"),
                    import("@shikijs/themes/solarized-light"),
                    import("@shikijs/themes/solarized-dark"),
                    import("@shikijs/themes/gruvbox-light-hard"),
                    import("@shikijs/themes/gruvbox-dark-hard"),
                ],
                langs: [],
            });
        }

        await this.highlighter.loadLanguage(...languages);

        return this.highlighter;
    }
}
