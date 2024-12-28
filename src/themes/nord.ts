import { CSSThemeProperty } from ".";
import { CSSColorProperty } from ".";
import { ThemeStrategy } from ".";

const variants = ["Dark"] as const;

const colorMap: Record<CSSColorProperty, string> = {
    red: "red",
    orange: "orange",
    yellow: "yellow",
    green: "green",
    blue: "blue",
    purple: "purple",
};

const variableMap: Record<CSSThemeProperty, string> = {
    "--bg-color": "nord1",
    "--bg-color-2": "nord2",
    "--bg-color-3": "nord3",
    "--text-color": "nord6",
    "--subtext-color": "nord4",
};

export type NordVariants = (typeof variants)[number];

export default class Nord implements ThemeStrategy {
    public readonly name = "Nord";
    public readonly cssPrefix = "nord";
    public readonly defaultVariant: NordVariants;

    constructor(public variant: NordVariants = "Dark") {
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
