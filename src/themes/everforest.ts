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
    "--bg-color": "bg0",
    "--bg-color-2": "bg1",
    "--bg-color-3": "bg2",
    "--text-color": "fg",
    "--subtext-color": "gray2",
};

export type EverforestVariants = (typeof variants)[number];

export default class Everforest implements ThemeStrategy {
    public readonly name = "Everforest";
    public readonly cssPrefix = "everforest";
    public readonly defaultVariant: EverforestVariants;

    constructor(public variant: EverforestVariants = "Dark") {
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
        return `--everforest-${this.cssVariant}-${variableMap[property]}`;
    }

    cssColorMap(color: CSSColorProperty) {
        return `--${this.cssPrefix}-${this.cssVariant}-${colorMap[color]}`;
    }
}
