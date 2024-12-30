import { CSSThemeProperty } from ".";
import { CSSColorProperty } from ".";
import { ThemeStrategy } from ".";

const variants = ["Light", "Dark"] as const;

const colorMap: Record<CSSColorProperty, string> = {
    red: "red",
    orange: "orange",
    yellow: "yellow",
    green: "green",
    blue: "blue",
    purple: "purple",
};

const variableMap: Record<CSSThemeProperty, string> = {
    "--bg-color": "dark-base",
    "--bg-color-2": "dark-mono1",
    "--bg-color-3": "dark-mono2",
    "--text-color": "fg",
    "--subtext-color": "fg",
};

export type OneDarkVariants = (typeof variants)[number];

export default class OneDark implements ThemeStrategy {
    public readonly name = "OneDark";
    public readonly cssPrefix = "one-dark";
    public readonly defaultVariant: OneDarkVariants;

    constructor(public variant: OneDarkVariants = "Dark") {
        this.defaultVariant = variant;
    }

    get cssVariant() {
        return this.variant.toLowerCase();
    }

    get variants() {
        return variants;
    }

    get colors() {
        return Object.keys(colorMap);
    }

    cssThemeMap(property: CSSThemeProperty) {
        return `--${this.cssPrefix}-${this.cssVariant}-${variableMap[property]}`;
    }

    cssColorMap(color: CSSColorProperty) {
        return `--${this.cssPrefix}-${this.cssVariant}-${colorMap[color]}`;
    }
}
