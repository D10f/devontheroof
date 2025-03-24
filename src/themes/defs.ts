export const accentColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
] as const;

export const layoutColors = [
    "bg-color",
    "bg-color-2",
    "bg-color-3",
    "text-color",
    "subtext-color",
] as const;

export const DEFAULT_THEME = "Catppuccin";
export const DEFAULT_VARIANT = "dark"; // frappe
export const DEFAULT_ACCENT_COLOR = "yellow";

export type ThemeAccentColor = (typeof accentColors)[number];
export type ThemeLayoutColor = (typeof layoutColors)[number];
export type ThemeCSSProps = ThemeAccentColor | ThemeLayoutColor;
export type ThemeVariant = { [k in ThemeCSSProps]: string };
