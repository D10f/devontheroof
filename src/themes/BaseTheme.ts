const accentColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
] as const;

const layoutColors = [
    "bg-color",
    "bg-color-2",
    "bg-color-3",
    "text-color",
    "subtext-color",
] as const;

export type ThemeAccentColor = (typeof accentColors)[number];
type ThemeLayoutColor = (typeof layoutColors)[number];
export type ThemeCSSProps = ThemeAccentColor | ThemeLayoutColor;
export type ThemeVariant = { [k in ThemeCSSProps]: string };

export class BaseTheme {
    private activeVariantLabel: string;
    private activeVariantTheme: ThemeVariant;

    constructor(
        public readonly name: string,
        private readonly cssPrefix: string,
        private readonly variants: { [k in string]: ThemeVariant },
        activeVariantLabel: string,
    ) {
        this.activeVariantLabel =
            activeVariantLabel ?? Object.keys(variants)[0];
        this.activeVariantTheme = this.variants[this.activeVariantLabel];
    }

    getProperty(prop: ThemeCSSProps) {
        return `--${this.cssPrefix}-${this.activeVariantLabel}-${this.activeVariantTheme[prop]}`;
    }

    public updateCodeBlockProps() {
        const codeblocks = document.getElementsByClassName("shiki");

        for (let i = 0, l = codeblocks.length; i < l; ++i) {
            const codeblock = codeblocks[i] as HTMLElement;
            codeblock.style.setProperty(
                "background-color",
                `var(--shiki-${this.name.toLowerCase()}-${this.activeVariantLabel}-bg)`,
            );

            const tokens = codeblock.getElementsByTagName("span");
            for (let j = 0, l = tokens.length; j < l; ++j) {
                const token = tokens[j] as HTMLElement;
                token.style.setProperty(
                    "color",
                    `var(--shiki-${this.name.toLowerCase()}-${this.activeVariantLabel})`,
                );
            }
        }
    }

    public updateCSSLayoutColor() {
        const computed = getComputedStyle(document.documentElement);

        layoutColors.forEach((property) => {
            const themeProp = this.getProperty(property);
            const newValue = computed.getPropertyValue(themeProp);
            document.documentElement.style.setProperty(property, newValue);
        });
    }

    public updateCSSAccentColor(newColor: ThemeAccentColor) {
        const computed = getComputedStyle(document.documentElement);

        accentColors.forEach((color) => {
            const updated = computed.getPropertyValue(this.getProperty(color));
            document.documentElement.style.setProperty(`--${color}`, updated);
        });

        const updated = computed.getPropertyValue(`--${newColor}`);
        document.documentElement.style.setProperty("--primary-color", updated);
    }
}
