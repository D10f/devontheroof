export interface ThemeStrategy {
    variant: string;
    variants: readonly string[];
    cssVariant: string;
    colors: readonly string[];
    cssThemeMap: (property: CSSThemeProperty) => string;
    cssColorMap: (color: CSSColorProperty) => string;
}

export type CSSThemeProperty = (typeof cssThemeProperties)[number];
export type CSSColorProperty = (typeof cssColorProperties)[number];

export const DEFAULT_THEME = "Catppuccin Frappe";
export const DEFAULT_ACCENT_COLOR = "yellow";

const cssThemeProperties = [
    "--bg-color",
    "--bg-color-2",
    "--bg-color-3",
    "--text-color",
    "--subtext-color",
] as const;

const cssColorProperties = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
] as const;

export default class ThemeContext {
    constructor(private activeTheme: ThemeStrategy) {}

    get variant() {
        return this.activeTheme.variant;
    }

    get cssVariant() {
        return this.activeTheme.cssVariant;
    }

    get variants() {
        return this.activeTheme.variants;
    }

    get colors() {
        return this.activeTheme.colors;
    }

    public updateCodeBlockProps() {
        const codeblocks = document.getElementsByClassName("shiki");

        for (let i = 0, l = codeblocks.length; i < l; ++i) {
            const codeblock = codeblocks[i] as HTMLElement;
            codeblock.style.setProperty(
                "background-color",
                `var(--shiki-${this.cssVariant}-bg)`,
            );

            const tokens = codeblock.getElementsByTagName("span");
            for (let j = 0, l = tokens.length; j < l; ++j) {
                const token = tokens[j] as HTMLElement;
                token.style.setProperty(
                    "color",
                    `var(--shiki-${this.cssVariant})`,
                );
            }
        }
    }

    public updateCSSThemeProps() {
        const computed = getComputedStyle(document.documentElement);

        cssThemeProperties.forEach((property) => {
            const themeProp = this.activeTheme.cssThemeMap(property);
            const newValue = computed.getPropertyValue(themeProp);
            document.documentElement.style.setProperty(property, newValue);
        });
    }

    public updateCSSAccentColorProps(newColor: CSSColorProperty) {
        const computed = getComputedStyle(document.documentElement);

        this.activeTheme.colors.forEach((color) => {
            const updated = computed.getPropertyValue(
                this.activeTheme.cssColorMap(color as CSSColorProperty),
            );
            document.documentElement.style.setProperty(`--${color}`, updated);
        });

        const updated = computed.getPropertyValue(`--${newColor}`);
        document.documentElement.style.setProperty("--primary-color", updated);
    }
}
