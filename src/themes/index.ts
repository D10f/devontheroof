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

export const DEFAULT_THEME = "Cattpuccin Frappe";
export const DEFAULT_ACCENT_COLOR = "orange";

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
  constructor(private activeTheme: ThemeStrategy) { }

  get variant() {
    return this.activeTheme.variant;
  }

  get variants() {
    return this.activeTheme.variants;
  }

  get colors() {
    return this.activeTheme.colors;
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
