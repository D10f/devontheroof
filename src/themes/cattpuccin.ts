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

export type CattpuccinVariants = (typeof variants)[number];

export default class Cattpuccin implements ThemeStrategy {
  constructor(public variant: CattpuccinVariants) { }

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
    switch (property) {
      case "--bg-color":
        return `--ctp-${this.cssVariant}-crust`;
      case "--bg-color-2":
        return `--ctp-${this.cssVariant}-base`;
      case "--text-color":
        return `--ctp-${this.cssVariant}-text`;
      case "--subtext-color":
        return `--ctp-${this.cssVariant}-subtext1`;
    }
  }

  cssColorMap(color: CSSColorProperty) {
    return `--ctp-${this.cssVariant}-${colorMap[color]}`;
  }
}
