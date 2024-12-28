import { CSSColorProperty, CSSThemeProperty, ThemeStrategy } from ".";

const variants = ["Latte", "Frappe", "Macchiato", "Mocha"] as const;

const colorMap: Record<CSSColorProperty, string> = {
    red: "red",
    orange: "peach",
    yellow: "yellow",
    green: "green",
    blue: "sky",
    purple: "mauve",
};

const variableMap: Record<CSSThemeProperty, string> = {
    "--bg-color": "crust",
    "--bg-color-2": "mantle",
    "--bg-color-3": "base",
    "--text-color": "text",
    "--subtext-color": "subtext0",
};

export type CatppuccinVariants = (typeof variants)[number];

export default class Catppuccin implements ThemeStrategy {
    public readonly name = "Catppuccin";
    public readonly cssPrefix = "ctp";
    public readonly defaultVariant: CatppuccinVariants;

    constructor(public variant: CatppuccinVariants = "Frappe") {
        this.defaultVariant = variant;
    }

    get cssVariant() {
        return this.variant.toLowerCase();
        //return this.variant.substring(11).toLowerCase();
    }

    get variants() {
        return variants;
    }

    get colors() {
        return Object.keys(colorMap);
    }

    cssThemeMap(property: CSSThemeProperty) {
        return `--ctp-${this.cssVariant}-${variableMap[property]}`;
    }

    cssColorMap(color: CSSColorProperty) {
        return `--${this.cssPrefix}-${this.cssVariant}-${colorMap[color]}`;
    }
}
