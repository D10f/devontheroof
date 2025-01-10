import { ThemeVariant, BaseTheme } from "./BaseTheme";

export const _catppuccin: Record<string, ThemeVariant> = {
    latte: {
        red: "red",
        orange: "peach",
        yellow: "yellow",
        green: "green",
        blue: "sky",
        purple: "mauve",
        "bg-color": "crust",
        "bg-color-2": "mantle",
        "bg-color-3": "base",
        "text-color": "text",
        "subtext-color": "subtext0",
    },
};

const Catppuccin = new BaseTheme("Catppuccin", "ctp", _catppuccin, "frappe");

export class ThemeBuilder<V extends string[]> {
    public name?: string;
    public cssPrefix?: string;
    public variants?: V;
    public defaultVariant?: string;

    static create() {
        return new ThemeBuilder();
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setCssPrefix(prefix: string) {
        this.cssPrefix = prefix;
        return this;
    }

    setVariants(variants: V) {
        this.variants = variants;
        return this as ThemeBuilder<V>;
    }

    setDefaultVariant(variant: V[number]) {
        this.defaultVariant = variant;
        return this;
    }

    build() {}
}

ThemeBuilder.create().setVariants(["test"]).setDefaultVariant("sdf");
