type ThemeAccentColors =
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple";

type ThemeLayoutColors =
    | "bg-color"
    | "bg-color-2"
    | "bg-color-3"
    | "text-color"
    | "subtext-color";

type ThemeCSSProps = ThemeAccentColors | ThemeLayoutColors;

type ThemeVariant = Map<ThemeCSSProps, string>;

export class BaseTheme {
    private activeVariant: ThemeVariant;

    constructor(
        public readonly name: string,
        private readonly cssPrefix: string,
        private readonly variants: { [k in string]: ThemeVariant },
    ) {
        this.activeVariant = Object.values(this.variants)[0];
    }

    get variant() {
        return this.activeVariant;
    }

    get colors() {
        const colors = [
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "purple",
        ] as const;
        const result: string[] = [];
        for (const [key] of this.variant) {
            if (key in colors) result.push(key);
        }
        return result;
    }

    getProperty(prop: ThemeCSSProps) {
        return `--${this.cssPrefix}-${this.variant}-${this.variant.get(prop)}`;
    }

    updateCodeBlockProps() {
        const codeblocks = document.getElementsByClassName("shiki");

        for (let i = 0, l = codeblocks.length; i < l; ++i) {
            const codeblock = codeblocks[i] as HTMLElement;
            codeblock.style.setProperty(
                "background-color",
                `var(--shiki-${this.name.toLowerCase()}-${this.variant}-bg)`,
            );

            const tokens = codeblock.getElementsByTagName("span");
            for (let j = 0, l = tokens.length; j < l; ++j) {
                const token = tokens[j] as HTMLElement;
                token.style.setProperty(
                    "color",
                    `var(--shiki-${this.name.toLowerCase()}-${this.cssVariant})`,
                );
            }
        }
    }
}
