import { CSSColorProperty, CSSThemeProperty, ThemeStrategy } from ".";

const variants = [
    "Cattpuccin Latte",
    "Cattpuccin Frappe",
    "Cattpuccin Macchiato",
    "Cattpuccin Mocha",
] as const;

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

export type CattpuccinVariants = (typeof variants)[number];

export default class Cattpuccin implements ThemeStrategy {
    constructor(public variant: CattpuccinVariants) {}

    get cssVariant() {
        return this.variant.substring(11).toLowerCase();
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
        return `--ctp-${this.cssVariant}-${colorMap[color]}`;
    }
}
