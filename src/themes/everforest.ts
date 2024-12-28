import { CSSThemeProperty } from ".";
import { CSSColorProperty } from ".";
import { ThemeStrategy } from ".";

const variants = ["Soft", "Medium", "Hard"] as const;

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
    "--text-color": "gray0",
    "--subtext-color": "gray2",
};

export type EverforestVariants = (typeof variants)[number];

export default class Everforest implements ThemeStrategy {
    public readonly name = "Everforest";

    constructor(public variant: EverforestVariants) {}

    get cssVariant() {
        return this.variant.toLowerCase();
        //return this.variant.replace(/([A-Z\s])/g, (_, p1: string) =>
        //    p1 === " " ? "-" : p1.toLowerCase(),
        //);
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
        return `--everforest-${this.cssVariant}-${colorMap[color]}`;
    }
}
